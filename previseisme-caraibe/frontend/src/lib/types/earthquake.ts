export type SeismicSourceCode = "USGS" | "EMSC" | "IPGP" | "FDSN";

export type ConfidenceLabel = "verified" | "likely" | "unconfirmed";

export interface EarthquakeEvent {
  id: string;
  externalId: string;
  magnitude: number;
  magnitudeType: "Mw" | "Ml" | "Mb";
  depthKm: number;
  place: string;
  city: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  timeUtc: string;
  source: SeismicSourceCode;
  confidence: ConfidenceLabel;
  confidenceScore: number;
  felt: number;
  tsunamiRisk: boolean;
  region: "caribbean" | "global";
}

export interface SourceHealth {
  code: SeismicSourceCode;
  name: string;
  description: string;
  status: "operational" | "degraded" | "down";
  latencySeconds: number;
  lastSyncUtc: string;
  region: string;
}
