"use client";

import * as React from "react";
import { useSeismicEvents } from "@/hooks/use-seismic-events";
import { SeismicMap } from "@/components/map/seismic-map";
import { MapLegend } from "@/components/map/map-legend";
import { EventFiltersBar } from "@/components/events/event-filters";
import { DEMO_COUNTRIES } from "@/lib/demo-data";
import { WORLD_VIEW } from "@/lib/map-config";
import type { EventFilters } from "@/types/seismic";

export default function WorldMapPage() {
  const [filters, setFilters] = React.useState<EventFilters>({});
  const { data, isLoading } = useSeismicEvents(filters);

  return (
    <div className="container flex flex-col gap-6 py-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Carte mondiale des séismes</h1>
        <p className="mt-2 text-muted-foreground">
          Événements agrégés depuis les sources officielles (USGS, EMSC). Cliquez sur un marqueur pour
          le détail.
        </p>
      </div>

      <EventFiltersBar filters={filters} onChange={setFilters} countries={DEMO_COUNTRIES} />
      <MapLegend />

      <SeismicMap events={isLoading ? [] : data?.events ?? []} initialView={WORLD_VIEW} />

      <p className="text-xs text-muted-foreground">
        {data?.events.length ?? 0} événement(s) affiché(s)
        {data?.isDemo ? " — données de démonstration" : ""}.
      </p>
    </div>
  );
}
