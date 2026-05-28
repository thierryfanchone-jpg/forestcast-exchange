"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Activity, Clock, Droplets } from "lucide-react";
import { Sparkline } from "@/components/ui/Sparkline";
import type { Market } from "@/types";
import { formatCurrency, formatProb, timeUntil } from "@/lib/utils";

const CATEGORY_TINT: Record<Market["category"], string> = {
  Politics: "from-accent-blue/15 to-transparent",
  Economy: "from-accent-green/15 to-transparent",
  Crypto: "from-amber-400/15 to-transparent",
  Sports: "from-fuchsia-400/15 to-transparent",
  Caribbean: "from-cyan-400/15 to-transparent",
  Africa: "from-emerald-400/15 to-transparent",
  Technology: "from-sky-400/15 to-transparent",
  Energy: "from-orange-400/15 to-transparent",
};

export function MarketCard({ market }: { market: Market }) {
  const last = market.series[market.series.length - 1].p;
  const prev = market.series[Math.max(0, market.series.length - 8)].p;
  const delta = (last - prev) * 100;

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="group relative h-full"
    >
      <Link
        href={`/markets/${market.slug}`}
        className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-surface-1/80 p-5 shadow-panel transition-colors hover:border-white/[0.12]"
      >
        <div
          className={`pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${CATEGORY_TINT[market.category]}`}
        />
        <div className="relative flex items-start justify-between gap-3">
          <span className="chip">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
            {market.category}
          </span>
          <span className="font-mono text-xs text-ink-secondary">
            <Clock className="mr-1 inline h-3 w-3" />
            {timeUntil(market.closesAt)}
          </span>
        </div>

        <h3 className="relative mt-4 line-clamp-3 text-base font-semibold leading-snug text-ink-primary">
          {market.title}
        </h3>

        <div className="relative mt-4 flex items-end justify-between gap-2">
          <div>
            <div className="font-display text-3xl font-bold tracking-tight text-ink-primary">
              {formatProb(last)}
            </div>
            <div
              className={`mt-0.5 font-mono text-xs ${
                delta >= 0 ? "text-accent-green" : "text-danger"
              }`}
            >
              {delta >= 0 ? "▲" : "▼"} {Math.abs(delta).toFixed(1)} pts · 7d
            </div>
          </div>
          <Sparkline data={market.series.slice(-32)} positive={delta >= 0} />
        </div>

        <div className="relative mt-5 grid grid-cols-3 gap-3 border-t border-white/[0.05] pt-4 text-xs text-ink-secondary">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-wider">Volume</div>
            <div className="mt-0.5 font-mono text-ink-primary">
              {formatCurrency(market.volume)}
            </div>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-wider">
              <Droplets className="-mt-0.5 mr-1 inline h-3 w-3" />
              Liquidity
            </div>
            <div className="mt-0.5 font-mono text-ink-primary">
              {formatCurrency(market.liquidity)}
            </div>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-wider">
              <Activity className="-mt-0.5 mr-1 inline h-3 w-3" />
              Open Int.
            </div>
            <div className="mt-0.5 font-mono text-ink-primary">
              {formatCurrency(market.openInterest)}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
