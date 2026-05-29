"use client";

import Link from "next/link";
import { XCircle } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";

export default function CancelPage() {
  const { t } = useI18n();
  return (
    <div className="container-app flex flex-col items-center py-24 text-center">
      <XCircle className="h-16 w-16 text-muted" />
      <h1 className="mt-4 text-2xl font-bold text-ink">{t("cancel.title")}</h1>
      <p className="mt-2 text-muted">{t("cancel.message")}</p>
      <Link href="/pricing" className="btn-primary mt-6">
        {t("cancel.cta")}
      </Link>
    </div>
  );
}
