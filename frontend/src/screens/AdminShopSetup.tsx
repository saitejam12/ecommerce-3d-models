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
} = UI;

const {
  Plus,
  Search,
  Settings,
  Trash,
  Upload,
  X,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Edit,
  FileText,
  Filter,
  Package,
} = Icons;

const money = (n) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(n);

const CATEGORIES = [
  { id: 1, name: "Desk Toys" },
  { id: 2, name: "Dragons & Beasts" },
  { id: 3, name: "Keychains & Charms" },
  { id: 4, name: "Planters & Pots" },
  { id: 5, name: "Tabletop Minis" },
  { id: 6, name: "Advent & Seasonal" },
];

const INITIAL_PRODUCTS = [
  {
    id: "p-101",
    name: "Articulated Pocket Dragon",
    category_id: 2,
    price: 14.0,
    stock_count: 6,
    fulfilment_type: "printed_to_order",
    published: true,
    photos: 5,
  },
  {
    id: "p-102",
    name: "Grumpy Cat Desk Guardian",
    category_id: 1,
    price: 11.5,
    stock_count: 6,
    fulfilment_type: "stocked",
    published: true,
    photos: 4,
  },
  {
    id: "p-103",
    name: "Hex Fidget Slider",
    category_id: 1,
    price: 9.0,
    stock_count: 2,
    fulfilment_type: "stocked",
    published: true,
    photos: 3,
  },
  {
    id: "p-104",
    name: "Moon Snail Planter",
    category_id: 4,
    price: 18.0,
    stock_count: 0,
    fulfilment_type: "stocked",
    published: true,
    photos: 6,
  },
  {
    id: "p-105",
    name: "Tiny Axolotl Charm",
    category_id: 3,
    price: 5.5,
    stock_count: 24,
    fulfilment_type: "stocked",
    published: true,
    photos: 3,
  },
  {
    id: "p-119",
    name: "Cherry Blossom Diorama",
    category_id: 1,
    price: 28.0,
    stock_count: 0,
    fulfilment_type: "stocked",
    published: false,
    photos: 0,
  },
];

const EMPTY_FORM = {
  id: null,
  name: "",
  category_id: CATEGORIES[0].id,
  price: "",
  stock_count: "",
  fulfilment_type: "stocked",
  published: true,
};

function categoryName(id) {
  return CATEGORIES.find((c) => c.id === id)?.name ?? "Uncategorised";
}

export default function Screen() {
  const navigate = useNavigate();

  const [tab, setTab] = React.useState("products");
  const [products, setProducts] = React.useState(INITIAL_PRODUCTS);
  const [query, setQuery] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState("all");
  const [editing, setEditing] = React.useState(null); // product id, or "new"
  const [form, setForm] = React.useState(EMPTY_FORM);
  const [formErrors, setFormErrors] = React.useState({});
  const [confirmDeleteId, setConfirmDeleteId] = React.useState(null);
  const [saveState, setSaveState] = React.useState("idle"); // idle | saving | saved
  const [toast, setToast] = React.useState(null);

  const [shopSettings, setShopSettings] = React.useState({
    name: "Pocket Shelf",
    currency: "GBP",
    freePostageThreshold: 40,
    trackedPrice: 4.95,
    supportEmail: "nia@pocketshelf.co.uk",
  });
  const [settingsSaved, setSettingsSaved] = React.useState(false);

  const toastTimer = React.useRef(null);
  React.useEffect(() => () => clearTimeout(toastTimer.current), []);

  const showToast = (message) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2800);
  };

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (categoryFilter !== "all" && p.category_id !== categoryFilter) return false;
      if (q && !p.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [products, query, categoryFilter]);

  const openNew = () => {
    setForm(EMPTY_FORM);
    setFormErrors({});
    setEditing("new");
  };

  const openEdit = (product) => {
    setForm({
      id: product.id,
      name: product.name,
      category_id: product.category_id,
      price: String(product.price),
      stock_count: String(product.stock_count ?? ""),
      fulfilment_type: product.fulfilment_type,
      published: product.published,
    });
    setFormErrors({});
    setEditing(product.id);
  };

  const closeForm = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setFormErrors({});
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name.trim()) errors.name = "Give the listing a name.";
    const priceNum = Number(values.price);
    if (!values.price || Number.isNaN(priceNum) || priceNum <= 0) {
      errors.price = "Enter a price greater than zero.";
    }
    if (values.fulfilment_type === "stocked") {
      const stockNum = Number(values.stock_count);
      if (values.stock_count === "" || Number.isNaN(stockNum) || stockNum < 0) {
        errors.stock_count = "Enter how many are on the shelf.";
      }
    }
    return errors;
  };

  const submitForm = (e) => {
    e.preventDefault();
    const errors = validate(form);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSaveState("saving");
    const payload = {
      id: form.id ?? `p-${Date.now()}`,
      name: form.name.trim(),
      category_id: form.category_id,
      price: Number(form.price),
      stock_count: form.fulfilment_type === "stocked" ? Number(form.stock_count) : null,
      fulfilment_type: form.fulfilment_type,
      published: form.published,
      photos: 0,
    };

    window.setTimeout(() => {
      setProducts((prev) => {
        if (form.id) {
          return prev.map((p) => (p.id === form.id ? { ...p, ...payload } : p));
        }
        return [payload, ...prev];
      });
      setSaveState("saved");
      showToast(form.id ? "Listing updated." : "Listing created.");
      window.setTimeout(() => setSaveState("idle"), 600);
      closeForm();
    }, 400);
  };

  const confirmDelete = (id) => setConfirmDeleteId(id);
  const cancelDelete = () => setConfirmDeleteId(null);
  const doDelete = () => {
    setProducts((prev) => prev.filter((p) => p.id !== confirmDeleteId));
    showToast("Listing deleted.");
    setConfirmDeleteId(null);
  };

  const togglePublished = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, published: !p.published } : p)),
    );
  };

  const saveSettings = (e) => {
    e.preventDefault();
    setSettingsSaved(true);
    showToast("Shop settings saved.");
    window.setTimeout(() => setSettingsSaved(false), 1600);
  };

  const editingProduct = editing && editing !== "new" ? products.find((p) => p.id === editing) : null;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-20 pt-6 sm:px-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1
            className="text-2xl font-bold tracking-tight"
            style={{ fontFamily: brand.fontHeading }}
          >
            Catalogue &amp; shop setup
          </h1>
          <p className="mt-1 text-sm" style={{ color: brand.neutralColor }}>
            Manage listings, stock and the details customers see at checkout.
          </p>
        </div>
        <Button
          onClick={() => navigate("admin-orders")}
          variant="secondary"
          className="inline-flex items-center gap-2"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Order queue
        </Button>
      </header>

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="mt-4 flex items-center gap-2 rounded-[var(--brand-radius)] px-4 py-3 text-sm font-medium text-white"
          style={{ backgroundColor: brand.primaryColor }}
        >
          <CheckCircle size={16} aria-hidden="true" />
          {toast}
        </div>
      )}

      <div
        role="tablist"
        aria-label="Shop setup sections"
        className="mt-6 flex gap-2 border-b"
        style={{ borderColor: "var(--brand-border)" }}
      >
        {[
          { id: "products", label: "Products", Icon: Package },
          { id: "settings", label: "Shop settings", Icon: Settings },
        ].map((t) => (
          <button
            key={t.id}
            role="tab"
            type="button"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className="-mb-px inline-flex items-center gap-2 border-b-2 px-3 py-2.5 text-sm font-semibold"
            style={{
              borderColor: tab === t.id ? brand.primaryColor : "transparent",
              color: tab === t.id ? brand.primaryColor : brand.neutralColor,
            }}
          >
            <t.Icon size={16} aria-hidden="true" />
            {t.label}
          </button>
        ))}
      </div>

      {tab === "products" && (
        <section className="mt-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative flex-1 sm:max-w-xs">
                <Search
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: brand.neutralColor }}
                  aria-hidden="true"
                />
                <Input
                  aria-label="Search listings"
                  placeholder="Search listings…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter size={16} style={{ color: brand.neutralColor }} aria-hidden="true" />
                <Select
                  aria-label="Filter by category"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  options={[
                    { value: "all", label: "All categories" },
                    ...CATEGORIES.map((c) => ({ value: c.id, label: c.name })),
                  ]}
                />
              </div>
            </div>
            <Button onClick={openNew} className="inline-flex items-center gap-2">
              <Plus size={16} aria-hidden="true" />
              Add listing
            </Button>
          </div>

          <Card className="mt-4">
            <CardContent className="p-0">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center gap-2 px-6 py-12 text-center">
                  <FileText size={28} style={{ color: brand.neutralColor }} aria-hidden="true" />
                  <p className="text-sm font-semibold">No listings match that search</p>
                  <p className="text-sm" style={{ color: brand.neutralColor }}>
                    Try a different search term or category, or add a new listing.
                  </p>
                </div>
              ) : (
                <Table>
                  <THead>
                    <TR>
                      <TH>Listing</TH>
                      <TH>Category</TH>
                      <TH>Price</TH>
                      <TH>Stock</TH>
                      <TH>Status</TH>
                      <TH>
                        <span className="sr-only">Actions</span>
                      </TH>
                    </TR>
                  </THead>
                  <TBody>
                    {filtered.map((p) => (
                      <TR key={p.id}>
                        <TD className="font-medium">{p.name}</TD>
                        <TD>{categoryName(p.category_id)}</TD>
                        <TD>{money(p.price)}</TD>
                        <TD>
                          {p.fulfilment_type === "stocked" ? (
                            p.stock_count > 0 ? (
                              `${p.stock_count} on shelf`
                            ) : (
                              <span className="inline-flex items-center gap-1" style={{ color: "#b91c1c" }}>
                                <AlertCircle size={14} aria-hidden="true" />
                                Out of stock
                              </span>
                            )
                          ) : (
                            <span className="inline-flex items-center gap-1">
                              <Clock size={14} aria-hidden="true" />
                              Printed to order
                            </span>
                          )}
                        </TD>
                        <TD>
                          <button
                            type="button"
                            onClick={() => togglePublished(p.id)}
                            className="inline-flex items-center"
                          >
                            <Badge variant={p.published ? "success" : "default"}>
                              {p.published ? "Published" : "Draft"}
                            </Badge>
                          </button>
                        </TD>
                        <TD>
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              aria-label={`Edit ${p.name}`}
                              onClick={() => openEdit(p)}
                            >
                              <Edit size={15} aria-hidden="true" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              aria-label={`Delete ${p.name}`}
                              onClick={() => confirmDelete(p.id)}
                            >
                              <Trash size={15} aria-hidden="true" />
                            </Button>
                          </div>
                        </TD>
                      </TR>
                    ))}
                  </TBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </section>
      )}

      {tab === "settings" && (
        <section className="mt-6">
          <Card>
            <form onSubmit={saveSettings}>
              <CardHeader>
                <CardTitle>Shop details</CardTitle>
                <CardDescription>
                  These details appear on the storefront and in order confirmations.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="shop-name">Shop name</Label>
                  <Input
                    id="shop-name"
                    className="mt-1.5"
                    value={shopSettings.name}
                    onChange={(e) =>
                      setShopSettings((s) => ({ ...s, name: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="support-email">Support email</Label>
                  <Input
                    id="support-email"
                    type="email"
                    className="mt-1.5"
                    value={shopSettings.supportEmail}
                    onChange={(e) =>
                      setShopSettings((s) => ({ ...s, supportEmail: e.target.value }))
                    }
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="free-postage">Free postage threshold</Label>
                    <Input
                      id="free-postage"
                      type="number"
                      min="0"
                      step="0.01"
                      className="mt-1.5"
                      value={shopSettings.freePostageThreshold}
                      onChange={(e) =>
                        setShopSettings((s) => ({
                          ...s,
                          freePostageThreshold: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="tracked-price">Tracked postage price</Label>
                    <Input
                      id="tracked-price"
                      type="number"
                      min="0"
                      step="0.01"
                      className="mt-1.5"
                      value={shopSettings.trackedPrice}
                      onChange={(e) =>
                        setShopSettings((s) => ({ ...s, trackedPrice: e.target.value }))
                      }
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end gap-2">
                {settingsSaved && (
                  <span
                    className="inline-flex items-center gap-1.5 text-sm font-medium"
                    style={{ color: brand.primaryColor }}
                  >
                    <Check size={16} aria-hidden="true" />
                    Saved
                  </span>
                )}
                <Button type="submit">Save settings</Button>
              </CardFooter>
            </form>
          </Card>
        </section>
      )}

      {editing && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={editing === "new" ? "Add listing" : "Edit listing"}
          className="fixed inset-0 z-20 flex items-start justify-center overflow-y-auto bg-black/40 p-4 pt-10"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeForm();
          }}
        >
          <Card className="w-full max-w-lg">
            <form onSubmit={submitForm}>
              <CardHeader className="flex-row items-start justify-between">
                <div>
                  <CardTitle>{editing === "new" ? "Add listing" : "Edit listing"}</CardTitle>
                  <CardDescription>
                    {editing === "new"
                      ? "Create a new product for the storefront."
                      : `Editing ${editingProduct?.name ?? ""}`}
                  </CardDescription>
                </div>
                <Button type="button" variant="ghost" size="sm" aria-label="Close" onClick={closeForm}>
                  <X size={16} aria-hidden="true" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="product-name">Name</Label>
                  <Input
                    id="product-name"
                    className="mt-1.5"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-xs" style={{ color: "#b91c1c" }}>
                      {formErrors.name}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="product-category">Category</Label>
                  <Select
                    id="product-category"
                    className="mt-1.5"
                    value={form.category_id}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, category_id: Number(e.target.value) }))
                    }
                    options={CATEGORIES.map((c) => ({ value: c.id, label: c.name }))}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="product-price">Price</Label>
                    <Input
                      id="product-price"
                      type="number"
                      min="0"
                      step="0.01"
                      className="mt-1.5"
                      value={form.price}
                      onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                    />
                    {formErrors.price && (
                      <p className="mt-1 text-xs" style={{ color: "#b91c1c" }}>
                        {formErrors.price}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="product-fulfilment">Fulfilment</Label>
                    <Select
                      id="product-fulfilment"
                      className="mt-1.5"
                      value={form.fulfilment_type}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, fulfilment_type: e.target.value }))
                      }
                      options={[
                        { value: "stocked", label: "Stocked" },
                        { value: "printed_to_order", label: "Printed to order" },
                      ]}
                    />
                  </div>
                </div>
                {form.fulfilment_type === "stocked" && (
                  <div>
                    <Label htmlFor="product-stock">Stock on shelf</Label>
                    <Input
                      id="product-stock"
                      type="number"
                      min="0"
                      className="mt-1.5"
                      value={form.stock_count}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, stock_count: e.target.value }))
                      }
                    />
                    {formErrors.stock_count && (
                      <p className="mt-1 text-xs" style={{ color: "#b91c1c" }}>
                        {formErrors.stock_count}
                      </p>
                    )}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="product-published"
                    checked={form.published}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, published: e.target.checked }))
                    }
                  />
                  <Label htmlFor="product-published">Published on storefront</Label>
                </div>
                <div className="flex items-center gap-2 rounded-[var(--brand-radius)] border border-dashed p-3 text-sm" style={{ borderColor: "var(--brand-border)", color: brand.neutralColor }}>
                  <Upload size={16} aria-hidden="true" />
                  Photo upload is handled from the listing's own page once it is saved.
                </div>
              </CardContent>
              <CardFooter className="justify-end gap-2">
                <Button type="button" variant="secondary" onClick={closeForm}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saveState === "saving"}>
                  {saveState === "saving" ? "Saving…" : "Save listing"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      )}

      {confirmDeleteId && (
        <div
          role="alertdialog"
          aria-modal="true"
          aria-label="Confirm delete"
          className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) cancelDelete();
          }}
        >
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="inline-flex items-center gap-2">
                <AlertCircle size={18} aria-hidden="true" style={{ color: "#b91c1c" }} />
                Delete this listing?
              </CardTitle>
              <CardDescription>This removes it from the storefront immediately.</CardDescription>
            </CardHeader>
            <CardFooter className="justify-end gap-2">
              <Button variant="secondary" onClick={cancelDelete}>
                Cancel
              </Button>
              <Button variant="danger" onClick={doDelete}>
                Delete
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
