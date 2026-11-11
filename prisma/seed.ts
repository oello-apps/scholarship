import { PrismaClient } from "@prisma/client";
import { SCHOLARSHIPS } from "../src/lib/scholarships-data";

const prisma = new PrismaClient();

async function main() {
  for (const s of SCHOLARSHIPS) {
    await prisma.scholarship.upsert({
      where: { slug: s.slug },
      update: {
        title: s.title,
        provider: s.provider,
        country: s.country,
        region: s.region,
        level: s.level,
        fundingType: s.fundingType,
        amount: s.amount,
        deadline: new Date(s.deadline),
        description: s.description,
        eligibility: s.eligibility,
        benefits: s.benefits,
        howToApply: s.howToApply,
        field: s.field,
        applicationUrl: s.applicationUrl,
        officialUrl: s.officialUrl,
        featured: s.featured,
      },
      create: {
        id: s.id,
        slug: s.slug,
        title: s.title,
        provider: s.provider,
        country: s.country,
        region: s.region,
        level: s.level,
        fundingType: s.fundingType,
        amount: s.amount,
        deadline: new Date(s.deadline),
        description: s.description,
        eligibility: s.eligibility,
        benefits: s.benefits,
        howToApply: s.howToApply,
        field: s.field,
        applicationUrl: s.applicationUrl,
        officialUrl: s.officialUrl,
        featured: s.featured,
      },
    });
  }
  console.log(`Seeded ${SCHOLARSHIPS.length} scholarships.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
