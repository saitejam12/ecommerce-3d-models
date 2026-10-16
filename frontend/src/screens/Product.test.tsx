import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, describe, expect, it, vi } from "vitest";

import Product from "./Product";
import * as api from "@/lib/api";
import { ApiError } from "@/lib/api";

function renderScreen(slug = "hoard-dragon") {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[`/product?slug=${slug}`]}>
        <Product />
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

const PRODUCT = {
  id: "p1",
  slug: "hoard-dragon",
  name: "Hoard Dragon",
  description: "A dragon guarding a hoard.",
  price: 24.0,
  category: { slug: "dragons", name: "Dragons & Beasts" },
  images: [],
};

describe("Product", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("shows a loading state before the product arrives", () => {
    vi.spyOn(api, "getProduct").mockReturnValue(new Promise(() => {}));
    renderScreen();
    expect(screen.getByText(/loading product/i)).toBeInTheDocument();
  });

  it("renders the product from GET /products/{slug}", async () => {
    vi.spyOn(api, "getProduct").mockResolvedValue(PRODUCT);
    renderScreen();
    expect(await screen.findByText("Hoard Dragon")).toBeInTheDocument();
    expect(screen.getByText("A dragon guarding a hoard.")).toBeInTheDocument();
  });

  it("shows edited name and description after an admin edit", async () => {
    vi.spyOn(api, "getProduct").mockResolvedValue({
      ...PRODUCT,
      name: "Hoard Dragon (Updated)",
      description: "Now with bigger wings.",
    });
    renderScreen();
    expect(await screen.findByText("Hoard Dragon (Updated)")).toBeInTheDocument();
    expect(screen.getByText("Now with bigger wings.")).toBeInTheDocument();
  });

  it("renders a not-found state when the product is unpublished (404)", async () => {
    vi.spyOn(api, "getProduct").mockRejectedValue(new ApiError("not found", 404));
    renderScreen();
    expect(await screen.findByText(/couldn't find that one/i)).toBeInTheDocument();
  });

  it("renders a generic error state for non-404 failures", async () => {
    vi.spyOn(api, "getProduct").mockRejectedValue(new ApiError("boom", 500));
    renderScreen();
    expect(await screen.findByRole("alert")).toBeInTheDocument();
  });
});
