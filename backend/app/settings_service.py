"""Shared shop-settings helpers used by the admin settings router and the
checkout quote router, so there is exactly one place that resolves (and
lazily creates) the singleton `ShopSettings` row.
"""

from sqlalchemy.orm import Session

from app import models

SETTINGS_ID = "singleton"


def get_or_create_settings(db: Session) -> models.ShopSettings:
    settings = db.query(models.ShopSettings).filter(models.ShopSettings.id == SETTINGS_ID).first()
    if settings is None:
        settings = models.ShopSettings(id=SETTINGS_ID)
        db.add(settings)
        db.commit()
        db.refresh(settings)
    return settings


__all__ = ["get_or_create_settings", "SETTINGS_ID"]
