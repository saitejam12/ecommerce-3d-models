"""Shared read-model builders for the public storefront catalogue routes.

Both `app.routers.categories` and `app.routers.products` turn the same
`Product`/`Category` ORM rows into the same response shapes (a listing
summary and a full detail view); keeping that logic in one place means the
published-only filter and the response shape cannot drift between the two
routers.
"""

from app.models import Product
from app.schemas import CategoryOut, ProductDetail, ProductSummary, VariantOut


def product_summary(product: Product) -> ProductSummary:
    active_prices = [float(v.price) for v in product.variants if v.active]
    images_sorted = sorted(product.images, key=lambda i: i.sort_order)
    image = images_sorted[0].s3_key if images_sorted else None
    return ProductSummary(
        id=product.id,
        name=product.name,
        slug=product.slug,
        description=product.description,
        price=min(active_prices) if active_prices else None,
        image=image,
    )


def product_detail(product: Product) -> ProductDetail:
    images_sorted = sorted(product.images, key=lambda i: i.sort_order)
    variants = [
        VariantOut(
            id=v.id,
            options=v.options,
            price=float(v.price),
            fulfilment_type=v.fulfilment_type,
            stock_count=v.stock_count,
            lead_time=v.lead_time,
        )
        for v in product.variants
        if v.active
    ]
    return ProductDetail(
        id=product.id,
        name=product.name,
        slug=product.slug,
        description=product.description,
        category=CategoryOut(
            id=product.category.id,
            name=product.category.name,
            slug=product.category.slug,
        ),
        images=[i.s3_key for i in images_sorted],
        variants=variants,
    )
