"""Public category navigation and per-category product listings.

GET /categories lists only categories that have at least one published
product (AC-021), in navigation order (the order categories were created --
this scaffold has no separate sort-order column) with their current name.

GET /categories/{slug}/products returns the category's current name and only
its published products (AC-022, AC-001, AC-003) -- a category rename changes
only `Category.name`, never `Category.slug`, so the URL keeps working across
a rename.
"""

from fastapi import APIRouter, HTTPException, status

from app.catalogue_service import product_summary
from app.dependencies import DbSession
from app.models import Category, Product
from app.schemas import CategoryOut, CategoryProductsOut

router = APIRouter(tags=["categories"])


@router.get("/categories", response_model=list[CategoryOut])
async def list_categories(db: DbSession) -> list[CategoryOut]:
    categories = (
        db.query(Category)
        .filter(Category.products.any(Product.published.is_(True)))
        .order_by(Category.created_at.asc())
        .all()
    )
    return [CategoryOut(id=c.id, name=c.name, slug=c.slug) for c in categories]


@router.get("/categories/{slug}/products", response_model=CategoryProductsOut)
async def list_category_products(
    slug: str, db: DbSession, page: int = 1, page_size: int = 20
) -> CategoryProductsOut:
    category = db.query(Category).filter(Category.slug == slug).first()
    if category is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")

    query = db.query(Product).filter(
        Product.category_id == category.id, Product.published.is_(True)
    )
    total = query.count()
    products = (
        query.order_by(Product.created_at.asc())
        .offset((page - 1) * page_size)
        .limit(page_size)
        .all()
    )
    return CategoryProductsOut(
        category=CategoryOut(id=category.id, name=category.name, slug=category.slug),
        products=[product_summary(p) for p in products],
        page=page,
        page_size=page_size,
        total=total,
    )
