"""arq worker entrypoint for the Email Queue Worker component.

Run with `arq app.worker.WorkerSettings`. It consumes the same Redis the API
uses as its cart store and queue (`REDIS_URL`), so no second connection
string exists to fall out of sync.

The development sprint's email tickets (US-029 order-confirmation, US-030
shipped-with-tracking, US-031 refund, US-032 delivery reporting) append their
job functions to `functions` and send through `app.integrations.sendgrid_client`,
recording the outcome in the `email_log` table. This module only wires the
worker process to Redis so that command has something to run against before a
single job exists -- no email is sent from here.
"""

import os

from arq.connections import RedisSettings

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")

# Populated by the development sprint, one function per queued email job.
functions: list = []


class WorkerSettings:
    functions = functions
    redis_settings = RedisSettings.from_dsn(REDIS_URL)
