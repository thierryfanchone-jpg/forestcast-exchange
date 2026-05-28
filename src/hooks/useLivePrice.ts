"use client";

import { useEffect, useState } from "react";

/**
 * Hook returning a simulated live probability tick.
 *
 * In production this would subscribe to `wss://forecaxt.com/ws/markets/:id`
 * and update on each price event. The mock here jitters the seed value to
 * produce a believable live feed during development.
 */
export function useLivePrice(marketId: string, initial: number): number {
  const [p, setP] = useState(initial);
  useEffect(() => {
    const raf: ReturnType<typeof setInterval> = setInterval(() => {
      setP((prev) => {
        const drift = (Math.random() - 0.5) * 0.012;
        const pull = (initial - prev) * 0.08;
        const next = Math.max(0.02, Math.min(0.98, prev + drift + pull));
        return next;
      });
    }, 2500);
    return () => clearInterval(raf);
  }, [marketId, initial]);
  return p;
}
