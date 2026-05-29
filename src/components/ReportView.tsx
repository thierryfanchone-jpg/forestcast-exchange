"use client";

import Link from "next/link";
import { CheckCircle2, HelpCircle, AlertTriangle, PlusCircle } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import { ScoreGauge } from "@/components/ScoreGauge";
import { RiskBadge } from "@/components/RiskBadge";
import { SourceList } from "@/components/SourceList";
import type { Audit } from "@/types";

/** Liste d'affirmations avec une icône de ton. */
function ClaimList({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[] | null;
  tone: "trust" | "warn" | "danger";
}) {
  if (!items || items.length === 0) return null;

  const Icon = tone === "trust" ? CheckCircle2 : tone === "warn" ? HelpCircle : AlertTriangle;
  const color =
    tone === "trust" ? "text-trust" : tone === "warn" ? "text-warn" : "text-danger";

  return (
    <div className="card p-5">
      <h3 className={`mb-3 flex items-center gap-2 font-semibold ${color}`}>
        <Icon className="h-5 w-5" />
        {title}
      </h3>
      <ul className="space-y-2">
        {items.map((c, i) => (
          <li key={i} className="flex gap-2 text-sm text-ink">
            <span className={color}>•</span>
            <span>{c}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ReportView({ audit }: { audit: Audit }) {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-ink">{t("result.title")}</h1>
        <Link href="/audit" className="btn-secondary">
          <PlusCircle className="h-4 w-4" />
          {t("result.newAudit")}
        </Link>
      </div>

      {/* Synthèse */}
      <div className="card flex flex-col items-center gap-6 p-6 sm:flex-row sm:justify-around">
        <ScoreGauge score={audit.trust_score ?? 0} label={t("result.trustScore")} />
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-muted">{t("result.riskLevel")}</span>
          <RiskBadge value={audit.risk_level} />
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-muted">{t("result.status")}</span>
          <RiskBadge value={audit.status} />
        </div>
      </div>

      {/* Recommandation */}
      {audit.final_recommendation && (
        <div className="card border-l-4 border-l-brand-500 p-5">
          <h3 className="mb-1 font-semibold text-ink">
            {t("result.recommendation")}
          </h3>
          <p className="text-sm text-ink">{audit.final_recommendation}</p>
        </div>
      )}

      {/* Affirmations */}
      <div className="grid gap-4 md:grid-cols-2">
        <ClaimList
          title={t("result.verifiedClaims")}
          items={audit.verified_claims}
          tone="trust"
        />
        <ClaimList
          title={t("result.uncertainClaims")}
          items={audit.uncertain_claims}
          tone="warn"
        />
        <ClaimList
          title={t("result.riskyClaims")}
          items={audit.risky_claims}
          tone="danger"
        />
        {audit.main_claims && audit.main_claims.length > 0 && (
          <div className="card p-5">
            <h3 className="mb-3 font-semibold text-ink">
              {t("result.mainClaims")}
            </h3>
            <ul className="space-y-2">
              {audit.main_claims.map((c, i) => (
                <li key={i} className="flex gap-2 text-sm text-ink">
                  <span className="text-muted">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Réponse corrigée */}
      {audit.corrected_answer && (
        <div className="card p-5">
          <h3 className="mb-2 font-semibold text-ink">
            {t("result.correctedAnswer")}
          </h3>
          <p className="whitespace-pre-wrap text-sm text-ink">
            {audit.corrected_answer}
          </p>
        </div>
      )}

      {/* Sources */}
      <div className="card p-5">
        <h3 className="mb-3 font-semibold text-ink">{t("result.sources")}</h3>
        <SourceList sources={audit.sources} />
      </div>
    </div>
  );
}
