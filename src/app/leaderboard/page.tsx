"use client";

import { useState } from "react";
import { Trophy } from "lucide-react";
import { MOCK_LEADERBOARD } from "@/lib/mock/leaderboard";
import { formatCurrency, cn } from "@/lib/utils";

type Range = "Weekly" | "Monthly" | "All-time";
type Sort = "ROI" | "Volume" | "Accuracy";

export default function LeaderboardPage() {
  const [range, setRange] = useState<Range>("Weekly");
  const [sort, setSort] = useState<Sort>("ROI");

  const rows = [...MOCK_LEADERBOARD].sort((a, b) => {
    if (sort === "Volume") return b.volume - a.volume;
    if (sort === "Accuracy") return b.accuracy - a.accuracy;
    return b.roi - a.roi;
  });

  const top3 = rows.slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <header className="mb-8">
        <p className="font-mono text-xs uppercase tracking-widest text-accent-green">Leaderboard</p>
        <h1 className="mt-1 font-display text-3xl font-bold tracking-tight md:text-4xl">
          Top forecasters
        </h1>
        <p className="mt-2 max-w-xl text-sm text-ink-secondary">
          Ranking by realised performance across resolved event contracts.
        </p>
      </header>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1 rounded-xl border border-white/[0.06] bg-white/[0.03] p-1 text-xs">
          {(["Weekly", "Monthly", "All-time"] as Range[]).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={cn(
                "rounded-lg px-3 py-1.5 transition-colors",
                range === r ? "bg-white/[0.08] text-ink-primary" : "text-ink-secondary",
              )}
            >
              {r}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-1 rounded-xl border border-white/[0.06] bg-white/[0.03] p-1 text-xs">
          {(["ROI", "Volume", "Accuracy"] as Sort[]).map((s) => (
            <button
              key={s}
              onClick={() => setSort(s)}
              className={cn(
                "rounded-lg px-3 py-1.5 transition-colors",
                sort === s ? "bg-white/[0.08] text-ink-primary" : "text-ink-secondary",
              )}
            >
              Sort · {s}
            </button>
          ))}
        </div>
      </div>

      <section className="mb-8 grid gap-4 md:grid-cols-3">
        {top3.map((u, i) => (
          <div
            key={u.handle}
            className={cn(
              "panel relative overflow-hidden p-6",
              i === 0 && "ring-1 ring-warn/40",
            )}
          >
            {i === 0 ? (
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-warn/20 blur-3xl" />
            ) : null}
            <div className="flex items-center gap-3">
              <Trophy
                className={cn(
                  "h-5 w-5",
                  i === 0 ? "text-warn" : i === 1 ? "text-ink-secondary" : "text-amber-700",
                )}
              />
              <span className="font-mono text-xs text-ink-secondary">#{i + 1}</span>
            </div>
            <div className="mt-4 flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={u.avatar} alt="" className="h-12 w-12 rounded-full bg-white/[0.05]" />
              <div>
                <div className="text-base font-semibold">{u.handle}</div>
                <div className="text-xs text-ink-secondary">{u.level} · {u.badges.join(" · ") || "—"}</div>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              <Mini label="ROI" value={`+${u.roi.toFixed(0)}%`} positive />
              <Mini label="Volume" value={formatCurrency(u.volume)} />
              <Mini label="Acc" value={`${(u.accuracy * 100).toFixed(0)}%`} />
            </div>
          </div>
        ))}
      </section>

      <div className="overflow-hidden rounded-2xl border border-white/[0.06]">
        <table className="w-full text-sm">
          <thead className="bg-white/[0.02] text-xs uppercase tracking-wider text-ink-secondary">
            <tr>
              <th className="px-5 py-3 text-left">#</th>
              <th className="px-5 py-3 text-left">Trader</th>
              <th className="px-5 py-3 text-right">ROI</th>
              <th className="px-5 py-3 text-right">Volume</th>
              <th className="px-5 py-3 text-right">Accuracy</th>
              <th className="px-5 py-3 text-right">Level</th>
              <th className="px-5 py-3 text-right">Badges</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {rows.map((u, i) => (
              <tr key={u.handle} className="bg-surface-1/40 hover:bg-surface-2/40">
                <td className="px-5 py-3 font-mono text-ink-secondary">{i + 1}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={u.avatar}
                      alt=""
                      className="h-7 w-7 rounded-full border border-white/[0.08] bg-white/[0.05]"
                    />
                    {u.handle}
                  </div>
                </td>
                <td className="px-5 py-3 text-right font-mono text-accent-green">+{u.roi.toFixed(0)}%</td>
                <td className="px-5 py-3 text-right font-mono">{formatCurrency(u.volume)}</td>
                <td className="px-5 py-3 text-right font-mono">{(u.accuracy * 100).toFixed(1)}%</td>
                <td className="px-5 py-3 text-right"><span className="chip">{u.level}</span></td>
                <td className="px-5 py-3 text-right text-xs text-ink-secondary">
                  {u.badges.join(" · ") || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Mini({ label, value, positive }: { label: string; value: string; positive?: boolean }) {
  return (
    <div className="rounded-xl border border-white/[0.05] bg-bg/40 px-3 py-2">
      <div className="font-mono text-[10px] uppercase tracking-wider text-ink-secondary">
        {label}
      </div>
      <div className={cn("mt-0.5 font-mono text-sm font-semibold", positive && "text-accent-green")}>
        {value}
      </div>
    </div>
  );
}
