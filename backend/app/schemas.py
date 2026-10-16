"""Pydantic request and response models.

One pair per entity in the approved data model, plus the placeholder every
generated route returns until it has been implemented.
"""

from pydantic import BaseModel, ConfigDict, Field


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


class CategoryOut(BaseModel):
    """A category as referenced from a product. Category write routes and
    their own admin endpoints belong to US-001-2."""

    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    slug: str


class ProductCreate(BaseModel):
    """Body of POST /admin/products (AC-001)."""

    name: str = Field(min_length=1, description="Required; the field-level error names this field.")
    description: str | None = None
    category_id: str | None = None
    published: bool = False


class ProductUpdate(BaseModel):
    """Body of PUT/PATCH /admin/products/{id} (AC-002). All fields optional
    so a partial update only touches what is supplied."""

    name: str | None = Field(default=None, min_length=1)
    description: str | None = None
    category_id: str | None = None
    published: bool | None = None


class ProductOut(BaseModel):
    """A product as returned by both admin and public read endpoints."""

    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    slug: str
    description: str | None
    published: bool
    category: CategoryOut | None = None
