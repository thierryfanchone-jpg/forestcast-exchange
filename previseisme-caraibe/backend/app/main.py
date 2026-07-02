from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings
from app.routers import auth, events, felt_reports, health, sources

settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    description=(
        "API d'agrégation des flux sismiques de la région Caraïbe "
        "(USGS, EMSC, IPGP, FDSN) pour la plateforme PréviSéisme Caraïbe."
    ),
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(events.router, prefix=settings.api_v1_prefix)
app.include_router(sources.router, prefix=settings.api_v1_prefix)
app.include_router(auth.router, prefix=settings.api_v1_prefix)
app.include_router(felt_reports.router, prefix=settings.api_v1_prefix)


@app.get("/")
async def root() -> dict:
    return {
        "name": settings.app_name,
        "docs": "/docs",
        "api": settings.api_v1_prefix,
    }
