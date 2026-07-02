import { allEarthquakes, caribbeanEarthquakes, sourcesHealth } from "@/lib/demo-data/earthquakes";
import type { EarthquakeEvent, SourceHealth } from "@/lib/types/earthquake";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/v1";

interface FetchEventsParams {
  region?: "caribbean" | "global";
  country?: string;
  city?: string;
  minMagnitude?: number;
  maxMagnitude?: number;
}

async function safeFetch<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`API ${path} → ${res.status}`);
    return (await res.json()) as T;
  } catch {
    // Backend FastAPI non disponible ou flux en cours de déploiement :
    // on retombe sur les données de démonstration pour garantir une UI fonctionnelle.
    return fallback;
  }
}

export async function fetchEarthquakeEvents(
  params: FetchEventsParams = {},
): Promise<EarthquakeEvent[]> {
  const source = params.region === "caribbean" ? caribbeanEarthquakes : allEarthquakes;
  const query = new URLSearchParams();
  if (params.region) query.set("region", params.region);
  if (params.country) query.set("country", params.country);
  if (params.city) query.set("city", params.city);
  if (params.minMagnitude != null) query.set("min_magnitude", String(params.minMagnitude));
  if (params.maxMagnitude != null) query.set("max_magnitude", String(params.maxMagnitude));

  const events = await safeFetch<EarthquakeEvent[]>(`/events?${query.toString()}`, source);

  return events.filter((e) => {
    if (params.country && e.country !== params.country) return false;
    if (params.city && !e.city.toLowerCase().includes(params.city.toLowerCase())) return false;
    if (params.minMagnitude != null && e.magnitude < params.minMagnitude) return false;
    if (params.maxMagnitude != null && e.magnitude > params.maxMagnitude) return false;
    return true;
  });
}

export async function fetchSourcesHealth(): Promise<SourceHealth[]> {
  return safeFetch<SourceHealth[]>("/sources/health", sourcesHealth);
}
