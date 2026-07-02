import asyncio
import logging
from datetime import datetime

from app.config import Settings
from app.connectors.base import SeismicConnector
from app.connectors.demo_data import get_demo_events, get_demo_sources_health
from app.connectors.emsc import EmscConnector
from app.connectors.fdsn import FdsnConnector
from app.connectors.ipgp import IpgpConnector
from app.connectors.usgs import UsgsConnector
from app.models.earthquake import EarthquakeEvent, SourceHealth, SourceStatus

logger = logging.getLogger("previseisme.aggregator")

# Boîte englobante approximative de l'arc des Caraïbes (min_lon, min_lat, max_lon, max_lat)
CARIBBEAN_BBOX = (-85.0, 8.0, -58.0, 27.0)


def build_connectors(settings: Settings) -> list[SeismicConnector]:
    return [
        UsgsConnector(settings),
        EmscConnector(settings),
        IpgpConnector(settings),
        FdsnConnector(settings),
    ]


def _deduplicate(events: list[EarthquakeEvent]) -> list[EarthquakeEvent]:
    """Fusion naïve des événements quasi identiques rapportés par plusieurs
    sources (même position à ~0.1° près, même minute, magnitude proche).
    Une implémentation de production utiliserait un score de correspondance
    complet (voir doc/04-modele-donnees-et-schema-bdd.md — event_source_link)."""
    seen: list[EarthquakeEvent] = []
    for event in events:
        duplicate = False
        for kept in seen:
            same_time = abs((event.time_utc - kept.time_utc).total_seconds()) < 60
            close_location = abs(event.latitude - kept.latitude) < 0.15 and abs(event.longitude - kept.longitude) < 0.15
            close_magnitude = abs(event.magnitude - kept.magnitude) < 0.5
            if same_time and close_location and close_magnitude:
                duplicate = True
                break
        if not duplicate:
            seen.append(event)
    return seen


async def fetch_all_events(
    settings: Settings,
    *,
    region: str | None = None,
    country: str | None = None,
    city: str | None = None,
    min_magnitude: float | None = None,
    max_magnitude: float | None = None,
    since: datetime | None = None,
) -> list[EarthquakeEvent]:
    connectors = build_connectors(settings)
    bbox = CARIBBEAN_BBOX if region == "caribbean" else None

    results = await asyncio.gather(
        *[connector.fetch_events(start_time=since, min_magnitude=min_magnitude, bbox=bbox) for connector in connectors],
        return_exceptions=True,
    )

    events: list[EarthquakeEvent] = []
    any_live_source = False
    for connector, result in zip(connectors, results, strict=False):
        if isinstance(result, Exception):
            logger.info(
                "Connecteur %s indisponible (%s) — repli sur les données de démonstration.",
                connector.code,
                result,
            )
            continue
        any_live_source = True
        events.extend(result)

    if not any_live_source:
        events = get_demo_events()

    events = _deduplicate(events)

    if country:
        events = [e for e in events if e.country.lower() == country.lower()]
    if city:
        events = [e for e in events if city.lower() in e.city.lower()]
    if min_magnitude is not None:
        events = [e for e in events if e.magnitude >= min_magnitude]
    if max_magnitude is not None:
        events = [e for e in events if e.magnitude <= max_magnitude]

    return sorted(events, key=lambda e: e.time_utc, reverse=True)


async def fetch_sources_health(settings: Settings) -> list[SourceHealth]:
    connectors = build_connectors(settings)

    async def probe(connector: SeismicConnector) -> SourceHealth:
        demo = next(s for s in get_demo_sources_health() if s.code == connector.code)
        started = datetime.now()
        try:
            await connector.fetch_events(min_magnitude=6.0)
            latency = (datetime.now() - started).total_seconds()
            return demo.model_copy(update={"status": SourceStatus.operational, "latency_seconds": round(latency, 2)})
        except Exception:  # noqa: BLE001 - repli attendu si la source est injoignable
            return demo.model_copy(update={"status": SourceStatus.degraded})

    return list(await asyncio.gather(*[probe(c) for c in connectors]))
