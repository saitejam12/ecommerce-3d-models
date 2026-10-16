import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { Button, Badge, Separator } from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { ApiError, getProduct } from "@/lib/api";

const money = (n: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(n);

export default function Product() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const slug = searchParams.get("slug") ?? "";

  const productQuery = useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProduct(slug),
    enabled: !!slug,
    retry: false,
  });

  if (!slug) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">No product selected</h1>
        <Button className="mt-4" onClick={() => navigate("/catalogue")}>
          Back to the shelf
        </Button>
      </div>
    );
  }

  if (productQuery.isLoading) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <p className="text-sm" style={{ color: brand.neutralColor }}>
          Loading product…
        </p>
      </div>
    );
  }

  const isNotFound = productQuery.isError && productQuery.error instanceof ApiError && productQuery.error.status === 404;

  if (isNotFound) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <Icons.AlertCircle className="mx-auto h-7 w-7" style={{ color: brand.primaryColor }} aria-hidden="true" />
        <h1 className="mt-3 text-2xl font-bold">We couldn't find that one</h1>
        <p className="mt-2 text-sm" style={{ color: brand.neutralColor }}>
          This product isn't available any more — it may have been taken off the shelf.
        </p>
        <Button className="mt-5" onClick={() => navigate("/catalogue")}>
          Back to the shelf
        </Button>
      </div>
    );
  }

  if (productQuery.isError) {
    return (
      <div role="alert" className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <p className="mt-2 text-sm" style={{ color: brand.neutralColor }}>
          We couldn't load this product. Please try again.
        </p>
        <Button className="mt-5" onClick={() => productQuery.refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  const product = productQuery.data!;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 pb-20 pt-6 sm:px-6" style={{ fontFamily: brand.fontBody }}>
      <button
        type="button"
        onClick={() => navigate(`/catalogue?category=${encodeURIComponent(product.category.slug)}`)}
        className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium"
        style={{ color: brand.primaryColor }}
      >
        <Icons.ArrowLeft className="h-4 w-4" aria-hidden="true" />
        All of {product.category.name}
      </button>

      <div className="mt-6">
        <Badge>
          <span style={{ color: brand.primaryColor }}>{product.category.name}</span>
        </Badge>
        <h1 className="mt-3 text-3xl font-bold tracking-tight" style={{ fontFamily: brand.fontHeading }}>
          {product.name}
        </h1>
        <p className="mt-4 text-2xl font-bold" style={{ color: brand.primaryColor }}>
          {money(product.price)}
        </p>
        <Separator className="my-6" />
        <p className="max-w-prose text-[15px] leading-relaxed" style={{ color: brand.neutralColor }}>
          {product.description}
        </p>
      </div>
    </div>
  );
}
