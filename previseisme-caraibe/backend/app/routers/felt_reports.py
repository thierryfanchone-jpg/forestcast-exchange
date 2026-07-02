from fastapi import APIRouter

from app.models.earthquake import FeltReportCreate

router = APIRouter(tags=["felt-reports"])


@router.post("/felt-reports", status_code=201)
async def create_felt_report(report: FeltReportCreate) -> dict:
    # En production : persistance dans la table felt_report (voir
    # docs/previsisme-caraibe/04-modele-donnees-et-schema-bdd.md).
    return {"status": "received", "eventId": report.event_id}
