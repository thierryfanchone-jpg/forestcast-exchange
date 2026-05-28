import type { Metadata } from "next";
import LeaderboardClient from "./LeaderboardClient";

export const metadata: Metadata = {
  title: "Leaderboard",
  description: "Top forecasters on Forecaxt — ranked by ROI, volume and accuracy.",
};

export default function LeaderboardPage() {
  return <LeaderboardClient />;
}
