from abc import ABC, abstractmethod
from datetime import datetime

from app.models.schemas import SeismicEvent, SourceHealth


class SeismicSourceConnector(ABC):
    """Interface commune à tous les connecteurs de sources sismiques.

    Voir docs/previsisme-caraibe/03-integration-sources-sismiques.md §3.1.
    Aucune logique métier (fusion, alerte) ne doit connaître le format natif
    d'une source : chaque connecteur produit exclusivement des `SeismicEvent`
    au format canonique.
    """

    source_code: str
    source_name: str

    @abstractmethod
    async def fetch_recent(self, since: datetime | None = None) -> list[SeismicEvent]:
        """Récupère les événements récents (polling)."""
        raise NotImplementedError

    async def health_check(self) -> SourceHealth:
        """Implémentation par défaut : à surcharger pour une vérification réelle
        (latence de la requête, dernier événement effectivement reçu)."""
        return SourceHealth(
            source_code=self.source_code,  # type: ignore[arg-type]
            source_name=self.source_name,
            status="down",
            latency_ms=None,
            last_event_received_at=None,
        )
