// Typed client for the public storefront catalogue API.
//
// Every call here goes through the plain, unauthenticated `apiFetch` --
// never the staff token. The backend for these routes
// (`GET /categories`, `GET /categories/{slug}/products`, `GET /products/{slug}`,
// `GET /search`) is still a stub as of this ticket, so this file defines the
// response shapes the storefront screens are built against; once the real
// handlers land they only need to agree with these types.
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import { apiFetch } from "@/lib/api";

export interface Category {
  id: number;
  slug: string;
  name: string;
}

export interface ProductVariant {
  id: number;
  options: Record<string, string>;
  price: number;
  fulfilment_type: "stocked" | "printed_to_order";
  stock_count: number | null;
  lead_time: string | null;
}

export interface ProductSummary {
  id: number;
  slug: string;
  name: string;
  description: string;
  price_from: number;
  currency: string;
  category: Category;
}

export interface ProductDetail extends ProductSummary {
  images: string[];
  variants: ProductVariant[];
}

export interface SearchResponse {
  query: string;
  results: ProductSummary[];
}

/**
 * True when an `apiFetch` rejection carries a 404. `apiFetch` only throws a
 * generic `Error` with the status folded into its message
 * (`"GET /path failed: 404"`), so this is how a screen tells "not found"
 * apart from "the request broke" without touching the read-only client.
 */
export function isNotFound(error: unknown): boolean {
  return error instanceof Error && /failed: 404$/.test(error.message);
}

export function useCategories(): UseQueryResult<Category[], Error> {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => apiFetch<Category[]>("/categories"),
  });
}

export function useCategoryProducts(
  slug: string | undefined,
): UseQueryResult<ProductSummary[], Error> {
  return useQuery({
    queryKey: ["category-products", slug],
    queryFn: () => apiFetch<ProductSummary[]>(`/categories/${encodeURIComponent(slug!)}/products`),
    enabled: !!slug,
  });
}

export function useSearchProducts(query: string): UseQueryResult<SearchResponse, Error> {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => apiFetch<SearchResponse>(`/search?q=${encodeURIComponent(query)}`),
  });
}

export function useProduct(slug: string | undefined): UseQueryResult<ProductDetail, Error> {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => apiFetch<ProductDetail>(`/products/${encodeURIComponent(slug!)}`),
    enabled: !!slug,
    retry: false,
  });
}
