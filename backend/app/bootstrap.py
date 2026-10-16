"""Seed/bootstrap path for creating staff accounts.

There is no admin UI yet to invite the first member of staff, so this module
gives two ways in: an environment-driven bootstrap run at startup, and a
plain function later tooling (or tests) can call directly.
"""

import os

from sqlalchemy.orm import Session

from app import models
from app.security import hash_password


def create_staff_user(db: Session, *, email: str, password: str) -> models.StaffUser:
    """Programmatic seed path for creating a staff account."""
    staff = models.StaffUser(email=email, hashed_password=hash_password(password))
    db.add(staff)
    db.commit()
    db.refresh(staff)
    return staff


def ensure_bootstrap_staff(db: Session) -> None:
    """Creates one staff account from STAFF_BOOTSTRAP_EMAIL/PASSWORD if set
    and no staff account exists yet with that email. A no-op in environments
    that do not set those variables, so it is safe to call on every startup.
    """
    email = os.getenv("STAFF_BOOTSTRAP_EMAIL")
    password = os.getenv("STAFF_BOOTSTRAP_PASSWORD")
    if not email or not password:
        return

    existing = db.query(models.StaffUser).filter(models.StaffUser.email == email).first()
    if existing is not None:
        return

    create_staff_user(db, email=email, password=password)


__all__ = ["create_staff_user", "ensure_bootstrap_staff"]
