import type { AppNotification } from "@/lib/types/user";

export const demoNotifications: AppNotification[] = [
  {
    id: "n1",
    title: "Séisme M5.8 détecté près de Port-au-Prince",
    message:
      "Un événement de magnitude 5.8 a été détecté à 18 km au sud-ouest de Port-au-Prince, Haïti. Confiance : vérifié.",
    severity: "critical",
    timeUtc: new Date("2026-07-02T12:00:00Z").toISOString(),
    read: false,
    eventId: "pc-usgs-0-us7000pcar",
  },
  {
    id: "n2",
    title: "Nouvelle règle d'alerte activée",
    message:
      "Votre règle d'alerte « Siège social — Kingston » a été activée avec un seuil de magnitude 4.0.",
    severity: "info",
    timeUtc: new Date("2026-07-01T09:15:00Z").toISOString(),
    read: false,
  },
  {
    id: "n3",
    title: "Source FDSN en mode dégradé",
    message:
      "Le flux FDSN présente une latence supérieure à la normale (210s). Les autres sources restent opérationnelles.",
    severity: "warning",
    timeUtc: new Date("2026-06-30T18:40:00Z").toISOString(),
    read: true,
  },
  {
    id: "n4",
    title: "Rapport hebdomadaire disponible",
    message:
      "Votre rapport d'activité sismique pour la semaine du 22 au 28 juin est prêt à être téléchargé.",
    severity: "info",
    timeUtc: new Date("2026-06-29T08:00:00Z").toISOString(),
    read: true,
  },
  {
    id: "n5",
    title: "Séisme M6.2 — Les Cayes, Haïti",
    message:
      "Événement significatif détecté avec risque de tsunami local évalué à faible. Suivez la situation sur la carte des Caraïbes.",
    severity: "critical",
    timeUtc: new Date("2026-06-14T22:10:00Z").toISOString(),
    read: true,
    eventId: "pc-usgs-15-us7000pbn9",
  },
];
