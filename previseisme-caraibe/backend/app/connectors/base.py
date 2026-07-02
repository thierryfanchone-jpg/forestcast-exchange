from abc import ABC, abstractmethod
from datetime import datetime

import httpx

from app.config import Settings
from app.models.earthquake import EarthquakeEvent


class SeismicConnector(ABC):
    """Interface commune à tous les connecteurs de flux sismiques.

    Chaque connecteur tente d'interroger la source publique réelle ; en cas
    d'échec (réseau, format inattendu, source non configurée), il doit lever
    une exception — c'est l'agrégateur (services/aggregator.py) qui décide de
    retomber sur les données de démonstration, afin que l'API reste toujours
    fonctionnelle même quand une source externe est indisponible.
    """

    code: str

    def __init__(self, settings: Settings):
        self.settings = settings

    @abstractmethod
    async def fetch_events(
        self,
        *,
        start_time: datetime | None = None,
        end_time: datetime | None = None,
        min_magnitude: float | None = None,
        bbox: tuple[float, float, float, float] | None = None,
    ) -> list[EarthquakeEvent]:
        """Retourne les événements sismiques normalisés pour la période/zone donnée."""
        raise NotImplementedError

    async def _get(self, url: str, params: dict) -> httpx.Response:
        async with httpx.AsyncClient(timeout=self.settings.http_connector_timeout_seconds) as client:
            response = await client.get(url, params=params)
            response.raise_for_status()
            return response
