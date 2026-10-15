"""Stub routes for admin order management.

GET /admin/orders, POST /admin/orders/{id}/status, POST
/admin/orders/{id}/refund, POST /admin/orders/{id}/emails/{type}/resend. The
refund handler reads Stripe through `app.integrations.stripe_client`; the
resend handler queues through `app.worker` and SendGrid through
`app.integrations.sendgrid_client` -- both turned off with a clear message
when their key is empty, per the development sprint's tickets (US-028,
US-029..032).
"""

from fastapi import APIRouter, status

from app.dependencies import RequiredStaff
from app.schemas import StubResponse

router = APIRouter(prefix="/admin/orders", tags=["admin-orders"])


@router.get("", response_model=StubResponse)
async def list_admin_orders(staff: RequiredStaff) -> StubResponse:
    return StubResponse(endpoint="GET /admin/orders")


@router.post("/{id}/status", response_model=StubResponse)
async def advance_order_status(id: str, staff: RequiredStaff) -> StubResponse:
    return StubResponse(endpoint="POST /admin/orders/{id}/status")


@router.post("/{id}/refund", response_model=StubResponse)
async def refund_order(id: str, staff: RequiredStaff) -> StubResponse:
    return StubResponse(endpoint="POST /admin/orders/{id}/refund")


@router.post(
    "/{id}/emails/{type}/resend", response_model=StubResponse, status_code=status.HTTP_202_ACCEPTED
)
async def resend_order_email(id: str, type: str, staff: RequiredStaff) -> StubResponse:
    return StubResponse(endpoint="POST /admin/orders/{id}/emails/{type}/resend")
