import Link from "next/link";
import { ArrowRight, CalendarDays, GraduationCap, MapPin, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { deadlineLabel, daysLeft, formatDate } from "@/lib/utils";
import type { ScholarshipItem } from "@/lib/scholarships";

export default function ScholarshipCard({ item }: { item: ScholarshipItem }) {
  const d = daysLeft(item.deadline);
  const urgency = d < 0 ? "danger" : d <= 30 ? "warning" : "success";
  return (
    <Card className="group flex flex-col overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-600/10">
      <div className="h-1.5 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500" />
      <CardContent className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{item.fundingType}</Badge>
          <Badge variant="outline">{item.level}</Badge>
          <Badge variant={urgency}>{deadlineLabel(item.deadline)}</Badge>
        </div>
        <div>
          <h3 className="text-xl font-bold leading-snug tracking-tight text-slate-900 group-hover:text-indigo-700">
            <Link href={`/scholarships/${item.id}`}>{item.title}</Link>
          </h3>
          <p className="mt-1 text-sm font-medium text-slate-500">{item.provider}</p>
        </div>
        <p className="line-clamp-3 text-sm leading-relaxed text-slate-600">
          {item.description}
        </p>
        <div className="mt-auto space-y-2 border-t border-slate-100 pt-4 text-sm text-slate-600">
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-indigo-600" /> {item.country} · {item.region}
          </p>
          <p className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-indigo-600" /> {item.field}
          </p>
          <p className="flex items-center gap-2">
            <Wallet className="h-4 w-4 text-indigo-600" /> {item.amount}
          </p>
          <p className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-indigo-600" />
            Deadline: <span className="font-semibold text-slate-900">{formatDate(item.deadline)}</span>
          </p>
        </div>
        <Link
          href={`/scholarships/${item.id}`}
          className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-800"
        >
          View details <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </CardContent>
    </Card>
  );
}
