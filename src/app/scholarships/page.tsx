import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ScholarshipCard from "@/components/ScholarshipCard";
import { getScholarships } from "@/lib/scholarships";
import { LEVELS, REGIONS } from "@/lib/scholarships-data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "All Scholarships",
  description:
    "Browse all upcoming scholarships for international students — filter by level, region, funding, and deadline.",
};

type Props = {
  searchParams: Promise<{
    q?: string;
    level?: string;
    region?: string;
    funding?: string;
    sort?: string;
  }>;
};

function Select({
  name,
  value,
  label,
  options,
}: {
  name: string;
  value?: string;
  label: string;
  options: string[];
}) {
  return (
    <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-600">
      {label}
      <select
        name={name}
        defaultValue={value ?? ""}
        className="h-11 rounded-full border border-slate-200 bg-white px-4 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">All</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

export default async function ScholarshipsPage({ searchParams }: Props) {
  const params = await searchParams;
  const filters = {
    q: params.q ?? "",
    level: params.level ?? "",
    region: params.region ?? "",
    funding: params.funding ?? "",
    sort: params.sort ?? "deadline",
  };
  const items = await getScholarships(filters);
  const hasFilters = Boolean(filters.q || filters.level || filters.region || filters.funding);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">Directory</p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
        All scholarships
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-slate-600">
        {items.length} upcoming scholarship{items.length === 1 ? "" : "s"} for
        international students, sorted by deadline. Always verify the details
        on the official page before you apply.
      </p>

      <form
        action="/scholarships"
        method="get"
        className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-5"
      >
        <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
          <SlidersHorizontal className="h-4 w-4 text-indigo-600" /> Search & filter
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-600 lg:col-span-2">
            Search
            <span className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                name="q"
                defaultValue={filters.q}
                placeholder="Scholarship, country, field…"
                className="pl-11"
              />
            </span>
          </label>
          <Select name="level" value={filters.level} label="Level" options={LEVELS} />
          <Select name="region" value={filters.region} label="Region" options={REGIONS} />
          <Select
            name="funding"
            value={filters.funding}
            label="Funding"
            options={["Fully Funded", "Partially Funded"]}
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button type="submit">Apply filters</Button>
          {hasFilters && (
            <Button asChild variant="outline">
              <Link href="/scholarships">Clear all</Link>
            </Button>
          )}
          <p className="ml-auto text-sm text-slate-500">
            Showing <span className="font-bold text-slate-900">{items.length}</span> result{items.length === 1 ? "" : "s"}
          </p>
        </div>
      </form>

      {items.length === 0 ? (
        <div className="mt-12 rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <h2 className="text-xl font-bold text-slate-900">No scholarships match those filters</h2>
          <p className="mt-2 text-slate-600">Try a broader search or clear the filters.</p>
          <Button asChild className="mt-6">
            <Link href="/scholarships">Clear filters</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((s) => (
            <ScholarshipCard key={s.id} item={s} />
          ))}
        </div>
      )}
    </div>
  );
}
