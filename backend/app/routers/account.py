"""Signed-in customer account: order history and saved addresses.

Every route here requires a customer JWT (see app.security) and must refuse
another customer's order (AC: GET /account/orders/{reference}). Every handler
here is a stub; see app.routers.catalogue for what that means and why.
"""

from typing import Any

from fastapi import APIRouter

from app.schemas import StubResponse

router = APIRouter(prefix="/account", tags=["account"])


@router.get("/orders")
async def list_account_orders() -> StubResponse:
    return StubResponse(endpoint="GET /account/orders")


@router.get("/orders/{reference}")
async def get_account_order(reference: str) -> StubResponse:
    return StubResponse(endpoint="GET /account/orders/{reference}")


@router.get("/addresses")
async def list_addresses() -> StubResponse:
    return StubResponse(endpoint="GET /account/addresses")


@router.post("/addresses")
async def create_address(payload: dict[str, Any] | None = None) -> StubResponse:
    return StubResponse(endpoint="POST /account/addresses")


@router.patch("/addresses/{address_id}")
async def update_address(address_id: str, payload: dict[str, Any] | None = None) -> StubResponse:
    return StubResponse(endpoint="PATCH /account/addresses/{id}")


@router.delete("/addresses/{address_id}")
async def delete_address(address_id: str) -> StubResponse:
    return StubResponse(endpoint="DELETE /account/addresses/{id}")
