import OpenAI from "openai";
import { env, isOpenAIConfigured } from "@/lib/env";
import type { AuditReport, Locale } from "@/types";
import type { TavilyResult } from "@/lib/tavily";
import { clampScore } from "@/lib/utils";

const SYSTEM_PROMPT = `Tu es un vérificateur professionnel de réponses générées par IA.
Ta mission est d'analyser une réponse IA et de vérifier sa fiabilité à partir des sources fournies.
Tu dois être strict, prudent et factuel.
Tu ne dois pas inventer de source.
Tu ne dois pas valider une affirmation si les sources ne la confirment pas.
Tu dois distinguer clairement :
ce qui est vérifié,
ce qui est incertain,
ce qui est risqué,
ce qui semble faux.
Tu dois répondre uniquement en JSON valide.`;

const LANGUAGE_LABEL: Record<Locale, string> = {
  fr: "français",
  en: "anglais",
  es: "espagnol",
};

function buildUserPrompt(
  question: string,
  answer: string,
  sources: TavilyResult[],
  language: Locale
): string {
  const sourcesText =
    sources.length > 0
      ? sources
          .map(
            (s, i) =>
              `[Source ${i + 1}] ${s.title}\nURL: ${s.url}\nExtrait: ${s.content?.slice(0, 800) ?? ""}`
          )
          .join("\n\n")
      : "Aucune source externe trouvée.";

  return `Rédige le rapport en ${LANGUAGE_LABEL[language]}.

QUESTION ORIGINALE:
${question}

RÉPONSE IA À VÉRIFIER:
${answer}

SOURCES TROUVÉES:
${sourcesText}

Réponds STRICTEMENT avec un objet JSON respectant exactement ce format (sans texte autour) :
{
  "trust_score": 0,
  "risk_level": "faible | moyen | élevé",
  "status": "utilisable | à vérifier | à ne pas utiliser",
  "main_claims": [],
  "verified_claims": [],
  "uncertain_claims": [],
  "risky_claims": [],
  "sources": [
    { "title": "", "url": "", "relevance": "", "supports_claims": [] }
  ],
  "corrected_answer": "",
  "final_recommendation": ""
}`;
}

/** Normalise / sécurise le JSON renvoyé par le modèle. */
function normalizeReport(raw: unknown): AuditReport {
  const r = (raw ?? {}) as Record<string, unknown>;
  const arr = (v: unknown): string[] =>
    Array.isArray(v) ? v.map((x) => String(x)) : [];

  const riskRaw = String(r.risk_level ?? "moyen").toLowerCase();
  const risk_level = (["faible", "moyen", "élevé"].includes(riskRaw)
    ? riskRaw
    : "moyen") as AuditReport["risk_level"];

  const statusRaw = String(r.status ?? "à vérifier").toLowerCase();
  const status = (["utilisable", "à vérifier", "à ne pas utiliser"].includes(
    statusRaw
  )
    ? statusRaw
    : "à vérifier") as AuditReport["status"];

  const sources = Array.isArray(r.sources)
    ? (r.sources as Record<string, unknown>[]).map((s) => ({
        title: String(s.title ?? ""),
        url: String(s.url ?? ""),
        relevance: String(s.relevance ?? ""),
        supports_claims: arr(s.supports_claims),
      }))
    : [];

  return {
    trust_score: clampScore(r.trust_score),
    risk_level,
    status,
    main_claims: arr(r.main_claims),
    verified_claims: arr(r.verified_claims),
    uncertain_claims: arr(r.uncertain_claims),
    risky_claims: arr(r.risky_claims),
    sources,
    corrected_answer: String(r.corrected_answer ?? ""),
    final_recommendation: String(r.final_recommendation ?? ""),
  };
}

let client: OpenAI | null = null;
function getClient(): OpenAI {
  if (!client) {
    client = new OpenAI({ apiKey: env.openaiApiKey });
  }
  return client;
}

/**
 * Analyse la réponse IA et renvoie un rapport structuré.
 * Jette une erreur explicite si OpenAI n'est pas configuré.
 */
export async function analyzeAnswer(params: {
  question: string;
  answer: string;
  sources: TavilyResult[];
  language: Locale;
}): Promise<AuditReport> {
  if (!isOpenAIConfigured()) {
    throw new Error("OPENAI_API_KEY manquante : analyse IA indisponible.");
  }

  const completion = await getClient().chat.completions.create({
    model: env.openaiModel,
    temperature: 0.1,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: buildUserPrompt(
          params.question,
          params.answer,
          params.sources,
          params.language
        ),
      },
    ],
  });

  const content = completion.choices[0]?.message?.content ?? "{}";
  let parsed: unknown;
  try {
    parsed = JSON.parse(content);
  } catch {
    throw new Error("Réponse IA non valide (JSON illisible).");
  }
  return normalizeReport(parsed);
}
