import asyncio

from fastapi import APIRouter

from app.connectors.registry import get_connectors
from app.models.schemas import SourceHealth

router = APIRouter(prefix="/sources", tags=["sources"])


@router.get("/health", response_model=list[SourceHealth])
async def sources_health() -> list[SourceHealth]:
    connectors = get_connectors()
    results = await asyncio.gather(
        *(connector.health_check() for connector in connectors),
        return_exceptions=True,
    )
    healths: list[SourceHealth] = []
    for connector, result in zip(connectors, results):
        if isinstance(result, Exception):
            healths.append(
                SourceHealth(
                    source_code=connector.source_code,  # type: ignore[arg-type]
                    source_name=connector.source_name,
                    status="down",
                    latency_ms=None,
                )
            )
        else:
            healths.append(result)
    return healths
