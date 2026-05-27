import { NextResponse } from "next/server";
import { getMarketBySlug } from "@/lib/mock/markets";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const market = getMarketBySlug(slug);
  if (!market) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ market });
}
