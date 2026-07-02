from datetime import UTC, datetime

from app.connectors.base import SeismicConnector
from app.models.earthquake import (
    ConfidenceLabel,
    EarthquakeEvent,
    Region,
    SeismicSourceCode,
)


def _split_place(place: str) -> tuple[str, str]:
    """Extrait une approximation (ville, pays) depuis le champ 'place' USGS,
    ex: '10km SW of Port-au-Prince, Haiti' -> ('Port-au-Prince', 'Haiti')."""
    if "," in place:
        city_part, country = place.rsplit(",", 1)
        city = city_part.split(" of ")[-1].strip()
        return city, country.strip()
    return place.strip(), ""


class UsgsConnector(SeismicConnector):
    code = "USGS"

    async def fetch_events(
        self,
        *,
        start_time: datetime | None = None,
        end_time: datetime | None = None,
        min_magnitude: float | None = None,
        bbox: tuple[float, float, float, float] | None = None,
    ) -> list[EarthquakeEvent]:
        params: dict = {"format": "geojson"}
        if start_time:
            params["starttime"] = start_time.isoformat()
        if end_time:
            params["endtime"] = end_time.isoformat()
        if min_magnitude is not None:
            params["minmagnitude"] = min_magnitude
        if bbox:
            min_lon, min_lat, max_lon, max_lat = bbox
            params.update(
                minlongitude=min_lon,
                minlatitude=min_lat,
                maxlongitude=max_lon,
                maxlatitude=max_lat,
            )

        response = await self._get(self.settings.usgs_base_url, params)
        payload = response.json()

        events: list[EarthquakeEvent] = []
        for feature in payload.get("features", []):
            props = feature["properties"]
            lon, lat, depth = feature["geometry"]["coordinates"]
            city, country = _split_place(props.get("place") or "")
            magnitude = props.get("mag")
            if magnitude is None:
                continue
            events.append(
                EarthquakeEvent(
                    id=f"usgs-{feature['id']}",
                    externalId=feature["id"],
                    magnitude=magnitude,
                    magnitudeType=props.get("magType", "Mw"),
                    depthKm=depth or 0,
                    place=props.get("place") or "",
                    city=city,
                    country=country,
                    countryCode="",
                    latitude=lat,
                    longitude=lon,
                    timeUtc=datetime.fromtimestamp(props["time"] / 1000, tz=UTC),
                    source=SeismicSourceCode.USGS,
                    confidence=ConfidenceLabel.verified,
                    confidenceScore=0.95,
                    felt=props.get("felt") or 0,
                    tsunamiRisk=bool(props.get("tsunami")),
                    region=Region.caribbean,
                )
            )
        return events
