from datetime import datetime

from app.connectors.base import SeismicConnector
from app.models.earthquake import (
    ConfidenceLabel,
    EarthquakeEvent,
    Region,
    SeismicSourceCode,
)

# Format texte standard FDSNWS-event (voir aussi connectors/ipgp.py) :
# EventID|Time|Latitude|Longitude|Depth/km|Author|Catalog|Contributor|
# ContributorID|MagType|Magnitude|MagAuthor|EventLocationName
_COLUMNS = [
    "event_id",
    "time",
    "latitude",
    "longitude",
    "depth",
    "author",
    "catalog",
    "contributor",
    "contributor_id",
    "mag_type",
    "magnitude",
    "mag_author",
    "location_name",
]


class FdsnConnector(SeismicConnector):
    """Connecteur générique pour tout nœud du réseau FDSN (référence : IRIS)."""

    code = "FDSN"

    async def fetch_events(
        self,
        *,
        start_time: datetime | None = None,
        end_time: datetime | None = None,
        min_magnitude: float | None = None,
        bbox: tuple[float, float, float, float] | None = None,
    ) -> list[EarthquakeEvent]:
        params: dict = {"format": "text"}
        if start_time:
            params["starttime"] = start_time.isoformat()
        if end_time:
            params["endtime"] = end_time.isoformat()
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

        response = await self._get(self.settings.fdsn_base_url, params)
        lines = [line for line in response.text.splitlines() if line and not line.startswith("#")]

        events: list[EarthquakeEvent] = []
        for line in lines:
            fields = line.split("|")
            if len(fields) < len(_COLUMNS):
                continue
            row = dict(zip(_COLUMNS, fields, strict=False))
            location = row["location_name"].strip()
            magnitude = float(row["magnitude"]) if row["magnitude"] else None
            if magnitude is None:
                continue
            events.append(
                EarthquakeEvent(
                    id=f"fdsn-{row['event_id']}",
                    externalId=row["event_id"],
                    magnitude=magnitude,
                    magnitudeType=row["mag_type"] or "Mb",
                    depthKm=float(row["depth"]) if row["depth"] else 0,
                    place=location,
                    city=location.split(",")[0].strip() if location else "",
                    country=location.split(",")[-1].strip() if location else "",
                    countryCode="",
                    latitude=float(row["latitude"]),
                    longitude=float(row["longitude"]),
                    timeUtc=datetime.fromisoformat(row["time"].replace("Z", "+00:00")),
                    source=SeismicSourceCode.FDSN,
                    confidence=ConfidenceLabel.likely,
                    confidenceScore=0.8,
                    felt=0,
                    tsunamiRisk=False,
                    region=Region.caribbean,
                )
            )
        return events
