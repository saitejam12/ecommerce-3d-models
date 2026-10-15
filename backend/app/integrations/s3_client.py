"""S3 wrapper gating on the AWS_* keys and S3_BUCKET.

Same pattern as `app.integrations.stripe_client`: US-002 (product photo
upload) and US-011 (serving resized photos) must check `is_configured()` and
turn image upload off with a clear message rather than fail at startup when
the keys are empty -- the product owner adds AWS_ACCESS_KEY_ID,
AWS_SECRET_ACCESS_KEY, AWS_REGION and S3_BUCKET before deployment.
"""

import os

import boto3


class S3NotConfigured(RuntimeError):
    """Raised by feature code when the AWS credentials or bucket are empty."""


def is_configured() -> bool:
    return bool(
        os.getenv("AWS_ACCESS_KEY_ID")
        and os.getenv("AWS_SECRET_ACCESS_KEY")
        and os.getenv("AWS_REGION")
        and os.getenv("S3_BUCKET")
    )


def get_client():
    if not is_configured():
        raise S3NotConfigured("AWS/S3 credentials are not set; image upload is turned off.")
    return boto3.client(
        "s3",
        region_name=os.getenv("AWS_REGION"),
        aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
        aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    )


def bucket_name() -> str | None:
    return os.getenv("S3_BUCKET")
