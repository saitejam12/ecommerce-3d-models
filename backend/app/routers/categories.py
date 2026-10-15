"""Stub routes for the public category listing.

GET /categories, GET /categories/{slug}/products -- AC-003 (unpublished
products never appear) belongs to the handler that replaces this stub, not to
this scaffold.
"""

from fastapi import APIRouter

from app.schemas import StubResponse

router = APIRouter(tags=["categories"])


@router.get("/categories", response_model=StubResponse)
async def list_categories() -> StubResponse:
    return StubResponse(endpoint="GET /categories")


@router.get("/categories/{slug}/products", response_model=StubResponse)
async def list_category_products(slug: str, page: int = 1, page_size: int = 20) -> StubResponse:
    return StubResponse(endpoint="GET /categories/{slug}/products")
