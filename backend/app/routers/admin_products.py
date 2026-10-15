"""Admin catalogue management: products, images, variants.

POST /admin/products, GET /admin/products, GET /admin/products/{id}, PUT
/admin/products/{id} store and edit the catalogue behind the staff guard
(US-001-1). POST /admin/products/{id}/images and POST
/admin/products/{id}/variants remain stubs -- image upload (US-002) and
variant management are separate tickets.
"""

from uuid import UUID

from fastapi import APIRouter, HTTPException, status
from sqlalchemy import select

from app.dependencies import DbSession, RequiredStaff
from app.models import Category, Product
from app.schemas import ProductCreate, ProductOut, ProductUpdate, StubResponse
from app.slugs import slugify, unique_slug

router = APIRouter(prefix="/admin/products", tags=["admin-products"])


def _to_out(product: Product) -> ProductOut:
    return ProductOut.model_validate(product)


def _get_category_or_422(db: DbSession, category_id: UUID) -> Category:
    category = db.get(Category, category_id)
    if category is None:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="category_id does not reference an existing category",
        )
    return category


@router.post("", response_model=ProductOut, status_code=status.HTTP_201_CREATED)
async def create_product(payload: ProductCreate, staff: RequiredStaff, db: DbSession) -> ProductOut:
    _get_category_or_422(db, payload.category_id)
    slug = unique_slug(db, Product, slugify(payload.name))
    product = Product(
        name=payload.name,
        description=payload.description or "",
        category_id=payload.category_id,
        published=payload.published,
        slug=slug,
    )
    db.add(product)
    db.commit()
    db.refresh(product)
    return _to_out(product)


@router.get("", response_model=list[ProductOut])
async def list_products(staff: RequiredStaff, db: DbSession) -> list[ProductOut]:
    products = db.scalars(select(Product)).all()
    return [_to_out(p) for p in products]


@router.get("/{id}", response_model=ProductOut)
async def get_product(id: UUID, staff: RequiredStaff, db: DbSession) -> ProductOut:
    product = db.get(Product, id)
    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return _to_out(product)


@router.put("/{id}", response_model=ProductOut)
async def edit_product(
    id: UUID, payload: ProductUpdate, staff: RequiredStaff, db: DbSession
) -> ProductOut:
    product = db.get(Product, id)
    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")

    product.name = payload.name
    if payload.description is not None:
        product.description = payload.description
    if payload.category_id is not None:
        _get_category_or_422(db, payload.category_id)
        product.category_id = payload.category_id
    if payload.published is not None:
        product.published = payload.published

    db.add(product)
    db.commit()
    db.refresh(product)
    return _to_out(product)


@router.post("/{id}/images", response_model=StubResponse)
async def upload_product_images(id: str, staff: RequiredStaff) -> StubResponse:
    return StubResponse(endpoint="POST /admin/products/{id}/images")


@router.post("/{id}/variants", response_model=StubResponse)
async def add_product_variant(id: str, staff: RequiredStaff) -> StubResponse:
    return StubResponse(endpoint="POST /admin/products/{id}/variants")
