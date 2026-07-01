import fr from "@/i18n/dictionaries/fr.json";
import en from "@/i18n/dictionaries/en.json";
import es from "@/i18n/dictionaries/es.json";

export const locales = ["fr", "en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export const dictionaries: Record<Locale, typeof fr> = { fr, en, es };

/**
 * Étape 1 de l'internationalisation : dictionnaires structurés et typés.
 * L'interface reste en français par défaut (V1). Le routage par locale
 * (ex. next-intl avec /en/*, /es/*) est prévu en V2 sans changement de
 * structure de dictionnaire.
 */
export function getDictionary(locale: Locale) {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}
