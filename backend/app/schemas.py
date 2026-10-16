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


# --- shop settings (US-033): postage options, free-postage threshold, tax ----


class PostageOptionIn(BaseModel):
    """One postage option inside the PUT /admin/settings body. `id` present
    updates an existing option in place; absent, it creates a new one. Any
    existing option not named in the payload is removed (the PUT body is the
    full set of postage options)."""

    id: str | None = None
    name: str = Field(min_length=1)
    description: str = ""
    price: int = Field(ge=0, description="Flat postage price, integer minor units.")
    active: bool = True


class PostageOptionOut(BaseModel):
    """A postage option as returned by GET/PUT /admin/settings."""

    id: str
    name: str
    description: str
    price: int
    active: bool


class ShopSettingsIn(BaseModel):
    """Body of PUT /admin/settings."""

    postage_options: list[PostageOptionIn] = Field(default_factory=list)
    free_postage_enabled: bool = False
    free_postage_threshold: int | None = Field(
        default=None, ge=0, description="Minor units; required spend for free postage."
    )
    tax_rate_bp: int = Field(
        default=0, ge=0, le=10000, description="Single domestic sales-tax rate, basis points."
    )


class ShopSettingsWarnings(BaseModel):
    no_active_postage_option: bool


class ShopSettingsOut(BaseModel):
    """Response of GET/PUT /admin/settings."""

    postage_options: list[PostageOptionOut]
    free_postage_enabled: bool
    free_postage_threshold: int | None
    tax_rate_bp: int
    warnings: ShopSettingsWarnings


class CheckoutQuoteRequest(BaseModel):
    """Body of POST /checkout/quote. Pricing of individual products belongs
    to another ticket, so the quote takes the goods subtotal directly."""

    goods_subtotal: int = Field(ge=0, description="Goods subtotal, integer minor units.")
    postage_option_id: str


class QuotePostageOptionOut(BaseModel):
    """One active postage option as offered in a quote, with its flat price
    and the price it would actually be charged on this quote (zero when free
    postage applies)."""

    id: str
    name: str
    description: str
    price: int
    effective_price: int
    is_free: bool


class CheckoutQuoteResponse(BaseModel):
    """Response of POST /checkout/quote per the agreed contract."""

    goods_subtotal: int
    postage_options: list[QuotePostageOptionOut]
    postage: int
    postage_label: str
    tax: int
    total: int
