import type { LeaderboardEntry, UserLevel } from "@/types";

const LEVELS: UserLevel[] = ["Rookie", "Analyst", "Strategist", "Forecaster", "Oracle"];

const handles = [
  "alpha_macro",
  "kiraOracle",
  "dakar_quant",
  "fortdefrance",
  "bruno.eu",
  "satoshi.bzh",
  "kingsford",
  "lia.basis",
  "abj_trader",
  "kovacs",
  "miguel.dr",
  "thalys",
  "noor.sn",
  "yvann.gp",
  "ela.dz",
  "ivanov",
  "bk_quant",
  "okonkwo",
  "celine.ma",
  "rumi.eth",
];

export const MOCK_LEADERBOARD: LeaderboardEntry[] = handles.map((h, i) => {
  const roi = 240 - i * 9 + (i % 3 === 0 ? 14 : -5);
  const volume = 4_200_000 - i * 175_000 + (i % 4 === 0 ? 230_000 : 0);
  const accuracy = 0.92 - i * 0.012;
  const levelIdx = Math.min(LEVELS.length - 1, Math.floor((LEVELS.length * (handles.length - i)) / handles.length));
  return {
    rank: i + 1,
    handle: h,
    avatar: `https://api.dicebear.com/8.x/identicon/svg?seed=${encodeURIComponent(h)}`,
    roi,
    volume: Math.max(80_000, volume),
    accuracy: Math.max(0.42, accuracy),
    level: LEVELS[levelIdx],
    badges: [
      i < 3 ? "Top 3" : "",
      accuracy > 0.85 ? "Sharp" : "",
      i % 5 === 0 ? "Streak" : "",
    ].filter(Boolean),
  };
});
