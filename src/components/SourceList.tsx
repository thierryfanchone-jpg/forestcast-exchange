"use client";

import { ExternalLink } from "lucide-react";
import type { AuditSource } from "@/types";
import { useI18n } from "@/components/I18nProvider";

export function SourceList({ sources }: { sources: AuditSource[] | null }) {
  const { t } = useI18n();

  if (!sources || sources.length === 0) {
    return <p className="text-sm text-muted">{t("result.noSources")}</p>;
  }

  return (
    <ul className="space-y-3">
      {sources.map((s, i) => (
        <li key={`${s.url}-${i}`} className="rounded-lg border border-slate-200 p-3">
          <a
            href={s.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-2 font-medium text-brand-600 hover:underline"
          >
            <ExternalLink className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{s.title || s.url}</span>
          </a>
          {s.relevance && (
            <p className="mt-1 text-sm text-muted">
              <span className="font-medium">{t("result.relevance")}:</span>{" "}
              {s.relevance}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}
