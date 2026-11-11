import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  Gift,
  GraduationCap,
  MapPin,
  ShieldAlert,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ScholarshipCard from "@/components/ScholarshipCard";
import {
  getRelatedScholarships,
  getScholarshipById,
} from "@/lib/scholarships";
import { deadlineLabel, daysLeft, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const item = await getScholarshipById(id);
  if (!item) return { title: "Scholarship not found" };
  return {
    title: item.title,
    description: `${item.title} — ${item.fundingType} scholarship in ${item.country} for ${item.level} students. Deadline ${formatDate(item.deadline)}.`,
  };
}

export default async function ScholarshipDetailPage({ params }: Props) {
  const { id } = await params;
  const item = await getScholarshipById(decodeURIComponent(id));
  if (!item) notFound();

  const related = await getRelatedScholarships(item);
  const d = daysLeft(item.deadline);
  const urgency = d < 0 ? "danger" : d <= 30 ? "warning" : "success";

  return (
    <div>
      {/* Header */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <Link href="/scholarships" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back to all scholarships
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge>{item.fundingType}</Badge>
            <Badge variant="outline" className="border-white/20 bg-white/10 text-white">{item.level}</Badge>
            <Badge variant={urgency}>{deadlineLabel(item.deadline)}</Badge>
          </div>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            {item.title}
          </h1>
          <p className="mt-3 text-lg text-slate-300">{item.provider}</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300">
            <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-indigo-300" /> {item.country} · {item.region}</span>
            <span className="inline-flex items-center gap-2"><GraduationCap className="h-4 w-4 text-indigo-300" /> {item.field}</span>
            <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4 text-indigo-300" /> Deadline: {formatDate(item.deadline)}</span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <section>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">About this scholarship</h2>
              <p className="mt-3 text-lg leading-relaxed text-slate-600">{item.description}</p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Who can apply</h2>
              <p className="mt-3 leading-relaxed text-slate-600">{item.eligibility}</p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">What it covers</h2>
              <p className="mt-3 leading-relaxed text-slate-600">{item.benefits}</p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">How to apply</h2>
              <p className="mt-3 leading-relaxed text-slate-600">{item.howToApply}</p>
              <div className="mt-5 rounded-3xl border border-amber-200 bg-amber-50 p-5">
                <p className="flex items-start gap-2 text-sm leading-relaxed text-amber-900">
                  <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
                  ScholarSphere never charges for applications and never asks
                  for your documents. Apply only on the official scholarship
                  website, and be wary of anyone asking for a fee to apply.
                </p>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <Card className="overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500" />
              <CardContent className="space-y-4 p-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Funding</p>
                  <p className="mt-1 flex items-start gap-2 font-semibold text-slate-900">
                    <Wallet className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" /> {item.amount}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Deadline</p>
                  <p className="mt-1 font-semibold text-slate-900">{formatDate(item.deadline)}</p>
                  <p className="text-sm text-slate-500">{deadlineLabel(item.deadline)}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Level</p>
                  <p className="mt-1 font-semibold text-slate-900">{item.level}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Field of study</p>
                  <p className="mt-1 font-semibold text-slate-900">{item.field}</p>
                </div>
                <Button asChild size="lg" className="w-full">
                  <a href={item.applicationUrl} target="_blank" rel="noopener noreferrer">
                    Apply on the official site <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <a href={item.officialUrl} target="_blank" rel="noopener noreferrer">
                    Visit provider website <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                <p className="flex items-start gap-2 text-xs leading-relaxed text-slate-500">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                  Always verify the deadline and eligibility on the official
                  page — dates can change.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <p className="flex items-center gap-2 font-bold text-slate-900">
                  <Gift className="h-4 w-4 text-indigo-600" /> At a glance
                </p>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between gap-4"><dt className="text-slate-500">Provider</dt><dd className="text-right font-semibold text-slate-900">{item.provider}</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-slate-500">Country</dt><dd className="font-semibold text-slate-900">{item.country}</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-slate-500">Region</dt><dd className="font-semibold text-slate-900">{item.region}</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-slate-500">Funding</dt><dd className="font-semibold text-slate-900">{item.fundingType}</dd></div>
                </dl>
              </CardContent>
            </Card>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">You may also like</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {related.map((s) => (
                <ScholarshipCard key={s.id} item={s} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
