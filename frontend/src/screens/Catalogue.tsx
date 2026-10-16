import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { Button, Input, Label } from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import {
  ApiError,
  getCategories,
  getCategoryProducts,
  searchProducts,
  type ProductSummary,
} from "@/lib/api";

const money = (n: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(n);

function CategoryNav({
  activeSlug,
  onSelect,
}: {
  activeSlug: string | null;
  onSelect: (slug: string) => void;
}) {
  const categoriesQuery = useQuery({ queryKey: ["categories"], queryFn: getCategories });

  if (categoriesQuery.isLoading) {
    return (
      <p className="text-sm" style={{ color: brand.neutralColor }}>
        Loading categories…
      </p>
    );
  }

  if (categoriesQuery.isError) {
    return (
      <p role="alert" className="text-sm" style={{ color: "#b91c1c" }}>
        Couldn't load the categories. Please try again shortly.
      </p>
    );
  }

  const categories = categoriesQuery.data ?? [];

  if (categories.length === 0) {
    return (
      <p className="text-sm" style={{ color: brand.neutralColor }}>
        No categories yet.
      </p>
    );
  }

  return (
    <ul className="flex flex-wrap gap-2 overflow-x-auto pb-2" aria-label="Shelves">
      {categories.map((category) => {
        const on = category.slug === activeSlug;
        return (
          <li key={category.id}>
            <button
              type="button"
              aria-pressed={on}
              onClick={() => onSelect(category.slug)}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold"
              style={{
                backgroundColor: on ? brand.primaryColor : "#FFFFFF",
                color: on ? "#FFFFFF" : "#3F3B4E",
                border: `1px solid ${on ? brand.primaryColor : "#D8D5E0"}`,
              }}
            >
              {category.name}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function ProductGrid({
  products,
  onOpen,
}: {
  products: ProductSummary[];
  onOpen: (slug: string) => void;
}) {
  if (products.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-6 py-12 text-center">
        <Icons.Package
          className="mx-auto h-7 w-7"
          style={{ color: brand.primaryColor }}
          aria-hidden="true"
        />
        <h3 className="mt-3 text-lg font-bold">Nothing here yet</h3>
        <p className="mt-2 text-sm" style={{ color: brand.neutralColor }}>
          There's nothing published in this shelf right now.
        </p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
      {products.map((product) => (
        <li key={product.id}>
          <button
            type="button"
            onClick={() => onOpen(product.slug)}
            className="flex h-full w-full flex-col overflow-hidden rounded-[var(--brand-radius)] border border-slate-200 bg-white text-left"
          >
            <div className="p-3">
              <p
                className="text-[11px] font-semibold uppercase tracking-wide"
                style={{ color: brand.neutralColor }}
              >
                {product.category.name}
              </p>
              <h3 className="text-[15px] font-bold leading-snug">{product.name}</h3>
              <p className="mt-1 text-sm" style={{ color: brand.neutralColor }}>
                {product.description}
              </p>
              <p className="mt-2 text-sm font-semibold">{money(product.price)}</p>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default function Catalogue() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryInput, setQueryInput] = useState(searchParams.get("q") ?? "");

  const activeCategorySlug = searchParams.get("category");
  const activeQuery = searchParams.get("q");

  const categoriesQuery = useQuery({ queryKey: ["categories"], queryFn: getCategories });

  const effectiveCategorySlug = activeCategorySlug ?? categoriesQuery.data?.[0]?.slug ?? null;

  const productsQuery = useQuery({
    queryKey: ["category-products", effectiveCategorySlug],
    queryFn: () => getCategoryProducts(effectiveCategorySlug as string),
    enabled: !activeQuery && !!effectiveCategorySlug,
  });

  const searchQuery = useQuery({
    queryKey: ["search", activeQuery],
    queryFn: () => searchProducts(activeQuery as string),
    enabled: !!activeQuery,
  });

  const selectCategory = (slug: string) => {
    setSearchParams({ category: slug });
  };

  const openProduct = (slug: string) => {
    navigate(`/product?slug=${encodeURIComponent(slug)}`);
  };

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = queryInput.trim();
    if (trimmed) {
      setSearchParams({ q: trimmed });
    } else {
      setSearchParams({});
    }
  };

  const clearSearch = () => {
    setQueryInput("");
    setSearchParams({});
  };

  const activeCategory = useMemo(
    () => categoriesQuery.data?.find((c) => c.slug === effectiveCategorySlug),
    [categoriesQuery.data, effectiveCategorySlug],
  );

  const isSearching = !!activeQuery;
  const resultsQuery = isSearching ? searchQuery : productsQuery;

  return (
    <div className="min-h-full pb-16" style={{ fontFamily: brand.fontBody, color: "#2A2733" }}>
      <header className="pt-6 sm:pt-10">
        <h1
          className="text-3xl font-extrabold tracking-tight"
          style={{ fontFamily: brand.fontHeading }}
        >
          Everything on the shelf
        </h1>
        <form className="mt-5 flex gap-2" onSubmit={submitSearch}>
          <div className="flex-1">
            <Label htmlFor="shelf-search">Search the shelf</Label>
            <Input
              id="shelf-search"
              type="search"
              value={queryInput}
              onChange={(event) => setQueryInput(event.target.value)}
              placeholder="dragon, planter, 32mm…"
              className="mt-1.5"
            />
          </div>
          <Button type="submit" className="self-end">
            Find it
          </Button>
          {activeQuery && (
            <Button type="button" variant="secondary" className="self-end" onClick={clearSearch}>
              Clear
            </Button>
          )}
        </form>
      </header>

      {!isSearching && (
        <nav className="mt-7" aria-label="Product categories">
          <h2
            className="text-xs font-semibold uppercase tracking-[0.14em]"
            style={{ color: brand.neutralColor }}
          >
            Shelves
          </h2>
          <div className="mt-3">
            <CategoryNav activeSlug={effectiveCategorySlug} onSelect={selectCategory} />
          </div>
        </nav>
      )}

      <section className="mt-6">
        <h2 className="sr-only">Products</h2>

        {isSearching && (
          <p className="mb-3 text-sm" aria-live="polite">
            Results for "{activeQuery}"
          </p>
        )}
        {!isSearching && activeCategory && (
          <p className="mb-3 text-sm" aria-live="polite">
            Showing {activeCategory.name}
          </p>
        )}

        {resultsQuery.isLoading ? (
          <p className="text-sm" style={{ color: brand.neutralColor }}>
            Loading products…
          </p>
        ) : resultsQuery.isError ? (
          <div
            role="alert"
            className="rounded-[var(--brand-radius)] border border-red-200 bg-white p-4"
          >
            <p className="text-sm font-semibold" style={{ color: "#b91c1c" }}>
              Couldn't load products.
            </p>
            <p className="mt-1 text-sm" style={{ color: brand.neutralColor }}>
              {resultsQuery.error instanceof ApiError
                ? `The shop lost its connection (error ${resultsQuery.error.status}).`
                : "The shop lost its connection part-way through loading."}
            </p>
            <Button className="mt-3" onClick={() => resultsQuery.refetch()}>
              Try again
            </Button>
          </div>
        ) : (
          <ProductGrid products={resultsQuery.data ?? []} onOpen={openProduct} />
        )}
      </section>
    </div>
  );
}
