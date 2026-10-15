"""Application entrypoint.

Generated from the approved architecture: one router per resource group the
API spec declares, one route per endpoint it names. Every generated route is
a stub that returns a typed placeholder, so the service starts, serves its
OpenAPI document and passes its tests before a single handler is implemented.
"""

import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app import models  # noqa: F401 -- imported so the tables register before create_all
from app.database import Base, engine
from app.routers import (
    account,
    admin_auth,
    admin_categories,
    admin_orders,
    admin_products,
    admin_settings,
    auth,
    cart,
    categories,
    checkout,
    content,
    orders,
    products,
    webhooks,
)
from app.services import configured_services

app = FastAPI(
    title="Ecommerce website small 3d models",
    description="ecommerce website for small 3d models",
    version="0.1.0",
)

# The SPA runs on a different origin than the API, so the browser refuses its calls
# unless that origin is allowed here. In development that is the Vite dev server; when
# deployed, the platform injects the frontend's real URL as ALLOWED_ORIGINS (comma
# separated). Point ALLOWED_ORIGINS at the real thing and nothing else has to change.
_dev_origins = ["http://localhost:5173", "http://127.0.0.1:5173"]
_allowed_origins = [o.strip() for o in os.getenv("ALLOWED_ORIGINS", "").split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=_allowed_origins or _dev_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# The scaffold ships no migrations, so the tables are created from the models on
# startup. Replace this with Alembic before anything holds data worth keeping.
Base.metadata.create_all(bind=engine)

for _router in (
    categories.router,
    products.router,
    cart.router,
    checkout.router,
    webhooks.router,
    orders.router,
    auth.router,
    account.router,
    admin_auth.router,
    admin_products.router,
    admin_categories.router,
    admin_orders.router,
    admin_settings.router,
    content.router,
):
    app.include_router(_router)


@app.get("/health")
async def health() -> dict[str, object]:
    """Liveness probe, and the only route here that is not a stub."""
    return {"status": "ok", "services": configured_services()}
