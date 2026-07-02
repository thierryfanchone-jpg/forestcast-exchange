from fastapi import APIRouter, Depends

from app.config import Settings, get_settings
from app.models.earthquake import SourceHealth
from app.services.aggregator import fetch_sources_health

router = APIRouter(prefix="/sources", tags=["sources"])


@router.get("/health", response_model=list[SourceHealth], response_model_by_alias=True)
async def sources_health(settings: Settings = Depends(get_settings)) -> list[SourceHealth]:
    return await fetch_sources_health(settings)
