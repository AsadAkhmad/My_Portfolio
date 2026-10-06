// Non-destructive: upserts the extra projects by slug into the live database.
// Usage: npx tsx scripts/add-projects.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma";
import { extraProjects } from "../prisma/extra-projects";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  for (const p of extraProjects) {
    const saved = await prisma.project.upsert({ where: { slug: p.slug }, update: p, create: p });
    console.log(`upserted ${saved.slug}`);
  }
}

main().finally(() => prisma.$disconnect());
