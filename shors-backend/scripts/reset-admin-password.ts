/**
 * Admin password reset script.
 *
 * Usage:
 *   npx tsx scripts/reset-admin-password.ts "admin@shors.in" "NewPassword123!"
 *
 * Or via env variables:
 *   ADMIN_EMAIL="admin@shors.in" ADMIN_PASSWORD="NewPassword123!" npx tsx scripts/reset-admin-password.ts
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

async function main() {
  const email = (process.argv[2] || process.env.ADMIN_EMAIL || "admin@shors.in").trim();
  const newPassword = (process.argv[3] || process.env.ADMIN_PASSWORD || "Admin@123").trim();

  if (!email) {
    console.error("❌ Email is required.");
    process.exit(1);
  }

  if (!newPassword || newPassword.length < 8) {
    console.error("❌ Password must be at least 8 characters.");
    process.exit(1);
  }

  const prisma = new PrismaClient();

  try {
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      console.error(`❌ Admin with email "${email}" not found.`);
      process.exit(1);
    }

    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

    await prisma.admin.update({
      where: { email },
      data: { password: hashedPassword },
    });

    console.log(`✅ Password successfully updated for admin: ${email}`);
    console.log(`   New Password set to: ${newPassword}`);
  } catch (error) {
    console.error("❌ Failed to reset password:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
