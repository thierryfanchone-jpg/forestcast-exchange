"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";

export default function SuccessPage() {
  const { t } = useI18n();
  return (
    <div className="container-app flex flex-col items-center py-24 text-center">
      <CheckCircle2 className="h-16 w-16 text-trust" />
      <h1 className="mt-4 text-2xl font-bold text-ink">{t("success.title")}</h1>
      <p className="mt-2 text-muted">{t("success.message")}</p>
      <Link href="/dashboard" className="btn-primary mt-6">
        {t("success.cta")}
      </Link>
    </div>
  );
}
