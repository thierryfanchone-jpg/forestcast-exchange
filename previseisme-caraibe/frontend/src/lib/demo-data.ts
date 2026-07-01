import type { ConfidenceLabel, ContributingSource, SeismicEvent, SourceHealth } from "@/types/seismic";

/**
 * Données de démonstration réalistes, utilisées lorsque le backend / les
 * connecteurs USGS, EMSC et IPGP ne sont pas encore branchés sur un
 * environnement donné. Les localisations, magnitudes et profondeurs sont
 * cohérentes avec la sismicité réelle des zones citées, mais ces événements
 * précis sont fictifs — ils ne doivent jamais être confondus avec des
 * données officielles.
 */

const SOURCE_USGS: ContributingSource = {
  sourceCode: "usgs",
  sourceName: "USGS",
  externalId: "us7000demo",
  isPrimarySource: false,
};
const SOURCE_EMSC: ContributingSource = {
  sourceCode: "emsc",
  sourceName: "EMSC",
  externalId: "emsc-demo",
  isPrimarySource: false,
};
const SOURCE_IPGP: ContributingSource = {
  sourceCode: "ipgp_ovsm",
  sourceName: "IPGP / OVSM",
  externalId: "ovsm-demo",
  isPrimarySource: true,
};

const SOURCES = { usgs: SOURCE_USGS, emsc: SOURCE_EMSC, ipgp: SOURCE_IPGP };

function minutesAgo(minutes: number): string {
  return new Date(Date.now() - minutes * 60_000).toISOString();
}

function confidenceFor(sources: ContributingSource[]): { score: number; label: ConfidenceLabel } {
  if (sources.length >= 2) return { score: 0.91, label: "confirme_multi_source" };
  if (sources.length === 1) return { score: 0.68, label: "moyen" };
  return { score: 0.35, label: "faible" };
}

interface RawDemoEvent {
  id: string;
  magnitude: number;
  magnitudeType: string;
  latitude: number;
  longitude: number;
  depthKm: number;
  placeDescription: string;
  countryIso3: string;
  countryName: string;
  region: "monde" | "caraibes";
  minutesAgo: number;
  tsunamiFlag?: boolean;
  feltReportCount?: number;
  sources: ContributingSource[];
  reviewStatus?: "automatic" | "reviewed";
}

const RAW_EVENTS: RawDemoEvent[] = [
  // Caraïbes — Antilles françaises (source prioritaire IPGP/OVSM)
  {
    id: "demo-mtq-1",
    magnitude: 4.8,
    magnitudeType: "Mw",
    latitude: 14.62,
    longitude: -60.85,
    depthKm: 32,
    placeDescription: "14 km à l'est du Vauclin, Martinique",
    countryIso3: "MTQ",
    countryName: "Martinique",
    region: "caraibes",
    minutesAgo: 18,
    feltReportCount: 142,
    sources: [SOURCES.ipgp, SOURCES.usgs],
  },
  {
    id: "demo-glp-1",
    magnitude: 3.6,
    magnitudeType: "ML",
    latitude: 16.24,
    longitude: -61.53,
    depthKm: 12,
    placeDescription: "8 km au nord de Pointe-à-Pitre, Guadeloupe",
    countryIso3: "GLP",
    countryName: "Guadeloupe",
    region: "caraibes",
    minutesAgo: 56,
    feltReportCount: 37,
    sources: [SOURCES.ipgp],
  },
  {
    id: "demo-mtq-2",
    magnitude: 2.9,
    magnitudeType: "ML",
    latitude: 14.78,
    longitude: -61.17,
    depthKm: 6,
    placeDescription: "Essaim sismique — Morne Rouge, Martinique",
    countryIso3: "MTQ",
    countryName: "Martinique",
    region: "caraibes",
    minutesAgo: 130,
    feltReportCount: 4,
    sources: [SOURCES.ipgp],
    reviewStatus: "reviewed",
  },
  // Caraïbes — Haïti / République dominicaine
  {
    id: "demo-hti-1",
    magnitude: 5.4,
    magnitudeType: "Mw",
    latitude: 18.45,
    longitude: -73.02,
    depthKm: 14,
    placeDescription: "22 km au sud-ouest de Léogâne, Haïti",
    countryIso3: "HTI",
    countryName: "Haïti",
    region: "caraibes",
    minutesAgo: 245,
    feltReportCount: 512,
    tsunamiFlag: false,
    sources: [SOURCES.usgs, SOURCES.emsc],
  },
  {
    id: "demo-dom-1",
    magnitude: 4.1,
    magnitudeType: "Mw",
    latitude: 19.1,
    longitude: -69.4,
    depthKm: 65,
    placeDescription: "36 km au nord de Samaná, République dominicaine",
    countryIso3: "DOM",
    countryName: "République dominicaine",
    region: "caraibes",
    minutesAgo: 410,
    feltReportCount: 21,
    sources: [SOURCES.usgs],
  },
  // Caraïbes — Porto Rico
  {
    id: "demo-pri-1",
    magnitude: 4.6,
    magnitudeType: "Mw",
    latitude: 17.97,
    longitude: -66.86,
    depthKm: 10,
    placeDescription: "8 km au sud de Ponce, Porto Rico",
    countryIso3: "PRI",
    countryName: "Porto Rico",
    region: "caraibes",
    minutesAgo: 75,
    feltReportCount: 89,
    sources: [SOURCES.usgs, SOURCES.emsc],
  },
  // Caraïbes — Petites Antilles anglophones
  {
    id: "demo-vct-1",
    magnitude: 3.8,
    magnitudeType: "ML",
    latitude: 13.25,
    longitude: -61.2,
    depthKm: 45,
    placeDescription: "18 km à l'ouest de Kingstown, Saint-Vincent-et-les-Grenadines",
    countryIso3: "VCT",
    countryName: "Saint-Vincent-et-les-Grenadines",
    region: "caraibes",
    minutesAgo: 320,
    feltReportCount: 6,
    sources: [SOURCES.usgs],
  },
  {
    id: "demo-dma-1",
    magnitude: 4.3,
    magnitudeType: "Mw",
    latitude: 15.42,
    longitude: -61.35,
    depthKm: 90,
    placeDescription: "27 km au nord-est de Roseau, Dominique",
    countryIso3: "DMA",
    countryName: "Dominique",
    region: "caraibes",
    minutesAgo: 500,
    feltReportCount: 14,
    sources: [SOURCES.usgs, SOURCES.emsc],
  },
  {
    id: "demo-tto-1",
    magnitude: 3.2,
    magnitudeType: "ML",
    latitude: 10.65,
    longitude: -61.5,
    depthKm: 55,
    placeDescription: "15 km au nord-est de Port-d'Espagne, Trinité-et-Tobago",
    countryIso3: "TTO",
    countryName: "Trinité-et-Tobago",
    region: "caraibes",
    minutesAgo: 610,
    feltReportCount: 3,
    sources: [SOURCES.usgs],
  },
  {
    id: "demo-jam-1",
    magnitude: 4.0,
    magnitudeType: "Mw",
    latitude: 18.05,
    longitude: -76.9,
    depthKm: 38,
    placeDescription: "40 km au sud de Kingston, Jamaïque",
    countryIso3: "JAM",
    countryName: "Jamaïque",
    region: "caraibes",
    minutesAgo: 720,
    feltReportCount: 28,
    sources: [SOURCES.usgs, SOURCES.emsc],
  },
  // Monde — événements significatifs pour la carte mondiale
  {
    id: "demo-jpn-1",
    magnitude: 6.1,
    magnitudeType: "Mw",
    latitude: 38.3,
    longitude: 142.4,
    depthKm: 28,
    placeDescription: "112 km à l'est de Sendai, Japon",
    countryIso3: "JPN",
    countryName: "Japon",
    region: "monde",
    minutesAgo: 95,
    feltReportCount: 980,
    tsunamiFlag: true,
    sources: [SOURCES.usgs, SOURCES.emsc],
  },
  {
    id: "demo-chl-1",
    magnitude: 5.8,
    magnitudeType: "Mw",
    latitude: -23.6,
    longitude: -70.4,
    depthKm: 45,
    placeDescription: "20 km au nord-ouest d'Antofagasta, Chili",
    countryIso3: "CHL",
    countryName: "Chili",
    region: "monde",
    minutesAgo: 180,
    feltReportCount: 340,
    sources: [SOURCES.usgs],
  },
  {
    id: "demo-idn-1",
    magnitude: 6.4,
    magnitudeType: "Mw",
    latitude: -3.5,
    longitude: 128.2,
    depthKm: 110,
    placeDescription: "88 km au sud-est d'Ambon, Indonésie",
    countryIso3: "IDN",
    countryName: "Indonésie",
    region: "monde",
    minutesAgo: 40,
    feltReportCount: 610,
    tsunamiFlag: false,
    sources: [SOURCES.usgs, SOURCES.emsc],
  },
  {
    id: "demo-tur-1",
    magnitude: 5.2,
    magnitudeType: "Mw",
    latitude: 38.2,
    longitude: 37.5,
    depthKm: 12,
    placeDescription: "15 km au sud-est de Malatya, Turquie",
    countryIso3: "TUR",
    countryName: "Turquie",
    region: "monde",
    minutesAgo: 300,
    feltReportCount: 720,
    sources: [SOURCES.usgs, SOURCES.emsc],
  },
  {
    id: "demo-usa-1",
    magnitude: 4.4,
    magnitudeType: "Mw",
    latitude: 34.1,
    longitude: -118.3,
    depthKm: 9,
    placeDescription: "6 km au nord-est de Los Angeles, Californie, États-Unis",
    countryIso3: "USA",
    countryName: "États-Unis",
    region: "monde",
    minutesAgo: 15,
    feltReportCount: 1250,
    sources: [SOURCES.usgs],
  },
  {
    id: "demo-mex-1",
    magnitude: 5.6,
    magnitudeType: "Mw",
    latitude: 16.8,
    longitude: -99.8,
    depthKm: 22,
    placeDescription: "35 km au sud-ouest d'Acapulco, Mexique",
    countryIso3: "MEX",
    countryName: "Mexique",
    region: "monde",
    minutesAgo: 260,
    feltReportCount: 455,
    sources: [SOURCES.usgs, SOURCES.emsc],
  },
  {
    id: "demo-grc-1",
    magnitude: 4.7,
    magnitudeType: "Mw",
    latitude: 37.9,
    longitude: 23.1,
    depthKm: 18,
    placeDescription: "10 km au sud d'Athènes, Grèce",
    countryIso3: "GRC",
    countryName: "Grèce",
    region: "monde",
    minutesAgo: 55,
    feltReportCount: 190,
    sources: [SOURCES.emsc],
  },
  {
    id: "demo-idn-2",
    magnitude: 3.9,
    magnitudeType: "ML",
    latitude: -6.9,
    longitude: 107.6,
    depthKm: 15,
    placeDescription: "12 km au sud de Bandung, Indonésie",
    countryIso3: "IDN",
    countryName: "Indonésie",
    region: "monde",
    minutesAgo: 400,
    feltReportCount: 65,
    sources: [SOURCES.usgs],
  },
];

export const DEMO_EVENTS: SeismicEvent[] = RAW_EVENTS.map((raw) => {
  const eventTime = minutesAgo(raw.minutesAgo);
  const confidence = confidenceFor(raw.sources);
  return {
    id: raw.id,
    magnitude: raw.magnitude,
    magnitudeType: raw.magnitudeType,
    latitude: raw.latitude,
    longitude: raw.longitude,
    depthKm: raw.depthKm,
    placeDescription: raw.placeDescription,
    countryIso3: raw.countryIso3,
    countryName: raw.countryName,
    region: raw.region,
    eventTimeUtc: eventTime,
    firstDetectedAtUtc: minutesAgo(raw.minutesAgo + 1 / 30),
    publishedAtUtc: minutesAgo(raw.minutesAgo + 1 / 60),
    confidenceScore: confidence.score,
    confidenceLabel: confidence.label,
    tsunamiFlag: raw.tsunamiFlag ?? false,
    feltReportCount: raw.feltReportCount ?? 0,
    contributingSources: raw.sources,
    reviewStatus: raw.reviewStatus ?? "automatic",
  };
}).sort((a, b) => new Date(b.eventTimeUtc).getTime() - new Date(a.eventTimeUtc).getTime());

export const DEMO_SOURCE_HEALTH: SourceHealth[] = [
  {
    sourceCode: "usgs",
    sourceName: "USGS (FDSN / GeoJSON)",
    status: "ok",
    latencyMs: 820,
    lastEventReceivedAt: minutesAgo(2),
  },
  {
    sourceCode: "emsc",
    sourceName: "EMSC (temps réel)",
    status: "ok",
    latencyMs: 340,
    lastEventReceivedAt: minutesAgo(1),
  },
  {
    sourceCode: "ipgp_ovsm",
    sourceName: "IPGP / OVSM",
    status: "degraded",
    latencyMs: 4100,
    lastEventReceivedAt: minutesAgo(18),
  },
];

export const DEMO_COUNTRIES = Array.from(
  new Map(DEMO_EVENTS.map((e) => [e.countryIso3, e.countryName])).entries(),
).map(([iso3, name]) => ({ iso3, name }));
