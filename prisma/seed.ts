// DepannIA seed script
// Run with: npm run db:seed
// Seeds demo knowledge guides into the database.

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding DepannIA database...");
  // Static guides are served from src/lib/guides-data.ts
  // Add any additional seed data here if needed
  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
