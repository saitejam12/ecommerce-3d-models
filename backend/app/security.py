"""JWT issuance/verification and password hashing shared by every ticket that
issues or checks a customer or staff session.

Generated as scaffolding, not as a feature: the architecture notes that
customer and staff JWTs are issued from separate login endpoints and carry
distinct roles so a customer token never grants admin access (AC-086). That
means every one of US-020, US-021, US-024's login/registration handlers needs
the same encode/verify pair with the same secret and the same role claim --
this module is the one place that pair lives, so the handlers cannot drift
from each other.
"""

import os
from datetime import UTC, datetime, timedelta
from typing import Literal

from jose import jwt
from passlib.context import CryptContext

Role = Literal["customer", "staff"]

# A real secret has to be set in the environment before this goes anywhere near
# production. The fallback only keeps `uvicorn app.main:app` runnable on a
# fresh clone with no `.env` file.
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "insecure-development-secret-change-me")
ALGORITHM = "HS256"
DEFAULT_EXPIRE_MINUTES = int(os.getenv("JWT_EXPIRE_MINUTES", "60"))

_pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return _pwd_context.hash(password)


def verify_password(password: str, password_hash: str) -> bool:
    return _pwd_context.verify(password, password_hash)


def create_access_token(subject: str, role: Role, expires_minutes: int | None = None) -> str:
    """Issues a signed JWT whose `role` claim a staff and a customer dependency
    check differently -- that difference is what AC-086 relies on."""
    expire = datetime.now(UTC) + timedelta(
        minutes=expires_minutes if expires_minutes is not None else DEFAULT_EXPIRE_MINUTES
    )
    payload = {"sub": subject, "role": role, "exp": expire}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def decode_access_token(token: str) -> dict:
    """Raises `jose.JWTError` when the token is missing, expired or tampered
    with; callers (see `app.dependencies`) turn that into a 401/403."""
    return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
