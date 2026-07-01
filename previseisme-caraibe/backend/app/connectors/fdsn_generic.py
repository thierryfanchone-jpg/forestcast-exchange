from datetime import UTC, datetime

import httpx
from tenacity import retry, stop_after_attempt, wait_exponential

from app.connectors.base import SeismicSourceConnector
from app.models.schemas import ContributingSource, SeismicEvent, SourceHealth


class GenericFDSNConnector(SeismicSourceConnector):
    """Connecteur générique pour tout observatoire national exposant le
    standard FDSN Event Web Service (format `geojson`).

    Permet d'ajouter un nouvel observatoire (Porto Rico Seismic Network,
    UWI Seismic Research Centre, etc.) par simple configuration, sans
    modification de code — voir docs/previsisme-caraibe/03-integration-sources-sismiques.md §3.5.
    """

    def __init__(self, source_code: str, source_name: str, base_url: str, region_scope: list[str] | None = None):
        self.source_code = source_code
        self.source_name = source_name
        self._query_url = f"{base_url.rstrip('/')}/query"
        self._region_scope = region_scope or []

    async def fetch_recent(self, since: datetime | None = None) -> list[SeismicEvent]:
        params = {"format": "geojson"}
        if since:
            params["starttime"] = since.strftime("%Y-%m-%dT%H:%M:%S")

        async with httpx.AsyncClient(timeout=10.0) as client:
            payload = await self._get_with_retry(client, params)

        return [e for e in (self._to_canonical(f) for f in payload.get("features", [])) if e]

    @retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=0.5, max=5))
    async def _get_with_retry(self, client: httpx.AsyncClient, params: dict) -> dict:
        response = await client.get(self._query_url, params=params)
        response.raise_for_status()
        return response.json()

    def _to_canonical(self, feature: dict) -> SeismicEvent | None:
        try:
            props = feature["properties"]
            lon, lat, depth_km = feature["geometry"]["coordinates"]
            event_time = datetime.fromtimestamp(props["time"] / 1000, tz=UTC)
            country_iso3 = self._region_scope[0] if self._region_scope else "N/A"

            return SeismicEvent(
                id=str(feature["id"]),
                magnitude=props.get("mag") or 0.0,
                magnitude_type=props.get("magType") or "Mw",
                latitude=lat,
                longitude=lon,
                depth_km=depth_km,
                place_description=props.get("place") or "Localisation inconnue",
                country_iso3=country_iso3,
                country_name=props.get("place") or "Inconnu",
                region="caraibes" if self._region_scope else "monde",
                event_time_utc=event_time,
                first_detected_at_utc=event_time,
                published_at_utc=datetime.now(tz=UTC),
                confidence_score=0.5,
                confidence_label="moyen",
                contributing_sources=[
                    ContributingSource(
                        source_code="usgs",  # placeholder générique — un vrai déploiement
                        source_name=self.source_name,
                        external_id=str(feature["id"]),
                        is_primary_source=True,
                    )
                ],
            )
        except (KeyError, TypeError, ValueError):
            return None

    async def health_check(self) -> SourceHealth:
        return SourceHealth(source_code="usgs", source_name=self.source_name, status="down", latency_ms=None)
