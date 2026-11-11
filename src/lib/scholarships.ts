import { prisma } from "./prisma";
import { SCHOLARSHIPS, type ScholarshipItem } from "./scholarships-data";

export type { ScholarshipItem };

type DbScholarship = {
  id: string;
  slug: string;
  title: string;
  provider: string;
  country: string;
  region: string;
  level: string;
  fundingType: string;
  amount: string;
  deadline: Date;
  description: string;
  eligibility: string;
  benefits: string;
  howToApply: string;
  field: string;
  applicationUrl: string;
  officialUrl: string;
  featured: boolean;
};

function toItem(s: DbScholarship): ScholarshipItem {
  return { ...s, deadline: s.deadline.toISOString().slice(0, 10) };
}

export type ScholarshipFilters = {
  q?: string;
  level?: string;
  region?: string;
  funding?: string;
  sort?: string;
};

function matches(item: ScholarshipItem, f: ScholarshipFilters) {
  if (f.q) {
    const q = f.q.toLowerCase();
    const hay = `${item.title} ${item.provider} ${item.country} ${item.field} ${item.description}`.toLowerCase();
    if (!hay.includes(q)) return false;
  }
  if (f.level && !item.level.toLowerCase().includes(f.level.toLowerCase()))
    return false;
  if (f.region && item.region !== f.region) return false;
  if (f.funding && item.fundingType !== f.funding) return false;
  return true;
}

function sortItems(items: ScholarshipItem[], sort?: string) {
  const arr = [...items];
  if (sort === "amount") return arr.sort((a, b) => a.title.localeCompare(b.title));
  return arr.sort(
    (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
  );
}

/** Query PostgreSQL via Prisma; fall back to the curated seed data if the DB is unreachable. */
export async function getScholarships(
  filters: ScholarshipFilters = {},
): Promise<ScholarshipItem[]> {
  try {
    const where: Record<string, unknown> = {};
    if (filters.q) {
      where.OR = [
        { title: { contains: filters.q, mode: "insensitive" } },
        { provider: { contains: filters.q, mode: "insensitive" } },
        { country: { contains: filters.q, mode: "insensitive" } },
        { field: { contains: filters.q, mode: "insensitive" } },
      ];
    }
    if (filters.level)
      where.level = { contains: filters.level, mode: "insensitive" };
    if (filters.region) where.region = filters.region;
    if (filters.funding) where.fundingType = filters.funding;

    const rows = (await prisma.scholarship.findMany({
      where,
      orderBy: { deadline: "asc" },
    })) as DbScholarship[];
    if (rows.length > 0) return sortItems(rows.map(toItem), filters.sort);
    // DB is up but empty (not seeded yet) — show the curated list.
    return sortItems(SCHOLARSHIPS.filter((s) => matches(s, filters)), filters.sort);
  } catch {
    return sortItems(SCHOLARSHIPS.filter((s) => matches(s, filters)), filters.sort);
  }
}

export async function getFeaturedScholarships(): Promise<ScholarshipItem[]> {
  const all = await getScholarships();
  return all.filter((s) => s.featured);
}

export async function getScholarshipById(
  id: string,
): Promise<ScholarshipItem | null> {
  try {
    const row = (await prisma.scholarship.findFirst({
      where: { OR: [{ id }, { slug: id }] },
    })) as DbScholarship | null;
    if (row) return toItem(row);
  } catch {
    // fall through to seed data
  }
  return (
    SCHOLARSHIPS.find((s) => s.id === id || s.slug === id) ?? null
  );
}

export async function getRelatedScholarships(
  item: ScholarshipItem,
): Promise<ScholarshipItem[]> {
  const all = await getScholarships();
  return all
    .filter((s) => s.id !== item.id && (s.region === item.region || s.level === item.level))
    .slice(0, 3);
}
