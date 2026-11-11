import Link from "next/link";
import { CheckCircle2, Mail, MessageSquare, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { submitContact } from "./actions";

export const metadata = {
  title: "Contact Us",
  description:
    "Contact ScholarSphere — suggest a scholarship, report an outdated listing, or ask a question.",
};

type Props = {
  searchParams: Promise<{ sent?: string; error?: string }>;
};

const inputClass =
  "h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm focus-visible:ring-indigo-500";

export default async function ContactPage({ searchParams }: Props) {
  const params = await searchParams;
  const sent = params.sent === "1";
  const error = params.error === "1";

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">Contact us</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          We&apos;d love to hear from you
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          Suggest a scholarship, report an outdated deadline, or ask us a
          question. We read every message — we just can&apos;t help with
          individual applications, as those are handled by the scholarship
          providers themselves.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-1">
          <Card>
            <CardContent className="flex gap-4 p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-bold text-slate-900">Email</h2>
                <p className="mt-1 text-sm text-slate-600">hello@scholarsphere.example</p>
                <p className="text-sm text-slate-500">We aim to reply within 3 working days.</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex gap-4 p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <MessageSquare className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-bold text-slate-900">Suggest a scholarship</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Know an award we&apos;re missing? Send us the official link
                  and we&apos;ll review it.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex gap-4 p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <Clock className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-bold text-slate-900">Response time</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Monday–Friday. Messages about a specific scholarship are
                  best sent to that provider directly.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="lg:col-span-2">
          <CardContent className="p-6 sm:p-8">
            {sent ? (
              <div className="flex flex-col items-start gap-4 rounded-3xl bg-emerald-50 p-8">
                <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                <h2 className="text-2xl font-extrabold text-slate-900">Thank you — message sent</h2>
                <p className="leading-relaxed text-slate-600">
                  We&apos;ve received your message and will get back to you
                  soon. In the meantime, you can keep browsing scholarships.
                </p>
                <Button asChild>
                  <Link href="/scholarships">Browse scholarships</Link>
                </Button>
              </div>
            ) : (
              <form action={submitContact} className="space-y-5">
                {error && (
                  <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                    Please fill in your name, email, and message.
                  </p>
                )}
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700">
                    Your name
                    <Input name="name" required placeholder="Ada Lovelace" className={inputClass} />
                  </label>
                  <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700">
                    Email
                    <Input name="email" type="email" required placeholder="you@example.com" className={inputClass} />
                  </label>
                </div>
                <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700">
                  Subject
                  <Input name="subject" placeholder="Suggest a scholarship" className={inputClass} />
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700">
                  Message
                  <textarea
                    name="message"
                    required
                    rows={6}
                    placeholder="Tell us what you need…"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </label>
                <Button type="submit" size="lg">Send message</Button>
                <p className="text-xs leading-relaxed text-slate-500">
                  By sending this message you agree to be contacted about your
                  enquiry. We never sell your details. See our Terms of Service
                  for more.
                </p>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
