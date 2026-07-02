"use client";

import * as React from "react";
import maplibregl, { Map as MapLibreMap, Marker, Popup } from "maplibre-gl";
import { useTheme } from "next-themes";

import type { EarthquakeEvent } from "@/lib/types/earthquake";
import { magnitudeDotColor } from "@/components/magnitude-badge";
import { formatDate } from "@/lib/utils";

const LIGHT_STYLE = "https://tiles.openfreemap.org/styles/positron";
const DARK_STYLE = "https://tiles.openfreemap.org/styles/dark";

interface EarthquakeMapProps {
  events: EarthquakeEvent[];
  center: [number, number];
  zoom: number;
  locale?: string;
  onSelect?: (event: EarthquakeEvent) => void;
  className?: string;
}

export function EarthquakeMap({
  events,
  center,
  zoom,
  locale = "fr",
  onSelect,
  className,
}: EarthquakeMapProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mapRef = React.useRef<MapLibreMap | null>(null);
  const markersRef = React.useRef<Marker[]>([]);
  const { resolvedTheme } = useTheme();

  React.useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: resolvedTheme === "dark" ? DARK_STYLE : LIGHT_STYLE,
      center: [center[1], center[0]],
      zoom,
      attributionControl: { compact: true },
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const style = resolvedTheme === "dark" ? DARK_STYLE : LIGHT_STYLE;
    try {
      map.setStyle(style);
    } catch {
      // ignore transient errors during style swap
    }
  }, [resolvedTheme]);

  React.useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    function renderMarkers(map: MapLibreMap) {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      for (const event of events) {
        const size = Math.max(14, Math.min(46, event.magnitude * 7));
        const el = document.createElement("button");
        el.setAttribute("aria-label", `${event.place} — M${event.magnitude}`);
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.borderRadius = "9999px";
        el.style.background = magnitudeDotColor(event.magnitude);
        el.style.opacity = "0.85";
        el.style.border = "2px solid white";
        el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.35)";
        el.style.cursor = "pointer";

        const popupHtml = `
          <div style="padding:14px;min-width:220px;font-family:inherit">
            <div style="font-weight:700;font-size:15px;margin-bottom:2px">M ${event.magnitude.toFixed(1)} · ${event.place}</div>
            <div style="font-size:12px;opacity:0.7;margin-bottom:8px">${event.country}</div>
            <div style="font-size:12px;line-height:1.6">
              <div>Profondeur : ${event.depthKm} km</div>
              <div>Date : ${formatDate(event.timeUtc, locale)}</div>
              <div>Source : ${event.source}</div>
            </div>
          </div>
        `;
        const popup = new Popup({ offset: size / 2 + 4, closeButton: true }).setHTML(popupHtml);

        const marker = new Marker({ element: el })
          .setLngLat([event.longitude, event.latitude])
          .setPopup(popup)
          .addTo(map);

        el.addEventListener("click", () => onSelect?.(event));
        markersRef.current.push(marker);
      }
    }

    const render = () => renderMarkers(map);

    if (map.isStyleLoaded()) {
      render();
    } else {
      map.once("load", render);
    }
    map.on("style.load", render);

    return () => {
      map.off("style.load", render);
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
    };
  }, [events, locale, onSelect]);

  React.useEffect(() => {
    mapRef.current?.flyTo({ center: [center[1], center[0]], zoom, duration: 800 });
  }, [center, zoom]);

  return <div ref={containerRef} className={className} />;
}
