import time

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.config import get_settings

router = APIRouter(prefix="/auth", tags=["auth"])


class TokenRequest(BaseModel):
    email: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int


@router.post("/token", response_model=TokenResponse)
async def issue_token(payload: TokenRequest) -> TokenResponse:
    """Émission de jeton de démonstration.

    En production, ce endpoint délègue à un fournisseur OIDC/OAuth2
    (Keycloak ou équivalent — voir docs/previsisme-caraibe/02-architecture-systeme.md)
    et ne gère jamais les mots de passe directement.
    """
    if not payload.email or not payload.password:
        raise HTTPException(status_code=400, detail="Identifiants requis")

    settings = get_settings()
    fake_token = f"demo.{int(time.time())}.{payload.email}"
    return TokenResponse(access_token=fake_token, expires_in=settings.jwt_expires_minutes * 60)
