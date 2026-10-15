"""SendGrid client for the three transactional emails: order-confirmation,
shipped-with-tracking and refund.

Reads SENDGRID_API_KEY at the point of use -- the product owner has not
supplied it yet (see the ticket). Used by the Email Queue Worker (see
app.worker), not by request handlers directly: `POST /admin/orders/{id}/
emails/{type}/resend` queues a job rather than calling this inline. Every job
must call `is_configured()` first and record `DISABLED_MESSAGE` against the
order's email_log instead of calling SendGrid when it is False.
"""

import os

from sendgrid import SendGridAPIClient

DISABLED_MESSAGE = (
    "Transactional email is not configured yet: set SENDGRID_API_KEY to enable "
    "order-confirmation, shipped and refund emails."
)


def is_configured() -> bool:
    return bool(os.getenv("SENDGRID_API_KEY"))


def get_client() -> SendGridAPIClient | None:
    if not is_configured():
        return None
    return SendGridAPIClient(os.getenv("SENDGRID_API_KEY"))
