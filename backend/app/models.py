"""SQLAlchemy models.

One class per entity in the approved data model. `Base` is already bound to
the engine in `app.database`, and `app.main` imports this module before it
calls `Base.metadata.create_all`, so every table here is created on startup
against whatever `DATABASE_URL` points at (SQLite locally, Postgres 16 in the
architecture).

`options`, `variant_options` and `delivery_address` use the portable `JSON`
type rather than Postgres's `JSONB`, and `search_vector` is left out of the
ORM entirely, so this module stays correct on both SQLite (local dev) and
Postgres (deployed) -- the full-text `tsvector` column and the trigger that
maintains it are a Postgres-specific migration concern the development
sprint adds when it wires up `GET /search`, not something the ORM reads or
writes directly.

No relationships, no business methods, no validation: that behaviour belongs
to the endpoints that use these tables, one ticket at a time.
"""

import uuid
from datetime import datetime

from sqlalchemy import JSON, Boolean, DateTime, ForeignKey, Integer, Numeric, String, Text, Uuid
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


def _uuid_pk() -> Mapped[uuid.UUID]:
    return mapped_column(Uuid, primary_key=True, default=uuid.uuid4)


def _created_at() -> Mapped[datetime]:
    return mapped_column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)


class Category(Base):
    __tablename__ = "categories"

    id: Mapped[uuid.UUID] = _uuid_pk()
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    slug: Mapped[str] = mapped_column(String(200), unique=True, nullable=False, index=True)
    created_at: Mapped[datetime] = _created_at()


class Product(Base):
    __tablename__ = "products"

    id: Mapped[uuid.UUID] = _uuid_pk()
    category_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("categories.id"))
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    slug: Mapped[str] = mapped_column(String(200), unique=True, nullable=False, index=True)
    description: Mapped[str] = mapped_column(Text, default="")
    published: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    created_at: Mapped[datetime] = _created_at()
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False
    )


class ProductImage(Base):
    __tablename__ = "product_images"

    id: Mapped[uuid.UUID] = _uuid_pk()
    product_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("products.id"), index=True)
    s3_key: Mapped[str] = mapped_column(String(500), nullable=False)
    sort_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    created_at: Mapped[datetime] = _created_at()


class Variant(Base):
    __tablename__ = "variants"

    id: Mapped[uuid.UUID] = _uuid_pk()
    product_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("products.id"), index=True)
    options: Mapped[dict] = mapped_column(JSON, default=dict, nullable=False)
    price: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    fulfilment_type: Mapped[str] = mapped_column(String(50), nullable=False)
    stock_count: Mapped[int | None] = mapped_column(Integer, nullable=True)
    lead_time: Mapped[str | None] = mapped_column(String(100), nullable=True)
    active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)


class Customer(Base):
    __tablename__ = "customers"

    id: Mapped[uuid.UUID] = _uuid_pk()
    email: Mapped[str] = mapped_column(String(320), unique=True, nullable=False, index=True)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    created_at: Mapped[datetime] = _created_at()


class Address(Base):
    __tablename__ = "addresses"

    id: Mapped[uuid.UUID] = _uuid_pk()
    customer_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("customers.id"), index=True)
    recipient_name: Mapped[str] = mapped_column(String(200), nullable=False)
    line1: Mapped[str] = mapped_column(String(300), nullable=False)
    line2: Mapped[str | None] = mapped_column(String(300), nullable=True)
    city: Mapped[str] = mapped_column(String(200), nullable=False)
    postcode: Mapped[str] = mapped_column(String(20), nullable=False)
    country: Mapped[str] = mapped_column(String(100), nullable=False)
    is_default: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)


class StaffUser(Base):
    __tablename__ = "staff_users"

    id: Mapped[uuid.UUID] = _uuid_pk()
    email: Mapped[str] = mapped_column(String(320), unique=True, nullable=False, index=True)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    created_at: Mapped[datetime] = _created_at()


class Cart(Base):
    __tablename__ = "carts"

    id: Mapped[uuid.UUID] = _uuid_pk()
    customer_id: Mapped[uuid.UUID | None] = mapped_column(
        Uuid, ForeignKey("customers.id"), nullable=True
    )
    session_token: Mapped[str | None] = mapped_column(String(255), nullable=True, index=True)
    created_at: Mapped[datetime] = _created_at()
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False
    )


class CartItem(Base):
    __tablename__ = "cart_items"

    id: Mapped[uuid.UUID] = _uuid_pk()
    cart_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("carts.id"), index=True)
    variant_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("variants.id"))
    quantity: Mapped[int] = mapped_column(Integer, nullable=False)


class Order(Base):
    __tablename__ = "orders"

    id: Mapped[uuid.UUID] = _uuid_pk()
    reference: Mapped[str] = mapped_column(String(50), unique=True, nullable=False, index=True)
    customer_id: Mapped[uuid.UUID | None] = mapped_column(
        Uuid, ForeignKey("customers.id"), nullable=True
    )
    email: Mapped[str] = mapped_column(String(320), nullable=False)
    status: Mapped[str] = mapped_column(String(50), nullable=False, default="paid")
    goods_subtotal: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    postage_option_name: Mapped[str] = mapped_column(String(200), nullable=False)
    postage_amount: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    tax_rate: Mapped[float] = mapped_column(Numeric(5, 4), nullable=False)
    tax_amount: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    total: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    currency: Mapped[str] = mapped_column(String(3), nullable=False)
    delivery_address: Mapped[dict] = mapped_column(JSON, nullable=False)
    tracking_number: Mapped[str | None] = mapped_column(String(100), nullable=True)
    stripe_payment_intent_id: Mapped[str | None] = mapped_column(String(255), nullable=True)
    refunded_amount: Mapped[float | None] = mapped_column(Numeric(10, 2), nullable=True)
    refunded_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = _created_at()


class OrderItem(Base):
    __tablename__ = "order_items"

    id: Mapped[uuid.UUID] = _uuid_pk()
    order_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("orders.id"), index=True)
    variant_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("variants.id"))
    product_name: Mapped[str] = mapped_column(String(200), nullable=False)
    variant_options: Mapped[dict] = mapped_column(JSON, default=dict, nullable=False)
    unit_price: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    quantity: Mapped[int] = mapped_column(Integer, nullable=False)
    line_total: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    lead_time: Mapped[str | None] = mapped_column(String(100), nullable=True)


class OrderStatusHistory(Base):
    __tablename__ = "order_status_history"

    id: Mapped[uuid.UUID] = _uuid_pk()
    order_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("orders.id"), index=True)
    status: Mapped[str] = mapped_column(String(50), nullable=False)
    changed_by: Mapped[uuid.UUID | None] = mapped_column(
        Uuid, ForeignKey("staff_users.id"), nullable=True
    )
    changed_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=datetime.utcnow, nullable=False
    )


class PostageOption(Base):
    __tablename__ = "postage_options"

    id: Mapped[uuid.UUID] = _uuid_pk()
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[str | None] = mapped_column(String(500), nullable=True)
    price: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)


class ShopSettings(Base):
    __tablename__ = "shop_settings"

    # Single-row settings table: the admin PUT always targets id=1, so there is
    # exactly one configuration for the shop rather than a table that needs a
    # lookup key.
    id: Mapped[int] = mapped_column(Integer, primary_key=True, default=1)
    currency: Mapped[str] = mapped_column(String(3), default="GBP", nullable=False)
    language: Mapped[str] = mapped_column(String(10), default="en", nullable=False)
    tax_rate: Mapped[float] = mapped_column(Numeric(5, 4), default=0, nullable=False)
    free_postage_enabled: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    free_postage_threshold: Mapped[float | None] = mapped_column(Numeric(10, 2), nullable=True)


class ContentPage(Base):
    __tablename__ = "content_pages"

    id: Mapped[uuid.UUID] = _uuid_pk()
    slug: Mapped[str] = mapped_column(String(100), unique=True, nullable=False, index=True)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    body: Mapped[str] = mapped_column(Text, default="")
    published: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)


class PasswordResetToken(Base):
    __tablename__ = "password_reset_tokens"

    id: Mapped[uuid.UUID] = _uuid_pk()
    customer_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("customers.id"), index=True)
    token_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    used: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)


class EmailLog(Base):
    __tablename__ = "email_log"

    id: Mapped[uuid.UUID] = _uuid_pk()
    order_id: Mapped[uuid.UUID | None] = mapped_column(
        Uuid, ForeignKey("orders.id"), nullable=True, index=True
    )
    email_type: Mapped[str] = mapped_column(String(50), nullable=False)
    recipient: Mapped[str] = mapped_column(String(320), nullable=False)
    status: Mapped[str] = mapped_column(String(50), nullable=False)
    error: Mapped[str | None] = mapped_column(Text, nullable=True)
    sent_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)


class StripeEvent(Base):
    """One row per processed Stripe webhook event id.

    The webhook handler inserts here before acting on an event; a duplicate
    delivery -- Stripe retries until it gets a 200 -- finds its id already
    present and skips reprocessing, which is what keeps stock decrement and
    order creation idempotent (see POST /webhooks/stripe).
    """

    __tablename__ = "stripe_events"

    id: Mapped[uuid.UUID] = _uuid_pk()
    event_id: Mapped[str] = mapped_column(String(255), unique=True, nullable=False, index=True)
    processed_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=datetime.utcnow, nullable=False
    )


__all__ = [
    "Base",
    "Category",
    "Product",
    "ProductImage",
    "Variant",
    "Customer",
    "Address",
    "StaffUser",
    "Cart",
    "CartItem",
    "Order",
    "OrderItem",
    "OrderStatusHistory",
    "PostageOption",
    "ShopSettings",
    "ContentPage",
    "PasswordResetToken",
    "EmailLog",
    "StripeEvent",
]
