"use client";

import Link from "next/link";
import { FileText } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import { RiskBadge } from "@/components/RiskBadge";
import { formatDate } from "@/lib/utils";
import type { Audit } from "@/types";

type HistoryItem = Pick<
  Audit,
  "id" | "original_question" | "trust_score" | "risk_level" | "status" | "created_at"
>;

export function AuditHistory({ audits }: { audits: HistoryItem[] }) {
  const { t, locale } = useI18n();

  if (audits.length === 0) {
    return (
      <div className="card flex flex-col items-center gap-3 p-10 text-center">
        <FileText className="h-8 w-8 text-slate-300" />
        <p className="text-sm text-muted">{t("dashboard.noHistory")}</p>
        <Link href="/audit" className="btn-primary">
          {t("dashboard.newAudit")}
        </Link>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-soft">
      {audits.map((a) => (
        <li key={a.id}>
          <Link
            href={`/result/${a.id}`}
            className="flex items-center justify-between gap-4 p-4 hover:bg-slate-50"
          >
            <div className="min-w-0">
              <p className="truncate font-medium text-ink">
                {a.original_question}
              </p>
              <p className="text-xs text-muted">
                {formatDate(a.created_at, locale)}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              {typeof a.trust_score === "number" && (
                <span className="text-sm font-bold text-ink">
                  {a.trust_score}/100
                </span>
              )}
              <RiskBadge value={a.status} />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
