"use client";

import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";

const TIERS: { key: string; color: string; range: string }[] = [
  { key: "low", color: "#4ade80", range: "< 3.5" },
  { key: "moderate", color: "#eab308", range: "3.5 – 4.5" },
  { key: "high", color: "#f97316", range: "4.5 – 6.0" },
  { key: "severe", color: "#dc2626", range: "≥ 6.0" },
];

export function MapLegend() {
  const t = useTranslations("map");
  return (
    <Card className="pointer-events-auto w-48 p-3">
      <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-wide uppercase">
        {t("legendMagnitude")}
      </p>
      <ul className="space-y-1.5">
        {TIERS.map((tier) => (
          <li key={tier.key} className="flex items-center gap-2 text-xs">
            <span
              className="inline-block size-3 rounded-full border border-white/60"
              style={{ background: tier.color }}
            />
            <span className="text-muted-foreground">{tier.range}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
