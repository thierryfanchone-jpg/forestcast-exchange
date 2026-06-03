import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `Tu es le Coach ORION ACADEMY, un expert en communication, prise de parole et développement professionnel.

Ton rôle : analyser les réponses des utilisateurs lors de simulations (entretien, pitch, présentation) et leur fournir un feedback structuré et motivant.

Format de réponse pour chaque analyse :
- Score /10 en gras au début
- 2-3 points forts (✓)
- 2-3 points à améliorer (✗)
- Une correction/suggestion concrète
- Un nouvel exercice court

Règles :
- Réponds toujours en français
- Sois bienveillant mais direct et précis
- Donne des exemples concrets
- Encourage la progression
- Si c'est un échange conversationnel (entretien, pitch), joue le rôle du recruteur/investisseur et alterne entre poser des questions et donner du feedback
`;

function getScenarioContext(scenario: string): string {
  const contexts: Record<string, string> = {
    entretien: "Tu simules un recruteur RH exigeant mais bienveillant. Pose des questions d'entretien réalistes.",
    presentation: "Tu aides l'utilisateur à améliorer sa présentation personnelle.",
    pitch: "Tu joues le rôle d'un investisseur sceptique. Pose des questions difficiles sur le projet.",
    reunion: "Tu simules un contexte de réunion professionnelle.",
    trac: "Tu aides à gérer le stress et le trac avant une prise de parole.",
    prise_de_parole: "Tu analyses la structure et l'impact d'un discours public.",
  };
  return contexts[scenario] || contexts.presentation;
}

export async function POST(request: NextRequest) {
  try {
    const { scenario, message, history = [] } = await request.json();

    if (!message) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    // Try Anthropic first
    if (anthropicKey) {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": anthropicKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1024,
          system: SYSTEM_PROMPT + "\n\n" + getScenarioContext(scenario),
          messages: [
            ...history.slice(-6).map((m: { role: string; content: string }) => ({
              role: m.role,
              content: m.content,
            })),
            { role: "user", content: message },
          ],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.content?.[0]?.text || "Désolé, une erreur s'est produite.";
        const scoreMatch = text.match(/Score[^\d]*(\d+)/i);
        return NextResponse.json({
          message: text,
          score: scoreMatch ? parseInt(scoreMatch[1]) : null,
        });
      }
    }

    // Fallback to OpenAI
    if (openaiKey) {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: SYSTEM_PROMPT + "\n\n" + getScenarioContext(scenario) },
            ...history.slice(-6).map((m: { role: string; content: string }) => ({
              role: m.role,
              content: m.content,
            })),
            { role: "user", content: message },
          ],
          max_tokens: 1024,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.choices?.[0]?.message?.content || "Désolé, une erreur s'est produite.";
        const scoreMatch = text.match(/Score[^\d]*(\d+)/i);
        return NextResponse.json({
          message: text,
          score: scoreMatch ? parseInt(scoreMatch[1]) : null,
        });
      }
    }

    // Demo fallback when no API keys configured
    const demoResponses: Record<string, string> = {
      entretien: "**Score : 7/10**\n\n✓ Bonne énergie et motivation visible\n✓ Réponse structurée\n\n✗ Manque d'exemples concrets avec chiffres\n✗ Trop de généralités (\"je travaille dur\")\n\n**Correction :** Ancre chaque point dans une réalisation précise. \"J'ai géré X en Y semaines avec Z résultats.\"\n\n**Exercice :** Refais ta présentation en citant 2 réalisations avec des chiffres précis.",
      pitch: "**Score : 6/10**\n\n✓ Idée claire et compréhensible\n✓ Ton enthousiaste\n\n✗ Le problème client n'est pas assez précis\n✗ Pas de chiffres de marché\n\n**Correction :** Commence par le problème douloureux, puis ta solution unique.\n\n**Exercice :** Refais ton pitch en 60 secondes en suivant : Problème → Solution → Marché → Traction → Ask.",
      default: "**Score : 7/10**\n\nBonne réponse dans l'ensemble. Continue à t'entraîner pour améliorer ta fluidité et ton impact.\n\n**Exercice :** Refais cette réponse en te concentrant sur la précision et la concision.",
    };

    const demoMsg = demoResponses[scenario] || demoResponses.default;
    const scoreMatch = demoMsg.match(/Score\s*:\s*(\d+)/);

    return NextResponse.json({
      message: demoMsg,
      score: scoreMatch ? parseInt(scoreMatch[1]) : 7,
      demo: true,
    });
  } catch (error) {
    console.error("AI Coach error:", error);
    return NextResponse.json(
      { error: "AI service unavailable", message: "Configure ANTHROPIC_API_KEY ou OPENAI_API_KEY dans .env" },
      { status: 500 }
    );
  }
}
