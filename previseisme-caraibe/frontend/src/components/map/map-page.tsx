"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useTranslations, useLocale } from "next-intl";
import { MapPin } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MagnitudeBadge } from "@/components/magnitude-badge";
import { MapLegend } from "@/components/map/map-legend";
import { Skeleton } from "@/components/ui/skeleton";
import type { EarthquakeEvent } from "@/lib/types/earthquake";
import { formatDate } from "@/lib/utils";

const EarthquakeMap = dynamic(
  () => import("@/components/map/earthquake-map").then((m) => m.EarthquakeMap),
  {
    ssr: false,
    loading: () => <Skeleton className="h-full w-full" />,
  },
);

type Period = "24h" | "7d" | "30d" | "all";

function filterByPeriod(events: EarthquakeEvent[], period: Period, now: Date) {
  if (period === "all") return events;
  const hours = period === "24h" ? 24 : period === "7d" ? 24 * 7 : 24 * 30;
  const cutoff = now.getTime() - hours * 3600 * 1000;
  return events.filter((e) => new Date(e.timeUtc).getTime() >= cutoff);
}

export function MapPage({
  events,
  center,
  zoom,
  titleKey,
}: {
  events: EarthquakeEvent[];
  center: [number, number];
  zoom: number;
  titleKey: "world" | "caribbean";
}) {
  const t = useTranslations("map");
  const locale = useLocale();
  const [period, setPeriod] = React.useState<Period>("all");
  const [selected, setSelected] = React.useState<EarthquakeEvent | null>(null);
  const [flyCenter, setFlyCenter] = React.useState(center);
  const [flyZoom, setFlyZoom] = React.useState(zoom);

  const now = React.useMemo(() => new Date("2026-07-02T14:00:00Z"), []);
  const filtered = React.useMemo(
    () =>
      filterByPeriod(events, period, now).sort(
        (a, b) => new Date(b.timeUtc).getTime() - new Date(a.timeUtc).getTime(),
      ),
    [events, period, now],
  );

  function handleSelect(event: EarthquakeEvent) {
    setSelected(event);
    setFlyCenter([event.latitude, event.longitude]);
    setFlyZoom(Math.max(zoom, 7));
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t(`${titleKey}.title`)}</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl text-sm">
            {t(`${titleKey}.subtitle`)}
          </p>
        </div>
        <Tabs value={period} onValueChange={(v) => setPeriod(v as Period)}>
          <TabsList>
            <TabsTrigger value="24h">{t("last24h")}</TabsTrigger>
            <TabsTrigger value="7d">{t("last7d")}</TabsTrigger>
            <TabsTrigger value="30d">{t("last30d")}</TabsTrigger>
            <TabsTrigger value="all">{t("allPeriod")}</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_340px]">
        <div className="border-border relative h-[560px] overflow-hidden rounded-xl border">
          <EarthquakeMap
            events={filtered}
            center={flyCenter}
            zoom={flyZoom}
            locale={locale}
            onSelect={handleSelect}
            className="h-full w-full"
          />
          <div className="pointer-events-none absolute bottom-4 left-4">
            <MapLegend />
          </div>
        </div>

        <div className="flex max-h-[560px] flex-col gap-3 overflow-y-auto pr-1">
          <p className="text-muted-foreground text-xs font-medium">
            {filtered.length} {t("eventDetail") ? "" : ""}
          </p>
          {filtered.map((event) => (
            <Card
              key={event.id}
              onClick={() => handleSelect(event)}
              className={`hover:border-primary/50 cursor-pointer p-4 transition-colors ${
                selected?.id === event.id ? "border-primary" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <MagnitudeBadge magnitude={event.magnitude} />
                <span className="text-muted-foreground text-[11px]">
                  {formatDate(event.timeUtc, locale)}
                </span>
              </div>
              <p className="mt-2 flex items-start gap-1.5 text-sm leading-snug font-medium">
                <MapPin className="text-muted-foreground mt-0.5 size-3.5 shrink-0" />
                {event.place}
              </p>
              <p className="text-muted-foreground mt-1 text-xs">
                {event.country} · {event.depthKm} km · {event.source}
              </p>
            </Card>
          ))}
          {filtered.length === 0 && (
            <p className="text-muted-foreground py-8 text-center text-sm">
              Aucun événement pour cette période.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
