"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Wallet, Bitcoin } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import { useUser } from "@/hooks/useUser";
import type { ProductType, PaymentProvider } from "@/types";

interface Props {
  productType: ProductType;
  available: Record<PaymentProvider, boolean>;
}

const ENDPOINTS: Record<PaymentProvider, string> = {
  stripe: "/api/checkout/stripe",
  paypal: "/api/checkout/paypal",
  crypto: "/api/checkout/crypto",
};

export function PaymentButtons({ productType, available }: Props) {
  const { t } = useI18n();
  const { user } = useUser();
  const router = useRouter();
  const [pending, setPending] = useState<PaymentProvider | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function pay(provider: PaymentProvider) {
    setError(null);
    if (!user) {
      router.push("/login");
      return;
    }
    setPending(provider);
    try {
      const res = await fetch(ENDPOINTS[provider], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_type: productType }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(data.error ?? t("common.error"));
        setPending(null);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError(t("common.error"));
      setPending(null);
    }
  }

  const methods: { provider: PaymentProvider; label: string; icon: React.ReactNode }[] = [
    { provider: "stripe", label: t("payment.card"), icon: <CreditCard className="h-4 w-4" /> },
    { provider: "paypal", label: t("payment.paypal"), icon: <Wallet className="h-4 w-4" /> },
    { provider: "crypto", label: t("payment.crypto"), icon: <Bitcoin className="h-4 w-4" /> },
  ];

  return (
    <div className="space-y-2">
      {methods.map((m) => (
        <button
          key={m.provider}
          type="button"
          disabled={!available[m.provider] || pending !== null}
          onClick={() => pay(m.provider)}
          className="btn-secondary w-full justify-start"
          title={!available[m.provider] ? t("payment.unavailable") : undefined}
        >
          {m.icon}
          {pending === m.provider ? t("payment.processing") : m.label}
          {!available[m.provider] && (
            <span className="ml-auto text-xs text-muted">×</span>
          )}
        </button>
      ))}
      {error && <p className="text-sm text-danger">{error}</p>}
    </div>
  );
}
