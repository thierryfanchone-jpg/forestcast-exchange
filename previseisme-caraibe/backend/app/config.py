from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_name: str = "PréviSéisme Caraïbe API"
    environment: str = "development"
    api_v1_prefix: str = "/v1"
    cors_origins: list[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]

    database_url: str = "postgresql+asyncpg://previseisme:previseisme@localhost:5432/previseisme_caraibe"
    redis_url: str = "redis://localhost:6379/0"

    jwt_secret: str = "change-me-in-production"
    jwt_algorithm: str = "HS256"
    jwt_expires_minutes: int = 15

    http_connector_timeout_seconds: float = 6.0

    usgs_base_url: str = "https://earthquake.usgs.gov/fdsnws/event/1/query"
    emsc_base_url: str = "https://www.seismicportal.eu/fdsnws/event/1/query"
    ipgp_base_url: str = "http://ws.ipgp.fr/fdsnws/event/1/query"
    fdsn_base_url: str = "https://service.iris.edu/fdsnws/event/1/query"


@lru_cache
def get_settings() -> Settings:
    return Settings()
