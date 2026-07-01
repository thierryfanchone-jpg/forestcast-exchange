from datetime import UTC, datetime

from app.core.config import Settings
from app.connectors.base import SeismicSourceConnector
from app.models.schemas import SeismicEvent, SourceHealth


class IPGPConnector(SeismicSourceConnector):
    """Connecteur IPGP / Observatoire Volcanologique et Sismologique de Martinique.

    ÉTAT ACTUEL : l'IPGP ne publie pas (à la connaissance de ce projet) d'API
    publique stable et documentée équivalente au FDSN Event Web Service de
    l'USGS/EMSC. Ce connecteur est un point d'extension prêt à recevoir un
    flux réel dès qu'un partenariat formel sera établi avec l'IPGP/OVSM
    (voir docs/previsisme-caraibe/11-trajectoire-alerte-precoce.md §11.3).

    Tant que `settings.ipgp_base_url` n'est pas configuré, ce connecteur
    renvoie une liste vide plutôt que d'inventer des données — conformément
    au principe fondateur du projet (aucune donnée inventée).
    """

    source_code = "ipgp_ovsm"
    source_name = "IPGP / OVSM"

    def __init__(self, settings: Settings):
        self._settings = settings

    async def fetch_recent(self, since: datetime | None = None) -> list[SeismicEvent]:
        if not self._settings.ipgp_base_url:
            return []
        # TODO(partenariat IPGP) : implémenter l'appel réel une fois l'accès
        # aux données IPGP/OVSM formalisé (format à confirmer avec l'observatoire :
        # QuakeML, CSV, ou API dédiée).
        return []

    async def health_check(self) -> SourceHealth:
        configured = bool(self._settings.ipgp_base_url)
        return SourceHealth(
            source_code="ipgp_ovsm",
            source_name=self.source_name,
            status="down" if not configured else "degraded",
            latency_ms=None,
            last_event_received_at=None if not configured else datetime.now(tz=UTC),
        )
