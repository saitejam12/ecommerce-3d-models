"""The baseline test the scaffold ships with.

The platform installs this tree and runs `pytest` against it, so there has to
be something green to run before an agent has written anything -- otherwise the
first real ticket cannot tell a broken change from a repository that never
worked.
"""

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_reports_ok() -> None:
    """A failure here means the application does not import or does not start."""
    response = client.get("/health")

    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "ok"
    # Stripe, SendGrid and S3 keys are not set until the product owner adds
    # them before deployment (see .env.example), so those three must always
    # report themselves off here; redis may or may not be set depending on
    # where this runs, so only its presence (not its value) is asserted.
    services = body["services"]
    assert set(services) == {"redis", "stripe", "sendgrid", "media_store"}
    assert all(isinstance(v, bool) for v in services.values())
    assert services["stripe"] is False
    assert services["sendgrid"] is False
    assert services["media_store"] is False


def test_the_openapi_document_builds() -> None:
    """Every generated route contributes to the schema, so a route whose types
    FastAPI cannot resolve fails here rather than on a user's first request."""
    response = client.get("/openapi.json")

    assert response.status_code == 200
    paths = response.json()["paths"]
    assert "/health" in paths
    # One path per resource group the API spec declares, proving every router
    # in app.routers is actually mounted rather than merely importable.
    for path in (
        "/categories",
        "/products/{slug}",
        "/cart",
        "/checkout/quote",
        "/webhooks/stripe",
        "/auth/login",
        "/account/orders",
        "/admin/auth/login",
        "/admin/products",
        "/admin/orders",
        "/admin/settings",
        "/content/{slug}",
    ):
        assert path in paths
