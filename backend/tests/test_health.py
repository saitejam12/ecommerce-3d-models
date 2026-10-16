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
    """A failure here means the application does not import or does not start.

    Only the key set is asserted, not which are on: `redis` may legitimately
    be configured in a given environment (it is infrastructure, not a product
    owner's key), while `media_store`/`stripe`/`sendgrid` depend on secrets
    this project does not have yet -- this test must pass the same way
    whether or not those happen to be set in the environment it runs in.
    """
    response = client.get("/health")

    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "ok"
    assert set(body["services"]) == {"redis", "media_store", "stripe", "sendgrid"}
    assert all(isinstance(v, bool) for v in body["services"].values())


def test_the_openapi_document_builds() -> None:
    """Every generated route contributes to the schema, so a route whose types
    FastAPI cannot resolve fails here rather than on a user's first request."""
    response = client.get("/openapi.json")

    assert response.status_code == 200
    paths = response.json()["paths"]
    assert "/health" in paths
    # One per endpoint the approved API spec declares, confirming every
    # generated router actually got wired into the app rather than just
    # existing on disk.
    assert "/categories" in paths
    assert "/cart" in paths
    assert "/checkout/payment-intent" in paths
    assert "/webhooks/stripe" in paths
    assert "/auth/login" in paths
    assert "/admin/auth/login" in paths
    assert "/admin/orders" in paths
