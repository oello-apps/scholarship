import Link from "next/link";
import { GraduationCap, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-white">
                <GraduationCap className="h-5 w-5" />
              </span>
              <span className="text-lg font-extrabold tracking-tight text-white">
                ScholarSphere
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">
              A free directory of upcoming scholarships for international
              students — curated, clearly explained, and always linked to the
              official source.
            </p>
            <p className="mt-4 flex items-center gap-2 text-sm text-slate-400">
              <Mail className="h-4 w-4" /> hello@scholarsphere.example
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Explore</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link className="hover:text-white" href="/">Home</Link></li>
              <li><Link className="hover:text-white" href="/scholarships">All scholarships</Link></li>
              <li><Link className="hover:text-white" href="/scholarships?funding=Fully%20Funded">Fully funded</Link></li>
              <li><Link className="hover:text-white" href="/about">About us</Link></li>
              <li><Link className="hover:text-white" href="/contact">Contact us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Legal</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link className="hover:text-white" href="/terms">Terms of Service</Link></li>
              <li><Link className="hover:text-white" href="/disclaimer">Disclaimer</Link></li>
              <li><Link className="hover:text-white" href="/about">About us</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ScholarSphere. All rights reserved.</p>
          <p>Always verify deadlines and eligibility on the official scholarship page.</p>
        </div>
      </div>
    </footer>
  );
}
