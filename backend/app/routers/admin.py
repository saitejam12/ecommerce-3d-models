"""Placeholder /admin/* route guarded by `require_staff`.

Later admin routers (orders, catalogue, ...) import `require_staff` from
`app.security` exactly like this one does, rather than re-implementing the
check -- this module exists so the guard has at least one route to protect
ahead of those tickets.
"""

from fastapi import APIRouter, Depends

from app import models
from app.security import require_staff

router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("/ping")
def ping(staff: models.StaffUser = Depends(require_staff)) -> dict[str, str]:  # noqa: B008
    return {"status": "ok", "staff_email": staff.email}
