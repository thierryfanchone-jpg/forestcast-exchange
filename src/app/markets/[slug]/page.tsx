import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Droplets, Activity, ShieldCheck } from "lucide-react";
import { getMarketBySlug, MOCK_MARKETS } from "@/lib/mock/markets";
import { PriceChart } from "@/components/markets/PriceChart";
import { OrderBook } from "@/components/markets/OrderBook";
import { TradingPanel } from "@/components/markets/TradingPanel";
import { SentimentBar } from "@/components/markets/SentimentBar";
import { RecentTrades } from "@/components/markets/RecentTrades";
import { AISummary } from "@/components/markets/AISummary";
import { formatCurrency, formatProb, timeUntil } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return MOCK_MARKETS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const market = getMarketBySlug(slug);
  if (!market) return { title: "Market not found" };
  return {
    title: market.title,
    description: market.description,
    openGraph: { title: market.title, description: market.description },
  };
}

export default async function MarketDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const market = getMarketBySlug(slug);
  if (!market) notFound();

  const last = market.series[market.series.length - 1].p;
  const prev = market.series[Math.max(0, market.series.length - 24)].p;
  const delta = (last - prev) * 100;

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <Link
        href="/markets"
        className="inline-flex items-center gap-1 text-sm text-ink-secondary hover:text-ink-primary"
      >
        <ArrowLeft className="h-4 w-4" /> All markets
      </Link>

      <header className="mt-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip">{market.category}</span>
            {market.tags.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
            <span className="chip">
              <ShieldCheck className="h-3.5 w-3.5 text-accent-green" />
              Oracle: <span className="capitalize">{market.oracle}</span>
            </span>
          </div>
          <h1 className="mt-3 max-w-3xl font-display text-2xl font-bold leading-tight tracking-tight md:text-3xl">
            {market.title}
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-ink-secondary">{market.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:w-[360px] md:shrink-0">
          <KPI label="Probability" value={formatProb(last)} hint={`${delta >= 0 ? "+" : ""}${delta.toFixed(1)} pts · 24h`} positive={delta >= 0} />
          <KPI label="Closes in" value={timeUntil(market.closesAt)} hint={new Date(market.closesAt).toLocaleDateString()} />
          <KPI label="Volume" value={formatCurrency(market.volume)} hint="lifetime" />
          <KPI label="Liquidity" value={formatCurrency(market.liquidity)} hint="live" />
        </div>
      </header>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="panel overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/[0.05] px-5 py-3">
              <div className="flex items-center gap-2 text-xs text-ink-secondary">
                <Activity className="h-3.5 w-3.5" />
                <span className="font-semibold uppercase tracking-wider">Probability</span>
              </div>
              <div className="flex items-center gap-1 rounded-lg bg-white/[0.03] p-1 text-xs">
                {["1H", "1D", "1W", "1M", "ALL"].map((r) => (
                  <button
                    key={r}
                    className={`rounded-md px-2 py-1 ${r === "1W" ? "bg-white/[0.08] text-ink-primary" : "text-ink-secondary"}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-4">
              <PriceChart data={market.series} />
            </div>
          </div>

          <AISummary market={market} />

          <RecentTrades probability={last} seed={market.title.length * 13} />
        </div>

        <aside className="space-y-6">
          <TradingPanel probability={last} marketTitle={market.title} />
          <SentimentBar probability={last} />
          <OrderBook probability={last} seed={market.title.length * 7 + 1} />
          <div className="panel p-4 text-xs text-ink-secondary">
            <div className="mb-2 flex items-center gap-2 text-ink-primary">
              <Droplets className="h-3.5 w-3.5 text-accent-blue" />
              <span className="font-semibold">Market depth</span>
            </div>
            Spreads currently sit at <span className="font-mono text-ink-primary">1¢</span> mid,
            with <span className="font-mono text-ink-primary">{formatCurrency(market.liquidity / 2)}</span>{" "}
            quoted on each side.
          </div>
          <div className="panel p-4 text-xs text-ink-secondary">
            <div className="mb-2 flex items-center gap-2 text-ink-primary">
              <Clock className="h-3.5 w-3.5 text-accent-blue" />
              <span className="font-semibold">Resolution</span>
            </div>
            Settles to <span className="font-mono text-ink-primary">$1</span> per YES share if the
            event resolves true, otherwise <span className="font-mono text-ink-primary">$0</span>.
            Disputed resolutions are escalated to UMA&apos;s optimistic oracle within 48h.
          </div>
        </aside>
      </div>
    </div>
  );
}

function KPI({
  label,
  value,
  hint,
  positive,
}: {
  label: string;
  value: string;
  hint?: string;
  positive?: boolean;
}) {
  return (
    <div className="panel-2 p-4">
      <div className="font-mono text-[10px] uppercase tracking-widest text-ink-secondary">
        {label}
      </div>
      <div className="mt-1 font-display text-xl font-bold tracking-tight">{value}</div>
      {hint ? (
        <div
          className={`mt-0.5 font-mono text-[11px] ${
            positive === undefined
              ? "text-ink-secondary"
              : positive
                ? "text-accent-green"
                : "text-danger"
          }`}
        >
          {hint}
        </div>
      ) : null}
    </div>
  );
}
