"""SendGrid wrapper gating on SENDGRID_API_KEY.

Same pattern as `app.integrations.stripe_client`: the worker's email jobs
(US-029..032) must check `is_configured()` and record a clear "email is
turned off" outcome in `email_log` rather than crash, until the product
owner supplies the key.
"""

import os

from sendgrid import SendGridAPIClient


class SendGridNotConfigured(RuntimeError):
    """Raised by feature code when SENDGRID_API_KEY is empty."""


def is_configured() -> bool:
    return bool(os.getenv("SENDGRID_API_KEY"))


def get_client() -> SendGridAPIClient:
    key = os.getenv("SENDGRID_API_KEY")
    if not key:
        raise SendGridNotConfigured(
            "SENDGRID_API_KEY is not set; transactional email is turned off."
        )
    return SendGridAPIClient(key)


def from_address() -> str:
    return os.getenv("SENDGRID_FROM_EMAIL", "shop@example.com")
