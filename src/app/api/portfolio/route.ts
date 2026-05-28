import { NextResponse } from "next/server";
import { MOCK_POSITIONS, MOCK_ORDERS, buildEquityCurve } from "@/lib/mock/portfolio";

export async function GET() {
  const equity = buildEquityCurve(90);
  const totalPnL = MOCK_POSITIONS.reduce((s, p) => s + p.pnl, 0);
  return NextResponse.json({
    balances: { usd: 4202.4, usdc: 4210.0 },
    equityCurve: equity,
    positions: MOCK_POSITIONS,
    orders: MOCK_ORDERS,
    totals: { equity: equity[equity.length - 1].v, totalPnL },
  });
}
