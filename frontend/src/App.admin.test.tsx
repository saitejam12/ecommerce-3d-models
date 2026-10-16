import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";

import App from "./App";
import { STAFF_TOKEN_KEY } from "@/lib/api";

describe("admin route guard", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("redirects an unauthenticated visit to an admin route to the staff sign-in screen", () => {
    render(
      <MemoryRouter initialEntries={["/admin-orders"]}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { name: /staff sign in/i })).toBeInTheDocument();
    expect(screen.queryAllByRole("row").length).toBe(0);
  });

  it("redirects the other admin route the same way and renders no catalogue data", () => {
    render(
      <MemoryRouter initialEntries={["/admin-shop-setup"]}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { name: /staff sign in/i })).toBeInTheDocument();
    expect(screen.queryByRole("tablist")).not.toBeInTheDocument();
  });

  it("renders the admin area once a staff token is present", () => {
    window.localStorage.setItem(STAFF_TOKEN_KEY, "tok123");
    render(
      <MemoryRouter initialEntries={["/admin-orders"]}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.queryByRole("heading", { name: /staff sign in/i })).not.toBeInTheDocument();
  });

  it("sign-out clears the staff token and lands back on sign-in", async () => {
    const user = userEvent.setup();
    window.localStorage.setItem(STAFF_TOKEN_KEY, "tok123");
    render(
      <MemoryRouter initialEntries={["/admin-orders"]}>
        <App />
      </MemoryRouter>,
    );
    const nav = screen.getByRole("navigation");
    const signOut = within(nav).getByRole("button", { name: /sign out/i });
    await user.click(signOut);
    expect(await screen.findByRole("heading", { name: /staff sign in/i })).toBeInTheDocument();
    expect(window.localStorage.getItem(STAFF_TOKEN_KEY)).toBeNull();
  });
});
