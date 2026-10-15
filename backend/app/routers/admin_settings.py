"""Stub route for shop settings.

PUT /admin/settings -- currency, language, tax rate, postage options and the
free-postage threshold.
"""

from fastapi import APIRouter

from app.dependencies import RequiredStaff
from app.schemas import StubResponse

router = APIRouter(prefix="/admin", tags=["admin-settings"])


@router.put("/settings", response_model=StubResponse)
async def update_settings(staff: RequiredStaff) -> StubResponse:
    return StubResponse(endpoint="PUT /admin/settings")
