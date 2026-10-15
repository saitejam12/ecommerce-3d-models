import * as React from "react";
import { useParams } from "react-router-dom";

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input } from "@/lib/ui";
import { useNavigate } from "@/lib/navigate";
import {
  useCategories,
  useCategoryProducts,
  useSearchProducts,
  type ProductSummary,
} from "@/lib/catalogue";

const money = (amount: number, currency: string) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: currency || "GBP" }).format(
    amount,
  );

export default function Catalogue() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [query, setQuery] = React.useState("");

  const categoriesQuery = useCategories();
  const categoryProductsQuery = useCategoryProducts(slug);
  const searchQuery = useSearchProducts(query);

  const isCategoryView = !!slug;

  const productsQuery = isCategoryView ? categoryProductsQuery : searchQuery;
  const products: ProductSummary[] = isCategoryView
    ? (categoryProductsQuery.data ?? [])
    : (searchQuery.data?.results ?? []);

  const activeCategory = categoriesQuery.data?.find((c) => c.slug === slug);
  const heading = isCategoryView ? (activeCategory?.name ?? "Category") : "Shop & Category Browse";

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--brand-font-heading)" }}>
        {heading}
      </h1>

      <form className="mt-4 max-w-sm" onSubmit={(e) => e.preventDefault()}>
        <Input
          aria-label="Search products"
          placeholder="Search products…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      <nav className="mt-6" aria-label="Product categories">
        {categoriesQuery.isLoading && <p>Loading categories…</p>}
        {categoriesQuery.isError && (
          <div role="alert">
            <p>Could not load categories.</p>
            <Button onClick={() => categoriesQuery.refetch()}>Try again</Button>
          </div>
        )}
        {categoriesQuery.data && (
          <ul className="flex flex-wrap gap-2">
            <li>
              <Button
                variant={!isCategoryView ? "primary" : "secondary"}
                onClick={() => navigate("catalogue")}
              >
                Everything
              </Button>
            </li>
            {categoriesQuery.data.map((category) => (
              <li key={category.id}>
                <Button
                  variant={slug === category.slug ? "primary" : "secondary"}
                  onClick={() => navigate(`category/${category.slug}`)}
                >
                  {category.name}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </nav>

      <section className="mt-6" aria-busy={productsQuery.isLoading}>
        <h2 className="sr-only">Products</h2>

        {productsQuery.isLoading && <p>Loading products…</p>}

        {productsQuery.isError && (
          <div role="alert">
            <p>Could not load products.</p>
            <Button onClick={() => productsQuery.refetch()}>Try again</Button>
          </div>
        )}

        {!productsQuery.isLoading && !productsQuery.isError && products.length === 0 && (
          <p>No products found.</p>
        )}

        {products.length > 0 && (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <li key={product.id}>
                <Card className="h-full">
                  <button
                    type="button"
                    className="block h-full w-full text-left"
                    onClick={() => navigate(`product/${product.slug}`)}
                  >
                    <CardHeader>
                      <CardTitle>{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm font-semibold">
                        from {money(product.price_from, product.currency)}
                      </p>
                    </CardContent>
                  </button>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
