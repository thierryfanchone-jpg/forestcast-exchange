from unittest.mock import AsyncMock

import pytest
from fastapi.testclient import TestClient

from app.connectors.demo_data import get_demo_events
from app.main import app

client = TestClient(app)


@pytest.fixture(autouse=True)
def mock_connectors(monkeypatch):
    """Les connecteurs réels appellent des services externes (USGS, EMSC,
    IPGP, FDSN) : dans les tests, on force l'agrégateur à retomber sur les
    données de démonstration pour rester rapide et déterministe."""

    async def _raise(*args, **kwargs):
        raise RuntimeError("source externe indisponible dans l'environnement de test")

    modules = ["usgs.UsgsConnector", "emsc.EmscConnector", "ipgp.IpgpConnector", "fdsn.FdsnConnector"]
    for module in modules:
        mod_name, cls_name = module.split(".")
        target = f"app.connectors.{mod_name}.{cls_name}.fetch_events"
        monkeypatch.setattr(target, AsyncMock(side_effect=_raise))


def test_list_events_falls_back_to_demo_data():
    response = client.get("/v1/events")
    assert response.status_code == 200
    body = response.json()
    assert len(body) == len(get_demo_events())


def test_list_events_filters_by_min_magnitude():
    response = client.get("/v1/events", params={"min_magnitude": 6})
    assert response.status_code == 200
    body = response.json()
    assert all(event["magnitude"] >= 6 for event in body)


def test_get_event_by_id_returns_404_for_unknown_event():
    response = client.get("/v1/events/does-not-exist")
    assert response.status_code == 404


def test_get_event_by_id_returns_known_event():
    known_id = get_demo_events()[0].id
    response = client.get(f"/v1/events/{known_id}")
    assert response.status_code == 200
    assert response.json()["id"] == known_id


def test_sources_health_returns_four_sources():
    response = client.get("/v1/sources/health")
    assert response.status_code == 200
    body = response.json()
    assert {s["code"] for s in body} == {"USGS", "EMSC", "IPGP", "FDSN"}


def test_felt_report_creation():
    response = client.post(
        "/v1/felt-reports",
        json={
            "event_id": "pc-usgs-0-us7000pcar",
            "intensity_perceived": 5,
            "latitude": 18.4,
            "longitude": -72.6,
        },
    )
    assert response.status_code == 201
    assert response.json()["status"] == "received"


def test_auth_token_requires_credentials():
    response = client.post("/v1/auth/token", json={"email": "", "password": ""})
    assert response.status_code == 400


def test_auth_token_issues_demo_token():
    response = client.post("/v1/auth/token", json={"email": "demo@example.com", "password": "demo1234"})
    assert response.status_code == 200
    assert response.json()["token_type"] == "bearer"
