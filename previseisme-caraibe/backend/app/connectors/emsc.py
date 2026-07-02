from datetime import datetime

from app.connectors.base import SeismicConnector
from app.models.earthquake import (
    ConfidenceLabel,
    EarthquakeEvent,
    Region,
    SeismicSourceCode,
)


class EmscConnector(SeismicConnector):
    code = "EMSC"

    async def fetch_events(
        self,
        *,
        start_time: datetime | None = None,
        end_time: datetime | None = None,
        min_magnitude: float | None = None,
        bbox: tuple[float, float, float, float] | None = None,
    ) -> list[EarthquakeEvent]:
        params: dict = {"format": "json", "limit": 200}
        if start_time:
            params["start"] = start_time.isoformat()
        if end_time:
            params["end"] = end_time.isoformat()
        if min_magnitude is not None:
            params["minmag"] = min_magnitude
        if bbox:
            min_lon, min_lat, max_lon, max_lat = bbox
            params.update(
                minlon=min_lon,
                minlat=min_lat,
                maxlon=max_lon,
                maxlat=max_lat,
            )

        response = await self._get(self.settings.emsc_base_url, params)
        payload = response.json()

        events: list[EarthquakeEvent] = []
        for feature in payload.get("features", []):
            props = feature["properties"]
            lon, lat = feature["geometry"]["coordinates"][:2]
            depth = props.get("depth", 0)
            region = props.get("flynn_region", "") or ""
            magnitude = props.get("mag")
            if magnitude is None:
                continue
            event_id = props.get("unid") or feature.get("id") or props.get("source_id", "")
            events.append(
                EarthquakeEvent(
                    id=f"emsc-{event_id}",
                    externalId=str(event_id),
                    magnitude=magnitude,
                    magnitudeType=props.get("magtype", "Mw"),
                    depthKm=depth or 0,
                    place=region,
                    city=region.split(",")[0].strip() if region else "",
                    country=region.split(",")[-1].strip() if region else "",
                    countryCode="",
                    latitude=lat,
                    longitude=lon,
                    timeUtc=datetime.fromisoformat(props["time"].replace("Z", "+00:00")),
                    source=SeismicSourceCode.EMSC,
                    confidence=ConfidenceLabel.verified,
                    confidenceScore=0.93,
                    felt=0,
                    tsunamiRisk=False,
                    region=Region.caribbean,
                )
            )
        return events
