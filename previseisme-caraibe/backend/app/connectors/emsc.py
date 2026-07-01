import time
from datetime import UTC, datetime

import httpx
from tenacity import retry, stop_after_attempt, wait_exponential

from app.core.config import Settings
from app.connectors.base import SeismicSourceConnector
from app.models.schemas import ContributingSource, SeismicEvent, SourceHealth


class EMSCConnector(SeismicSourceConnector):
    """Connecteur EMSC — European-Mediterranean Seismological Centre.

    Le flux temps réel officiel est un WebSocket
    (wss://www.seismicportal.eu/standing_order/websocket). Cette implémentation
    fournit le connecteur de secours REST (FDSN Event Web Service), suffisant
    pour le mode polling V1 ; le WebSocket temps réel est un axe d'amélioration
    V1.1 documenté dans docs/previsisme-caraibe/03-integration-sources-sismiques.md §3.3.
    """

    source_code = "emsc"
    source_name = "EMSC"

    def __init__(self, settings: Settings):
        self._settings = settings
        self._rest_url = settings.emsc_fallback_rest_url

    async def fetch_recent(self, since: datetime | None = None) -> list[SeismicEvent]:
        params = {"format": "json", "limit": 100, "orderby": "time"}
        if since:
            params["starttime"] = since.strftime("%Y-%m-%dT%H:%M:%S")

        async with httpx.AsyncClient(timeout=10.0) as client:
            payload = await self._get_with_retry(client, params)

        events: list[SeismicEvent] = []
        for feature in payload.get("features", []):
            event = self._to_canonical(feature)
            if event:
                events.append(event)
        return events

    @retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=0.5, max=5))
    async def _get_with_retry(self, client: httpx.AsyncClient, params: dict) -> dict:
        response = await client.get(self._rest_url, params=params)
        response.raise_for_status()
        return response.json()

    def _to_canonical(self, feature: dict) -> SeismicEvent | None:
        try:
            props = feature["properties"]
            lon, lat, depth_km = feature["geometry"]["coordinates"]
            event_time = datetime.fromisoformat(props["time"].replace("Z", "+00:00"))

            return SeismicEvent(
                id=str(feature.get("id") or props.get("source_id")),
                magnitude=props.get("mag") or 0.0,
                magnitude_type=props.get("magtype") or "Mw",
                latitude=lat,
                longitude=lon,
                depth_km=depth_km,
                place_description=props.get("flynn_region") or "Localisation inconnue",
                country_iso3="N/A",
                country_name=props.get("flynn_region") or "Inconnu",
                region="monde",
                event_time_utc=event_time,
                first_detected_at_utc=event_time,
                published_at_utc=datetime.now(tz=UTC),
                confidence_score=0.55,
                confidence_label="moyen",
                contributing_sources=[
                    ContributingSource(
                        source_code="emsc",
                        source_name="EMSC",
                        external_id=str(feature.get("id", "")),
                        is_primary_source=True,
                    )
                ],
            )
        except (KeyError, TypeError, ValueError):
            return None

    async def health_check(self) -> SourceHealth:
        start = time.perf_counter()
        try:
            async with httpx.AsyncClient(timeout=5.0) as client:
                response = await client.get(self._rest_url, params={"format": "json", "limit": 1})
                response.raise_for_status()
            latency_ms = int((time.perf_counter() - start) * 1000)
            return SourceHealth(
                source_code="emsc", source_name=self.source_name, status="ok", latency_ms=latency_ms
            )
        except httpx.HTTPError:
            return SourceHealth(
                source_code="emsc", source_name=self.source_name, status="down", latency_ms=None
            )
