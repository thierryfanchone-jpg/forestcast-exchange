export type ConfidenceLabel = "faible" | "moyen" | "eleve" | "confirme_multi_source";

export type SourceCode = "usgs" | "emsc" | "ipgp_ovsm";

export interface ContributingSource {
  sourceCode: SourceCode;
  sourceName: string;
  externalId: string;
  isPrimarySource: boolean;
}

export interface SeismicEvent {
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
  eventTimeUtc: string;
  firstDetectedAtUtc: string;
  publishedAtUtc: string;
  confidenceScore: number;
  confidenceLabel: ConfidenceLabel;
  tsunamiFlag: boolean;
  feltReportCount: number;
  contributingSources: ContributingSource[];
  reviewStatus: "automatic" | "reviewed";
}

export interface SourceHealth {
  sourceCode: SourceCode;
  sourceName: string;
  status: "ok" | "degraded" | "down";
  latencyMs: number | null;
  lastEventReceivedAt: string | null;
}

export interface EventFilters {
  minMagnitude?: number;
  maxMagnitude?: number;
  maxDistanceKm?: number;
  minDepthKm?: number;
  maxDepthKm?: number;
  country?: string;
  city?: string;
  region?: "monde" | "caraibes";
  since?: string;
}
