"""Stripe client for checkout PaymentIntents, webhook verification and
staff-issued refunds.

Reads STRIPE_SECRET_KEY at the point of use -- the product owner has not
supplied it yet (see the ticket). Every route that takes a payment or issues
a refund must call `is_configured()` first and return `DISABLED_MESSAGE`
instead of calling Stripe when it is False.
"""

import os
from types import ModuleType

import stripe as _stripe

DISABLED_MESSAGE = "Card payment is not configured yet: set STRIPE_SECRET_KEY to enable checkout."


def is_configured() -> bool:
    return bool(os.getenv("STRIPE_SECRET_KEY"))


def get_client() -> ModuleType | None:
    """Returns the `stripe` module with its API key set, or None when the key
    is not set yet."""
    if not is_configured():
        return None
    _stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
    return _stripe


def webhook_secret() -> str | None:
    return os.getenv("STRIPE_WEBHOOK_SECRET")
