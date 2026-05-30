import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getGuideBySlug, GUIDES } from "@/lib/guides-data";
import { CATEGORY_LABELS, CATEGORY_ICONS } from "@/types";
import DangerBadge from "@/components/DangerBadge";
import { CheckCircle2, XCircle, Clock, ChevronLeft, BookOpen, Wrench } from "lucide-react";

export async function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: "Guide introuvable" };
  return {
    title: guide.title,
    description: guide.content.intro,
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const dangerLevel = guide.content.dangers.length > 2 ? "medium" : "low";

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/guides" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
            <ChevronLeft className="h-4 w-4" />
            Guides
          </Link>
          <span>/</span>
          <Link
            href={`/guides?categorie=${guide.category}`}
            className="flex items-center gap-1 hover:text-blue-600 transition-colors"
          >
            <span>{CATEGORY_ICONS[guide.category]}</span>
            {CATEGORY_LABELS[guide.category]}
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
              <span>{CATEGORY_ICONS[guide.category]}</span>
              {CATEGORY_LABELS[guide.category]}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Clock className="h-3.5 w-3.5" />
              {guide.readingTime} min de lecture
            </span>
            <DangerBadge level={dangerLevel} size="sm" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{guide.title}</h1>
          <p className="mt-3 text-slate-500 leading-relaxed">{guide.content.intro}</p>
        </div>

        <div className="space-y-6">
          {/* Symptoms */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 font-bold text-slate-900">
              <BookOpen className="h-5 w-5 text-blue-500" />
              Symptômes
            </h2>
            <ul className="space-y-2">
              {guide.content.symptoms.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Probable causes */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 font-bold text-slate-900">Causes probables</h2>
            <ul className="space-y-2">
              {guide.content.probableCauses.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Simple checks */}
          <div className="rounded-2xl border border-green-100 bg-green-50 p-6">
            <h2 className="mb-4 flex items-center gap-2 font-bold text-green-900">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              Vérifications simples à faire
            </h2>
            <ul className="space-y-2">
              {guide.content.simpleChecks.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-green-800">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Dangers */}
          <div className="rounded-2xl border border-red-100 bg-red-50 p-6">
            <h2 className="mb-4 flex items-center gap-2 font-bold text-red-900">
              <XCircle className="h-5 w-5 text-red-600" />
              Dangers — À ne pas ignorer
            </h2>
            <ul className="space-y-2">
              {guide.content.dangers.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-red-800">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          {/* When to call pro */}
          <div className="rounded-2xl border border-orange-100 bg-orange-50 p-6">
            <h2 className="mb-4 flex items-center gap-2 font-bold text-orange-900">
              <Wrench className="h-5 w-5 text-orange-600" />
              Quand appeler un professionnel ?
            </h2>
            <ul className="space-y-2">
              {guide.content.whenToCallPro.map((w, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-orange-800">
                  <span className="mt-0.5 text-orange-500">→</span>
                  {w}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6 text-center">
            <p className="mb-4 font-medium text-blue-900">
              Vous avez ce problème ? Obtenez un diagnostic personnalisé.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link href="/diagnostic" className="btn-primary">
                Diagnostic IA gratuit
              </Link>
              <Link href="/urgence" className="btn-urgent">
                Appeler un artisan
              </Link>
            </div>
          </div>
        </div>

        {/* Related guides */}
        <div className="mt-10">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
            Autres guides {CATEGORY_LABELS[guide.category]}
          </h3>
          <div className="flex flex-col gap-2">
            {GUIDES.filter((g) => g.category === guide.category && g.slug !== guide.slug)
              .slice(0, 3)
              .map((g) => (
                <Link
                  key={g.slug}
                  href={`/guides/${g.slug}`}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700 transition-colors"
                >
                  <ChevronLeft className="h-4 w-4 rotate-180 text-blue-400" />
                  {g.title}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
