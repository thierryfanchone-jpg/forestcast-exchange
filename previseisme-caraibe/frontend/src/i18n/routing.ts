import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en", "es"],
  defaultLocale: "fr",
  localePrefix: "as-needed",
  // Le français est la langue par défaut de la plateforme : on ignore la
  // négociation Accept-Language du navigateur pour toujours servir le
  // français sur "/", l'utilisateur choisit explicitement une autre langue
  // via le sélecteur (qui applique ensuite un préfixe /en ou /es).
  localeDetection: false,
});

export type AppLocale = (typeof routing.locales)[number];
