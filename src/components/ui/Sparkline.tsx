import type { PricePoint } from "@/types";
import { cn } from "@/lib/utils";

interface Props {
  data: PricePoint[];
  className?: string;
  positive?: boolean;
}

/**
 * Tiny inline area chart used inside market cards.
 * SSR-safe: pure SVG with no client hooks.
 */
export function Sparkline({ data, className, positive }: Props) {
  if (!data.length) return null;
  const w = 120;
  const h = 36;
  const xs = data.map((_, i) => (i / (data.length - 1)) * w);
  const ys = data.map((d) => h - d.p * h);
  const path = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${ys[i].toFixed(2)}`).join(" ");
  const area = `${path} L${w} ${h} L0 ${h} Z`;
  const last = data[data.length - 1].p;
  const first = data[0].p;
  const up = positive ?? last >= first;
  const stroke = up ? "#00D084" : "#FF4560";
  const fillId = `spark-${up ? "g" : "r"}-${Math.round(data[0].t)}`;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={cn("h-9 w-32", className)}
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={fillId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.35" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${fillId})`} />
      <path d={path} fill="none" stroke={stroke} strokeWidth="1.5" />
    </svg>
  );
}
