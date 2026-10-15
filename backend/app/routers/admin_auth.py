"""Stub route for staff sign-in.

POST /admin/auth/login -- separate from customer login (AC-086): the handler
that replaces this stub issues its token through
`app.security.create_access_token(..., role="staff")`.
"""

from fastapi import APIRouter

from app.schemas import StubResponse

router = APIRouter(prefix="/admin/auth", tags=["admin-auth"])


@router.post("/login", response_model=StubResponse)
async def admin_login() -> StubResponse:
    return StubResponse(endpoint="POST /admin/auth/login")
