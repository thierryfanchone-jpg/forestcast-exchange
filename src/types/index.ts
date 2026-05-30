export type Category =
  | "electricite"
  | "plomberie"
  | "climatisation"
  | "electromenager"
  | "serrurerie"
  | "general";

export type DangerLevel = "low" | "medium" | "high";

export type LeadStatus = "nouveau" | "envoye" | "accepte" | "termine";

export interface DiagnosticResult {
  summary: string;
  probableCauses: string[];
  questions: string[];
  dangerLevel: DangerLevel;
  safeActions: string[];
  avoidActions: string[];
  professionalNeeded: boolean;
  recommendedTrade: string;
}

export interface DiagnosticRequest {
  description: string;
  category: Category;
  imageBase64?: string;
  city?: string;
}

export interface LeadRequestData {
  id: string;
  category: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  description: string;
  imageUrl?: string;
  status: LeadStatus;
  createdAt: string;
}

export interface ArtisanProfileData {
  id: string;
  companyName: string;
  contactName: string;
  trade: string;
  siret?: string;
  phone: string;
  email: string;
  city: string;
  serviceAreas: string;
  availability: string;
  subscriptionType: string;
  status: string;
  createdAt: string;
}

export interface GuideContent {
  intro: string;
  symptoms: string[];
  probableCauses: string[];
  simpleChecks: string[];
  dangers: string[];
  whenToCallPro: string[];
}

export interface Guide {
  id: string;
  title: string;
  slug: string;
  category: Category;
  readingTime: number;
  content: GuideContent;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  electricite: "Électricité",
  plomberie: "Plomberie",
  climatisation: "Climatisation",
  electromenager: "Électroménager",
  serrurerie: "Serrurerie",
  general: "Général habitat",
};

export const CATEGORY_ICONS: Record<Category, string> = {
  electricite: "⚡",
  plomberie: "🔧",
  climatisation: "❄️",
  electromenager: "🏠",
  serrurerie: "🔑",
  general: "🔨",
};
