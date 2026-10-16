"""arq worker bootstrap for the Email Queue Worker component.

The worker consumes queued email jobs from the same Redis the API uses for
carts (see `app.services`) and sends them via SendGrid. The job functions
themselves -- order-confirmation, shipped-with-tracking and refund emails --
are the development sprint's work (US-029..US-032); this module only wires up
what `arq` needs to find and run them: `arq app.worker.WorkerSettings`.

There is no separate worker service in docker-compose.yml or a top-level
`worker/` package -- the architecture's worker is "FastAPI 0.115" only in the
sense that it shares this backend's dependencies and models, not that it
serves HTTP. It runs as `arq app.worker.WorkerSettings` against the same
image as the API.
"""

import os

from arq.connections import RedisSettings


async def startup(ctx: dict) -> None:
    """Runs once when the worker process starts."""


async def shutdown(ctx: dict) -> None:
    """Runs once when the worker process stops."""


class WorkerSettings:
    """`functions` stays empty until the development sprint registers the
    three email jobs; an empty worker still starts and drains nothing, which
    is correct until there is something to drain."""

    functions: list = []
    on_startup = startup
    on_shutdown = shutdown
    redis_settings = RedisSettings.from_dsn(os.getenv("REDIS_URL", "redis://localhost:6379/0"))
