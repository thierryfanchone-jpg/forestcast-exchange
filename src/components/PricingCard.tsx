"use client";

import { Check } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import { PaymentButtons } from "@/components/PaymentButtons";
import { cn } from "@/lib/utils";
import type { ProductType, PaymentProvider } from "@/types";

interface PlanView {
  type: ProductType;
  credits: number;
  unlimited: boolean;
  recurring: boolean;
  price: number;
  currency: string;
  popular: boolean;
}

export function PricingCard({
  plan,
  available,
}: {
  plan: PlanView;
  available: Record<PaymentProvider, boolean>;
}) {
  const { t } = useI18n();
  const currencySymbol = plan.currency === "EUR" ? "€" : plan.currency;

  return (
    <div
      className={cn(
        "card relative flex flex-col p-6",
        plan.popular && "ring-2 ring-brand-500"
      )}
    >
      {plan.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
          {t("pricing.popular")}
        </span>
      )}

      <h3 className="text-lg font-bold text-ink">{t(`pricing.${plan.type}`)}</h3>

      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-3xl font-bold text-ink">
          {plan.price}
          {currencySymbol}
        </span>
        {plan.recurring && (
          <span className="text-sm text-muted">{t("pricing.perMonth")}</span>
        )}
      </div>

      <ul className="mt-4 space-y-2 text-sm text-ink">
        <li className="flex items-center gap-2">
          <Check className="h-4 w-4 text-trust" />
          {plan.unlimited
            ? t("pricing.unlimitedAudits")
            : `${plan.credits} ${t("pricing.audits")}`}
        </li>
        <li className="flex items-center gap-2">
          <Check className="h-4 w-4 text-trust" />
          {plan.recurring ? t("pricing.perMonth").replace("/", "") : t("pricing.oneTime")}
        </li>
      </ul>

      <div className="mt-6">
        <p className="label">{t("payment.title")}</p>
        <PaymentButtons productType={plan.type} available={available} />
      </div>
    </div>
  );
}
