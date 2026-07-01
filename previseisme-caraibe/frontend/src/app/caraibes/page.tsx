"use client";

import * as React from "react";
import { useSeismicEvents } from "@/hooks/use-seismic-events";
import { useSourceHealth } from "@/hooks/use-seismic-events";
import { SeismicMap } from "@/components/map/seismic-map";
import { MapLegend } from "@/components/map/map-legend";
import { EventFiltersBar } from "@/components/events/event-filters";
import { Badge } from "@/components/ui/badge";
import { DEMO_COUNTRIES } from "@/lib/demo-data";
import { CARIBBEAN_VIEW } from "@/lib/map-config";
import type { EventFilters } from "@/types/seismic";

const CARIBBEAN_COUNTRIES = DEMO_COUNTRIES; // filtré côté serveur en prod

export default function CaribbeanMapPage() {
  const [filters, setFilters] = React.useState<EventFilters>({ region: "caraibes" });
  const { data, isLoading } = useSeismicEvents(filters);
  const { data: health } = useSourceHealth();

  return (
    <div className="container flex flex-col gap-6 py-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Carte Caraïbes</h1>
          <p className="mt-2 text-muted-foreground">
            Vue régionale prioritaire, incluant les données fines IPGP/OVSM pour les Antilles françaises.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {health?.sources.map((s) => (
            <Badge
              key={s.sourceCode}
              variant={s.status === "ok" ? "success" : s.status === "degraded" ? "warning" : "danger"}
            >
              {s.sourceName} · {s.status === "ok" ? "actif" : s.status === "degraded" ? "dégradé" : "hors ligne"}
            </Badge>
          ))}
        </div>
      </div>

      <EventFiltersBar filters={filters} onChange={setFilters} countries={CARIBBEAN_COUNTRIES} />
      <MapLegend />

      <SeismicMap events={isLoading ? [] : data?.events ?? []} initialView={CARIBBEAN_VIEW} />

      <p className="text-xs text-muted-foreground">
        {data?.events.length ?? 0} événement(s) affiché(s)
        {data?.isDemo ? " — données de démonstration" : ""}.
      </p>
    </div>
  );
}
