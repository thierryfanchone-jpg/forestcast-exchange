"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, AlertTriangle } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import { CreditCounter } from "@/components/CreditCounter";
import { auditInputSchema, type AuditInput } from "@/lib/validation";
import { LOCALES, LOCALE_LABELS } from "@/lib/i18n";

interface Props {
  credits: number;
  unlimited: boolean;
}

export function AuditForm({ credits, unlimited }: Props) {
  const { t, locale } = useI18n();
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuditInput>({
    resolver: zodResolver(auditInputSchema),
    defaultValues: { report_language: locale },
  });

  const noCredits = !unlimited && credits <= 0;

  async function onSubmit(values: AuditInput) {
    setServerError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        setServerError(data.error ?? t("common.error"));
        setSubmitting(false);
        return;
      }
      router.push(`/result/${data.id}`);
    } catch {
      setServerError(t("common.error"));
      setSubmitting(false);
    }
  }

  return (
    <div className="card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-ink">{t("audit.title")}</h1>
        <CreditCounter credits={credits} unlimited={unlimited} />
      </div>
      <p className="mb-6 text-sm text-muted">{t("audit.subtitle")}</p>

      {noCredits && (
        <div className="mb-6 flex flex-col gap-3 rounded-lg bg-warn-light p-4 text-sm text-warn sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            {t("audit.noCredits")}
          </span>
          <Link href="/pricing" className="btn-primary shrink-0">
            {t("audit.buyCredits")}
          </Link>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="label" htmlFor="original_question">
            {t("audit.question")}
          </label>
          <textarea
            id="original_question"
            rows={3}
            className="input resize-y"
            placeholder={t("audit.questionPlaceholder")}
            {...register("original_question")}
          />
          {errors.original_question && (
            <p className="mt-1 text-sm text-danger">
              {errors.original_question.message}
            </p>
          )}
        </div>

        <div>
          <label className="label" htmlFor="ai_answer">
            {t("audit.answer")}
          </label>
          <textarea
            id="ai_answer"
            rows={7}
            className="input resize-y"
            placeholder={t("audit.answerPlaceholder")}
            {...register("ai_answer")}
          />
          {errors.ai_answer && (
            <p className="mt-1 text-sm text-danger">{errors.ai_answer.message}</p>
          )}
        </div>

        <div>
          <label className="label" htmlFor="report_language">
            {t("audit.language")}
          </label>
          <select
            id="report_language"
            className="input"
            {...register("report_language")}
          >
            {LOCALES.map((l) => (
              <option key={l} value={l}>
                {LOCALE_LABELS[l]}
              </option>
            ))}
          </select>
        </div>

        {serverError && (
          <p className="rounded-lg bg-danger-light p-3 text-sm text-danger">
            {serverError}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting || noCredits}
          className="btn-primary w-full"
        >
          <ShieldCheck className="h-4 w-4" />
          {submitting ? t("audit.analyzing") : t("audit.submit")}
        </button>
      </form>
    </div>
  );
}
