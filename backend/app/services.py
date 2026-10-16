"""The backing services this application is configured to reach.

Each entry maps a service to the environment variable(s) that address it.
`redis` comes from docker-compose.yml through .env.example, so it is always
set in a cloned-and-run repository. The other three are the keys the product
owner adds before deployment (see the project brief): until they are set,
`configured_services()` reports the service as off, and the endpoint that
needs it is expected to read the same variable at the point of use and
degrade with a clear message rather than raise on import or at startup.
"""

import os

SERVICE_ENV_VARS: dict[str, tuple[str, ...]] = {
    "redis": ("REDIS_URL",),
    "media_store": (
        "AWS_ACCESS_KEY_ID",
        "AWS_SECRET_ACCESS_KEY",
        "AWS_REGION",
        "S3_BUCKET",
    ),
    "stripe": ("STRIPE_SECRET_KEY",),
    "sendgrid": ("SENDGRID_API_KEY",),
}


def configured_services() -> dict[str, bool]:
    """Each service mapped to whether every variable it needs is set.

    `media_store` needs all four AWS/S3 variables together -- a bucket name
    with no credentials, or credentials with no bucket, cannot upload
    anything -- so it only reports configured when none of them are empty.
    """
    result: dict[str, bool] = {}
    for name, env_vars in SERVICE_ENV_VARS.items():
        result[name] = all(os.getenv(var) for var in env_vars)
    return result
