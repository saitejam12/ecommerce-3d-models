"""The public order-confirmation endpoint, owned by the Shop API Service
(component `api`). Account-scoped order endpoints live in
`app.routers.accounts`; staff order management lives in `app.routers.admin`.

Stub handler only -- see `app.routers.catalogue` for why.
"""

from fastapi import APIRouter

from app.schemas import StubResponse

router = APIRouter(tags=["orders"])


@router.get("/orders/{reference}/confirmation", response_model=StubResponse)
async def get_order_confirmation(reference: str) -> StubResponse:
    """Confirmation view for a just-placed order. Optional JWT or order token."""
    return StubResponse(endpoint=f"GET /orders/{reference}/confirmation")
