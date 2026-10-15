"""Integration tests for the public storefront catalogue reads (US-001-2):
category navigation, category product listings, product detail and search,
all excluding unpublished products.

Placed alongside the routers because `backend/tests/` is outside this
ticket's writable scope (`backend/app/`, `backend/app/routers/`); `pytest.ini`
restricts discovery to `backend/tests/`, so this module is also collected
explicitly via `pytest backend/app/routers/test_storefront_catalogue.py`.
"""

import uuid

from fastapi.testclient import TestClient

from app.database import SessionLocal
from app.main import app
from app.models import Category, Product

client = TestClient(app)


def _make_category(db, name: str) -> Category:
    slug = f"cat-{uuid.uuid4().hex[:10]}"
    category = Category(name=name, slug=slug)
    db.add(category)
    db.commit()
    db.refresh(category)
    return category


def _make_product(
    db, category: Category, name: str, published: bool, description: str = ""
) -> Product:
    slug = f"prod-{uuid.uuid4().hex[:10]}"
    product = Product(
        category_id=category.id,
        name=name,
        slug=slug,
        description=description,
        published=published,
    )
    db.add(product)
    db.commit()
    db.refresh(product)
    return product


def test_categories_only_list_those_with_at_least_one_published_product():
    db = SessionLocal()
    try:
        empty_category = _make_category(db, "Empty Category")
        active_category = _make_category(db, "Active Category")
        _make_product(db, active_category, "Widget", published=True)
        _make_product(db, empty_category, "Hidden Widget", published=False)

        response = client.get("/categories")

        assert response.status_code == 200
        slugs = {c["slug"] for c in response.json()}
        assert active_category.slug in slugs
        assert empty_category.slug not in slugs
    finally:
        db.close()


def test_category_products_reflects_rename_and_excludes_unpublished():
    db = SessionLocal()
    try:
        category = _make_category(db, "Original Name")
        published = _make_product(db, category, "Visible", published=True)
        hidden = _make_product(db, category, "Hidden", published=False)

        category.name = "Renamed Category"
        db.add(category)
        db.commit()

        response = client.get(f"/categories/{category.slug}/products")

        assert response.status_code == 200
        body = response.json()
        assert body["category"]["name"] == "Renamed Category"
        product_slugs = {p["slug"] for p in body["products"]}
        assert published.slug in product_slugs
        assert hidden.slug not in product_slugs
    finally:
        db.close()


def test_newly_published_product_appears_in_its_category_listing():
    db = SessionLocal()
    try:
        category = _make_category(db, "Fresh Category")
        product = _make_product(db, category, "Brand New", published=True)

        response = client.get(f"/categories/{category.slug}/products")

        assert response.status_code == 200
        slugs = {p["slug"] for p in response.json()["products"]}
        assert product.slug in slugs
    finally:
        db.close()


def test_unknown_category_slug_404s():
    response = client.get("/categories/does-not-exist/products")
    assert response.status_code == 404


def test_product_detail_reflects_edit_and_404s_when_unpublished():
    db = SessionLocal()
    try:
        category = _make_category(db, "Detail Category")
        product = _make_product(
            db, category, "Old Name", published=True, description="Old description"
        )

        response = client.get(f"/products/{product.slug}")
        assert response.status_code == 200
        assert response.json()["name"] == "Old Name"

        product.name = "New Name"
        product.description = "New description"
        db.add(product)
        db.commit()

        response = client.get(f"/products/{product.slug}")
        assert response.status_code == 200
        body = response.json()
        assert body["name"] == "New Name"
        assert body["description"] == "New description"

        product.published = False
        db.add(product)
        db.commit()

        response = client.get(f"/products/{product.slug}")
        assert response.status_code == 404
    finally:
        db.close()


def test_unknown_product_slug_404s():
    response = client.get("/products/does-not-exist")
    assert response.status_code == 404


def test_search_matches_name_and_description_and_excludes_unpublished():
    db = SessionLocal()
    try:
        category = _make_category(db, "Search Category")
        matched_by_name = _make_product(
            db, category, "Zarbaxon Dragon", published=True, description="A fierce creature"
        )
        matched_by_description = _make_product(
            db, category, "Something Else", published=True, description="Contains Zarbaxon term"
        )
        unpublished_match = _make_product(
            db, category, "Zarbaxon Hidden", published=False, description=""
        )
        unrelated = _make_product(
            db, category, "Totally Unrelated", published=True, description="nothing special"
        )

        response = client.get("/search", params={"q": "Zarbaxon"})

        assert response.status_code == 200
        slugs = {p["slug"] for p in response.json()["results"]}
        assert matched_by_name.slug in slugs
        assert matched_by_description.slug in slugs
        assert unpublished_match.slug not in slugs
        assert unrelated.slug not in slugs
    finally:
        db.close()
