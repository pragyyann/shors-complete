import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");

  // 1. Admin
  const hashedPassword = await bcrypt.hash("Admin@123", 10);
  await prisma.admin.upsert({
    where: { email: "admin@shors.in" },
    update: {},
    create: {
      name: "Super Admin",
      email: "admin@shors.in",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log("Admin seeded.");

  // 2. Collections (ROOT, INDIAN)
  const rootCollection = await prisma.collection.upsert({
    where: { slug: "root" },
    update: {},
    create: {
      name: "Root Collection",
      slug: "root",
      slot: "ROOT",
      description: "Main collection",
      displayOrder: 1,
      isActive: true,
    },
  });

  const indianCollection = await prisma.collection.upsert({
    where: { slug: "indian" },
    update: {},
    create: {
      name: "Indian Collection",
      slug: "indian",
      slot: "INDIAN",
      description: "Indian ethnic collection",
      displayOrder: 2,
      isActive: true,
    },
  });
  console.log("Collections seeded.");

  // 3. Hero (One empty row)
  await prisma.hero.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: "Welcome to SHORS",
      subtitle: "Premium Preorders",
      description: "Discover our exclusive collections.",
      isActive: true,
    },
  });
  console.log("Hero seeded.");

  // 4. Featured Collections (ROOT, INDIAN)
  // Ensure we only have two, using upsert by ID
  await prisma.featuredCollection.upsert({
    where: { id: 1 },
    update: {},
    create: {
      slot: "ROOT",
      title: "Featured Root",
      isActive: true,
    },
  });

  await prisma.featuredCollection.upsert({
    where: { id: 2 },
    update: {},
    create: {
      slot: "INDIAN",
      title: "Featured Indian",
      isActive: true,
    },
  });
  console.log("Featured Collections seeded.");

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
