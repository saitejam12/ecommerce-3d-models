// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

const { Plus, Search, Check, X, ChevronRight, User, Package, Clock, Trash, ArrowLeft, AlertCircle, CheckCircle } = Icons;

const STATUS = {
  paid: { label: "Paid", icon: "Clock", tone: "neutral", note: "In the print queue" },
  printing: { label: "Printing", icon: "Clock", tone: "accent", note: "On the printer now" },
  packed: { label: "Packed", icon: "Package", tone: "primary", note: "Boxed, waiting for the post run" },
  shipped: { label: "Shipped", icon: "CheckCircle", tone: "primary", note: "On its way to you" },
  refunded: { label: "Refunded", icon: "X", tone: "neutral", note: "Money returned to your card" },
};

const FLOW = ["paid", "printing", "packed", "shipped"];

const ORDERS = [
  {
    reference: "PS-26-1042",
    created_at: "14 Oct 2026",
    status: "paid",
    goods_subtotal: 31.0,
    postage_option_name: "Standard post (2–3 days)",
    postage_amount: 3.95,
    tax_rate: 0.2,
    tax_amount: 6.99,
    total: 41.94,
    tracking_number: null,
    refunded_amount: 0,
    refunded_at: null,
    delivery_address: {
      recipient_name: "Nia Okafor",
      line1: "Flat 6, Hawthorn House",
      line2: "42 Kiln Lane",
      city: "Bristol",
      postcode: "BS1 4TR",
      country: "United Kingdom",
    },
    items: [
      { product_name: "Mushroom Lamp Topper", variant_options: "Sage · 80mm · Matte", unit_price: 18.0, quantity: 1, line_total: 18.0, lead_time: null },
      { product_name: "Articulated Axolotl Keyring", variant_options: "Peach · 60mm", unit_price: 6.5, quantity: 2, line_total: 13.0, lead_time: "3–5 working days to print" },
    ],
    history: [{ status: "paid", changed_at: "14 Oct 2026, 19:04", changed_by: "Payment confirmed" }],
  },
  {
    reference: "PS-26-1037",
    created_at: "11 Oct 2026",
    status: "printing",
    goods_subtotal: 24.0,
    postage_option_name: "Tracked 48",
    postage_amount: 5.5,
    tax_rate: 0.2,
    tax_amount: 5.9,
    total: 35.4,
    tracking_number: null,
    refunded_amount: 0,
    refunded_at: null,
    delivery_address: {
      recipient_name: "Nia Okafor",
      line1: "Flat 6, Hawthorn House",
      line2: "42 Kiln Lane",
      city: "Bristol",
      postcode: "BS1 4TR",
      country: "United Kingdom",
    },
    items: [
      { product_name: "Dragon Egg Dice Box", variant_options: "Midnight · 90mm · Matte", unit_price: 24.0, quantity: 1, line_total: 24.0, lead_time: "5–7 working days to print" },
    ],
    history: [
      { status: "paid", changed_at: "11 Oct 2026, 08:12", changed_by: "Payment confirmed" },
      { status: "printing", changed_at: "13 Oct 2026, 10:30", changed_by: "Rae at Pocket Shelf" },
    ],
  },
  {
    reference: "PS-26-1021",
    created_at: "6 Oct 2026",
    status: "packed",
    goods_subtotal: 52.0,
    postage_option_name: "Tracked 48 — free over £50",
    postage_amount: 0,
    tax_rate: 0.2,
    tax_amount: 10.4,
    total: 62.4,
    tracking_number: null,
    refunded_amount: 0,
    refunded_at: null,
    delivery_address: {
      recipient_name: "Nia Okafor (work)",
      line1: "Studio 3, The Paintworks",
      line2: "Bath Road",
      city: "Bristol",
      postcode: "BS4 3EH",
      country: "United Kingdom",
    },
    items: [
      { product_name: "Desk Dragon Planter", variant_options: "Ember · 140mm · Silk", unit_price: 34.0, quantity: 1, line_total: 34.0, lead_time: null },
      { product_name: "Tiny Cactus Set of 3", variant_options: "Mixed greens · 45mm", unit_price: 18.0, quantity: 1, line_total: 18.0, lead_time: null },
    ],
    history: [
      { status: "paid", changed_at: "6 Oct 2026, 21:47", changed_by: "Payment confirmed" },
      { status: "printing", changed_at: "7 Oct 2026, 09:15", changed_by: "Rae at Pocket Shelf" },
      { status: "packed", changed_at: "9 Oct 2026, 16:02", changed_by: "Jo at Pocket Shelf" },
    ],
  },
  {
    reference: "PS-26-0994",
    created_at: "29 Sep 2026",
    status: "shipped",
    goods_subtotal: 19.0,
    postage_option_name: "Tracked 48",
    postage_amount: 5.5,
    tax_rate: 0.2,
    tax_amount: 4.9,
    total: 29.4,
    tracking_number: "RN 4418 9023 7GB",
    refunded_amount: 0,
    refunded_at: null,
    delivery_address: {
      recipient_name: "Nia Okafor",
      line1: "Flat 6, Hawthorn House",
      line2: "42 Kiln Lane",
      city: "Bristol",
      postcode: "BS1 4TR",
      country: "United Kingdom",
    },
    items: [
      { product_name: "Slime Mould Coaster Set", variant_options: "Teal swirl · 100mm", unit_price: 19.0, quantity: 1, line_total: 19.0, lead_time: null },
    ],
    history: [
      { status: "paid", changed_at: "29 Sep 2026, 12:31", changed_by: "Payment confirmed" },
      { status: "printing", changed_at: "30 Sep 2026, 08:40", changed_by: "Rae at Pocket Shelf" },
      { status: "packed", changed_at: "1 Oct 2026, 15:20", changed_by: "Rae at Pocket Shelf" },
      { status: "shipped", changed_at: "2 Oct 2026, 11:05", changed_by: "Jo at Pocket Shelf" },
    ],
  },
  {
    reference: "PS-26-0952",
    created_at: "18 Sep 2026",
    status: "refunded",
    goods_subtotal: 14.0,
    postage_option_name: "Standard post (2–3 days)",
    postage_amount: 3.95,
    tax_rate: 0.2,
    tax_amount: 3.59,
    total: 21.54,
    tracking_number: null,
    refunded_amount: 21.54,
    refunded_at: "24 Sep 2026",
    delivery_address: {
      recipient_name: "Nia Okafor",
      line1: "Flat 6, Hawthorn House",
      line2: "42 Kiln Lane",
      city: "Bristol",
      postcode: "BS1 4TR",
      country: "United Kingdom",
    },
    items: [
      { product_name: "Low-Poly Fox Figurine", variant_options: "Rust · 70mm · Matte", unit_price: 14.0, quantity: 1, line_total: 14.0, lead_time: null },
    ],
    history: [
      { status: "paid", changed_at: "18 Sep 2026, 20:09", changed_by: "Payment confirmed" },
      { status: "printing", changed_at: "19 Sep 2026, 09:02", changed_by: "Rae at Pocket Shelf" },
      { status: "refunded", changed_at: "24 Sep 2026, 13:44", changed_by: "Rae — second print failed, refunded in full" },
    ],
  },
];

const SAVED_ADDRESSES = [
  { id: 1, recipient_name: "Nia Okafor", line1: "Flat 6, Hawthorn House", line2: "42 Kiln Lane", city: "Bristol", postcode: "BS1 4TR", country: "United Kingdom", is_default: true },
  { id: 2, recipient_name: "Nia Okafor (work)", line1: "Studio 3, The Paintworks", line2: "Bath Road", city: "Bristol", postcode: "BS4 3EH", country: "United Kingdom", is_default: false },
];

const KNOWN_ACCOUNT = { email: "nia.okafor@gmail.com", password: "sunflower88", name: "Nia Okafor" };
const TAKEN_EMAILS = ["nia.okafor@gmail.com", "sam.brightwell@outlook.com"];
const OTHER_ACCOUNT_REFS = ["PS-26-1033", "PS-26-0881"];

export default function Screen() {
  const navigate = useNavigate();
  const { Package, Clock, CheckCircle, AlertCircle, ArrowLeft, ChevronRight, Plus, Trash, Check, X, Search, User } = Icons;

  const tint = (c, p) => `color-mix(in srgb, ${c} ${p}%, white)`;
  const shade = (c, p) => `color-mix(in srgb, ${c} ${p}%, black)`;
  const toneColor = (tone) =>
    tone === "accent" ? brand.accentColor : tone === "primary" ? brand.primaryColor : brand.neutralColor;
  const gbp = (n) => "£" + n.toFixed(2);

  const timers = React.useRef([]);
  React.useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const later = (fn, ms) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
  };

  /* ---------------- session + auth ---------------- */
  const [session, setSession] = React.useState(null);
  const [authMode, setAuthMode] = React.useState("signin");

  const [signIn, setSignIn] = React.useState({ email: KNOWN_ACCOUNT.email, password: KNOWN_ACCOUNT.password });
  const [signInErr, setSignInErr] = React.useState("");
  const [signInBusy, setSignInBusy] = React.useState(false);

  const [reg, setReg] = React.useState({ email: "", password: "", confirm: "" });
  const [regErr, setRegErr] = React.useState({});
  const [regBusy, setRegBusy] = React.useState(false);

  const [resetEmail, setResetEmail] = React.useState("");
  const [resetErr, setResetErr] = React.useState("");
  const [resetStage, setResetStage] = React.useState("form");

  /* ---------------- account data ---------------- */
  const [orders, setOrders] = React.useState([]);
  const [addresses, setAddresses] = React.useState([]);
  const [tab, setTab] = React.useState("orders");
  const [filter, setFilter] = React.useState("all");
  const [openRef, setOpenRef] = React.useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const [freshness, setFreshness] = React.useState("Updated 4 minutes ago");

  const [lookup, setLookup] = React.useState("");
  const [lookupState, setLookupState] = React.useState(null);

  const [addrOpen, setAddrOpen] = React.useState(false);
  const [addrForm, setAddrForm] = React.useState({ recipient_name: "", line1: "", line2: "", city: "", postcode: "", is_default: false });
  const [addrErr, setAddrErr] = React.useState({});
  const [flash, setFlash] = React.useState("");

  const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const openSession = (name, email, withData) => {
    setSession({ name, email });
    setOrders(withData ? ORDERS : []);
    setAddresses(withData ? SAVED_ADDRESSES : []);
    setTab("orders");
    setFilter("all");
    setOpenRef(null);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    if (!emailOk(signIn.email)) {
      setSignInErr("That email address is missing an @ or a domain — check it and try again.");
      return;
    }
    setSignInErr("");
    setSignInBusy(true);
    later(() => {
      if (signIn.password !== KNOWN_ACCOUNT.password) {
        setSignInBusy(false);
        setSignInErr("That email and password don't match. Have another go, or reset your password below.");
      } else {
        setSignInBusy(false);
        openSession(KNOWN_ACCOUNT.name, signIn.email.trim(), true);
      }
    }, 650);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const errs = {};
    if (!emailOk(reg.email)) errs.email = "Enter an email we can send your order confirmation to.";
    else if (TAKEN_EMAILS.includes(reg.email.trim().toLowerCase())) errs.email = "dupe";
    if (reg.password.length < 8) errs.password = "Passwords need at least 8 characters.";
    if (reg.confirm !== reg.password) errs.confirm = "The two passwords don't match yet.";
    setRegErr(errs);
    if (Object.keys(errs).length) return;
    setRegBusy(true);
    later(() => {
      setRegBusy(false);
      const nick = reg.email.split("@")[0].replace(/[._-]+/g, " ");
      openSession(nick.replace(/\b\w/g, (c) => c.toUpperCase()), reg.email.trim(), false);
    }, 650);
  };

  const handleReset = (e) => {
    e.preventDefault();
    if (!emailOk(resetEmail)) {
      setResetErr("Enter the email address you shop with so we know where to send the link.");
      return;
    }
    setResetErr("");
    setResetStage("sent");
  };

  const signOut = () => {
    setSession(null);
    setAuthMode("signin");
    setResetStage("form");
    setSignInErr("");
    setOpenRef(null);
    setLookupState(null);
    setLookup("");
  };

  const refresh = () => {
    setRefreshing(true);
    later(() => {
      setRefreshing(false);
      setFreshness("Updated just now");
    }, 800);
  };

  const submitLookup = (e) => {
    e.preventDefault();
    const ref = lookup.trim().toUpperCase();
    if (!ref) {
      setLookupState({ kind: "empty" });
      return;
    }
    const mine = orders.find((o) => o.reference === ref);
    if (mine) {
      setOpenRef(mine.reference);
      setLookupState(null);
      setLookup("");
      return;
    }
    if (OTHER_ACCOUNT_REFS.includes(ref)) setLookupState({ kind: "denied", ref });
    else setLookupState({ kind: "missing", ref });
  };

  const addAddress = (e) => {
    e.preventDefault();
    const errs = {};
    if (!addrForm.recipient_name.trim()) errs.recipient_name = "Who should the parcel be addressed to?";
    if (!addrForm.line1.trim()) errs.line1 = "We need a street or building to post to.";
    if (!addrForm.city.trim()) errs.city = "Add a town or city.";
    if (!/^[A-Za-z]{1,2}\d[A-Za-z\d]?\s?\d[A-Za-z]{2}$/.test(addrForm.postcode.trim())) errs.postcode = "That isn't a UK postcode — try BS1 4TR.";
    setAddrErr(errs);
    if (Object.keys(errs).length) return;
    const id = Date.now();
    setAddresses((prev) => {
      const next = prev.map((a) => (addrForm.is_default ? { ...a, is_default: false } : a));
      return [
        ...next,
        {
          id,
          recipient_name: addrForm.recipient_name.trim(),
          line1: addrForm.line1.trim(),
          line2: addrForm.line2.trim(),
          city: addrForm.city.trim(),
          postcode: addrForm.postcode.trim().toUpperCase(),
          country: "United Kingdom",
          is_default: addrForm.is_default || prev.length === 0,
        },
      ];
    });
    setAddrForm({ recipient_name: "", line1: "", line2: "", city: "", postcode: "", is_default: false });
    setAddrErr({});
    setAddrOpen(false);
    setFlash("Address saved — we'll offer it at your next checkout.");
    later(() => setFlash(""), 5000);
  };

  const makeDefault = (id) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, is_default: a.id === id })));
    setFlash("Default address updated.");
    later(() => setFlash(""), 4000);
  };

  const removeAddress = (id) => {
    setAddresses((prev) => {
      const next = prev.filter((a) => a.id !== id);
      if (next.length && !next.some((a) => a.is_default)) next[0] = { ...next[0], is_default: true };
      return next;
    });
    setFlash("Address deleted.");
    later(() => setFlash(""), 4000);
  };

  /* ---------------- shared styles ---------------- */
  const css = `
    .ps-focus:focus-visible { outline: 3px solid ${brand.primaryColor}; outline-offset: 2px; }
    @keyframes ps-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
    @keyframes ps-pulse { 0%,100% { opacity: .55; } 50% { opacity: 1; } }
    .ps-rise { animation: ps-rise .28s cubic-bezier(.2,.9,.3,1.2) both; }
    .ps-skel { animation: ps-pulse 1.1s ease-in-out infinite; }
    .ps-press { transition: transform .12s ease, box-shadow .18s ease, background-color .18s ease; }
    .ps-press:active { transform: scale(.985); }
    @media (prefers-reduced-motion: reduce) {
      .ps-rise, .ps-skel { animation: none !important; }
      .ps-press { transition: none; }
    }
  `;

  const card = {
    backgroundColor: "#fff",
    borderRadius: brand.radius,
    border: `1px solid ${tint(brand.neutralColor, 20)}`,
    boxShadow: `0 1px 2px ${tint(brand.neutralColor, 28)}`,
  };
  const primaryBtn = {
    backgroundColor: brand.primaryColor,
    color: "#fff",
    borderRadius: brand.radius,
    boxShadow: `0 2px 0 ${shade(brand.primaryColor, 72)}`,
  };
  const quietBtn = {
    backgroundColor: tint(brand.primaryColor, 8),
    color: shade(brand.primaryColor, 82),
    borderRadius: brand.radius,
  };
  const labelCls = "block text-sm font-semibold mb-1.5";
  const inputStyle = (bad) => ({
    width: "100%",
    borderRadius: brand.radius,
    border: `1.5px solid ${bad ? brand.accentColor : tint(brand.neutralColor, 35)}`,
    backgroundColor: bad ? tint(brand.accentColor, 7) : "#fff",
    color: shade(brand.neutralColor, 88),
    padding: "0.625rem 0.75rem",
    fontSize: "0.95rem",
  });

  const StatusChip = ({ status, big }) => {
    const s = STATUS[status];
    const Ico = Icons[s.icon];
    const c = toneColor(s.tone);
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-semibold ${big ? "px-3 py-1.5 text-sm" : "px-2.5 py-1 text-xs"}`}
        style={{ backgroundColor: tint(c, 15), color: shade(c, 80), borderRadius: 999 }}
      >
        <Ico className="h-3.5 w-3.5" aria-hidden="true" />
        {s.label}
      </span>
    );
  };

  const FieldError = ({ children }) => (
    <p className="mt-1.5 flex items-start gap-1.5 text-sm" style={{ color: shade(brand.accentColor, 72) }}>
      <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );

  /* ================= SIGNED OUT ================= */
  if (!session) {
    return (
      <div className="min-h-full" style={{ backgroundColor: brand.backgroundColor, fontFamily: brand.fontBody }}>
        <style>{css}</style>
        <div className="mx-auto w-full max-w-xl px-4 pb-20 pt-8 sm:px-6">
          <h1 className="text-[1.75rem] font-extrabold leading-tight sm:text-4xl" style={{ fontFamily: brand.fontHeading, color: shade(brand.primaryColor, 88) }}>
            Your Pocket Shelf account
          </h1>
          <p className="mt-2 text-base leading-relaxed" style={{ color: brand.neutralColor }}>
            Sign in for your order history, tracking numbers and saved addresses. You never need one to buy — guest checkout is always open.
          </p>

          {authMode !== "reset" && (
            <div role="tablist" aria-label="Account access" className="mt-6 flex gap-1 p-1" style={{ backgroundColor: tint(brand.primaryColor, 9), borderRadius: brand.radius }}>
              {[{ id: "signin", label: "Sign in" }, { id: "register", label: "Create account" }].map((t) => {
                const on = authMode === t.id;
                return (
                  <button
                    key={t.id}
                    role="tab"
                    id={`tab-${t.id}`}
                    aria-selected={on}
                    aria-controls={`panel-${t.id}`}
                    onClick={() => setAuthMode(t.id)}
                    className="ps-focus ps-press flex-1 py-2.5 text-sm font-bold"
                    style={{
                      borderRadius: `calc(${brand.radius} - 2px)`,
                      backgroundColor: on ? "#fff" : "transparent",
                      color: on ? shade(brand.primaryColor, 85) : brand.neutralColor,
                      boxShadow: on ? `0 1px 3px ${tint(brand.neutralColor, 30)}` : "none",
                    }}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          )}

          {authMode === "signin" && (
            <section id="panel-signin" role="tabpanel" aria-labelledby="tab-signin" className="ps-rise mt-4 p-5 sm:p-6" style={card}>
              <h2 className="text-lg font-bold" style={{ fontFamily: brand.fontHeading, color: shade(brand.primaryColor, 88) }}>
                Welcome back
              </h2>
              <form className="mt-4 space-y-4" onSubmit={handleSignIn} noValidate>
                <div>
                  <label htmlFor="si-email" className={labelCls} style={{ color: shade(brand.neutralColor, 70) }}>Email address</label>
                  <input id="si-email" type="email" autoComplete="email" className="ps-focus" style={inputStyle(false)} value={signIn.email} onChange={(e) => setSignIn({ ...signIn, email: e.target.value })} />
                </div>
                <div>
                  <label htmlFor="si-pass" className={labelCls} style={{ color: shade(brand.neutralColor, 70) }}>Password</label>
                  <input id="si-pass" type="password" autoComplete="current-password" className="ps-focus" style={inputStyle(false)} value={signIn.password} onChange={(e) => setSignIn({ ...signIn, password: e.target.value })} />
                </div>

                {signInErr && (
                  <div className="ps-rise flex items-start gap-2 p-3 text-sm" role="alert" style={{ backgroundColor: tint(brand.accentColor, 10), color: shade(brand.accentColor, 74), borderRadius: brand.radius }}>
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{signInErr}</span>
                  </div>
                )}

                <button type="submit" disabled={signInBusy} className="ps-focus ps-press w-full py-3 text-base font-bold" style={{ ...primaryBtn, opacity: signInBusy ? 0.75 : 1 }}>
                  {signInBusy ? "Checking your details…" : "Sign in"}
                </button>
              </form>

              <p className="mt-4 text-sm" style={{ color: brand.neutralColor }}>
                Your basket of 3 items stays put while you sign in.
              </p>

              <div className="mt-4 border-t pt-4" style={{ borderColor: tint(brand.neutralColor, 22) }}>
                <button onClick={() => { setAuthMode("reset"); setResetStage("form"); setResetEmail(signIn.email); }} className="ps-focus text-sm font-bold underline underline-offset-4" style={{ color: shade(brand.primaryColor, 88) }}>
                  Forgotten your password?
                </button>
              </div>
            </section>
          )}

          {authMode === "register" && (
            <section id="panel-register" role="tabpanel" aria-labelledby="tab-register" className="ps-rise mt-4 p-5 sm:p-6" style={card}>
              <h2 className="text-lg font-bold" style={{ fontFamily: brand.fontHeading, color: shade(brand.primaryColor, 88) }}>
                Make an account
              </h2>
              <p className="mt-1 text-sm" style={{ color: brand.neutralColor }}>Email and password, nothing else. No newsletter attached.</p>
              <form className="mt-4 space-y-4" onSubmit={handleRegister} noValidate>
                <div>
                  <label htmlFor="rg-email" className={labelCls} style={{ color: shade(brand.neutralColor, 70) }}>Email address</label>
                  <input id="rg-email" type="email" autoComplete="email" className="ps-focus" style={inputStyle(!!regErr.email)} value={reg.email} onChange={(e) => setReg({ ...reg, email: e.target.value })} aria-describedby={regErr.email ? "rg-email-err" : undefined} />
                  {regErr.email === "dupe" ? (
                    <div id="rg-email-err" className="ps-rise mt-2 p-3 text-sm" style={{ backgroundColor: tint(brand.accentColor, 10), color: shade(brand.accentColor, 74), borderRadius: brand.radius }}>
                      <p className="font-semibold">There's already an account on that email.</p>
                      <button type="button" onClick={() => { setAuthMode("signin"); setSignIn({ email: reg.email, password: "" }); }} className="ps-focus mt-1 font-bold underline underline-offset-4">
                        Sign in instead
                      </button>
                    </div>
                  ) : regErr.email ? (
                    <div id="rg-email-err"><FieldError>{regErr.email}</FieldError></div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="rg-pass" className={labelCls} style={{ color: shade(brand.neutralColor, 70) }}>Password</label>
                  <input id="rg-pass" type="password" autoComplete="new-password" className="ps-focus" style={inputStyle(!!regErr.password)} value={reg.password} onChange={(e) => setReg({ ...reg, password: e.target.value })} aria-describedby="rg-pass-hint" />
                  <p id="rg-pass-hint" className="mt-1.5 text-xs" style={{ color: brand.neutralColor }}>At least 8 characters.</p>
                  {regErr.password && <FieldError>{regErr.password}</FieldError>}
                </div>
                <div>
                  <label htmlFor="rg-confirm" className={labelCls} style={{ color: shade(brand.neutralColor, 70) }}>Repeat password</label>
                  <input id="rg-confirm" type="password" autoComplete="new-password" className="ps-focus" style={inputStyle(!!regErr.confirm)} value={reg.confirm} onChange={(e) => setReg({ ...reg, confirm: e.target.value })} />
                  {regErr.confirm && <FieldError>{regErr.confirm}</FieldError>}
                </div>
                <button type="submit" disabled={regBusy} className="ps-focus ps-press w-full py-3 text-base font-bold" style={{ ...primaryBtn, opacity: regBusy ? 0.75 : 1 }}>
                  {regBusy ? "Creating your account…" : "Create account"}
                </button>
              </form>
            </section>
          )}

          {authMode === "reset" && (
            <section className="ps-rise mt-6 p-5 sm:p-6" style={card}>
              <button onClick={() => setAuthMode("signin")} className="ps-focus mb-4 inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: shade(brand.primaryColor, 85) }}>
                <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to sign in
              </button>
              {resetStage === "form" && (
                <>
                  <h2 className="text-lg font-bold" style={{ fontFamily: brand.fontHeading, color: shade(brand.primaryColor, 88) }}>Reset your password</h2>
                  <p className="mt-1 text-sm" style={{ color: brand.neutralColor }}>We'll email a link that works for 60 minutes.</p>
                  <form className="mt-4 space-y-4" onSubmit={handleReset} noValidate>
                    <div>
                      <label htmlFor="rs-email" className={labelCls} style={{ color: shade(brand.neutralColor, 70) }}>Email address</label>
                      <input id="rs-email" type="email" className="ps-focus" style={inputStyle(!!resetErr)} value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} />
                      {resetErr && <FieldError>{resetErr}</FieldError>}
                    </div>
                    <button type="submit" className="ps-focus ps-press w-full py-3 text-base font-bold" style={primaryBtn}>Email me a reset link</button>
                  </form>
                </>
              )}
              {resetStage === "sent" && (
                <div className="ps-rise">
                  <div className="flex h-11 w-11 items-center justify-center" style={{ backgroundColor: tint(brand.primaryColor, 14), borderRadius: 999 }}>
                    <CheckCircle className="h-5 w-5" aria-hidden="true" style={{ color: shade(brand.primaryColor, 85) }} />
                  </div>
                  <h2 className="mt-3 text-lg font-bold" style={{ fontFamily: brand.fontHeading, color: shade(brand.primaryColor, 88) }}>Check your inbox</h2>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: brand.neutralColor }}>
                    If <span className="font-semibold" style={{ color: shade(brand.neutralColor, 80) }}>{resetEmail.trim()}</span> has an account, a reset link is on its way. It expires in 60 minutes and works once.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button onClick={() => setResetStage("form")} className="ps-focus ps-press px-4 py-2.5 text-sm font-bold" style={quietBtn}>Send it again</button>
                    <button onClick={() => setResetStage("expired")} className="ps-focus px-4 py-2.5 text-sm font-semibold underline underline-offset-4" style={{ color: brand.neutralColor }}>My link has expired</button>
                  </div>
                </div>
              )}
              {resetStage === "expired" && (
                <div className="ps-rise">
                  <h2 className="text-lg font-bold" style={{ fontFamily: brand.fontHeading, color: shade(brand.accentColor, 74) }}>That link has run out</h2>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: brand.neutralColor }}>
                    Reset links last 60 minutes and can only be used once — this one has been used or has timed out. Request a fresh one and it'll be in your inbox in a moment.
                  </p>
                  <button onClick={() => setResetStage("form")} className="ps-focus ps-press mt-4 px-5 py-2.5 text-sm font-bold" style={primaryBtn}>Request a new link</button>
                </div>
              )}
            </section>
          )}

          <div className="mt-6 p-5" style={{ ...card, backgroundColor: tint(brand.primaryColor, 6), boxShadow: "none" }}>
            <h2 className="text-sm font-bold uppercase tracking-wide" style={{ color: shade(brand.primaryColor, 80) }}>What an account gets you</h2>
            <ul className="mt-3 space-y-2 text-sm" style={{ color: shade(brand.neutralColor, 70) }}>
              {["Every order and its tracking number in one list", "Saved delivery addresses, picked in one tap at checkout", "Lead times for printed-to-order pieces, kept with the order"].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" style={{ color: brand.accentColor }} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <button onClick={() => navigate("catalogue")} className="ps-focus mt-4 inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: shade(brand.primaryColor, 85) }}>
              Browse the shop instead <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ================= SIGNED IN ================= */
  const open = orders.find((o) => o.reference === openRef);
  const counts = orders.reduce((acc, o) => ({ ...acc, [o.status]: (acc[o.status] || 0) + 1 }), {});
  const visible = filter === "all" ? orders : orders.filter((o) => o.status === filter);
  const inProgress = orders.filter((o) => ["paid", "printing", "packed"].includes(o.status)).length;
  const initials = session.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  const filters = [
    { id: "all", label: "All", n: orders.length },
    { id: "paid", label: "Paid", n: counts.paid || 0 },
    { id: "printing", label: "Printing", n: counts.printing || 0 },
    { id: "packed", label: "Packed", n: counts.packed || 0 },
    { id: "shipped", label: "Shipped", n: counts.shipped || 0 },
    { id: "refunded", label: "Refunded", n: counts.refunded || 0 },
  ];

  return (
    <div className="min-h-full" style={{ backgroundColor: brand.backgroundColor, fontFamily: brand.fontBody }}>
      <style>{css}</style>
      <div className="mx-auto w-full max-w-3xl px-4 pb-24 pt-6 sm:px-6">
        {/* header */}
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center text-base font-extrabold" style={{ backgroundColor: tint(brand.accentColor, 22), color: shade(brand.accentColor, 78), borderRadius: 999 }} aria-hidden="true">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-[1.6rem] font-extrabold leading-tight sm:text-3xl" style={{ fontFamily: brand.fontHeading, color: shade(brand.primaryColor, 88) }}>
              {session.name}
            </h1>
            <p className="truncate text-sm" style={{ color: brand.neutralColor }}>{session.email}</p>
          </div>
          <button onClick={signOut} className="ps-focus ps-press shrink-0 px-3.5 py-2 text-sm font-bold" style={quietBtn}>Sign out</button>
        </div>

        {orders.length > 0 && (
          <p className="mt-3 text-sm" style={{ color: shade(brand.neutralColor, 60) }}>
            <span style={{ fontVariantNumeric: "tabular-nums", fontWeight: 700, color: shade(brand.primaryColor, 85) }}>{orders.length}</span> orders ·{" "}
            <span style={{ fontVariantNumeric: "tabular-nums", fontWeight: 700, color: shade(brand.accentColor, 72) }}>{inProgress}</span> still with the printer
          </p>
        )}

        {/* tabs */}
        <div role="tablist" aria-label="Account sections" className="mt-5 flex gap-1 p-1" style={{ backgroundColor: tint(brand.primaryColor, 9), borderRadius: brand.radius }}>
          {[{ id: "orders", label: "Orders" }, { id: "addresses", label: "Saved addresses" }].map((t) => {
            const on = tab === t.id;
            return (
              <button
                key={t.id}
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={on}
                aria-controls={`panel-${t.id}`}
                onClick={() => { setTab(t.id); setOpenRef(null); }}
                className="ps-focus ps-press flex-1 py-2.5 text-sm font-bold"
                style={{
                  borderRadius: `calc(${brand.radius} - 2px)`,
                  backgroundColor: on ? "#fff" : "transparent",
                  color: on ? shade(brand.primaryColor, 85) : brand.neutralColor,
                  boxShadow: on ? `0 1px 3px ${tint(brand.neutralColor, 30)}` : "none",
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* ---------- ORDERS ---------- */}
        {tab === "orders" && (
          <section id="panel-orders" role="tabpanel" aria-labelledby="tab-orders" className="mt-6">
            {!open && (
              <>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="text-xl font-extrabold" style={{ fontFamily: brand.fontHeading, color: shade(brand.primaryColor, 88) }}>Order history</h2>
                  <div className="flex items-center gap-3">
                    <span className="text-xs" style={{ color: brand.neutralColor }}>{refreshing ? "Checking for updates…" : freshness}</span>
                    <button onClick={refresh} disabled={refreshing} className="ps-focus text-xs font-bold underline underline-offset-4" style={{ color: shade(brand.primaryColor, 85), opacity: refreshing ? 0.6 : 1 }}>
                      Refresh
                    </button>
                  </div>
                </div>

                {orders.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {filters.map((f) => {
                      const on = filter === f.id;
                      return (
                        <button
                          key={f.id}
                          onClick={() => setFilter(f.id)}
                          aria-pressed={on}
                          className="ps-focus ps-press px-3 py-1.5 text-xs font-bold"
                          style={{
                            borderRadius: 999,
                            backgroundColor: on ? brand.primaryColor : "#fff",
                            color: on ? "#fff" : shade(brand.neutralColor, 60),
                            border: `1.5px solid ${on ? brand.primaryColor : tint(brand.neutralColor, 28)}`,
                          }}
                        >
                          {f.label} <span style={{ fontVariantNumeric: "tabular-nums", opacity: 0.8 }}>{f.n}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {refreshing && (
                  <ul className="mt-4 space-y-3" aria-hidden="true">
                    {[0, 1, 2].map((i) => (
                      <li key={i} className="ps-skel h-[92px]" style={{ ...card, backgroundColor: tint(brand.neutralColor, 10), boxShadow: "none" }} />
                    ))}
                  </ul>
                )}

                {!refreshing && orders.length === 0 && (
                  <div className="ps-rise mt-4 px-6 py-12 text-center" style={card}>
                    <div className="mx-auto flex h-14 w-14 items-center justify-center" style={{ backgroundColor: tint(brand.accentColor, 16), borderRadius: 999 }}>
                      <Package className="h-6 w-6" aria-hidden="true" style={{ color: shade(brand.accentColor, 70) }} />
                    </div>
                    <h3 className="mt-4 text-lg font-bold" style={{ fontFamily: brand.fontHeading, color: shade(brand.primaryColor, 88) }}>Nothing on the shelf yet</h3>
                    <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed" style={{ color: brand.neutralColor }}>
                      Your first order will land here with its status and tracking number the moment you buy something.
                    </p>
                    <button onClick={() => navigate("catalogue")} className="ps-focus ps-press mt-5 px-5 py-3 text-sm font-bold" style={primaryBtn}>Browse the shop</button>
                  </div>
                )}

                {!refreshing && orders.length > 0 && visible.length === 0 && (
                  <div className="ps-rise mt-4 px-6 py-10 text-center" style={card}>
                    <h3 className="text-base font-bold" style={{ fontFamily: brand.fontHeading, color: shade(brand.primaryColor, 88) }}>
                      Nothing at the “{filters.find((f) => f.id === filter).label}” stage
                    </h3>
                    <p className="mt-2 text-sm" style={{ color: brand.neutralColor }}>Your other {orders.length} orders are still here.</p>
                    <button onClick={() => setFilter("all")} className="ps-focus ps-press mt-4 px-4 py-2.5 text-sm font-bold" style={quietBtn}>Show all orders</button>
                  </div>
                )}

                {!refreshing && visible.length > 0 && (
                  <ul className="mt-4 space-y-3">
                    {visible.map((o, i) => {
                      const latest = i === 0 && filter === "all";
                      const names = o.items.map((it) => it.product_name);
                      const qty = o.items.reduce((s, it) => s + it.quantity, 0);
                      return (
                        <li key={o.reference} className="ps-rise" style={{ animationDelay: `${i * 35}ms` }}>
                          <button
                            onClick={() => setOpenRef(o.reference)}
                            className="ps-focus ps-press w-full p-4 text-left sm:p-5"
                            style={{
                              ...card,
                              borderColor: latest ? tint(brand.primaryColor, 45) : tint(brand.neutralColor, 20),
                              borderWidth: latest ? 2 : 1,
                              backgroundColor: latest ? tint(brand.primaryColor, 4) : "#fff",
                            }}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="text-sm font-extrabold" style={{ fontVariantNumeric: "tabular-nums", color: shade(brand.primaryColor, 88) }}>{o.reference}</span>
                                  <StatusChip status={o.status} />
                                </div>
                                <p className="mt-1 text-xs" style={{ color: brand.neutralColor, fontVariantNumeric: "tabular-nums" }}>
                                  {o.created_at} · {qty} item{qty > 1 ? "s" : ""}
                                </p>
                                <p className="mt-2 truncate text-sm font-medium" style={{ color: shade(brand.neutralColor, 72) }}>
                                  {names[0]}{names.length > 1 ? ` + ${names.length - 1} more` : ""}
                                </p>
                                <p className="mt-1.5 text-xs" style={{ color: brand.neutralColor }}>{STATUS[o.status].note}</p>
                              </div>
                              <div className="flex shrink-0 items-center gap-1.5">
                                <span className="text-base font-extrabold" style={{ fontVariantNumeric: "tabular-nums", color: shade(brand.primaryColor, 88) }}>{gbp(o.total)}</span>
                                <ChevronRight className="h-5 w-5" aria-hidden="true" style={{ color: brand.neutralColor }} />
                              </div>
                            </div>
                            {latest && (
                              <div className="mt-4 flex items-center gap-1.5">
                                {FLOW.map((s) => {
                                  const done = FLOW.indexOf(s) <= FLOW.indexOf(o.status);
                                  return <span key={s} className="h-1.5 flex-1" style={{ borderRadius: 999, backgroundColor: done ? brand.primaryColor : tint(brand.primaryColor, 16) }} />;
                                })}
                                <span className="ml-2 text-[0.7rem] font-bold uppercase tracking-wide" style={{ color: shade(brand.primaryColor, 80) }}>Latest</span>
                              </div>
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}

                {/* lookup */}
                <div className="mt-8 p-5" style={{ ...card, backgroundColor: tint(brand.primaryColor, 5), boxShadow: "none" }}>
                  <h3 className="text-sm font-bold" style={{ color: shade(brand.primaryColor, 85) }}>Looking for an order that isn't listed?</h3>
                  <form className="mt-3 flex flex-col gap-2 sm:flex-row" onSubmit={submitLookup} noValidate>
                    <div className="flex-1">
                      <label htmlFor="lookup" className="sr-only">Order reference</label>
                      <input id="lookup" className="ps-focus" placeholder="PS-26-1042" style={{ ...inputStyle(false), fontVariantNumeric: "tabular-nums" }} value={lookup} onChange={(e) => { setLookup(e.target.value); setLookupState(null); }} />
                    </div>
                    <button type="submit" className="ps-focus ps-press inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold" style={quietBtn}>
                      <Search className="h-4 w-4" aria-hidden="true" /> Find order
                    </button>
                  </form>
                  {lookupState && (
                    <div className="ps-rise mt-3 p-3 text-sm" role="status" style={{ backgroundColor: "#fff", borderRadius: brand.radius, border: `1px solid ${tint(brand.neutralColor, 25)}`, color: shade(brand.neutralColor, 72) }}>
                      {lookupState.kind === "empty" && <p>Type a reference like <span style={{ fontVariantNumeric: "tabular-nums", fontWeight: 700 }}>PS-26-1042</span> — it's at the top of your confirmation email.</p>}
                      {lookupState.kind === "missing" && (
                        <p>
                          No order <span style={{ fontVariantNumeric: "tabular-nums", fontWeight: 700 }}>{lookupState.ref}</span> on this account. Orders placed as a guest aren't linked automatically — email <span className="font-semibold">hello@pocketshelf.co.uk</span> from the address you used and we'll attach it.
                        </p>
                      )}
                      {lookupState.kind === "denied" && (
                        <div className="flex items-start gap-2">
                          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" style={{ color: shade(brand.accentColor, 70) }} />
                          <p>
                            <span className="font-bold" style={{ color: shade(brand.accentColor, 74) }}>That order belongs to someone else.</span>{" "}
                            Only the account <span style={{ fontVariantNumeric: "tabular-nums" }}>{lookupState.ref}</span> was placed with can open it. If it was a gift bought for you, ask the buyer for the tracking number, or email <span className="font-semibold">hello@pocketshelf.co.uk</span>.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* ---------- ORDER DETAIL ---------- */}
            {open && (
              <div className="ps-rise">
                <button onClick={() => setOpenRef(null)} className="ps-focus inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: shade(brand.primaryColor, 85) }}>
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All orders
                </button>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-extrabold" style={{ fontFamily: brand.fontHeading, fontVariantNumeric: "tabular-nums", color: shade(brand.primaryColor, 88) }}>
                    {open.reference}
                  </h2>
                  <StatusChip status={open.status} big />
                </div>
                <p className="mt-1 text-sm" style={{ color: brand.neutralColor }}>Placed {open.created_at} · paid by card</p>

                {open.status === "refunded" && (
                  <div className="mt-4 p-4 text-sm" style={{ backgroundColor: tint(brand.neutralColor, 10), borderRadius: brand.radius, color: shade(brand.neutralColor, 78) }}>
                    <p className="font-bold">Refunded in full on {open.refunded_at}</p>
                    <p className="mt-1" style={{ fontVariantNumeric: "tabular-nums" }}>{gbp(open.refunded_amount)} went back to the card you paid with — allow 5 working days for your bank.</p>
                  </div>
                )}

                {open.tracking_number && (
                  <div className="mt-4 p-4" style={{ backgroundColor: tint(brand.primaryColor, 9), borderRadius: brand.radius }}>
                    <p className="text-xs font-bold uppercase tracking-wide" style={{ color: shade(brand.primaryColor, 80) }}>Tracking number</p>
                    <p className="mt-1 text-lg font-extrabold" style={{ fontVariantNumeric: "tabular-nums", color: shade(brand.primaryColor, 88) }}>{open.tracking_number}</p>
                    <p className="mt-1 text-sm" style={{ color: brand.neutralColor }}>{open.postage_option_name} · posted 2 Oct 2026</p>
                  </div>
                )}

                {open.items.some((i) => i.lead_time) && !["shipped", "refunded"].includes(open.status) && (
                  <div className="mt-4 flex items-start gap-2 p-4 text-sm" style={{ backgroundColor: tint(brand.accentColor, 11), borderRadius: brand.radius, color: shade(brand.accentColor, 74) }}>
                    <Clock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <p><span className="font-bold">Printed to order.</span> Longest lead time on this order: {open.items.filter((i) => i.lead_time).map((i) => i.lead_time)[0]}. We post as soon as the last piece is off the plate.</p>
                  </div>
                )}

                {/* progress */}
                <div className="mt-6 p-5" style={card}>
                  <h3 className="text-sm font-bold uppercase tracking-wide" style={{ color: shade(brand.neutralColor, 65) }}>Progress</h3>
                  <ol className="mt-4 space-y-4">
                    {(open.status === "refunded" ? open.history.map((h) => h.status) : FLOW).map((s) => {
                      const hit = open.history.find((h) => h.status === s);
                      const c = toneColor(STATUS[s].tone);
                      return (
                        <li key={s} className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center" style={{ borderRadius: 999, backgroundColor: hit ? tint(c, 18) : tint(brand.neutralColor, 10), border: hit ? "none" : `1.5px dashed ${tint(brand.neutralColor, 40)}` }}>
                            {hit ? <Check className="h-3.5 w-3.5" aria-hidden="true" style={{ color: shade(c, 80) }} /> : null}
                          </span>
                          <div className="min-w-0">
                            <p className="text-sm font-bold" style={{ color: hit ? shade(brand.primaryColor, 85) : brand.neutralColor }}>
                              {STATUS[s].label}{!hit && " — not yet"}
                            </p>
                            <p className="text-xs" style={{ color: brand.neutralColor, fontVariantNumeric: "tabular-nums" }}>
                              {hit ? `${hit.changed_at} · ${hit.changed_by}` : STATUS[s].note}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>

                {/* items + totals */}
                <div className="mt-4 p-5" style={card}>
                  <h3 className="text-sm font-bold uppercase tracking-wide" style={{ color: shade(brand.neutralColor, 65) }}>What you bought</h3>
                  <ul className="mt-3 divide-y" style={{ borderColor: tint(brand.neutralColor, 20) }}>
                    {open.items.map((it, idx) => (
                      <li key={idx} className="flex items-start justify-between gap-4 py-3">
                        <div className="min-w-0">
                          <p className="text-sm font-bold" style={{ color: shade(brand.primaryColor, 88) }}>{it.product_name}</p>
                          <p className="text-xs" style={{ color: brand.neutralColor }}>{it.variant_options}</p>
                          {it.lead_time && (
                            <p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold" style={{ color: shade(brand.accentColor, 72) }}>
                              <Clock className="h-3 w-3" aria-hidden="true" /> {it.lead_time}
                            </p>
                          )}
                          <p className="mt-1 text-xs" style={{ color: brand.neutralColor, fontVariantNumeric: "tabular-nums" }}>{it.quantity} × {gbp(it.unit_price)}</p>
                        </div>
                        <span className="shrink-0 text-sm font-bold" style={{ fontVariantNumeric: "tabular-nums", color: shade(brand.primaryColor, 88) }}>{gbp(it.line_total)}</span>
                      </li>
                    ))}
                  </ul>

                  <dl className="mt-4 space-y-2 border-t pt-4 text-sm" style={{ borderColor: tint(brand.neutralColor, 20), fontVariantNumeric: "tabular-nums" }}>
                    <div className="flex justify-between"><dt style={{ color: brand.neutralColor }}>Goods</dt><dd style={{ color: shade(brand.neutralColor, 80) }}>{gbp(open.goods_subtotal)}</dd></div>
                    <div className="flex justify-between gap-4">
                      <dt style={{ color: brand.neutralColor }}>{open.postage_option_name}</dt>
                      <dd style={{ color: open.postage_amount === 0 ? shade(brand.accentColor, 70) : shade(brand.neutralColor, 80), fontWeight: open.postage_amount === 0 ? 700 : 400 }}>
                        {open.postage_amount === 0 ? "Free" : gbp(open.postage_amount)}
                      </dd>
                    </div>
                    <div className="flex justify-between"><dt style={{ color: brand.neutralColor }}>VAT at {Math.round(open.tax_rate * 100)}%</dt><dd style={{ color: shade(brand.neutralColor, 80) }}>{gbp(open.tax_amount)}</dd></div>
                    <div className="flex justify-between border-t pt-2 text-base font-extrabold" style={{ borderColor: tint(brand.neutralColor, 20), color: shade(brand.primaryColor, 88) }}>
                      <dt>Total paid</dt><dd>{gbp(open.total)}</dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-4 p-5" style={card}>
                  <h3 className="text-sm font-bold uppercase tracking-wide" style={{ color: shade(brand.neutralColor, 65) }}>Delivered to</h3>
                  <address className="mt-2 text-sm not-italic leading-relaxed" style={{ color: shade(brand.neutralColor, 78) }}>
                    <span className="font-bold" style={{ color: shade(brand.primaryColor, 88) }}>{open.delivery_address.recipient_name}</span><br />
                    {open.delivery_address.line1}<br />
                    {open.delivery_address.line2 && <>{open.delivery_address.line2}<br /></>}
                    {open.delivery_address.city}<br />
                    <span style={{ fontVariantNumeric: "tabular-nums" }}>{open.delivery_address.postcode}</span><br />
                    {open.delivery_address.country}
                  </address>
                </div>

                <p className="mt-4 text-sm" style={{ color: brand.neutralColor }}>
                  Something not right with this order? Email <span className="font-semibold" style={{ color: shade(brand.primaryColor, 85) }}>hello@pocketshelf.co.uk</span> quoting {open.reference}.
                </p>
              </div>
            )}
          </section>
        )}

        {/* ---------- ADDRESSES ---------- */}
        {tab === "addresses" && (
          <section id="panel-addresses" role="tabpanel" aria-labelledby="tab-addresses" className="mt-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-extrabold" style={{ fontFamily: brand.fontHeading, color: shade(brand.primaryColor, 88) }}>Saved addresses</h2>
              <button onClick={() => { setAddrOpen((v) => !v); setAddrErr({}); }} aria-expanded={addrOpen} className="ps-focus ps-press inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold" style={addrOpen ? quietBtn : primaryBtn}>
                {addrOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
                {addrOpen ? "Cancel" : "Add address"}
              </button>
            </div>
            <p className="mt-1 text-sm" style={{ color: brand.neutralColor }}>We post within the United Kingdom only, so every address is a UK one.</p>

            {flash && (
              <p className="ps-rise mt-4 flex items-center gap-2 p-3 text-sm font-semibold" role="status" style={{ backgroundColor: tint(brand.primaryColor, 10), color: shade(brand.primaryColor, 85), borderRadius: brand.radius }}>
                <CheckCircle className="h-4 w-4" aria-hidden="true" /> {flash}
              </p>
            )}

            {addrOpen && (
              <form className="ps-rise mt-4 p-5" style={card} onSubmit={addAddress} noValidate>
                <h3 className="text-base font-bold" style={{ fontFamily: brand.fontHeading, color: shade(brand.primaryColor, 88) }}>New delivery address</h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="a-name" className={labelCls} style={{ color: shade(brand.neutralColor, 70) }}>Recipient name</label>
                    <input id="a-name" className="ps-focus" style={inputStyle(!!addrErr.recipient_name)} value={addrForm.recipient_name} onChange={(e) => setAddrForm({ ...addrForm, recipient_name: e.target.value })} />
                    {addrErr.recipient_name && <FieldError>{addrErr.recipient_name}</FieldError>}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="a-l1" className={labelCls} style={{ color: shade(brand.neutralColor, 70) }}>Address line 1</label>
                    <input id="a-l1" className="ps-focus" style={inputStyle(!!addrErr.line1)} value={addrForm.line1} onChange={(e) => setAddrForm({ ...addrForm, line1: e.target.value })} />
                    {addrErr.line1 && <FieldError>{addrErr.line1}</FieldError>}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="a-l2" className={labelCls} style={{ color: shade(brand.neutralColor, 70) }}>Address line 2 <span className="font-normal">(optional)</span></label>
                    <input id="a-l2" className="ps-focus" style={inputStyle(false)} value={addrForm.line2} onChange={(e) => setAddrForm({ ...addrForm, line2: e.target.value })} />
                  </div>
                  <div>
                    <label htmlFor="a-city" className={labelCls} style={{ color: shade(brand.neutralColor, 70) }}>Town or city</label>
                    <input id="a-city" className="ps-focus" style={inputStyle(!!addrErr.city)} value={addrForm.city} onChange={(e) => setAddrForm({ ...addrForm, city: e.target.value })} />
                    {addrErr.city && <FieldError>{addrErr.city}</FieldError>}
                  </div>
                  <div>
                    <label htmlFor="a-pc" className={labelCls} style={{ color: shade(brand.neutralColor, 70) }}>Postcode</label>
                    <input id="a-pc" className="ps-focus" style={{ ...inputStyle(!!addrErr.postcode), fontVariantNumeric: "tabular-nums" }} value={addrForm.postcode} onChange={(e) => setAddrForm({ ...addrForm, postcode: e.target.value })} />
                    {addrErr.postcode && <FieldError>{addrErr.postcode}</FieldError>}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="a-country" className={labelCls} style={{ color: shade(brand.neutralColor, 70) }}>Country</label>
                    <input id="a-country" className="ps-focus" value="United Kingdom" readOnly aria-describedby="a-country-hint" style={{ ...inputStyle(false), backgroundColor: tint(brand.neutralColor, 8), color: brand.neutralColor }} />
                    <p id="a-country-hint" className="mt-1.5 text-xs" style={{ color: brand.neutralColor }}>Domestic delivery only — we don't post overseas yet.</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2.5">
                  <input id="a-default" type="checkbox" className="ps-focus h-5 w-5" style={{ accentColor: brand.primaryColor }} checked={addrForm.is_default} onChange={(e) => setAddrForm({ ...addrForm, is_default: e.target.checked })} />
                  <label htmlFor="a-default" className="text-sm font-semibold" style={{ color: shade(brand.neutralColor, 75) }}>Use this as my default at checkout</label>
                </div>
                <button type="submit" className="ps-focus ps-press mt-5 w-full py-3 text-base font-bold sm:w-auto sm:px-6" style={primaryBtn}>Save address</button>
              </form>
            )}

            {addresses.length === 0 && !addrOpen && (
              <div className="ps-rise mt-4 px-6 py-12 text-center" style={card}>
                <div className="mx-auto flex h-14 w-14 items-center justify-center" style={{ backgroundColor: tint(brand.primaryColor, 12), borderRadius: 999 }}>
                  <User className="h-6 w-6" aria-hidden="true" style={{ color: shade(brand.primaryColor, 82) }} />
                </div>
                <h3 className="mt-4 text-lg font-bold" style={{ fontFamily: brand.fontHeading, color: shade(brand.primaryColor, 88) }}>No addresses saved</h3>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed" style={{ color: brand.neutralColor }}>
                  Save one now, or tick “save this address” the next time you check out — then it's one tap instead of six fields.
                </p>
                <button onClick={() => setAddrOpen(true)} className="ps-focus ps-press mt-5 px-5 py-3 text-sm font-bold" style={primaryBtn}>Add your first address</button>
              </div>
            )}

            {addresses.length > 0 && (
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {addresses.map((a, i) => (
                  <li key={a.id} className="ps-rise flex flex-col p-4" style={{ ...card, animationDelay: `${i * 40}ms`, borderColor: a.is_default ? tint(brand.primaryColor, 45) : tint(brand.neutralColor, 20) }}>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-extrabold" style={{ color: shade(brand.primaryColor, 88) }}>{a.recipient_name}</h3>
                      {a.is_default && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[0.68rem] font-bold uppercase tracking-wide" style={{ backgroundColor: tint(brand.primaryColor, 13), color: shade(brand.primaryColor, 84), borderRadius: 999 }}>
                          <Check className="h-3 w-3" aria-hidden="true" /> Default
                        </span>
                      )}
                    </div>
                    <address className="mt-2 flex-1 text-sm not-italic leading-relaxed" style={{ color: shade(brand.neutralColor, 70) }}>
                      {a.line1}<br />
                      {a.line2 && <>{a.line2}<br /></>}
                      {a.city}<br />
                      <span style={{ fontVariantNumeric: "tabular-nums" }}>{a.postcode}</span>, {a.country}
                    </address>
                    <div className="mt-4 flex items-center gap-2">
                      {!a.is_default && (
                        <button onClick={() => makeDefault(a.id)} className="ps-focus ps-press px-3 py-2 text-xs font-bold" style={quietBtn}>Make default</button>
                      )}
                      <button
                        onClick={() => removeAddress(a.id)}
                        aria-label={`Delete address for ${a.recipient_name}, ${a.postcode}`}
                        className="ps-focus ps-press ml-auto inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold"
                        style={{ color: shade(brand.accentColor, 72), backgroundColor: tint(brand.accentColor, 9), borderRadius: brand.radius }}
                      >
                        <Trash className="h-3.5 w-3.5" aria-hidden="true" /> Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <p className="mt-6 text-sm" style={{ color: brand.neutralColor }}>
              Addresses are only used for posting your parcels.{" "}
              <button onClick={() => navigate("cart-checkout")} className="ps-focus font-bold underline underline-offset-4" style={{ color: shade(brand.primaryColor, 85) }}>
                Go to your cart
              </button>
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
