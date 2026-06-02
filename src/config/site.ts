export const siteConfig = {
  name: "ElectroSécurité Inc",
  owner: "Thierry Fanchone",
  siret: "80045926500040",
  address: "97213 Le Gros-Morne, Martinique",
  phone: "0696082573",
  phoneDisplay: "06 96 08 25 73",
  email: "electrosecuriteinc@gmail.com",
  whatsapp: "596696082573",
  serviceArea: "Martinique",
  host: "À compléter",

  tarifs: {
    diagnosticIA: {
      label: "Diagnostic IA",
      price: 4.9,
      priceDisplay: "4,90 € TTC",
      stripeProduct: "diagnostic-ia",
    },
    diagnosticHumain: {
      label: "Diagnostic humain à distance",
      price: 19.9,
      priceDisplay: "19,90 € TTC",
      stripeProduct: "diagnostic-humain",
    },
    visio: {
      label: "Visio dépannage",
      price: 49.9,
      priceDisplay: "49,90 € TTC",
      stripeProduct: "visio-depannage",
    },
    deplacement: {
      label: "Déplacement sur site",
      price: null,
      priceDisplay: "Sur devis",
    },
    installation: {
      label: "Installation électrique",
      price: null,
      priceDisplay: "Sur devis",
    },
    borne: {
      label: "Borne de recharge",
      price: null,
      priceDisplay: "Sur devis",
    },
    securiteIncendie: {
      label: "Sécurité incendie",
      price: null,
      priceDisplay: "Sur devis",
    },
  },

  services: [
    {
      id: "installation",
      title: "Installation électrique",
      description:
        "Tableaux électriques, circuits, prises et interrupteurs. Mise aux normes NF C 15-100 pour particuliers et professionnels.",
      icon: "Zap",
    },
    {
      id: "depannage",
      title: "Dépannage & diagnostic",
      description:
        "Intervention rapide en cas de panne. Diagnostic à distance par IA ou technicien humain avant tout déplacement.",
      icon: "Wrench",
    },
    {
      id: "eclairage",
      title: "Éclairage d'ambiance",
      description:
        "LED, spots encastrés, variateurs, éclairage architectural intérieur et extérieur. Économies d'énergie garanties.",
      icon: "Lightbulb",
    },
    {
      id: "borne",
      title: "Borne de recharge",
      description:
        "Installation de bornes IRVE (Infrastructure de Recharge pour Véhicules Électriques) à domicile et en entreprise.",
      icon: "Car",
    },
    {
      id: "incendie",
      title: "Sécurité incendie",
      description:
        "Détecteurs de fumée, systèmes d'alarme incendie, extinction automatique. Conformité ERP et habitation.",
      icon: "Flame",
    },
    {
      id: "intrusion",
      title: "Sécurité intrusion",
      description:
        "Alarmes anti-intrusion, caméras de surveillance, contrôle d'accès. Protection de votre habitation 24h/24.",
      icon: "Shield",
    },
    {
      id: "maintenance",
      title: "Maintenance électrique",
      description:
        "Contrats de maintenance préventive et curative pour entreprises. Vérification périodique des installations.",
      icon: "Settings",
    },
    {
      id: "mise-en-securite",
      title: "Mise en sécurité",
      description:
        "Diagnostic complet de votre installation, détection des anomalies et mise en conformité selon les normes en vigueur.",
      icon: "CheckCircle",
    },
  ],

  openingHours: [
    { day: "Lundi – Vendredi", hours: "08h00 – 18h00" },
    { day: "Samedi", hours: "08h00 – 13h00" },
    { day: "Dimanche & Jours fériés", hours: "Urgences uniquement" },
  ],
};

export type SiteConfig = typeof siteConfig;
