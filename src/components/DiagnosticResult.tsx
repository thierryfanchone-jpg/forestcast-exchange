import { DiagnosticResult as Result } from "@/types";
import DangerBadge from "@/components/DangerBadge";
import { CheckCircle2, XCircle, HelpCircle, Wrench, ChevronRight } from "lucide-react";
import Link from "next/link";

interface DiagnosticResultProps {
  result: Result;
  onRequestArtisan?: () => void;
}

export default function DiagnosticResult({ result, onRequestArtisan }: DiagnosticResultProps) {
  return (
    <div className="space-y-6 animate-fade-up">
      {/* Summary + danger level */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <h2 className="text-lg font-bold text-slate-900">Résumé du diagnostic</h2>
          <DangerBadge level={result.dangerLevel} />
        </div>
        <p className="text-slate-600 leading-relaxed">{result.summary}</p>
      </div>

      {/* Probable causes */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 flex items-center gap-2 font-semibold text-slate-900">
          <HelpCircle className="h-5 w-5 text-blue-500" />
          Causes probables
        </h3>
        <ul className="space-y-2">
          {result.probableCauses.map((cause, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                {i + 1}
              </span>
              {cause}
            </li>
          ))}
        </ul>
      </div>

      {/* Questions */}
      {result.questions.length > 0 && (
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <h3 className="mb-4 font-semibold text-blue-900">
            Questions complémentaires pour préciser le diagnostic
          </h3>
          <ul className="space-y-2">
            {result.questions.map((q, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-blue-800">
                <span className="mt-0.5 text-blue-500">→</span>
                {q}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Safe actions */}
      <div className="rounded-2xl border border-green-100 bg-green-50 p-6">
        <h3 className="mb-4 flex items-center gap-2 font-semibold text-green-900">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          Actions sûres à faire
        </h3>
        <ul className="space-y-2">
          {result.safeActions.map((action, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-green-800">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
              {action}
            </li>
          ))}
        </ul>
      </div>

      {/* Avoid actions */}
      <div className="rounded-2xl border border-red-100 bg-red-50 p-6">
        <h3 className="mb-4 flex items-center gap-2 font-semibold text-red-900">
          <XCircle className="h-5 w-5 text-red-600" />
          À éviter absolument
        </h3>
        <ul className="space-y-2">
          {result.avoidActions.map((action, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-red-800">
              <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
              {action}
            </li>
          ))}
        </ul>
      </div>

      {/* Professional recommendation */}
      <div
        className={`rounded-2xl border p-6 ${
          result.professionalNeeded
            ? "border-orange-200 bg-orange-50"
            : "border-slate-200 bg-slate-50"
        }`}
      >
        <h3 className="mb-2 flex items-center gap-2 font-semibold text-slate-900">
          <Wrench className="h-5 w-5 text-orange-600" />
          Intervention professionnelle
        </h3>
        {result.professionalNeeded ? (
          <>
            <p className="mb-4 text-sm text-slate-700">
              <strong>Un professionnel est recommandé</strong> pour ce type de problème. Métier conseillé :{" "}
              <strong>{result.recommendedTrade}</strong>.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Link
                href="/urgence"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-orange-700"
                onClick={onRequestArtisan}
              >
                Demander un artisan
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                href="/diagnostic"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-slate-400"
              >
                Nouveau diagnostic
              </Link>
            </div>
          </>
        ) : (
          <p className="text-sm text-slate-600">
            Ce problème peut souvent être résolu sans intervention professionnelle en suivant les actions recommandées. Si le problème persiste, n&apos;hésitez pas à faire appel à un{" "}
            <strong>{result.recommendedTrade}</strong>.
          </p>
        )}
      </div>
    </div>
  );
}
