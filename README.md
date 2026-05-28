# Forecaxt — Forecast Exchange

A premium event-trading platform for European, African and Caribbean markets.

> **Vocabulary** — we use **Event Trading**, **Forecast Exchange**, **Prediction
> Exchange**, **Event Contracts** and **Probability Market** throughout the
> product. We never refer to the platform as betting / gambling / casino /
> bookmaker, in marketing copy, code or UI.

## Stack

| Layer        | Tech                                                                |
| ------------ | ------------------------------------------------------------------- |
| Frontend     | Next.js 15 (App Router) · React 19 · TypeScript · Tailwind · Framer Motion · Recharts |
| Backend      | Next.js Route Handlers · Prisma ORM · PostgreSQL · Redis (rate limit) |
| Realtime     | WebSocket gateway (`/ws/markets/:id`) — stubbed in `src/lib/websocket.ts` |
| Blockchain   | Polygon / Arbitrum · Solidity mockups in `contracts/`               |
| Auth         | NextAuth (Email + Google) · WalletConnect · TOTP 2FA · Sumsub KYC   |
| Payments     | Stripe · USDC on-chain · card processing (mockup)                   |
| AI           | Anthropic Claude (`claude-sonnet-4-20250514`) for briefings & assistant |

## Getting started

```bash
# 1. Install
npm install

# 2. Provision env vars (see .env.example)
cp .env.example .env

# 3. Database
npm run db:push     # apply Prisma schema
npm run db:seed     # populate 20+ realistic markets

# 4. Dev server
npm run dev
```

Open <http://localhost:3000>.

## Pages

| Route             | Purpose                                                     |
| ----------------- | ----------------------------------------------------------- |
| `/`               | Landing — hero, live ticker, stats, trending markets, leaderboard preview |
| `/markets`        | Markets explorer with category + search + sort filters      |
| `/markets/[slug]` | Market detail: chart, order book, trading panel, AI brief   |
| `/portfolio`      | Equity curve, positions, orders, watchlist, activity        |
| `/leaderboard`    | Top forecasters, ROI / volume / accuracy filters            |
| `/admin`          | Market creation, resolutions, moderation, analytics         |
| `/login` `/register` | Auth with email, Google, WalletConnect                   |
| `/learn` `/pricing` `/about` `/api-docs` `/settings` | Supporting pages         |

## Project structure

```
src/
  app/                Next.js App Router pages + API route handlers
  components/
    ui/               Button, Card, Toast, Skeleton, AnimatedNumber, Sparkline, ErrorBoundary
    layout/           Navbar, MobileNav, Footer, Logo
    markets/          MarketCard, PriceChart, OrderBook, TradingPanel, SentimentBar, RecentTrades, AISummary
    portfolio/        PnLChart
    auth/             AuthCard
  lib/                utils, db (Prisma), websocket, oracle, ai, security, mock data
  hooks/              useLivePrice (and room for more)
  types/              Shared domain types
prisma/               schema.prisma + seed.ts
contracts/            MarketFactory.sol · EventContract.sol · OracleResolver.sol
public/               manifest.webmanifest, favicon
```

## Design system

| Token            | Value                                       |
| ---------------- | ------------------------------------------- |
| Background       | `#080A0F`                                   |
| Surface 1 / 2    | `#0F1218` / `#161B24`                       |
| Primary accent   | `#00D084` (financial green)                 |
| Secondary accent | `#1E6FFF` (electric blue)                   |
| Danger           | `#FF4560`                                   |
| Text             | `#F0F2F5` / `#8A93A2`                       |
| Display font     | Space Grotesk                               |
| Mono font        | JetBrains Mono                              |

The Tailwind config wires these into utilities (`bg-bg`, `bg-surface-1`,
`text-accent-green`, …) and exposes ambient effects: `bg-mesh-hero`,
`bg-noise`, `shadow-glow`, and the `animate-ticker`, `animate-pulseDot`,
`animate-shimmer` keyframes used across the UI.

## Oracle architecture

Markets resolve through a hybrid stack documented in `src/lib/oracle.ts`
and `contracts/OracleResolver.sol`:

1. **Chainlink price feeds** — objective market data (BTC, ETH, FX, rates).
2. **UMA optimistic oracle** — human-curated events with a 48h dispute window.
3. **Press validators** — Reuters / AP query-hash binding.
4. **Sport data feeds** — official scoreboards.
5. **Manual admin override** — signed, audited, challengeable for 48h.

## Security

* Edge middleware: IP-keyed token-bucket rate limiter + HTTP hardening headers (`src/middleware.ts`).
* Anti-manipulation heuristics + fraud scoring (`src/lib/security.ts`).
* Device-fingerprint + multi-account hooks (planned in `lib/security.ts`).
* Two-factor authentication required for trading (TOTP, see `settings/page.tsx`).

## AI features

`src/lib/ai.ts` integrates the Anthropic API for:

* Auto-generated market briefings (per-market summary card)
* Probability trend explanations
* In-app trading assistant chat widget (UI plumbing to be wired)
* Anomaly-detection alerts surfaced in `/admin`

When `ANTHROPIC_API_KEY` is unset, the helper returns deterministic stub
text so local development stays offline.

## What's wired vs. stubbed in this drop

| Area                                | Status                                                            |
| ----------------------------------- | ------------------------------------------------------------------ |
| Design system + glassmorphism + animation | Fully wired                                                  |
| Landing, Markets list, Market detail, Portfolio, Leaderboard, Admin, Learn, Pricing, About, Settings, API docs, Login, Register, 404 | All built against mock data |
| Prisma schema + seed (20+ markets)  | Real schema, seed reuses the same dataset the UI renders          |
| REST API routes (markets, orders, portfolio, leaderboard, AI summary, auth/login) | Implemented against mocks, Zod-validated |
| WebSocket gateway                   | Client shape + `useLivePrice` hook; server connect path is a stub |
| Smart contracts (Solidity)          | Mockup contracts with full inline documentation                   |
| Oracle stack                        | Strategy types + resolver stubs; live integrations to be filled in |
| AI (Anthropic)                      | Helper module + API route; SDK call gated on env key              |
| Auth / KYC / Payments / Wallet      | UI flows + stubs; provider integrations not yet wired             |
| Light theme                         | Toggle wired; uses `.light` class on `<html>`                     |
| PWA                                 | Manifest shipped (icons to be generated)                          |
| Mobile experience                   | Bottom nav + responsive grid + touch-friendly trading panel       |

This codebase is structured so that each stubbed area can be filled in
without touching the UI: swap the mock data adapters in `src/lib/mock/*`
for real Prisma queries, point `useLivePrice` at the WebSocket gateway,
and replace the AI stub in `src/lib/ai.ts` with an `@anthropic-ai/sdk` call.

## Scripts

```bash
npm run dev          # Next.js dev server
npm run build        # Production build
npm run start        # Start built app
npm run typecheck    # tsc --noEmit
npm run lint         # ESLint
npm run format       # Prettier write
npm run db:push      # Apply Prisma schema to $DATABASE_URL
npm run db:seed      # Seed 20+ markets + badges
npm run db:studio    # Prisma Studio
```
