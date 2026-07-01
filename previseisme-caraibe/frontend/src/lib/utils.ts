import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMagnitude(magnitude: number): string {
  return magnitude.toFixed(1);
}

export function magnitudeLabel(magnitude: number): string {
  if (magnitude < 3) return "Mineur";
  if (magnitude < 4) return "Léger";
  if (magnitude < 5) return "Modéré";
  if (magnitude < 6) return "Fort";
  return "Majeur";
}

export function magnitudeColorVar(magnitude: number): string {
  if (magnitude < 3) return "var(--magnitude-minor)";
  if (magnitude < 4) return "var(--magnitude-light)";
  if (magnitude < 5) return "var(--magnitude-moderate)";
  if (magnitude < 6) return "var(--magnitude-strong)";
  return "var(--magnitude-major)";
}

export function formatRelativeTime(isoDate: string, locale = "fr-FR"): string {
  const date = new Date(isoDate);
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.round(diffMs / 60000);
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  if (diffMin < 60) return rtf.format(-diffMin, "minute");
  const diffH = Math.round(diffMin / 60);
  if (diffH < 24) return rtf.format(-diffH, "hour");
  const diffD = Math.round(diffH / 24);
  return rtf.format(-diffD, "day");
}

export function formatDateTime(isoDate: string, locale = "fr-FR"): string {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(isoDate));
}
