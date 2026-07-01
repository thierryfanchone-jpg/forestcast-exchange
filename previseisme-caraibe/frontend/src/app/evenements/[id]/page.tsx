"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { AlertTriangle, Clock, Gauge, MapPin, Radio, Users } from "lucide-react";
import { useSeismicEvents } from "@/hooks/use-seismic-events";
import { MagnitudeBadge } from "@/components/events/magnitude-badge";
import { ConfidenceBadge } from "@/components/events/confidence-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SeismicMap } from "@/components/map/seismic-map";
import { formatDateTime } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function EventDetailPage() {
  const params = useParams<{ id: string }>();
  const { data, isLoading } = useSeismicEvents();
  const event = data?.events.find((e) => e.id === params.id);

  if (isLoading) {
    return (
      <div className="container flex flex-col gap-4 py-10">
        <Skeleton className="h-8 w-72" />
        <Skeleton className="h-96 rounded-xl" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container flex flex-col items-center gap-4 py-20 text-center">
        <AlertTriangle className="h-10 w-10 text-muted-foreground" />
        <h1 className="text-2xl font-bold">Événement introuvable</h1>
        <p className="text-muted-foreground">
          Cet événement n&apos;existe plus dans la fenêtre de données actuelle.
        </p>
      </div>
    );
  }

  const latencySeconds = Math.max(
    0,
    Math.round(
      (new Date(event.publishedAtUtc).getTime() - new Date(event.firstDetectedAtUtc).getTime()) / 1000,
    ),
  );

  return (
    <div className="container flex flex-col gap-6 py-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <div className="flex items-center gap-3">
            <MagnitudeBadge magnitude={event.magnitude} />
            <ConfidenceBadge label={event.confidenceLabel} />
          </div>
          <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{event.placeDescription}</h1>
        </div>
        <Button variant="outline" asChild>
          <a href="#signaler-ressenti">J&apos;ai ressenti ce séisme</a>
        </Button>
      </div>

      <SeismicMap
        events={[event]}
        initialView={{ longitude: event.longitude, latitude: event.latitude, zoom: 7 }}
        className="h-[380px] w-full overflow-hidden rounded-xl border border-border"
      />

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Détails de l&apos;événement</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <InfoRow icon={MapPin} label="Localisation" value={`${event.countryName}`} />
            <InfoRow icon={Gauge} label="Profondeur" value={`${event.depthKm.toFixed(0)} km`} />
            <InfoRow
              icon={Clock}
              label="Heure d'origine (UTC)"
              value={formatDateTime(event.eventTimeUtc)}
            />
            <InfoRow icon={Clock} label="Latence de diffusion" value={`${latencySeconds} s`} />
            <InfoRow icon={Users} label="Signalements ressentis" value={String(event.feltReportCount)} />
            <InfoRow
              icon={Radio}
              label="Sources contributrices"
              value={event.contributingSources.map((s) => s.sourceName).join(", ")}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Résumé assisté par IA</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 text-sm text-muted-foreground">
            <p>
              Séisme de magnitude {event.magnitude.toFixed(1)} détecté près de {event.placeDescription}.
              {event.tsunamiFlag
                ? " Une alerte tsunami a été émise par au moins une source officielle."
                : " Aucune alerte tsunami n'a été émise par les sources officielles."}
            </p>
            <p className="rounded-md bg-muted p-3 text-xs">
              Généré automatiquement à partir des données {event.contributingSources.map((s) => s.sourceName).join(" et ")}.
              Ceci n&apos;est pas un avis d&apos;expert humain — consultez les autorités compétentes pour toute
              décision de sécurité.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card id="signaler-ressenti">
        <CardHeader>
          <CardTitle>J&apos;ai ressenti ce séisme</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Le formulaire de signalement citoyen (position, intensité perçue, commentaire) sera connecté à
          l&apos;API <code>/felt-reports</code> une fois le backend relié à cet environnement.
        </CardContent>
      </Card>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 text-muted-foreground" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
