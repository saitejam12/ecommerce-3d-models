"""Checkout, Stripe webhook and order confirmation.

`POST /checkout/payment-intent` and `POST /webhooks/stripe` are where
app.integrations.stripe_client comes in: the development sprint should call
`is_configured()` before creating a PaymentIntent and turn checkout off with
`stripe_client.DISABLED_MESSAGE` when STRIPE_SECRET_KEY is not set, rather
than let the Stripe call fail. Every handler here is a stub; see
app.routers.catalogue for what that means and why.
"""

from typing import Any

from fastapi import APIRouter, Request, Response

from app.schemas import StubResponse

router = APIRouter(tags=["checkout"])


@router.post("/checkout/quote")
async def quote_checkout(payload: dict[str, Any] | None = None) -> StubResponse:
    return StubResponse(endpoint="POST /checkout/quote")


@router.post("/checkout/payment-intent")
async def create_payment_intent(payload: dict[str, Any] | None = None) -> StubResponse:
    return StubResponse(endpoint="POST /checkout/payment-intent")


@router.post("/webhooks/stripe")
async def stripe_webhook(request: Request) -> Response:
    """Verifies the `Stripe-Signature` header and, on payment success,
    creates the order and decrements stock idempotently (keyed off
    app.models.StripeEvent.event_id) -- the development sprint's work.
    Reads the raw body here, as Stripe signature verification requires,
    rather than parsing it as a stub response would.
    """
    await request.body()
    return Response(status_code=200)


@router.get("/orders/{reference}/confirmation")
async def get_order_confirmation(reference: str) -> StubResponse:
    return StubResponse(endpoint="GET /orders/{reference}/confirmation")
