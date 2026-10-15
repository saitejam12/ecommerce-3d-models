"""Stub routes for the public product detail and search.

GET /products/{slug}, GET /search -- AC-038 (unpublished products return 404)
belongs to the handler that replaces this stub, not to this scaffold.
"""

from fastapi import APIRouter

from app.schemas import StubResponse

router = APIRouter(tags=["products"])


@router.get("/products/{slug}", response_model=StubResponse)
async def get_product(slug: str) -> StubResponse:
    return StubResponse(endpoint="GET /products/{slug}")


@router.get("/search", response_model=StubResponse)
async def search_products(q: str = "", page: int = 1) -> StubResponse:
    return StubResponse(endpoint="GET /search")
