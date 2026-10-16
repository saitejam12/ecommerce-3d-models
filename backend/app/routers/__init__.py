"""Generated routers: one module per logical group of endpoints the Shop API
Service (component `api`) owns, grouped the way the approved API spec groups
them. `app.main` imports each module and calls `app.include_router()` on it.

catalogue  -- GET /categories, /categories/{slug}/products, /products/{slug},
              /search, /content/{slug}
cart       -- POST/GET/PATCH/DELETE /cart, /cart/items[/{id}]
checkout   -- /checkout/quote, /checkout/payment-intent, /webhooks/stripe
orders     -- GET /orders/{reference}/confirmation
accounts   -- /auth/*, /account/orders[/{reference}], /account/addresses[/{id}]
admin      -- /admin/*
"""
