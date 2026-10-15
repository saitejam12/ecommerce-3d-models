"""Slug generation shared by the admin category and product handlers.

A slug is derived from the human-entered name and must be unique per table
(`categories.slug`, `products.slug` both carry a unique index -- see
`app.models`). Rather than let a duplicate name 500 on the unique-constraint
violation, `unique_slug` finds the next free `-2`, `-3`, ... suffix before the
insert happens.
"""

import re
from typing import Any

from sqlalchemy import select
from sqlalchemy.orm import Session


def slugify(text: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", text.strip().lower()).strip("-")
    return slug or "item"


def unique_slug(db: Session, model: Any, base_slug: str, exclude_id: Any = None) -> str:
    candidate = base_slug
    suffix = 1
    while True:
        stmt = select(model).where(model.slug == candidate)
        if exclude_id is not None:
            stmt = stmt.where(model.id != exclude_id)
        if db.scalars(stmt).first() is None:
            return candidate
        suffix += 1
        candidate = f"{base_slug}-{suffix}"
