"""Public product detail and search.

GET /products/{slug} returns the current name/description (AC-002) of a
published product and 404s for an unpublished one or an unknown slug
(AC-003).

GET /search matches published products by name or description only (no
category name, no variant options) and never returns an unpublished product
(AC-003).
"""

from fastapi import APIRouter, HTTPException, status
from sqlalchemy import or_

from app.catalogue_service import product_detail, product_summary
from app.dependencies import DbSession
from app.models import Product
from app.schemas import ProductDetail, SearchResults

router = APIRouter(tags=["products"])


@router.get("/products/{slug}", response_model=ProductDetail)
async def get_product(slug: str, db: DbSession) -> ProductDetail:
    product = (
        db.query(Product)
        .filter(Product.slug == slug, Product.published.is_(True))
        .first()
    )
    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return product_detail(product)


@router.get("/search", response_model=SearchResults)
async def search_products(
    db: DbSession, q: str = "", page: int = 1, page_size: int = 20
) -> SearchResults:
    query = db.query(Product).filter(Product.published.is_(True))
    if q:
        like = f"%{q}%"
        query = query.filter(or_(Product.name.ilike(like), Product.description.ilike(like)))

    total = query.count()
    products = (
        query.order_by(Product.created_at.asc())
        .offset((page - 1) * page_size)
        .limit(page_size)
        .all()
    )
    return SearchResults(
        query=q,
        page=page,
        page_size=page_size,
        results=[product_summary(p) for p in products],
        total=total,
    )
