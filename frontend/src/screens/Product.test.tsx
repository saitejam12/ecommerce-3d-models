import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/api", () => ({ apiFetch: vi.fn() }));

import { apiFetch } from "@/lib/api";
import Product from "@/screens/Product";

const mockApiFetch = vi.mocked(apiFetch);

function renderProduct(slug: string) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={[`/product/${slug}`]}>
        <Routes>
          <Route path="/product/:slug" element={<Product />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

const PRODUCT = {
  id: 10,
  slug: "pocket-dragon",
  name: "Pocket Dragon",
  description: "A tiny articulated dragon.",
  price_from: 14,
  currency: "GBP",
  category: { id: 1, slug: "dragons-beasts", name: "Dragons & Beasts" },
  images: [],
  variants: [
    {
      id: 1,
      options: { Colour: "Ember" },
      price: 14,
      fulfilment_type: "stocked" as const,
      stock_count: 5,
      lead_time: null,
    },
  ],
};

describe("Product", () => {
  beforeEach(() => {
    mockApiFetch.mockReset();
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("shows a loading state", () => {
    mockApiFetch.mockImplementation(() => new Promise(() => {}));
    renderProduct("pocket-dragon");
    expect(screen.getByText("Loading product…")).toBeInTheDocument();
  });

  it("shows the current name and description from GET /products/{slug}", async () => {
    mockApiFetch.mockResolvedValue(PRODUCT);
    renderProduct("pocket-dragon");
    await waitFor(() =>
      expect(screen.getByRole("heading", { name: "Pocket Dragon" })).toBeInTheDocument(),
    );
    expect(screen.getByText("A tiny articulated dragon.")).toBeInTheDocument();
    expect(mockApiFetch).toHaveBeenCalledWith("/products/pocket-dragon");
  });

  it("renders a not-found state with no product details for an unpublished product", async () => {
    mockApiFetch.mockRejectedValue(new Error("GET /products/unpublished failed: 404"));
    renderProduct("unpublished");
    await waitFor(() =>
      expect(screen.getByRole("heading", { name: "Product not found" })).toBeInTheDocument(),
    );
    expect(screen.queryByText("A tiny articulated dragon.")).not.toBeInTheDocument();
    expect(screen.queryByText("Options")).not.toBeInTheDocument();
  });

  it("shows a generic error state with retry for other failures", async () => {
    mockApiFetch.mockRejectedValue(new Error("GET /products/pocket-dragon failed: 500"));
    renderProduct("pocket-dragon");
    await waitFor(() =>
      expect(screen.getByText("Could not load this product.")).toBeInTheDocument(),
    );
    expect(screen.getByRole("button", { name: "Try again" })).toBeInTheDocument();
  });
});
