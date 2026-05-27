"use client";

import { useState } from "react";
import {
  Settings2,
  Plus,
  Gavel,
  Users,
  Droplet,
  BarChart3,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { MOCK_MARKETS } from "@/lib/mock/markets";
import { formatCurrency, cn } from "@/lib/utils";

type Tab = "Markets" | "Resolutions" | "Users" | "Liquidity" | "Analytics";

const TABS: { key: Tab; Icon: React.ElementType }[] = [
  { key: "Markets", Icon: Settings2 },
  { key: "Resolutions", Icon: Gavel },
  { key: "Users", Icon: Users },
  { key: "Liquidity", Icon: Droplet },
  { key: "Analytics", Icon: BarChart3 },
];

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("Markets");
  const { push } = useToast();

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-accent-green">Admin</p>
          <h1 className="mt-1 font-display text-3xl font-bold tracking-tight">Operations console</h1>
        </div>
        <span className="chip">
          <AlertTriangle className="h-3.5 w-3.5 text-warn" />
          Restricted environment
        </span>
      </header>

      <div className="mb-6 flex gap-1 overflow-x-auto rounded-xl border border-white/[0.06] bg-white/[0.02] p-1">
        {TABS.map(({ key, Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={cn(
              "inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors",
              tab === key ? "bg-white/[0.08] text-ink-primary" : "text-ink-secondary",
            )}
          >
            <Icon className="h-4 w-4" /> {key}
          </button>
        ))}
      </div>

      {tab === "Markets" && (
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              push({
                kind: "success",
                title: "Market draft created",
                body: "Pending compliance review.",
              });
            }}
            className="panel p-6"
          >
            <h2 className="mb-4 font-display text-lg font-bold tracking-tight">Create market</h2>
            <Field label="Title">
              <input className={inputCls} placeholder="Will the ECB cut rates before September 2025?" />
            </Field>
            <Field label="Resolution criteria">
              <textarea rows={3} className={inputCls} placeholder="Resolves YES if…" />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Category">
                <select className={inputCls}>
                  {["Politics", "Economy", "Crypto", "Sports", "Caribbean", "Africa", "Technology", "Energy"].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field label="Oracle source">
                <select className={inputCls}>
                  {["Chainlink", "UMA", "Reuters", "AP", "Sport API", "Manual"].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field label="Closes at">
                <input type="datetime-local" className={inputCls} />
              </Field>
              <Field label="Seed liquidity">
                <input type="number" placeholder="$50,000" className={inputCls} />
              </Field>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="secondary">Save draft</Button>
              <Button>
                <Plus className="h-4 w-4" /> Submit for review
              </Button>
            </div>
          </form>

          <div className="panel p-6">
            <h2 className="mb-4 font-display text-lg font-bold tracking-tight">Recent markets</h2>
            <ul className="divide-y divide-white/[0.04]">
              {MOCK_MARKETS.slice(0, 8).map((m) => (
                <li key={m.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                  <div className="min-w-0">
                    <div className="truncate">{m.title}</div>
                    <div className="font-mono text-[11px] text-ink-secondary">
                      {m.id} · {m.category} · {formatCurrency(m.liquidity)} liquidity
                    </div>
                  </div>
                  <span className="chip">{m.status}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {tab === "Resolutions" && (
        <section className="panel p-6">
          <h2 className="mb-4 font-display text-lg font-bold tracking-tight">Pending resolutions</h2>
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-wider text-ink-secondary">
              <tr className="border-b border-white/[0.05]">
                <th className="py-2 text-left">Market</th>
                <th className="py-2">Oracle</th>
                <th className="py-2">Outcome</th>
                <th className="py-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {MOCK_MARKETS.slice(0, 5).map((m) => (
                <tr key={m.id}>
                  <td className="max-w-md truncate py-3 pr-3">{m.title}</td>
                  <td className="py-3 capitalize">{m.oracle}</td>
                  <td className="py-3">
                    <select className={inputCls + " py-1"}>
                      <option>YES</option>
                      <option>NO</option>
                      <option>Invalid</option>
                    </select>
                  </td>
                  <td className="py-3 text-right">
                    <Button
                      size="sm"
                      onClick={() =>
                        push({
                          kind: "success",
                          title: "Resolution submitted",
                          body: m.title.slice(0, 40) + "…",
                        })
                      }
                    >
                      Resolve
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-xs text-ink-secondary">
            All admin resolutions are signed and written to the audit log. Disputable for 48h on UMA's
            optimistic oracle.
          </p>
        </section>
      )}

      {tab === "Users" && (
        <section className="panel p-6 text-sm text-ink-secondary">
          Moderation tools (KYC review queue, fraud scoring, multi-account detection, ban hammer).
          Stubbed for this demo.
        </section>
      )}

      {tab === "Liquidity" && (
        <section className="panel p-6 text-sm text-ink-secondary">
          Liquidity management — top up market-maker vaults, rebalance LP positions, configure
          inventory limits per market. Stubbed.
        </section>
      )}

      {tab === "Analytics" && (
        <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Stat label="DAU" value="14,288" />
          <Stat label="24h Trades" value="84,210" />
          <Stat label="Settled vol." value="$28.4M" />
          <Stat label="Net fees" value="$72.1K" />
        </section>
      )}
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-sm text-ink-primary placeholder:text-ink-secondary focus:border-accent-green/40 focus:outline-none focus:ring-2 focus:ring-accent-green/20";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="mb-4 block">
      <span className="mb-1 block text-xs text-ink-secondary">{label}</span>
      {children}
    </label>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="panel p-5">
      <div className="font-mono text-[10px] uppercase tracking-widest text-ink-secondary">
        {label}
      </div>
      <div className="mt-2 font-display text-2xl font-bold">{value}</div>
    </div>
  );
}
