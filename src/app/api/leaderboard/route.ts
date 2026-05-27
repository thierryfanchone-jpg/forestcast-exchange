import { NextResponse } from "next/server";
import { MOCK_LEADERBOARD } from "@/lib/mock/leaderboard";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const sort = url.searchParams.get("sort") ?? "roi";
  const limit = Math.min(50, Number(url.searchParams.get("limit") ?? 20));
  const rows = [...MOCK_LEADERBOARD]
    .sort((a, b) => {
      if (sort === "volume") return b.volume - a.volume;
      if (sort === "accuracy") return b.accuracy - a.accuracy;
      return b.roi - a.roi;
    })
    .slice(0, limit);
  return NextResponse.json({ rows });
}
