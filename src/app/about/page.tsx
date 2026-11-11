import Link from "next/link";
import { Globe2, Heart, Search, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About Us",
  description:
    "About ScholarSphere — why we built a free, clear directory of scholarships for international students.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">About us</p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
        Helping talented students find their way abroad
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-slate-600">
        ScholarSphere is a free directory of upcoming scholarships for
        international students. We collect awards from governments,
        universities, and foundations around the world, and present them
        clearly — what they cover, who can apply, when they close, and where
        to apply officially.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          { icon: Search, title: "Clear, not cluttered", text: "One page per scholarship, with the facts that matter — no pop-ups, no paywalls." },
          { icon: ShieldCheck, title: "Official links only", text: "Every listing links to the provider's own page. You always apply there, never through us." },
          { icon: Heart, title: "Free for students", text: "ScholarSphere is free to browse. We never charge students, and we never sell your data." },
        ].map((c) => (
          <div key={c.title} className="rounded-3xl border border-slate-200 bg-white p-6">
            <c.icon className="h-6 w-6 text-indigo-600" />
            <h2 className="mt-4 font-bold text-slate-900">{c.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{c.text}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-slate-900">What we do</h2>
      <p className="mt-3 leading-relaxed text-slate-600">
        We research and curate scholarships for undergraduate, master&apos;s,
        and PhD study — fully funded and partially funded — and keep their
        deadlines visible so you can plan ahead. When a deadline is
        approaching, we say so. When details change, the official provider
        page is the source of truth, and we link to it prominently.
      </p>

      <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-slate-900">What we don&apos;t do</h2>
      <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed text-slate-600">
        <li>We don&apos;t process applications, and we can&apos;t influence who is selected.</li>
        <li>We don&apos;t charge for applications, and no legitimate scholarship should ask you for a fee to apply.</li>
        <li>We don&apos;t guarantee that a listing is still open — deadlines and rules can change, so always check the official page.</li>
      </ul>

      <div className="mt-12 flex items-start gap-4 rounded-3xl bg-indigo-50 p-6">
        <Globe2 className="h-6 w-6 shrink-0 text-indigo-600" />
        <div>
          <h2 className="font-bold text-slate-900">Found a scholarship we should list?</h2>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">
            We&apos;re always adding new awards. Send us the official link and
            we&apos;ll review it.
          </p>
          <Button asChild className="mt-4" size="sm">
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
