"""Public catalogue, search and content endpoints owned by the Shop API
Service (component `api`).

Every handler here is a stub: it accepts the path, method and parameters the
approved API spec declares and returns the typed placeholder
`app.schemas.StubResponse`, so the OpenAPI document is complete and the
frontend has a real contract to build against before a single handler does
real work. Implementing the behaviour -- querying `app.models`, honouring
"unpublished products return 404" (AC-003, AC-038) -- is the development
sprint's work, one ticket at a time.
"""

from fastapi import APIRouter, Query

from app.schemas import StubResponse

router = APIRouter(tags=["catalogue"])


@router.get("/categories", response_model=list[StubResponse])
async def list_categories() -> list[StubResponse]:
    """Categories with at least one published product. Public, no auth."""
    return [StubResponse(endpoint="GET /categories")]


@router.get("/categories/{slug}/products", response_model=StubResponse)
async def list_category_products(
    slug: str,
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
) -> StubResponse:
    """Paged published products in a category. Public, no auth."""
    return StubResponse(endpoint=f"GET /categories/{slug}/products")


@router.get("/products/{slug}", response_model=StubResponse)
async def get_product(slug: str) -> StubResponse:
    """Gallery, description and variants. Public, no auth; 404 when the
    product is not published (AC-003)."""
    return StubResponse(endpoint=f"GET /products/{slug}")


@router.get("/search", response_model=StubResponse)
async def search_products(
    q: str = Query(default=""), page: int = Query(default=1, ge=1)
) -> StubResponse:
    """Full-text search of published products by name/description. Public, no auth."""
    return StubResponse(endpoint="GET /search")


@router.get("/content/{slug}", response_model=StubResponse)
async def get_content_page(slug: str) -> StubResponse:
    """Published content page for the footer links. Public, no auth; 404 when
    unpublished."""
    return StubResponse(endpoint=f"GET /content/{slug}")
