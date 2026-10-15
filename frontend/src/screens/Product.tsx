import { useParams } from "react-router-dom";

import { Badge, Button, Separator } from "@/lib/ui";
import { useNavigate } from "@/lib/navigate";
import { isNotFound, useProduct } from "@/lib/catalogue";

const money = (amount: number, currency: string) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: currency || "GBP" }).format(
    amount,
  );

export default function Product() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const productQuery = useProduct(slug);

  if (!slug) {
    return (
      <div className="p-6">
        <p>Choose a product from the catalogue.</p>
        <Button className="mt-4" onClick={() => navigate("catalogue")}>
          Browse the shop
        </Button>
      </div>
    );
  }

  if (productQuery.isLoading) {
    return (
      <div className="p-6" aria-busy="true">
        <p>Loading product…</p>
      </div>
    );
  }

  if (productQuery.isError) {
    if (isNotFound(productQuery.error)) {
      return (
        <div className="p-6" role="alert">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <p className="mt-2">This product isn't available any more.</p>
          <Button className="mt-4" onClick={() => navigate("catalogue")}>
            Back to the shop
          </Button>
        </div>
      );
    }
    return (
      <div className="p-6" role="alert">
        <p>Could not load this product.</p>
        <Button className="mt-4" onClick={() => productQuery.refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  const product = productQuery.data!;

  return (
    <div className="p-6">
      <Button
        variant="secondary"
        onClick={() => navigate(`category/${product.category.slug}`)}
      >
        Back to {product.category.name}
      </Button>

      <h1
        className="mt-4 text-3xl font-bold"
        style={{ fontFamily: "var(--brand-font-heading)" }}
      >
        {product.name}
      </h1>
      <Badge className="mt-2">{product.category.name}</Badge>
      <p className="mt-4 max-w-prose">{product.description}</p>
      <p className="mt-4 text-xl font-semibold">
        from {money(product.price_from, product.currency)}
      </p>

      <Separator className="my-6" />

      <h2 className="text-lg font-semibold">Options</h2>
      {product.variants.length === 0 ? (
        <p className="mt-2">No options are available right now.</p>
      ) : (
        <ul className="mt-2 space-y-2">
          {product.variants.map((variant) => (
            <li key={variant.id} className="flex items-center justify-between gap-4 border-b pb-2">
              <span>{Object.values(variant.options).join(" / ")}</span>
              <span>{money(variant.price, product.currency)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
