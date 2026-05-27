import { NextResponse } from "next/server";
import { z } from "zod";
import { listMarkets } from "@/lib/mock/markets";
import type { MarketCategory } from "@/types";

const QuerySchema = z.object({
  category: z
    .enum([
      "Politics",
      "Economy",
      "Crypto",
      "Sports",
      "Caribbean",
      "Africa",
      "Technology",
      "Energy",
    ])
    .optional(),
  q: z.string().min(1).max(80).optional(),
  sort: z.enum(["trending", "volume", "closing"]).optional(),
});

export async function GET(req: Request) {
  const url = new URL(req.url);
  const parsed = QuerySchema.safeParse({
    category: url.searchParams.get("category") ?? undefined,
    q: url.searchParams.get("q") ?? undefined,
    sort: url.searchParams.get("sort") ?? undefined,
  });
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid query", details: parsed.error.format() }, { status: 400 });
  }
  const markets = listMarkets({
    category: parsed.data.category as MarketCategory | undefined,
    q: parsed.data.q,
    sort: parsed.data.sort,
  });
  return NextResponse.json({ markets, count: markets.length });
}

const CreateSchema = z.object({
  title: z.string().min(8).max(200),
  description: z.string().min(8).max(2000),
  category: z.enum([
    "Politics",
    "Economy",
    "Crypto",
    "Sports",
    "Caribbean",
    "Africa",
    "Technology",
    "Energy",
  ]),
  closesAt: z.string().datetime(),
  oracle: z.enum(["chainlink", "uma", "reuters", "ap", "sport-api", "manual"]),
  seedLiquidity: z.number().min(0).max(10_000_000).optional(),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = CreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body", details: parsed.error.format() }, { status: 400 });
  }
  // NOTE: This is a stub — a real implementation would persist via Prisma + admin RBAC.
  return NextResponse.json({ ok: true, draftId: `draft_${Date.now()}`, status: "pending_review" }, { status: 201 });
}
