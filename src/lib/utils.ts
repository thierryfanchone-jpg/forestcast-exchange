import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combine class names with Tailwind merge semantics.
 * Used throughout the component library for conditional styling.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as a compact currency value (e.g. $1.2M, €432K).
 */
export function formatCurrency(value: number, currency: "USD" | "EUR" = "USD"): string {
  const symbol = currency === "EUR" ? "€" : "$";
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000) return `${symbol}${(value / 1_000_000_000).toFixed(2)}B`;
  if (abs >= 1_000_000) return `${symbol}${(value / 1_000_000).toFixed(2)}M`;
  if (abs >= 1_000) return `${symbol}${(value / 1_000).toFixed(1)}K`;
  return `${symbol}${value.toFixed(2)}`;
}

/**
 * Format an integer with thin-space group separators.
 */
export function formatInt(value: number): string {
  return value.toLocaleString("en-US");
}

/**
 * Format a probability percentage from a 0..1 number or 0..100 number.
 */
export function formatProb(p: number): string {
  const pct = p > 1 ? p : p * 100;
  return `${pct.toFixed(0)}%`;
}

/**
 * Render a human-friendly relative time-until string (e.g. "3d 4h", "12h", "42m").
 */
export function timeUntil(date: Date | string): string {
  const target = typeof date === "string" ? new Date(date) : date;
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return "Closed";
  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor((diff % 86_400_000) / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

/**
 * Compute a +/- signed string with a fixed number of decimal places.
 */
export function signed(value: number, decimals = 2): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(decimals)}`;
}

/** Clamp a number between min and max. */
export function clamp(n: number, min: number, max: number): number {
  return Math.min(Math.max(n, min), max);
}

/** Deterministic seeded RNG (Mulberry32). Useful for stable SSR data. */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
