"""Stub route for the Stripe webhook.

POST /webhooks/stripe -- verifying the signature header against
`app.integrations.stripe_client.webhook_secret()` and creating the order
idempotently (via the `stripe_events` table) is the development sprint's
handler, not this scaffold.
"""

from fastapi import APIRouter

from app.schemas import StubResponse

router = APIRouter(tags=["webhooks"])


@router.post("/webhooks/stripe", response_model=StubResponse)
async def stripe_webhook() -> StubResponse:
    return StubResponse(endpoint="POST /webhooks/stripe")
