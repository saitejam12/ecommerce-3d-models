"""Stub routes for content pages (About/FAQ/policy).

PUT /admin/content/{slug} (staff-only edit), GET /content/{slug} (public
fetch of a published page for the footer links -- unpublished pages 404 from
the handler that replaces this stub, same rule as AC-003/AC-038).
"""

from fastapi import APIRouter

from app.dependencies import RequiredStaff
from app.schemas import StubResponse

router = APIRouter(tags=["content"])


@router.put("/admin/content/{slug}", response_model=StubResponse)
async def update_content_page(slug: str, staff: RequiredStaff) -> StubResponse:
    return StubResponse(endpoint="PUT /admin/content/{slug}")


@router.get("/content/{slug}", response_model=StubResponse)
async def get_content_page(slug: str) -> StubResponse:
    return StubResponse(endpoint="GET /content/{slug}")
