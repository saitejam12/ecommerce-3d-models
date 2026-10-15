"""Stub routes for checkout.

POST /checkout/quote, POST /checkout/payment-intent -- the latter is where
US-018 reads STRIPE_SECRET_KEY through `app.integrations.stripe_client` and
turns card payment off with a clear message if it is empty, rather than
failing the whole service at startup.
"""

from fastapi import APIRouter

from app.dependencies import OptionalCustomer
from app.schemas import StubResponse

router = APIRouter(prefix="/checkout", tags=["checkout"])


@router.post("/quote", response_model=StubResponse)
async def quote_checkout(customer: OptionalCustomer) -> StubResponse:
    return StubResponse(endpoint="POST /checkout/quote")


@router.post("/payment-intent", response_model=StubResponse)
async def create_payment_intent(customer: OptionalCustomer) -> StubResponse:
    return StubResponse(endpoint="POST /checkout/payment-intent")
