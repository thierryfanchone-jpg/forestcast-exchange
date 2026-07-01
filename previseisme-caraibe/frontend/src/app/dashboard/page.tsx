"use client";

import Link from "next/link";
import { AlertTriangle, ArrowRight, Bell, MapPin, TrendingUp } from "lucide-react";
import { useAuth } from "@/lib/auth-store";
import { useSeismicEvents, useSourceHealth } from "@/hooks/use-seismic-events";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/events/event-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { user, isDemoAuth } = useAuth();
  const { data, isLoading } = useSeismicEvents({ region: "caraibes" });
  const { data: health } = useSourceHealth();

  const highMagnitudeCount = data?.events.filter((e) => e.magnitude >= 4.5).length ?? 0;

  return (
    <div className="container flex flex-col gap-6 py-10">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Bonjour{user ? `, ${user.displayName}` : ""}
          </h1>
          <p className="mt-1 text-muted-foreground">
            Vue d&apos;ensemble de la sismicité Caraïbes et de vos alertes.
          </p>
        </div>
        {isDemoAuth && !user && (
          <Button asChild>
            <Link href="/connexion">Se connecter pour personnaliser</Link>
          </Button>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <MapPin className="h-5 w-5" />
            </span>
            <div>
              <p className="text-2xl font-bold">{data?.events.length ?? "—"}</p>
              <p className="text-sm text-muted-foreground">Événements suivis (Caraïbes)</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <AlertTriangle className="h-5 w-5" />
            </span>
            <div>
              <p className="text-2xl font-bold">{highMagnitudeCount}</p>
              <p className="text-sm text-muted-foreground">Événements ≥ M4.5</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
              <Bell className="h-5 w-5" />
            </span>
            <div>
              <p className="text-2xl font-bold">3</p>
              <p className="text-sm text-muted-foreground">Règles d&apos;alerte actives (démo)</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>État des sources de données</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          {health?.sources.map((s) => (
            <Badge key={s.sourceCode} variant={s.status === "ok" ? "success" : s.status === "degraded" ? "warning" : "danger"}>
              {s.sourceName} — {s.status === "ok" ? "opérationnel" : s.status === "degraded" ? "dégradé" : "hors ligne"}
            </Badge>
          ))}
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Derniers événements</h2>
        <Button variant="outline" size="sm" asChild>
          <Link href="/historique">
            Historique complet <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-40 rounded-xl" />)
          : data?.events.slice(0, 3).map((event) => <EventCard key={event.id} event={event} />)}
      </div>

      <Card className="border-dashed">
        <CardContent className="flex flex-col items-start gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Besoin d&apos;un suivi multi-sites ?</p>
              <p className="text-sm text-muted-foreground">
                Les tableaux de bord Entreprise et Collectivité (gestion de sites, exports, rôles) sont
                décrits dans nos pages dédiées.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/entreprises">Entreprises</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/collectivites">Collectivités</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
