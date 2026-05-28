import type { Metadata } from "next";
import Link from "next/link";
import { TrendingUp, TrendingDown, Wallet, Briefcase, History, Star } from "lucide-react";
import { PnLChart } from "@/components/portfolio/PnLChart";
import { MOCK_POSITIONS, MOCK_ORDERS, MOCK_NOTIFICATIONS, buildEquityCurve } from "@/lib/mock/portfolio";
import { MOCK_MARKETS } from "@/lib/mock/markets";
import { formatCurrency, signed } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Open positions, P&L, watchlist and order history on Forecaxt.",
};

export default function PortfolioPage() {
  const equity = buildEquityCurve(90);
  const totalPnL = MOCK_POSITIONS.reduce((s, p) => s + p.pnl, 0);
  const exposure = MOCK_POSITIONS.reduce((s, p) => s + p.shares * p.markPrice, 0);
  const watchlist = MOCK_MARKETS.slice(4, 9);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <header className="mb-8">
        <p className="font-mono text-xs uppercase tracking-widest text-accent-green">
          Portfolio
        </p>
        <h1 className="mt-1 font-display text-3xl font-bold tracking-tight md:text-4xl">
          Account dashboard
        </h1>
      </header>

      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <BalanceTile
          label="Total equity"
          value={`$${(equity[equity.length - 1].v).toLocaleString()}`}
          Icon={Wallet}
          accent
        />
        <BalanceTile label="Open exposure" value={formatCurrency(exposure)} Icon={Briefcase} />
        <BalanceTile
          label="Unrealised P&L"
          value={signed(totalPnL) + "$"}
          Icon={totalPnL >= 0 ? TrendingUp : TrendingDown}
          positive={totalPnL >= 0}
        />
        <BalanceTile label="USDC balance" value="$4,210.00" Icon={Wallet} />
      </section>

      <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="panel p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold tracking-tight">Equity curve</h2>
            <div className="flex items-center gap-1 rounded-lg bg-white/[0.03] p-1 text-xs">
              {["7D", "30D", "90D", "ALL"].map((r) => (
                <button
                  key={r}
                  className={`rounded-md px-2 py-1 ${r === "90D" ? "bg-white/[0.08] text-ink-primary" : "text-ink-secondary"}`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <PnLChart data={equity} />
        </div>

        <div className="panel p-5">
          <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold tracking-tight">
            <History className="h-4 w-4 text-accent-blue" /> Activity
          </h2>
          <ul className="space-y-3">
            {MOCK_NOTIFICATIONS.map((n) => (
              <li key={n.id} className="flex gap-3 rounded-xl border border-white/[0.05] bg-bg/40 p-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-green" />
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-ink-primary">{n.title}</div>
                  <div className="text-xs text-ink-secondary">{n.body}</div>
                  <div className="mt-1 font-mono text-[10px] text-ink-tertiary">
                    {new Date(n.createdAt).toLocaleString()}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-6 panel">
        <div className="flex items-center justify-between border-b border-white/[0.05] px-5 py-4">
          <h2 className="font-display text-lg font-bold tracking-tight">Open positions</h2>
          <span className="font-mono text-xs text-ink-secondary">{MOCK_POSITIONS.length} positions</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-wider text-ink-secondary">
              <tr className="border-b border-white/[0.05]">
                <th className="px-5 py-3 text-left">Market</th>
                <th className="px-5 py-3 text-left">Side</th>
                <th className="px-5 py-3 text-right">Shares</th>
                <th className="px-5 py-3 text-right">Avg / Mark</th>
                <th className="px-5 py-3 text-right">P&L</th>
                <th className="px-5 py-3 text-right">Opened</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {MOCK_POSITIONS.map((p) => (
                <tr key={p.id} className="hover:bg-surface-2/40">
                  <td className="max-w-xs truncate px-5 py-3">{p.marketTitle}</td>
                  <td className="px-5 py-3">
                    <span className={p.side === "yes" ? "badge-yes" : "badge-no"}>
                      {p.side.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right font-mono">{p.shares.toLocaleString()}</td>
                  <td className="px-5 py-3 text-right font-mono text-ink-secondary">
                    {Math.round(p.avgPrice * 100)}¢ / {Math.round(p.markPrice * 100)}¢
                  </td>
                  <td
                    className={`px-5 py-3 text-right font-mono ${p.pnl >= 0 ? "text-accent-green" : "text-danger"}`}
                  >
                    {signed(p.pnl)}$
                  </td>
                  <td className="px-5 py-3 text-right font-mono text-ink-secondary">
                    {new Date(p.openedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="panel">
          <div className="flex items-center justify-between border-b border-white/[0.05] px-5 py-4">
            <h2 className="font-display text-lg font-bold tracking-tight">Open orders</h2>
            <span className="font-mono text-xs text-ink-secondary">{MOCK_ORDERS.length} orders</span>
          </div>
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-wider text-ink-secondary">
              <tr className="border-b border-white/[0.05]">
                <th className="px-5 py-3 text-left">Side</th>
                <th className="px-5 py-3 text-left">Type</th>
                <th className="px-5 py-3 text-right">Price</th>
                <th className="px-5 py-3 text-right">Size</th>
                <th className="px-5 py-3 text-right">Filled</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {MOCK_ORDERS.map((o) => (
                <tr key={o.id}>
                  <td className="px-5 py-3">
                    <span className={o.side === "yes" ? "badge-yes" : "badge-no"}>
                      {o.side.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-5 py-3 capitalize text-ink-secondary">{o.type}</td>
                  <td className="px-5 py-3 text-right font-mono">{Math.round(o.price * 100)}¢</td>
                  <td className="px-5 py-3 text-right font-mono">{o.size}</td>
                  <td className="px-5 py-3 text-right font-mono">
                    {Math.round((o.filled / o.size) * 100)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="panel">
          <div className="flex items-center justify-between border-b border-white/[0.05] px-5 py-4">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
              <Star className="h-4 w-4 text-warn" /> Watchlist
            </h2>
            <Link href="/markets" className="text-xs text-ink-secondary hover:text-ink-primary">
              Browse all
            </Link>
          </div>
          <ul className="divide-y divide-white/[0.04]">
            {watchlist.map((m) => {
              const last = m.series[m.series.length - 1].p;
              return (
                <li key={m.id}>
                  <Link
                    href={`/markets/${m.slug}`}
                    className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-surface-2/40"
                  >
                    <span className="truncate text-sm">{m.title}</span>
                    <span className="font-mono text-sm text-accent-green">
                      {Math.round(last * 100)}%
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}

function BalanceTile({
  label,
  value,
  Icon,
  positive,
  accent,
}: {
  label: string;
  value: string;
  Icon: React.ElementType;
  positive?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="panel relative overflow-hidden p-5">
      {accent ? (
        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent-green/15 blur-3xl" />
      ) : null}
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-ink-secondary">
        <Icon className="h-3.5 w-3.5" /> {label}
      </div>
      <div
        className={`mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl ${
          positive === undefined ? "" : positive ? "text-accent-green" : "text-danger"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
