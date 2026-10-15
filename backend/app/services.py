"""The backing services this application is configured to reach.

`/health` reports this so a deployment can see at a glance which optional
features (payments, email, image upload) are turned on, without reading
logs. Redis is addressed by a single connection string set in
docker-compose.yml/.env.example, so presence of that variable is enough to
report. Stripe, SendGrid and S3 are third-party keys the product owner adds
before deployment; each is reported through the same `is_configured()` the
feature code itself checks at the point of use (see `app.integrations`), so
this can never drift from what a request actually does.
"""

import os

from app.integrations import s3_client, sendgrid_client, stripe_client

SERVICES = {
    "redis": "REDIS_URL",
}


def configured_services() -> dict[str, bool]:
    """Each service mapped to whether it is usable right now."""
    return {
        **{name: bool(os.getenv(var)) for name, var in SERVICES.items()},
        "stripe": stripe_client.is_configured(),
        "sendgrid": sendgrid_client.is_configured(),
        "media_store": s3_client.is_configured(),
    }
