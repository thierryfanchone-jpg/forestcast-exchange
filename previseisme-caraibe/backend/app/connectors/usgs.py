import time
from datetime import UTC, datetime

import httpx
from tenacity import retry, stop_after_attempt, wait_exponential

from app.core.config import Settings
from app.connectors.base import SeismicSourceConnector
from app.models.schemas import ContributingSource, SeismicEvent, SourceHealth

# Codes ISO 3166-1 alpha-3 approximatifs pour les libellés USGS les plus fréquents
# dans la zone Caraïbes — affinage possible via une table de correspondance
# géographique (reverse-geocoding léger) en V2.
_CARIBBEAN_HINTS: dict[str, str] = {
    "martinique": "MTQ",
    "guadeloupe": "GLP",
    "haiti": "HTI",
    "dominican republic": "DOM",
    "puerto rico": "PRI",
    "jamaica": "JAM",
    "trinidad": "TTO",
    "dominica": "DMA",
    "saint vincent": "VCT",
    "bahamas": "BHS",
    "cuba": "CUB",
}


def _guess_country(place: str) -> tuple[str, str]:
    lowered = place.lower()
    for hint, iso3 in _CARIBBEAN_HINTS.items():
        if hint in lowered:
            return iso3, hint.title()
    return "N/A", place


class USGSConnector(SeismicSourceConnector):
    """Connecteur USGS — flux GeoJSON temps réel + FDSN Event Web Service.

    Documentation officielle :
    https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
    https://earthquake.usgs.gov/fdsnws/event/1/
    """

    source_code = "usgs"
    source_name = "USGS"

    def __init__(self, settings: Settings):
        self._settings = settings
        self._feed_url = f"{settings.usgs_base_url}/earthquakes/feed/v1.0/summary/{settings.usgs_feed}.geojson"

    async def fetch_recent(self, since: datetime | None = None) -> list[SeismicEvent]:
        async with httpx.AsyncClient(timeout=10.0) as client:
            payload = await self._get_with_retry(client)

        events: list[SeismicEvent] = []
        for feature in payload.get("features", []):
            event = self._to_canonical(feature)
            if event and (since is None or event.event_time_utc >= since):
                events.append(event)
        return events

    @retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=0.5, max=5))
    async def _get_with_retry(self, client: httpx.AsyncClient) -> dict:
        response = await client.get(self._feed_url)
        response.raise_for_status()
        return response.json()

    def _to_canonical(self, feature: dict) -> SeismicEvent | None:
        try:
            props = feature["properties"]
            lon, lat, depth_km = feature["geometry"]["coordinates"]
            place = props.get("place") or "Localisation inconnue"
            country_iso3, country_name = _guess_country(place)
            event_time = datetime.fromtimestamp(props["time"] / 1000, tz=UTC)

            return SeismicEvent(
                id=feature["id"],
                magnitude=props.get("mag") or 0.0,
                magnitude_type=props.get("magType") or "Mw",
                latitude=lat,
                longitude=lon,
                depth_km=depth_km,
                place_description=place,
                country_iso3=country_iso3,
                country_name=country_name,
                region="caraibes" if country_iso3 != "N/A" else "monde",
                event_time_utc=event_time,
                first_detected_at_utc=event_time,
                published_at_utc=datetime.now(tz=UTC),
                confidence_score=0.55,
                confidence_label="moyen",
                tsunami_flag=bool(props.get("tsunami")),
                felt_report_count=props.get("felt") or 0,
                contributing_sources=[
                    ContributingSource(
                        source_code="usgs",
                        source_name="USGS",
                        external_id=feature["id"],
                        is_primary_source=True,
                    )
                ],
                review_status="reviewed" if props.get("status") == "reviewed" else "automatic",
            )
        except (KeyError, TypeError, ValueError):
            return None

    async def health_check(self) -> SourceHealth:
        start = time.perf_counter()
        try:
            async with httpx.AsyncClient(timeout=5.0) as client:
                response = await client.get(self._feed_url)
                response.raise_for_status()
            latency_ms = int((time.perf_counter() - start) * 1000)
            return SourceHealth(
                source_code="usgs",
                source_name=self.source_name,
                status="ok",
                latency_ms=latency_ms,
                last_event_received_at=datetime.now(tz=UTC),
            )
        except httpx.HTTPError:
            return SourceHealth(
                source_code="usgs", source_name=self.source_name, status="down", latency_ms=None
            )
