"use client";

import * as React from "react";
import Map, { Marker, Popup, NavigationControl, ScaleControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { MagnitudeDot } from "@/components/events/magnitude-badge";
import { ConfidenceBadge } from "@/components/events/confidence-badge";
import { formatMagnitude, formatRelativeTime, magnitudeColorVar } from "@/lib/utils";
import { MAP_STYLE_URL } from "@/lib/map-config";
import type { SeismicEvent } from "@/types/seismic";
import Link from "next/link";

interface SeismicMapProps {
  events: SeismicEvent[];
  initialView: { longitude: number; latitude: number; zoom: number };
  className?: string;
}

function markerSizePx(magnitude: number): number {
  return Math.max(10, Math.min(34, 8 + magnitude * 4));
}

export function SeismicMap({ events, initialView, className }: SeismicMapProps) {
  const [selected, setSelected] = React.useState<SeismicEvent | null>(null);

  return (
    <div className={className ?? "h-[600px] w-full overflow-hidden rounded-xl border border-border"}>
      <Map
        initialViewState={initialView}
        mapStyle={MAP_STYLE_URL}
        style={{ width: "100%", height: "100%" }}
        attributionControl={true}
      >
        <NavigationControl position="top-right" />
        <ScaleControl position="bottom-left" />

        {events.map((event) => (
          <Marker
            key={event.id}
            longitude={event.longitude}
            latitude={event.latitude}
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setSelected(event);
            }}
          >
            <button
              aria-label={`Séisme magnitude ${formatMagnitude(event.magnitude)} — ${event.placeDescription}`}
              className="relative flex items-center justify-center rounded-full border-2 border-white/80 shadow-md transition-transform hover:scale-110"
              style={{
                width: markerSizePx(event.magnitude),
                height: markerSizePx(event.magnitude),
                backgroundColor: magnitudeColorVar(event.magnitude),
                opacity: 0.85,
              }}
            >
              {event.magnitude >= 5 && (
                <span
                  className="absolute inset-0 -z-10 rounded-full animate-pulse-ring"
                  style={{ backgroundColor: magnitudeColorVar(event.magnitude) }}
                />
              )}
            </button>
          </Marker>
        ))}

        {selected && (
          <Popup
            longitude={selected.longitude}
            latitude={selected.latitude}
            anchor="bottom"
            onClose={() => setSelected(null)}
            closeOnClick={false}
            maxWidth="280px"
          >
            <div className="flex flex-col gap-2 p-1">
              <div className="flex items-center gap-2">
                <MagnitudeDot magnitude={selected.magnitude} />
                <span className="text-sm font-bold">M {formatMagnitude(selected.magnitude)}</span>
                <span className="text-xs text-muted-foreground">
                  {formatRelativeTime(selected.eventTimeUtc)}
                </span>
              </div>
              <p className="text-sm">{selected.placeDescription}</p>
              <p className="text-xs text-muted-foreground">Profondeur : {selected.depthKm.toFixed(0)} km</p>
              <ConfidenceBadge label={selected.confidenceLabel} />
              <Link
                href={`/evenements/${selected.id}`}
                className="text-xs font-medium text-primary hover:underline"
              >
                Voir le détail complet →
              </Link>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}
