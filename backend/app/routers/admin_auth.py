"""Staff authentication: POST /admin/auth/login issues a staff JWT distinct
from any customer token; POST /admin/auth/logout ends that session so a
reused token stops granting admin access.
"""

from datetime import UTC, datetime

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app import models
from app.database import get_db
from app.schemas import StaffLoginRequest, StaffLoginResponse, StaffOut
from app.security import STAFF_ROLE, create_access_token, decode_token, verify_password

router = APIRouter(prefix="/admin/auth", tags=["admin-auth"])

_bearer_scheme = HTTPBearer(auto_error=False)


@router.post("/login", response_model=StaffLoginResponse)
def login(
    payload: StaffLoginRequest, db: Session = Depends(get_db)  # noqa: B008
) -> StaffLoginResponse:
    staff = db.query(models.StaffUser).filter(models.StaffUser.email == payload.email).first()
    if (
        staff is None
        or not staff.is_active
        or not verify_password(payload.password, staff.hashed_password)
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password"
        )

    token, jti = create_access_token(subject=staff.id, role=STAFF_ROLE)
    db.add(models.StaffSession(staff_id=staff.id, jti=jti))
    db.commit()

    return StaffLoginResponse(access_token=token, staff=StaffOut(id=staff.id, email=staff.email))


@router.post("/logout")
def logout(
    credentials: HTTPAuthorizationCredentials | None = Depends(_bearer_scheme),  # noqa: B008
    db: Session = Depends(get_db),  # noqa: B008
) -> dict[str, str]:
    if credentials is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")

    payload = decode_token(credentials.credentials)
    jti = payload.get("jti")

    session = db.query(models.StaffSession).filter(models.StaffSession.jti == jti).first()
    if session is not None and session.revoked_at is None:
        session.revoked_at = datetime.now(UTC)
        db.commit()

    return {"status": "signed_out"}
