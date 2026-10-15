"""FastAPI dependencies shared across routers.

Every endpoint in the API spec marked `auth: JWT`, `auth: Staff JWT` or
`auth: optional JWT or cart session` needs the same bearer-token check; it
lives here once so the routers only declare which guard they need, not how a
guard works. The database session dependency also lives here so routers do
not each re-import `app.database`.

Routers import the `Optional*`/`Required*` aliases at the bottom of this
module rather than writing `Depends(...)` themselves: a bare
`= Depends(...)` default on a route parameter is exactly the pattern
flake8-bugbear's B008 warns against, and wrapping it in `Annotated` once here
is the fix every handler would otherwise have to repeat.
"""

from typing import Annotated

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError
from sqlalchemy.orm import Session

from app.database import get_db as get_db  # re-exported for router convenience
from app.security import decode_access_token

_bearer = HTTPBearer(auto_error=False)
_BearerCreds = Annotated[HTTPAuthorizationCredentials | None, Depends(_bearer)]


def _claims(credentials: HTTPAuthorizationCredentials | None) -> dict | None:
    if credentials is None:
        return None
    try:
        return decode_access_token(credentials.credentials)
    except JWTError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token"
        ) from exc


def optional_customer(credentials: _BearerCreds = None) -> dict | None:
    """Cart, checkout and the order-confirmation view accept either a
    signed-in customer or an anonymous cart/order session, so a missing or
    non-customer token is not an error here -- the handler falls back to its
    session-token identity."""
    claims = _claims(credentials)
    if claims is not None and claims.get("role") != "customer":
        return None
    return claims


def require_customer(credentials: _BearerCreds = None) -> dict:
    claims = _claims(credentials)
    if claims is None or claims.get("role") != "customer":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Customer sign-in required"
        )
    return claims


def require_staff(credentials: _BearerCreds = None) -> dict:
    """A customer token fails this the same way a missing one does (AC-086):
    checking `role == "staff"` rather than merely "is this token valid" is
    what keeps a customer session out of the admin routes."""
    claims = _claims(credentials)
    if claims is None or claims.get("role") != "staff":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Staff sign-in required")
    return claims


DbSession = Annotated[Session, Depends(get_db)]
OptionalCustomer = Annotated[dict | None, Depends(optional_customer)]
RequiredCustomer = Annotated[dict, Depends(require_customer)]
RequiredStaff = Annotated[dict, Depends(require_staff)]
