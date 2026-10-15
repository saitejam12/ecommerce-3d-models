"""SQLAlchemy models for the approved data model.

One class per entity the architecture's data model declares, columns matching
one for one, so the catalogue, cart, checkout, order lifecycle, accounts,
admin auth, settings and content-page routers the development sprint writes
have real tables to import from day one.

`products.search_vector` is deliberately left out: `tsvector` is a
Postgres-only type with no SQLite equivalent, and the default engine here is
SQLite (see app.database) so `Base.metadata.create_all` can run with nothing
but a fresh clone. Add the column, its GIN index and the trigger that keeps it
updated through a migration once Alembic replaces `create_all`, when the
deployment target is the real Postgres database.
"""

import uuid
from datetime import datetime

from sqlalchemy import (
    JSON,
    Boolean,
    DateTime,
    ForeignKey,
    Integer,
    Numeric,
    String,
    Text,
    Uuid,
    func,
)
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Category(Base):
    __tablename__ = "categories"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String(200))
    slug: Mapped[str] = mapped_column(String(200), unique=True, index=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


class Product(Base):
    __tablename__ = "products"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=uuid.uuid4)
    category_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("categories.id"))
    name: Mapped[str] = mapped_column(String(200))
    slug: Mapped[str] = mapped_column(String(200), unique=True, index=True)
    description: Mapped[str] = mapped_column(Text, default="")
    # Unpublished products return 404 from every public endpoint (AC-003, AC-038).
    published: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )


class ProductImage(Base):
    __tablename__ = "product_images"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=uuid.uuid4)
    product_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("products.id"))
    # The S3 object key, not a URL: the CDN URL is derived from it at the point
    # of use so a bucket or CDN domain change needs no data migration.
    s3_key: Mapped[str] = mapped_column(String(500))
    sort_order: Mapped[int] = mapped_column(Integer, default=0)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


class Variant(Base):
    __tablename__ = "variants"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=uuid.uuid4)
    product_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("products.id"))
    options: Mapped[dict] = mapped_column(JSON, default=dict)
    price: Mapped[float] = mapped_column(Numeric(10, 2))
    # "stocked" or "printed_to_order".
    fulfilment_type: Mapped[str] = mapped_column(String(30))
    stock_count: Mapped[int | None] = mapped_column(Integer, nullable=True)
    lead_time: Mapped[str | None] = mapped_column(String(200), nullable=True)
    active: Mapped[bool] = mapped_column(Boolean, default=True)


class Customer(Base):
    __tablename__ = "customers"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=uuid.uuid4)
    email: Mapped[str] = mapped_column(String(320), unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(String(200))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


class Address(Base):
    __tablename__ = "addresses"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=uuid.uuid4)
    customer_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("customers.id"))
    recipient_name: Mapped[str] = mapped_column(String(200))
    line1: Mapped[str] = mapped_column(String(200))
    line2: Mapped[str | None] = mapped_column(String(200), nullable=True)
    city: Mapped[str] = mapped_column(String(100))
    postcode: Mapped[str] = mapped_column(String(20))
    country: Mapped[str] = mapped_column(String(100))
    is_default: Mapped[bool] = mapped_column(Boolean, default=False)


class StaffUser(Base):
    __tablename__ = "staff_users"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=uuid.uuid4)
    email: Mapped[str] = mapped_column(String(320), unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(String(200))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


class Cart(Base):
    __tablename__ = "carts"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=uuid.uuid4)
    # Either a signed-in customer or an anonymous session token addresses a
    # cart -- never neither, but that invariant belongs to the handler that
    # creates one, not to the schema.
    customer_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("customers.id"), nullable=True)
    session_token: Mapped[str | None] = mapped_column(String(200), unique=True, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )


class CartItem(Base):
    __tablename__ = "cart_items"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=uuid.uuid4)
    cart_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("carts.id"))
    variant_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("variants.id"))
    quantity: Mapped[int] = mapped_column(Integer, default=1)


class Order(Base):
    __tablename__ = "orders"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=uuid.uuid4)
    # Human-facing order number, distinct from the primary key -- what a
    # customer quotes in an email and what GET /orders/{reference}/... takes.
    reference: Mapped[str] = mapped_column(String(40), unique=True, index=True)
    customer_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("customers.id"), nullable=True)
    email: Mapped[str] = mapped_column(String(320))
    # paid -> printing -> packed -> shipped, plus refunded; validated transitions
    # are the development sprint's business logic, not this column's job.
    status: Mapped[str] = mapped_column(String(30))
    goods_subtotal: Mapped[float] = mapped_column(Numeric(10, 2))
    postage_option_name: Mapped[str] = mapped_column(String(200))
    postage_amount: Mapped[float] = mapped_column(Numeric(10, 2))
    tax_rate: Mapped[float] = mapped_column(Numeric(6, 4))
    tax_amount: Mapped[float] = mapped_column(Numeric(10, 2))
    total: Mapped[float] = mapped_column(Numeric(10, 2))
    currency: Mapped[str] = mapped_column(String(3))
    delivery_address: Mapped[dict] = mapped_column(JSON)
    tracking_number: Mapped[str | None] = mapped_column(String(100), nullable=True)
    stripe_payment_intent_id: Mapped[str | None] = mapped_column(String(200), nullable=True)
    refunded_amount: Mapped[float | None] = mapped_column(Numeric(10, 2), nullable=True)
    refunded_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


class OrderItem(Base):
    __tablename__ = "order_items"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=uuid.uuid4)
    order_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("orders.id"))
    # Nullable: a variant can be edited or removed from the catalogue long
    # after the order that sold it, and the line must still read back.
    variant_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("variants.id"), nullable=True)
    product_name: Mapped[str] = mapped_column(String(200))
    variant_options: Mapped[dict] = mapped_column(JSON, default=dict)
    unit_price: Mapped[float] = mapped_column(Numeric(10, 2))
    quantity: Mapped[int] = mapped_column(Integer)
    line_total: Mapped[float] = mapped_column(Numeric(10, 2))
    lead_time: Mapped[str | None] = mapped_column(String(200), nullable=True)


class OrderStatusHistory(Base):
    __tablename__ = "order_status_history"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=uuid.uuid4)
    order_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("orders.id"))
    status: Mapped[str] = mapped_column(String(30))
    # Null for a system-driven change (e.g. the Stripe webhook marking paid).
    changed_by: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("staff_users.id"), nullable=True
    )
    changed_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


class PostageOption(Base):
    __tablename__ = "postage_options"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String(200))
    description: Mapped[str | None] = mapped_column(String(500), nullable=True)
    price: Mapped[float] = mapped_column(Numeric(10, 2))
    active: Mapped[bool] = mapped_column(Boolean, default=True)


class ShopSettings(Base):
    """A singleton row: one shop, one settings record, `id` always 1."""

    __tablename__ = "shop_settings"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, default=1)
    currency: Mapped[str] = mapped_column(String(3), default="GBP")
    language: Mapped[str] = mapped_column(String(10), default="en")
    tax_rate: Mapped[float] = mapped_column(Numeric(6, 4), default=0)
    free_postage_enabled: Mapped[bool] = mapped_column(Boolean, default=False)
    free_postage_threshold: Mapped[float | None] = mapped_column(Numeric(10, 2), nullable=True)


class ContentPage(Base):
    __tablename__ = "content_pages"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=uuid.uuid4)
    slug: Mapped[str] = mapped_column(String(100), unique=True, index=True)
    title: Mapped[str] = mapped_column(String(200))
    body: Mapped[str] = mapped_column(Text, default="")
    published: Mapped[bool] = mapped_column(Boolean, default=False)


class PasswordResetToken(Base):
    __tablename__ = "password_reset_tokens"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=uuid.uuid4)
    customer_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("customers.id"))
    # The token itself is never stored -- only a hash of it, the same reason
    # passwords are hashed, so a database read alone cannot forge a reset.
    token_hash: Mapped[str] = mapped_column(String(200))
    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    used: Mapped[bool] = mapped_column(Boolean, default=False)


class EmailLog(Base):
    __tablename__ = "email_log"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=uuid.uuid4)
    order_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("orders.id"), nullable=True)
    # "order_confirmation" | "shipped" | "refund".
    email_type: Mapped[str] = mapped_column(String(50))
    recipient: Mapped[str] = mapped_column(String(320))
    status: Mapped[str] = mapped_column(String(30))
    error: Mapped[str | None] = mapped_column(Text, nullable=True)
    sent_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)


class StripeEvent(Base):
    """One row per processed Stripe event ID, so the webhook can tell a retry
    apart from a first delivery and decrement stock exactly once."""

    __tablename__ = "stripe_events"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=uuid.uuid4)
    event_id: Mapped[str] = mapped_column(String(200), unique=True, index=True)
    processed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)


__all__ = [
    "Address",
    "Cart",
    "CartItem",
    "Category",
    "Customer",
    "ContentPage",
    "EmailLog",
    "Order",
    "OrderItem",
    "OrderStatusHistory",
    "PasswordResetToken",
    "PostageOption",
    "Product",
    "ProductImage",
    "ShopSettings",
    "StaffUser",
    "StripeEvent",
    "Variant",
]
