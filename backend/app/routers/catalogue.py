"""Catalogue browsing: categories, category listings, product detail, search.

Public, unauthenticated endpoints -- the approved API spec requires no auth
here, and an unpublished product returns 404 from every one of them
(AC-003, AC-038). Every handler is a stub: it declares the route, its path
and query parameters, and returns a typed placeholder, so the OpenAPI document
is complete and the frontend can be built against the agreed shape before the
development sprint implements the handler against app.models.
"""

from fastapi import APIRouter

from app.schemas import StubResponse

router = APIRouter(tags=["catalogue"])


@router.get("/categories")
async def list_categories() -> StubResponse:
    return StubResponse(endpoint="GET /categories")


@router.get("/categories/{slug}/products")
async def list_category_products(slug: str, page: int = 1, page_size: int = 20) -> StubResponse:
    return StubResponse(endpoint="GET /categories/{slug}/products")


@router.get("/products/{slug}")
async def get_product(slug: str) -> StubResponse:
    return StubResponse(endpoint="GET /products/{slug}")


@router.get("/search")
async def search_products(q: str = "", page: int = 1) -> StubResponse:
    return StubResponse(endpoint="GET /search")
