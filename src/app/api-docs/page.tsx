import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Docs",
  description: "REST + WebSocket reference for the Forecaxt forecast exchange.",
};

const endpoints = [
  { method: "GET", path: "/api/markets", desc: "List markets with optional filters (category, sort, q)." },
  { method: "GET", path: "/api/markets/:slug", desc: "Fetch a single market by slug." },
  { method: "POST", path: "/api/markets", desc: "Admin: create a market draft." },
  { method: "GET", path: "/api/orders", desc: "List the authenticated user's orders." },
  { method: "POST", path: "/api/orders", desc: "Place a new order (market or limit)." },
  { method: "DELETE", path: "/api/orders/:id", desc: "Cancel an open order." },
  { method: "GET", path: "/api/portfolio", desc: "Aggregate balances, positions and P&L." },
  { method: "GET", path: "/api/leaderboard", desc: "Top traders by ROI, volume or accuracy." },
  { method: "POST", path: "/api/auth/login", desc: "Email + password sign-in." },
  { method: "POST", path: "/api/auth/google", desc: "Exchange a Google OAuth code." },
  { method: "POST", path: "/api/auth/walletconnect", desc: "Verify a wallet signature challenge." },
];

export default function ApiDocsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <p className="font-mono text-xs uppercase tracking-widest text-accent-green">Developers</p>
      <h1 className="mt-1 font-display text-4xl font-bold tracking-tight md:text-5xl">API reference</h1>
      <p className="mt-3 max-w-2xl text-ink-secondary">
        Forecaxt exposes a REST surface and a low-latency WebSocket gateway for live market data.
        All endpoints are JSON, versioned via the <code className="font-mono">X-Forecaxt-Version</code> header.
      </p>

      <section className="mt-10">
        <h2 className="font-display text-xl font-bold">REST</h2>
        <div className="mt-3 overflow-hidden rounded-2xl border border-white/[0.06]">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.02] text-xs uppercase tracking-wider text-ink-secondary">
              <tr>
                <th className="px-5 py-3 text-left">Method</th>
                <th className="px-5 py-3 text-left">Endpoint</th>
                <th className="px-5 py-3 text-left">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {endpoints.map((e) => (
                <tr key={e.path + e.method}>
                  <td className="px-5 py-3">
                    <span className="font-mono text-xs text-accent-green">{e.method}</span>
                  </td>
                  <td className="px-5 py-3 font-mono text-ink-primary">{e.path}</td>
                  <td className="px-5 py-3 text-ink-secondary">{e.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="websocket" className="mt-12">
        <h2 className="font-display text-xl font-bold">WebSocket</h2>
        <p className="mt-2 text-sm text-ink-secondary">
          Subscribe to <code className="font-mono">wss://forecaxt.com/ws/markets/:id</code> to receive
          price ticks, trade prints and order-book deltas.
        </p>
        <pre className="mt-3 overflow-x-auto rounded-xl border border-white/[0.06] bg-bg/60 p-4 font-mono text-xs text-ink-primary">
{`> { "event": "subscribe", "channels": ["price", "trades", "book"] }
< { "event": "price", "p": 0.671, "t": 1714400000000 }
< { "event": "trade", "side": "yes", "price": 0.672, "size": 320 }
< { "event": "book", "bids": [...], "asks": [...] }`}
        </pre>
      </section>

      <section id="contracts" className="mt-12">
        <h2 className="font-display text-xl font-bold">Smart contracts</h2>
        <p className="mt-2 text-sm text-ink-secondary">
          The on-chain settlement layer lives in <code className="font-mono">contracts/</code> and ships with
          three core contracts: <code className="font-mono">MarketFactory</code>,{" "}
          <code className="font-mono">EventContract</code> and{" "}
          <code className="font-mono">OracleResolver</code>. Mockup implementations are provided in
          this repository for local development.
        </p>
      </section>
    </div>
  );
}
