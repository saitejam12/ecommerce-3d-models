"""Stub routes for admin category management.

POST /admin/categories, PATCH /admin/categories/{id} (rename), DELETE
/admin/categories/{id} (blocked while products are assigned -- the
development sprint's handler enforces that, not this scaffold).
"""

from fastapi import APIRouter

from app.dependencies import RequiredStaff
from app.schemas import StubResponse

router = APIRouter(prefix="/admin/categories", tags=["admin-categories"])


@router.post("", response_model=StubResponse)
async def create_category(staff: RequiredStaff) -> StubResponse:
    return StubResponse(endpoint="POST /admin/categories")


@router.patch("/{id}", response_model=StubResponse)
async def rename_category(id: str, staff: RequiredStaff) -> StubResponse:
    return StubResponse(endpoint="PATCH /admin/categories/{id}")


@router.delete("/{id}", response_model=StubResponse)
async def delete_category(id: str, staff: RequiredStaff) -> StubResponse:
    return StubResponse(endpoint="DELETE /admin/categories/{id}")
