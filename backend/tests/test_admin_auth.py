"""Staff authentication: login, the require_staff guard, and sign-out (US-024)."""

import uuid

from fastapi.testclient import TestClient

from app.bootstrap import create_staff_user
from app.database import SessionLocal
from app.main import app
from app.security import create_access_token

client = TestClient(app)

STAFF_PASSWORD = "correct-horse-battery-staple"


def _make_staff(email: str | None = None):
    email = email or f"staff-{uuid.uuid4().hex}@example.com"
    db = SessionLocal()
    try:
        staff = create_staff_user(db, email=email, password=STAFF_PASSWORD)
        return staff.id, email
    finally:
        db.close()


def test_login_with_correct_credentials_returns_staff_token() -> None:
    _, email = _make_staff()

    response = client.post("/admin/auth/login", json={"email": email, "password": STAFF_PASSWORD})

    assert response.status_code == 200
    body = response.json()
    assert body["token_type"] == "bearer"
    assert isinstance(body["access_token"], str) and body["access_token"]
    assert body["staff"]["email"] == email


def test_login_with_wrong_password_is_rejected() -> None:
    _, email = _make_staff()

    response = client.post("/admin/auth/login", json={"email": email, "password": "nope"})

    assert response.status_code == 401
    assert "access_token" not in response.json()


def test_login_with_unknown_email_is_rejected() -> None:
    response = client.post(
        "/admin/auth/login",
        json={"email": f"nobody-{uuid.uuid4().hex}@example.com", "password": "whatever"},
    )

    assert response.status_code == 401


def test_admin_route_without_token_is_rejected_with_no_data() -> None:
    response = client.get("/admin/ping")

    assert response.status_code in (401, 403)
    body = response.json()
    assert "staff_email" not in body
    assert "pong" not in body


def test_admin_route_with_garbage_token_is_rejected() -> None:
    response = client.get("/admin/ping", headers={"Authorization": "Bearer garbage"})

    assert response.status_code in (401, 403)


def test_admin_route_with_valid_staff_token_is_allowed() -> None:
    _, email = _make_staff()
    login = client.post("/admin/auth/login", json={"email": email, "password": STAFF_PASSWORD})
    token = login.json()["access_token"]

    response = client.get("/admin/ping", headers={"Authorization": f"Bearer {token}"})

    assert response.status_code == 200
    assert response.json()["staff_email"] == email


def test_customer_token_is_rejected_by_admin_route_with_403() -> None:
    # A customer token is any token whose role is not "staff" -- the shape
    # POST /auth/login (owned by US-020/021) issues. We mint one with the
    # same signing primitives to prove the role check, independent of
    # whether that endpoint exists yet.
    customer_token, _ = create_access_token(subject="customer-1", role="customer")

    response = client.get("/admin/ping", headers={"Authorization": f"Bearer {customer_token}"})

    assert response.status_code == 403
    assert "staff_email" not in response.json()


def test_sign_out_invalidates_the_staff_session() -> None:
    _, email = _make_staff()
    login = client.post("/admin/auth/login", json={"email": email, "password": STAFF_PASSWORD})
    token = login.json()["access_token"]

    ok = client.get("/admin/ping", headers={"Authorization": f"Bearer {token}"})
    assert ok.status_code == 200

    logout = client.post("/admin/auth/logout", headers={"Authorization": f"Bearer {token}"})
    assert logout.status_code == 200

    reused = client.get("/admin/ping", headers={"Authorization": f"Bearer {token}"})
    assert reused.status_code in (401, 403)
    assert "staff_email" not in reused.json()
