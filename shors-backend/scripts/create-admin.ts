/**
 * One-time admin creation script for production.
 *
 * Usage:
 *   ADMIN_EMAIL="you@example.com" ADMIN_PASSWORD="SecurePass123!" npx tsx scripts/create-admin.ts
 *
 * Environment variables:
 *   ADMIN_EMAIL    (required) — the admin's email address
 *   ADMIN_PASSWORD (required) — the admin's password (min 8 chars)
 *   ADMIN_NAME     (optional) — display name, defaults to "Super Admin"
 *   DATABASE_URL   (required) — already set in Railway
 *
 * Safety:
 *   - Hashes the password with bcrypt (salt rounds 10), identical to auth.service.ts
 *   - Refuses to overwrite an existing admin with the same email
 *   - Never prints the password
 *   - Does NOT modify the schema, migrations, or any existing data
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

async function main() {
  // ── Read & validate env vars ──────────────────────────────────────────
  const email = process.env.ADMIN_EMAIL?.trim();
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME?.trim() || "Super Admin";

  if (!email) {
    console.error("❌ ADMIN_EMAIL environment variable is required.");
    process.exit(1);
  }

  if (!password) {
    console.error("❌ ADMIN_PASSWORD environment variable is required.");
    process.exit(1);
  }

  if (password.length < 8) {
    console.error("❌ ADMIN_PASSWORD must be at least 8 characters.");
    process.exit(1);
  }

  // Basic email format check
  if (!email.includes("@") || !email.includes(".")) {
    console.error("❌ ADMIN_EMAIL does not look like a valid email address.");
    process.exit(1);
  }

  // ── Connect to database ───────────────────────────────────────────────
  const prisma = new PrismaClient();

  try {
    // Check if an admin with this email already exists
    const existing = await prisma.admin.findUnique({
      where: { email },
    });

    if (existing) {
      console.error(`⚠️  An admin with email "${email}" already exists (id=${existing.id}). Aborting.`);
      console.error("   This script refuses to overwrite existing admins.");
      process.exit(1);
    }

    // Hash the password — same as auth.service.ts
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create the admin record
    const admin = await prisma.admin.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    console.log("✅ Admin created successfully!");
    console.log(`   ID:    ${admin.id}`);
    console.log(`   Name:  ${admin.name}`);
    console.log(`   Email: ${admin.email}`);
    console.log(`   Role:  ${admin.role}`);
    console.log("");
    console.log("🔒 Password was hashed with bcrypt (salt rounds 10) — never stored in plaintext.");
    console.log("");
    console.log("⚠️  IMPORTANT: Remove ADMIN_EMAIL and ADMIN_PASSWORD from your environment variables now.");
  } catch (error) {
    console.error("❌ Failed to create admin:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
