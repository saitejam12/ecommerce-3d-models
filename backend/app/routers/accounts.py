"""Customer auth and account endpoints owned by the Shop API Service
(component `api`).

Stub handlers only -- see `app.routers.catalogue` for why. The architecture
note that the customer JWT and the staff JWT come from separate login
endpoints and carry distinct roles (AC-086) applies here and in
`app.routers.admin`: a customer token must never satisfy a Staff-JWT
dependency, so the two must not share a verification function once real auth
is implemented.
"""

from fastapi import APIRouter

from app.schemas import StubResponse

router = APIRouter(tags=["accounts"])


@router.post("/auth/register", response_model=StubResponse)
async def register(payload: dict | None = None) -> StubResponse:
    """Registers a customer account with email and password."""
    return StubResponse(endpoint="POST /auth/register")


@router.post("/auth/login", response_model=StubResponse)
async def login(payload: dict | None = None) -> StubResponse:
    """Signs in a customer, preserving their cart."""
    return StubResponse(endpoint="POST /auth/login")


@router.post("/auth/password-reset/request", status_code=202)
async def request_password_reset(payload: dict | None = None) -> dict[str, str]:
    """Requests a time-limited password reset email."""
    return {"status": "accepted"}


@router.post("/auth/password-reset/confirm", response_model=StubResponse)
async def confirm_password_reset(payload: dict | None = None) -> StubResponse:
    """Sets a new password using a valid reset token."""
    return StubResponse(endpoint="POST /auth/password-reset/confirm")


@router.get("/account/orders", response_model=list[StubResponse])
async def list_account_orders() -> list[StubResponse]:
    """The signed-in customer's orders, newest first. Customer JWT required."""
    return [StubResponse(endpoint="GET /account/orders")]


@router.get("/account/orders/{reference}", response_model=StubResponse)
async def get_account_order(reference: str) -> StubResponse:
    """Order detail for the signed-in customer; refuses other customers'
    orders. Customer JWT required."""
    return StubResponse(endpoint=f"GET /account/orders/{reference}")


@router.get("/account/addresses", response_model=list[StubResponse])
async def list_addresses() -> list[StubResponse]:
    """Saved addresses for the signed-in customer. Customer JWT required."""
    return [StubResponse(endpoint="GET /account/addresses")]


@router.post("/account/addresses", response_model=StubResponse)
async def create_address(payload: dict | None = None) -> StubResponse:
    """Saves a new address. Customer JWT required."""
    return StubResponse(endpoint="POST /account/addresses")


@router.patch("/account/addresses/{address_id}", response_model=StubResponse)
async def update_address(address_id: str, payload: dict | None = None) -> StubResponse:
    """Edits a saved address. Customer JWT required."""
    return StubResponse(endpoint=f"PATCH /account/addresses/{address_id}")


@router.delete("/account/addresses/{address_id}", response_model=StubResponse)
async def delete_address(address_id: str) -> StubResponse:
    """Removes a saved address. Customer JWT required."""
    return StubResponse(endpoint=f"DELETE /account/addresses/{address_id}")
