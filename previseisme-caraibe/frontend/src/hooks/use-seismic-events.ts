"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchSeismicEvents, fetchSourceHealth } from "@/lib/api-client";
import type { EventFilters } from "@/types/seismic";

export function useSeismicEvents(filters: EventFilters = {}) {
  return useQuery({
    queryKey: ["seismic-events", filters],
    queryFn: () => fetchSeismicEvents(filters),
    refetchInterval: 30_000,
    staleTime: 15_000,
  });
}

export function useSourceHealth() {
  return useQuery({
    queryKey: ["source-health"],
    queryFn: () => fetchSourceHealth(),
    refetchInterval: 60_000,
  });
}
