"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { EventFilters } from "@/types/seismic";

interface EventFiltersBarProps {
  filters: EventFilters;
  onChange: (filters: EventFilters) => void;
  countries: { iso3: string; name: string }[];
}

const MAGNITUDE_OPTIONS = [
  { value: "0", label: "Toutes magnitudes" },
  { value: "3", label: "≥ 3.0 — léger" },
  { value: "4", label: "≥ 4.0 — modéré" },
  { value: "5", label: "≥ 5.0 — fort" },
  { value: "6", label: "≥ 6.0 — majeur" },
];

const DEPTH_OPTIONS = [
  { value: "0", label: "Toutes profondeurs" },
  { value: "30", label: "≤ 30 km — superficiel" },
  { value: "70", label: "≤ 70 km — intermédiaire" },
  { value: "300", label: "≤ 300 km — profond" },
];

export function EventFiltersBar({ filters, onChange, countries }: EventFiltersBarProps) {
  return (
    <div className="grid gap-4 rounded-xl border border-border bg-card p-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="city-search">Ville</Label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="city-search"
            placeholder="Rechercher une ville…"
            className="pl-8"
            defaultValue={filters.city ?? ""}
            onChange={(e) => onChange({ ...filters, city: e.target.value || undefined })}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Pays</Label>
        <Select
          value={filters.country ?? "all"}
          onValueChange={(value) => onChange({ ...filters, country: value === "all" ? undefined : value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Tous les pays" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les pays</SelectItem>
            {countries.map((c) => (
              <SelectItem key={c.iso3} value={c.iso3}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Magnitude minimale</Label>
        <Select
          value={String(filters.minMagnitude ?? 0)}
          onValueChange={(value) =>
            onChange({ ...filters, minMagnitude: value === "0" ? undefined : Number(value) })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {MAGNITUDE_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Profondeur maximale</Label>
        <Select
          value={String(filters.maxDepthKm ?? 0)}
          onValueChange={(value) =>
            onChange({ ...filters, maxDepthKm: value === "0" ? undefined : Number(value) })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {DEPTH_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
