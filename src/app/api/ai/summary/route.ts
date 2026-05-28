import { NextResponse } from "next/server";
import { z } from "zod";
import { getMarketBySlug } from "@/lib/mock/markets";

const Schema = z.object({ slug: z.string().min(1) });

/**
 * POST /api/ai/summary
 * Returns an AI-generated briefing for a market. Behind the scenes, this
 * would call the Anthropic API (claude-sonnet-4-20250514) with a small
 * system prompt and a context block built from market metadata + recent
 * trades + oracle source. Returns a stub during local development.
 */
export async function POST(req: Request) {
  const parsed = Schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const market = getMarketBySlug(parsed.data.slug);
  if (!market) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // If ANTHROPIC_API_KEY were set, we'd call the SDK here. Returning a deterministic stub.
  return NextResponse.json({
    model: process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-20250514",
    summary:
      `Probability sits at ${Math.round(market.probability * 100)}% with most depth on the YES side. ` +
      `Recent flow leans constructive; expect compression of the spread near upcoming catalysts (${market.tags.join(
        ", ",
      )}).`,
    generatedAt: new Date().toISOString(),
  });
}
