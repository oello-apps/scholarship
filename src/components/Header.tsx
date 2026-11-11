import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/scholarships", label: "Scholarships" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-600/25">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="leading-none">
            <span className="block text-lg font-extrabold tracking-tight text-slate-900">
              ScholarSphere
            </span>
            <span className="block text-[11px] font-medium tracking-wide text-slate-500">
              Scholarships for international students
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/scholarships">Find scholarships</Link>
          </Button>
          <Button asChild size="sm" variant="outline" className="md:hidden">
            <Link href="/scholarships">Browse</Link>
          </Button>
        </div>
      </div>
      <nav className="flex items-center gap-1 overflow-x-auto px-4 pb-3 md:hidden">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="whitespace-nowrap rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
