// Types partagés de l'application TrustLayer AI

export type Locale = "fr" | "en" | "es";

export type RiskLevel = "faible" | "moyen" | "élevé";
export type AuditStatus = "utilisable" | "à vérifier" | "à ne pas utiliser";

export interface AuditSource {
  title: string;
  url: string;
  relevance: string;
  supports_claims: string[];
}

/** Format JSON strict renvoyé par le modèle OpenAI. */
export interface AuditReport {
  trust_score: number;
  risk_level: RiskLevel;
  status: AuditStatus;
  main_claims: string[];
  verified_claims: string[];
  uncertain_claims: string[];
  risky_claims: string[];
  sources: AuditSource[];
  corrected_answer: string;
  final_recommendation: string;
}

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  free_audits_used: number;
  plan: string;
  audit_credits: number;
  is_unlimited: boolean;
  created_at: string;
}

export interface Audit {
  id: string;
  user_id: string;
  original_question: string;
  ai_answer: string;
  report_language: Locale;
  trust_score: number | null;
  risk_level: string | null;
  status: string | null;
  main_claims: string[] | null;
  verified_claims: string[] | null;
  uncertain_claims: string[] | null;
  risky_claims: string[] | null;
  sources: AuditSource[] | null;
  corrected_answer: string | null;
  final_recommendation: string | null;
  raw_report: AuditReport | null;
  created_at: string;
}

export type ProductType = "starter" | "pro" | "unlimited";
export type PaymentProvider = "stripe" | "paypal" | "crypto";

export interface Payment {
  id: string;
  user_id: string;
  provider: string | null;
  provider_payment_id: string | null;
  amount: number | null;
  currency: string;
  product_type: string | null;
  credits_added: number | null;
  status: string | null;
  created_at: string;
}
