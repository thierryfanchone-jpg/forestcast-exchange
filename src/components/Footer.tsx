"use client";

import Link from "next/link";
import { useI18n } from "@/components/I18nProvider";

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-app flex flex-col items-center justify-between gap-4 py-8 text-sm text-muted sm:flex-row">
        <p>© {year} TrustLayer AI. {t("common.tagline")}</p>
        <nav className="flex items-center gap-4">
          <Link href="/pricing" className="hover:text-ink">
            {t("nav.pricing")}
          </Link>
          <Link href="/audit" className="hover:text-ink">
            {t("nav.audit")}
          </Link>
          <Link href="/login" className="hover:text-ink">
            {t("nav.login")}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
