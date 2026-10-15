"""Stripe wrapper gating on STRIPE_SECRET_KEY.

The product owner has not supplied STRIPE_SECRET_KEY yet. Every ticket that
takes a payment or issues a refund (US-018, US-019, US-028) must read the key
through `is_configured()`/`get_client()` here -- at the point of use, not at
import time -- and turn the feature off with a clear message rather than
fail the whole service at startup when the key is empty.
"""

import os

import stripe as _stripe


class StripeNotConfigured(RuntimeError):
    """Raised by feature code when STRIPE_SECRET_KEY is empty.

    Handlers should catch this and return a clear "card payments are not
    available yet" response rather than let it surface as an unhandled 500.
    """


def is_configured() -> bool:
    return bool(os.getenv("STRIPE_SECRET_KEY"))


def get_client():
    """Returns the `stripe` module configured with the current key.

    Reads the environment on every call rather than caching it at import
    time, so a key added after the process started -- or a test's
    monkeypatch -- takes effect immediately.
    """
    key = os.getenv("STRIPE_SECRET_KEY")
    if not key:
        raise StripeNotConfigured("STRIPE_SECRET_KEY is not set; card payments are turned off.")
    _stripe.api_key = key
    return _stripe


def webhook_secret() -> str | None:
    """STRIPE_WEBHOOK_SECRET is separate from the API key: the webhook route
    needs it to verify the signature header before trusting an event body."""
    return os.getenv("STRIPE_WEBHOOK_SECRET")
