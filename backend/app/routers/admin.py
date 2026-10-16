"""Staff admin endpoints owned by the Shop API Service (component `api`):
auth, catalogue management, order queue, settings and content.

Stub handlers only -- see `app.routers.catalogue` for why. Every route below
`POST /admin/auth/login` is approved as "Staff JWT" auth: the architecture
requires that token to carry a distinct role from the customer JWT so a
customer can never reach these routes (AC-086). Enforcing that is the
development sprint's work; this module only lays out the paths, methods and
parameters the spec declares.
"""

from typing import Annotated

from fastapi import APIRouter, File, Query, UploadFile

from app.schemas import StubResponse

router = APIRouter(prefix="/admin", tags=["admin"])


@router.post("/auth/login", response_model=StubResponse)
async def admin_login(payload: dict | None = None) -> StubResponse:
    """Staff sign-in, separate from customer login."""
    return StubResponse(endpoint="POST /admin/auth/login")


@router.post("/products", response_model=StubResponse)
async def create_product(payload: dict | None = None) -> StubResponse:
    """Creates a product with name, description, category and published state."""
    return StubResponse(endpoint="POST /admin/products")


@router.put("/products/{product_id}", response_model=StubResponse)
async def update_product(product_id: str, payload: dict | None = None) -> StubResponse:
    """Edits an existing product."""
    return StubResponse(endpoint=f"PUT /admin/products/{product_id}")


@router.post("/products/{product_id}/images", response_model=list[StubResponse])
async def upload_product_images(
    product_id: str,
    files: Annotated[list[UploadFile], File()],
) -> list[StubResponse]:
    """Uploads photos to S3 (`media_store`) and attaches them. Reads
    `AWS_ACCESS_KEY_ID`/`AWS_SECRET_ACCESS_KEY`/`AWS_REGION`/`S3_BUCKET` at
    the point of use and turns uploads off with a clear message when any is
    unset, rather than failing at startup."""
    return [StubResponse(endpoint=f"POST /admin/products/{product_id}/images")]


@router.post("/products/{product_id}/variants", response_model=StubResponse)
async def create_variant(product_id: str, payload: dict | None = None) -> StubResponse:
    """Adds or edits a variant: options, price, fulfilment type, stock or lead time."""
    return StubResponse(endpoint=f"POST /admin/products/{product_id}/variants")


@router.post("/categories", response_model=StubResponse)
async def create_category(payload: dict | None = None) -> StubResponse:
    """Creates a category."""
    return StubResponse(endpoint="POST /admin/categories")


@router.patch("/categories/{category_id}", response_model=StubResponse)
async def rename_category(category_id: str, payload: dict | None = None) -> StubResponse:
    """Renames a category."""
    return StubResponse(endpoint=f"PATCH /admin/categories/{category_id}")


@router.delete("/categories/{category_id}", response_model=StubResponse)
async def delete_category(category_id: str) -> StubResponse:
    """Deletes a category; blocked while products are assigned to it."""
    return StubResponse(endpoint=f"DELETE /admin/categories/{category_id}")


@router.get("/orders", response_model=list[StubResponse])
async def list_admin_orders(
    status: str | None = Query(default=None),
    q: str | None = Query(default=None),
    page: int = Query(default=1, ge=1),
) -> list[StubResponse]:
    """Orders filtered by status and/or reference/email search, newest first."""
    return [StubResponse(endpoint="GET /admin/orders")]


@router.post("/orders/{order_id}/status", response_model=StubResponse)
async def advance_order_status(order_id: str, payload: dict | None = None) -> StubResponse:
    """Advances an order along paid -> printing -> packed -> shipped with
    validated transitions."""
    return StubResponse(endpoint=f"POST /admin/orders/{order_id}/status")


@router.post("/orders/{order_id}/refund", response_model=StubResponse)
async def refund_order(order_id: str) -> StubResponse:
    """Issues a full Stripe refund. Reads `STRIPE_SECRET_KEY` at the point of
    use and refuses with a clear message when it is unset, rather than
    failing at startup."""
    return StubResponse(endpoint=f"POST /admin/orders/{order_id}/refund")


@router.post("/orders/{order_id}/emails/{email_type}/resend", status_code=202)
async def resend_order_email(order_id: str, email_type: str) -> dict[str, str]:
    """Queues a transactional email resend. Reads `SENDGRID_API_KEY` at the
    point of use and refuses with a clear message when it is unset, rather
    than failing at startup."""
    return {"status": "accepted"}


@router.put("/settings", response_model=StubResponse)
async def update_settings(payload: dict | None = None) -> StubResponse:
    """Configures currency, language, tax rate, postage options and the
    free-postage threshold."""
    return StubResponse(endpoint="PUT /admin/settings")


@router.put("/content/{slug}", response_model=StubResponse)
async def update_content_page(slug: str, payload: dict | None = None) -> StubResponse:
    """Edits an About/FAQ/policy page."""
    return StubResponse(endpoint=f"PUT /admin/content/{slug}")
