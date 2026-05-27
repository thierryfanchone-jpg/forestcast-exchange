"use client";

import { useMemo } from "react";
import { rng } from "@/lib/utils";

const HANDLES = ["alpha_macro", "kira", "fortdefrance", "bk_quant", "noor.sn", "rumi.eth", "kovacs"];

export function RecentTrades({ probability, seed = 7 }: { probability: number; seed?: number }) {
  const rows = useMemo(() => {
    const r = rng(seed);
    return Array.from({ length: 18 }, (_, i) => {
      const side = r() > 0.5 ? "YES" : "NO";
      const noise = (r() - 0.5) * 0.06;
      const price = Math.max(0.02, Math.min(0.98, probability + noise));
      const size = Math.round(20 + r() * 1400);
      return {
        id: `t-${i}`,
        side,
        price: Math.round(price * 100),
        size,
        handle: HANDLES[Math.floor(r() * HANDLES.length)],
        ago: `${Math.floor(r() * 60)}s`,
      };
    });
  }, [probability, seed]);

  return (
    <div className="panel">
      <div className="flex items-center justify-between border-b border-white/[0.05] px-5 py-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-ink-secondary">
          Recent trades
        </span>
        <span className="font-mono text-xs text-ink-secondary">live</span>
      </div>
      <div className="grid grid-cols-5 gap-2 px-5 py-2 text-[10px] uppercase tracking-wider text-ink-secondary">
        <span>Side</span>
        <span>Price</span>
        <span>Size</span>
        <span>Trader</span>
        <span className="text-right">Age</span>
      </div>
      <div className="max-h-80 divide-y divide-white/[0.04] overflow-y-auto">
        {rows.map((r) => (
          <div key={r.id} className="grid grid-cols-5 gap-2 px-5 py-2 text-xs">
            <span className={`font-mono ${r.side === "YES" ? "text-accent-green" : "text-danger"}`}>
              {r.side}
            </span>
            <span className="font-mono text-ink-primary">{r.price}¢</span>
            <span className="font-mono text-ink-primary">{r.size}</span>
            <span className="truncate text-ink-secondary">{r.handle}</span>
            <span className="text-right font-mono text-ink-secondary">{r.ago}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
