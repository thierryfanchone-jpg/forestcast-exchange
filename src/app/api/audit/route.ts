import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { auditInputSchema } from "@/lib/validation";
import { searchWeb } from "@/lib/tavily";
import { analyzeAnswer } from "@/lib/openai";
import { isOpenAIConfigured } from "@/lib/env";
import type { Profile } from "@/types";

export const runtime = "nodejs";

export async function POST(request: Request) {
  // 1. Vérifie la configuration et l'utilisateur connecté.
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase non configuré." },
      { status: 503 }
    );
  }
  if (!isOpenAIConfigured()) {
    return NextResponse.json(
      { error: "Service d'analyse IA non configuré (OPENAI_API_KEY)." },
      { status: 503 }
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  // 2. Valide les champs.
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corps invalide." }, { status: 400 });
  }
  const parsed = auditInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Données invalides.", details: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const input = parsed.data;

  // 3. Vérifie les crédits / l'accès illimité.
  const { data: profileRow } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();
  const profile = profileRow as Profile | null;

  if (!profile) {
    return NextResponse.json({ error: "Profil introuvable." }, { status: 404 });
  }
  if (!profile.is_unlimited && profile.audit_credits <= 0) {
    return NextResponse.json(
      { error: "Crédits insuffisants.", code: "NO_CREDITS" },
      { status: 402 }
    );
  }

  try {
    // 4. Recherche de sources via Tavily (tolérant aux erreurs).
    const query = `${input.original_question}\n${input.ai_answer}`.slice(0, 400);
    const sources = await searchWeb(query);

    // 5-6. Analyse OpenAI avec JSON strict.
    const report = await analyzeAnswer({
      question: input.original_question,
      answer: input.ai_answer,
      sources,
      language: input.report_language,
    });

    // 7. Sauvegarde de l'audit.
    const { data: audit, error: insertError } = await supabase
      .from("audits")
      .insert({
        user_id: user.id,
        original_question: input.original_question,
        ai_answer: input.ai_answer,
        report_language: input.report_language,
        trust_score: report.trust_score,
        risk_level: report.risk_level,
        status: report.status,
        main_claims: report.main_claims,
        verified_claims: report.verified_claims,
        uncertain_claims: report.uncertain_claims,
        risky_claims: report.risky_claims,
        sources: report.sources,
        corrected_answer: report.corrected_answer,
        final_recommendation: report.final_recommendation,
        raw_report: report,
      })
      .select("id")
      .single();

    if (insertError || !audit) {
      console.error("Insertion audit échouée:", insertError);
      return NextResponse.json(
        { error: "Sauvegarde de l'audit impossible." },
        { status: 500 }
      );
    }

    // 8. Décrémente 1 crédit si non illimité, incrémente l'usage gratuit.
    if (!profile.is_unlimited) {
      await supabase
        .from("profiles")
        .update({
          audit_credits: Math.max(0, profile.audit_credits - 1),
          free_audits_used:
            profile.plan === "free"
              ? (profile.free_audits_used ?? 0) + 1
              : profile.free_audits_used,
        })
        .eq("id", user.id);
    }

    // 9. Retourne l'identifiant.
    return NextResponse.json({ id: audit.id });
  } catch (err) {
    console.error("Erreur audit:", err);
    const message =
      err instanceof Error ? err.message : "Erreur lors de l'analyse.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
