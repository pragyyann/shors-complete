/**
 * One-time secure admin password reset script for production.
 *
 * Requirements:
 * - Reads new password from ADMIN_RESET_PASSWORD (or ADMIN_PASSWORD) environment variable.
 * - Does NOT accept passwords via command-line arguments to avoid exposure in process lists (ps aux) or shell history.
 * - Never logs or prints the password or password hash.
 * - Never hardcodes default passwords.
 * - Updates ONLY the existing admin record matching ADMIN_EMAIL (defaults to admin@shors.in).
 * - Fails safely if the target admin account does not exist (never creates duplicate accounts).
 * - Fails safely if DATABASE_URL or ADMIN_RESET_PASSWORD is missing or password < 8 characters.
 * - Preserves all existing database tables, schema, products, preorders, and customer records.
 *
 * Usage:
 *   ADMIN_RESET_PASSWORD="YourStrongPasswordHere" npx tsx scripts/reset-admin-password.ts
 * Or:
 *   ADMIN_RESET_PASSWORD="YourStrongPasswordHere" npm run reset-password
 */

import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;
const DEFAULT_ADMIN_EMAIL = "admin@shors.in";

async function main() {
  const email = (process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL).trim().toLowerCase();
  const resetPassword = process.env.ADMIN_RESET_PASSWORD || process.env.ADMIN_PASSWORD;

  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL environment variable is missing.");
    process.exit(1);
  }

  if (!resetPassword) {
    console.error("❌ ADMIN_RESET_PASSWORD environment variable is required.");
    console.error("   Example: ADMIN_RESET_PASSWORD=\"<secure-password>\" npm run reset-password");
    process.exit(1);
  }

  if (resetPassword.length < 8) {
    console.error("❌ Password must be at least 8 characters long.");
    process.exit(1);
  }

  const prisma = new PrismaClient();

  try {
    // 1. Verify target admin account exists in the database
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      console.error(`❌ Admin account with email "${email}" not found in database.`);
      console.error("   Aborting. This script will not create duplicate accounts or alter schema.");
      process.exit(1);
    }

    // 2. Hash password with bcrypt using 10 rounds (compatible with AuthService)
    const hashedPassword = await bcrypt.hash(resetPassword, SALT_ROUNDS);

    // 3. Update ONLY the password column of this existing admin record
    await prisma.admin.update({
      where: { id: admin.id },
      data: { password: hashedPassword },
    });

    console.log("✅ Admin password reset completed successfully.");
    console.log(`   Account ID:    ${admin.id}`);
    console.log(`   Target Email:  ${admin.email}`);
    console.log(`   Role:          ${admin.role}`);
    console.log(`   Status:        Updated password hash.`);
    console.log("🔒 Password and hash were NOT logged or stored in plaintext.");
    console.log("⚠️  ACTION REQUIRED: Remove ADMIN_RESET_PASSWORD from your Railway environment variables now.");
  } catch (error) {
    console.error("❌ Database operation failed:", error instanceof Error ? error.message : error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
