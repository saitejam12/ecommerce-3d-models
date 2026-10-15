// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

const { Button, Card, CardHeader, CardContent, CardFooter, Input, Label, Table, THead, TBody, TR, TH, TD } = UI;
const { Search, Check, X, ChevronRight, User, Settings, FileText, Package, Clock, Edit, Filter, ArrowLeft, AlertCircle, CheckCircle } = Icons;

const SHOP = { name: "Pocket Shelf", domain: "pocketshelf.co.uk" };
const TAX_RATE = 0.2;
const STAFF = { name: "Mara Quill", email: "mara@pocketshelf.co.uk", role: "Shop owner" };

const money = (n) => "£" + Number(n).toFixed(2);

const stamp = (mins) => {
  const total = 11 * 60 + 4 + mins;
  const h = Math.floor(total / 60) % 24;
  const m = total % 60;
  return `15 Oct 2026, ${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};

const priced = (o) => {
  const goods = o.items.reduce((s, i) => s + i.unit_price * i.quantity, 0);
  const goods_subtotal = Math.round(goods * 100) / 100;
  const tax_amount = Math.round((goods_subtotal + o.postage_amount) * TAX_RATE * 100) / 100;
  const total = Math.round((goods_subtotal + o.postage_amount + tax_amount) * 100) / 100;
  return {
    ...o,
    tax_rate: TAX_RATE,
    goods_subtotal,
    tax_amount,
    total,
    refunded_amount: o.refunded_at ? total : 0,
    items: o.items.map((i) => ({ ...i, line_total: Math.round(i.unit_price * i.quantity * 100) / 100 })),
  };
};

const SEED = [
  {
    id: 163,
    reference: "PS-2610-0163",
    placed: "15 Oct 2026, 09:12",
    sort: 20261015.0912,
    email: "noor.bashir@gmail.com",
    customer_name: "Noor Bashir",
    account: true,
    status: "paid",
    postage_option_name: "Tracked 24",
    postage_amount: 4.5,
    card: "Visa ·· 4242",
    stripe_payment_intent_id: "pi_3QdLm8Hk2Rb7xT",
    tracking_number: "",
    delivery_address: { recipient_name: "Noor Bashir", line1: "Flat 6, 212 Dalry Road", line2: "", city: "Edinburgh", postcode: "EH11 2JG", country: "United Kingdom" },
    items: [
      { id: 1, product_name: "Mimic Chest Dice Box", variant_options: "Walnut brown · 70mm · Matte", unit_price: 18.0, quantity: 1, lead_time: "" },
      { id: 2, product_name: "Tiny Mushroom Lamp Shade", variant_options: "Blush pink · 90mm", unit_price: 6.5, quantity: 2, lead_time: "" },
    ],
    emails: [{ id: "e1", email_type: "Order confirmation", recipient: "noor.bashir@gmail.com", status: "sent", sent_at: "15 Oct 2026, 09:12", error: "" }],
    history: [{ status: "paid", changed_by: "Stripe webhook", changed_at: "15 Oct 2026, 09:12" }],
  },
  {
    id: 162,
    reference: "PS-2610-0162",
    placed: "15 Oct 2026, 08:40",
    sort: 20261015.084,
    email: "t.whitlock@fastmail.com",
    customer_name: "Tom Whitlock",
    account: false,
    status: "paid",
    postage_option_name: "Standard (2–3 days)",
    postage_amount: 2.95,
    card: "Apple Pay ·· 8812",
    stripe_payment_intent_id: "pi_3QdK9pHk2Rb4wQ",
    tracking_number: "",
    delivery_address: { recipient_name: "Tom Whitlock", line1: "14 Ashgrove Terrace", line2: "Bishopston", city: "Bristol", postcode: "BS7 8LN", country: "United Kingdom" },
    items: [{ id: 3, product_name: "Cable Cactus Organiser", variant_options: "Sage green · Standard · Satin", unit_price: 14.0, quantity: 1, lead_time: "" }],
    emails: [
      {
        id: "e2",
        email_type: "Order confirmation",
        recipient: "t.whitlock@fastmail.com",
        status: "failed",
        sent_at: "15 Oct 2026, 08:41",
        error: "Resend returned 422 — sender address orders@pocketshelf.co.uk is not verified on this domain.",
      },
    ],
    history: [{ status: "paid", changed_by: "Stripe webhook", changed_at: "15 Oct 2026, 08:40" }],
  },
  {
    id: 161,
    reference: "PS-2610-0161",
    placed: "14 Oct 2026, 19:58",
    sort: 20261014.1958,
    email: "lena.koszyk@outlook.com",
    customer_name: "Lena Koszyk",
    account: true,
    status: "printing",
    postage_option_name: "Tracked 24",
    postage_amount: 4.5,
    card: "Mastercard ·· 7731",
    stripe_payment_intent_id: "pi_3QdFr2Hk2Rb1mA",
    tracking_number: "",
    delivery_address: { recipient_name: "Lena Koszyk", line1: "9 Bramble Court", line2: "", city: "Leeds", postcode: "LS6 4QH", country: "United Kingdom" },
    items: [
      { id: 4, product_name: "Articulated Dragon", variant_options: "Midnight blue · 180mm · Matte", unit_price: 34.0, quantity: 1, lead_time: "3–5 working days to print" },
      { id: 5, product_name: "Dragon Egg Stand", variant_options: "Natural · 60mm", unit_price: 9.0, quantity: 1, lead_time: "" },
    ],
    emails: [{ id: "e3", email_type: "Order confirmation", recipient: "lena.koszyk@outlook.com", status: "sent", sent_at: "14 Oct 2026, 19:58", error: "" }],
    history: [
      { status: "paid", changed_by: "Stripe webhook", changed_at: "14 Oct 2026, 19:58" },
      { status: "printing", changed_by: "Mara Quill", changed_at: "15 Oct 2026, 08:05" },
    ],
  },
  {
    id: 160,
    reference: "PS-2610-0160",
    placed: "14 Oct 2026, 17:21",
    sort: 20261014.1721,
    email: "sam.okonkwo@proton.me",
    customer_name: "Sam Okonkwo",
    account: false,
    status: "printing",
    postage_option_name: "Standard (2–3 days)",
    postage_amount: 2.95,
    card: "Visa ·· 0196",
    stripe_payment_intent_id: "pi_3QdDa7Hk2Rb0kL",
    tracking_number: "",
    delivery_address: { recipient_name: "Sam Okonkwo", line1: "Flat 2, 88 Mabgate", line2: "", city: "Leeds", postcode: "LS9 7DZ", country: "United Kingdom" },
    items: [{ id: 6, product_name: "Low-Poly Fox Planter", variant_options: "Burnt orange · 120mm · Matte", unit_price: 19.5, quantity: 1, lead_time: "" }],
    emails: [{ id: "e4", email_type: "Order confirmation", recipient: "sam.okonkwo@proton.me", status: "sent", sent_at: "14 Oct 2026, 17:22", error: "" }],
    history: [
      { status: "paid", changed_by: "Stripe webhook", changed_at: "14 Oct 2026, 17:21" },
      { status: "printing", changed_by: "Mara Quill", changed_at: "15 Oct 2026, 08:11" },
    ],
  },
  {
    id: 159,
    reference: "PS-2610-0159",
    placed: "14 Oct 2026, 12:05",
    sort: 20261014.1205,
    email: "hannahdraws@gmail.com",
    customer_name: "Hannah Pike",
    account: true,
    status: "packed",
    postage_option_name: "Standard — free over £40",
    postage_amount: 0,
    card: "Visa ·· 3390",
    stripe_payment_intent_id: "pi_3QdB4xHk2Rb9jE",
    tracking_number: "",
    delivery_address: { recipient_name: "Hannah Pike", line1: "27 Weston Lane", line2: "Clifton", city: "Bristol", postcode: "BS8 1RD", country: "United Kingdom" },
    items: [
      { id: 7, product_name: "Sticker-Shelf Desk Tidy", variant_options: "Lilac · Large · Satin", unit_price: 24.0, quantity: 1, lead_time: "" },
      { id: 8, product_name: "Keycap Cat Set (4)", variant_options: "Cream · MX stem", unit_price: 18.0, quantity: 1, lead_time: "" },
    ],
    emails: [{ id: "e5", email_type: "Order confirmation", recipient: "hannahdraws@gmail.com", status: "sent", sent_at: "14 Oct 2026, 12:06", error: "" }],
    history: [
      { status: "paid", changed_by: "Stripe webhook", changed_at: "14 Oct 2026, 12:05" },
      { status: "printing", changed_by: "Mara Quill", changed_at: "14 Oct 2026, 14:40" },
      { status: "packed", changed_by: "Mara Quill", changed_at: "15 Oct 2026, 09:55" },
    ],
  },
  {
    id: 158,
    reference: "PS-2610-0158",
    placed: "13 Oct 2026, 20:44",
    sort: 20261013.2044,
    email: "rfernandes@yahoo.co.uk",
    customer_name: "Rita Fernandes",
    account: false,
    status: "packed",
    postage_option_name: "Standard (2–3 days)",
    postage_amount: 2.95,
    card: "Visa ·· 5521",
    stripe_payment_intent_id: "pi_3Qd8n1Hk2Rb6pV",
    tracking_number: "",
    delivery_address: { recipient_name: "Rita Fernandes", line1: "3 Oakhill Cottages", line2: "Pensford", city: "Bristol", postcode: "BS39 4JQ", country: "United Kingdom" },
    items: [{ id: 9, product_name: "Pocket Axolotl Charm", variant_options: "Glow blue · 35mm", unit_price: 4.5, quantity: 3, lead_time: "" }],
    emails: [{ id: "e6", email_type: "Order confirmation", recipient: "rfernandes@yahoo.co.uk", status: "sent", sent_at: "13 Oct 2026, 20:45", error: "" }],
    history: [
      { status: "paid", changed_by: "Stripe webhook", changed_at: "13 Oct 2026, 20:44" },
      { status: "printing", changed_by: "Mara Quill", changed_at: "14 Oct 2026, 09:30" },
      { status: "packed", changed_by: "Mara Quill", changed_at: "14 Oct 2026, 18:02" },
    ],
  },
  {
    id: 157,
    reference: "PS-2610-0157",
    placed: "13 Oct 2026, 10:02",
    sort: 20261013.1002,
    email: "pip@thistledown.studio",
    customer_name: "Pip Marlowe",
    account: true,
    status: "shipped",
    postage_option_name: "Tracked 24",
    postage_amount: 4.5,
    card: "Amex ·· 1008",
    stripe_payment_intent_id: "pi_3Qd5c6Hk2Rb3nS",
    tracking_number: "AB 1234 5678 9GB",
    delivery_address: { recipient_name: "Pip Marlowe", line1: "Thistledown Studio", line2: "Unit 4, The Maltings", city: "Norwich", postcode: "NR3 1SQ", country: "United Kingdom" },
    items: [
      { id: 10, product_name: "Hex Terrain Tiles (set of 6)", variant_options: "Stone grey · 50mm · Textured", unit_price: 22.0, quantity: 2, lead_time: "" },
      { id: 11, product_name: "Articulated Dragon", variant_options: "Ember red · 180mm · Matte", unit_price: 34.0, quantity: 1, lead_time: "3–5 working days to print" },
    ],
    emails: [
      { id: "e7", email_type: "Order confirmation", recipient: "pip@thistledown.studio", status: "sent", sent_at: "13 Oct 2026, 10:03", error: "" },
      { id: "e8", email_type: "Shipped with tracking", recipient: "pip@thistledown.studio", status: "sent", sent_at: "14 Oct 2026, 16:48", error: "" },
    ],
    history: [
      { status: "paid", changed_by: "Stripe webhook", changed_at: "13 Oct 2026, 10:02" },
      { status: "printing", changed_by: "Mara Quill", changed_at: "13 Oct 2026, 11:15" },
      { status: "packed", changed_by: "Mara Quill", changed_at: "14 Oct 2026, 13:20" },
      { status: "shipped", changed_by: "Mara Quill", changed_at: "14 Oct 2026, 16:48" },
    ],
  },
  {
    id: 156,
    reference: "PS-2610-0156",
    placed: "12 Oct 2026, 16:39",
    sort: 20261012.1639,
    email: "d.mcallister@gmail.com",
    customer_name: "Dougie McAllister",
    account: false,
    status: "shipped",
    postage_option_name: "Standard (2–3 days)",
    postage_amount: 2.95,
    card: "Visa ·· 7714",
    stripe_payment_intent_id: "pi_3Qd1v4Hk2Rb2hC",
    tracking_number: "TD9920146GB",
    delivery_address: { recipient_name: "Dougie McAllister", line1: "51 Lochend Drive", line2: "", city: "Glasgow", postcode: "G61 1DT", country: "United Kingdom" },
    items: [{ id: 12, product_name: "Moon Lamp Wall Bracket", variant_options: "White · 140mm", unit_price: 11.0, quantity: 1, lead_time: "" }],
    emails: [
      { id: "e9", email_type: "Order confirmation", recipient: "d.mcallister@gmail.com", status: "sent", sent_at: "12 Oct 2026, 16:40", error: "" },
      { id: "e10", email_type: "Shipped with tracking", recipient: "d.mcallister@gmail.com", status: "sent", sent_at: "13 Oct 2026, 17:30", error: "" },
    ],
    history: [
      { status: "paid", changed_by: "Stripe webhook", changed_at: "12 Oct 2026, 16:39" },
      { status: "printing", changed_by: "Mara Quill", changed_at: "12 Oct 2026, 18:05" },
      { status: "packed", changed_by: "Mara Quill", changed_at: "13 Oct 2026, 12:10" },
      { status: "shipped", changed_by: "Mara Quill", changed_at: "13 Oct 2026, 17:30" },
    ],
  },
  {
    id: 155,
    reference: "PS-2610-0155",
    placed: "12 Oct 2026, 09:27",
    sort: 20261012.0927,
    email: "yusuf.ali@hotmail.com",
    customer_name: "Yusuf Ali",
    account: true,
    status: "refunded",
    postage_option_name: "Standard (2–3 days)",
    postage_amount: 2.95,
    card: "Mastercard ·· 6690",
    stripe_payment_intent_id: "pi_3Qcz8bHk2Rb5dF",
    tracking_number: "",
    refunded_at: "14 Oct 2026, 16:20",
    refund_note: "Print failed twice on the tower spiral — refunded in full.",
    delivery_address: { recipient_name: "Yusuf Ali", line1: "118 Narborough Road", line2: "", city: "Leicester", postcode: "LE3 0BT", country: "United Kingdom" },
    items: [{ id: 13, product_name: "Bramble Dice Tower", variant_options: "Forest green · 200mm · Textured", unit_price: 27.0, quantity: 1, lead_time: "5–7 working days to print" }],
    emails: [
      { id: "e11", email_type: "Order confirmation", recipient: "yusuf.ali@hotmail.com", status: "sent", sent_at: "12 Oct 2026, 09:28", error: "" },
      { id: "e12", email_type: "Refund issued", recipient: "yusuf.ali@hotmail.com", status: "sent", sent_at: "14 Oct 2026, 16:21", error: "" },
    ],
    history: [
      { status: "paid", changed_by: "Stripe webhook", changed_at: "12 Oct 2026, 09:27" },
      { status: "printing", changed_by: "Mara Quill", changed_at: "13 Oct 2026, 08:40" },
      { status: "refunded", changed_by: "Mara Quill", changed_at: "14 Oct 2026, 16:20" },
    ],
  },
  {
    id: 154,
    reference: "PS-2610-0154",
    placed: "11 Oct 2026, 21:13",
    sort: 20261011.2113,
    email: "claire.benn@gmail.com",
    customer_name: "Claire Benn",
    account: false,
    status: "shipped",
    postage_option_name: "Tracked 24",
    postage_amount: 4.5,
    card: "Visa ·· 2210",
    stripe_payment_intent_id: "pi_3QcwL9Hk2Rb8rN",
    tracking_number: "AB 9981 2230 4GB",
    delivery_address: { recipient_name: "Claire Benn", line1: "6 Hillside Mews", line2: "", city: "Sheffield", postcode: "S7 1SR", country: "United Kingdom" },
    items: [
      { id: 14, product_name: "Snail Planter Trio", variant_options: "Speckled cream · 80mm", unit_price: 21.0, quantity: 1, lead_time: "" },
      { id: 15, product_name: "Tiny Mushroom Lamp Shade", variant_options: "Butter yellow · 90mm", unit_price: 6.5, quantity: 2, lead_time: "" },
    ],
    emails: [
      { id: "e13", email_type: "Order confirmation", recipient: "claire.benn@gmail.com", status: "sent", sent_at: "11 Oct 2026, 21:14", error: "" },
      { id: "e14", email_type: "Shipped with tracking", recipient: "claire.benn@gmail.com", status: "sent", sent_at: "13 Oct 2026, 09:02", error: "" },
    ],
    history: [
      { status: "paid", changed_by: "Stripe webhook", changed_at: "11 Oct 2026, 21:13" },
      { status: "printing", changed_by: "Mara Quill", changed_at: "12 Oct 2026, 08:30" },
      { status: "packed", changed_by: "Mara Quill", changed_at: "12 Oct 2026, 19:45" },
      { status: "shipped", changed_by: "Mara Quill", changed_at: "13 Oct 2026, 09:02" },
    ],
  },
  {
    id: 153,
    reference: "PS-2610-0153",
    placed: "11 Oct 2026, 14:55",
    sort: 20261011.1455,
    email: "owen.tran@gmail.com",
    customer_name: "Owen Tran",
    account: false,
    status: "paid",
    postage_option_name: "Standard (2–3 days)",
    postage_amount: 2.95,
    card: "Google Pay ·· 4417",
    stripe_payment_intent_id: "pi_3QcuH3Hk2Rb7gB",
    tracking_number: "",
    delivery_address: { recipient_name: "Owen Tran", line1: "Room 412, Kestrel House", line2: "Park Lane", city: "Cardiff", postcode: "CF10 3DQ", country: "United Kingdom" },
    items: [{ id: 16, product_name: "Pocket Axolotl Charm", variant_options: "Glow green · 35mm", unit_price: 4.5, quantity: 1, lead_time: "" }],
    emails: [{ id: "e15", email_type: "Order confirmation", recipient: "owen.tran@gmail.com", status: "sent", sent_at: "11 Oct 2026, 14:56", error: "" }],
    history: [{ status: "paid", changed_by: "Stripe webhook", changed_at: "11 Oct 2026, 14:55" }],
  },
  {
    id: 152,
    reference: "PS-2610-0152",
    placed: "10 Oct 2026, 11:08",
    sort: 20261010.1108,
    email: "marguerite.d@gmail.com",
    customer_name: "Marguerite Dunne",
    account: true,
    status: "printing",
    postage_option_name: "Tracked 24",
    postage_amount: 4.5,
    card: "Visa ·· 9043",
    stripe_payment_intent_id: "pi_3QcrW5Hk2Rb4yU",
    tracking_number: "",
    delivery_address: { recipient_name: "Marguerite Dunne", line1: "The Old Bakery", line2: "Fore Street", city: "Totnes", postcode: "TQ9 5HN", country: "United Kingdom" },
    items: [
      { id: 17, product_name: "Castle Gatehouse Kit", variant_options: "Stone grey · 28mm scale · Textured", unit_price: 48.0, quantity: 1, lead_time: "5–7 working days to print" },
      { id: 18, product_name: "Banner Flag Pack", variant_options: "Mixed · 28mm scale", unit_price: 7.5, quantity: 1, lead_time: "" },
    ],
    emails: [{ id: "e16", email_type: "Order confirmation", recipient: "marguerite.d@gmail.com", status: "sent", sent_at: "10 Oct 2026, 11:09", error: "" }],
    history: [
      { status: "paid", changed_by: "Stripe webhook", changed_at: "10 Oct 2026, 11:08" },
      { status: "printing", changed_by: "Mara Quill", changed_at: "11 Oct 2026, 09:12" },
    ],
  },
];

const ORDERS = SEED.map(priced).sort((a, b) => b.sort - a.sort);

const STATUS_ORDER = ["paid", "printing", "packed", "shipped", "refunded"];
const NEXT = { paid: "printing", printing: "packed", packed: "shipped" };
const NEXT_LABEL = { printing: "Start printing", packed: "Mark packed", shipped: "Save tracking & mark shipped" };
const STATUS_LABEL = { paid: "Paid", printing: "Printing", packed: "Packed", shipped: "Shipped", refunded: "Refunded" };

export default function Screen() {
  const navigate = useNavigate();
  const P = brand.primaryColor;
  const A = brand.accentColor;
  const N = brand.neutralColor;
  const ink = `color-mix(in srgb, ${N} 38%, black)`;
  const inkSoft = N;
  const line = `color-mix(in srgb, ${N} 22%, white)`;
  const tintP = (p) => `color-mix(in srgb, ${P} ${p}%, white)`;
  const tintA = (p) => `color-mix(in srgb, ${A} ${p}%, white)`;
  const tintN = (p) => `color-mix(in srgb, ${N} ${p}%, white)`;
  const accentInk = `color-mix(in srgb, ${A} 52%, black)`;

  const [signedIn, setSignedIn] = React.useState(true);
  const [loginEmail, setLoginEmail] = React.useState(STAFF.email);
  const [loginPw, setLoginPw] = React.useState("");
  const [loginError, setLoginError] = React.useState(null);

  const [orders, setOrders] = React.useState(ORDERS);
  const [query, setQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [problemsOnly, setProblemsOnly] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(163);
  const [sync, setSync] = React.useState("stale");
  const [flash, setFlash] = React.useState(null);
  const [tracking, setTracking] = React.useState("");
  const [trackingError, setTrackingError] = React.useState("");
  const [editingTracking, setEditingTracking] = React.useState(false);
  const [refundOpen, setRefundOpen] = React.useState(false);

  const timers = React.useRef([]);
  const clock = React.useRef(0);
  React.useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));
  const bump = () => {
    clock.current += 3;
    return stamp(clock.current);
  };

  const selected = orders.find((o) => o.id === selectedId) || null;

  React.useEffect(() => {
    setTracking(selected ? selected.tracking_number : "");
    setTrackingError("");
    setEditingTracking(false);
    setRefundOpen(false);
  }, [selectedId]);

  const searched = React.useMemo(() => {
    const q = query.trim().toLowerCase().replace(/\s+/g, "");
    if (!q) return orders;
    return orders.filter((o) => {
      const hay = [o.reference, o.email, o.customer_name, ...o.items.map((i) => i.product_name)].join(" ").toLowerCase().replace(/\s+/g, "");
      return hay.includes(q);
    });
  }, [orders, query]);

  const counts = React.useMemo(() => {
    const c = { all: searched.length };
    STATUS_ORDER.forEach((s) => (c[s] = searched.filter((o) => o.status === s).length));
    return c;
  }, [searched]);

  const problemCount = orders.filter((o) => o.emails.some((e) => e.status === "failed")).length;

  const visible = searched.filter(
    (o) => (statusFilter === "all" || o.status === statusFilter) && (!problemsOnly || o.emails.some((e) => e.status === "failed"))
  );

  const toPrint = orders.filter((o) => o.status === "paid").length;
  const toPost = orders.filter((o) => o.status === "packed").length;

  const patch = (id, fn) => setOrders((prev) => prev.map((o) => (o.id === id ? fn(o) : o)));

  const advance = (order) => {
    const next = NEXT[order.status];
    if (!next) return;
    if (next === "shipped" && tracking.trim().length < 6) {
      setTrackingError("Pop the tracking number in first — it goes straight into the customer's shipped email.");
      return;
    }
    const at = bump();
    patch(order.id, (o) => {
      const emails = o.emails.slice();
      if (next === "shipped") {
        emails.push({ id: "e" + o.id + "s", email_type: "Shipped with tracking", recipient: o.email, status: "sent", sent_at: at, error: "" });
      }
      return {
        ...o,
        status: next,
        tracking_number: next === "shipped" ? tracking.trim() : o.tracking_number,
        history: o.history.concat({ status: next, changed_by: STAFF.name, changed_at: at }),
        emails,
      };
    });
    setTrackingError("");
    setFlash({
      tone: "good",
      text:
        next === "shipped"
          ? `${order.reference} is away. Tracking ${tracking.trim()} emailed to ${order.email}.`
          : next === "printing"
          ? `${order.reference} is on the printer. It'll sit in Printing until you pack it.`
          : `${order.reference} packed and waiting for the post run.`,
    });
  };

  const saveTracking = (order) => {
    if (tracking.trim().length < 6) {
      setTrackingError("That doesn't look like a tracking number — check the digits on the label.");
      return;
    }
    const at = bump();
    patch(order.id, (o) => ({ ...o, tracking_number: tracking.trim() }));
    setEditingTracking(false);
    setTrackingError("");
    setFlash({ tone: "good", text: `Tracking updated to ${tracking.trim()} at ${at.split(", ")[1]}. Resend the shipped email if the customer needs it.` });
  };

  const resend = (order, emailId) => {
    patch(order.id, (o) => ({ ...o, emails: o.emails.map((e) => (e.id === emailId ? { ...e, status: "sending" } : e)) }));
    const at = bump();
    later(() => {
      patch(order.id, (o) => ({ ...o, emails: o.emails.map((e) => (e.id === emailId ? { ...e, status: "sent", sent_at: at, error: "" } : e)) }));
      setFlash({ tone: "good", text: `Email sent to ${order.email}. The send log on this order is clear again.` });
    }, 900);
  };

  const doRefund = (order) => {
    const at = bump();
    patch(order.id, (o) => ({
      ...o,
      status: "refunded",
      refunded_at: at,
      refunded_amount: o.total,
      refund_note: "Refunded in full from the admin.",
      history: o.history.concat({ status: "refunded", changed_by: STAFF.name, changed_at: at }),
      emails: o.emails.concat({ id: "e" + o.id + "r", email_type: "Refund issued", recipient: o.email, status: "sent", sent_at: at, error: "" }),
    }));
    setRefundOpen(false);
    setFlash({ tone: "good", text: `${money(order.total)} refunded to ${order.card}. ${order.email} has been told.` });
  };

  const refresh = () => {
    setSync("syncing");
    later(() => setSync("fresh"), 850);
  };

  const clearFilters = () => {
    setQuery("");
    setStatusFilter("all");
    setProblemsOnly(false);
  };

  const submitLogin = (e) => {
    e.preventDefault();
    if (!loginEmail.trim()) return setLoginError({ kind: "field", text: "Your staff email address goes here." });
    if (!loginPw) return setLoginError({ kind: "field", text: "Enter your password to open the queue." });
    if (!loginEmail.trim().toLowerCase().endsWith("@" + SHOP.domain)) return setLoginError({ kind: "denied" });
    if (loginPw.length < 6) return setLoginError({ kind: "creds" });
    setLoginError(null);
    setLoginPw("");
    setSignedIn(true);
    setFlash({ tone: "good", text: `Welcome back, ${STAFF.name.split(" ")[0]}. ${toPrint} orders are waiting for a printer.` });
  };

  const pill = (status, big) => {
    const map = {
      paid: { bg: tintA(16), fg: accentInk, bd: tintA(34), Icon: Icons.AlertCircle },
      printing: { bg: tintP(12), fg: P, bd: tintP(28), Icon: Icons.Clock },
      packed: { bg: "#ffffff", fg: P, bd: tintP(42), Icon: Icons.Package },
      shipped: { bg: tintN(14), fg: ink, bd: tintN(28), Icon: Icons.Check },
      refunded: { bg: tintN(10), fg: inkSoft, bd: tintN(30), Icon: Icons.ArrowLeft },
    }[status];
    const Ico = map.Icon;
    return (
      <span
        className={`inline-flex items-center gap-1.5 whitespace-nowrap font-semibold ${big ? "px-3 py-1.5 text-sm" : "px-2.5 py-1 text-xs"}`}
        style={{ backgroundColor: map.bg, color: map.fg, border: `1px solid ${map.bd}`, borderRadius: "999px" }}
      >
        <Ico className={big ? "h-4 w-4" : "h-3.5 w-3.5"} aria-hidden="true" />
        {STATUS_LABEL[status]}
      </span>
    );
  };

  const css = `
    .ps-focus:focus-visible { outline: 2px solid ${P}; outline-offset: 2px; border-radius: ${brand.radius}; }
    @keyframes ps-rise { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
    @keyframes ps-flash { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }
    @keyframes ps-breathe { 0%,100% { opacity: .55; } 50% { opacity: 1; } }
    .ps-rise { animation: ps-rise .22s ease-out both; }
    .ps-flashin { animation: ps-flash .2s ease-out both; }
    .ps-skel { animation: ps-breathe 1.1s ease-in-out infinite; }
    @media (prefers-reduced-motion: reduce) {
      .ps-rise, .ps-flashin, .ps-skel { animation: none !important; }
    }
  `;

  const shell = (children) => (
    <div className="min-h-full px-4 py-6 sm:px-6 lg:px-8" style={{ backgroundColor: brand.backgroundColor, fontFamily: brand.fontBody, color: ink }}>
      <style>{css}</style>
      {children}
    </div>
  );

  /* ---------- signed out / sign-in ---------- */
  if (!signedIn) {
    return shell(
      <div className="mx-auto max-w-md pt-6 sm:pt-16">
        <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: P }}>
          {SHOP.name} admin
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight" style={{ fontFamily: brand.fontHeading }}>
          Sign in to the order queue
        </h1>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: inkSoft }}>
          Staff only. Orders, customer addresses and the catalogue stay hidden until you're signed in.
        </p>

        <Card className="mt-6 border" style={{ backgroundColor: "#ffffff", borderColor: line, borderRadius: brand.radius }}>
          <CardContent className="p-5 sm:p-6">
            <form onSubmit={submitLogin} noValidate>
              <div className="space-y-1.5">
                <Label htmlFor="staff-email" className="text-sm font-semibold">
                  Staff email
                </Label>
                <Input
                  id="staff-email"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="ps-focus w-full"
                  style={{ borderRadius: brand.radius }}
                  autoComplete="username"
                />
              </div>
              <div className="mt-4 space-y-1.5">
                <Label htmlFor="staff-pw" className="text-sm font-semibold">
                  Password
                </Label>
                <Input
                  id="staff-pw"
                  type="password"
                  value={loginPw}
                  onChange={(e) => setLoginPw(e.target.value)}
                  className="ps-focus w-full"
                  style={{ borderRadius: brand.radius }}
                  autoComplete="current-password"
                />
              </div>

              {loginError && loginError.kind === "field" && (
                <p className="ps-flashin mt-3 flex items-start gap-2 text-sm font-medium" style={{ color: accentInk }}>
                  <Icons.AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  {loginError.text}
                </p>
              )}
              {loginError && loginError.kind === "creds" && (
                <p className="ps-flashin mt-3 flex items-start gap-2 text-sm font-medium" style={{ color: accentInk }}>
                  <Icons.AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  That email and password don't match. Try again, or ask {STAFF.name} to reset it for you.
                </p>
              )}
              {loginError && loginError.kind === "denied" && (
                <div className="ps-flashin mt-4 p-4" style={{ backgroundColor: tintA(10), border: `1px solid ${tintA(32)}`, borderRadius: brand.radius }}>
                  <h2 className="flex items-center gap-2 text-sm font-bold" style={{ color: accentInk }}>
                    <Icons.AlertCircle className="h-4 w-4" aria-hidden="true" />
                    That's a shopper account, not a staff one
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed" style={{ color: ink }}>
                    A {SHOP.name} customer account doesn't open the admin. Ask {STAFF.name} ({STAFF.email}) to add a staff login for{" "}
                    <span className="font-semibold">{loginEmail}</span>, then sign in again here.
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate("account")}
                    className="ps-focus mt-3 inline-flex items-center gap-1 text-sm font-semibold underline underline-offset-4"
                    style={{ color: P }}
                  >
                    Go to my customer account instead
                    <Icons.ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              )}

              <Button
                type="submit"
                className="ps-focus mt-5 w-full py-3 text-base font-semibold"
                style={{ backgroundColor: P, color: "#ffffff", borderRadius: brand.radius }}
              >
                Sign in to the admin
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="mt-4 text-center text-xs" style={{ color: inkSoft }}>
          Shopping instead?{" "}
          <button onClick={() => navigate("catalogue")} className="ps-focus font-semibold underline underline-offset-4" style={{ color: P }}>
            Back to the shop
          </button>
        </p>
      </div>
    );
  }

  /* ---------- queue ---------- */
  const filterChip = (key, label, count) => {
    const on = statusFilter === key;
    return (
      <button
        key={key}
        type="button"
        aria-pressed={on}
        onClick={() => setStatusFilter(key)}
        className="ps-focus inline-flex items-center gap-2 px-3 py-1.5 text-sm font-semibold transition-colors"
        style={{
          borderRadius: "999px",
          backgroundColor: on ? P : "#ffffff",
          color: on ? "#ffffff" : ink,
          border: `1px solid ${on ? P : line}`,
        }}
      >
        {label}
        <span className="tabular-nums text-xs font-bold" style={{ color: on ? "#ffffff" : inkSoft, opacity: on ? 0.9 : 1 }}>
          {count}
        </span>
      </button>
    );
  };

  const emptyState = () => {
    if (orders.length === 0) {
      return (
        <div className="px-6 py-14 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center" style={{ backgroundColor: tintP(12), borderRadius: "999px" }}>
            <Icons.Package className="h-6 w-6" style={{ color: P }} aria-hidden="true" />
          </span>
          <h3 className="mt-4 text-base font-bold">No orders yet — the kiln's cold</h3>
          <p className="mx-auto mt-1.5 max-w-sm text-sm leading-relaxed" style={{ color: inkSoft }}>
            The moment someone checks out, their order lands here with the reference, what to print and where it's going.
          </p>
          <Button onClick={() => navigate("admin-shop-setup")} className="ps-focus mt-5" style={{ backgroundColor: P, color: "#ffffff", borderRadius: brand.radius }}>
            Check the catalogue is published
          </Button>
        </div>
      );
    }
    const searching = query.trim().length > 0 || problemsOnly;
    return (
      <div className="px-6 py-14 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center" style={{ backgroundColor: tintN(12), borderRadius: "999px" }}>
          {searching ? <Icons.Search className="h-6 w-6" style={{ color: inkSoft }} aria-hidden="true" /> : <Icons.Check className="h-6 w-6" style={{ color: inkSoft }} aria-hidden="true" />}
        </span>
        <h3 className="mt-4 text-base font-bold">
          {searching ? <>Nothing matches {query.trim() ? `“${query.trim()}”` : "that filter"}</> : <>Nothing is {STATUS_LABEL[statusFilter].toLowerCase()} right now</>}
        </h3>
        <p className="mx-auto mt-1.5 max-w-sm text-sm leading-relaxed" style={{ color: inkSoft }}>
          {searching
            ? "Search works on the full order reference or the customer's email address. Partial references are fine."
            : statusFilter === "paid"
            ? "Every paid order has been started. Nice work."
            : "Orders arrive here as you move them along the queue."}
        </p>
        <Button
          onClick={clearFilters}
          className="ps-focus mt-5"
          style={{ backgroundColor: "#ffffff", color: P, border: `1px solid ${tintP(40)}`, borderRadius: brand.radius }}
        >
          Clear search and filters
        </Button>
      </div>
    );
  };

  const detailEmpty = (
    <Card className="hidden border lg:block" style={{ backgroundColor: "#ffffff", borderColor: line, borderRadius: brand.radius }}>
      <CardContent className="px-8 py-16 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center" style={{ backgroundColor: tintP(12), borderRadius: "999px" }}>
          <Icons.FileText className="h-6 w-6" style={{ color: P }} aria-hidden="true" />
        </span>
        <h2 className="mt-4 text-base font-bold">Pick an order to work on</h2>
        <p className="mx-auto mt-1.5 max-w-xs text-sm leading-relaxed" style={{ color: inkSoft }}>
          Choose a reference on the left to see what to print, where it's going and what the customer paid.
        </p>
      </CardContent>
    </Card>
  );

  const renderDetail = (o) => {
    const isRefunded = o.status === "refunded";
    const next = NEXT[o.status];
    const leadTimes = o.items.filter((i) => i.lead_time);
    const failed = o.emails.filter((e) => e.status === "failed");

    return (
      <Card key={o.id} className="ps-rise border" style={{ backgroundColor: "#ffffff", borderColor: line, borderRadius: brand.radius }}>
        <CardHeader className="px-5 pb-0 pt-5 sm:px-6 sm:pt-6">
          <button
            type="button"
            onClick={() => setSelectedId(null)}
            className="ps-focus mb-3 inline-flex items-center gap-1.5 text-sm font-semibold lg:hidden"
            style={{ color: P }}
          >
            <Icons.ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to the queue
          </button>

          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold tracking-tight tabular-nums" style={{ fontFamily: brand.fontHeading }}>
                {o.reference}
              </h2>
              <p className="mt-1 text-sm" style={{ color: inkSoft }}>
                Placed {o.placed} · {o.items.reduce((s, i) => s + i.quantity, 0)} item
                {o.items.reduce((s, i) => s + i.quantity, 0) === 1 ? "" : "s"}
              </p>
            </div>
            <div className="text-right">
              {pill(o.status, true)}
              <p className="mt-2 text-xl font-bold tabular-nums">{money(o.total)}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-5 px-5 pb-6 pt-5 sm:px-6">
          {flash && (
            <div
              role="status"
              className="ps-flashin flex items-start gap-3 p-3"
              style={{ backgroundColor: tintP(9), border: `1px solid ${tintP(26)}`, borderRadius: brand.radius }}
            >
              <Icons.CheckCircle className="mt-0.5 h-4 w-4 shrink-0" style={{ color: P }} aria-hidden="true" />
              <p className="flex-1 text-sm font-medium leading-relaxed">{flash.text}</p>
              <button type="button" onClick={() => setFlash(null)} aria-label="Dismiss this message" className="ps-focus shrink-0 p-0.5">
                <Icons.X className="h-4 w-4" style={{ color: inkSoft }} aria-hidden="true" />
              </button>
            </div>
          )}

          {/* focal: next step */}
          <section
            aria-labelledby={`next-${o.id}`}
            className="p-4 sm:p-5"
            style={{
              backgroundColor: isRefunded ? tintN(8) : o.status === "shipped" ? tintN(8) : tintP(8),
              border: `1px solid ${isRefunded || o.status === "shipped" ? tintN(26) : tintP(24)}`,
              borderRadius: brand.radius,
            }}
          >
            <h3 id={`next-${o.id}`} className="text-xs font-bold uppercase tracking-[0.12em]" style={{ color: isRefunded || o.status === "shipped" ? inkSoft : P }}>
              {isRefunded ? "Closed" : o.status === "shipped" ? "Posted" : "Next step"}
            </h3>

            {isRefunded && (
              <p className="mt-2 text-sm leading-relaxed">
                Refunded {money(o.refunded_amount)} to {o.card} on {o.refunded_at}. {o.refund_note} Nothing left to do on this one.
              </p>
            )}

            {o.status === "shipped" && !editingTracking && (
              <div className="mt-2">
                <p className="text-sm leading-relaxed">
                  Out the door with <span className="font-semibold tabular-nums">{o.tracking_number}</span> on {o.history[o.history.length - 1].changed_at}.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button
                    onClick={() => {
                      setEditingTracking(true);
                      setTracking(o.tracking_number);
                    }}
                    className="ps-focus inline-flex items-center gap-1.5 text-sm font-semibold"
                    style={{ backgroundColor: "#ffffff", color: ink, border: `1px solid ${line}`, borderRadius: brand.radius }}
                  >
                    <Icons.Edit className="h-4 w-4" aria-hidden="true" />
                    Correct the tracking number
                  </Button>
                  <Button
                    onClick={() => resend(o, o.emails.filter((e) => e.email_type === "Shipped with tracking").slice(-1)[0].id)}
                    className="ps-focus text-sm font-semibold"
                    style={{ backgroundColor: "#ffffff", color: P, border: `1px solid ${tintP(40)}`, borderRadius: brand.radius }}
                  >
                    Resend shipped email
                  </Button>
                </div>
              </div>
            )}

            {(o.status === "packed" || (o.status === "shipped" && editingTracking)) && (
              <div className="mt-3">
                <p className="mb-3 text-sm leading-relaxed">
                  {o.status === "packed"
                    ? "Boxed and labelled. Type the tracking number off the label — it goes into the customer's email."
                    : "Fix the number below; the customer's order history updates straight away."}
                </p>
                <Label htmlFor={`trk-${o.id}`} className="text-sm font-semibold">
                  Tracking number
                </Label>
                <Input
                  id={`trk-${o.id}`}
                  value={tracking}
                  onChange={(e) => {
                    setTracking(e.target.value);
                    setTrackingError("");
                  }}
                  placeholder="AB 1234 5678 9GB"
                  aria-describedby={trackingError ? `trk-err-${o.id}` : undefined}
                  aria-invalid={trackingError ? "true" : undefined}
                  className="ps-focus mt-1.5 w-full tabular-nums"
                  style={{ borderRadius: brand.radius, backgroundColor: "#ffffff", borderColor: trackingError ? A : line }}
                />
                {trackingError && (
                  <p id={`trk-err-${o.id}`} className="ps-flashin mt-2 flex items-start gap-2 text-sm font-medium" style={{ color: accentInk }}>
                    <Icons.AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    {trackingError}
                  </p>
                )}
                <div className="mt-3 flex flex-wrap gap-2">
                  {o.status === "packed" ? (
                    <Button
                      onClick={() => advance(o)}
                      className="ps-focus px-5 py-3 text-base font-semibold"
                      style={{ backgroundColor: P, color: "#ffffff", borderRadius: brand.radius }}
                    >
                      {NEXT_LABEL.shipped}
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={() => saveTracking(o)}
                        className="ps-focus font-semibold"
                        style={{ backgroundColor: P, color: "#ffffff", borderRadius: brand.radius }}
                      >
                        Save tracking number
                      </Button>
                      <Button
                        onClick={() => {
                          setEditingTracking(false);
                          setTracking(o.tracking_number);
                          setTrackingError("");
                        }}
                        className="ps-focus font-semibold"
                        style={{ backgroundColor: "#ffffff", color: ink, border: `1px solid ${line}`, borderRadius: brand.radius }}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </div>
            )}

            {(o.status === "paid" || o.status === "printing") && (
              <div className="mt-2">
                <p className="text-sm leading-relaxed">
                  {o.status === "paid"
                    ? "Paid and waiting for a printer. Starting it moves the order into Printing for the rest of the shop to see."
                    : "On the printer now. Mark it packed once it's cleaned up and boxed."}
                </p>
                {leadTimes.length > 0 && (
                  <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: accentInk }}>
                    <Icons.Clock className="h-4 w-4" aria-hidden="true" />
                    Printed to order — longest lead time {leadTimes[leadTimes.length - 1].lead_time}
                  </p>
                )}
                <Button
                  onClick={() => advance(o)}
                  className="ps-focus mt-4 px-5 py-3 text-base font-semibold"
                  style={{ backgroundColor: P, color: "#ffffff", borderRadius: brand.radius }}
                >
                  {NEXT_LABEL[next]}
                </Button>
                <p className="mt-2 text-xs" style={{ color: inkSoft }}>
                  Only the next step in paid → printing → packed → shipped is offered.
                </p>
              </div>
            )}
          </section>

          {/* items */}
          <section aria-labelledby={`items-${o.id}`}>
            <h3 id={`items-${o.id}`} className="text-xs font-bold uppercase tracking-[0.12em]" style={{ color: inkSoft }}>
              What was bought
            </h3>
            <ul className="mt-3 divide-y" style={{ borderColor: line }}>
              {o.items.map((i) => (
                <li key={i.id} className="flex items-start justify-between gap-4 py-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-snug">{i.product_name}</p>
                    <p className="mt-0.5 text-xs" style={{ color: inkSoft }}>
                      {i.variant_options}
                    </p>
                    {i.lead_time && (
                      <p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold" style={{ color: accentInk }}>
                        <Icons.Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        {i.lead_time}
                      </p>
                    )}
                  </div>
                  <div className="shrink-0 text-right tabular-nums">
                    <p className="text-sm font-semibold">{money(i.line_total)}</p>
                    <p className="text-xs" style={{ color: inkSoft }}>
                      {i.quantity} × {money(i.unit_price)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <dl className="mt-3 space-y-1.5 border-t pt-3 text-sm tabular-nums" style={{ borderColor: line }}>
              <div className="flex justify-between">
                <dt style={{ color: inkSoft }}>Goods subtotal</dt>
                <dd className="font-medium">{money(o.goods_subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt style={{ color: inkSoft }}>{o.postage_option_name}</dt>
                <dd className="font-medium">{o.postage_amount === 0 ? "Free" : money(o.postage_amount)}</dd>
              </div>
              <div className="flex justify-between">
                <dt style={{ color: inkSoft }}>VAT at {Math.round(o.tax_rate * 100)}%</dt>
                <dd className="font-medium">{money(o.tax_amount)}</dd>
              </div>
              <div className="flex justify-between border-t pt-2 text-base font-bold" style={{ borderColor: line }}>
                <dt>Total paid</dt>
                <dd>{money(o.total)}</dd>
              </div>
            </dl>
          </section>

          {/* customer + address */}
          <section aria-labelledby={`addr-${o.id}`} className="grid gap-5 sm:grid-cols-2">
            <div>
              <h3 id={`addr-${o.id}`} className="text-xs font-bold uppercase tracking-[0.12em]" style={{ color: inkSoft }}>
                Deliver to
              </h3>
              <address className="mt-2 text-sm not-italic leading-relaxed">
                {o.delivery_address.recipient_name}
                <br />
                {o.delivery_address.line1}
                <br />
                {o.delivery_address.line2 && (
                  <>
                    {o.delivery_address.line2}
                    <br />
                  </>
                )}
                {o.delivery_address.city}
                <br />
                <span className="tabular-nums">{o.delivery_address.postcode}</span>
                <br />
                {o.delivery_address.country}
              </address>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.12em]" style={{ color: inkSoft }}>
                Customer &amp; payment
              </h3>
              <p className="mt-2 break-words text-sm font-medium">{o.email}</p>
              <p className="mt-1 inline-flex items-center gap-1.5 text-xs" style={{ color: inkSoft }}>
                <Icons.User className="h-3.5 w-3.5" aria-hidden="true" />
                {o.account ? "Has an account — sees this in order history" : "Guest checkout"}
              </p>
              <p className="mt-3 text-sm">
                {isRefunded ? "Refunded" : "Paid in full"} · {o.card}
              </p>
              <p className="mt-0.5 break-all text-xs tabular-nums" style={{ color: inkSoft }}>
                {o.stripe_payment_intent_id}
              </p>

              {isRefunded ? (
                <p
                  className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold"
                  style={{ backgroundColor: tintN(12), color: ink, borderRadius: "999px" }}
                >
                  <Icons.Check className="h-3.5 w-3.5" aria-hidden="true" />
                  {money(o.refunded_amount)} refunded — nothing left to refund
                </p>
              ) : refundOpen ? (
                <div className="ps-flashin mt-3 p-3" style={{ backgroundColor: tintA(10), border: `1px solid ${tintA(30)}`, borderRadius: brand.radius }}>
                  <p className="text-sm font-semibold" style={{ color: accentInk }}>
                    Refund {money(o.total)} to {o.card}?
                  </p>
                  <p className="mt-1 text-xs leading-relaxed" style={{ color: ink }}>
                    Stripe sends the money back and {o.email} gets a refund email. This can't be undone from here.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button
                      onClick={() => doRefund(o)}
                      className="ps-focus text-sm font-semibold"
                      style={{ backgroundColor: A, color: "#2a1008", borderRadius: brand.radius }}
                    >
                      Yes, refund in full
                    </Button>
                    <Button
                      onClick={() => setRefundOpen(false)}
                      className="ps-focus text-sm font-semibold"
                      style={{ backgroundColor: "#ffffff", color: ink, border: `1px solid ${line}`, borderRadius: brand.radius }}
                    >
                      Keep the order
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={() => setRefundOpen(true)}
                  className="ps-focus mt-3 text-sm font-semibold"
                  style={{ backgroundColor: "#ffffff", color: accentInk, border: `1px solid ${tintA(38)}`, borderRadius: brand.radius }}
                >
                  Issue a full refund
                </Button>
              )}
            </div>
          </section>

          {/* emails */}
          <section aria-labelledby={`mail-${o.id}`}>
            <h3 id={`mail-${o.id}`} className="text-xs font-bold uppercase tracking-[0.12em]" style={{ color: inkSoft }}>
              Emails sent
            </h3>
            <ul className="mt-2 space-y-2">
              {o.emails.map((e) => (
                <li
                  key={e.id}
                  className="flex flex-wrap items-start justify-between gap-3 p-3"
                  style={{
                    backgroundColor: e.status === "failed" ? tintA(9) : tintN(6),
                    border: `1px solid ${e.status === "failed" ? tintA(30) : tintN(18)}`,
                    borderRadius: brand.radius,
                  }}
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{e.email_type}</p>
                    <p className="mt-0.5 text-xs" style={{ color: inkSoft }}>
                      {e.status === "failed" ? "Not delivered" : e.status === "sending" ? "Sending now…" : `Sent ${e.sent_at}`} · {e.recipient}
                    </p>
                    {e.status === "failed" && (
                      <p className="mt-1.5 text-xs font-medium leading-relaxed" style={{ color: accentInk }}>
                        {e.error}
                      </p>
                    )}
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-xs font-bold" style={{ color: e.status === "failed" ? accentInk : inkSoft }}>
                      {e.status === "failed" ? (
                        <Icons.AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      ) : e.status === "sending" ? (
                        <Icons.Clock className="h-3.5 w-3.5 ps-skel" aria-hidden="true" />
                      ) : (
                        <Icons.Check className="h-3.5 w-3.5" aria-hidden="true" />
                      )}
                      {e.status === "failed" ? "Failed" : e.status === "sending" ? "Sending" : "Sent"}
                    </span>
                    {e.status !== "sending" && (
                      <Button
                        onClick={() => resend(o, e.id)}
                        className="ps-focus text-xs font-semibold"
                        style={{
                          backgroundColor: "#ffffff",
                          color: e.status === "failed" ? accentInk : P,
                          border: `1px solid ${e.status === "failed" ? tintA(38) : tintP(34)}`,
                          borderRadius: brand.radius,
                        }}
                      >
                        {e.status === "failed" ? "Try again" : "Resend"}
                      </Button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            {failed.length > 0 && (
              <p className="mt-2 text-xs leading-relaxed" style={{ color: inkSoft }}>
                Sending keeps failing? Check the sender address and API key in{" "}
                <button onClick={() => navigate("admin-shop-setup")} className="ps-focus font-semibold underline underline-offset-2" style={{ color: P }}>
                  shop settings
                </button>
                .
              </p>
            )}
          </section>

          {/* history */}
          <section aria-labelledby={`hist-${o.id}`}>
            <h3 id={`hist-${o.id}`} className="text-xs font-bold uppercase tracking-[0.12em]" style={{ color: inkSoft }}>
              Status history
            </h3>
            <ol className="mt-3 space-y-3">
              {o.history.map((h, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span
                    className="mt-1 h-2.5 w-2.5 shrink-0"
                    style={{ backgroundColor: idx === o.history.length - 1 ? P : tintN(40), borderRadius: "999px" }}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-semibold">{STATUS_LABEL[h.status]}</p>
                    <p className="text-xs tabular-nums" style={{ color: inkSoft }}>
                      {h.changed_at} · {h.changed_by}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </CardContent>
      </Card>
    );
  };

  return shell(
    <div className="mx-auto max-w-[1360px]">
      {/* header */}
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: P }}>
            {SHOP.name} admin
          </p>
          <h1 className="mt-1.5 text-3xl font-bold tracking-tight sm:text-4xl" style={{ fontFamily: brand.fontHeading }}>
            Order queue
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed" style={{ color: inkSoft }}>
            <span className="font-semibold tabular-nums" style={{ color: ink }}>
              {toPrint}
            </span>{" "}
            waiting for a printer,{" "}
            <span className="font-semibold tabular-nums" style={{ color: ink }}>
              {toPost}
            </span>{" "}
            boxed and ready to post
            {problemCount > 0 ? (
              <>
                , and{" "}
                <span className="font-semibold tabular-nums" style={{ color: accentInk }}>
                  {problemCount}
                </span>{" "}
                email that didn't send.
              </>
            ) : (
              ". All emails have gone out."
            )}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-2 px-3 py-1.5" style={{ backgroundColor: "#ffffff", border: `1px solid ${line}`, borderRadius: "999px" }}>
            <span
              className="flex h-7 w-7 items-center justify-center text-xs font-bold"
              style={{ backgroundColor: tintP(16), color: P, borderRadius: "999px" }}
              aria-hidden="true"
            >
              MQ
            </span>
            <span className="text-xs leading-tight">
              <span className="block font-semibold">{STAFF.name}</span>
              <span style={{ color: inkSoft }}>{STAFF.role}</span>
            </span>
          </span>
          <Button
            onClick={() => navigate("admin-shop-setup")}
            className="ps-focus inline-flex items-center gap-1.5 text-sm font-semibold"
            style={{ backgroundColor: "#ffffff", color: ink, border: `1px solid ${line}`, borderRadius: brand.radius }}
          >
            <Icons.Settings className="h-4 w-4" aria-hidden="true" />
            Catalogue &amp; settings
          </Button>
          <Button
            onClick={() => {
              setSignedIn(false);
              setFlash(null);
              setLoginError(null);
            }}
            className="ps-focus text-sm font-semibold"
            style={{ backgroundColor: "#ffffff", color: inkSoft, border: `1px solid ${line}`, borderRadius: brand.radius }}
          >
            Sign out
          </Button>
        </div>
      </header>

      {/* stale / sync strip */}
      <div
        className="mb-5 flex flex-wrap items-center justify-between gap-3 px-4 py-2.5"
        style={{
          backgroundColor: sync === "stale" ? tintN(8) : tintP(7),
          border: `1px solid ${sync === "stale" ? tintN(22) : tintP(22)}`,
          borderRadius: brand.radius,
        }}
      >
        <p className="flex items-center gap-2 text-sm" style={{ color: sync === "stale" ? ink : P }}>
          {sync === "syncing" ? (
            <Icons.Clock className="h-4 w-4 ps-skel" aria-hidden="true" />
          ) : sync === "stale" ? (
            <Icons.Clock className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Icons.CheckCircle className="h-4 w-4" aria-hidden="true" />
          )}
          <span aria-live="polite">
            {sync === "syncing"
              ? "Fetching the latest orders…"
              : sync === "stale"
              ? "This queue hasn't refreshed since 09:41 — new orders from this morning may be missing."
              : "Up to date as of just now."}
          </span>
        </p>
        <Button
          onClick={refresh}
          disabled={sync === "syncing"}
          className="ps-focus text-sm font-semibold"
          style={{
            backgroundColor: "#ffffff",
            color: sync === "syncing" ? inkSoft : P,
            border: `1px solid ${tintP(34)}`,
            borderRadius: brand.radius,
            opacity: sync === "syncing" ? 0.7 : 1,
          }}
        >
          {sync === "syncing" ? "Refreshing…" : "Refresh queue"}
        </Button>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] xl:grid-cols-[minmax(0,1fr)_minmax(0,540px)]">
        {/* list */}
        <Card
          className={`border ${selectedId ? "hidden lg:block" : "block"}`}
          style={{ backgroundColor: "#ffffff", borderColor: line, borderRadius: brand.radius }}
        >
          <CardHeader className="space-y-4 px-5 pb-4 pt-5 sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-base font-bold">
                Orders{" "}
                <span className="tabular-nums font-semibold" style={{ color: inkSoft }}>
                  ({visible.length})
                </span>
              </h2>
              <button
                type="button"
                aria-pressed={problemsOnly}
                onClick={() => setProblemsOnly((v) => !v)}
                className="ps-focus inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold"
                style={{
                  borderRadius: "999px",
                  backgroundColor: problemsOnly ? tintA(18) : "#ffffff",
                  color: problemsOnly ? accentInk : ink,
                  border: `1px solid ${problemsOnly ? tintA(40) : line}`,
                }}
              >
                <Icons.AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                Email problems only
                <span className="tabular-nums">{problemCount}</span>
              </button>
            </div>

            <div>
              <Label htmlFor="order-search" className="text-sm font-semibold">
                Search the queue
              </Label>
              <div className="relative mt-1.5">
                <Icons.Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: inkSoft }} aria-hidden="true" />
                <Input
                  id="order-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Order reference or customer email"
                  className="ps-focus w-full pl-9"
                  style={{ borderRadius: brand.radius, borderColor: line }}
                />
              </div>
            </div>

            <div role="group" aria-label="Filter orders by status" className="flex flex-wrap gap-2">
              {filterChip("all", "All", counts.all)}
              {STATUS_ORDER.map((s) => filterChip(s, STATUS_LABEL[s], counts[s]))}
            </div>
          </CardHeader>

          <CardContent className="px-0 pb-2">
            {sync === "syncing" ? (
              <ul className="space-y-3 px-5 py-4 sm:px-6" aria-label="Loading orders">
                {[0, 1, 2, 3, 4].map((i) => (
                  <li key={i} className="ps-skel flex items-center justify-between gap-4" style={{ animationDelay: `${i * 90}ms` }}>
                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-32" style={{ backgroundColor: tintN(16), borderRadius: "999px" }} />
                      <div className="h-2.5 w-48" style={{ backgroundColor: tintN(10), borderRadius: "999px" }} />
                    </div>
                    <div className="h-6 w-20" style={{ backgroundColor: tintN(12), borderRadius: "999px" }} />
                  </li>
                ))}
              </ul>
            ) : visible.length === 0 ? (
              emptyState()
            ) : (
              <div className="overflow-x-auto">
                <Table className="w-full text-sm">
                  <THead>
                    <TR style={{ borderBottom: `1px solid ${line}` }}>
                      <TH scope="col" className="px-5 py-2.5 text-left text-xs font-bold uppercase tracking-wider sm:px-6" style={{ color: inkSoft }}>
                        Order
                      </TH>
                      <TH scope="col" className="px-3 py-2.5 text-left text-xs font-bold uppercase tracking-wider" style={{ color: inkSoft }}>
                        Customer
                      </TH>
                      <TH scope="col" className="hidden px-3 py-2.5 text-left text-xs font-bold uppercase tracking-wider md:table-cell" style={{ color: inkSoft }}>
                        Items
                      </TH>
                      <TH scope="col" className="px-3 py-2.5 text-right text-xs font-bold uppercase tracking-wider" style={{ color: inkSoft }}>
                        Total
                      </TH>
                      <TH scope="col" className="px-5 py-2.5 text-left text-xs font-bold uppercase tracking-wider sm:px-6" style={{ color: inkSoft }}>
                        Status
                      </TH>
                    </TR>
                  </THead>
                  <TBody>
                    {visible.map((o) => {
                      const isSel = o.id === selectedId;
                      const hasFailed = o.emails.some((e) => e.status === "failed");
                      return (
                        <TR
                          key={o.id}
                          className="align-top transition-colors"
                          style={{
                            borderBottom: `1px solid ${tintN(10)}`,
                            backgroundColor: isSel ? tintP(7) : "transparent",
                            boxShadow: isSel ? `inset 3px 0 0 ${P}` : "none",
                          }}
                        >
                          <TD className="px-5 py-3 sm:px-6">
                            <button
                              type="button"
                              onClick={() => setSelectedId(o.id)}
                              aria-current={isSel ? "true" : undefined}
                              className="ps-focus block w-full text-left"
                            >
                              <span className="block font-bold tabular-nums" style={{ color: isSel ? P : ink }}>
                                {o.reference}
                              </span>
                              <span className="mt-0.5 block text-xs tabular-nums" style={{ color: inkSoft }}>
                                {o.placed}
                              </span>
                              {hasFailed && (
                                <span className="mt-1 inline-flex items-center gap-1 text-xs font-bold" style={{ color: accentInk }}>
                                  <Icons.AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                                  Email failed
                                </span>
                              )}
                            </button>
                          </TD>
                          <TD className="px-3 py-3">
                            <span className="block font-medium">{o.customer_name}</span>
                            <span className="mt-0.5 block break-all text-xs" style={{ color: inkSoft }}>
                              {o.email}
                            </span>
                          </TD>
                          <TD className="hidden px-3 py-3 md:table-cell">
                            <span className="block text-xs tabular-nums font-semibold">
                              {o.items.reduce((s, i) => s + i.quantity, 0)} item{o.items.reduce((s, i) => s + i.quantity, 0) === 1 ? "" : "s"}
                            </span>
                            <span className="mt-0.5 block max-w-[16rem] truncate text-xs" style={{ color: inkSoft }}>
                              {o.items[0].product_name}
                              {o.items.length > 1 ? ` +${o.items.length - 1} more` : ""}
                            </span>
                          </TD>
                          <TD className="px-3 py-3 text-right font-semibold tabular-nums">{money(o.total)}</TD>
                          <TD className="px-5 py-3 sm:px-6">{pill(o.status)}</TD>
                        </TR>
                      );
                    })}
                  </TBody>
                </Table>
              </div>
            )}
          </CardContent>

          <CardFooter className="px-5 pb-5 pt-1 sm:px-6">
            <p className="text-xs leading-relaxed" style={{ color: inkSoft }}>
              Newest first. Totals include VAT at {Math.round(TAX_RATE * 100)}% and postage, in GBP — the shop's single currency.
            </p>
          </CardFooter>
        </Card>

        {/* detail */}
        <div className={`${selectedId ? "block" : "hidden lg:block"} lg:sticky lg:top-6`}>{selected ? renderDetail(selected) : detailEmpty}</div>
      </div>
    </div>
  );
}
