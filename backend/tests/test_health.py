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
    # redis is always configured (docker-compose/.env.example); media_store,
    # stripe and sendgrid are the three service keys the product owner has not
    # supplied yet (see the ticket), so they report False until they are.
    assert set(body["services"]) == {"redis", "media_store", "stripe", "sendgrid"}
    assert body["services"]["media_store"] is False
    assert body["services"]["stripe"] is False
    assert body["services"]["sendgrid"] is False


def test_the_openapi_document_builds() -> None:
    """Every generated route contributes to the schema, so a route whose types
    FastAPI cannot resolve fails here rather than on a user's first request."""
    response = client.get("/openapi.json")

    assert response.status_code == 200
    paths = response.json()["paths"]
    assert "/health" in paths
    # One route from each router group main.py registers, so a router that
    # fails to import or to mount is caught here rather than at runtime.
    assert "/categories" in paths
    assert "/cart" in paths
    assert "/checkout/quote" in paths
    assert "/auth/login" in paths
    assert "/account/orders" in paths
    assert "/admin/auth/login" in paths
    assert "/content/{slug}" in paths
