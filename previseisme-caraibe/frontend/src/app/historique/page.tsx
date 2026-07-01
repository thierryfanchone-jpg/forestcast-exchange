"use client";

import * as React from "react";
import { useSeismicEvents } from "@/hooks/use-seismic-events";
import { EventFiltersBar } from "@/components/events/event-filters";
import { EventCard } from "@/components/events/event-card";
import { Skeleton } from "@/components/ui/skeleton";
import { DEMO_COUNTRIES } from "@/lib/demo-data";
import type { EventFilters } from "@/types/seismic";

export default function HistoryPage() {
  const [filters, setFilters] = React.useState<EventFilters>({});
  const { data, isLoading } = useSeismicEvents(filters);

  return (
    <div className="container flex flex-col gap-6 py-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Historique des séismes</h1>
        <p className="mt-2 text-muted-foreground">
          Recherchez par pays, ville, magnitude ou profondeur dans l&apos;historique agrégé des sources
          officielles.
        </p>
      </div>

      <EventFiltersBar filters={filters} onChange={setFilters} countries={DEMO_COUNTRIES} />

      <p className="text-sm text-muted-foreground">
        {isLoading ? "Chargement…" : `${data?.events.length ?? 0} événement(s) trouvé(s)`}
        {data?.isDemo ? " — données de démonstration" : ""}
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 9 }).map((_, i) => <Skeleton key={i} className="h-40 rounded-xl" />)
          : data?.events.map((event) => <EventCard key={event.id} event={event} />)}
      </div>

      {!isLoading && data?.events.length === 0 && (
        <div className="rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
          Aucun événement ne correspond à ces filtres.
        </div>
      )}
    </div>
  );
}
