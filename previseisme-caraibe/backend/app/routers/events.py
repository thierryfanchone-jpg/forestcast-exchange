from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, Query

from app.config import Settings, get_settings
from app.connectors.demo_data import get_demo_events
from app.models.earthquake import EarthquakeEvent
from app.services.aggregator import fetch_all_events

router = APIRouter(prefix="/events", tags=["events"])


@router.get("", response_model=list[EarthquakeEvent], response_model_by_alias=True)
async def list_events(
    region: str | None = Query(default=None, description="caribbean | global"),
    country: str | None = None,
    city: str | None = None,
    min_magnitude: float | None = Query(default=None, ge=0, le=10),
    max_magnitude: float | None = Query(default=None, ge=0, le=10),
    since: datetime | None = None,
    settings: Settings = Depends(get_settings),
) -> list[EarthquakeEvent]:
    return await fetch_all_events(
        settings,
        region=region,
        country=country,
        city=city,
        min_magnitude=min_magnitude,
        max_magnitude=max_magnitude,
        since=since,
    )


@router.get("/{event_id}", response_model=EarthquakeEvent, response_model_by_alias=True)
async def get_event(event_id: str, settings: Settings = Depends(get_settings)) -> EarthquakeEvent:
    events = await fetch_all_events(settings)
    for event in events:
        if event.id == event_id:
            return event
    for event in get_demo_events():
        if event.id == event_id:
            return event
    raise HTTPException(status_code=404, detail="Événement introuvable")


@router.get("/{event_id}/ai-summary")
async def get_event_ai_summary(event_id: str, locale: str = "fr") -> dict:
    # Emplacement prévu pour l'intégration du résumé généré par IA
    # (voir docs/previsisme-caraibe/08-intelligence-artificielle.md).
    # Renvoie un résumé de démonstration en attendant le branchement du
    # pipeline RAG / modèle génératif.
    return {
        "eventId": event_id,
        "locale": locale,
        "summary": "Résumé automatique non disponible en environnement de démonstration.",
        "modelIdentifier": "demo",
        "humanReviewed": False,
    }
