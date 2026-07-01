"use client";

import { Bell, MapPin, Settings2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useSeismicEvents } from "@/hooks/use-seismic-events";
import { formatRelativeTime } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const ALERT_RULES = [
  { id: "1", label: "Martinique — rayon 100 km", minMagnitude: 3.5, enabled: true },
  { id: "2", label: "Guadeloupe — rayon 100 km", minMagnitude: 3.5, enabled: true },
  { id: "3", label: "Toutes les Caraïbes — magnitude majeure", minMagnitude: 6, enabled: false },
];

export default function NotificationsPage() {
  const { data, isLoading } = useSeismicEvents({ region: "caraibes", minMagnitude: 3.5 });

  return (
    <div className="container flex flex-col gap-6 py-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <p className="mt-1 text-muted-foreground">
          Centre d&apos;alertes et configuration de vos règles de notification.
        </p>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="flex items-center gap-2">
            <Settings2 className="h-4 w-4" /> Règles d&apos;alerte
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col divide-y divide-border">
          {ALERT_RULES.map((rule) => (
            <div key={rule.id} className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium">{rule.label}</p>
                <p className="text-xs text-muted-foreground">Magnitude minimale : {rule.minMagnitude}</p>
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor={`rule-${rule.id}`} className="text-xs text-muted-foreground">
                  {rule.enabled ? "Activée" : "Désactivée"}
                </Label>
                <Switch id={`rule-${rule.id}`} defaultChecked={rule.enabled} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-4 w-4" /> Historique des alertes envoyées
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col divide-y divide-border">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="my-2 h-12 rounded-md" />)
            : data?.events.map((event) => (
                <div key={event.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{event.placeDescription}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatRelativeTime(event.eventTimeUtc)}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary">M {event.magnitude.toFixed(1)}</Badge>
                </div>
              ))}
          {!isLoading && data?.events.length === 0 && (
            <p className="py-6 text-center text-sm text-muted-foreground">
              Aucune alerte envoyée pour le moment.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
