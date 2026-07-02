"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslations, useLocale } from "next-intl";
import { SearchIcon, MapPin } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MagnitudeBadge } from "@/components/magnitude-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchEarthquakeEvents } from "@/lib/api/client";
import { caribbeanCountries } from "@/lib/demo-data/earthquakes";
import { formatDate } from "@/lib/utils";
import type { EarthquakeEvent } from "@/lib/types/earthquake";

type SortKey = "recent" | "magnitude" | "depth";

const ALL_COUNTRIES = "__all__";

export function SearchView() {
  const t = useTranslations("search");
  const tCommon = useTranslations("common");
  const locale = useLocale();

  const [country, setCountry] = React.useState<string>(ALL_COUNTRIES);
  const [city, setCity] = React.useState("");
  const [minMagnitude, setMinMagnitude] = React.useState("");
  const [maxMagnitude, setMaxMagnitude] = React.useState("");
  const [sort, setSort] = React.useState<SortKey>("recent");

  const params = {
    region: "caribbean" as const,
    country: country === ALL_COUNTRIES ? undefined : country,
    city: city || undefined,
    minMagnitude: minMagnitude ? Number(minMagnitude) : undefined,
    maxMagnitude: maxMagnitude ? Number(maxMagnitude) : undefined,
  };

  const { data: events, isLoading } = useQuery({
    queryKey: ["earthquakes", params],
    queryFn: () => fetchEarthquakeEvents(params),
  });

  const sorted = React.useMemo(() => {
    const list = [...(events ?? [])];
    if (sort === "magnitude") return list.sort((a, b) => b.magnitude - a.magnitude);
    if (sort === "depth") return list.sort((a, b) => a.depthKm - b.depthKm);
    return list.sort((a, b) => new Date(b.timeUtc).getTime() - new Date(a.timeUtc).getTime());
  }, [events, sort]);

  function reset() {
    setCountry(ALL_COUNTRIES);
    setCity("");
    setMinMagnitude("");
    setMaxMagnitude("");
    setSort("recent");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
      <p className="text-muted-foreground mt-2 max-w-2xl text-sm">{t("subtitle")}</p>

      <Card className="mt-8 p-5">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-1.5">
            <Label>{t("byCountry")}</Label>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger>
                <SelectValue placeholder={t("countryPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_COUNTRIES}>{tCommon("filters")}</SelectItem>
                {caribbeanCountries.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>{t("byCity")}</Label>
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder={t("cityPlaceholder")}
            />
          </div>

          <div className="space-y-1.5">
            <Label>{t("byMagnitude")}</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                step="0.1"
                placeholder={tCommon("min")}
                value={minMagnitude}
                onChange={(e) => setMinMagnitude(e.target.value)}
              />
              <Input
                type="number"
                step="0.1"
                placeholder={tCommon("max")}
                value={maxMagnitude}
                onChange={(e) => setMaxMagnitude(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>{t("sortBy")}</Label>
            <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">{t("sortRecent")}</SelectItem>
                <SelectItem value="magnitude">{t("sortMagnitude")}</SelectItem>
                <SelectItem value="depth">{t("sortDepth")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button variant="outline" onClick={reset} className="w-full">
              {tCommon("reset")}
            </Button>
          </div>
        </div>
      </Card>

      <div className="text-muted-foreground mt-6 flex items-center gap-2 text-sm">
        <SearchIcon className="size-4" />
        {isLoading ? tCommon("loading") : `${sorted.length} ${t("resultsFound")}`}
      </div>

      <Card className="mt-3 overflow-hidden">
        {isLoading ? (
          <div className="space-y-3 p-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <p className="text-muted-foreground p-10 text-center text-sm">{tCommon("noResults")}</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{tCommon("magnitude")}</TableHead>
                <TableHead>{tCommon("location")}</TableHead>
                <TableHead className="hidden sm:table-cell">{tCommon("depth")}</TableHead>
                <TableHead className="hidden md:table-cell">{tCommon("date")}</TableHead>
                <TableHead className="hidden md:table-cell">{tCommon("source")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((event: EarthquakeEvent) => (
                <TableRow key={event.id}>
                  <TableCell>
                    <MagnitudeBadge magnitude={event.magnitude} />
                  </TableCell>
                  <TableCell>
                    <p className="flex items-center gap-1.5 text-sm font-medium">
                      <MapPin className="text-muted-foreground size-3.5 shrink-0" />
                      {event.place}
                    </p>
                    <p className="text-muted-foreground text-xs">{event.country}</p>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{event.depthKm} km</TableCell>
                  <TableCell className="hidden text-xs md:table-cell">
                    {formatDate(event.timeUtc, locale)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{event.source}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}
