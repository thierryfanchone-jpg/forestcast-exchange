import asyncio
import logging

from fastapi import APIRouter, Query

from app.connectors.registry import get_connectors
from app.core.config import get_settings
from app.demo_data.events import get_demo_events
from app.models.schemas import SeismicEvent

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/events", tags=["events"])


async def _collect_events() -> list[SeismicEvent]:
    settings = get_settings()
    connectors = get_connectors()

    results = await asyncio.gather(
        *(connector.fetch_recent() for connector in connectors),
        return_exceptions=True,
    )

    events: list[SeismicEvent] = []
    for connector, result in zip(connectors, results):
        if isinstance(result, Exception):
            logger.warning("Connecteur %s indisponible: %s", connector.source_code, result)
            continue
        events.extend(result)

    if not events and settings.use_demo_data_fallback:
        logger.info("Aucune donnée réelle disponible — retour aux données de démonstration.")
        events = get_demo_events()

    events.sort(key=lambda e: e.event_time_utc, reverse=True)
    return events


@router.get("", response_model=list[SeismicEvent])
async def list_events(
    region: str | None = Query(default=None, pattern="^(monde|caraibes)$"),
    min_magnitude: float | None = Query(default=None, ge=-2, le=10),
    max_depth_km: float | None = Query(default=None, ge=0),
    country: str | None = Query(default=None, min_length=3, max_length=3),
    city: str | None = Query(default=None),
) -> list[SeismicEvent]:
    events = await _collect_events()

    if region:
        events = [e for e in events if e.region == region]
    if min_magnitude is not None:
        events = [e for e in events if e.magnitude >= min_magnitude]
    if max_depth_km is not None:
        events = [e for e in events if e.depth_km <= max_depth_km]
    if country:
        events = [e for e in events if e.country_iso3.upper() == country.upper()]
    if city:
        needle = city.lower()
        events = [e for e in events if needle in e.place_description.lower()]

    return events


@router.get("/{event_id}", response_model=SeismicEvent | None)
async def get_event(event_id: str) -> SeismicEvent | None:
    events = await _collect_events()
    return next((e for e in events if e.id == event_id), None)
