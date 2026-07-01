from datetime import UTC, datetime, timedelta

from app.models.schemas import ContributingSource, SeismicEvent

"""Données de démonstration réalistes — même principe que le frontend
(voir frontend/src/lib/demo-data.ts) : utilisées uniquement lorsque les
connecteurs réels ne renvoient aucune donnée (ex. IPGP non encore
partenaire, pas d'accès réseau sortant en environnement fermé), jamais
présentées comme des données officielles sans l'être."""


def _minutes_ago(minutes: float) -> datetime:
    return datetime.now(tz=UTC) - timedelta(minutes=minutes)


def _usgs_source(external_id: str, primary: bool = False) -> ContributingSource:
    return ContributingSource(source_code="usgs", source_name="USGS", external_id=external_id, is_primary_source=primary)


def _ipgp_source(external_id: str) -> ContributingSource:
    return ContributingSource(
        source_code="ipgp_ovsm", source_name="IPGP / OVSM", external_id=external_id, is_primary_source=True
    )


def get_demo_events() -> list[SeismicEvent]:
    raw = [
        dict(
            id="demo-mtq-1", magnitude=4.8, magnitude_type="Mw", latitude=14.62, longitude=-60.85,
            depth_km=32, place_description="14 km à l'est du Vauclin, Martinique", country_iso3="MTQ",
            country_name="Martinique", region="caraibes", minutes_ago=18, felt_report_count=142,
            sources=[_ipgp_source("ovsm-demo-1"), _usgs_source("us7000demo1")],
        ),
        dict(
            id="demo-hti-1", magnitude=5.4, magnitude_type="Mw", latitude=18.45, longitude=-73.02,
            depth_km=14, place_description="22 km au sud-ouest de Léogâne, Haïti", country_iso3="HTI",
            country_name="Haïti", region="caraibes", minutes_ago=245, felt_report_count=512,
            sources=[_usgs_source("us7000demo2", primary=True)],
        ),
        dict(
            id="demo-pri-1", magnitude=4.6, magnitude_type="Mw", latitude=17.97, longitude=-66.86,
            depth_km=10, place_description="8 km au sud de Ponce, Porto Rico", country_iso3="PRI",
            country_name="Porto Rico", region="caraibes", minutes_ago=75, felt_report_count=89,
            sources=[_usgs_source("us7000demo3", primary=True)],
        ),
        dict(
            id="demo-jpn-1", magnitude=6.1, magnitude_type="Mw", latitude=38.3, longitude=142.4,
            depth_km=28, place_description="112 km à l'est de Sendai, Japon", country_iso3="JPN",
            country_name="Japon", region="monde", minutes_ago=95, felt_report_count=980,
            sources=[_usgs_source("us7000demo4", primary=True)],
        ),
        dict(
            id="demo-usa-1", magnitude=4.4, magnitude_type="Mw", latitude=34.1, longitude=-118.3,
            depth_km=9, place_description="6 km au nord-est de Los Angeles, Californie, États-Unis",
            country_iso3="USA", country_name="États-Unis", region="monde", minutes_ago=15,
            felt_report_count=1250, sources=[_usgs_source("us7000demo5", primary=True)],
        ),
    ]

    events: list[SeismicEvent] = []
    for item in raw:
        confidence_score = 0.91 if len(item["sources"]) >= 2 else 0.68
        confidence_label = "confirme_multi_source" if len(item["sources"]) >= 2 else "moyen"
        event_time = _minutes_ago(item["minutes_ago"])
        events.append(
            SeismicEvent(
                id=item["id"],
                magnitude=item["magnitude"],
                magnitude_type=item["magnitude_type"],
                latitude=item["latitude"],
                longitude=item["longitude"],
                depth_km=item["depth_km"],
                place_description=item["place_description"],
                country_iso3=item["country_iso3"],
                country_name=item["country_name"],
                region=item["region"],
                event_time_utc=event_time,
                first_detected_at_utc=event_time,
                published_at_utc=event_time,
                confidence_score=confidence_score,
                confidence_label=confidence_label,
                felt_report_count=item["felt_report_count"],
                contributing_sources=item["sources"],
            )
        )
    return events
