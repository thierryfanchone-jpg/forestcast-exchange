"use client";

import { useMemo } from "react";
import { rng } from "@/lib/utils";

/**
 * Synthetic order book grouped around a YES probability.
 * Stable across renders thanks to the seeded RNG.
 */
export function OrderBook({ probability, seed = 42 }: { probability: number; seed?: number }) {
  const { bids, asks } = useMemo(() => {
    const r = rng(seed);
    const mid = Math.round(probability * 100);
    const bids = Array.from({ length: 8 }, (_, i) => ({
      price: mid - 1 - i,
      size: Math.round(120 + r() * 4500),
    })).filter((l) => l.price > 0);
    const asks = Array.from({ length: 8 }, (_, i) => ({
      price: mid + 1 + i,
      size: Math.round(120 + r() * 4500),
    })).filter((l) => l.price < 100);
    return { bids, asks };
  }, [probability, seed]);

  const maxSize = Math.max(
    ...bids.map((b) => b.size),
    ...asks.map((a) => a.size),
  );

  return (
    <div className="panel p-4">
      <div className="mb-3 flex items-center justify-between text-xs text-ink-secondary">
        <span className="font-semibold uppercase tracking-wider">Order book</span>
        <span className="font-mono">Depth · 16 levels</span>
      </div>

      <div className="grid grid-cols-3 gap-2 text-[10px] uppercase tracking-wider text-ink-secondary">
        <span>Bid (YES)</span>
        <span className="text-right">Size</span>
        <span className="text-right">Price ¢</span>
      </div>

      <div className="mt-1 space-y-0.5">
        {bids.map((l) => (
          <Row key={`b${l.price}`} side="bid" price={l.price} size={l.size} max={maxSize} />
        ))}
      </div>

      <div className="my-3 flex items-center justify-center gap-3 border-y border-white/[0.05] py-2 font-mono text-sm">
        <span className="text-accent-green">{Math.round(probability * 100)}¢</span>
        <span className="text-ink-secondary">·</span>
        <span className="text-danger">{Math.round((1 - probability) * 100)}¢</span>
      </div>

      <div className="space-y-0.5">
        {asks.map((l) => (
          <Row key={`a${l.price}`} side="ask" price={l.price} size={l.size} max={maxSize} />
        ))}
      </div>
    </div>
  );
}

function Row({
  side,
  price,
  size,
  max,
}: {
  side: "bid" | "ask";
  price: number;
  size: number;
  max: number;
}) {
  const pct = (size / max) * 100;
  const tint = side === "bid" ? "bg-accent-green/10" : "bg-danger/10";
  const text = side === "bid" ? "text-accent-green" : "text-danger";
  return (
    <div className="relative grid grid-cols-3 gap-2 px-1 py-0.5 text-xs">
      <span
        className={`absolute inset-y-0 ${side === "bid" ? "left-0" : "right-0"} rounded ${tint}`}
        style={{ width: `${pct}%` }}
      />
      <span className={`relative font-mono ${text}`}>{side === "bid" ? "BID" : "ASK"}</span>
      <span className="relative text-right font-mono text-ink-primary">{size.toLocaleString()}</span>
      <span className="relative text-right font-mono text-ink-primary">{price}¢</span>
    </div>
  );
}
