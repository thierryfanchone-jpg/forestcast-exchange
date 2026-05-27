/**
 * Forecaxt seed script.
 *
 * Run with: `pnpm db:seed` (or `npm run db:seed`).
 *
 * The seed mirrors the shape of `src/lib/mock/markets.ts` so the development
 * frontend and the database produce identical UI rendering.
 */
import { PrismaClient, MarketCategory, OracleSource, MarketStatus } from "@prisma/client";
import { MOCK_MARKETS } from "../src/lib/mock/markets";

const prisma = new PrismaClient();

function mapOracle(o: string): OracleSource {
  switch (o) {
    case "chainlink":
      return OracleSource.chainlink;
    case "uma":
      return OracleSource.uma;
    case "reuters":
      return OracleSource.reuters;
    case "ap":
      return OracleSource.ap;
    case "sport-api":
      return OracleSource.sport_api;
    default:
      return OracleSource.manual;
  }
}

async function main() {
  console.log("Seeding markets…");

  for (const m of MOCK_MARKETS) {
    await prisma.market.upsert({
      where: { slug: m.slug },
      update: {},
      create: {
        slug: m.slug,
        title: m.title,
        description: m.description,
        category: m.category as MarketCategory,
        region: m.region ?? "GLOBAL",
        status:
          m.status === "closing-soon"
            ? MarketStatus.closing_soon
            : (m.status as MarketStatus),
        probability: m.probability,
        volume: m.volume,
        liquidity: m.liquidity,
        openInterest: m.openInterest,
        oracle: mapOracle(m.oracle),
        tags: m.tags,
        closesAt: new Date(m.closesAt),
        pricePoints: {
          create: m.series.map((s) => ({
            t: new Date(s.t),
            p: s.p,
            v: s.v ?? null,
          })),
        },
      },
    });
  }

  console.log("Seeding badges…");
  const badges = [
    { code: "first_trade", name: "First Trade", description: "Placed your first order." },
    { code: "sharp", name: "Sharp", description: "Maintained >85% accuracy across 20+ trades." },
    { code: "streak_7", name: "7-Day Streak", description: "Profitable 7 trading days in a row." },
    { code: "oracle", name: "Oracle", description: "Reached the Oracle level." },
    { code: "early_supporter", name: "Early Supporter", description: "Joined during the beta." },
  ];
  for (const b of badges) {
    await prisma.badge.upsert({ where: { code: b.code }, update: {}, create: b });
  }

  console.log("Done.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
