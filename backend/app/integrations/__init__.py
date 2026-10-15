"""Thin clients for the architecture's external services.

Each module here reads its environment variable(s) at the point of use
(`is_configured()` / `get_client()`), never at import time, so this package
can be imported -- and the service can start -- whether or not the product
owner has supplied that service's keys yet. A caller that needs the service
checks `is_configured()` first and falls back to the module's
`DISABLED_MESSAGE` when it is False, rather than let the call fail.
"""
