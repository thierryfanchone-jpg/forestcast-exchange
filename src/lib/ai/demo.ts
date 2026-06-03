import type { DiagnosticResult, InputType } from '@/types';

// Demo diagnostic returned when no API keys are configured.
// Realistic enough to show the full UI without real AI calls.
export function getDemoResult(inputType: InputType): DiagnosticResult {
  const demos: Record<string, DiagnosticResult> = {
    photo: {
      summary:
        'Tache d\'humidité visible au plafond avec traces brunâtres. Probable fuite en provenance de la pièce au-dessus ou de la toiture.',
      observations: [
        'Tache d\'humidité de forme irrégulière au centre du plafond',
        'Bords brunâtres indiquant une infiltration ancienne ou récurrente',
        'Pas de goutte active visible sur la photo',
        'Peinture légèrement cloquée autour de la tache',
      ],
      probableCauses: [
        'Fuite de canalisation dans le plancher de l\'étage supérieur',
        'Infiltration toiture ou terrasse (si dernier étage)',
        'Condensation chronique liée à une VMC défaillante',
      ],
      urgency: 'moyen',
      confidence: 'moyenne',
      confidenceExplanation:
        'La photo permet de détecter la tache mais pas d\'identifier la source exacte. Il faudrait vérifier l\'étage supérieur et l\'état de la toiture.',
      safeChecks: [
        'Vérifier si une pièce d\'eau (salle de bain, cuisine) se trouve juste au-dessus',
        'Regarder sous l\'évier ou derrière la machine à laver si applicable',
        'Contrôler visuellement la toiture ou la terrasse si accessible en sécurité',
        'Tester si la tache s\'aggrave après utilisation de l\'eau à l\'étage',
      ],
      dangerousActions: [
        'Ne pas percer le plafond sans avoir coupé l\'eau et l\'électricité au préalable',
        'Ne pas monter sur la toiture sans équipement de sécurité adapté',
        'Ne pas ignorer une humidité persistante — risque de moisissures et d\'effondrement',
      ],
      possibleMaterials: [
        'Enduit de rebouchage',
        'Peinture anti-humidité',
        'Joint silicone (si origine canalisation)',
        'Bâche de protection temporaire',
      ],
      estimatedCost: '80 – 400 € selon origine (hors réparation toiture)',
      recommendation:
        'Identifier d\'abord la source avant toute réparation cosmétique. Si l\'humidité progresse ou si vous ne trouvez pas l\'origine, contactez un plombier ou un couvreur.',
      needsProfessional: true,
      additionalQuestions: [
        'Y a-t-il une pièce d\'eau directement au-dessus ?',
        'La tache est-elle apparue après de fortes pluies ?',
        'L\'humidité s\'aggrave-t-elle en hiver ?',
        'La maison est-elle de plain-pied ou à plusieurs étages ?',
      ],
      domain: 'plomberie',
      safetyAlert: null,
      aiProvider: 'openai',
      aiModel: 'demo',
    },
    text: {
      summary:
        'Disjoncteur qui saute régulièrement dans la cuisine, probablement dû à une surcharge électrique sur le circuit.',
      observations: [
        'Déclenchement répétitif du disjoncteur sur un circuit spécifique',
        'Zone cuisine identifiée — appareils à forte consommation',
        'Pas de mention d\'odeur de brûlé ou de chaleur anormale',
      ],
      probableCauses: [
        'Surcharge du circuit par trop d\'appareils branchés simultanément',
        'Disjoncteur usé ou calibre insuffisant pour les besoins actuels',
        'Problème sur un appareil électroménager (défaut d\'isolement)',
      ],
      urgency: 'moyen',
      confidence: 'moyenne',
      confidenceExplanation:
        'Sans connaître les appareils branchés et la puissance du disjoncteur, difficile de confirmer. Une vérification par un électricien est recommandée si le problème persiste.',
      safeChecks: [
        'Vérifier le calibre du disjoncteur (inscrit dessus : 16A, 20A…)',
        'Compter les appareils branchés simultanément et leur puissance',
        'Tester sans four ou sans autre appareil puissant pour isoler le fautif',
        'Vérifier si un autre appareil sur le même circuit présente des anomalies',
      ],
      dangerousActions: [
        'Ne jamais bloquer ou court-circuiter un disjoncteur pour qu\'il ne saute plus',
        'Ne pas ouvrir le tableau électrique si vous n\'êtes pas qualifié',
        'Ne pas utiliser une rallonge pour contourner le problème',
      ],
      possibleMaterials: [
        'Disjoncteur de remplacement (même calibre)',
        'Multiprise avec parasurtenseur',
        'Wattmètre de mesure (pour diagnostic)',
      ],
      estimatedCost: '50 – 200 € (remplacement disjoncteur ou câblage)',
      recommendation:
        'Réduire la charge du circuit immédiatement. Si le problème persiste avec une seule prise, faire intervenir un électricien.',
      needsProfessional: false,
      additionalQuestions: [
        'Quels appareils sont branchés quand ça saute ?',
        'Le disjoncteur est-il chaud quand vous le réenclenchezz ?',
        'La prise concernée a-t-elle des traces de brûlure ?',
        'Depuis combien de temps cela se produit-il ?',
      ],
      domain: 'electricite',
      safetyAlert: null,
      aiProvider: 'anthropic',
      aiModel: 'demo',
    },
  };

  return demos[inputType] ?? demos['text'];
}
