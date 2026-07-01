from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import events, felt_reports, health, sources
from app.core.config import get_settings

settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    description=(
        "API backend de PréviSéisme Caraïbe. Agrège des données sismiques "
        "exclusivement issues de sources scientifiques officielles (USGS, EMSC, "
        "IPGP/OVSM). Voir docs/previsisme-caraibe/06-api-specifications.md."
    ),
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix=settings.api_v1_prefix)
app.include_router(events.router, prefix=settings.api_v1_prefix)
app.include_router(sources.router, prefix=settings.api_v1_prefix)
app.include_router(felt_reports.router, prefix=settings.api_v1_prefix)


@app.get("/")
async def root() -> dict:
    return {
        "name": settings.app_name,
        "docs": "/docs",
        "api_prefix": settings.api_v1_prefix,
    }
