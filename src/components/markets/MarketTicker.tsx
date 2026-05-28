"use client";

import { MOCK_MARKETS } from "@/lib/mock/markets";
import { formatProb } from "@/lib/utils";

/**
 * Hero ticker — a continuously scrolling list of live market probabilities.
 * The list is duplicated so the CSS `animate-ticker` keyframe creates a seamless loop.
 */
export function MarketTicker() {
  const list = MOCK_MARKETS.slice(0, 14);
  const doubled = [...list, ...list];

  return (
    <div className="mask-fade-x relative overflow-hidden border-y border-white/[0.05] bg-surface-1/70 py-3 backdrop-blur-md">
      <div className="flex w-max animate-ticker gap-10">
        {doubled.map((m, i) => {
          const last = m.series[m.series.length - 1].p;
          const prev = m.series[Math.max(0, m.series.length - 8)].p;
          const up = last >= prev;
          return (
            <div
              key={`${m.id}-${i}`}
              className="flex shrink-0 items-center gap-2 text-sm"
            >
              <span className={`h-1.5 w-1.5 rounded-full ${up ? "bg-accent-green animate-pulseDot" : "bg-danger"}`} />
              <span className="font-mono text-xs uppercase tracking-wider text-ink-secondary">
                {m.category.slice(0, 3)}
              </span>
              <span className="text-ink-primary">{m.title.slice(0, 48)}{m.title.length > 48 ? "…" : ""}</span>
              <span className={`font-mono font-semibold ${up ? "text-accent-green" : "text-danger"}`}>
                {formatProb(last)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
