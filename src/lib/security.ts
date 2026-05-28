/**
 * Forecaxt — anti-manipulation & fraud-scoring utilities.
 *
 * This module centralises the heuristics our trust & safety pipeline uses
 * to flag suspicious activity. The implementations here are intentionally
 * simple stubs; they exist to define the surface that the production system
 * will replace with real ML models, Redis-backed counters and device
 * fingerprinting.
 */

export interface ActivityContext {
  userId: string;
  ip: string;
  userAgent: string;
  deviceFingerprint?: string;
  marketId?: string;
  amount?: number;
}

export interface FraudScore {
  score: number; // 0..1, higher = more suspicious
  reasons: string[];
}

/**
 * Compute a fraud risk score from a transaction or login event.
 * The real implementation aggregates: velocity of trades, IP reputation,
 * device fingerprint reuse, KYC level, geographic mismatch.
 */
export function scoreActivity(ctx: ActivityContext): FraudScore {
  const reasons: string[] = [];
  let score = 0;

  if (ctx.amount && ctx.amount > 50_000) {
    score += 0.2;
    reasons.push("Large transaction amount");
  }
  if (!ctx.deviceFingerprint) {
    score += 0.1;
    reasons.push("Missing device fingerprint");
  }
  if (ctx.userAgent.length < 16) {
    score += 0.15;
    reasons.push("Atypical user agent");
  }
  return { score: Math.min(1, score), reasons };
}

/** True if the score crosses the block threshold. */
export function shouldBlock(score: FraudScore): boolean {
  return score.score >= 0.75;
}

/** True if the score crosses the manual-review threshold. */
export function shouldReview(score: FraudScore): boolean {
  return score.score >= 0.45;
}
