"use client";

import Link from "next/link";
import { PlusCircle, ShoppingCart, FileCheck2, Gauge } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import { CreditCounter } from "@/components/CreditCounter";
import { AuditHistory } from "@/components/AuditHistory";
import { formatDate } from "@/lib/utils";
import type { Audit, Payment, Profile } from "@/types";

type HistoryItem = Pick<
  Audit,
  "id" | "original_question" | "trust_score" | "risk_level" | "status" | "created_at"
>;

export function DashboardView({
  profile,
  audits,
  payments,
  totalAudits,
  avgScore,
}: {
  profile: Profile;
  audits: HistoryItem[];
  payments: Payment[];
  totalAudits: number;
  avgScore: number | null;
}) {
  const { t, locale } = useI18n();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-ink">{t("dashboard.title")}</h1>
        <div className="flex items-center gap-2">
          <Link href="/audit" className="btn-primary">
            <PlusCircle className="h-4 w-4" />
            {t("dashboard.newAudit")}
          </Link>
          <Link href="/pricing" className="btn-secondary">
            <ShoppingCart className="h-4 w-4" />
            {t("dashboard.buyCredits")}
          </Link>
        </div>
      </div>

      {/* Profil */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="card p-5">
          <p className="text-sm text-muted">{t("dashboard.email")}</p>
          <p className="mt-1 truncate font-medium text-ink">
            {profile.email ?? "—"}
          </p>
        </div>
        <div className="card flex items-center justify-between p-5">
          <span className="text-sm text-muted">{t("dashboard.creditsLeft")}</span>
          <CreditCounter
            credits={profile.audit_credits}
            unlimited={profile.is_unlimited}
          />
        </div>
        <div className="card flex items-center justify-between p-5">
          <span className="text-sm text-muted">{t("dashboard.currentPlan")}</span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold capitalize text-ink">
            {profile.plan}
          </span>
        </div>
      </div>

      {/* Statistiques */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-ink">
          {t("dashboard.stats")}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="card flex items-center gap-4 p-5">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <FileCheck2 className="h-6 w-6" />
            </span>
            <div>
              <p className="text-2xl font-bold text-ink">{totalAudits}</p>
              <p className="text-sm text-muted">{t("dashboard.totalAudits")}</p>
            </div>
          </div>
          <div className="card flex items-center gap-4 p-5">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-trust-light text-trust">
              <Gauge className="h-6 w-6" />
            </span>
            <div>
              <p className="text-2xl font-bold text-ink">
                {avgScore !== null ? `${avgScore}/100` : "—"}
              </p>
              <p className="text-sm text-muted">{t("dashboard.avgScore")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Historique */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-ink">
          {t("dashboard.history")}
        </h2>
        <AuditHistory audits={audits} />
      </div>

      {/* Paiements */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-ink">
          {t("dashboard.payments")}
        </h2>
        {payments.length === 0 ? (
          <p className="text-sm text-muted">{t("dashboard.noPayments")}</p>
        ) : (
          <ul className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-soft">
            {payments.map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between gap-4 p-4 text-sm"
              >
                <div>
                  <p className="font-medium capitalize text-ink">
                    {p.product_type ?? "—"} · {p.provider ?? "—"}
                  </p>
                  <p className="text-xs text-muted">
                    {formatDate(p.created_at, locale)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-ink">
                    {p.amount != null
                      ? `${(p.amount / 100).toFixed(2)} ${p.currency}`
                      : "—"}
                  </p>
                  <p className="text-xs capitalize text-muted">{p.status ?? "—"}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
