from datetime import datetime
from enum import Enum

from pydantic import BaseModel, Field


class SeismicSourceCode(str, Enum):
    USGS = "USGS"
    EMSC = "EMSC"
    IPGP = "IPGP"
    FDSN = "FDSN"


class ConfidenceLabel(str, Enum):
    verified = "verified"
    likely = "likely"
    unconfirmed = "unconfirmed"


class Region(str, Enum):
    caribbean = "caribbean"
    global_ = "global"


class EarthquakeEvent(BaseModel):
    id: str
    external_id: str = Field(alias="externalId")
    magnitude: float
    magnitude_type: str = Field(alias="magnitudeType")
    depth_km: float = Field(alias="depthKm")
    place: str
    city: str
    country: str
    country_code: str = Field(alias="countryCode")
    latitude: float
    longitude: float
    time_utc: datetime = Field(alias="timeUtc")
    source: SeismicSourceCode
    confidence: ConfidenceLabel
    confidence_score: float = Field(alias="confidenceScore")
    felt: int = 0
    tsunami_risk: bool = Field(default=False, alias="tsunamiRisk")
    region: Region = Region.caribbean

    model_config = {"populate_by_name": True}


class SourceStatus(str, Enum):
    operational = "operational"
    degraded = "degraded"
    down = "down"


class SourceHealth(BaseModel):
    code: SeismicSourceCode
    name: str
    description: str
    status: SourceStatus
    latency_seconds: float = Field(alias="latencySeconds")
    last_sync_utc: datetime = Field(alias="lastSyncUtc")
    region: str

    model_config = {"populate_by_name": True}


class FeltReportCreate(BaseModel):
    event_id: str
    intensity_perceived: int = Field(ge=1, le=12, description="Échelle EMS-98 / MMI")
    latitude: float
    longitude: float
    comment: str | None = None
