"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { MarketCard } from "@/components/markets/MarketCard";
import { cn } from "@/lib/utils";
import type { Market, MarketCategory } from "@/types";

const CATEGORIES: ("All" | MarketCategory)[] = [
  "All",
  "Politics",
  "Economy",
  "Crypto",
  "Sports",
  "Caribbean",
  "Africa",
  "Technology",
  "Energy",
];

type Sort = "trending" | "volume" | "closing";

export function MarketsExplorer({ markets }: { markets: Market[] }) {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("trending");

  const filtered = useMemo(() => {
    let out = [...markets];
    if (cat !== "All") out = out.filter((m) => m.category === cat);
    if (q) {
      const s = q.toLowerCase();
      out = out.filter(
        (m) =>
          m.title.toLowerCase().includes(s) ||
          m.tags.join(" ").toLowerCase().includes(s),
      );
    }
    if (sort === "volume") out.sort((a, b) => b.volume - a.volume);
    else if (sort === "closing")
      out.sort((a, b) => new Date(a.closesAt).getTime() - new Date(b.closesAt).getTime());
    else out.sort((a, b) => b.liquidity - a.liquidity);
    return out;
  }, [markets, cat, q, sort]);

  return (
    <>
      <div className="sticky top-16 z-30 -mx-6 mb-6 border-y border-white/[0.05] bg-bg/85 px-6 py-3 backdrop-blur-xl">
        <div className="flex flex-wrap items-center gap-3">
          <label className="relative flex max-w-md flex-1 items-center">
            <Search className="absolute left-3 h-4 w-4 text-ink-secondary" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search markets, tickers, tags…"
              className="h-10 w-full rounded-xl border border-white/[0.06] bg-white/[0.03] pl-9 pr-3 text-sm placeholder:text-ink-secondary focus:border-accent-green/40 focus:outline-none focus:ring-2 focus:ring-accent-green/20"
            />
          </label>

          <div className="ml-auto flex items-center gap-1 rounded-xl border border-white/[0.06] bg-white/[0.03] p-1 text-xs">
            {(["trending", "volume", "closing"] as Sort[]).map((s) => (
              <button
                key={s}
                onClick={() => setSort(s)}
                className={cn(
                  "rounded-lg px-3 py-1.5 capitalize transition-colors",
                  sort === s ? "bg-white/[0.08] text-ink-primary" : "text-ink-secondary",
                )}
              >
                {s}
              </button>
            ))}
          </div>

          <button className="btn-secondary h-10">
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </button>
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1.5 text-xs transition-colors",
                cat === c
                  ? "border-accent-green/40 bg-accent-green/10 text-accent-green"
                  : "border-white/[0.06] bg-white/[0.02] text-ink-secondary hover:border-white/[0.12] hover:text-ink-primary",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="panel p-12 text-center text-sm text-ink-secondary">
          No markets match your filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m) => (
            <MarketCard key={m.id} market={m} />
          ))}
        </div>
      )}
    </>
  );
}
