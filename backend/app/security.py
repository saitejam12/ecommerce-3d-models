"""Shared JWT and password-hashing primitives.

Customer and staff auth are separate login endpoints that issue separate
tokens carrying distinct roles, so a customer token never grants admin access
(architecture note, AC-086). Both still need to hash a password the same way
and mint/verify a JWT the same way, so that logic lives here once rather than
being duplicated by each auth router the development sprint writes.
"""

import os
from datetime import UTC, datetime, timedelta
from typing import Any

from jose import jwt
from jose.exceptions import JWTError
from passlib.context import CryptContext

# Not one of the service keys the product owner withholds (see the ticket):
# this has no external dependency, so it always has a value. It is only a
# placeholder in the sense that the default is insecure -- set JWT_SECRET
# before anything holds a session worth protecting.
JWT_SECRET = os.getenv("JWT_SECRET", "dev-only-insecure-secret-change-me")
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_TTL = timedelta(hours=12)

CUSTOMER_ROLE = "customer"
STAFF_ROLE = "staff"

_pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return _pwd_context.hash(password)


def verify_password(password: str, password_hash: str) -> bool:
    return _pwd_context.verify(password, password_hash)


def create_access_token(subject: str, role: str, expires_delta: timedelta | None = None) -> str:
    """Issues a JWT carrying `role` ("customer" or "staff") -- the claim a
    dependency checks to keep a customer token out of the admin API."""
    expire = datetime.now(UTC) + (expires_delta or ACCESS_TOKEN_TTL)
    payload: dict[str, Any] = {"sub": subject, "role": role, "exp": expire}
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def decode_access_token(token: str) -> dict[str, Any]:
    """Raises `JWTError` on an invalid, tampered or expired token; the FastAPI
    dependency that calls this turns that into a 401."""
    return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])


__all__ = [
    "ACCESS_TOKEN_TTL",
    "CUSTOMER_ROLE",
    "STAFF_ROLE",
    "JWTError",
    "create_access_token",
    "decode_access_token",
    "hash_password",
    "verify_password",
]
