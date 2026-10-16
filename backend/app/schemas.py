"""Pydantic request and response models.

One pair per entity in the approved data model, plus the placeholder every
generated route returns until it has been implemented.
"""

from pydantic import BaseModel


class StubResponse(BaseModel):
    """What a generated route returns until someone implements it.

    A stub that returns a typed body rather than raising keeps the service
    startable and its OpenAPI document complete, so the frontend can be built
    against the agreed shape while the handlers are still being written.
    """

    endpoint: str
    status: str = "not_implemented"
    detail: str = "Scaffolded from the approved API spec; no behaviour yet."


class StaffLoginRequest(BaseModel):
    """Body of POST /admin/auth/login."""

    email: str
    password: str


class StaffOut(BaseModel):
    """The staff record returned alongside a token."""

    id: str
    email: str


class StaffLoginResponse(BaseModel):
    """Response of POST /admin/auth/login per the agreed contract."""

    access_token: str
    token_type: str = "bearer"
    staff: StaffOut
