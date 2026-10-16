"""POST /checkout/quote: applies the shop's active postage options, the
optional free-postage threshold and the single sales-tax rate to a goods
subtotal (US-033). No Stripe calls here -- quote only.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app import models
from app.database import get_db
from app.schemas import (
    CheckoutQuoteRequest,
    CheckoutQuoteResponse,
    QuotePostageOptionOut,
)
from app.settings_service import get_or_create_settings

router = APIRouter(prefix="/checkout", tags=["checkout"])


@router.post("/quote", response_model=CheckoutQuoteResponse)
def quote(
    payload: CheckoutQuoteRequest,
    db: Session = Depends(get_db),  # noqa: B008
) -> CheckoutQuoteResponse:
    settings = get_or_create_settings(db)

    active_options = (
        db.query(models.PostageOption)
        .filter(models.PostageOption.active.is_(True))
        .order_by(models.PostageOption.created_at)
        .all()
    )
    if not active_options:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="No active postage option is available; checkout cannot be completed.",
        )

    chosen = next((o for o in active_options if o.id == payload.postage_option_id), None)
    if chosen is None:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Selected postage option is not available.",
        )

    free_applies = (
        settings.free_postage_enabled
        and settings.free_postage_threshold_minor is not None
        and payload.goods_subtotal >= settings.free_postage_threshold_minor
    )

    postage_options_out = [
        QuotePostageOptionOut(
            id=option.id,
            name=option.name,
            description=option.description,
            price=option.price_minor,
            effective_price=0 if free_applies else option.price_minor,
            is_free=free_applies,
        )
        for option in active_options
    ]

    postage = 0 if free_applies else chosen.price_minor
    postage_label = "Free postage" if free_applies else chosen.name

    # Integer basis-point math; never a float, per the money-in-minor-units rule.
    tax = (payload.goods_subtotal * settings.tax_rate_bp) // 10000
    total = payload.goods_subtotal + postage + tax

    return CheckoutQuoteResponse(
        goods_subtotal=payload.goods_subtotal,
        postage_options=postage_options_out,
        postage=postage,
        postage_label=postage_label,
        tax=tax,
        total=total,
    )
