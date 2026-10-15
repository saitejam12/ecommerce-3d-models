// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

const { Button, Card, CardContent, Input, Label, Badge, Avatar, Separator } = UI;
const { Check, X, Home, Package, Clock, Trash, ArrowLeft, AlertCircle, CheckCircle } = Icons;

// ——— Pocket Shelf · Cart & Checkout ———————————————————————————————
// Sample shop data (stands in for /cart, /checkout/quote and shop_settings)

const SHOP = {
  currency: "GBP",
  symbol: "£",
  country: "United Kingdom",
  tax_rate: 0.2,
  tax_label: "VAT",
  free_postage_enabled: true,
  free_postage_threshold: 60,
};

const CART_LINES = [
  {
    id: "ci_8812",
    variant_id: "var_4410",
    emoji: "🐉",
    product_name: "Chonky Dragon Planter",
    variant_options: "Ember Red · 120mm · Matte",
    unit_price: 28.0,
    quantity: 1,
    fulfilment_type: "stocked",
    stock_count: 4,
    lead_time: null,
  },
  {
    id: "ci_8813",
    variant_id: "var_4502",
    emoji: "🍄",
    product_name: "Mini Mushroom Charms (set of 3)",
    variant_options: "Glow Green · 25mm · Satin",
    unit_price: 9.5,
    quantity: 2,
    fulfilment_type: "stocked",
    stock_count: 2,
    lead_time: null,
  },
  {
    id: "ci_8814",
    variant_id: "var_4611",
    emoji: "🦎",
    product_name: "Articulated Axolotl",
    variant_options: "Dusty Pink · 180mm · Silk",
    unit_price: 22.0,
    quantity: 1,
    fulfilment_type: "printed_to_order",
    stock_count: null,
    lead_time: "3–5 working days to print",
  },
  {
    id: "ci_8815",
    variant_id: "var_4720",
    emoji: "👾",
    product_name: "Desk Gremlin, Keyboard Guardian",
    variant_options: "Galaxy Purple · 80mm · Matte",
    unit_price: 14.0,
    quantity: 1,
    fulfilment_type: "stocked",
    stock_count: 0,
    lead_time: null,
  },
];

const POSTAGE_OPTIONS = [
  {
    id: "po_std",
    name: "Standard",
    description: "Royal Mail 48 · 2–4 working days",
    price: 3.95,
    free_eligible: true,
    active: true,
  },
  {
    id: "po_trk",
    name: "Tracked 48",
    description: "Tracked and signed for · 2–3 working days",
    price: 5.5,
    free_eligible: false,
    active: true,
  },
  {
    id: "po_exp",
    name: "Express 24",
    description: "Tracked, next working day if you order before 2pm",
    price: 7.95,
    free_eligible: false,
    active: true,
  },
];

const SAVED_ADDRESSES = [
  {
    id: "addr_31",
    label: "Home",
    recipient_name: "Mia Calder",
    line1: "14 Fenwick Rise",
    line2: "Flat 2",
    city: "Bristol",
    postcode: "BS6 5QT",
    is_default: true,
  },
  {
    id: "addr_47",
    label: "Studio",
    recipient_name: "Mia Calder",
    line1: "Pixel & Pine Studio, 3 Gloucester Road",
    line2: "",
    city: "Bristol",
    postcode: "BS7 8AA",
    is_default: false,
  },
];

const EMPTY_FORM = {
  email: "",
  recipient_name: "",
  line1: "",
  line2: "",
  city: "",
  postcode: "",
};

const round2 = (n) => Math.round(n * 100) / 100;
const money = (n) => SHOP.symbol + n.toFixed(2);
const hexToRgb = (hex) => {
  const h = hex.replace("#", "");
  const f = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return [0, 2, 4].map((i) => parseInt(f.slice(i, i + 2), 16));
};
const tint = (hex, a) => {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};
const darken = (hex, f) => {
  const [r, g, b] = hexToRgb(hex).map((c) => Math.round(c * (1 - f)));
  return `rgb(${r}, ${g}, ${b})`;
};

export default function Screen() {
  const navigate = useNavigate();
  const [lines, setLines] = React.useState(CART_LINES);
  const [notices, setNotices] = React.useState({});
  const [stockState, setStockState] = React.useState("idle"); // idle | checking
  const [checkedAt, setCheckedAt] = React.useState("09:12");

  const [mode, setMode] = React.useState("guest"); // guest | signin
  const [signedIn, setSignedIn] = React.useState(false);
  const [account, setAccount] = React.useState({ email: "", password: "" });
  const [signinError, setSigninError] = React.useState("");
  const [addressChoice, setAddressChoice] = React.useState("addr_31");

  const [form, setForm] = React.useState(EMPTY_FORM);
  const [saveAddress, setSaveAddress] = React.useState(true);
  const [errors, setErrors] = React.useState({});

  const [postageId, setPostageId] = React.useState("");
  const [payMethod, setPayMethod] = React.useState("card");
  const [card, setCard] = React.useState({ number: "", expiry: "", cvc: "", name: "" });

  const [status, setStatus] = React.useState("idle"); // idle | paying | confirmed
  const [payError, setPayError] = React.useState("");
  const [reference, setReference] = React.useState("");
  const [receipt, setReceipt] = React.useState(null);

  const ERROR = darken(brand.accentColor, 0.45);
  const text = { fontFamily: brand.fontBody, color: darken(brand.neutralColor, 0.4) };
  const muted = { color: brand.neutralColor };
  const num = { fontVariantNumeric: "tabular-nums" };

  // —— derived totals ————————————————————————————————————————————
  const sellable = lines.filter((l) => !(l.fulfilment_type === "stocked" && l.stock_count === 0));
  const blocked = lines.filter((l) => l.fulfilment_type === "stocked" && l.stock_count === 0);
  const goods = round2(sellable.reduce((s, l) => s + l.unit_price * l.quantity, 0));
  const freeApplies = SHOP.free_postage_enabled && goods >= SHOP.free_postage_threshold;
  const postage = POSTAGE_OPTIONS.find((p) => p.id === postageId) || null;
  const postageAmount = postage ? (freeApplies && postage.free_eligible ? 0 : postage.price) : null;
  const tax = postage ? round2((goods + postageAmount) * SHOP.tax_rate) : null;
  const total = postage ? round2(goods + postageAmount + tax) : null;
  const itemCount = sellable.reduce((s, l) => s + l.quantity, 0);
  const leadLine = sellable.find((l) => l.lead_time);
  const awayFromFree = round2(SHOP.free_postage_threshold - goods);

  // —— timed states, cleaned up with the screen ————————————————————
  React.useEffect(() => {
    if (status !== "paying") return;
    const declines = payMethod === "card" && card.number.replace(/\s/g, "").startsWith("4000");
    const t = setTimeout(() => {
      if (declines) {
        setStatus("idle");
        setPayError(
          "Your bank turned down the payment (card declined — insufficient funds). Nothing has been charged and your bag is exactly as you left it."
        );
      } else {
        setReference("PS-26-" + Math.floor(1000 + Math.random() * 9000));
        setReceipt({
          lines: sellable,
          goods,
          postage_option_name: postage.name,
          postage_amount: postageAmount,
          tax,
          total,
          email: signedIn ? account.email : form.email,
          address: currentAddress(),
          lead_time: leadLine ? leadLine.lead_time : null,
        });
        setStatus("confirmed");
      }
    }, 1500);
    return () => clearTimeout(t);
  }, [status]);

  React.useEffect(() => {
    if (stockState !== "checking") return;
    const t = setTimeout(() => {
      setStockState("idle");
      setCheckedAt(
        new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
      );
    }, 1100);
    return () => clearTimeout(t);
  }, [stockState]);

  function currentAddress() {
    if (signedIn && addressChoice !== "new") {
      const a = SAVED_ADDRESSES.find((x) => x.id === addressChoice);
      return { ...a, country: SHOP.country };
    }
    return { ...form, country: SHOP.country };
  }

  // —— cart actions ————————————————————————————————————————————
  function setQty(line, next) {
    let capped = Math.max(1, Math.min(next, 10));
    let note = "";
    if (line.fulfilment_type === "stocked" && capped > line.stock_count) {
      capped = line.stock_count;
      note = `Only ${line.stock_count} left on the shelf — we've capped this line at ${line.stock_count}.`;
    }
    if (line.fulfilment_type === "printed_to_order" && next > 10) {
      note = "Ten is the most we'll print in one go — drop us a message for a bigger batch.";
    }
    setLines((ls) => ls.map((l) => (l.id === line.id ? { ...l, quantity: capped } : l)));
    setNotices((n) => ({ ...n, [line.id]: note }));
    setPayError("");
  }

  function removeLine(line) {
    setLines((ls) => ls.filter((l) => l.id !== line.id));
    setNotices((n) => {
      const copy = { ...n };
      delete copy[line.id];
      return copy;
    });
    setPayError("");
  }

  function signIn() {
    const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(account.email);
    if (!okEmail || account.password.length < 8) {
      setSigninError("That email and password don't match an account. Have another go.");
      return;
    }
    setSigninError("");
    setSignedIn(true);
    setAddressChoice("addr_31");
  }

  function validate() {
    const e = {};
    const emailValue = signedIn ? account.email : form.email;
    if (!signedIn) {
      if (!form.email.trim()) e.email = "We need an email to send your order confirmation to.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        e.email = "That doesn't look like an email address — check for a typo.";
    }
    const usingNew = !signedIn || addressChoice === "new";
    if (usingNew) {
      if (!form.recipient_name.trim()) e.recipient_name = "Who should we address the parcel to?";
      if (!form.line1.trim()) e.line1 = "Add the house number and street.";
      if (!form.city.trim()) e.city = "Add a town or city.";
      if (!form.postcode.trim()) e.postcode = "Add a postcode.";
      else if (!/^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i.test(form.postcode.trim()))
        e.postcode = "That postcode doesn't look like a UK one.";
    }
    if (!postageId) e.postage = "Pick how you'd like it posted.";
    if (payMethod === "card") {
      if (card.number.replace(/\s/g, "").length !== 16) e.number = "A card number is 16 digits.";
      if (!/^\d{2}\/\d{2}$/.test(card.expiry)) e.expiry = "Use MM/YY.";
      if (!/^\d{3,4}$/.test(card.cvc)) e.cvc = "3 digits from the back of the card.";
      if (!card.name.trim()) e.name = "Name as printed on the card.";
    }
    void emailValue;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function pay() {
    setPayError("");
    if (blocked.length) {
      setPayError(
        `${blocked[0].product_name} sold out while you were shopping. Remove that line and we'll take your payment.`
      );
      return;
    }
    if (!validate()) {
      setPayError("Almost there — a few details above need another look. Nothing has been charged.");
      return;
    }
    setStatus("paying");
  }

  // —— shared bits ————————————————————————————————————————————
  const styles = `
    @keyframes ps-rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
    @keyframes ps-pop { 0% { opacity: 0; transform: scale(.94); } 60% { transform: scale(1.03); } 100% { opacity: 1; transform: scale(1); } }
    @keyframes ps-blink { 0%, 100% { opacity: .35; } 50% { opacity: 1; } }
    .ps-rise { animation: ps-rise .3s ease-out both; }
    .ps-pop { animation: ps-pop .45s cubic-bezier(.2,.8,.3,1.2) both; }
    .ps-blink { animation: ps-blink 1s ease-in-out infinite; }
    .ps-focus:focus-visible { outline: 3px solid ${brand.primaryColor}; outline-offset: 2px; }
    @media (prefers-reduced-motion: reduce) {
      .ps-rise, .ps-pop, .ps-blink { animation: none !important; }
    }
  `;

  const fieldBase = {
    borderRadius: brand.radius,
    borderColor: tint(brand.neutralColor, 0.3),
    backgroundColor: "#ffffff",
  };

  const renderField = ({ id, label, value, onChange, type = "text", placeholder, hint, span }) => (
    <div className={span || ""}>
      <Label htmlFor={id} className="block text-sm font-medium mb-1.5" style={{ color: darken(brand.neutralColor, 0.45) }}>
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e.target.value);
          setErrors((prev) => {
            const c = { ...prev };
            delete c[id];
            return c;
          });
        }}
        aria-invalid={errors[id] ? "true" : undefined}
        aria-describedby={errors[id] ? `${id}-err` : hint ? `${id}-hint` : undefined}
        className="ps-focus w-full px-3 py-2.5 text-[15px] border"
        style={{
          ...fieldBase,
          ...num,
          borderColor: errors[id] ? ERROR : fieldBase.borderColor,
        }}
      />
      {errors[id] ? (
        <p id={`${id}-err`} className="ps-rise mt-1.5 text-sm flex items-start gap-1.5" style={{ color: ERROR }}>
          <Icons.AlertCircle className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
          <span>{errors[id]}</span>
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs" style={muted}>
          {hint}
        </p>
      ) : null}
    </div>
  );

  const sectionCard = "border shadow-sm";
  const cardStyle = {
    borderRadius: `calc(${brand.radius} * 2)`,
    borderColor: tint(brand.neutralColor, 0.18),
    backgroundColor: "#ffffff",
  };

  // —— CONFIRMED ————————————————————————————————————————————————
  if (status === "confirmed" && receipt) {
    return (
      <div className="min-h-full px-4 py-8 sm:px-6 lg:px-10" style={{ ...text, backgroundColor: brand.backgroundColor }}>
        <style>{styles}</style>
        <div className="mx-auto max-w-2xl">
          <div
            className="ps-pop mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full"
            style={{ backgroundColor: brand.primaryColor }}
          >
            <Icons.Check className="h-7 w-7" style={{ color: "#ffffff" }} aria-hidden="true" />
          </div>
          <h1
            className="text-center text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ fontFamily: brand.fontHeading, color: darken(brand.primaryColor, 0.35) }}
          >
            Paid. Your models are on the bench.
          </h1>
          <p className="mt-3 text-center text-base" style={muted}>
            Order <span className="font-semibold" style={{ ...num, color: brand.primaryColor }}>{reference}</span> — we've emailed
            the full receipt to {receipt.email}.
          </p>

          <Card className={`ps-rise mt-8 ${sectionCard}`} style={cardStyle}>
            <CardContent className="p-5 sm:p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide mb-4" style={muted}>
                What you bought
              </h2>
              <ul className="divide-y" style={{ borderColor: tint(brand.neutralColor, 0.15) }}>
                {receipt.lines.map((l) => (
                  <li key={l.id} className="flex items-start justify-between gap-4 py-3">
                    <div className="min-w-0">
                      <p className="font-medium">{l.product_name}</p>
                      <p className="text-sm" style={muted}>
                        {l.variant_options} · <span style={num}>{l.quantity}</span> ×{" "}
                        <span style={num}>{money(l.unit_price)}</span>
                      </p>
                      {l.lead_time ? (
                        <p className="text-sm mt-0.5" style={{ color: brand.primaryColor }}>
                          {l.lead_time}
                        </p>
                      ) : null}
                    </div>
                    <p className="font-semibold shrink-0" style={num}>
                      {money(round2(l.unit_price * l.quantity))}
                    </p>
                  </li>
                ))}
              </ul>
              <Separator className="my-4" style={{ backgroundColor: tint(brand.neutralColor, 0.15) }} />
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt style={muted}>Goods</dt>
                  <dd style={num}>{money(receipt.goods)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt style={muted}>{receipt.postage_option_name} postage</dt>
                  <dd style={num}>{receipt.postage_amount === 0 ? "Free" : money(receipt.postage_amount)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt style={muted}>{SHOP.tax_label} ({Math.round(SHOP.tax_rate * 100)}%)</dt>
                  <dd style={num}>{money(receipt.tax)}</dd>
                </div>
                <div className="flex justify-between pt-2 text-base font-bold" style={{ color: darken(brand.primaryColor, 0.3) }}>
                  <dt>Total paid</dt>
                  <dd style={num}>{money(receipt.total)}</dd>
                </div>
              </dl>
              <Separator className="my-4" style={{ backgroundColor: tint(brand.neutralColor, 0.15) }} />
              <h3 className="text-sm font-semibold mb-1">Posting to</h3>
              <p className="text-sm leading-relaxed" style={muted}>
                {receipt.address.recipient_name}, {receipt.address.line1}
                {receipt.address.line2 ? `, ${receipt.address.line2}` : ""}, {receipt.address.city},{" "}
                <span style={num}>{receipt.address.postcode}</span>, {SHOP.country}
              </p>
              {receipt.lead_time ? (
                <p className="mt-4 text-sm rounded-lg px-3 py-2.5" style={{ backgroundColor: tint(brand.primaryColor, 0.08) }}>
                  <Icons.Clock className="inline h-4 w-4 mr-1.5 -mt-0.5" aria-hidden="true" />
                  One item is printed to order, so the parcel leaves us in {receipt.lead_time.replace(" to print", "")}.
                </p>
              ) : null}
            </CardContent>
          </Card>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => navigate("catalogue")}
              className="ps-focus flex-1 justify-center px-5 py-3 text-base font-semibold"
              style={{ backgroundColor: brand.primaryColor, color: "#ffffff", borderRadius: brand.radius }}
            >
              Keep shopping
            </Button>
            <Button
              onClick={() => navigate("account")}
              className="ps-focus flex-1 justify-center px-5 py-3 text-base font-semibold border"
              style={{
                backgroundColor: "transparent",
                color: brand.primaryColor,
                borderColor: tint(brand.primaryColor, 0.35),
                borderRadius: brand.radius,
              }}
            >
              Track this order
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // —— EMPTY BAG ————————————————————————————————————————————————
  if (lines.length === 0) {
    return (
      <div className="min-h-full px-4 py-8 sm:px-6 lg:px-10" style={{ ...text, backgroundColor: brand.backgroundColor }}>
        <style>{styles}</style>
        <div className="mx-auto max-w-xl">
          <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: brand.fontHeading, color: darken(brand.primaryColor, 0.35) }}>
            Your bag
          </h1>
          <Card className={`ps-rise mt-6 ${sectionCard}`} style={cardStyle}>
            <CardContent className="p-10 text-center">
              <div
                className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
                style={{ backgroundColor: tint(brand.accentColor, 0.14) }}
                aria-hidden="true"
              >
                🛍️
              </div>
              <h2 className="text-xl font-semibold" style={{ fontFamily: brand.fontHeading }}>
                Nothing in the bag yet
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed" style={muted}>
                The shelf is full of tiny dragons, desk gremlins and glow-in-the-dark mushrooms. Pick a few and they'll
                land here.
              </p>
              <Button
                onClick={() => navigate("catalogue")}
                className="ps-focus mt-6 px-5 py-3 text-base font-semibold"
                style={{ backgroundColor: brand.primaryColor, color: "#ffffff", borderRadius: brand.radius }}
              >
                Browse the shop
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // —— CART + CHECKOUT ————————————————————————————————————————————
  const usingNewAddress = !signedIn || addressChoice === "new";

  return (
    <div className="min-h-full px-4 py-6 sm:px-6 lg:px-10" style={{ ...text, backgroundColor: brand.backgroundColor }}>
      <style>{styles}</style>

      <div className="mx-auto max-w-6xl">
        <Button
          onClick={() => navigate("catalogue")}
          className="ps-focus mb-4 inline-flex items-center gap-1.5 px-0 py-1 text-sm font-medium"
          style={{ backgroundColor: "transparent", color: brand.primaryColor }}
        >
          <Icons.ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Keep shopping
        </Button>

        <h1
          className="text-3xl sm:text-4xl font-bold tracking-tight"
          style={{ fontFamily: brand.fontHeading, color: darken(brand.primaryColor, 0.35) }}
        >
          Your bag &amp; checkout
        </h1>
        <p className="mt-2 text-[15px]" style={muted}>
          <span style={num}>{itemCount}</span> {itemCount === 1 ? "item" : "items"} · posting within {SHOP.country} ·
          prices in {SHOP.currency}
        </p>

        <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
          {/* ——— LEFT: bag, delivery, postage, payment ——— */}
          <div className="space-y-6">
            {/* BAG */}
            <Card className={sectionCard} style={cardStyle}>
              <CardContent className="p-5 sm:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="text-lg font-semibold" style={{ fontFamily: brand.fontHeading }}>
                    1 · What's in the bag
                  </h2>
                  <p className="text-xs flex items-center gap-1.5" style={muted} aria-live="polite">
                    <Icons.Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {stockState === "checking" ? (
                      <span className="ps-blink">Checking the shelf…</span>
                    ) : (
                      <>
                        <span>
                          Stock checked at <span style={num}>{checkedAt}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => setStockState("checking")}
                          className="ps-focus underline underline-offset-2 font-medium rounded"
                          style={{ color: brand.primaryColor }}
                        >
                          Check again
                        </button>
                      </>
                    )}
                  </p>
                </div>

                {blocked.length > 0 ? (
                  <div
                    className="ps-rise mt-4 flex items-start gap-3 rounded-xl px-4 py-3"
                    style={{ backgroundColor: tint(brand.accentColor, 0.12) }}
                  >
                    <Icons.AlertCircle className="h-5 w-5 mt-0.5 shrink-0" style={{ color: ERROR }} aria-hidden="true" />
                    <p className="text-sm leading-relaxed" style={{ color: ERROR }}>
                      <strong className="font-semibold">{blocked[0].product_name}</strong> sold out while you were
                      shopping. It isn't counted in your total — remove the line to carry on and pay.
                    </p>
                  </div>
                ) : null}

                <ul className="mt-2 divide-y" style={{ borderColor: tint(brand.neutralColor, 0.14) }}>
                  {lines.map((line) => {
                    const soldOut = line.fulfilment_type === "stocked" && line.stock_count === 0;
                    const lineTotal = round2(line.unit_price * line.quantity);
                    return (
                      <li key={line.id} className="ps-rise flex gap-4 py-5">
                        <div
                          className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center text-3xl"
                          style={{
                            backgroundColor: soldOut ? tint(brand.neutralColor, 0.1) : tint(brand.primaryColor, 0.09),
                            borderRadius: `calc(${brand.radius} * 1.5)`,
                            filter: soldOut ? "grayscale(1)" : "none",
                          }}
                          aria-hidden="true"
                        >
                          {line.emoji}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <h3 className="text-[15px] font-semibold leading-snug">
                                <button
                                  type="button"
                                  onClick={() => navigate("product")}
                                  className="ps-focus rounded text-left hover:underline underline-offset-2"
                                >
                                  {line.product_name}
                                </button>
                              </h3>
                              <p className="mt-0.5 text-sm" style={muted}>
                                {line.variant_options}
                              </p>
                              <p className="mt-0.5 text-sm" style={{ ...muted, ...num }}>
                                {money(line.unit_price)} each
                              </p>
                            </div>
                            <p
                              className="text-[15px] font-bold shrink-0"
                              style={{ ...num, textDecoration: soldOut ? "line-through" : "none", opacity: soldOut ? 0.5 : 1 }}
                            >
                              {money(lineTotal)}
                            </p>
                          </div>

                          <div className="mt-2.5">
                            {soldOut ? (
                              <Badge
                                className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold"
                                style={{ backgroundColor: tint(brand.accentColor, 0.16), color: ERROR, borderRadius: brand.radius }}
                              >
                                <Icons.X className="h-3.5 w-3.5" aria-hidden="true" /> Sold out
                              </Badge>
                            ) : line.fulfilment_type === "printed_to_order" ? (
                              <Badge
                                className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold"
                                style={{ backgroundColor: tint(brand.primaryColor, 0.1), color: darken(brand.primaryColor, 0.15), borderRadius: brand.radius }}
                              >
                                <Icons.Clock className="h-3.5 w-3.5" aria-hidden="true" /> Printed to order · {line.lead_time}
                              </Badge>
                            ) : (
                              <Badge
                                className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold"
                                style={{ backgroundColor: tint(brand.primaryColor, 0.08), color: darken(brand.neutralColor, 0.3), borderRadius: brand.radius }}
                              >
                                <Icons.Check className="h-3.5 w-3.5" aria-hidden="true" /> On the shelf ·{" "}
                                <span style={num}>{line.stock_count}</span> left
                              </Badge>
                            )}
                          </div>

                          <div className="mt-3 flex items-center justify-between gap-3">
                            <div
                              className="inline-flex items-center border"
                              style={{ borderRadius: brand.radius, borderColor: tint(brand.neutralColor, 0.3), opacity: soldOut ? 0.45 : 1 }}
                            >
                              <button
                                type="button"
                                disabled={soldOut || line.quantity <= 1}
                                onClick={() => setQty(line, line.quantity - 1)}
                                aria-label={`Reduce quantity of ${line.product_name}`}
                                className="ps-focus h-10 w-10 text-lg font-semibold disabled:opacity-40 transition-colors"
                                style={{ color: brand.primaryColor }}
                              >
                                −
                              </button>
                              <span className="h-10 w-10 flex items-center justify-center text-[15px] font-semibold" style={num}>
                                {line.quantity}
                              </span>
                              <button
                                type="button"
                                disabled={soldOut}
                                onClick={() => setQty(line, line.quantity + 1)}
                                aria-label={`Increase quantity of ${line.product_name}`}
                                className="ps-focus h-10 w-10 text-lg font-semibold disabled:opacity-40 transition-colors"
                                style={{ color: brand.primaryColor }}
                              >
                                +
                              </button>
                            </div>

                            <Button
                              onClick={() => removeLine(line)}
                              aria-label={`Remove ${line.product_name} from the bag`}
                              className="ps-focus inline-flex items-center gap-1.5 px-2 py-1.5 text-sm font-medium"
                              style={{ backgroundColor: "transparent", color: brand.neutralColor }}
                            >
                              <Icons.Trash className="h-4 w-4" aria-hidden="true" />
                              Remove
                            </Button>
                          </div>

                          {notices[line.id] ? (
                            <p className="ps-rise mt-2 text-sm" style={{ color: ERROR }} aria-live="polite">
                              {notices[line.id]}
                            </p>
                          ) : null}
                        </div>
                      </li>
                    );
                  })}
                </ul>

                {leadLine ? (
                  <p
                    className="mt-1 rounded-xl px-4 py-3 text-sm leading-relaxed"
                    style={{ backgroundColor: tint(brand.primaryColor, 0.07) }}
                  >
                    <Icons.Package className="inline h-4 w-4 mr-1.5 -mt-0.5" style={{ color: brand.primaryColor }} aria-hidden="true" />
                    This order won't ship straight away — the longest print time in your bag is{" "}
                    <strong className="font-semibold">{leadLine.lead_time.replace(" to print", "")}</strong>, then postage on top.
                  </p>
                ) : null}
              </CardContent>
            </Card>

            {/* WHO */}
            <Card className={sectionCard} style={cardStyle}>
              <CardContent className="p-5 sm:p-6">
                <h2 className="text-lg font-semibold" style={{ fontFamily: brand.fontHeading }}>
                  2 · Who we're posting to
                </h2>

                {!signedIn ? (
                  <>
                    <fieldset className="mt-4">
                      <legend className="sr-only">How would you like to check out?</legend>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {[
                          { id: "guest", title: "Check out as a guest", sub: "No account needed" },
                          { id: "signin", title: "Sign in", sub: "Use a saved address" },
                        ].map((opt) => (
                          <label
                            key={opt.id}
                            className="ps-focus flex cursor-pointer items-start gap-3 border px-4 py-3 transition-colors"
                            style={{
                              borderRadius: `calc(${brand.radius} * 1.5)`,
                              borderColor: mode === opt.id ? brand.primaryColor : tint(brand.neutralColor, 0.25),
                              backgroundColor: mode === opt.id ? tint(brand.primaryColor, 0.06) : "#ffffff",
                            }}
                          >
                            <input
                              type="radio"
                              name="checkout-mode"
                              className="mt-1 h-4 w-4"
                              style={{ accentColor: brand.primaryColor }}
                              checked={mode === opt.id}
                              onChange={() => setMode(opt.id)}
                            />
                            <span>
                              <span className="block text-[15px] font-semibold">{opt.title}</span>
                              <span className="block text-sm" style={muted}>
                                {opt.sub}
                              </span>
                            </span>
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    {mode === "signin" ? (
                      <div className="ps-rise mt-5 grid gap-4 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="signin-email" className="block text-sm font-medium mb-1.5" style={{ color: darken(brand.neutralColor, 0.45) }}>
                            Email
                          </Label>
                          <Input
                            id="signin-email"
                            type="email"
                            value={account.email}
                            onChange={(e) => setAccount({ ...account, email: e.target.value })}
                            className="ps-focus w-full px-3 py-2.5 text-[15px] border"
                            style={fieldBase}
                          />
                        </div>
                        <div>
                          <Label htmlFor="signin-password" className="block text-sm font-medium mb-1.5" style={{ color: darken(brand.neutralColor, 0.45) }}>
                            Password
                          </Label>
                          <Input
                            id="signin-password"
                            type="password"
                            value={account.password}
                            onChange={(e) => setAccount({ ...account, password: e.target.value })}
                            className="ps-focus w-full px-3 py-2.5 text-[15px] border"
                            style={fieldBase}
                          />
                        </div>
                        <div className="sm:col-span-2 flex flex-wrap items-center gap-3">
                          <Button
                            onClick={signIn}
                            className="ps-focus px-4 py-2.5 text-[15px] font-semibold"
                            style={{ backgroundColor: brand.primaryColor, color: "#ffffff", borderRadius: brand.radius }}
                          >
                            Sign in and keep my bag
                          </Button>
                          <span className="text-sm" style={muted}>
                            Your bag stays exactly as it is.
                          </span>
                        </div>
                        {signinError ? (
                          <p className="ps-rise sm:col-span-2 text-sm flex items-start gap-1.5" style={{ color: ERROR }} aria-live="polite">
                            <Icons.AlertCircle className="h-4 w-4 mt-0.5" aria-hidden="true" />
                            {signinError}
                          </p>
                        ) : null}
                      </div>
                    ) : null}
                  </>
                ) : (
                  <div
                    className="ps-rise mt-4 flex items-center gap-3 rounded-xl px-4 py-3"
                    style={{ backgroundColor: tint(brand.primaryColor, 0.07) }}
                  >
                    <Avatar className="h-9 w-9 shrink-0" style={{ backgroundColor: brand.primaryColor, color: "#ffffff" }}>
                      MC
                    </Avatar>
                    <p className="text-sm">
                      Signed in as <strong className="font-semibold">{account.email}</strong>
                    </p>
                  </div>
                )}

                {signedIn ? (
                  <fieldset className="mt-5">
                    <legend className="text-sm font-semibold mb-2">Saved addresses</legend>
                    <div className="space-y-2">
                      {SAVED_ADDRESSES.map((a) => (
                        <label
                          key={a.id}
                          className="flex cursor-pointer items-start gap-3 border px-4 py-3 transition-colors"
                          style={{
                            borderRadius: `calc(${brand.radius} * 1.5)`,
                            borderColor: addressChoice === a.id ? brand.primaryColor : tint(brand.neutralColor, 0.25),
                            backgroundColor: addressChoice === a.id ? tint(brand.primaryColor, 0.06) : "#ffffff",
                          }}
                        >
                          <input
                            type="radio"
                            name="saved-address"
                            className="mt-1 h-4 w-4"
                            style={{ accentColor: brand.primaryColor }}
                            checked={addressChoice === a.id}
                            onChange={() => setAddressChoice(a.id)}
                          />
                          <span className="text-sm leading-relaxed">
                            <span className="block font-semibold text-[15px]">
                              {a.label}
                              {a.is_default ? (
                                <span className="ml-2 text-xs font-medium" style={muted}>
                                  default
                                </span>
                              ) : null}
                            </span>
                            <span style={muted}>
                              {a.recipient_name}, {a.line1}
                              {a.line2 ? `, ${a.line2}` : ""}, {a.city}, <span style={num}>{a.postcode}</span>
                            </span>
                          </span>
                        </label>
                      ))}
                      <label
                        className="flex cursor-pointer items-center gap-3 border px-4 py-3 transition-colors"
                        style={{
                          borderRadius: `calc(${brand.radius} * 1.5)`,
                          borderColor: addressChoice === "new" ? brand.primaryColor : tint(brand.neutralColor, 0.25),
                          backgroundColor: addressChoice === "new" ? tint(brand.primaryColor, 0.06) : "#ffffff",
                        }}
                      >
                        <input
                          type="radio"
                          name="saved-address"
                          className="h-4 w-4"
                          style={{ accentColor: brand.primaryColor }}
                          checked={addressChoice === "new"}
                          onChange={() => setAddressChoice("new")}
                        />
                        <span className="text-[15px] font-semibold">Post somewhere else</span>
                      </label>
                    </div>
                  </fieldset>
                ) : null}

                {usingNewAddress ? (
                  <div className="ps-rise mt-5 grid gap-4 sm:grid-cols-2">
                    {!signedIn
                      ? renderField({
                          id: "email",
                          label: "Email for your receipt",
                          value: form.email,
                          onChange: (v) => setForm({ ...form, email: v }),
                          type: "email",
                          placeholder: "you@example.com",
                          hint: "We only use this for order emails.",
                          span: "sm:col-span-2",
                        })
                      : null}
                    {renderField({
                      id: "recipient_name",
                      label: "Recipient name",
                      value: form.recipient_name,
                      onChange: (v) => setForm({ ...form, recipient_name: v }),
                      span: "sm:col-span-2",
                    })}
                    {renderField({
                      id: "line1",
                      label: "Address line 1",
                      value: form.line1,
                      onChange: (v) => setForm({ ...form, line1: v }),
                      span: "sm:col-span-2",
                    })}
                    {renderField({
                      id: "line2",
                      label: "Address line 2 (optional)",
                      value: form.line2,
                      onChange: (v) => setForm({ ...form, line2: v }),
                      span: "sm:col-span-2",
                    })}
                    {renderField({
                      id: "city",
                      label: "Town or city",
                      value: form.city,
                      onChange: (v) => setForm({ ...form, city: v }),
                    })}
                    {renderField({
                      id: "postcode",
                      label: "Postcode",
                      value: form.postcode,
                      onChange: (v) => setForm({ ...form, postcode: v.toUpperCase() }),
                    })}
                    <div className="sm:col-span-2">
                      <Label htmlFor="country" className="block text-sm font-medium mb-1.5" style={{ color: darken(brand.neutralColor, 0.45) }}>
                        Country
                      </Label>
                      <Input
                        id="country"
                        value={SHOP.country}
                        readOnly
                        aria-describedby="country-hint"
                        className="w-full px-3 py-2.5 text-[15px] border"
                        style={{ ...fieldBase, backgroundColor: tint(brand.neutralColor, 0.07), color: brand.neutralColor }}
                      />
                      <p id="country-hint" className="mt-1.5 text-xs" style={muted}>
                        We post within the {SHOP.country} only at the moment.
                      </p>
                    </div>
                    {signedIn ? (
                      <label className="sm:col-span-2 flex items-center gap-2.5 text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          className="ps-focus h-4 w-4"
                          style={{ accentColor: brand.primaryColor }}
                          checked={saveAddress}
                          onChange={(e) => setSaveAddress(e.target.checked)}
                        />
                        Save this address to my account for next time
                      </label>
                    ) : null}
                  </div>
                ) : null}
              </CardContent>
            </Card>

            {/* POSTAGE */}
            <Card className={sectionCard} style={cardStyle}>
              <CardContent className="p-5 sm:p-6">
                <h2 className="text-lg font-semibold" style={{ fontFamily: brand.fontHeading }}>
                  3 · How it travels
                </h2>
                <p className="mt-1 text-sm" style={muted}>
                  {freeApplies ? (
                    <>
                      You're over the <span style={num}>{money(SHOP.free_postage_threshold)}</span> mark — Standard
                      postage is on us.
                    </>
                  ) : (
                    <>
                      Spend <span style={num}>{money(awayFromFree)}</span> more and Standard postage is free.
                    </>
                  )}
                </p>

                <fieldset className="mt-4">
                  <legend className="sr-only">Choose a postage option</legend>
                  <div className="space-y-2">
                    {POSTAGE_OPTIONS.filter((p) => p.active).map((p) => {
                      const free = freeApplies && p.free_eligible;
                      const selected = postageId === p.id;
                      return (
                        <label
                          key={p.id}
                          className="flex cursor-pointer items-center gap-3 border px-4 py-3.5 transition-colors"
                          style={{
                            borderRadius: `calc(${brand.radius} * 1.5)`,
                            borderColor: selected ? brand.primaryColor : tint(brand.neutralColor, 0.25),
                            backgroundColor: selected ? tint(brand.primaryColor, 0.06) : "#ffffff",
                          }}
                        >
                          <input
                            type="radio"
                            name="postage"
                            className="h-4 w-4 shrink-0"
                            style={{ accentColor: brand.primaryColor }}
                            checked={selected}
                            onChange={() => {
                              setPostageId(p.id);
                              setErrors((e) => {
                                const c = { ...e };
                                delete c.postage;
                                return c;
                              });
                              setPayError("");
                            }}
                          />
                          <span className="min-w-0 flex-1">
                            <span className="block text-[15px] font-semibold">{p.name}</span>
                            <span className="block text-sm" style={muted}>
                              {p.description}
                            </span>
                          </span>
                          <span className="shrink-0 text-right">
                            {free ? (
                              <>
                                <span className="block text-[15px] font-bold" style={{ color: brand.primaryColor }}>
                                  Free
                                </span>
                                <span className="block text-xs line-through" style={{ ...muted, ...num }}>
                                  {money(p.price)}
                                </span>
                              </>
                            ) : (
                              <span className="block text-[15px] font-bold" style={num}>
                                {money(p.price)}
                              </span>
                            )}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  {errors.postage ? (
                    <p className="ps-rise mt-2 text-sm flex items-center gap-1.5" style={{ color: ERROR }}>
                      <Icons.AlertCircle className="h-4 w-4" aria-hidden="true" />
                      {errors.postage}
                    </p>
                  ) : null}
                </fieldset>
              </CardContent>
            </Card>

            {/* PAYMENT */}
            <Card className={sectionCard} style={cardStyle}>
              <CardContent className="p-5 sm:p-6">
                <h2 className="text-lg font-semibold" style={{ fontFamily: brand.fontHeading }}>
                  4 · Payment
                </h2>
                <p className="mt-1 text-sm" style={muted}>
                  Paid in full now, handled by Stripe. We never see your card number.
                </p>

                <fieldset className="mt-4">
                  <legend className="sr-only">Payment method</legend>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {[
                      { id: "card", title: "Card", sub: "Visa, Mastercard, Amex" },
                      { id: "wallet", title: "Apple Pay / Google Pay", sub: "Confirm on your device" },
                    ].map((m) => (
                      <label
                        key={m.id}
                        className="flex cursor-pointer items-start gap-3 border px-4 py-3 transition-colors"
                        style={{
                          borderRadius: `calc(${brand.radius} * 1.5)`,
                          borderColor: payMethod === m.id ? brand.primaryColor : tint(brand.neutralColor, 0.25),
                          backgroundColor: payMethod === m.id ? tint(brand.primaryColor, 0.06) : "#ffffff",
                        }}
                      >
                        <input
                          type="radio"
                          name="pay-method"
                          className="mt-1 h-4 w-4"
                          style={{ accentColor: brand.primaryColor }}
                          checked={payMethod === m.id}
                          onChange={() => {
                            setPayMethod(m.id);
                            setPayError("");
                          }}
                        />
                        <span>
                          <span className="block text-[15px] font-semibold">{m.title}</span>
                          <span className="block text-sm" style={muted}>
                            {m.sub}
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {payMethod === "card" ? (
                  <div className="ps-rise mt-5 grid gap-4 sm:grid-cols-2">
                    {renderField({
                      id: "number",
                      label: "Card number",
                      value: card.number,
                      onChange: (v) =>
                        setCard({
                          ...card,
                          number: v.replace(/[^\d]/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim(),
                        }),
                      placeholder: "4242 4242 4242 4242",
                      span: "sm:col-span-2",
                    })}
                    {renderField({
                      id: "expiry",
                      label: "Expiry",
                      value: card.expiry,
                      onChange: (v) => {
                        const d = v.replace(/[^\d]/g, "").slice(0, 4);
                        setCard({ ...card, expiry: d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d });
                      },
                      placeholder: "MM/YY",
                    })}
                    {renderField({
                      id: "cvc",
                      label: "Security code",
                      value: card.cvc,
                      onChange: (v) => setCard({ ...card, cvc: v.replace(/[^\d]/g, "").slice(0, 4) }),
                      placeholder: "123",
                    })}
                    {renderField({
                      id: "name",
                      label: "Name on card",
                      value: card.name,
                      onChange: (v) => setCard({ ...card, name: v }),
                      span: "sm:col-span-2",
                    })}
                    <p className="sm:col-span-2 text-xs rounded-lg px-3 py-2" style={{ ...muted, backgroundColor: tint(brand.neutralColor, 0.07) }}>
                      Test mode: <span style={num}>4242 4242 4242 4242</span> pays,{" "}
                      <span style={num}>4000 0000 0000 0002</span> is declined.
                    </p>
                  </div>
                ) : (
                  <p className="ps-rise mt-5 text-sm rounded-xl px-4 py-3" style={{ backgroundColor: tint(brand.primaryColor, 0.07) }}>
                    You'll confirm the amount with your wallet when you tap Pay. Nothing is charged until you approve it.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* ——— RIGHT: summary + pay ——— */}
          <aside className="lg:sticky lg:top-6">
            <Card className="border shadow-sm" style={{ ...cardStyle, borderColor: tint(brand.primaryColor, 0.25) }}>
              <CardContent className="p-5 sm:p-6">
                <h2 className="text-lg font-semibold" style={{ fontFamily: brand.fontHeading }}>
                  Order summary
                </h2>

                <dl className="mt-4 space-y-2.5 text-[15px]">
                  <div className="flex justify-between">
                    <dt style={muted}>
                      Goods (<span style={num}>{itemCount}</span>)
                    </dt>
                    <dd className="font-medium" style={num}>
                      {money(goods)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt style={muted}>{postage ? `${postage.name} postage` : "Postage"}</dt>
                    <dd className="font-medium" style={num}>
                      {postage ? (postageAmount === 0 ? "Free" : money(postageAmount)) : "Pick an option"}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt style={muted}>
                      {SHOP.tax_label} ({Math.round(SHOP.tax_rate * 100)}%)
                    </dt>
                    <dd className="font-medium" style={num}>
                      {tax === null ? "—" : money(tax)}
                    </dd>
                  </div>
                </dl>

                <Separator className="my-4" style={{ backgroundColor: tint(brand.neutralColor, 0.18) }} />

                <div className="flex items-end justify-between">
                  <span className="text-sm font-semibold uppercase tracking-wide" style={muted}>
                    Total
                  </span>
                  <span
                    className="text-3xl font-bold leading-none"
                    style={{ ...num, color: darken(brand.primaryColor, 0.25) }}
                    aria-live="polite"
                  >
                    {total === null ? "—" : money(total)}
                  </span>
                </div>

                {leadLine ? (
                  <p className="mt-3 text-xs leading-relaxed" style={muted}>
                    Includes a printed-to-order item — dispatch in {leadLine.lead_time.replace(" to print", "")}.
                  </p>
                ) : null}

                <Button
                  onClick={pay}
                  disabled={status === "paying"}
                  className="ps-focus mt-5 w-full justify-center px-5 py-3.5 text-base font-bold transition-transform active:scale-[0.99]"
                  style={{
                    backgroundColor: blocked.length ? brand.neutralColor : brand.primaryColor,
                    color: "#ffffff",
                    borderRadius: `calc(${brand.radius} * 1.4)`,
                    opacity: status === "paying" ? 0.8 : 1,
                  }}
                >
                  {status === "paying" ? (
                    <span className="ps-blink">Taking payment…</span>
                  ) : total === null ? (
                    "Choose postage to pay"
                  ) : (
                    <>Pay {money(total)}</>
                  )}
                </Button>

                {payError ? (
                  <div
                    className="ps-rise mt-3 flex items-start gap-2 rounded-xl px-3 py-2.5"
                    style={{ backgroundColor: tint(brand.accentColor, 0.12) }}
                    role="alert"
                  >
                    <Icons.AlertCircle className="h-4 w-4 mt-0.5 shrink-0" style={{ color: ERROR }} aria-hidden="true" />
                    <p className="text-sm leading-relaxed" style={{ color: ERROR }}>
                      {payError}
                    </p>
                  </div>
                ) : null}

                <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed" style={muted}>
                  <Icons.CheckCircle className="h-4 w-4 mt-px shrink-0" style={{ color: brand.primaryColor }} aria-hidden="true" />
                  All prices in {SHOP.currency}. Returns within 30 days on stocked items — printed-to-order pieces are
                  made just for you.
                </p>
              </CardContent>
            </Card>

            <p className="mt-4 px-1 text-xs" style={muted}>
              Questions about print times? Read the{" "}
              <button
                type="button"
                onClick={() => navigate("catalogue")}
                className="ps-focus rounded underline underline-offset-2 font-medium"
                style={{ color: brand.primaryColor }}
              >
                delivery &amp; returns page
              </button>
              .
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
