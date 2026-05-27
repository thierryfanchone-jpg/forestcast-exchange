"use client";

import { motion } from "framer-motion";

export function SentimentBar({ probability }: { probability: number }) {
  const yes = Math.round(probability * 100);
  const no = 100 - yes;
  return (
    <div className="panel p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-ink-secondary">
          Market sentiment
        </span>
        <span className="font-mono text-xs text-ink-secondary">last 24h</span>
      </div>
      <div className="relative h-3 overflow-hidden rounded-full bg-white/[0.05]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${yes}%` }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-accent-green to-accent-blue"
        />
      </div>
      <div className="mt-2 flex justify-between font-mono text-xs">
        <span className="text-accent-green">YES {yes}%</span>
        <span className="text-danger">NO {no}%</span>
      </div>
    </div>
  );
}
