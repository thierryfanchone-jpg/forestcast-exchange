"use client";

import { useI18n } from "@/components/I18nProvider";
import { PricingCard } from "@/components/PricingCard";
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

export function PricingView({
  plans,
  available,
}: {
  plans: PlanView[];
  available: Record<PaymentProvider, boolean>;
}) {
  const { t } = useI18n();

  return (
    <div className="container-app max-w-5xl py-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-ink">{t("pricing.title")}</h1>
        <p className="mt-2 text-muted">{t("pricing.subtitle")}</p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <PricingCard key={plan.type} plan={plan} available={available} />
        ))}
      </div>
    </div>
  );
}
