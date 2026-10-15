"""S3 client for product photo uploads.

Reads AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION and S3_BUCKET at
the point of use -- the product owner has not supplied them yet (see the
ticket). Every admin route that needs S3 must call `is_configured()` first and
return `DISABLED_MESSAGE` instead of attempting the upload when it is False.
"""

import os
from typing import Any

import boto3

_REQUIRED_VARS = ("AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY", "AWS_REGION", "S3_BUCKET")

DISABLED_MESSAGE = (
    "Product photo storage is not configured yet: set AWS_ACCESS_KEY_ID, "
    "AWS_SECRET_ACCESS_KEY, AWS_REGION and S3_BUCKET to enable uploads."
)


def is_configured() -> bool:
    return all(os.getenv(var) for var in _REQUIRED_VARS)


def get_client() -> Any | None:
    """Returns a boto3 S3 client, or None when the keys are not set yet."""
    if not is_configured():
        return None
    return boto3.client(
        "s3",
        region_name=os.getenv("AWS_REGION"),
        aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
        aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    )


def bucket_name() -> str | None:
    return os.getenv("S3_BUCKET")
