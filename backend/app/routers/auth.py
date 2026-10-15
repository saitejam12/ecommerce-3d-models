"""Customer account auth: register, login, password reset.

Issues customer JWTs via app.security (role "customer"), distinct from the
staff JWTs app.routers.admin issues, so a customer token never grants admin
access (architecture note, AC-086). Every handler here is a stub; see
app.routers.catalogue for what that means and why.
"""

from typing import Any

from fastapi import APIRouter, status

from app.schemas import StubResponse

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register")
async def register(payload: dict[str, Any] | None = None) -> StubResponse:
    return StubResponse(endpoint="POST /auth/register")


@router.post("/login")
async def login(payload: dict[str, Any] | None = None) -> StubResponse:
    return StubResponse(endpoint="POST /auth/login")


@router.post("/password-reset/request", status_code=status.HTTP_202_ACCEPTED)
async def request_password_reset(payload: dict[str, Any] | None = None) -> StubResponse:
    return StubResponse(endpoint="POST /auth/password-reset/request")


@router.post("/password-reset/confirm")
async def confirm_password_reset(payload: dict[str, Any] | None = None) -> StubResponse:
    return StubResponse(endpoint="POST /auth/password-reset/confirm")
