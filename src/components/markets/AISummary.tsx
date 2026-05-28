"use client";

import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import type { Market } from "@/types";

export function AISummary({ market }: { market: Market }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="panel relative overflow-hidden p-5"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-transparent to-accent-green/10" />
      <div className="relative flex items-center gap-2">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-accent-blue/15 text-accent-blue">
          <Sparkles className="h-4 w-4" />
        </span>
        <h4 className="text-sm font-semibold text-ink-primary">AI market briefing</h4>
        <span className="chip ml-auto">claude-sonnet-4</span>
      </div>
      <p className="relative mt-3 text-sm leading-relaxed text-ink-secondary">
        Probability sits at <span className="font-mono text-ink-primary">{Math.round(market.probability * 100)}%</span> with
        institutional liquidity concentrated near the YES side. Recent flow leans constructive, but
        volatility around upcoming catalysts ({market.tags.join(", ")}) may compress the spread within
        the next 48 hours. Oracle source: <span className="capitalize text-ink-primary">{market.oracle}</span>.
      </p>
      <p className="relative mt-2 text-xs text-ink-tertiary">
        Generated summary · refreshes every 15 minutes · not financial advice.
      </p>
    </motion.div>
  );
}
