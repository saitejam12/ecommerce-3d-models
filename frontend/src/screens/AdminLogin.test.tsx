import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, describe, expect, it, vi } from "vitest";

import AdminLogin from "./AdminLogin";
import * as api from "@/lib/api";

function renderScreen() {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <AdminLogin />
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe("AdminLogin", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders an email and password form", () => {
    renderScreen();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  it("calls the admin login endpoint with the entered credentials", async () => {
    const user = userEvent.setup();
    vi.spyOn(api, "adminLogin").mockResolvedValue({ access_token: "tok1", token_type: "bearer" });
    renderScreen();
    await user.type(screen.getByLabelText(/email/i), "owner@shop.test");
    await user.type(screen.getByLabelText(/password/i), "secret123");
    await user.click(screen.getByRole("button", { name: /sign in/i }));
    await waitFor(() =>
      expect(api.adminLogin).toHaveBeenCalledWith("owner@shop.test", "secret123"),
    );
  });

  it("shows an error message when sign-in fails", async () => {
    const user = userEvent.setup();
    vi.spyOn(api, "adminLogin").mockRejectedValue(new Error("POST /admin/auth/login failed: 401"));
    renderScreen();
    await user.type(screen.getByLabelText(/email/i), "owner@shop.test");
    await user.type(screen.getByLabelText(/password/i), "wrong");
    await user.click(screen.getByRole("button", { name: /sign in/i }));
    expect(await screen.findByRole("alert")).toHaveTextContent(/incorrect/i);
  });
});
