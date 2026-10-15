"""Pydantic request and response models.

One pair per entity in the approved data model, plus the placeholder every
generated route returns until it has been implemented.
"""

import uuid

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


class CategoryOut(BaseModel):
    """A category as the public storefront sees it: current name and slug,
    nothing about whether it has products -- that filter already happened
    before this is built."""

    id: uuid.UUID
    name: str
    slug: str


class VariantOut(BaseModel):
    id: uuid.UUID
    options: dict
    price: float
    fulfilment_type: str
    stock_count: int | None = None
    lead_time: str | None = None


class ProductSummary(BaseModel):
    """What a listing (category page or search result) shows for a product."""

    id: uuid.UUID
    name: str
    slug: str
    description: str
    price: float | None = None
    image: str | None = None


class ProductDetail(BaseModel):
    """The full product-detail view: current name/description, its category,
    ordered images and its active variants."""

    id: uuid.UUID
    name: str
    slug: str
    description: str
    category: CategoryOut
    images: list[str]
    variants: list[VariantOut]


class CategoryProductsOut(BaseModel):
    category: CategoryOut
    products: list[ProductSummary]
    page: int
    page_size: int
    total: int


class SearchResults(BaseModel):
    query: str
    page: int
    page_size: int
    results: list[ProductSummary]
    total: int
