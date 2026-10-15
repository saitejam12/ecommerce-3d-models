"""Cart endpoints.

Auth is optional: a signed-in customer is identified by JWT, an anonymous
shopper by a cart session token -- either way the handler the development
sprint writes resolves the same `app.models.Cart`. Every handler here is a
stub; see app.routers.catalogue for what that means and why.
"""

from typing import Any

from fastapi import APIRouter

from app.schemas import StubResponse

router = APIRouter(prefix="/cart", tags=["cart"])


@router.post("/items")
async def add_cart_item(payload: dict[str, Any] | None = None) -> StubResponse:
    return StubResponse(endpoint="POST /cart/items")


@router.get("")
async def get_cart() -> StubResponse:
    return StubResponse(endpoint="GET /cart")


@router.patch("/items/{item_id}")
async def update_cart_item(item_id: str, payload: dict[str, Any] | None = None) -> StubResponse:
    return StubResponse(endpoint="PATCH /cart/items/{id}")


@router.delete("/items/{item_id}")
async def remove_cart_item(item_id: str) -> StubResponse:
    return StubResponse(endpoint="DELETE /cart/items/{id}")
