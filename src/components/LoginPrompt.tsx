"use client";

import Link from "next/link";
import { LogIn } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";

/** Invitation à se connecter affichée sur les pages protégées. */
export function LoginPrompt({ next }: { next?: string }) {
  const { t } = useI18n();
  const href = next ? `/login?next=${encodeURIComponent(next)}` : "/login";

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-xl border border-slate-200 bg-white p-8 text-center shadow-soft">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
        <LogIn className="h-6 w-6" />
      </span>
      <h2 className="text-lg font-semibold text-ink">{t("auth.loginTitle")}</h2>
      <p className="text-sm text-muted">{t("audit.loginRequired")}</p>
      <Link href={href} className="btn-primary">
        {t("nav.login")}
      </Link>
    </div>
  );
}
