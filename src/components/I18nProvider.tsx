"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { Locale } from "@/types";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  getDictionary,
  resolveLocale,
} from "@/lib/i18n";

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** Récupère une traduction via une clé pointée, ex: "home.title". */
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

/** Résout une clé pointée dans un objet de traduction. */
function lookup(dict: Record<string, unknown>, key: string): string {
  const value = key
    .split(".")
    .reduce<unknown>((acc, part) => {
      if (acc && typeof acc === "object" && part in (acc as object)) {
        return (acc as Record<string, unknown>)[part];
      }
      return undefined;
    }, dict);
  return typeof value === "string" ? value : key;
}

export function I18nProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(
    resolveLocale(initialLocale) ?? DEFAULT_LOCALE
  );

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    // Persiste le choix pour les rendus serveur ultérieurs (1 an).
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; SameSite=Lax`;
  }, []);

  const t = useCallback(
    (key: string) => lookup(getDictionary(locale) as Record<string, unknown>, key),
    [locale]
  );

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n doit être utilisé à l'intérieur de I18nProvider");
  }
  return ctx;
}
