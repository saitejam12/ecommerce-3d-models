"""Stub routes for customer account auth.

POST /auth/register, /auth/login, /auth/password-reset/request,
/auth/password-reset/confirm. The handlers that replace these stubs issue
their tokens through `app.security.create_access_token(..., role="customer")`
so a customer session can never pass `app.dependencies.require_staff`
(AC-086).
"""

from fastapi import APIRouter, status

from app.schemas import StubResponse

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=StubResponse)
async def register() -> StubResponse:
    return StubResponse(endpoint="POST /auth/register")


@router.post("/login", response_model=StubResponse)
async def login() -> StubResponse:
    return StubResponse(endpoint="POST /auth/login")


@router.post(
    "/password-reset/request", response_model=StubResponse, status_code=status.HTTP_202_ACCEPTED
)
async def request_password_reset() -> StubResponse:
    return StubResponse(endpoint="POST /auth/password-reset/request")


@router.post("/password-reset/confirm", response_model=StubResponse)
async def confirm_password_reset() -> StubResponse:
    return StubResponse(endpoint="POST /auth/password-reset/confirm")
