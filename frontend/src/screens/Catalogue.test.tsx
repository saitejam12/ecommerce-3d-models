import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/api", () => ({ apiFetch: vi.fn() }));

import { apiFetch } from "@/lib/api";
import Catalogue from "@/screens/Catalogue";

const mockApiFetch = vi.mocked(apiFetch);

function renderCatalogue(route = "/catalogue") {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/category/:slug" element={<Catalogue />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

const CATEGORIES = [
  { id: 1, slug: "dragons-beasts", name: "Dragons & Beasts" },
  { id: 2, slug: "desk-toys", name: "Desk Toys" },
];

const PRODUCT = {
  id: 10,
  slug: "pocket-dragon",
  name: "Pocket Dragon",
  description: "A tiny articulated dragon.",
  price_from: 14,
  currency: "GBP",
  category: CATEGORIES[0],
};

describe("Catalogue", () => {
  beforeEach(() => {
    mockApiFetch.mockReset();
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading states for categories and products", async () => {
    mockApiFetch.mockImplementation(() => new Promise(() => {}));
    renderCatalogue();
    expect(screen.getByText("Loading categories…")).toBeInTheDocument();
    expect(screen.getByText("Loading products…")).toBeInTheDocument();
  });

  it("renders categories from GET /categories, and a renamed category shows its new name", async () => {
    mockApiFetch.mockImplementation((path: string) => {
      if (path === "/categories") return Promise.resolve(CATEGORIES);
      if (path.startsWith("/search")) return Promise.resolve({ query: "", results: [] });
      return Promise.reject(new Error(`unexpected path ${path}`));
    });
    renderCatalogue();
    await waitFor(() => expect(screen.getByText("Dragons & Beasts")).toBeInTheDocument());
    expect(screen.getByText("Desk Toys")).toBeInTheDocument();
    // a category absent from the response (no published product) never renders
    expect(screen.queryByText("Advent & Seasonal")).not.toBeInTheDocument();
  });

  it("shows a renamed category's new name on its category page heading", async () => {
    const renamed = { id: 1, slug: "dragons-beasts", name: "Dragons & Wyrms" };
    mockApiFetch.mockImplementation((path: string) => {
      if (path === "/categories") return Promise.resolve([renamed]);
      if (path === "/categories/dragons-beasts/products") return Promise.resolve([PRODUCT]);
      return Promise.reject(new Error(`unexpected path ${path}`));
    });
    renderCatalogue("/category/dragons-beasts");
    await waitFor(() =>
      expect(screen.getByRole("heading", { name: "Dragons & Wyrms" })).toBeInTheDocument(),
    );
  });

  it("shows a published product in its category listing", async () => {
    mockApiFetch.mockImplementation((path: string) => {
      if (path === "/categories") return Promise.resolve(CATEGORIES);
      if (path === "/categories/dragons-beasts/products") return Promise.resolve([PRODUCT]);
      return Promise.reject(new Error(`unexpected path ${path}`));
    });
    renderCatalogue("/category/dragons-beasts");
    await waitFor(() => expect(screen.getByText("Pocket Dragon")).toBeInTheDocument());
    expect(screen.getByText("A tiny articulated dragon.")).toBeInTheDocument();
  });

  it("shows an error state with retry when categories fail to load", async () => {
    mockApiFetch.mockImplementation((path: string) => {
      if (path === "/categories") return Promise.reject(new Error("GET /categories failed: 500"));
      return Promise.resolve({ query: "", results: [] });
    });
    renderCatalogue();
    await waitFor(() => expect(screen.getByText("Could not load categories.")).toBeInTheDocument());
    expect(screen.getByRole("button", { name: "Try again" })).toBeInTheDocument();
  });

  it("shows an empty state when a category has no products", async () => {
    mockApiFetch.mockImplementation((path: string) => {
      if (path === "/categories") return Promise.resolve(CATEGORIES);
      if (path === "/categories/desk-toys/products") return Promise.resolve([]);
      return Promise.reject(new Error(`unexpected path ${path}`));
    });
    renderCatalogue("/category/desk-toys");
    await waitFor(() => expect(screen.getByText("No products found.")).toBeInTheDocument());
  });
});
