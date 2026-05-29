"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { AuthButton } from "@/components/AuthButton";

export function Header() {
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="container-app flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-ink">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <span className="text-lg">TrustLayer AI</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Link href="/audit" className="btn-ghost">
            {t("nav.audit")}
          </Link>
          <Link href="/dashboard" className="btn-ghost">
            {t("nav.dashboard")}
          </Link>
          <Link href="/pricing" className="btn-ghost">
            {t("nav.pricing")}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <AuthButton />
        </div>
      </div>
    </header>
  );
}
