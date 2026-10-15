"""Entrypoint for the Email Queue Worker component.

`arq` (already in requirements.txt) runs a worker by pointing its CLI at a
module that defines `WorkerSettings`: `arq app.worker.WorkerSettings`. This is
that module -- a base file the rest of the worker has to exist and import
against, not a feature.

`functions` is empty on purpose: the three job functions (order-confirmation,
shipped-with-tracking, refund) are the development sprint's work. Each should
call `app.integrations.sendgrid_client.is_configured()` first, record the
outcome in `app.models.EmailLog`, and back off cleanly -- logging
`sendgrid_client.DISABLED_MESSAGE` rather than raising -- when SendGrid is not
configured yet.
"""

from urllib.parse import urlparse

from arq.connections import RedisSettings

from app.integrations.redis_client import REDIS_URL


def _redis_settings() -> RedisSettings:
    parsed = urlparse(REDIS_URL)
    return RedisSettings(
        host=parsed.hostname or "localhost",
        port=parsed.port or 6379,
        database=int((parsed.path or "/0").lstrip("/") or "0"),
        password=parsed.password,
    )


class WorkerSettings:
    """Registered job functions live in `functions` once the development
    sprint adds them; arq discovers this class by name, not by import side
    effect, so defining it is enough for the worker to start."""

    functions: list = []
    redis_settings = _redis_settings()
