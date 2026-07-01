from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_list_events_returns_data_even_offline():
    """En environnement sans accès sortant vers USGS/EMSC, l'API doit
    retomber sur les données de démonstration plutôt que renvoyer une erreur
    ou une liste vide silencieuse."""
    response = client.get("/api/v1/events")
    assert response.status_code == 200
    events = response.json()
    assert isinstance(events, list)
    assert len(events) > 0
    first = events[0]
    assert "magnitude" in first
    assert "contributing_sources" in first


def test_list_events_filters_by_region():
    response = client.get("/api/v1/events", params={"region": "caraibes"})
    assert response.status_code == 200
    for event in response.json():
        assert event["region"] == "caraibes"


def test_list_events_filters_by_min_magnitude():
    response = client.get("/api/v1/events", params={"min_magnitude": 5})
    assert response.status_code == 200
    for event in response.json():
        assert event["magnitude"] >= 5


def test_get_single_event_not_found():
    response = client.get("/api/v1/events/does-not-exist")
    assert response.status_code == 200
    assert response.json() is None


def test_sources_health_endpoint():
    response = client.get("/api/v1/sources/health")
    assert response.status_code == 200
    sources = response.json()
    assert len(sources) == 3
    codes = {s["source_code"] for s in sources}
    assert codes == {"usgs", "emsc", "ipgp_ovsm"}


def test_submit_felt_report():
    response = client.post(
        "/api/v1/felt-reports",
        json={"latitude": 14.6, "longitude": -61.0, "intensity_perceived": 4},
    )
    assert response.status_code == 201
    assert response.json()["status"] == "received"
