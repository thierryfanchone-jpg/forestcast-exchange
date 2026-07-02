"""Jeu de données de démonstration réaliste, utilisé en repli lorsque les
connecteurs temps réel (USGS, EMSC, IPGP, FDSN) sont indisponibles ou non
configurés (voir connectors/base.py)."""

from datetime import UTC, datetime, timedelta

from app.models.earthquake import (
    ConfidenceLabel,
    EarthquakeEvent,
    Region,
    SeismicSourceCode,
    SourceHealth,
    SourceStatus,
)

NOW = datetime(2026, 7, 2, 14, 0, 0, tzinfo=UTC)


def _dt(hours_ago: float = 0, days_ago: float = 0) -> datetime:
    return NOW - timedelta(hours=hours_ago, days=days_ago)


_SEED_EVENTS: list[dict] = [
    {
        "external_id": "us7000pcar",
        "magnitude": 5.8,
        "magnitude_type": "Mw",
        "depth_km": 12,
        "place": "18 km au sud-ouest de Port-au-Prince",
        "city": "Port-au-Prince",
        "country": "Haïti",
        "country_code": "HT",
        "latitude": 18.4247,
        "longitude": -72.6764,
        "time": _dt(hours_ago=2),
        "source": SeismicSourceCode.USGS,
        "felt": 412,
        "tsunami_risk": False,
    },
    {
        "external_id": "emsc650912",
        "magnitude": 4.6,
        "magnitude_type": "Mb",
        "depth_km": 35,
        "place": "22 km au nord-est de Les Cayes",
        "city": "Les Cayes",
        "country": "Haïti",
        "country_code": "HT",
        "latitude": 18.3167,
        "longitude": -73.55,
        "time": _dt(hours_ago=9),
        "source": SeismicSourceCode.EMSC,
        "felt": 87,
        "tsunami_risk": False,
    },
    {
        "external_id": "ipgp-gpe-0231",
        "magnitude": 3.9,
        "magnitude_type": "Ml",
        "depth_km": 8,
        "place": "12 km au sud-est de Pointe-à-Pitre",
        "city": "Pointe-à-Pitre",
        "country": "Guadeloupe",
        "country_code": "GP",
        "latitude": 16.15,
        "longitude": -61.5,
        "time": _dt(hours_ago=14),
        "source": SeismicSourceCode.IPGP,
        "felt": 34,
        "tsunami_risk": False,
    },
    {
        "external_id": "fdsn-pr-9982",
        "magnitude": 4.9,
        "magnitude_type": "Mw",
        "depth_km": 10,
        "place": "8 km au sud de Ponce",
        "city": "Ponce",
        "country": "Porto Rico",
        "country_code": "PR",
        "latitude": 17.9,
        "longitude": -66.61,
        "time": _dt(hours_ago=31),
        "source": SeismicSourceCode.FDSN,
        "felt": 198,
        "tsunami_risk": False,
    },
    {
        "external_id": "us7000pby5",
        "magnitude": 3.6,
        "magnitude_type": "Ml",
        "depth_km": 15,
        "place": "16 km à l'est de Kingston",
        "city": "Kingston",
        "country": "Jamaïque",
        "country_code": "JM",
        "latitude": 17.97,
        "longitude": -76.6,
        "time": _dt(days_ago=2),
        "source": SeismicSourceCode.USGS,
        "felt": 22,
        "tsunami_risk": False,
    },
    {
        "external_id": "us7000pbn9",
        "magnitude": 6.2,
        "magnitude_type": "Mw",
        "depth_km": 15,
        "place": "24 km au nord-ouest de Les Cayes",
        "city": "Les Cayes",
        "country": "Haïti",
        "country_code": "HT",
        "latitude": 18.35,
        "longitude": -73.85,
        "time": _dt(days_ago=18),
        "source": SeismicSourceCode.USGS,
        "felt": 892,
        "tsunami_risk": True,
    },
    {
        "external_id": "us7000pbt8",
        "magnitude": 5.4,
        "magnitude_type": "Mw",
        "depth_km": 60,
        "place": "60 km au nord de Port of Spain",
        "city": "Port of Spain",
        "country": "Trinité-et-Tobago",
        "country_code": "TT",
        "latitude": 11.4,
        "longitude": -61.5,
        "time": _dt(days_ago=7),
        "source": SeismicSourceCode.USGS,
        "felt": 134,
        "tsunami_risk": False,
    },
    {
        "external_id": "us2021haiti",
        "magnitude": 7.2,
        "magnitude_type": "Mw",
        "depth_km": 10,
        "place": "8 km au nord-est de Saint-Louis-du-Sud",
        "city": "Les Cayes",
        "country": "Haïti",
        "country_code": "HT",
        "latitude": 18.4,
        "longitude": -73.48,
        "time": datetime(2021, 8, 14, 12, 29, 8, tzinfo=UTC),
        "source": SeismicSourceCode.USGS,
        "felt": 890000,
        "tsunami_risk": True,
    },
]


def _confidence(magnitude: float, source: SeismicSourceCode) -> tuple[ConfidenceLabel, float]:
    reference_sources = (SeismicSourceCode.USGS, SeismicSourceCode.EMSC)
    bonus = 0.08 if source in reference_sources else 0
    score = min(0.99, 0.55 + magnitude / 12 + bonus)
    if score >= 0.85:
        label = ConfidenceLabel.verified
    elif score >= 0.6:
        label = ConfidenceLabel.likely
    else:
        label = ConfidenceLabel.unconfirmed
    return label, round(score, 2)


def get_demo_events() -> list[EarthquakeEvent]:
    events: list[EarthquakeEvent] = []
    for i, seed in enumerate(_SEED_EVENTS):
        confidence, score = _confidence(seed["magnitude"], seed["source"])
        events.append(
            EarthquakeEvent(
                id=f"pc-{seed['source'].value.lower()}-{i}-{seed['external_id']}",
                externalId=seed["external_id"],
                magnitude=seed["magnitude"],
                magnitudeType=seed["magnitude_type"],
                depthKm=seed["depth_km"],
                place=seed["place"],
                city=seed["city"],
                country=seed["country"],
                countryCode=seed["country_code"],
                latitude=seed["latitude"],
                longitude=seed["longitude"],
                timeUtc=seed["time"],
                source=seed["source"],
                confidence=confidence,
                confidenceScore=score,
                felt=seed["felt"],
                tsunamiRisk=seed["tsunami_risk"],
                region=Region.caribbean,
            )
        )
    return sorted(events, key=lambda e: e.time_utc, reverse=True)


def get_demo_sources_health() -> list[SourceHealth]:
    return [
        SourceHealth(
            code=SeismicSourceCode.USGS,
            name="USGS",
            description="United States Geological Survey — Earthquake Hazards Program",
            status=SourceStatus.operational,
            latencySeconds=42,
            lastSyncUtc=_dt(hours_ago=0.05),
            region="Mondial",
        ),
        SourceHealth(
            code=SeismicSourceCode.EMSC,
            name="EMSC",
            description="European-Mediterranean Seismological Centre",
            status=SourceStatus.operational,
            latencySeconds=38,
            lastSyncUtc=_dt(hours_ago=0.08),
            region="Europe / Méditerranée / Mondial",
        ),
        SourceHealth(
            code=SeismicSourceCode.IPGP,
            name="IPGP",
            description="Institut de Physique du Globe de Paris — Réseau Antilles",
            status=SourceStatus.operational,
            latencySeconds=55,
            lastSyncUtc=_dt(hours_ago=0.12),
            region="Antilles françaises",
        ),
        SourceHealth(
            code=SeismicSourceCode.FDSN,
            name="FDSN",
            description="International Federation of Digital Seismograph Networks",
            status=SourceStatus.degraded,
            latencySeconds=210,
            lastSyncUtc=_dt(hours_ago=1.4),
            region="Réseau international",
        ),
    ]
