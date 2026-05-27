import type { Metadata } from "next";
import { MarketsExplorer } from "./MarketsExplorer";
import { MOCK_MARKETS } from "@/lib/mock/markets";

export const metadata: Metadata = {
  title: "Markets",
  description: "Explore Forecaxt's forecast exchange. Live probability across politics, economy, crypto, sports, Caribbean and Africa.",
};

export default function MarketsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <header className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-accent-green">Markets</p>
          <h1 className="mt-1 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Forecast exchange
          </h1>
          <p className="mt-2 max-w-xl text-sm text-ink-secondary">
            {MOCK_MARKETS.length} active event contracts across {new Set(MOCK_MARKETS.map((m) => m.category)).size} categories.
            Real probability, real liquidity.
          </p>
        </div>
      </header>
      <MarketsExplorer markets={MOCK_MARKETS} />
    </div>
  );
}
