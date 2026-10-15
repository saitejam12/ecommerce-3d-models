"""Thin wrappers around the third-party services the architecture names:
Stripe payments, SendGrid email and S3 media storage.

Each submodule reads its own environment variable(s) at the point of use --
never at import time -- and exposes `is_configured()` so feature code can turn
itself off with a clear message instead of crashing when the product owner
has not supplied the key yet (AWS_*, S3_BUCKET, SENDGRID_API_KEY,
STRIPE_SECRET_KEY are all unset until deployment)."""
