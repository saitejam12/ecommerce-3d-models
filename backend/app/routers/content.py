"""Public fetch of a published content page (About/FAQ/policy) for the
storefront footer. Editing is a staff-only route; see app.routers.admin.
Every handler here is a stub; see app.routers.catalogue for what that means
and why.
"""

from fastapi import APIRouter

from app.schemas import StubResponse

router = APIRouter(tags=["content"])


@router.get("/content/{slug}")
async def get_content_page(slug: str) -> StubResponse:
    return StubResponse(endpoint="GET /content/{slug}")
