import type { Metadata } from "next";
import { GUIDES } from "@/lib/guides-data";
import { CATEGORY_LABELS, CATEGORY_ICONS, Category } from "@/types";
import GuideCard from "@/components/GuideCard";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Guides dépannage habitat — Électricité, Plomberie, Climatisation",
  description: "Guides pratiques pour diagnostiquer et gérer les pannes habitat : électricité, plomberie, climatisation, électroménager, serrurerie.",
};

const CATEGORIES: Category[] = ["electricite", "plomberie", "climatisation", "electromenager", "serrurerie", "general"];

export default function GuidesPage({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string }>;
}) {
  return <GuidesPageContent searchParamsPromise={searchParams} />;
}

async function GuidesPageContent({ searchParamsPromise }: { searchParamsPromise: Promise<{ categorie?: string }> }) {
  const sp = await searchParamsPromise;
  const activeCategory = sp.categorie as Category | undefined;

  const filteredGuides = activeCategory
    ? GUIDES.filter((g) => g.category === activeCategory)
    : GUIDES;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600">
            <BookOpen className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Base de connaissances</h1>
          <p className="mt-2 text-slate-500 max-w-xl mx-auto">
            {GUIDES.length} guides pratiques pour diagnostiquer et gérer les pannes habitat en toute sécurité.
          </p>
        </div>

        {/* Category filter */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <Link
            href="/guides"
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              !activeCategory
                ? "bg-blue-600 text-white shadow-sm"
                : "border border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-700"
            }`}
          >
            Tous ({GUIDES.length})
          </Link>
          {CATEGORIES.map((cat) => {
            const count = GUIDES.filter((g) => g.category === cat).length;
            if (count === 0) return null;
            return (
              <Link
                key={cat}
                href={`/guides?categorie=${cat}`}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-700"
                }`}
              >
                <span>{CATEGORY_ICONS[cat]}</span>
                {CATEGORY_LABELS[cat]} ({count})
              </Link>
            );
          })}
        </div>

        {/* Guides grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredGuides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>

        {filteredGuides.length === 0 && (
          <div className="py-16 text-center text-slate-400">Aucun guide dans cette catégorie.</div>
        )}
      </div>
    </div>
  );
}
