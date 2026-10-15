"""Stub routes for the signed-in customer's account.

GET /account/orders, GET /account/orders/{reference}, and the
list/create/update/delete of /account/addresses. Every route here requires a
customer JWT -- refusing another customer's order (AC on order detail) is the
development sprint's handler, not this scaffold.
"""

from fastapi import APIRouter

from app.dependencies import RequiredCustomer
from app.schemas import StubResponse

router = APIRouter(prefix="/account", tags=["account"])


@router.get("/orders", response_model=StubResponse)
async def list_my_orders(customer: RequiredCustomer) -> StubResponse:
    return StubResponse(endpoint="GET /account/orders")


@router.get("/orders/{reference}", response_model=StubResponse)
async def get_my_order(reference: str, customer: RequiredCustomer) -> StubResponse:
    return StubResponse(endpoint="GET /account/orders/{reference}")


@router.get("/addresses", response_model=StubResponse)
async def list_my_addresses(customer: RequiredCustomer) -> StubResponse:
    return StubResponse(endpoint="GET /account/addresses")


@router.post("/addresses", response_model=StubResponse)
async def add_my_address(customer: RequiredCustomer) -> StubResponse:
    return StubResponse(endpoint="POST /account/addresses")


@router.patch("/addresses/{id}", response_model=StubResponse)
async def update_my_address(id: str, customer: RequiredCustomer) -> StubResponse:
    return StubResponse(endpoint="PATCH /account/addresses/{id}")


@router.delete("/addresses/{id}", response_model=StubResponse)
async def delete_my_address(id: str, customer: RequiredCustomer) -> StubResponse:
    return StubResponse(endpoint="DELETE /account/addresses/{id}")
