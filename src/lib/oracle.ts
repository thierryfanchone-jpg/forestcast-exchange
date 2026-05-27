/**
 * Forecaxt oracle stack architecture.
 *
 * The platform composes four independent resolution sources, each with a
 * specific trust assumption and dispute mechanism. Markets are tagged with
 * the source that will be used at settlement; the choice depends on the
 * nature of the event and the availability of objective data.
 */

export type OracleStrategy =
  | { kind: "chainlink"; feed: string; threshold: number; operator: ">" | ">=" | "<" | "<=" }
  | { kind: "uma"; ancillaryData: string; bond: number; livenessSeconds: number }
  | { kind: "press"; provider: "reuters" | "ap"; queryHash: string }
  | { kind: "sport"; provider: string; eventId: string }
  | { kind: "manual"; admin: string; auditTrail: string };

export interface OracleResolution {
  marketId: string;
  outcome: "YES" | "NO" | "INVALID";
  source: OracleStrategy["kind"];
  evidence: unknown;
  proposedAt: string;
  finalisedAt?: string;
  disputed: boolean;
}

/**
 * Resolve a market by routing to the appropriate strategy.
 * Stubbed for the mock environment — a real implementation would call
 * Chainlink Functions, UMA's optimistic oracle, or our internal data
 * pipeline based on `strategy.kind`.
 */
export async function resolve(
  marketId: string,
  strategy: OracleStrategy,
): Promise<OracleResolution> {
  return {
    marketId,
    outcome: "YES",
    source: strategy.kind,
    evidence: { stub: true, strategy },
    proposedAt: new Date().toISOString(),
    disputed: false,
  };
}
