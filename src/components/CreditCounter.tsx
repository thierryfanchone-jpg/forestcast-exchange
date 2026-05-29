"use client";

import { Coins, Infinity as InfinityIcon } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";

export function CreditCounter({
  credits,
  unlimited,
}: {
  credits: number;
  unlimited: boolean;
}) {
  const { t } = useI18n();

  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1.5 text-sm font-semibold text-brand-700">
      {unlimited ? (
        <>
          <InfinityIcon className="h-4 w-4" />
          {t("audit.unlimited")}
        </>
      ) : (
        <>
          <Coins className="h-4 w-4" />
          {credits} {t("audit.creditsLeft")}
        </>
      )}
    </span>
  );
}
