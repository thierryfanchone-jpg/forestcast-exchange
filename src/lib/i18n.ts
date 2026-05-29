import fr from "@/locales/fr.json";
import en from "@/locales/en.json";
import es from "@/locales/es.json";
import type { Locale } from "@/types";

export const LOCALES: Locale[] = ["fr", "en", "es"];
export const DEFAULT_LOCALE: Locale = "fr";
export const LOCALE_COOKIE = "tl_locale";

export const LOCALE_LABELS: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  es: "Español",
};

// Les dictionnaires partagent la même structure (cf. fr.json).
type Dictionary = typeof fr;

export const dictionaries: Record<Locale, Dictionary> = { fr, en, es };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "fr" || value === "en" || value === "es";
}

export function resolveLocale(value: string | undefined | null): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}
