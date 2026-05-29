"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import { createClient } from "@/lib/supabase/client";
import { CreditCounter } from "@/components/CreditCounter";
import { formatDate } from "@/lib/utils";
import type { Profile } from "@/types";

export function AccountView({ profile }: { profile: Profile }) {
  const { t, locale } = useI18n();
  const router = useRouter();

  async function signOut() {
    const supabase = createClient();
    await supabase?.auth.signOut();
    router.push("/");
    router.refresh();
  }

  const rows = [
    { label: t("account.email"), value: profile.email ?? "—" },
    {
      label: t("account.plan"),
      value: <span className="capitalize">{profile.plan}</span>,
    },
    {
      label: t("account.credits"),
      value: (
        <CreditCounter
          credits={profile.audit_credits}
          unlimited={profile.is_unlimited}
        />
      ),
    },
    {
      label: t("account.memberSince"),
      value: formatDate(profile.created_at, locale),
    },
  ];

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="mb-6 text-2xl font-bold text-ink">{t("account.title")}</h1>
      <div className="card divide-y divide-slate-200">
        {rows.map((r) => (
          <div
            key={r.label}
            className="flex items-center justify-between gap-4 p-4"
          >
            <span className="text-sm text-muted">{r.label}</span>
            <span className="text-sm font-medium text-ink">{r.value}</span>
          </div>
        ))}
      </div>
      <button onClick={signOut} className="btn-secondary mt-6 w-full">
        <LogOut className="h-4 w-4" />
        {t("account.logout")}
      </button>
    </div>
  );
}
