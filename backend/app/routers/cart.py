"""Stub routes for the cart.

POST /cart/items, GET /cart, PATCH /cart/items/{id}, DELETE /cart/items/{id}.
Accepts either a signed-in customer or an anonymous cart session, so the
auth dependency here is optional rather than required.
"""

from fastapi import APIRouter

from app.dependencies import OptionalCustomer
from app.schemas import StubResponse

router = APIRouter(prefix="/cart", tags=["cart"])


@router.post("/items", response_model=StubResponse)
async def add_cart_item(customer: OptionalCustomer) -> StubResponse:
    return StubResponse(endpoint="POST /cart/items")


@router.get("", response_model=StubResponse)
async def get_cart(customer: OptionalCustomer) -> StubResponse:
    return StubResponse(endpoint="GET /cart")


@router.patch("/items/{id}", response_model=StubResponse)
async def update_cart_item(id: str, customer: OptionalCustomer) -> StubResponse:
    return StubResponse(endpoint="PATCH /cart/items/{id}")


@router.delete("/items/{id}", response_model=StubResponse)
async def remove_cart_item(id: str, customer: OptionalCustomer) -> StubResponse:
    return StubResponse(endpoint="DELETE /cart/items/{id}")
