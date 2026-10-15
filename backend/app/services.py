"""The backing services this application is configured to reach.

Each entry maps a service to the environment variable(s) that address it.
`redis` comes from docker-compose.yml through .env.example, so it is always
set in a cloned-and-run environment. `media_store`, `stripe` and `sendgrid`
are the three the product owner has not supplied keys for yet (see the
ticket): each is read here, and by the integration module that actually calls
it, at the point of use -- never at import time -- so the service starts and
reports the feature off rather than failing to boot.
"""

import os

SERVICES: dict[str, tuple[str, ...]] = {
    "redis": ("REDIS_URL",),
    "media_store": ("AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY", "AWS_REGION", "S3_BUCKET"),
    "stripe": ("STRIPE_SECRET_KEY",),
    "sendgrid": ("SENDGRID_API_KEY",),
}


def configured_services() -> dict[str, bool]:
    """Each service mapped to whether every variable it needs is set."""
    return {name: all(os.getenv(var) for var in variables) for name, variables in SERVICES.items()}
