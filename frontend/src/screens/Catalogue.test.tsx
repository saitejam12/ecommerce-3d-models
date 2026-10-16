import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, describe, expect, it, vi } from "vitest";

import Catalogue from "./Catalogue";
import * as api from "@/lib/api";
import { ApiError } from "@/lib/api";

function renderScreen() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={["/catalogue"]}>
        <Catalogue />
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

const CATEGORIES = [
  { id: "c1", slug: "desk-toys", name: "Desk Toys" },
  { id: "c2", slug: "planters", name: "Planters" },
];

const PRODUCTS = [
  {
    id: "p1",
    slug: "hex-fidget",
    name: "Hex Fidget",
    description: "A fidget",
    price: 9.0,
    category: { slug: "desk-toys", name: "Desk Toys" },
  },
];

describe("Catalogue", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("shows a loading state before categories arrive", () => {
    vi.spyOn(api, "getCategories").mockReturnValue(new Promise(() => {}));
    vi.spyOn(api, "getCategoryProducts").mockReturnValue(new Promise(() => {}));
    renderScreen();
    expect(screen.getByText(/loading categories/i)).toBeInTheDocument();
  });

  it("renders categories from GET /categories and products from GET /categories/{slug}/products", async () => {
    vi.spyOn(api, "getCategories").mockResolvedValue(CATEGORIES);
    vi.spyOn(api, "getCategoryProducts").mockResolvedValue(PRODUCTS);
    renderScreen();
    expect(await screen.findByText("Desk Toys")).toBeInTheDocument();
    expect(screen.getByText("Planters")).toBeInTheDocument();
    await waitFor(() => expect(api.getCategoryProducts).toHaveBeenCalledWith("desk-toys"));
    expect(await screen.findByText("Hex Fidget")).toBeInTheDocument();
  });

  it("shows an empty state when a category has no published products", async () => {
    vi.spyOn(api, "getCategories").mockResolvedValue(CATEGORIES);
    vi.spyOn(api, "getCategoryProducts").mockResolvedValue([]);
    renderScreen();
    expect(await screen.findByText(/nothing here yet/i)).toBeInTheDocument();
  });

  it("shows an error state when products fail to load", async () => {
    vi.spyOn(api, "getCategories").mockResolvedValue(CATEGORIES);
    vi.spyOn(api, "getCategoryProducts").mockRejectedValue(new ApiError("boom", 500));
    renderScreen();
    expect(await screen.findByRole("alert")).toHaveTextContent(/couldn't load products/i);
  });

  it("switches category and refetches its products", async () => {
    const user = userEvent.setup();
    vi.spyOn(api, "getCategories").mockResolvedValue(CATEGORIES);
    vi.spyOn(api, "getCategoryProducts").mockResolvedValue(PRODUCTS);
    renderScreen();
    await screen.findByText("Hex Fidget");
    await user.click(screen.getByText("Planters"));
    await waitFor(() => expect(api.getCategoryProducts).toHaveBeenCalledWith("planters"));
  });

  it("uses GET /search when a search query is submitted", async () => {
    const user = userEvent.setup();
    vi.spyOn(api, "getCategories").mockResolvedValue(CATEGORIES);
    vi.spyOn(api, "getCategoryProducts").mockResolvedValue(PRODUCTS);
    vi.spyOn(api, "searchProducts").mockResolvedValue(PRODUCTS);
    renderScreen();
    await screen.findByText("Hex Fidget");
    await user.type(screen.getByLabelText(/search the shelf/i), "hex");
    await user.click(screen.getByRole("button", { name: /find it/i }));
    await waitFor(() => expect(api.searchProducts).toHaveBeenCalledWith("hex"));
  });
});
