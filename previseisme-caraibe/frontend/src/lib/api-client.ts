import type { EventFilters, SeismicEvent, SourceHealth } from "@/types/seismic";
import { DEMO_EVENTS, DEMO_SOURCE_HEALTH } from "@/lib/demo-data";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

/**
 * Client API minimal. Si NEXT_PUBLIC_API_URL n'est pas configuré, ou si le
 * backend est injoignable, l'application retombe sur des données de
 * démonstration réalistes plutôt que d'afficher une erreur bloquante — le
 * mode démo est explicitement signalé à l'utilisateur (voir DemoModeBanner).
 */
export const isBackendConfigured = API_BASE_URL.length > 0;

async function safeFetchJSON<T>(path: string, fallback: T): Promise<{ data: T; isDemo: boolean }> {
  if (!isBackendConfigured) {
    return { data: fallback, isDemo: true };
  }
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`API ${path} -> ${res.status}`);
    const data = (await res.json()) as T;
    return { data, isDemo: false };
  } catch {
    return { data: fallback, isDemo: true };
  }
}

function applyFilters(events: SeismicEvent[], filters: EventFilters = {}): SeismicEvent[] {
  return events.filter((event) => {
    if (filters.region && event.region !== filters.region) return false;
    if (filters.minMagnitude !== undefined && event.magnitude < filters.minMagnitude) return false;
    if (filters.maxMagnitude !== undefined && event.magnitude > filters.maxMagnitude) return false;
    if (filters.minDepthKm !== undefined && event.depthKm < filters.minDepthKm) return false;
    if (filters.maxDepthKm !== undefined && event.depthKm > filters.maxDepthKm) return false;
    if (filters.country && event.countryIso3 !== filters.country) return false;
    if (filters.city) {
      const needle = filters.city.trim().toLowerCase();
      if (!event.placeDescription.toLowerCase().includes(needle)) return false;
    }
    if (filters.since && new Date(event.eventTimeUtc) < new Date(filters.since)) return false;
    return true;
  });
}

export async function fetchSeismicEvents(
  filters: EventFilters = {},
): Promise<{ events: SeismicEvent[]; isDemo: boolean }> {
  const query = new URLSearchParams();
  if (filters.region) query.set("region", filters.region);
  if (filters.minMagnitude !== undefined) query.set("min_magnitude", String(filters.minMagnitude));
  if (filters.country) query.set("country", filters.country);
  if (filters.city) query.set("city", filters.city);

  const { data, isDemo } = await safeFetchJSON<SeismicEvent[]>(
    `/api/v1/events?${query.toString()}`,
    DEMO_EVENTS,
  );

  return { events: isDemo ? applyFilters(data, filters) : data, isDemo };
}

export async function fetchSourceHealth(): Promise<{ sources: SourceHealth[]; isDemo: boolean }> {
  const { data, isDemo } = await safeFetchJSON<SourceHealth[]>(
    "/api/v1/sources/health",
    DEMO_SOURCE_HEALTH,
  );
  return { sources: data, isDemo };
}
