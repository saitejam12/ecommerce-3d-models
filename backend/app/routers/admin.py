"""Staff admin: catalogue management, order queue, settings and content.

Every route except `POST /admin/auth/login` requires a staff JWT (see
app.security, role "staff"), separate from the customer JWT
app.routers.auth issues. `POST /admin/products/{id}/images` is where
app.integrations.s3_client comes in: call `is_configured()` before uploading
and return `s3_client.DISABLED_MESSAGE` when AWS/S3 keys are not set yet.
`POST /admin/orders/{id}/refund` is where app.integrations.stripe_client
comes in, the same way. Every handler here is a stub; see
app.routers.catalogue for what that means and why.
"""

from typing import Any

from fastapi import APIRouter, UploadFile

from app.schemas import StubResponse

router = APIRouter(prefix="/admin", tags=["admin"])


@router.post("/auth/login")
async def admin_login(payload: dict[str, Any] | None = None) -> StubResponse:
    return StubResponse(endpoint="POST /admin/auth/login")


@router.post("/products")
async def create_product(payload: dict[str, Any] | None = None) -> StubResponse:
    return StubResponse(endpoint="POST /admin/products")


@router.put("/products/{product_id}")
async def update_product(product_id: str, payload: dict[str, Any] | None = None) -> StubResponse:
    return StubResponse(endpoint="PUT /admin/products/{id}")


@router.post("/products/{product_id}/images")
async def upload_product_images(
    product_id: str,
    files: list[UploadFile] | None = None,
) -> StubResponse:
    return StubResponse(endpoint="POST /admin/products/{id}/images")


@router.post("/products/{product_id}/variants")
async def create_variant(product_id: str, payload: dict[str, Any] | None = None) -> StubResponse:
    return StubResponse(endpoint="POST /admin/products/{id}/variants")


@router.post("/categories")
async def create_category(payload: dict[str, Any] | None = None) -> StubResponse:
    return StubResponse(endpoint="POST /admin/categories")


@router.patch("/categories/{category_id}")
async def rename_category(
    category_id: str,
    payload: dict[str, Any] | None = None,
) -> StubResponse:
    return StubResponse(endpoint="PATCH /admin/categories/{id}")


@router.delete("/categories/{category_id}")
async def delete_category(category_id: str) -> StubResponse:
    # Blocked while products are assigned to the category -- the development
    # sprint's validation, not this stub's.
    return StubResponse(endpoint="DELETE /admin/categories/{id}")


@router.get("/orders")
async def list_admin_orders(
    status: str | None = None,
    q: str | None = None,
    page: int = 1,
) -> StubResponse:
    return StubResponse(endpoint="GET /admin/orders")


@router.post("/orders/{order_id}/status")
async def advance_order_status(
    order_id: str,
    payload: dict[str, Any] | None = None,
) -> StubResponse:
    return StubResponse(endpoint="POST /admin/orders/{id}/status")


@router.post("/orders/{order_id}/refund")
async def refund_order(order_id: str) -> StubResponse:
    return StubResponse(endpoint="POST /admin/orders/{id}/refund")


@router.post("/orders/{order_id}/emails/{email_type}/resend")
async def resend_order_email(order_id: str, email_type: str) -> StubResponse:
    return StubResponse(endpoint="POST /admin/orders/{id}/emails/{type}/resend")


@router.put("/settings")
async def update_settings(payload: dict[str, Any] | None = None) -> StubResponse:
    return StubResponse(endpoint="PUT /admin/settings")


@router.put("/content/{slug}")
async def update_content_page(slug: str, payload: dict[str, Any] | None = None) -> StubResponse:
    return StubResponse(endpoint="PUT /admin/content/{slug}")
