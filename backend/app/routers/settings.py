"""PUT/GET /admin/settings: flat-rate postage options, the optional
free-postage threshold and the single domestic sales-tax rate (US-033).

Every route here requires a staff token via `require_staff`.
"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import models
from app.database import get_db
from app.schemas import (
    PostageOptionOut,
    ShopSettingsIn,
    ShopSettingsOut,
    ShopSettingsWarnings,
)
from app.security import require_staff
from app.settings_service import get_or_create_settings

router = APIRouter(prefix="/admin/settings", tags=["admin-settings"])


def _postage_option_out(option: models.PostageOption) -> PostageOptionOut:
    return PostageOptionOut(
        id=option.id,
        name=option.name,
        description=option.description,
        price=option.price_minor,
        active=option.active,
    )


def _build_out(db: Session, settings: models.ShopSettings) -> ShopSettingsOut:
    options = db.query(models.PostageOption).order_by(models.PostageOption.created_at).all()
    has_active = any(option.active for option in options)
    return ShopSettingsOut(
        postage_options=[_postage_option_out(option) for option in options],
        free_postage_enabled=settings.free_postage_enabled,
        free_postage_threshold=settings.free_postage_threshold_minor,
        tax_rate_bp=settings.tax_rate_bp,
        warnings=ShopSettingsWarnings(no_active_postage_option=not has_active),
    )


@router.get("", response_model=ShopSettingsOut)
def get_settings(
    staff: models.StaffUser = Depends(require_staff),  # noqa: B008
    db: Session = Depends(get_db),  # noqa: B008
) -> ShopSettingsOut:
    settings = get_or_create_settings(db)
    return _build_out(db, settings)


@router.put("", response_model=ShopSettingsOut)
def put_settings(
    payload: ShopSettingsIn,
    staff: models.StaffUser = Depends(require_staff),  # noqa: B008
    db: Session = Depends(get_db),  # noqa: B008
) -> ShopSettingsOut:
    settings = get_or_create_settings(db)
    settings.free_postage_enabled = payload.free_postage_enabled
    settings.free_postage_threshold_minor = payload.free_postage_threshold
    settings.tax_rate_bp = payload.tax_rate_bp

    existing = {option.id: option for option in db.query(models.PostageOption).all()}
    keep_ids: set[str] = set()
    for item in payload.postage_options:
        if item.id and item.id in existing:
            option = existing[item.id]
            option.name = item.name
            option.description = item.description
            option.price_minor = item.price
            option.active = item.active
            keep_ids.add(option.id)
        else:
            option = models.PostageOption(
                name=item.name,
                description=item.description,
                price_minor=item.price,
                active=item.active,
            )
            db.add(option)
            db.flush()
            keep_ids.add(option.id)

    for option_id, option in existing.items():
        if option_id not in keep_ids:
            db.delete(option)

    db.commit()
    db.refresh(settings)
    return _build_out(db, settings)
