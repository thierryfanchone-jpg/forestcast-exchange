"use client";

import { useMemo, useState } from "react";
import { useToast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { cn, formatCurrency } from "@/lib/utils";

interface Props {
  probability: number;
  marketTitle: string;
}

export function TradingPanel({ probability, marketTitle }: Props) {
  const [side, setSide] = useState<"yes" | "no">("yes");
  const [type, setType] = useState<"market" | "limit">("market");
  const [amount, setAmount] = useState<number>(50);
  const [limit, setLimit] = useState<number>(Math.round(probability * 100));
  const { push } = useToast();

  const yesPrice = probability;
  const noPrice = 1 - probability;
  const unit = side === "yes" ? yesPrice : noPrice;

  const shares = useMemo(() => (unit > 0 ? amount / unit : 0), [amount, unit]);
  const potential = shares * 1; // each share pays $1 if it resolves true

  const onSubmit = () => {
    push({
      kind: "success",
      title: `${type === "market" ? "Market" : "Limit"} order submitted`,
      body: `${side.toUpperCase()} · ${shares.toFixed(0)} shares · ${marketTitle.slice(0, 38)}…`,
    });
  };

  return (
    <div className="panel p-5">
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => setSide("yes")}
          className={cn(
            "rounded-xl py-3 text-sm font-semibold transition-colors",
            side === "yes"
              ? "bg-accent-green/15 text-accent-green ring-1 ring-accent-green/40"
              : "bg-white/[0.03] text-ink-secondary hover:bg-white/[0.06]",
          )}
        >
          YES · {Math.round(yesPrice * 100)}¢
        </button>
        <button
          onClick={() => setSide("no")}
          className={cn(
            "rounded-xl py-3 text-sm font-semibold transition-colors",
            side === "no"
              ? "bg-danger/15 text-danger ring-1 ring-danger/40"
              : "bg-white/[0.03] text-ink-secondary hover:bg-white/[0.06]",
          )}
        >
          NO · {Math.round(noPrice * 100)}¢
        </button>
      </div>

      <div className="mt-4 flex items-center gap-1 rounded-lg bg-white/[0.03] p-1 text-xs">
        {(["market", "limit"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={cn(
              "flex-1 rounded-md px-3 py-1.5 capitalize transition-colors",
              type === t ? "bg-white/[0.08] text-ink-primary" : "text-ink-secondary",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        <label className="block">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs text-ink-secondary">Amount (USDC)</span>
            <span className="font-mono text-xs text-ink-secondary">
              Balance: $8,412.40
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 focus-within:border-accent-green/40">
            <span className="font-mono text-ink-secondary">$</span>
            <input
              type="number"
              min={1}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full bg-transparent font-mono text-ink-primary outline-none"
            />
          </div>
          <div className="mt-2 flex gap-1.5">
            {[25, 100, 250, 500].map((n) => (
              <button
                key={n}
                onClick={() => setAmount(n)}
                className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2 py-1 font-mono text-[11px] text-ink-secondary hover:text-ink-primary"
              >
                ${n}
              </button>
            ))}
          </div>
        </label>

        {type === "limit" ? (
          <label className="block">
            <div className="mb-1 text-xs text-ink-secondary">Limit price (¢)</div>
            <input
              type="range"
              min={1}
              max={99}
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="w-full accent-accent-green"
            />
            <div className="mt-1 flex justify-between font-mono text-[11px] text-ink-secondary">
              <span>1¢</span>
              <span className="text-accent-green">{limit}¢</span>
              <span>99¢</span>
            </div>
          </label>
        ) : null}

        <div className="rounded-xl border border-white/[0.06] bg-bg/40 p-3 text-xs">
          <div className="flex justify-between py-0.5">
            <span className="text-ink-secondary">Estimated shares</span>
            <span className="font-mono">{shares.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-ink-secondary">Avg price</span>
            <span className="font-mono">{Math.round(unit * 100)}¢</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-ink-secondary">Potential payout</span>
            <span className="font-mono text-accent-green">
              {formatCurrency(potential)}
            </span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-ink-secondary">Max profit</span>
            <span className="font-mono text-accent-green">
              {formatCurrency(potential - amount)}
            </span>
          </div>
        </div>

        <Button
          onClick={onSubmit}
          variant={side === "yes" ? "primary" : "danger"}
          className="w-full"
          size="lg"
        >
          {type === "market" ? "Trade " : "Place limit "} {side.toUpperCase()}
        </Button>
        <p className="text-center text-[11px] text-ink-tertiary">
          Forecaxt is an event-trading exchange. Event contracts carry risk of total loss.
        </p>
      </div>
    </div>
  );
}
