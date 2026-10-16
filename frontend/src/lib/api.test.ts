import { beforeEach, describe, expect, it, vi } from "vitest";

import { STAFF_TOKEN_KEY, adminLogin, adminLogout, apiFetch, getStaffToken, isAdminAuthenticated } from "@/lib/api";

describe("staff auth seam", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("stores the staff token after a successful admin login", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ access_token: "tok123", token_type: "bearer" }),
      }),
    );
    await adminLogin("owner@shop.test", "secret");
    expect(getStaffToken()).toBe("tok123");
    expect(isAdminAuthenticated()).toBe(true);
  });

  it("attaches the staff bearer token to /admin/* requests once signed in", async () => {
    window.localStorage.setItem(STAFF_TOKEN_KEY, "tok123");
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ ok: true }),
    });
    vi.stubGlobal("fetch", fetchMock);
    await apiFetch("/admin/orders");
    const [, init] = fetchMock.mock.calls[0];
    expect((init.headers as Record<string, string>).Authorization).toBe("Bearer tok123");
  });

  it("does not attach a staff token to non-admin requests", async () => {
    window.localStorage.setItem(STAFF_TOKEN_KEY, "tok123");
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({}),
    });
    vi.stubGlobal("fetch", fetchMock);
    await apiFetch("/catalogue");
    const [, init] = fetchMock.mock.calls[0];
    expect((init.headers as Record<string, string>).Authorization).toBeUndefined();
  });

  it("clears the staff token when an admin call returns 403", async () => {
    window.localStorage.setItem(STAFF_TOKEN_KEY, "tok123");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 403, json: async () => ({}) }),
    );
    await expect(apiFetch("/admin/orders")).rejects.toThrow();
    expect(isAdminAuthenticated()).toBe(false);
  });

  it("adminLogout clears the stored token", () => {
    window.localStorage.setItem(STAFF_TOKEN_KEY, "tok123");
    adminLogout();
    expect(getStaffToken()).toBeNull();
  });
});
