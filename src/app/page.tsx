import Link from "next/link";
import { ArrowRight, ShieldCheck, Activity, Globe2, Sparkles, Cpu, Lock } from "lucide-react";
import { MarketTicker } from "@/components/markets/MarketTicker";
import { MarketCard } from "@/components/markets/MarketCard";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { listMarkets } from "@/lib/mock/markets";
import { MOCK_LEADERBOARD } from "@/lib/mock/leaderboard";
import { formatCurrency } from "@/lib/utils";

export default function HomePage() {
  const trending = listMarkets({ sort: "volume" }).slice(0, 6);
  const top = MOCK_LEADERBOARD.slice(0, 5);

  return (
    <>
      <Hero />
      <MarketTicker />

      <Stats />

      <section className="mx-auto max-w-7xl px-6 pt-24">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-accent-green">
              Live Markets
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Trending forecast contracts
            </h2>
          </div>
          <Link
            href="/markets"
            className="hidden text-sm text-ink-secondary hover:text-ink-primary md:inline-flex"
          >
            All markets <ArrowRight className="ml-1 inline h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trending.map((m) => (
            <MarketCard key={m.id} market={m} />
          ))}
        </div>
      </section>

      <HowItWorks />
      <LeaderboardPreview top={top} />
      <CTA />
    </>
  );
}

function Hero() {
  return (
    <section className="noise-overlay relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh-hero opacity-90" />
      <div className="absolute inset-x-0 -top-32 mx-auto h-64 max-w-3xl rounded-full bg-accent-green/20 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-6 pt-20 md:pt-28">
        <div className="flex flex-col items-center text-center">
          <span className="chip mb-6">
            <Sparkles className="h-3.5 w-3.5 text-accent-green" />
            Now live across EU · Africa · Caribbean
          </span>
          <h1 className="text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            The forecast exchange{" "}
            <span className="bg-gradient-to-r from-accent-green via-accent-blue to-accent-green bg-clip-text text-transparent">
              for real-world outcomes.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-balance text-base text-ink-secondary md:text-lg">
            Trade probability on politics, economy, crypto and sports across three continents.
            Transparent oracles, institutional liquidity, regulated infrastructure.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/markets" className="btn-primary h-11 px-5">
              Explore markets <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/learn" className="btn-secondary h-11 px-5">
              How it works
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-xs text-ink-secondary">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-accent-green" />
              MiCA-compliant
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-accent-green" /> Non-custodial settlement
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Cpu className="h-3.5 w-3.5 text-accent-green" /> Chainlink + UMA oracles
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="mx-auto mt-16 max-w-7xl px-6">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] md:grid-cols-4">
        <StatTile label="24h Volume" value={42_318_421} prefix="$" />
        <StatTile label="Active Markets" value={148} />
        <StatTile label="Verified Traders" value={28_412} />
        <StatTile label="Avg Spread" value={2.1} decimals={1} suffix="¢" />
      </div>
    </section>
  );
}

function StatTile({
  label,
  value,
  prefix,
  suffix,
  decimals = 0,
}: {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  return (
    <div className="bg-bg/60 p-6">
      <div className="font-mono text-[10px] uppercase tracking-widest text-ink-secondary">
        {label}
      </div>
      <div className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
        <AnimatedNumber value={value} prefix={prefix} suffix={suffix} decimals={decimals} />
      </div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    {
      Icon: Globe2,
      title: "Pick an event",
      body: "Browse curated event contracts on policy, markets and global news.",
    },
    {
      Icon: Activity,
      title: "Trade probability",
      body: "YES/NO shares trade between 1¢ and 99¢. Markets settle to $1 if true.",
    },
    {
      Icon: ShieldCheck,
      title: "Settle on-chain",
      body: "Outcomes are confirmed by Chainlink, UMA and regulated data providers.",
    },
  ];

  return (
    <section className="mx-auto mt-28 max-w-7xl px-6">
      <p className="font-mono text-xs uppercase tracking-widest text-accent-green">How it works</p>
      <h2 className="mt-1 font-display text-3xl font-bold tracking-tight md:text-4xl">
        From a question to a settled contract.
      </h2>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {steps.map((s, i) => (
          <div key={s.title} className="panel relative p-6">
            <span className="absolute right-4 top-4 font-mono text-xs text-ink-secondary">
              0{i + 1}
            </span>
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-green/15 text-accent-green">
              <s.Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
            <p className="mt-1 text-sm text-ink-secondary">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function LeaderboardPreview({ top }: { top: ReturnType<typeof MOCK_LEADERBOARD.slice> }) {
  return (
    <section className="mx-auto mt-28 max-w-7xl px-6">
      <div className="flex items-end justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-accent-green">
            Leaderboard
          </p>
          <h2 className="mt-1 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Top forecasters this week
          </h2>
        </div>
        <Link
          href="/leaderboard"
          className="hidden text-sm text-ink-secondary hover:text-ink-primary md:inline-flex"
        >
          Full ranks <ArrowRight className="ml-1 inline h-4 w-4" />
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/[0.06]">
        <table className="w-full text-sm">
          <thead className="bg-white/[0.02] text-xs uppercase tracking-wider text-ink-secondary">
            <tr>
              <th className="px-5 py-3 text-left">#</th>
              <th className="px-5 py-3 text-left">Trader</th>
              <th className="px-5 py-3 text-right">ROI</th>
              <th className="px-5 py-3 text-right">Volume</th>
              <th className="px-5 py-3 text-right">Accuracy</th>
              <th className="px-5 py-3 text-right">Level</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {top.map((u) => (
              <tr key={u.handle} className="bg-surface-1/40 transition-colors hover:bg-surface-2/40">
                <td className="px-5 py-3 font-mono text-ink-secondary">{u.rank}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={u.avatar}
                      alt=""
                      className="h-7 w-7 rounded-full border border-white/[0.08] bg-white/[0.05]"
                    />
                    <span className="font-medium">{u.handle}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-right font-mono text-accent-green">
                  +{u.roi.toFixed(0)}%
                </td>
                <td className="px-5 py-3 text-right font-mono">{formatCurrency(u.volume)}</td>
                <td className="px-5 py-3 text-right font-mono">
                  {(u.accuracy * 100).toFixed(1)}%
                </td>
                <td className="px-5 py-3 text-right">
                  <span className="chip">{u.level}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="mx-auto mt-28 max-w-7xl px-6">
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-surface-1 p-10 md:p-16">
        <div className="absolute inset-0 bg-mesh-hero opacity-70" />
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent-green/30 blur-[120px]" />
        <div className="relative max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            Sophisticated probability,{" "}
            <span className="text-accent-green">accessible</span> to everyone.
          </h2>
          <p className="mt-4 text-ink-secondary md:text-lg">
            Open an account in under 90 seconds. KYC, two-factor authentication and
            non-custodial wallet support built in.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/register" className="btn-primary h-11 px-5">
              Open an account <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/api-docs" className="btn-secondary h-11 px-5">
              Read API docs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
