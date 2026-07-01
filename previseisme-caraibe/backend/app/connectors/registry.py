from functools import lru_cache

from app.connectors.base import SeismicSourceConnector
from app.connectors.emsc import EMSCConnector
from app.connectors.ipgp import IPGPConnector
from app.connectors.usgs import USGSConnector
from app.core.config import Settings, get_settings


@lru_cache
def get_connectors() -> list[SeismicSourceConnector]:
    """Registre des connecteurs actifs.

    Ajouter un nouvel observatoire national (ex. UWI Seismic Research Centre)
    revient à instancier ici un `GenericFDSNConnector` supplémentaire — voir
    docs/previsisme-caraibe/03-integration-sources-sismiques.md §3.5.
    """
    settings: Settings = get_settings()
    return [
        USGSConnector(settings),
        EMSCConnector(settings),
        IPGPConnector(settings),
    ]
