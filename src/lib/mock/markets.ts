import type { Market, PricePoint } from "@/types";
import { rng } from "@/lib/utils";

/**
 * Generate a stable probability-walk series for a market.
 * Used both for sparklines on cards and the full chart on the detail page.
 */
function makeSeries(seed: number, anchor: number, points = 96): PricePoint[] {
  const r = rng(seed);
  const now = Date.now();
  const stepMs = 60 * 60 * 1000; // 1h
  let p = anchor;
  const out: PricePoint[] = [];
  for (let i = points; i >= 0; i--) {
    const drift = (r() - 0.5) * 0.04;
    const pull = (anchor - p) * 0.08;
    p = Math.max(0.02, Math.min(0.98, p + drift + pull));
    out.push({
      t: now - i * stepMs,
      p,
      v: Math.round(800 + r() * 12_000),
    });
  }
  return out;
}

interface Seed {
  slug: string;
  title: string;
  description: string;
  category: Market["category"];
  region?: Market["region"];
  probability: number;
  volume: number;
  liquidity: number;
  daysOut: number;
  oracle: Market["oracle"];
  tags: string[];
  imageHint?: string;
}

const seeds: Seed[] = [
  {
    slug: "ecb-rate-cut-september-2025",
    title: "Will the ECB cut rates before September 2025?",
    description:
      "Resolves YES if the European Central Bank announces a policy rate reduction at or before its September 2025 monetary policy meeting.",
    category: "Economy",
    region: "EU",
    probability: 0.67,
    volume: 2_840_000,
    liquidity: 318_000,
    daysOut: 92,
    oracle: "reuters",
    tags: ["ECB", "Rates", "Eurozone"],
  },
  {
    slug: "senegal-elections-on-schedule",
    title: "Will Senegal hold its scheduled elections on time?",
    description:
      "Resolves YES if Senegal's next general election takes place on the official, gazetted date without postponement beyond 14 days.",
    category: "Africa",
    region: "AF",
    probability: 0.82,
    volume: 612_000,
    liquidity: 84_000,
    daysOut: 41,
    oracle: "ap",
    tags: ["Elections", "West Africa"],
  },
  {
    slug: "martinique-autonomy-vote-2026",
    title: "Will Martinique vote for expanded autonomy by 2026?",
    description:
      "Resolves YES if a referendum or assembly vote in Martinique passes a measure expanding territorial autonomy from France before 31 Dec 2026.",
    category: "Caribbean",
    region: "CB",
    probability: 0.44,
    volume: 198_000,
    liquidity: 47_000,
    daysOut: 540,
    oracle: "manual",
    tags: ["Referendum", "DOM-TOM"],
  },
  {
    slug: "bitcoin-above-120k-2025",
    title: "Will Bitcoin trade above $120,000 in 2025?",
    description:
      "Resolves YES if BTC/USD prints a daily close above $120,000 on any major exchange before 31 Dec 2025 UTC.",
    category: "Crypto",
    region: "GLOBAL",
    probability: 0.71,
    volume: 6_240_000,
    liquidity: 802_000,
    daysOut: 220,
    oracle: "chainlink",
    tags: ["BTC", "Crypto", "Macro"],
  },
  {
    slug: "france-pm-by-eoy",
    title: "Will the current French PM still be in office on 31 Dec?",
    description:
      "Resolves YES if the same individual holds the office of Prime Minister of France on 31 December 23:59 Paris time.",
    category: "Politics",
    region: "EU",
    probability: 0.58,
    volume: 1_120_000,
    liquidity: 144_000,
    daysOut: 175,
    oracle: "reuters",
    tags: ["France", "Politics"],
  },
  {
    slug: "psg-champions-league-final",
    title: "Will PSG reach the Champions League final?",
    description: "Resolves YES if Paris Saint-Germain plays in the UCL final this season.",
    category: "Sports",
    region: "EU",
    probability: 0.36,
    volume: 884_000,
    liquidity: 112_000,
    daysOut: 64,
    oracle: "sport-api",
    tags: ["UCL", "Football"],
  },
  {
    slug: "nigeria-inflation-below-20",
    title: "Will Nigeria's headline inflation fall below 20% YoY this year?",
    description:
      "Resolves YES if the NBS publishes a YoY CPI print below 20.0% for any month before 31 Dec.",
    category: "Africa",
    region: "AF",
    probability: 0.29,
    volume: 312_000,
    liquidity: 41_000,
    daysOut: 210,
    oracle: "reuters",
    tags: ["Nigeria", "Inflation"],
  },
  {
    slug: "haiti-stabilization-mission",
    title: "Will the multinational mission in Haiti reach full deployment?",
    description:
      "Resolves YES if the UN-backed multinational security mission reaches its authorized troop ceiling before year end.",
    category: "Caribbean",
    region: "CB",
    probability: 0.38,
    volume: 142_000,
    liquidity: 22_000,
    daysOut: 188,
    oracle: "manual",
    tags: ["Haiti", "Security"],
  },
  {
    slug: "ethereum-above-5k",
    title: "Will Ethereum exceed $5,000 this year?",
    description: "Resolves YES on a daily close above $5,000 on a top-5 exchange before 31 Dec.",
    category: "Crypto",
    region: "GLOBAL",
    probability: 0.54,
    volume: 3_900_000,
    liquidity: 488_000,
    daysOut: 220,
    oracle: "chainlink",
    tags: ["ETH", "Crypto"],
  },
  {
    slug: "openai-ipo-2025",
    title: "Will OpenAI file for IPO in 2025?",
    description: "Resolves YES on a publicly visible S-1 filing before 31 Dec 2025.",
    category: "Technology",
    region: "GLOBAL",
    probability: 0.12,
    volume: 1_640_000,
    liquidity: 184_000,
    daysOut: 220,
    oracle: "ap",
    tags: ["OpenAI", "IPO", "AI"],
  },
  {
    slug: "apple-vision-2-launch",
    title: "Will Apple announce a Vision Pro successor before Sept?",
    description:
      "Resolves YES if Apple officially announces a second-generation Vision Pro hardware product before 30 September.",
    category: "Technology",
    region: "GLOBAL",
    probability: 0.21,
    volume: 740_000,
    liquidity: 96_000,
    daysOut: 110,
    oracle: "ap",
    tags: ["Apple", "Hardware"],
  },
  {
    slug: "brent-above-100",
    title: "Will Brent crude trade above $100 this year?",
    description: "Resolves YES on a daily settlement above $100/bbl before 31 Dec.",
    category: "Energy",
    region: "GLOBAL",
    probability: 0.33,
    volume: 1_240_000,
    liquidity: 168_000,
    daysOut: 220,
    oracle: "reuters",
    tags: ["Oil", "Brent"],
  },
  {
    slug: "eu-ai-act-enforcement",
    title: "Will the EU issue its first AI Act enforcement action this year?",
    description: "Resolves YES on an official enforcement notice from any EU member state.",
    category: "Politics",
    region: "EU",
    probability: 0.62,
    volume: 380_000,
    liquidity: 52_000,
    daysOut: 200,
    oracle: "reuters",
    tags: ["EU", "Regulation", "AI"],
  },
  {
    slug: "kenya-shilling-110",
    title: "Will the Kenyan Shilling weaken past 145 vs USD?",
    description: "Resolves YES on a CBK reference rate above 145 KES/USD.",
    category: "Africa",
    region: "AF",
    probability: 0.41,
    volume: 168_000,
    liquidity: 24_000,
    daysOut: 150,
    oracle: "reuters",
    tags: ["FX", "Kenya"],
  },
  {
    slug: "trinidad-gdp-growth",
    title: "Will Trinidad & Tobago print >2% GDP growth this year?",
    description: "Resolves on official annual GDP release.",
    category: "Caribbean",
    region: "CB",
    probability: 0.47,
    volume: 92_000,
    liquidity: 14_000,
    daysOut: 280,
    oracle: "manual",
    tags: ["Caribbean", "GDP"],
  },
  {
    slug: "solana-flips-eth-mcap",
    title: "Will Solana market cap exceed Ethereum's?",
    description: "Resolves YES on a 7-day MA crossover on CoinGecko.",
    category: "Crypto",
    region: "GLOBAL",
    probability: 0.08,
    volume: 2_120_000,
    liquidity: 246_000,
    daysOut: 220,
    oracle: "chainlink",
    tags: ["SOL", "ETH"],
  },
  {
    slug: "uk-rate-cut-q3",
    title: "Will the Bank of England cut in Q3?",
    description: "Resolves YES on any BoE rate decision lowering the bank rate in July–September.",
    category: "Economy",
    region: "EU",
    probability: 0.74,
    volume: 980_000,
    liquidity: 132_000,
    daysOut: 88,
    oracle: "reuters",
    tags: ["BoE", "UK"],
  },
  {
    slug: "lng-export-record",
    title: "Will US LNG exports hit a monthly record this year?",
    description: "Resolves YES on any monthly EIA print above the prior all-time high.",
    category: "Energy",
    region: "GLOBAL",
    probability: 0.69,
    volume: 410_000,
    liquidity: 58_000,
    daysOut: 200,
    oracle: "ap",
    tags: ["LNG", "Energy"],
  },
  {
    slug: "germany-recession-2025",
    title: "Will Germany print two consecutive negative GDP quarters?",
    description: "Resolves YES on Destatis Q-on-Q prints.",
    category: "Economy",
    region: "EU",
    probability: 0.31,
    volume: 720_000,
    liquidity: 88_000,
    daysOut: 200,
    oracle: "reuters",
    tags: ["Germany", "Recession"],
  },
  {
    slug: "spacex-starship-orbital-payload",
    title: "Will Starship deploy a paying customer payload this year?",
    description: "Resolves YES on a confirmed commercial payload deployment.",
    category: "Technology",
    region: "GLOBAL",
    probability: 0.46,
    volume: 522_000,
    liquidity: 68_000,
    daysOut: 220,
    oracle: "ap",
    tags: ["Space", "SpaceX"],
  },
  {
    slug: "guadeloupe-tourism-record",
    title: "Will Guadeloupe set a new tourism arrivals record this season?",
    description: "Resolves on official seasonal tourism report from the regional authority.",
    category: "Caribbean",
    region: "CB",
    probability: 0.55,
    volume: 64_000,
    liquidity: 9_400,
    daysOut: 130,
    oracle: "manual",
    tags: ["Tourism", "Caribbean"],
  },
  {
    slug: "ghana-imf-program",
    title: "Will Ghana complete its IMF program review on schedule?",
    description: "Resolves on the next IMF Article IV publication.",
    category: "Africa",
    region: "AF",
    probability: 0.63,
    volume: 184_000,
    liquidity: 26_000,
    daysOut: 75,
    oracle: "reuters",
    tags: ["IMF", "Ghana"],
  },
];

function daysFromNow(d: number): string {
  return new Date(Date.now() + d * 86_400_000).toISOString();
}

/**
 * Fully expanded mock market dataset used as a stand-in for the database
 * during development. Each market gets a deterministic price series so
 * SSR and CSR render identical sparklines.
 */
export const MOCK_MARKETS: Market[] = seeds.map((s, idx) => ({
  id: `mkt_${(idx + 1).toString().padStart(4, "0")}`,
  slug: s.slug,
  title: s.title,
  description: s.description,
  category: s.category,
  region: s.region,
  probability: s.probability,
  volume: s.volume,
  liquidity: s.liquidity,
  openInterest: Math.round(s.liquidity * 0.8),
  status: s.daysOut < 14 ? "closing-soon" : "open",
  closesAt: daysFromNow(s.daysOut),
  createdAt: daysFromNow(-90 - idx * 3),
  series: makeSeries(idx * 9973 + 7, s.probability),
  oracle: s.oracle,
  tags: s.tags,
  imageHint: s.imageHint,
}));

export function getMarketBySlug(slug: string): Market | undefined {
  return MOCK_MARKETS.find((m) => m.slug === slug);
}

export function listMarkets(filter?: {
  category?: Market["category"];
  q?: string;
  sort?: "trending" | "volume" | "closing";
}): Market[] {
  let out = [...MOCK_MARKETS];
  if (filter?.category) out = out.filter((m) => m.category === filter.category);
  if (filter?.q) {
    const q = filter.q.toLowerCase();
    out = out.filter(
      (m) => m.title.toLowerCase().includes(q) || m.tags.join(" ").toLowerCase().includes(q),
    );
  }
  const sort = filter?.sort ?? "trending";
  if (sort === "volume") out.sort((a, b) => b.volume - a.volume);
  else if (sort === "closing")
    out.sort((a, b) => new Date(a.closesAt).getTime() - new Date(b.closesAt).getTime());
  else out.sort((a, b) => b.liquidity - a.liquidity);
  return out;
}
