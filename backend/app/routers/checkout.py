"""Checkout, payment and the Stripe webhook, owned by the Shop API Service
(component `api`) and depending on `stripe` for the real payment work.

Stub handlers only -- see `app.routers.catalogue` for why. When implemented,
`create_payment_intent` and the webhook handler must read `STRIPE_SECRET_KEY`
at the point of use (never at import time) and turn payment off with a clear
message when it is empty, per the project brief; `app.services.configured_services()`
already reports whether that key is set. The webhook handler must also insert
into `app.models.StripeEvent` before acting, so a retried Stripe delivery is
a no-op rather than a second order.
"""

from fastapi import APIRouter, Header

from app.schemas import StubResponse

router = APIRouter(tags=["checkout"])


@router.post("/checkout/quote", response_model=StubResponse)
async def quote_checkout(payload: dict | None = None) -> StubResponse:
    """Goods subtotal, postage, tax and total for a postage option; revalidates stock."""
    return StubResponse(endpoint="POST /checkout/quote")


@router.post("/checkout/payment-intent", response_model=StubResponse)
async def create_payment_intent(payload: dict | None = None) -> StubResponse:
    """Creates a Stripe PaymentIntent for the full total and returns its client secret."""
    return StubResponse(endpoint="POST /checkout/payment-intent")


@router.post("/webhooks/stripe", status_code=200)
async def stripe_webhook(
    stripe_signature: str | None = Header(default=None, alias="Stripe-Signature"),
) -> dict[str, str]:
    """Verifies the Stripe signature, then creates the order and decrements
    stock idempotently on payment success."""
    return {"status": "ok"}
