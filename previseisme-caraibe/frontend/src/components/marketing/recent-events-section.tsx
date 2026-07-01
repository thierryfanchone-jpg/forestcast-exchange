"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useSeismicEvents } from "@/hooks/use-seismic-events";
import { EventCard } from "@/components/events/event-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function RecentEventsSection() {
  const { data, isLoading } = useSeismicEvents({ region: "caraibes" });

  return (
    <section className="container py-20">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Séismes récents — Caraïbes</h2>
          <p className="mt-2 text-muted-foreground">
            Derniers événements confirmés par au moins une source officielle.
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/caraibes">
            Voir la carte complète <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-40 rounded-xl" />)
          : data?.events.slice(0, 6).map((event) => <EventCard key={event.id} event={event} />)}
      </div>
    </section>
  );
}
