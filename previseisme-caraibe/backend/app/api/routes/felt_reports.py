import logging
import uuid

from fastapi import APIRouter, status

from app.models.schemas import FeltReportInput

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/felt-reports", tags=["felt-reports"])


@router.post("", status_code=status.HTTP_201_CREATED)
async def submit_felt_report(report: FeltReportInput) -> dict:
    """Enregistre un signalement citoyen « J'ai ressenti ce séisme ».

    En V1, cette route journalise le signalement ; la persistance en base
    (table `felt_report`, voir docs/previsisme-caraibe/04-modele-donnees-et-schema-bdd.md)
    et le rattachement automatique à un `SeismicEvent` proche sont à connecter
    à une base PostgreSQL/PostGIS réelle (docker-compose fournit le service).
    """
    report_id = str(uuid.uuid4())
    logger.info("Nouveau signalement ressenti %s: %s", report_id, report.model_dump())
    return {"id": report_id, "status": "received"}
