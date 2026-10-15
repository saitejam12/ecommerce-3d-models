// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

const {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Textarea,
  Label,
  Select,
  Checkbox,
  Switch,
  Badge,
  Table,
  THead,
  TBody,
  TR,
  TH,
  TD,
  Separator,
  Tabs,
} = UI;
const {
  Plus,
  Search,
  Check,
  X,
  Settings,
  FileText,
  Package,
  Clock,
  Trash,
  Edit,
  Filter,
  Upload,
  AlertCircle,
  CheckCircle,
} = Icons;

const money = (n) => "£" + Number(n).toFixed(2);

const INITIAL_CATEGORIES = [
  { id: "cat-1", name: "Desk Toys", slug: "desk-toys", productCount: 4 },
  { id: "cat-2", name: "Dragons & Beasts", slug: "dragons-beasts", productCount: 3 },
  { id: "cat-3", name: "Keychains & Charms", slug: "keychains-charms", productCount: 3 },
  { id: "cat-4", name: "Planters & Pots", slug: "planters-pots", productCount: 3 },
  { id: "cat-5", name: "Tabletop Minis", slug: "tabletop-minis", productCount: 3 },
];

const INITIAL_PRODUCTS = [
  {
    id: "p-101",
    name: "Articulated Pocket Dragon",
    categoryId: "cat-2",
    price: 14.0,
    published: true,
    photos: 5,
    variants: 3,
  },
  {
    id: "p-102",
    name: "Grumpy Cat Desk Guardian",
    categoryId: "cat-1",
    price: 11.5,
    published: true,
    photos: 4,
    variants: 3,
  },
  {
    id: "p-103",
    name: "Hex Fidget Slider",
    categoryId: "cat-1",
    price: 9.0,
    published: true,
    photos: 3,
    variants: 2,
  },
  {
    id: "p-104",
    name: "Moon Snail Planter",
    categoryId: "cat-4",
    price: 18.0,
    published: true,
    photos: 6,
    variants: 2,
  },
  {
    id: "p-119",
    name: "Cherry Blossom Diorama",
    categoryId: "cat-1",
    price: 28.0,
    published: false,
    photos: 0,
    variants: 1,
  },
];

const TAB_ITEMS = [
  { id: "catalogue", label: "Products" },
  { id: "categories", label: "Categories" },
  { id: "settings", label: "Shop settings" },
];

export default function Screen() {
  const navigate = useNavigate();

  const [tab, setTab] = React.useState("catalogue");

  // ---- products ----
  const [products, setProducts] = React.useState(INITIAL_PRODUCTS);
  const [query, setQuery] = React.useState("");
  const [onlyPublished, setOnlyPublished] = React.useState(false);

  // ---- categories ----
  const [categories, setCategories] = React.useState(INITIAL_CATEGORIES);
  const [newCategory, setNewCategory] = React.useState("");
  const [categoryError, setCategoryError] = React.useState("");

  // ---- shop settings ----
  const [settings, setSettings] = React.useState({
    name: "Pocket Shelf",
    currency: "GBP",
    freePostageThreshold: 40,
    trackedPrice: 4.95,
    supportEmail: "nia@pocketshelf.co.uk",
  });
  const [savedNotice, setSavedNotice] = React.useState(false);
  const saveTimer = React.useRef(null);

  React.useEffect(() => () => saveTimer.current && clearTimeout(saveTimer.current), []);

  const categoryName = (id) => categories.find((c) => c.id === id)?.name ?? "Uncategorised";

  const filteredProducts = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (onlyPublished && !p.published) return false;
      if (q && !p.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [products, query, onlyPublished]);

  const togglePublished = (id) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, published: !p.published } : p)));
  };

  const removeProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const addCategory = (e) => {
    e.preventDefault();
    const name = newCategory.trim();
    if (!name) {
      setCategoryError("Give the category a name before adding it.");
      return;
    }
    if (categories.some((c) => c.name.toLowerCase() === name.toLowerCase())) {
      setCategoryError("A category with that name already exists.");
      return;
    }
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    setCategories((prev) => prev.concat([{ id: `cat-${Date.now()}`, name, slug, productCount: 0 }]));
    setNewCategory("");
    setCategoryError("");
  };

  const removeCategory = (id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const saveSettings = (e) => {
    e.preventDefault();
    setSavedNotice(true);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1
            className="text-2xl font-bold tracking-tight"
            style={{ fontFamily: brand.fontHeading }}
          >
            Admin Catalogue & Shop Setup
          </h1>
          <p className="mt-1 text-sm" style={{ color: brand.neutralColor }}>
            Manage what's for sale, how it's organised, and the shop's own settings.
          </p>
        </div>
        <Button variant="secondary" onClick={() => navigate("admin-orders")}>
          <Package size={16} aria-hidden="true" />
          Order queue
        </Button>
      </header>

      <nav className="mt-6 flex gap-2 border-b" style={{ borderColor: "var(--brand-border)" }}>
        {TAB_ITEMS.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              aria-current={active ? "page" : undefined}
              className="-mb-px border-b-2 px-3 py-2 text-sm font-semibold transition-colors"
              style={{
                borderColor: active ? "var(--brand-primary)" : "transparent",
                color: active ? "var(--brand-primary)" : "var(--brand-fg-muted)",
              }}
            >
              {t.label}
            </button>
          );
        })}
      </nav>

      {tab === "catalogue" && (
        <section className="mt-6" aria-label="Products">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-sm flex-1">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: brand.neutralColor }}
                aria-hidden="true"
              />
              <Input
                aria-label="Search products"
                placeholder="Search products…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm" style={{ color: brand.neutralColor }}>
                <Checkbox
                  checked={onlyPublished}
                  onChange={(e) => setOnlyPublished(e.target.checked)}
                />
                Published only
              </label>
              <Button>
                <Plus size={16} aria-hidden="true" />
                Add product
              </Button>
            </div>
          </div>

          <Card className="mt-4">
            {filteredProducts.length === 0 ? (
              <CardContent className="py-10 text-center">
                <Filter className="mx-auto" size={24} style={{ color: brand.neutralColor }} />
                <p className="mt-3 text-sm font-semibold">No products match this search</p>
                <p className="mt-1 text-sm" style={{ color: brand.neutralColor }}>
                  Try a different word, or clear the filters above.
                </p>
              </CardContent>
            ) : (
              <Table>
                <THead>
                  <TR>
                    <TH>Product</TH>
                    <TH>Category</TH>
                    <TH>Price</TH>
                    <TH>Variants</TH>
                    <TH>Status</TH>
                    <TH>Actions</TH>
                  </TR>
                </THead>
                <TBody>
                  {filteredProducts.map((p) => (
                    <TR key={p.id}>
                      <TD className="font-medium text-slate-900">{p.name}</TD>
                      <TD>{categoryName(p.categoryId)}</TD>
                      <TD style={{ fontVariantNumeric: "tabular-nums" }}>{money(p.price)}</TD>
                      <TD>{p.variants}</TD>
                      <TD>
                        <button type="button" onClick={() => togglePublished(p.id)}>
                          <Badge variant={p.published ? "success" : "default"}>
                            {p.published ? (
                              <span className="inline-flex items-center gap-1">
                                <Check size={12} aria-hidden="true" />
                                Published
                              </span>
                            ) : (
                              "Draft"
                            )}
                          </Badge>
                        </button>
                      </TD>
                      <TD>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            aria-label={`Edit ${p.name}`}
                            className="text-slate-500 hover:text-slate-900"
                          >
                            <Edit size={16} aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            aria-label={`Delete ${p.name}`}
                            onClick={() => removeProduct(p.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash size={16} aria-hidden="true" />
                          </button>
                        </div>
                      </TD>
                    </TR>
                  ))}
                </TBody>
              </Table>
            )}
          </Card>
        </section>
      )}

      {tab === "categories" && (
        <section className="mt-6" aria-label="Categories">
          <Card>
            <CardHeader>
              <CardTitle>Shop categories</CardTitle>
              <CardDescription>
                Customers browse the shop by category. Deleting one doesn't delete its products.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="divide-y divide-slate-100">
                {categories.map((c) => (
                  <li key={c.id} className="flex items-center justify-between py-2.5">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{c.name}</p>
                      <p className="text-xs" style={{ color: brand.neutralColor }}>
                        {c.productCount} products · /{c.slug}
                      </p>
                    </div>
                    <button
                      type="button"
                      aria-label={`Delete ${c.name}`}
                      onClick={() => removeCategory(c.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash size={16} aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>

              <form onSubmit={addCategory} className="mt-4 flex items-end gap-2">
                <div className="flex-1">
                  <Label htmlFor="new-category">New category</Label>
                  <Input
                    id="new-category"
                    value={newCategory}
                    onChange={(e) => {
                      setNewCategory(e.target.value);
                      setCategoryError("");
                    }}
                    placeholder="e.g. Advent & Seasonal"
                    className="mt-1"
                  />
                </div>
                <Button type="submit">
                  <Plus size={16} aria-hidden="true" />
                  Add
                </Button>
              </form>
              {categoryError && (
                <p role="alert" className="mt-2 flex items-center gap-1.5 text-sm text-red-600">
                  <AlertCircle size={14} aria-hidden="true" />
                  {categoryError}
                </p>
              )}
            </CardContent>
          </Card>
        </section>
      )}

      {tab === "settings" && (
        <section className="mt-6" aria-label="Shop settings">
          <Card>
            <CardHeader>
              <CardTitle>Shop settings</CardTitle>
              <CardDescription>
                These apply across the storefront: postage thresholds, currency and contact
                details.
              </CardDescription>
            </CardHeader>
            <form onSubmit={saveSettings}>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="shop-name">Shop name</Label>
                  <Input
                    id="shop-name"
                    value={settings.name}
                    onChange={(e) => updateSetting("name", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="support-email">Support email</Label>
                  <Input
                    id="support-email"
                    type="email"
                    value={settings.supportEmail}
                    onChange={(e) => updateSetting("supportEmail", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="free-postage">Free postage threshold</Label>
                  <Input
                    id="free-postage"
                    type="number"
                    min="0"
                    step="0.01"
                    value={settings.freePostageThreshold}
                    onChange={(e) =>
                      updateSetting("freePostageThreshold", Number(e.target.value))
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="tracked-price">Tracked postage price</Label>
                  <Input
                    id="tracked-price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={settings.trackedPrice}
                    onChange={(e) => updateSetting("trackedPrice", Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <span
                  role="status"
                  aria-live="polite"
                  className="flex items-center gap-1.5 text-sm"
                  style={{ color: brand.primaryColor, visibility: savedNotice ? "visible" : "hidden" }}
                >
                  <CheckCircle size={14} aria-hidden="true" />
                  Settings saved
                </span>
                <Button type="submit">
                  <Settings size={16} aria-hidden="true" />
                  Save settings
                </Button>
              </CardFooter>
            </form>
          </Card>
        </section>
      )}
    </div>
  );
}
