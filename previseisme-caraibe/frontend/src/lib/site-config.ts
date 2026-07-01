export const siteConfig = {
  name: "PréviSéisme Caraïbe",
  tagline: "L'information sismique officielle des Caraïbes, en temps réel.",
  description:
    "Plateforme professionnelle d'information sismique pour les Caraïbes : données agrégées depuis USGS, EMSC et IPGP/OVSM, jamais inventées.",
  locale: "fr" as const,
  supportedLocales: ["fr", "en", "es"] as const,
};

export interface NavLink {
  href: string;
  label: string;
}

export const mainNav: NavLink[] = [
  { href: "/carte-mondiale", label: "Carte mondiale" },
  { href: "/caraibes", label: "Caraïbes" },
  { href: "/historique", label: "Historique" },
  { href: "/entreprises", label: "Entreprises" },
  { href: "/collectivites", label: "Collectivités" },
  { href: "/api-publique", label: "API" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Produit",
    links: [
      { href: "/carte-mondiale", label: "Carte mondiale" },
      { href: "/caraibes", label: "Carte Caraïbes" },
      { href: "/historique", label: "Historique des séismes" },
      { href: "/statistiques", label: "Statistiques" },
      { href: "/dashboard", label: "Tableau de bord" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { href: "/entreprises", label: "Pour les entreprises" },
      { href: "/collectivites", label: "Pour les collectivités" },
      { href: "/api-publique", label: "API publique" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { href: "/aide", label: "Centre d'aide" },
      { href: "/faq", label: "FAQ" },
      { href: "/a-propos", label: "À propos" },
      { href: "/contact", label: "Contact" },
    ],
  },
];
