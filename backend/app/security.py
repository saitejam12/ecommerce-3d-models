"""Shared auth primitives: password hashing, JWT issuance/verification, and
the `require_staff` dependency every /admin/* route guards with.

Later admin routers import `require_staff` from here rather than
re-implementing the check, so there is exactly one place that decides what
counts as a valid staff session.
"""

import os
import uuid
from datetime import UTC, datetime, timedelta

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from app import models
from app.database import get_db

# A real deployment injects JWT_SECRET_KEY; the fallback only has to make a
# fresh clone runnable, the same tradeoff database.py makes for SQLite.
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "dev-insecure-secret-change-me")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("JWT_EXPIRE_MINUTES", "60"))

STAFF_ROLE = "staff"
CUSTOMER_ROLE = "customer"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# auto_error=False so a missing header is reported as our own 401 rather than
# FastAPI's default 403, keeping AC-085's status code choice explicit.
_bearer_scheme = HTTPBearer(auto_error=False)


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(password: str, hashed: str) -> bool:
    return pwd_context.verify(password, hashed)


def create_access_token(
    *,
    subject: str,
    role: str,
    expires_minutes: int | None = None,
) -> tuple[str, str]:
    """Returns (token, jti). The jti is what a session row is keyed on."""
    jti = uuid.uuid4().hex
    expire = datetime.now(UTC) + timedelta(minutes=expires_minutes or ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {"sub": subject, "role": role, "jti": jti, "exp": expire}
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return token, jti


def decode_token(token: str) -> dict:
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token"
        ) from exc


def require_staff(
    credentials: HTTPAuthorizationCredentials | None = Depends(_bearer_scheme),  # noqa: B008
    db: Session = Depends(get_db),  # noqa: B008
) -> models.StaffUser:
    """Every /admin/* route (except login) depends on this.

    Rejects: missing/garbled token (401), a token whose role is not "staff"
    -- including a customer token from POST /auth/login (403), and a staff
    token whose session was ended by sign-out (401).
    """
    if credentials is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")

    payload = decode_token(credentials.credentials)

    if payload.get("role") != STAFF_ROLE:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Staff access required"
        )

    jti = payload.get("jti")
    session = (
        db.query(models.StaffSession)
        .filter(models.StaffSession.jti == jti, models.StaffSession.revoked_at.is_(None))
        .first()
    )
    if session is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Session has ended")

    staff = db.query(models.StaffUser).filter(models.StaffUser.id == session.staff_id).first()
    if staff is None or not staff.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Staff account not found"
        )

    return staff


__all__ = [
    "hash_password",
    "verify_password",
    "create_access_token",
    "decode_token",
    "require_staff",
    "STAFF_ROLE",
    "CUSTOMER_ROLE",
]
