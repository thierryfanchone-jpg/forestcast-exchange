import { cn } from "@/lib/utils";
import { magnitudeTier } from "@/lib/demo-data/earthquakes";

const TIER_STYLES: Record<string, string> = {
  low: "bg-magnitude-low/15 text-magnitude-low border-magnitude-low/30",
  moderate: "bg-magnitude-moderate/15 text-magnitude-moderate border-magnitude-moderate/40",
  high: "bg-magnitude-high/15 text-magnitude-high border-magnitude-high/30",
  severe: "bg-magnitude-severe/15 text-magnitude-severe border-magnitude-severe/30",
};

export function MagnitudeBadge({
  magnitude,
  className,
}: {
  magnitude: number;
  className?: string;
}) {
  const tier = magnitudeTier(magnitude);
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-semibold tabular-nums",
        TIER_STYLES[tier],
        className,
      )}
    >
      M {magnitude.toFixed(1)}
    </span>
  );
}

export function magnitudeDotColor(magnitude: number) {
  const tier = magnitudeTier(magnitude);
  return {
    low: "#4ade80",
    moderate: "#eab308",
    high: "#f97316",
    severe: "#dc2626",
  }[tier];
}
