"""Cart endpoints owned by the Shop API Service (component `api`).

Stub handlers only -- see `app.routers.catalogue` for why. Auth here is
"optional JWT or cart session" per the API spec: a signed-in customer's cart
and an anonymous shopper's cart are the same shape, resolved from either a
`Authorization` header or a cart session identifier. Reading that identifier
and loading/creating the cart it names is the development sprint's work.
"""

from fastapi import APIRouter

from app.schemas import StubResponse

router = APIRouter(prefix="/cart", tags=["cart"])


@router.post("/items", response_model=StubResponse)
async def add_cart_item(payload: dict | None = None) -> StubResponse:
    """Adds a variant and quantity, capping at available stock."""
    return StubResponse(endpoint="POST /cart/items")


@router.get("", response_model=StubResponse)
async def get_cart() -> StubResponse:
    """Current cart with line details, subtotal and longest lead time."""
    return StubResponse(endpoint="GET /cart")


@router.patch("/items/{item_id}", response_model=StubResponse)
async def update_cart_item(item_id: str, payload: dict | None = None) -> StubResponse:
    """Changes a line's quantity, re-validated against stock."""
    return StubResponse(endpoint=f"PATCH /cart/items/{item_id}")


@router.delete("/items/{item_id}", response_model=StubResponse)
async def remove_cart_item(item_id: str) -> StubResponse:
    """Removes a cart line."""
    return StubResponse(endpoint=f"DELETE /cart/items/{item_id}")
