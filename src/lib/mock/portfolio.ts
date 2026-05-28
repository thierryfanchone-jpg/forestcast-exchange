import type { Notification, OrderRow, Position } from "@/types";
import { MOCK_MARKETS } from "./markets";

const pickMarket = (i: number) => MOCK_MARKETS[i % MOCK_MARKETS.length];

export const MOCK_POSITIONS: Position[] = [
  {
    id: "pos_001",
    marketId: pickMarket(0).id,
    marketTitle: pickMarket(0).title,
    side: "yes",
    shares: 420,
    avgPrice: 0.58,
    markPrice: 0.67,
    pnl: 420 * (0.67 - 0.58),
    openedAt: new Date(Date.now() - 6 * 86_400_000).toISOString(),
  },
  {
    id: "pos_002",
    marketId: pickMarket(3).id,
    marketTitle: pickMarket(3).title,
    side: "yes",
    shares: 1200,
    avgPrice: 0.62,
    markPrice: 0.71,
    pnl: 1200 * (0.71 - 0.62),
    openedAt: new Date(Date.now() - 12 * 86_400_000).toISOString(),
  },
  {
    id: "pos_003",
    marketId: pickMarket(9).id,
    marketTitle: pickMarket(9).title,
    side: "no",
    shares: 800,
    avgPrice: 0.81,
    markPrice: 0.88,
    pnl: 800 * (0.81 - 0.88),
    openedAt: new Date(Date.now() - 3 * 86_400_000).toISOString(),
  },
  {
    id: "pos_004",
    marketId: pickMarket(1).id,
    marketTitle: pickMarket(1).title,
    side: "yes",
    shares: 320,
    avgPrice: 0.74,
    markPrice: 0.82,
    pnl: 320 * (0.82 - 0.74),
    openedAt: new Date(Date.now() - 9 * 86_400_000).toISOString(),
  },
];

export const MOCK_ORDERS: OrderRow[] = [
  {
    id: "ord_1001",
    marketId: pickMarket(2).id,
    side: "yes",
    type: "limit",
    price: 0.42,
    size: 500,
    filled: 0,
    status: "open",
    createdAt: new Date(Date.now() - 3_600_000).toISOString(),
  },
  {
    id: "ord_1002",
    marketId: pickMarket(5).id,
    side: "no",
    type: "limit",
    price: 0.66,
    size: 250,
    filled: 90,
    status: "open",
    createdAt: new Date(Date.now() - 7_200_000).toISOString(),
  },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "n_1",
    type: "order-filled",
    title: "Order filled",
    body: "Your limit order on ECB rate cut filled at $0.58.",
    createdAt: new Date(Date.now() - 600_000).toISOString(),
    read: false,
  },
  {
    id: "n_2",
    type: "closing-soon",
    title: "Closing in 24h",
    body: "Senegal elections market closes tomorrow.",
    createdAt: new Date(Date.now() - 7_200_000).toISOString(),
    read: false,
  },
  {
    id: "n_3",
    type: "price-alert",
    title: "Price alert · BTC > 71%",
    body: "Bitcoin $120k probability crossed 70%.",
    createdAt: new Date(Date.now() - 86_400_000).toISOString(),
    read: true,
  },
];

/** PnL equity-curve points for the portfolio chart (synthetic). */
export function buildEquityCurve(points = 90, start = 8_400): { t: number; v: number }[] {
  const out: { t: number; v: number }[] = [];
  let v = start;
  const now = Date.now();
  for (let i = points; i >= 0; i--) {
    v += (Math.sin(i * 0.21) + (Math.random() - 0.5)) * 38;
    v = Math.max(0, v);
    out.push({ t: now - i * 86_400_000, v: Math.round(v) });
  }
  return out;
}
