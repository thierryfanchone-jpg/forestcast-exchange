"use client";

import Link from "next/link";
import { PlusCircle, ShoppingCart } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import { CreditCounter } from "@/components/CreditCounter";
import { AuditHistory } from "@/components/AuditHistory";
import type { Audit, Profile } from "@/types";

type HistoryItem = Pick<
  Audit,
  "id" | "original_question" | "trust_score" | "risk_level" | "status" | "created_at"
>;

export function DashboardView({
  profile,
  audits,
}: {
  profile: Profile;
  audits: HistoryItem[];
}) {
  const { t } = useI18n();

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

      <div className="grid gap-4 sm:grid-cols-2">
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

      <div>
        <h2 className="mb-3 text-lg font-semibold text-ink">
          {t("dashboard.history")}
        </h2>
        <AuditHistory audits={audits} />
      </div>
    </div>
  );
}
