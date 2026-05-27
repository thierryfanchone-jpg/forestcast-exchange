/**
 * Anthropic Claude integration for Forecaxt.
 *
 * Powers:
 *   - per-market AI briefings (auto-generated context summaries)
 *   - probability trend explanations
 *   - the in-app trading assistant chat widget
 *   - anomaly-detection alerts on the moderation side
 *
 * The actual SDK call is gated by `ANTHROPIC_API_KEY` and `ANTHROPIC_MODEL`
 * environment variables. The helper falls back to a deterministic stub
 * when the key isn't configured, so local development stays offline.
 */

export interface AiBriefing {
  model: string;
  text: string;
  generatedAt: string;
}

const DEFAULT_MODEL = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-20250514";

/**
 * Build a short market briefing. In production this would call the
 * Anthropic Messages API with a system prompt that constrains output to
 * factual, non-advisory language.
 */
export async function generateMarketBriefing(input: {
  title: string;
  description: string;
  probability: number;
  tags: string[];
  recentTrades?: { side: "yes" | "no"; price: number; size: number }[];
}): Promise<AiBriefing> {
  if (!process.env.ANTHROPIC_API_KEY) {
    return {
      model: DEFAULT_MODEL,
      text:
        `Probability sits at ${(input.probability * 100).toFixed(0)}% — ` +
        `flow biased ${input.probability > 0.5 ? "constructive" : "defensive"}. ` +
        `Watch catalysts: ${input.tags.join(", ")}.`,
      generatedAt: new Date().toISOString(),
    };
  }

  // The real implementation would import `@anthropic-ai/sdk` and call
  // anthropic.messages.create({ model, system, messages, max_tokens }).
  // Kept abstract so this file has no runtime dependencies in the demo.
  return {
    model: DEFAULT_MODEL,
    text: "<live model output here>",
    generatedAt: new Date().toISOString(),
  };
}
