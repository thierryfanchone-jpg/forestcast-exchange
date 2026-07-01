import Link from "next/link";
import { Gauge, MapPin, Radio, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { MagnitudeBadge } from "@/components/events/magnitude-badge";
import { ConfidenceBadge } from "@/components/events/confidence-badge";
import { formatRelativeTime } from "@/lib/utils";
import type { SeismicEvent } from "@/types/seismic";

export function EventCard({ event }: { event: SeismicEvent }) {
  return (
    <Link href={`/evenements/${event.id}`}>
      <Card className="transition-shadow hover:shadow-md">
        <CardContent className="flex flex-col gap-3 p-4">
          <div className="flex items-start justify-between gap-3">
            <MagnitudeBadge magnitude={event.magnitude} />
            <span className="text-xs text-muted-foreground">{formatRelativeTime(event.eventTimeUtc)}</span>
          </div>
          <p className="text-sm font-medium leading-snug">{event.placeDescription}</p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> {event.countryName}
            </span>
            <span className="inline-flex items-center gap-1">
              <Gauge className="h-3.5 w-3.5" /> {event.depthKm.toFixed(0)} km
            </span>
            <span className="inline-flex items-center gap-1">
              <Users className="h-3.5 w-3.5" /> {event.feltReportCount} ressentis
            </span>
          </div>
          <div className="flex items-center justify-between">
            <ConfidenceBadge label={event.confidenceLabel} />
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Radio className="h-3.5 w-3.5" />
              {event.contributingSources.map((s) => s.sourceName).join(" · ")}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
