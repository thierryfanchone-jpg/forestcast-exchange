import { setRequestLocale } from "next-intl/server";

import { MapPage } from "@/components/map/map-page";
import { caribbeanEarthquakes } from "@/lib/demo-data/earthquakes";

export default async function CaribbeanMapPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <MapPage events={caribbeanEarthquakes} center={[17, -66]} zoom={5.2} titleKey="caribbean" />
  );
}
