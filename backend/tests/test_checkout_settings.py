"""Postage options, the free-postage threshold and the single sales-tax rate
as applied to checkout quotes (US-033).

Covers PUT/GET /admin/settings and POST /checkout/quote. Money assertions
are always on minor-unit integers, never floats.
"""

import uuid

import pytest
from fastapi.testclient import TestClient

from app.bootstrap import create_staff_user
from app.database import SessionLocal
from app.main import app

client = TestClient(app)

STAFF_PASSWORD = "correct-horse-battery-staple"


def _make_staff_token() -> str:
    email = f"staff-{uuid.uuid4().hex}@example.com"
    db = SessionLocal()
    try:
        create_staff_user(db, email=email, password=STAFF_PASSWORD)
    finally:
        db.close()
    login = client.post("/admin/auth/login", json={"email": email, "password": STAFF_PASSWORD})
    assert login.status_code == 200
    return login.json()["access_token"]


@pytest.fixture(scope="module")
def admin_token() -> str:
    return _make_staff_token()


def _auth(token: str) -> dict[str, str]:
    return {"Authorization": f"Bearer {token}"}


def _put_settings(
    token: str,
    *,
    postage_options: list[dict],
    free_postage_enabled: bool = False,
    free_postage_threshold: int | None = None,
    tax_rate_bp: int = 0,
):
    return client.put(
        "/admin/settings",
        headers=_auth(token),
        json={
            "postage_options": postage_options,
            "free_postage_enabled": free_postage_enabled,
            "free_postage_threshold": free_postage_threshold,
            "tax_rate_bp": tax_rate_bp,
        },
    )


def _get_settings(token: str):
    return client.get("/admin/settings", headers=_auth(token))


def _quote(subtotal: int, postage_option_id: str):
    return client.post(
        "/checkout/quote",
        json={"goods_subtotal": subtotal, "postage_option_id": postage_option_id},
    )


def test_postage_options_saved_via_put_are_offered_by_quote(admin_token: str) -> None:
    put = _put_settings(
        admin_token,
        postage_options=[
            {"name": "Standard", "description": "", "price": 350, "active": True},
            {"name": "Express", "description": "", "price": 950, "active": True},
        ],
        tax_rate_bp=0,
    )
    assert put.status_code == 200
    options = put.json()["postage_options"]
    standard_id = next(o["id"] for o in options if o["name"] == "Standard")

    quote = _quote(1000, standard_id)

    assert quote.status_code == 200
    body = quote.json()
    offered_names = {o["name"]: o["price"] for o in body["postage_options"]}
    assert offered_names == {"Standard": 350, "Express": 950}


def test_price_change_or_deactivation_affects_only_new_quotes(admin_token: str) -> None:
    put = _put_settings(
        admin_token,
        postage_options=[
            {"name": "Standard Post", "description": "", "price": 500, "active": True}
        ],
        tax_rate_bp=0,
    )
    option_id = put.json()["postage_options"][0]["id"]

    quote_before = _quote(1000, option_id)
    assert quote_before.status_code == 200
    assert quote_before.json()["postage"] == 500

    # Changing the price affects quotes made after the change only; the
    # response already returned above is not retroactively mutated.
    put2 = _put_settings(
        admin_token,
        postage_options=[
            {
                "id": option_id,
                "name": "Standard Post",
                "description": "",
                "price": 900,
                "active": True,
            }
        ],
        tax_rate_bp=0,
    )
    assert put2.status_code == 200

    quote_before_still = quote_before.json()
    assert quote_before_still["postage"] == 500

    quote_after = _quote(1000, option_id)
    assert quote_after.status_code == 200
    assert quote_after.json()["postage"] == 900

    # Deactivating the option removes it from new quotes.
    put3 = _put_settings(
        admin_token,
        postage_options=[
            {
                "id": option_id,
                "name": "Standard Post",
                "description": "",
                "price": 900,
                "active": False,
            },
            {"name": "Backup Post", "description": "", "price": 1200, "active": True},
        ],
        tax_rate_bp=0,
    )
    assert put3.status_code == 200
    backup_id = next(o["id"] for o in put3.json()["postage_options"] if o["name"] == "Backup Post")

    quote_deactivated = _quote(1000, option_id)
    assert quote_deactivated.status_code == 422

    quote_backup = _quote(1000, backup_id)
    assert quote_backup.status_code == 200
    assert quote_backup.json()["postage"] == 1200


def test_no_active_postage_option_blocks_quote_and_warns_in_admin_settings(
    admin_token: str,
) -> None:
    put = _put_settings(admin_token, postage_options=[], tax_rate_bp=0)
    assert put.status_code == 200
    assert put.json()["warnings"]["no_active_postage_option"] is True

    quote = _quote(1000, "any-id")
    assert quote.status_code == 422

    settings = _get_settings(admin_token)
    assert settings.status_code == 200
    assert settings.json()["warnings"]["no_active_postage_option"] is True


def test_enabling_free_postage_with_threshold_persists_and_applies(admin_token: str) -> None:
    put = _put_settings(
        admin_token,
        postage_options=[{"name": "Standard", "description": "", "price": 600, "active": True}],
        free_postage_enabled=True,
        free_postage_threshold=5000,
        tax_rate_bp=0,
    )
    assert put.status_code == 200
    option_id = put.json()["postage_options"][0]["id"]
    assert put.json()["free_postage_enabled"] is True
    assert put.json()["free_postage_threshold"] == 5000

    settings = _get_settings(admin_token)
    assert settings.json()["free_postage_enabled"] is True
    assert settings.json()["free_postage_threshold"] == 5000

    quote = _quote(5000, option_id)
    assert quote.status_code == 200
    body = quote.json()
    assert body["postage"] == 0
    assert body["postage_label"] == "Free postage"
    offered = next(o for o in body["postage_options"] if o["id"] == option_id)
    assert offered["is_free"] is True
    assert offered["effective_price"] == 0


def test_subtotal_at_and_above_threshold_is_free_just_below_is_flat_rate(admin_token: str) -> None:
    put = _put_settings(
        admin_token,
        postage_options=[{"name": "Standard", "description": "", "price": 450, "active": True}],
        free_postage_enabled=True,
        free_postage_threshold=2000,
        tax_rate_bp=0,
    )
    option_id = put.json()["postage_options"][0]["id"]

    below = _quote(1999, option_id)
    assert below.status_code == 200
    assert below.json()["postage"] == 450
    assert below.json()["postage_label"] != "Free postage"

    at = _quote(2000, option_id)
    assert at.status_code == 200
    assert at.json()["postage"] == 0
    assert at.json()["postage_label"] == "Free postage"

    above = _quote(2500, option_id)
    assert above.status_code == 200
    assert above.json()["postage"] == 0
    assert above.json()["postage_label"] == "Free postage"


def test_free_postage_disabled_charges_flat_rate_at_every_order_value(admin_token: str) -> None:
    put = _put_settings(
        admin_token,
        postage_options=[{"name": "Standard", "description": "", "price": 350, "active": True}],
        free_postage_enabled=False,
        free_postage_threshold=2000,
        tax_rate_bp=0,
    )
    option_id = put.json()["postage_options"][0]["id"]

    zero = _quote(0, option_id)
    assert zero.status_code == 200
    assert zero.json()["postage"] == 350

    large = _quote(1_000_000, option_id)
    assert large.status_code == 200
    assert large.json()["postage"] == 350


def test_saved_tax_rate_applies_to_quotes_as_its_own_line(admin_token: str) -> None:
    put = _put_settings(
        admin_token,
        postage_options=[{"name": "Standard", "description": "", "price": 0, "active": True}],
        free_postage_enabled=False,
        tax_rate_bp=2000,  # 20.00%
    )
    option_id = put.json()["postage_options"][0]["id"]

    quote = _quote(1000, option_id)
    assert quote.status_code == 200
    body = quote.json()
    assert body["tax"] == 200
    assert body["postage"] == 0
    assert body["total"] == body["goods_subtotal"] + body["postage"] + body["tax"]
    assert body["total"] == 1200


def test_settings_payload_accepts_exactly_one_tax_rate_and_rejects_per_region_rules(
    admin_token: str,
) -> None:
    put = _put_settings(
        admin_token,
        postage_options=[{"name": "Standard", "description": "", "price": 0, "active": True}],
        tax_rate_bp=1500,
    )
    assert put.status_code == 200
    body = put.json()
    assert body["tax_rate_bp"] == 1500
    assert "tax_rates" not in body
    assert "tax_rules" not in body
    assert "regions" not in body

    # The schema has exactly one scalar rate field; a payload attempting to
    # smuggle per-region rules in has no field to land in and is a no-op.
    response = client.put(
        "/admin/settings",
        headers=_auth(admin_token),
        json={
            "postage_options": [
                {"name": "Standard", "description": "", "price": 0, "active": True}
            ],
            "free_postage_enabled": False,
            "free_postage_threshold": None,
            "tax_rate_bp": 1750,
            "tax_rules": [
                {"region": "CA", "rate_bp": 500},
                {"region": "NY", "rate_bp": 800},
            ],
        },
    )
    assert response.status_code == 200
    after = response.json()
    assert after["tax_rate_bp"] == 1750
    assert "tax_rules" not in after

    settings = _get_settings(admin_token)
    assert settings.json()["tax_rate_bp"] == 1750

    # An out-of-range rate (not a region concept, just the one rate's bound)
    # is rejected by validation rather than accepted as a second rate.
    invalid = _put_settings(
        admin_token,
        postage_options=[{"name": "Standard", "description": "", "price": 0, "active": True}],
        tax_rate_bp=10001,
    )
    assert invalid.status_code == 422
