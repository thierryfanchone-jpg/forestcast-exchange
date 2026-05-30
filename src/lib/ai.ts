import { DiagnosticRequest, DiagnosticResult } from "@/types";

const MOCK_DIAGNOSTICS: Record<string, DiagnosticResult> = {
  electricite: {
    summary:
      "Problème électrique détecté — vérification du circuit recommandée avant toute intervention.",
    probableCauses: [
      "Surcharge du circuit électrique",
      "Court-circuit dans l'installation",
      "Disjoncteur défectueux ou vieillissant",
      "Infiltration d'humidité dans les prises ou le tableau",
    ],
    questions: [
      "Avez-vous branché récemment un nouvel appareil électrique ?",
      "Le problème survient-il uniquement par temps humide ou pluvieux ?",
      "Quels appareils étaient allumés quand le problème est survenu ?",
      "Y a-t-il une odeur de brûlé ou de plastique fondu ?",
    ],
    dangerLevel: "medium",
    safeActions: [
      "Couper le disjoncteur général ou celui de la pièce concernée",
      "Débrancher tous les appareils de la pièce",
      "Aérer si vous sentez une odeur de brûlé",
      "Ne pas remettre sous tension avant d'avoir identifié la cause",
    ],
    avoidActions: [
      "Ne jamais toucher des fils sans avoir coupé le courant",
      "Ne pas utiliser d'eau ou produit humide près des prises",
      "Ne pas ignorer une odeur de brûlé ou des étincelles",
      "Ne pas remettre le disjoncteur si celui-ci saute à nouveau",
    ],
    professionalNeeded: true,
    recommendedTrade: "Électricien",
  },
  plomberie: {
    summary:
      "Fuite ou problème plomberie détecté — coupure d'eau recommandée immédiatement.",
    probableCauses: [
      "Joint usé ou cassé",
      "Tuyau fissuré ou raccord desserré",
      "Pression d'eau trop élevée",
      "Calcaire accumulé dans la tuyauterie",
    ],
    questions: [
      "L'eau coule-t-elle en permanence ou seulement quand vous ouvrez le robinet ?",
      "La fuite vient-elle d'un robinet, d'un tuyau visible ou du plafond ?",
      "Avez-vous des taches d'humidité sur les murs ou le plafond ?",
      "Votre compteur d'eau tourne-t-il même quand vous n'utilisez pas l'eau ?",
    ],
    dangerLevel: "medium",
    safeActions: [
      "Couper l'arrivée d'eau au robinet d'arrêt le plus proche",
      "Récupérer l'eau avec des serviettes ou un seau",
      "Photographier les dégâts pour votre assurance",
      "Contacter votre assurance si les dommages sont importants",
    ],
    avoidActions: [
      "Ne pas utiliser le robinet ou l'appareil qui fuit",
      "Ne pas laisser l'eau s'infiltrer dans les murs sans agir",
      "Ne pas tenter de réparer une canalisation sous pression sans expérience",
      "Ne pas ignorer une fuite même minime — elle peut empirer rapidement",
    ],
    professionalNeeded: true,
    recommendedTrade: "Plombier",
  },
  climatisation: {
    summary:
      "Dysfonctionnement de climatisation détecté — vérification des filtres et du gaz recommandée.",
    probableCauses: [
      "Filtres encrassés nécessitant un nettoyage",
      "Manque de gaz frigorigène",
      "Condenseur extérieur obstrué ou sale",
      "Problème électronique sur la carte ou le thermostat",
    ],
    questions: [
      "Depuis combien de temps avez-vous ce problème ?",
      "L'appareil affiche-t-il un code erreur ? Si oui, lequel ?",
      "Quand a eu lieu le dernier entretien de votre climatisation ?",
      "L'unité extérieure fonctionne-t-elle normalement ?",
    ],
    dangerLevel: "low",
    safeActions: [
      "Nettoyer ou remplacer les filtres de l'unité intérieure",
      "Vérifier que l'unité extérieure n'est pas obstruée",
      "Réinitialiser l'appareil en coupant l'alimentation 5 minutes",
      "Noter le code d'erreur affiché pour le technicien",
    ],
    avoidActions: [
      "Ne pas démonter l'unité sans connaissances techniques",
      "Ne pas manipuler le circuit de gaz frigorigène",
      "Ne pas ignorer un code erreur sans faire diagnostiquer",
      "Ne pas laisser fonctionner l'appareil s'il émet un bruit anormal",
    ],
    professionalNeeded: true,
    recommendedTrade: "Technicien climatisation",
  },
  electromenager: {
    summary:
      "Panne d'appareil électroménager détectée — diagnostic électronique recommandé.",
    probableCauses: [
      "Défaut du moteur ou de la pompe",
      "Problème électronique sur la carte mère",
      "Filtre bouché ou joint usé",
      "Ballon d'essorage ou tambour défectueux",
    ],
    questions: [
      "L'appareil affiche-t-il un code d'erreur ? Lequel ?",
      "Quel est le modèle et la marque de l'appareil ?",
      "Depuis combien de temps avez-vous ce problème ?",
      "Avez-vous effectué un entretien récemment ?",
    ],
    dangerLevel: "low",
    safeActions: [
      "Débrancher l'appareil de la prise secteur",
      "Consulter la notice pour identifier le code d'erreur",
      "Nettoyer les filtres et vérifier les joints visibles",
      "Vérifier que l'appareil est correctement branché et alimenté",
    ],
    avoidActions: [
      "Ne pas démonter l'appareil sous tension",
      "Ne pas forcer sur une pièce bloquée",
      "Ne pas utiliser l'appareil s'il présente des signes de surchauffe",
      "Ne pas ignorer un code erreur — il peut indiquer un problème grave",
    ],
    professionalNeeded: false,
    recommendedTrade: "Réparateur électroménager",
  },
  serrurerie: {
    summary:
      "Problème de serrurerie détecté — vérification mécanique et lubrification recommandées.",
    probableCauses: [
      "Serrure usée ou mécanisme grippé",
      "Clé abîmée ou cassée dans la serrure",
      "Problème d'alignement de la porte",
      "Cylindre ou gorge défectueux",
    ],
    questions: [
      "La clé entre-t-elle dans la serrure mais ne tourne pas ?",
      "Avez-vous une clé cassée dans la serrure ?",
      "La porte est-elle coincée dans son cadre ou le loquet est-il bloqué ?",
      "Depuis combien de temps avez-vous ce problème ?",
    ],
    dangerLevel: "low",
    safeActions: [
      "Lubrifier la serrure avec un spray lubrifiant approprié",
      "Essayer avec une clé en double si disponible",
      "Vérifier que la porte est bien alignée dans son cadre",
      "Appeler les secours si vous êtes enfermé(e)",
    ],
    avoidActions: [
      "Ne pas forcer avec un objet qui pourrait endommager le mécanisme",
      "Ne pas tenter de démonter la serrure sans expérience",
      "Ne pas utiliser d'outils inadaptés qui aggraveraient la situation",
      "Ne pas rester enfermé(e) sans appeler à l'aide",
    ],
    professionalNeeded: true,
    recommendedTrade: "Serrurier",
  },
  general: {
    summary:
      "Problème habitat détecté — évaluation par un professionnel recommandée.",
    probableCauses: [
      "Usure naturelle des équipements",
      "Défaut d'entretien ou de maintenance",
      "Problème structurel nécessitant une vérification",
      "Cause électrique, plomberie ou mécanique à identifier",
    ],
    questions: [
      "Depuis combien de temps observez-vous ce problème ?",
      "Le problème s'est-il aggravé récemment ?",
      "Avez-vous effectué des travaux récemment dans votre logement ?",
      "Y a-t-il d'autres problèmes similaires dans votre logement ?",
    ],
    dangerLevel: "low",
    safeActions: [
      "Prendre des photos pour documenter le problème",
      "Identifier si le problème est récent ou progressif",
      "Vérifier les équipements similaires dans votre logement",
      "Consulter votre bailleur ou syndic si vous êtes locataire",
    ],
    avoidActions: [
      "Ne pas ignorer un problème qui peut s'aggraver",
      "Ne pas tenter de réparer sans être sûr de la nature du problème",
      "Ne pas masquer le problème sans traiter la cause racine",
    ],
    professionalNeeded: false,
    recommendedTrade: "Artisan habitat généraliste",
  },
};

const SYSTEM_PROMPT = `Tu es DepannIA, un assistant expert en dépannage habitat. Tu aides les particuliers à comprendre leurs pannes, évaluer les risques et prendre les bonnes décisions.

Réponds UNIQUEMENT en JSON valide avec exactement cette structure :
{
  "summary": "Résumé court du problème en 1-2 phrases",
  "probableCauses": ["cause 1", "cause 2", "cause 3", "cause 4"],
  "questions": ["question 1", "question 2", "question 3", "question 4"],
  "dangerLevel": "low" | "medium" | "high",
  "safeActions": ["action 1", "action 2", "action 3", "action 4"],
  "avoidActions": ["à éviter 1", "à éviter 2", "à éviter 3"],
  "professionalNeeded": true | false,
  "recommendedTrade": "Métier recommandé"
}

Règles de sécurité ABSOLUES :
- TOUJOURS recommander de couper l'alimentation avant toute vérification électrique
- JAMAIS conseiller de manipuler des fils sous tension
- Si fumée, odeur de brûlé, étincelles ou eau près de l'électricité : dangerLevel = "high", professionalNeeded = true
- Si fuite de gaz suspectée : recommander d'appeler le 15 ou le 18, dangerLevel = "high"
- Ne jamais donner d'instructions qui pourraient mettre la vie en danger
- Toujours être rassurant mais clair sur les risques réels`;

export async function getDiagnostic(
  req: DiagnosticRequest
): Promise<DiagnosticResult> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return getMockDiagnostic(req);
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: `Catégorie : ${req.category}\nDescription : ${req.description}${req.city ? `\nVille : ${req.city}` : ""}${req.imageBase64 ? "\n(Photo jointe)" : ""}`,
          },
        ],
        max_tokens: 1200,
        temperature: 0.3,
      }),
    });

    if (!response.ok) return getMockDiagnostic(req);

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) return getMockDiagnostic(req);

    return JSON.parse(content) as DiagnosticResult;
  } catch {
    return getMockDiagnostic(req);
  }
}

function getMockDiagnostic(req: DiagnosticRequest): DiagnosticResult {
  const base =
    MOCK_DIAGNOSTICS[req.category] ?? MOCK_DIAGNOSTICS.general;
  return {
    ...base,
    summary: `[Mode démo] ${base.summary}`,
  };
}
