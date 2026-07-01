from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Configuration centrale, lue depuis les variables d'environnement (.env)."""

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_name: str = "PréviSéisme Caraïbe API"
    environment: str = "development"
    api_v1_prefix: str = "/api/v1"

    cors_origins: list[str] = ["http://localhost:3000"]

    database_url: str = "postgresql+asyncpg://previsisme:previsisme@localhost:5432/previsisme_caraibe"
    redis_url: str = "redis://localhost:6379/0"

    # Connecteurs sources sismiques — voir docs/previsisme-caraibe/03-integration-sources-sismiques.md
    usgs_base_url: str = "https://earthquake.usgs.gov"
    usgs_feed: str = "all_day"  # all_day | significant_week | 4.5_week ...
    emsc_ws_url: str = "wss://www.seismicportal.eu/standing_order/websocket"
    emsc_fallback_rest_url: str = "https://www.seismicportal.eu/fdsnws/event/1/query"
    ipgp_base_url: str = ""  # à renseigner une fois le partenariat IPGP/OVSM formalisé

    caribbean_bbox: tuple[float, float, float, float] = (-90.0, 8.0, -58.0, 28.0)  # min_lon, min_lat, max_lon, max_lat

    use_demo_data_fallback: bool = True


@lru_cache
def get_settings() -> Settings:
    return Settings()
