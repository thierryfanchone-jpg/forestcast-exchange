import Link from "next/link";
import { Guide, CATEGORY_LABELS, CATEGORY_ICONS } from "@/types";
import { Clock, ChevronRight } from "lucide-react";

interface GuideCardProps {
  guide: Guide;
}

export default function GuideCard({ guide }: GuideCardProps) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="group flex flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:border-blue-200 hover:shadow-md"
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
          <span>{CATEGORY_ICONS[guide.category]}</span>
          {CATEGORY_LABELS[guide.category]}
        </span>
        <span className="flex items-center gap-1 text-xs text-slate-400">
          <Clock className="h-3.5 w-3.5" />
          {guide.readingTime} min
        </span>
      </div>
      <h3 className="mb-2 flex-1 text-base font-semibold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
        {guide.title}
      </h3>
      <p className="mb-4 text-sm text-slate-500 line-clamp-2">
        {guide.content.intro}
      </p>
      <div className="flex items-center gap-1 text-sm font-medium text-blue-600">
        Lire le guide
        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}
