import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CertificateLevel } from "@/types";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  if (price === 0) return "Gratuit";
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(price);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function getCertificateLevel(score: number): CertificateLevel {
  if (score >= 90) return "or";
  if (score >= 75) return "argent";
  return "bronze";
}

export function getCertificateLevelLabel(level: CertificateLevel): string {
  const labels = { bronze: "Bronze", argent: "Argent", or: "Or" };
  return labels[level];
}

export function getCertificateLevelColor(level: CertificateLevel): string {
  const colors = {
    bronze: "text-amber-600",
    argent: "text-slate-400",
    or: "text-gold",
  };
  return colors[level];
}

export function getScoreColor(score: number): string {
  if (score >= 90) return "text-gold";
  if (score >= 75) return "text-blue-400";
  if (score >= 60) return "text-green-400";
  return "text-slate-400";
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + "…";
}

export function getScenarioLabel(scenario: string): string {
  const labels: Record<string, string> = {
    entretien: "Entretien d'embauche",
    presentation: "Présentation de soi",
    pitch: "Pitch commercial",
    reunion: "Réunion professionnelle",
    trac: "Gestion du trac",
    prise_de_parole: "Prise de parole publique",
  };
  return labels[scenario] || scenario;
}
