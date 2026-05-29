"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, User as UserIcon } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { createClient } from "@/lib/supabase/client";
import { useI18n } from "@/components/I18nProvider";

export function AuthButton() {
  const { user, loading } = useUser();
  const { t } = useI18n();
  const router = useRouter();

  async function signOut() {
    const supabase = createClient();
    await supabase?.auth.signOut();
    router.push("/");
    router.refresh();
  }

  if (loading) {
    return <div className="h-9 w-20 animate-pulse rounded-lg bg-slate-200" />;
  }

  if (!user) {
    return (
      <Link href="/login" className="btn-primary">
        {t("nav.login")}
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link href="/account" className="btn-ghost px-2.5" aria-label={t("nav.account")}>
        <UserIcon className="h-4 w-4" />
      </Link>
      <button type="button" onClick={signOut} className="btn-secondary">
        <LogOut className="h-4 w-4" />
        <span className="hidden sm:inline">{t("nav.logout")}</span>
      </button>
    </div>
  );
}
