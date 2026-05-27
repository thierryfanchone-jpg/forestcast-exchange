import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Forecaxt fee schedule: maker rebates, taker fees, settlement and withdrawal pricing.",
};

const tiers = [
  {
    name: "Retail",
    price: "0.5%",
    sub: "taker fee",
    features: ["0% maker fee", "Free USDC deposits", "$0 settlement", "Email & chat support"],
  },
  {
    name: "Pro",
    price: "0.3%",
    sub: "taker fee · $250/mo",
    accent: true,
    features: [
      "0% maker fee",
      "API + WebSocket access",
      "Higher limits",
      "Priority support",
      "Maker rebate on top venues",
    ],
  },
  {
    name: "Institutional",
    price: "Custom",
    sub: "negotiated",
    features: [
      "Dedicated liquidity desk",
      "FIX gateway",
      "Cross-margin",
      "Compliance reporting",
      "Sub-account management",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <p className="font-mono text-xs uppercase tracking-widest text-accent-green">Pricing</p>
      <h1 className="mt-1 font-display text-4xl font-bold tracking-tight md:text-5xl">
        Transparent, exchange-grade fees.
      </h1>
      <p className="mt-3 max-w-2xl text-ink-secondary">
        No hidden spreads. No custody surprises. Pay maker rebates when you provide liquidity.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={`panel p-6 ${t.accent ? "ring-1 ring-accent-green/40 shadow-glow" : ""}`}
          >
            <div className="font-mono text-xs uppercase tracking-widest text-ink-secondary">
              {t.name}
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-4xl font-bold tracking-tight">{t.price}</span>
              <span className="text-xs text-ink-secondary">{t.sub}</span>
            </div>
            <ul className="mt-5 space-y-2 text-sm text-ink-secondary">
              {t.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-accent-green" /> {f}
                </li>
              ))}
            </ul>
            <Link href={t.name === "Institutional" ? "/contact" : "/register"} className="mt-6 block">
              <Button variant={t.accent ? "primary" : "secondary"} className="w-full">
                {t.name === "Institutional" ? "Talk to sales" : "Get started"}
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
