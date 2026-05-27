import { NextResponse } from "next/server";
import { z } from "zod";
import { MOCK_ORDERS } from "@/lib/mock/portfolio";

export async function GET() {
  return NextResponse.json({ orders: MOCK_ORDERS });
}

const OrderSchema = z.object({
  marketId: z.string().min(1),
  side: z.enum(["yes", "no"]),
  type: z.enum(["market", "limit"]),
  price: z.number().min(0).max(1).optional(),
  size: z.number().int().positive().max(1_000_000),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = OrderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body", details: parsed.error.format() }, { status: 400 });
  }
  // NOTE: Stub — a real implementation would route to the matching engine and persist.
  return NextResponse.json(
    {
      ok: true,
      orderId: `ord_${Date.now()}`,
      status: parsed.data.type === "market" ? "filled" : "open",
    },
    { status: 201 },
  );
}
