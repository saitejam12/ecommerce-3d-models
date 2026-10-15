"""Redis client for the cart store, the catalogue cache and the arq email
queue (see app.worker).

Unlike the other integrations in this package, Redis is infrastructure the
architecture requires outright, not an optional service the product owner
switches on later: it is provisioned by docker-compose.yml for local
development (see .env.example). So, like `DATABASE_URL` in app.database, it
defaults to a local address rather than turning a feature off when unset.
"""

import os

import redis

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")


def get_client() -> redis.Redis:
    """A lazy client: redis-py does not connect until the first command runs,
    so importing this module never fails even with no Redis reachable."""
    return redis.Redis.from_url(REDIS_URL, decode_responses=True)
