"""SQLAlchemy models.

StaffUser and StaffSession back the staff authentication flow (US-024):
logging in creates a session row keyed by the token's `jti`, and signing out
marks it revoked so a reused token no longer satisfies `require_staff`.

Category and Product back the product catalogue (US-001): Category is the
minimal shape products reference here; its admin write routes belong to
US-001-2.
"""

import uuid
from datetime import UTC, datetime

from sqlalchemy import Boolean, DateTime, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class StaffUser(Base):
    """A staff/admin account, distinct from customer accounts."""

    __tablename__ = "staff_users"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: uuid.uuid4().hex)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(UTC))

    sessions: Mapped[list["StaffSession"]] = relationship(
        back_populates="staff", cascade="all, delete-orphan"
    )


class StaffSession(Base):
    """One row per issued staff token, so sign-out can revoke it server-side."""

    __tablename__ = "staff_sessions"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: uuid.uuid4().hex)
    staff_id: Mapped[str] = mapped_column(String(36), ForeignKey("staff_users.id"), nullable=False)
    jti: Mapped[str] = mapped_column(String(64), unique=True, index=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(UTC))
    revoked_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)

    staff: Mapped["StaffUser"] = relationship(back_populates="sessions")


class Category(Base):
    """A product category. Admin write routes for this belong to US-001-2;
    this packet only needs the shape so Product can reference it and the
    public `/categories/{slug}/products` route can resolve by slug."""

    __tablename__ = "categories"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: uuid.uuid4().hex)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    slug: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(UTC))

    products: Mapped[list["Product"]] = relationship(back_populates="category")


class Product(Base):
    """A sellable product. `published` gates every public-facing read."""

    __tablename__ = "products"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: uuid.uuid4().hex)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    slug: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    category_id: Mapped[str | None] = mapped_column(
        String(36), ForeignKey("categories.id"), nullable=True
    )
    published: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(UTC))
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(UTC), onupdate=lambda: datetime.now(UTC)
    )

    category: Mapped["Category | None"] = relationship(back_populates="products")


__all__ = ["Base", "StaffUser", "StaffSession", "Category", "Product"]
