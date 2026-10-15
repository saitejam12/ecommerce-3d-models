"""Stub routes for admin catalogue management: products, images, variants.

POST /admin/products, PUT /admin/products/{id}, POST
/admin/products/{id}/images, POST /admin/products/{id}/variants. The image
upload handler reads S3 through `app.integrations.s3_client` and turns upload
off with a clear message when AWS_* / S3_BUCKET are empty (US-002).
"""

from fastapi import APIRouter

from app.dependencies import RequiredStaff
from app.schemas import StubResponse

router = APIRouter(prefix="/admin/products", tags=["admin-products"])


@router.post("", response_model=StubResponse)
async def create_product(staff: RequiredStaff) -> StubResponse:
    return StubResponse(endpoint="POST /admin/products")


@router.put("/{id}", response_model=StubResponse)
async def edit_product(id: str, staff: RequiredStaff) -> StubResponse:
    return StubResponse(endpoint="PUT /admin/products/{id}")


@router.post("/{id}/images", response_model=StubResponse)
async def upload_product_images(id: str, staff: RequiredStaff) -> StubResponse:
    return StubResponse(endpoint="POST /admin/products/{id}/images")


@router.post("/{id}/variants", response_model=StubResponse)
async def add_product_variant(id: str, staff: RequiredStaff) -> StubResponse:
    return StubResponse(endpoint="POST /admin/products/{id}/variants")
