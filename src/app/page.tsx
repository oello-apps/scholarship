import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Globe2,
  GraduationCap,
  Search,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ScholarshipCard from "@/components/ScholarshipCard";
import {
  getFeaturedScholarships,
  getScholarships,
} from "@/lib/scholarships";
import { LEVELS, REGIONS } from "@/lib/scholarships-data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [featured, all] = await Promise.all([
    getFeaturedScholarships(),
    getScholarships(),
  ]);
  const closingSoon = [...all]
    .sort(
      (a, b) =>
        new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
    )
    .slice(0, 6);
  const countries = new Set(all.map((s) => s.country)).size;
  const fullyFunded = all.filter((s) => s.fundingType === "Fully Funded").length;

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_30rem_at_20%_-10%,rgba(99,102,241,0.45),transparent),radial-gradient(50rem_28rem_at_90%_0%,rgba(217,70,239,0.35),transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:px-8">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white">
              <Sparkles className="h-3.5 w-3.5" /> 2027 intake · {all.length} upcoming scholarships
            </p>
            <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
              Find a scholarship
              <span className="block bg-gradient-to-r from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                that takes you further.
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
              A clear, beautiful directory of fully and partially funded
              scholarships for international students — with deadlines,
              eligibility, and a link to the official page. No accounts, no
              noise.
            </p>
            <form action="/scholarships" method="get" className="mt-8 flex max-w-xl gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  name="q"
                  placeholder="Search scholarships, countries, fields…"
                  className="h-13 rounded-full border-white/20 bg-white pl-11 text-base shadow-xl"
                />
              </div>
              <Button type="submit" size="lg" className="shrink-0 rounded-full">
                Search
              </Button>
            </form>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Fully Funded", "Masters", "United Kingdom", "Germany"].map((t) => (
                <Link
                  key={t}
                  href={`/scholarships?q=${encodeURIComponent(t)}`}
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/20"
                >
                  {t}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { icon: GraduationCap, value: `${all.length}`, label: "Scholarships listed" },
              { icon: Globe2, value: `${countries}`, label: "Countries & regions" },
              { icon: BadgeCheck, value: `${fullyFunded}`, label: "Fully funded" },
              { icon: CalendarDays, value: "2027", label: "Intake now open" },
            ].map((s) => (
              <div key={s.label} className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <s.icon className="h-5 w-5 text-indigo-300" />
                <p className="mt-3 text-3xl font-extrabold text-white">{s.value}</p>
                <p className="mt-1 text-sm text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">Featured</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Scholarships worth applying for first
            </h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/scholarships">View all <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {featured.map((s) => (
            <ScholarshipCard key={s.id} item={s} />
          ))}
        </div>
      </section>

      {/* Browse by region / level */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Browse by destination</h2>
          <p className="mt-2 text-slate-600">Start with where you want to study.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {REGIONS.map((region) => {
              const count = all.filter((s) => s.region === region).length;
              return (
                <Link
                  key={region}
                  href={`/scholarships?region=${encodeURIComponent(region)}`}
                  className="group rounded-3xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <Globe2 className="h-6 w-6 text-indigo-600" />
                  <p className="mt-4 text-lg font-bold text-slate-900">{region}</p>
                  <p className="mt-1 text-sm text-slate-500">{count} scholarship{count === 1 ? "" : "s"}</p>
                  <p className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-indigo-600">
                    Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </p>
                </Link>
              );
            })}
          </div>

          <h3 className="mt-12 text-xl font-bold text-slate-900">Browse by level</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {LEVELS.map((level) => (
              <Link
                key={level}
                href={`/scholarships?level=${encodeURIComponent(level)}`}
                className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
              >
                {level}
              </Link>
            ))}
            <Link href="/scholarships?funding=Fully%20Funded" className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
              Fully Funded
            </Link>
          </div>
        </div>
      </section>

      {/* Closing soon */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Closing soon</h2>
        <p className="mt-2 text-slate-600">Deadlines are approaching — check the official page and apply early.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {closingSoon.map((s) => (
            <ScholarshipCard key={s.id} item={s} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-indigo-600 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight">How ScholarSphere works</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { n: "01", t: "Search & filter", d: "Filter by country, level, funding type, or deadline — find the awards that actually fit you." },
              { n: "02", t: "Check the details", d: "Read eligibility, benefits, and what you need to apply, all on one clear page." },
              { n: "03", t: "Apply on the official site", d: "We link you straight to the official scholarship page. You always apply there — never through us." },
            ].map((s) => (
              <div key={s.n} className="rounded-3xl bg-white/10 p-6 backdrop-blur">
                <p className="text-sm font-bold text-indigo-200">{s.n}</p>
                <h3 className="mt-3 text-xl font-bold">{s.t}</h3>
                <p className="mt-2 leading-relaxed text-indigo-100">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Button asChild variant="dark" size="lg">
              <Link href="/scholarships">Browse all scholarships <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
