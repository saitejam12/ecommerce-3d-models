"""Stub route for the just-placed order confirmation view.

GET /orders/{reference}/confirmation -- accepts either a signed-in customer
or the order token issued at checkout, so the dependency here is optional.
"""

from fastapi import APIRouter

from app.dependencies import OptionalCustomer
from app.schemas import StubResponse

router = APIRouter(tags=["orders"])


@router.get("/orders/{reference}/confirmation", response_model=StubResponse)
async def get_order_confirmation(reference: str, customer: OptionalCustomer) -> StubResponse:
    return StubResponse(endpoint="GET /orders/{reference}/confirmation")
