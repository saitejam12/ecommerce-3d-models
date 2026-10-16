"""Admin product create/edit routes and the public product/catalogue read
routes (US-001-1).

Public routes never return an unpublished product in any shape: they filter
on `Product.published` at the query level, not by hiding fields after the
fact, so an unpublished product simply does not match.
"""

import re
import uuid

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app import models
from app.database import get_db
from app.schemas import ProductCreate, ProductOut, ProductUpdate
from app.security import require_staff

admin_router = APIRouter(prefix="/admin/products", tags=["admin-products"])
public_router = APIRouter(tags=["catalogue"])


def _slugify(text: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    return slug or uuid.uuid4().hex[:8]


def _unique_product_slug(db: Session, name: str, *, exclude_id: str | None = None) -> str:
    base = _slugify(name)
    slug = base
    suffix = 1
    while True:
        query = db.query(models.Product).filter(models.Product.slug == slug)
        if exclude_id is not None:
            query = query.filter(models.Product.id != exclude_id)
        if query.first() is None:
            return slug
        suffix += 1
        slug = f"{base}-{suffix}"


def _get_category_or_422(db: Session, category_id: str) -> models.Category:
    category = db.query(models.Category).filter(models.Category.id == category_id).first()
    if category is None:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=[
                {
                    "loc": ["body", "category_id"],
                    "msg": "category_id does not reference an existing category",
                    "type": "value_error",
                }
            ],
        )
    return category


# --- admin (staff-only) routes -------------------------------------------------


@admin_router.post("", response_model=ProductOut, status_code=status.HTTP_201_CREATED)
def create_product(
    payload: ProductCreate,
    staff: models.StaffUser = Depends(require_staff),  # noqa: B008
    db: Session = Depends(get_db),  # noqa: B008
) -> models.Product:
    if payload.category_id:
        _get_category_or_422(db, payload.category_id)

    product = models.Product(
        name=payload.name,
        slug=_unique_product_slug(db, payload.name),
        description=payload.description,
        category_id=payload.category_id,
        published=payload.published,
    )
    db.add(product)
    db.commit()
    db.refresh(product)
    return product


@admin_router.get("/{product_id}", response_model=ProductOut)
def get_admin_product(
    product_id: str,
    staff: models.StaffUser = Depends(require_staff),  # noqa: B008
    db: Session = Depends(get_db),  # noqa: B008
) -> models.Product:
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return product


def _apply_update(db: Session, product: models.Product, payload: ProductUpdate) -> models.Product:
    if payload.category_id is not None:
        _get_category_or_422(db, payload.category_id)
        product.category_id = payload.category_id
    if payload.name is not None:
        product.name = payload.name
        product.slug = _unique_product_slug(db, payload.name, exclude_id=product.id)
    if payload.description is not None:
        product.description = payload.description
    if payload.published is not None:
        product.published = payload.published

    db.commit()
    db.refresh(product)
    return product


@admin_router.put("/{product_id}", response_model=ProductOut)
def replace_product(
    product_id: str,
    payload: ProductUpdate,
    staff: models.StaffUser = Depends(require_staff),  # noqa: B008
    db: Session = Depends(get_db),  # noqa: B008
) -> models.Product:
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return _apply_update(db, product, payload)


@admin_router.patch("/{product_id}", response_model=ProductOut)
def update_product(
    product_id: str,
    payload: ProductUpdate,
    staff: models.StaffUser = Depends(require_staff),  # noqa: B008
    db: Session = Depends(get_db),  # noqa: B008
) -> models.Product:
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return _apply_update(db, product, payload)


# --- public (unauthenticated) read routes --------------------------------------


@public_router.get("/products/{slug}", response_model=ProductOut)
def get_product(slug: str, db: Session = Depends(get_db)) -> models.Product:  # noqa: B008
    product = (
        db.query(models.Product)
        .filter(models.Product.slug == slug, models.Product.published.is_(True))
        .first()
    )
    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return product


@public_router.get("/categories/{slug}/products", response_model=list[ProductOut])
def list_category_products(slug: str, db: Session = Depends(get_db)) -> list[models.Product]:  # noqa: B008
    category = db.query(models.Category).filter(models.Category.slug == slug).first()
    if category is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")

    return (
        db.query(models.Product)
        .filter(models.Product.category_id == category.id, models.Product.published.is_(True))
        .all()
    )


@public_router.get("/search", response_model=list[ProductOut])
def search_products(
    q: str = Query(default=""),
    db: Session = Depends(get_db),  # noqa: B008
) -> list[models.Product]:
    query = db.query(models.Product).filter(models.Product.published.is_(True))
    if q:
        query = query.filter(models.Product.name.ilike(f"%{q}%"))
    return query.all()
