// IA Artisan — Types centraux

export type UserRole = 'particulier' | 'artisan' | 'admin';
export type SubscriptionPlan = 'free' | 'particulier' | 'premium' | 'artisan';
export type DiagnosticStatus = 'pending' | 'analyzing' | 'completed' | 'failed';
export type InputType = 'photo' | 'video' | 'audio' | 'text';
export type UrgencyLevel = 'faible' | 'moyen' | 'eleve' | 'critique';
export type ConfidenceLevel = 'faible' | 'moyenne' | 'elevee';
export type AIProvider = 'openai' | 'anthropic' | 'gemini';

export type Domain =
  | 'electricite'
  | 'securite_incendie'
  | 'plomberie'
  | 'climatisation'
  | 'petits_travaux'
  | 'peinture'
  | 'cloisons'
  | 'montage_mobilier'
  | 'entretien_logement'
  | 'diagnostic_general';

export const DOMAIN_LABELS: Record<Domain, string> = {
  electricite: 'Électricité',
  securite_incendie: 'Sécurité incendie',
  plomberie: 'Plomberie',
  climatisation: 'Climatisation',
  petits_travaux: 'Petits travaux',
  peinture: 'Peinture',
  cloisons: 'Cloisons',
  montage_mobilier: 'Montage mobilier',
  entretien_logement: 'Entretien logement',
  diagnostic_general: 'Diagnostic général',
};

export const DOMAIN_ICONS: Record<Domain, string> = {
  electricite: '⚡',
  securite_incendie: '🔥',
  plomberie: '🔧',
  climatisation: '❄️',
  petits_travaux: '🔨',
  peinture: '🎨',
  cloisons: '🧱',
  montage_mobilier: '🪑',
  entretien_logement: '🏠',
  diagnostic_general: '🔍',
};

export const URGENCY_CONFIG: Record<
  UrgencyLevel,
  { label: string; color: string; bg: string; border: string }
> = {
  faible: {
    label: 'Urgence faible',
    color: 'text-green-700',
    bg: 'bg-green-50',
    border: 'border-green-200',
  },
  moyen: {
    label: 'Urgence moyenne',
    color: 'text-yellow-700',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
  },
  eleve: {
    label: 'Urgence élevée',
    color: 'text-orange-700',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
  },
  critique: {
    label: 'URGENCE CRITIQUE',
    color: 'text-red-700',
    bg: 'bg-red-50',
    border: 'border-red-300',
  },
};

export const CONFIDENCE_CONFIG: Record<
  ConfidenceLevel,
  { label: string; color: string }
> = {
  faible: { label: 'Confiance faible', color: 'text-gray-500' },
  moyenne: { label: 'Confiance moyenne', color: 'text-blue-600' },
  elevee: { label: 'Confiance élevée', color: 'text-green-600' },
};

// ─── Diagnostic result structure ──────────────────────────────────────────────

export interface DiagnosticResult {
  summary: string;
  observations: string[];
  probableCauses: string[];
  urgency: UrgencyLevel;
  confidence: ConfidenceLevel;
  confidenceExplanation: string;
  safeChecks: string[];
  dangerousActions: string[];
  possibleMaterials: string[];
  estimatedCost: string;
  recommendation: string;
  needsProfessional: boolean;
  additionalQuestions: string[];
  domain: Domain;
  safetyAlert: string | null;
  aiProvider: AIProvider;
  aiModel: string;
}

// ─── API types ────────────────────────────────────────────────────────────────

export interface DiagnosticRequest {
  inputType: InputType;
  text?: string;
  domain?: Domain;
  fileUrls?: string[];
}

export interface DiagnosticResponse {
  id: string;
  status: DiagnosticStatus;
  result?: DiagnosticResult;
  error?: string;
}

export interface UploadResponse {
  url: string;
  mimeType: string;
  sizeBytes: number;
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

export interface PricingPlan {
  id: SubscriptionPlan;
  name: string;
  price: string;
  period: string;
  diagnostics: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Découverte',
    price: '0 €',
    period: '',
    diagnostics: '1 diagnostic offert',
    features: [
      '1 diagnostic photo ou texte',
      'Réponse structurée complète',
      'Niveau de danger détecté',
      'Conseils de sécurité inclus',
    ],
    cta: 'Commencer gratuitement',
    highlighted: false,
  },
  {
    id: 'particulier',
    name: 'Particulier',
    price: '9,90 €',
    period: 'pour 5 diagnostics',
    diagnostics: '5 diagnostics',
    features: [
      '5 diagnostics photo ou texte',
      'Réponse structurée complète',
      'Génération de rapport PDF',
      'Historique des diagnostics',
      'Demande de devis artisan',
    ],
    cta: 'Acheter 5 diagnostics',
    highlighted: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '19,90 €',
    period: 'par mois',
    diagnostics: 'Diagnostics illimités',
    features: [
      'Diagnostics illimités',
      'Photo, audio et texte',
      'Rapports PDF illimités',
      'Historique complet',
      'Mise en relation artisan',
      'Estimation de prix',
      'Accès prioritaire',
    ],
    cta: 'Démarrer Premium',
    highlighted: true,
  },
  {
    id: 'artisan',
    name: 'Artisan Pro',
    price: '49 €',
    period: 'par mois',
    diagnostics: 'Tableau de bord pro',
    features: [
      'Réception des demandes clients',
      'Rapports clients complets',
      'Gestion des devis',
      'Suivi des interventions',
      'Profil artisan vérifié',
      'Priorité sur les demandes',
    ],
    cta: 'Devenir partenaire',
    highlighted: false,
  },
];
