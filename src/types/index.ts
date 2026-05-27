/**
 * Domain types for the Forecaxt forecast exchange.
 * These shapes mirror the Prisma schema so the UI can be developed
 * against typed mock data before the database is available.
 */

export type MarketCategory =
  | "Politics"
  | "Economy"
  | "Crypto"
  | "Sports"
  | "Caribbean"
  | "Africa"
  | "Technology"
  | "Energy";

export type MarketStatus = "open" | "closing-soon" | "resolved" | "disputed";

export type OracleSource = "chainlink" | "uma" | "reuters" | "ap" | "sport-api" | "manual";

export interface PricePoint {
  t: number; // unix ms
  p: number; // probability 0..1
  v?: number; // volume bucket
}

export interface OrderBookLevel {
  price: number; // cents 0..100
  size: number; // shares
  side: "yes" | "no";
}

export interface Market {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: MarketCategory;
  region?: "EU" | "AF" | "CB" | "GLOBAL";
  probability: number; // 0..1 last
  volume: number; // USD lifetime
  liquidity: number; // USD live
  openInterest: number;
  status: MarketStatus;
  closesAt: string; // ISO
  createdAt: string;
  series: PricePoint[];
  oracle: OracleSource;
  tags: string[];
  imageHint?: string;
}

export interface Position {
  id: string;
  marketId: string;
  marketTitle: string;
  side: "yes" | "no";
  shares: number;
  avgPrice: number; // 0..1
  markPrice: number; // 0..1
  pnl: number;
  openedAt: string;
}

export interface OrderRow {
  id: string;
  marketId: string;
  side: "yes" | "no";
  type: "limit" | "market";
  price: number;
  size: number;
  filled: number;
  status: "open" | "filled" | "cancelled";
  createdAt: string;
}

export interface LeaderboardEntry {
  rank: number;
  handle: string;
  avatar: string;
  roi: number; // %
  volume: number;
  accuracy: number; // 0..1
  level: UserLevel;
  badges: string[];
}

export type UserLevel = "Rookie" | "Analyst" | "Strategist" | "Forecaster" | "Oracle";

export interface User {
  id: string;
  email: string;
  handle: string;
  level: UserLevel;
  xp: number;
  accuracy: number;
  streak: number;
  badges: string[];
  walletAddress?: string;
  balance: { usd: number; usdc: number };
  kycStatus: "none" | "pending" | "verified" | "rejected";
  createdAt: string;
}

export interface Notification {
  id: string;
  type: "resolution" | "price-alert" | "closing-soon" | "order-filled" | "system";
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
}
