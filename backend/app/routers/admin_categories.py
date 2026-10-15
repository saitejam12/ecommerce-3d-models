"""Admin category management.

POST /admin/categories, PUT /admin/categories/{id} (rename), DELETE
/admin/categories/{id} -- the delete is blocked with a 409 naming the
products still assigned (AC-023) until every one of them has been reassigned
to a different category.
"""

from uuid import UUID

from fastapi import APIRouter, HTTPException, status
from sqlalchemy import select

from app.dependencies import DbSession, RequiredStaff
from app.models import Category, Product
from app.schemas import CategoryCreate, CategoryOut, CategoryUpdate
from app.slugs import slugify, unique_slug

router = APIRouter(prefix="/admin/categories", tags=["admin-categories"])


def _to_out(category: Category) -> CategoryOut:
    return CategoryOut.model_validate(category)


@router.post("", response_model=CategoryOut, status_code=status.HTTP_201_CREATED)
async def create_category(
    payload: CategoryCreate, staff: RequiredStaff, db: DbSession
) -> CategoryOut:
    slug = unique_slug(db, Category, slugify(payload.name))
    category = Category(name=payload.name, slug=slug)
    db.add(category)
    db.commit()
    db.refresh(category)
    return _to_out(category)


@router.put("/{id}", response_model=CategoryOut)
async def rename_category(
    id: UUID, payload: CategoryUpdate, staff: RequiredStaff, db: DbSession
) -> CategoryOut:
    category = db.get(Category, id)
    if category is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")
    category.name = payload.name
    db.add(category)
    db.commit()
    db.refresh(category)
    return _to_out(category)


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_category(id: UUID, staff: RequiredStaff, db: DbSession) -> None:
    category = db.get(Category, id)
    if category is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")

    blocking = db.scalars(select(Product).where(Product.category_id == id)).all()
    if blocking:
        names = ", ".join(p.name for p in blocking)
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Cannot delete category: still assigned to products: {names}",
        )

    db.delete(category)
    db.commit()
    return None
