import { setRequestLocale } from "next-intl/server";

import { MapPage } from "@/components/map/map-page";
import { allEarthquakes } from "@/lib/demo-data/earthquakes";

export default async function WorldMapPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <MapPage events={allEarthquakes} center={[15, -50]} zoom={2.2} titleKey="world" />;
}
