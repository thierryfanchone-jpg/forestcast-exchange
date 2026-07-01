from datetime import datetime
from enum import Enum

from pydantic import BaseModel, Field


class ConfidenceLabel(str, Enum):
    faible = "faible"
    moyen = "moyen"
    eleve = "eleve"
    confirme_multi_source = "confirme_multi_source"


class SourceCode(str, Enum):
    usgs = "usgs"
    emsc = "emsc"
    ipgp_ovsm = "ipgp_ovsm"


class ReviewStatus(str, Enum):
    automatic = "automatic"
    reviewed = "reviewed"


class ContributingSource(BaseModel):
    source_code: SourceCode
    source_name: str
    external_id: str
    is_primary_source: bool = False


class SeismicEvent(BaseModel):
    """Modèle canonique — voir docs/previsisme-caraibe/04-modele-donnees-et-schema-bdd.md §4.2."""

    id: str
    magnitude: float
    magnitude_type: str
    latitude: float
    longitude: float
    depth_km: float
    place_description: str
    country_iso3: str
    country_name: str
    region: str = Field(pattern="^(monde|caraibes)$")
    event_time_utc: datetime
    first_detected_at_utc: datetime
    published_at_utc: datetime
    confidence_score: float
    confidence_label: ConfidenceLabel
    tsunami_flag: bool = False
    felt_report_count: int = 0
    contributing_sources: list[ContributingSource] = []
    review_status: ReviewStatus = ReviewStatus.automatic


class SourceHealth(BaseModel):
    source_code: SourceCode
    source_name: str
    status: str = Field(pattern="^(ok|degraded|down)$")
    latency_ms: int | None = None
    last_event_received_at: datetime | None = None


class FeltReportInput(BaseModel):
    seismic_event_id: str | None = None
    latitude: float
    longitude: float
    intensity_perceived: int = Field(ge=1, le=12)
    free_text_comment: str | None = None
