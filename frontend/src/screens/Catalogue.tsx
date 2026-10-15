// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

const { Button, Input, Label, Select, Checkbox } = UI;
const { Search, Check, X, User, FileText, Package, Clock, AlertCircle, CheckCircle } = Icons;

const SHOP = {
  name: "Pocket Shelf",
  town: "Margate",
  currency: "GBP",
  locale: "en-GB",
  freePostageThreshold: 40,
  trackedPrice: 4.95,
};

const money = (n) =>
  new Intl.NumberFormat(SHOP.locale, {
    style: "currency",
    currency: SHOP.currency,
  }).format(n);

const v = (options, price, fulfilment_type, stock_count, lead_time, active = true) => ({
  options,
  price,
  fulfilment_type,
  stock_count,
  lead_time,
  active,
});

const CATEGORIES = [
  { id: "all", name: "Everything", slug: "all" },
  { id: 1, name: "Desk Toys", slug: "desk-toys" },
  { id: 2, name: "Dragons & Beasts", slug: "dragons-beasts" },
  { id: 3, name: "Keychains & Charms", slug: "keychains-charms" },
  { id: 4, name: "Planters & Pots", slug: "planters-pots" },
  { id: 5, name: "Tabletop Minis", slug: "tabletop-minis" },
  { id: 6, name: "Advent & Seasonal", slug: "advent-seasonal" },
];

const PRODUCTS = [
  {
    id: "p-101",
    slug: "articulated-pocket-dragon",
    name: "Articulated Pocket Dragon",
    category_id: 2,
    description:
      "Print-in-place articulated dragon, 120mm nose to tail. Every segment moves, no assembly, no glue.",
    published: true,
    created_at: "2026-10-11",
    photos: 5,
    glyph: "🐉",
    tile: 0,
    variants: [
      v("Ember red · 120mm · Matte", 14.0, "printed_to_order", null, "3–5 working days to print"),
      v("Galaxy silk · 120mm · Satin", 16.5, "printed_to_order", null, "3–5 working days to print"),
      v("Ember red · 180mm · Matte", 24.0, "printed_to_order", null, "5–7 working days to print"),
    ],
  },
  {
    id: "p-102",
    slug: "grumpy-cat-desk-guardian",
    name: "Grumpy Cat Desk Guardian",
    category_id: 1,
    description: "A small unimpressed cat who sits on your monitor and judges your inbox.",
    published: true,
    created_at: "2026-09-28",
    photos: 4,
    glyph: "🐈",
    tile: 1,
    variants: [
      v("Charcoal · 70mm · Matte", 11.5, "stocked", 6, null),
      v("Oat white · 70mm · Matte", 11.5, "stocked", 2, null),
      v("Charcoal · 110mm · Satin", 17.0, "stocked", 0, null),
    ],
  },
  {
    id: "p-103",
    slug: "hex-fidget-slider",
    name: "Hex Fidget Slider",
    category_id: 1,
    description: "Magnet-free sliding fidget that clicks through six detents. Quiet enough for meetings.",
    published: true,
    created_at: "2026-10-02",
    photos: 3,
    glyph: "🔩",
    tile: 2,
    variants: [
      v("Deep violet · 60mm · Matte", 9.0, "stocked", 2, null),
      v("Mint · 60mm · Matte", 9.0, "stocked", 0, null),
    ],
  },
  {
    id: "p-104",
    slug: "moon-snail-planter",
    name: "Moon Snail Planter",
    category_id: 4,
    description: "Spiral shell planter with a drainage plug, sized for a 6cm nursery pot.",
    published: true,
    created_at: "2026-08-19",
    photos: 6,
    glyph: "🐌",
    tile: 3,
    variants: [
      v("Bone · 140mm · Matte", 18.0, "stocked", 0, null),
      v("Sage · 140mm · Matte", 18.0, "stocked", 0, null),
    ],
  },
  {
    id: "p-105",
    slug: "tiny-axolotl-charm",
    name: "Tiny Axolotl Charm",
    category_id: 3,
    description: "35mm axolotl charm on a steel split ring. Fits a zip pull or a set of keys.",
    published: true,
    created_at: "2026-09-04",
    photos: 3,
    glyph: "🦎",
    tile: 4,
    variants: [
      v("Blush pink · 35mm · Satin", 5.5, "stocked", 24, null),
      v("Glow green · 35mm · Satin", 6.5, "stocked", 11, null),
    ],
  },
  {
    id: "p-106",
    slug: "wyvern-hatchling",
    name: "Wyvern Hatchling",
    category_id: 2,
    description: "Curled hatchling with a hollow egg base. Printed to order in your chosen filament.",
    published: true,
    created_at: "2026-10-09",
    photos: 4,
    glyph: "🐲",
    tile: 5,
    variants: [
      v("Copper silk · 90mm · Satin", 16.0, "printed_to_order", null, "5–7 working days to print"),
      v("Storm grey · 90mm · Matte", 15.0, "printed_to_order", null, "5–7 working days to print"),
    ],
  },
  {
    id: "p-107",
    slug: "kraken-dice-tower",
    name: "Kraken Dice Tower (Small)",
    category_id: 5,
    description: "Tentacle dice tower for d20s and smaller. Baffles inside, felt pad underneath.",
    published: true,
    created_at: "2026-07-30",
    photos: 7,
    glyph: "🐙",
    tile: 0,
    variants: [
      v("Abyss teal · 160mm · Matte", 26.0, "printed_to_order", null, "7–10 working days to print"),
      v("Ink black · 160mm · Matte", 26.0, "printed_to_order", null, "7–10 working days to print"),
    ],
  },
  {
    id: "p-108",
    slug: "mushroom-pot-trio",
    name: "Mushroom Pot Trio",
    category_id: 4,
    description: "Three stacking toadstool pots for cuttings, paperclips or rings.",
    published: true,
    created_at: "2026-09-16",
    photos: 5,
    glyph: "🍄",
    tile: 1,
    variants: [
      v("Red & cream · Set of 3 · Matte", 21.0, "stocked", 4, null),
      v("Amber & cream · Set of 3 · Matte", 21.0, "stocked", 3, null),
    ],
  },
  {
    id: "p-109",
    slug: "slinky-serpent",
    name: "Slinky Serpent",
    category_id: 1,
    description: "Forty-two linked scales that pour between your hands. Prints flat, arrives wriggly.",
    published: true,
    created_at: "2026-09-22",
    photos: 4,
    glyph: "🐍",
    tile: 2,
    variants: [
      v("Rainbow silk · 300mm · Satin", 12.0, "stocked", 11, null),
      v("Jade · 300mm · Matte", 11.0, "stocked", 5, null),
    ],
  },
  {
    id: "p-110",
    slug: "bramble-goblin-mini",
    name: "Bramble Goblin Mini",
    category_id: 5,
    description: "32mm scale goblin skirmisher, resin-fine detail, supplied unpainted on a lipped base.",
    published: true,
    created_at: "2026-10-06",
    photos: 2,
    glyph: "👺",
    tile: 3,
    variants: [
      v("Grey primer · 32mm · Fine", 4.0, "stocked", 9, null),
      v("Grey primer · 32mm · Fine · Pack of 5", 17.0, "stocked", 2, null),
    ],
  },
  {
    id: "p-111",
    slug: "frog-keyring-squishable",
    name: "Frog Keyring (Squishable)",
    category_id: 3,
    description: "Flexible TPU frog that squashes in your pocket and springs back.",
    published: true,
    created_at: "2026-08-02",
    photos: 3,
    glyph: "🐸",
    tile: 4,
    variants: [v("Pond green · 40mm · Flexible", 6.0, "stocked", 0, null)],
  },
  {
    id: "p-112",
    slug: "cog-and-spring-fidget-cube",
    name: "Cog & Spring Fidget Cube",
    category_id: 1,
    description: "Six working faces: gears, a slider, a rocker and three clickers. Printed as one piece.",
    published: true,
    created_at: "2026-10-13",
    photos: 5,
    glyph: "🧊",
    tile: 5,
    variants: [
      v("Slate · 45mm · Matte", 15.0, "printed_to_order", null, "3–5 working days to print"),
      v("Sunflower · 45mm · Matte", 15.0, "printed_to_order", null, "3–5 working days to print"),
    ],
  },
  {
    id: "p-113",
    slug: "hoard-dragon-bookend",
    name: "Hoard Dragon Bookend",
    category_id: 2,
    description: "Weighted bookend dragon coiled over a pile of coins. Sand-fillable cavity in the base.",
    published: true,
    created_at: "2026-06-11",
    photos: 6,
    glyph: "🏰",
    tile: 0,
    variants: [
      v("Antique bronze · 200mm · Satin", 32.0, "stocked", 1, null),
      v("Ink black · 200mm · Matte", 30.0, "stocked", 0, null),
    ],
  },
  {
    id: "p-114",
    slug: "succulent-stair-pot",
    name: "Succulent Stair Pot",
    category_id: 4,
    description: "Four-step cascade pot for windowsills. Self-watering reservoir underneath.",
    published: true,
    created_at: "2026-09-09",
    photos: 4,
    glyph: "🪴",
    tile: 1,
    variants: [
      v("Terracotta · 220mm · Matte", 19.5, "stocked", 7, null),
      v("Chalk white · 220mm · Matte", 19.5, "stocked", 3, null),
    ],
  },
  {
    id: "p-115",
    slug: "knight-of-the-burnt-oak",
    name: "Knight of the Burnt Oak",
    category_id: 5,
    description: "Heavy infantry hero, 32mm scale, two head options supplied in the same print.",
    published: true,
    created_at: "2026-10-14",
    photos: 3,
    glyph: "⚔️",
    tile: 2,
    variants: [v("Grey primer · 32mm · Fine", 7.5, "printed_to_order", null, "4–6 working days to print")],
  },
  {
    id: "p-116",
    slug: "bee-charm-set-of-three",
    name: "Bee Charm Set of Three",
    category_id: 3,
    description: "Three little bees on jump rings, sized for bag zips. Sold as a set.",
    published: true,
    created_at: "2026-08-25",
    photos: 2,
    glyph: "🐝",
    tile: 3,
    variants: [v("Honey & black · 30mm · Satin", 10.0, "stocked", 13, null)],
  },
  {
    id: "p-117",
    slug: "castle-gatehouse-terrain",
    name: "Castle Gatehouse Terrain",
    category_id: 5,
    description: "Modular gatehouse with a working portcullis, scaled for 28–32mm figures.",
    published: true,
    created_at: "2026-07-18",
    photos: 8,
    glyph: "🧱",
    tile: 4,
    variants: [
      v("Stone grey · 180mm · Matte", 24.0, "stocked", 3, null),
      v("Stone grey · 180mm · Matte · Twin pack", 44.0, "printed_to_order", null, "7–10 working days to print"),
    ],
  },
  {
    id: "p-118",
    slug: "ghost-lamp-mini",
    name: "Ghost Lamp Mini",
    category_id: 1,
    description: "Translucent ghost shade for a tealight LED. Glows soft green after lights out.",
    published: true,
    created_at: "2026-10-01",
    photos: 4,
    glyph: "👻",
    tile: 5,
    variants: [
      v("Glow white · 95mm · Translucent", 13.0, "stocked", 5, null),
      v("Glow green · 95mm · Translucent", 13.5, "stocked", 8, null),
    ],
  },
  {
    id: "p-119",
    slug: "cherry-blossom-diorama",
    name: "Cherry Blossom Diorama",
    category_id: 1,
    description: "Draft listing — photos still to shoot. Not visible on the storefront.",
    published: false,
    created_at: "2026-10-15",
    photos: 0,
    glyph: "🌸",
    tile: 0,
    variants: [v("Pink & oak · 150mm · Matte", 28.0, "stocked", 0, null, false)],
  },
];

const SEARCH_SUGGESTIONS = ["dragon", "charm", "planter", "fidget"];

export default function Screen() {
  const navigate = useNavigate();
  const [query, setQuery] = React.useState("");
  const [cat, setCat] = React.useState("all");
  const [sort, setSort] = React.useState("featured");
  const [readyOnly, setReadyOnly] = React.useState(false);
  const [visible, setVisible] = React.useState(8);
  const [switching, setSwitching] = React.useState(false);
  const [pageState, setPageState] = React.useState("idle"); // idle | loading | error
  const [stale, setStale] = React.useState(true);
  const [checkedLabel, setCheckedLabel] = React.useState("4 minutes ago");
  const [staffNotice, setStaffNotice] = React.useState(false);

  const timers = React.useRef([]);
  const firstRun = React.useRef(true);
  const failedOnce = React.useRef(false);
  const staffBtn = React.useRef(null);

  React.useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const after = (ms, fn) => timers.current.push(setTimeout(fn, ms));

  React.useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    setSwitching(true);
    const t = setTimeout(() => setSwitching(false), 380);
    return () => clearTimeout(t);
  }, [cat]);

  const hexToRgba = (hex, a) => {
    const h = hex.replace("#", "");
    const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
    return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
  };

  const P = brand.primaryColor;
  const A = brand.accentColor;
  const N = brand.neutralColor;
  const R = brand.radius;
  const RL = `calc(${R} * 2)`;

  const TILES = [
    `linear-gradient(145deg, ${hexToRgba(P, 0.2)}, ${hexToRgba(A, 0.14)})`,
    `linear-gradient(145deg, ${hexToRgba(A, 0.24)}, ${hexToRgba(P, 0.1)})`,
    `linear-gradient(145deg, ${hexToRgba(N, 0.18)}, ${hexToRgba(P, 0.16)})`,
    `linear-gradient(145deg, ${hexToRgba(P, 0.12)}, ${hexToRgba(A, 0.26)})`,
    `linear-gradient(145deg, ${hexToRgba(A, 0.16)}, ${hexToRgba(N, 0.2)})`,
    `linear-gradient(145deg, ${hexToRgba(P, 0.26)}, ${hexToRgba(N, 0.1)})`,
  ];

  const availability = (p) => {
    const act = p.variants.filter((x) => x.active);
    const stocked = act.filter((x) => x.fulfilment_type === "stocked");
    const total = stocked.reduce((s, x) => s + (x.stock_count || 0), 0);
    const pod = act.find((x) => x.fulfilment_type === "printed_to_order");
    if (total > 0)
      return {
        kind: "stock",
        label: total <= 3 ? `Only ${total} left` : "Ready to post",
        detail: `${total} on the shelf`,
      };
    if (pod) return { kind: "pod", label: pod.lead_time, detail: "Printed to order" };
    return { kind: "sold", label: "Sold out", detail: "Back when the printer frees up" };
  };

  const lowestPrice = (p) => Math.min(...p.variants.filter((x) => x.active).map((x) => x.price));

  const published = PRODUCTS.filter((p) => p.published);

  const counts = {};
  CATEGORIES.forEach((c) => {
    counts[c.id] = c.id === "all" ? published.length : published.filter((p) => p.category_id === c.id).length;
  });

  const q = query.trim().toLowerCase();

  const results = React.useMemo(() => {
    let list = published.filter((p) => (cat === "all" ? true : p.category_id === cat));
    if (q) list = list.filter((p) => (p.name + " " + p.description).toLowerCase().includes(q));
    if (readyOnly) list = list.filter((p) => availability(p).kind === "stock");
    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => lowestPrice(a) - lowestPrice(b));
    if (sort === "price-desc") sorted.sort((a, b) => lowestPrice(b) - lowestPrice(a));
    if (sort === "newest") sorted.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
    if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
  }, [q, cat, sort, readyOnly]);

  const shown = results.slice(0, visible);
  const remaining = results.length - shown.length;
  const activeCat = CATEGORIES.find((c) => c.id === cat);

  const resetPaging = () => {
    setVisible(8);
    setPageState("idle");
  };

  const chooseCat = (id) => {
    setCat(id);
    resetPaging();
  };

  const onSearch = (value) => {
    setQuery(value);
    resetPaging();
  };

  const loadMore = () => {
    setPageState("loading");
    after(520, () => {
      if (!failedOnce.current) {
        failedOnce.current = true;
        setPageState("error");
      } else {
        setPageState("idle");
        setVisible((n) => n + 8);
      }
    });
  };

  const refreshStock = () => {
    setSwitching(true);
    after(600, () => {
      setSwitching(false);
      setStale(false);
      setCheckedLabel("just now");
    });
  };

  const isNew = (p) => {
    const days = (new Date("2026-10-15") - new Date(p.created_at)) / 86400000;
    return days <= 7;
  };

  const css = `
    .ps-focus:focus-visible { outline: 3px solid ${P}; outline-offset: 2px; border-radius: ${R}; }
    .ps-card { transition: transform .18s ease, box-shadow .18s ease; }
    .ps-card:hover { transform: translateY(-3px); box-shadow: 0 14px 28px ${hexToRgba(P, 0.16)}; }
    .ps-card:active { transform: translateY(-1px) scale(.995); }
    .ps-in { animation: psIn .32s cubic-bezier(.22,1,.36,1) both; }
    @keyframes psIn { from { opacity: 0; transform: translateY(10px) scale(.98); } to { opacity: 1; transform: none; } }
    .ps-shimmer { background-size: 220% 100%; animation: psShim 1.25s linear infinite; }
    @keyframes psShim { from { background-position: 180% 0; } to { background-position: -40% 0; } }
    .ps-chip { transition: transform .15s ease, background-color .15s ease, color .15s ease, border-color .15s ease; }
    .ps-chip:hover { transform: translateY(-1px); }
    .ps-panel { animation: psPanel .22s ease-out both; }
    @keyframes psPanel { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
    @media (prefers-reduced-motion: reduce) {
      .ps-card, .ps-chip, .ps-in, .ps-shimmer, .ps-panel { animation: none !important; transition: none !important; transform: none !important; }
    }
    .ps-scroll::-webkit-scrollbar { height: 6px; }
    .ps-scroll::-webkit-scrollbar-thumb { background: ${hexToRgba(N, 0.3)}; border-radius: 99px; }
  `;

  const Pill = ({ kind, children }) => {
    const map = {
      stock: { bg: hexToRgba(P, 0.1), fg: P, Icon: Icons.CheckCircle },
      pod: { bg: hexToRgba(N, 0.12), fg: "#3F3B4E", Icon: Icons.Clock },
      sold: { bg: hexToRgba(N, 0.22), fg: "#35313F", Icon: Icons.X },
    }[kind];
    const I = map.Icon;
    return (
      <span
        className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-semibold leading-none"
        style={{ backgroundColor: map.bg, color: map.fg, borderRadius: 999 }}
      >
        <I className="w-3 h-3 shrink-0" aria-hidden="true" />
        <span>{children}</span>
      </span>
    );
  };

  const Skeletons = () => (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4" aria-hidden="true">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <li key={i} className="overflow-hidden bg-white" style={{ borderRadius: RL }}>
          <div
            className="ps-shimmer aspect-square"
            style={{
              backgroundImage: `linear-gradient(100deg, ${hexToRgba(N, 0.1)} 20%, ${hexToRgba(P, 0.12)} 45%, ${hexToRgba(N, 0.1)} 70%)`,
            }}
          />
          <div className="p-3 space-y-2">
            <div className="h-3 w-3/4 rounded-full" style={{ backgroundColor: hexToRgba(N, 0.16) }} />
            <div className="h-3 w-1/3 rounded-full" style={{ backgroundColor: hexToRgba(N, 0.1) }} />
          </div>
        </li>
      ))}
    </ul>
  );

  const Panel = ({ children }) => (
    <div
      className="ps-in mx-auto max-w-lg px-6 py-12 text-center bg-white"
      style={{ borderRadius: RL, border: `1px solid ${hexToRgba(N, 0.14)}` }}
    >
      {children}
    </div>
  );

  return (
    <div
      className="min-h-full pb-16"
      style={{ fontFamily: brand.fontBody, color: "#2A2733" }}
    >
      <style>{css}</style>

      {/* ---------- Hero / focal search ---------- */}
      <header className="pt-6 sm:pt-10">
        <div
          className="px-5 py-6 sm:px-8 sm:py-9"
          style={{
            borderRadius: RL,
            background: `linear-gradient(160deg, ${hexToRgba(P, 0.12)}, ${hexToRgba(A, 0.1)} 70%, #FFFFFF)`,
            border: `1px solid ${hexToRgba(P, 0.16)}`,
          }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.14em]"
            style={{ color: P }}
          >
            {SHOP.name} · printed in {SHOP.town}
          </p>
          <h1
            className="mt-2 text-3xl sm:text-[2.6rem] font-extrabold leading-[1.08] tracking-tight"
            style={{ fontFamily: brand.fontHeading }}
          >
            Everything on the shelf
          </h1>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed" style={{ color: N }}>
            <span style={{ fontVariantNumeric: "tabular-nums" }}>{published.length}</span> little models,
            printed and posted by hand. Stocked pieces go out next working day; printed-to-order pieces show
            their lead time before you buy.
          </p>

          <form
            className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-end"
            onSubmit={(e) => {
              e.preventDefault();
              resetPaging();
            }}
          >
            <div className="flex-1">
              <Label htmlFor="shelf-search" className="text-xs font-semibold" style={{ color: "#3F3B4E" }}>
                Search the shelf
              </Label>
              <div className="relative mt-1.5">
                <Icons.Search
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: N }}
                  aria-hidden="true"
                />
                <Input
                  id="shelf-search"
                  type="search"
                  value={query}
                  onChange={(e) => onSearch(e.target.value)}
                  placeholder="dragon, planter, 32mm…"
                  className="ps-focus w-full bg-white pl-9 pr-10 py-3 text-[15px]"
                  style={{ borderRadius: R, border: `1px solid ${hexToRgba(N, 0.28)}` }}
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => onSearch("")}
                    aria-label="Clear search"
                    className="ps-focus absolute right-2 top-1/2 -translate-y-1/2 p-1.5"
                    style={{ color: N, borderRadius: 999 }}
                  >
                    <Icons.X className="w-4 h-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
            <Button
              type="submit"
              className="ps-focus px-6 py-3 text-[15px] font-semibold text-white"
              style={{ backgroundColor: A, borderRadius: R, border: "none" }}
            >
              Find it
            </Button>
          </form>

          <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs" style={{ color: N }}>
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: A }} aria-hidden="true" />
              Free standard postage over{" "}
              <strong style={{ color: "#2A2733", fontVariantNumeric: "tabular-nums" }}>
                {money(SHOP.freePostageThreshold)}
              </strong>
            </span>
            <span aria-hidden="true">·</span>
            <span style={{ fontVariantNumeric: "tabular-nums" }}>Tracked {money(SHOP.trackedPrice)}</span>
            <span aria-hidden="true">·</span>
            <span>UK delivery only</span>
          </p>
        </div>
      </header>

      {/* ---------- Categories ---------- */}
      <nav className="mt-7" aria-label="Product categories">
        <h2 className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: N }}>
          Shelves
        </h2>
        <ul className="ps-scroll mt-3 flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
          {CATEGORIES.map((c) => {
            const on = cat === c.id;
            return (
              <li key={c.id} className="shrink-0">
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => chooseCat(c.id)}
                  className="ps-chip ps-focus inline-flex items-center gap-2 whitespace-nowrap px-4 py-2.5 text-sm font-semibold"
                  style={{
                    borderRadius: 999,
                    backgroundColor: on ? P : "#FFFFFF",
                    color: on ? "#FFFFFF" : "#3F3B4E",
                    border: `1px solid ${on ? P : hexToRgba(N, 0.22)}`,
                  }}
                >
                  {c.name}
                  <span
                    className="text-[11px] font-bold"
                    style={{
                      color: on ? "rgba(255,255,255,0.82)" : N,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {counts[c.id]}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ---------- Toolbar ---------- */}
      <div
        className="mt-4 flex flex-col gap-3 border-y py-3 sm:flex-row sm:items-center sm:justify-between"
        style={{ borderColor: hexToRgba(N, 0.16) }}
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <p className="text-sm" aria-live="polite" style={{ color: "#3F3B4E" }}>
            <strong style={{ fontVariantNumeric: "tabular-nums" }}>{results.length}</strong>{" "}
            {results.length === 1 ? "model" : "models"}
            {cat !== "all" && <span style={{ color: N }}> in {activeCat.name}</span>}
            {q && <span style={{ color: N }}> matching “{query.trim()}”</span>}
          </p>
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px]"
            style={{
              borderRadius: 999,
              backgroundColor: stale ? hexToRgba(N, 0.1) : hexToRgba(P, 0.1),
              color: stale ? "#3F3B4E" : P,
            }}
          >
            {stale ? (
              <Icons.Clock className="w-3 h-3" aria-hidden="true" />
            ) : (
              <Icons.Check className="w-3 h-3" aria-hidden="true" />
            )}
            Stock checked {checkedLabel}
            {stale && (
              <button
                type="button"
                onClick={refreshStock}
                className="ps-focus ml-1 font-semibold underline underline-offset-2"
                style={{ color: P }}
              >
                Refresh
              </button>
            )}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Checkbox
              id="ready-only"
              checked={readyOnly}
              onChange={(e) => {
                const next = typeof e === "boolean" ? e : e?.target?.checked;
                setReadyOnly(!!next);
                resetPaging();
              }}
              onCheckedChange={(val) => {
                setReadyOnly(!!val);
                resetPaging();
              }}
              className="ps-focus"
            />
            <Label htmlFor="ready-only" className="text-sm" style={{ color: "#3F3B4E" }}>
              Ready to post only
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="sort-by" className="text-sm" style={{ color: N }}>
              Sort
            </Label>
            <Select
              id="sort-by"
              value={sort}
              onChange={(e) => setSort(typeof e === "string" ? e : e.target.value)}
              onValueChange={(val) => setSort(val)}
              className="ps-focus bg-white px-3 py-2 text-sm"
              style={{ borderRadius: R, border: `1px solid ${hexToRgba(N, 0.24)}` }}
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest first</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="name">Name A–Z</option>
            </Select>
          </div>
        </div>
      </div>

      {/* ---------- Results ---------- */}
      <section className="mt-6" aria-busy={switching}>
        <h2 className="sr-only">Products</h2>

        {switching ? (
          <Skeletons />
        ) : shown.length > 0 ? (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {shown.map((p, i) => {
              const av = availability(p);
              const soldOut = av.kind === "sold";
              const variantCount = p.variants.filter((x) => x.active).length;
              return (
                <li key={p.id} className="ps-in" style={{ animationDelay: `${Math.min(i, 7) * 35}ms` }}>
                  <button
                    type="button"
                    onClick={() => navigate("product")}
                    className="ps-card ps-focus group flex h-full w-full flex-col overflow-hidden bg-white text-left"
                    style={{
                      borderRadius: RL,
                      border: `1px solid ${hexToRgba(N, 0.14)}`,
                      boxShadow: `0 1px 2px ${hexToRgba(N, 0.08)}`,
                    }}
                  >
                    <div
                      className="relative flex aspect-square items-center justify-center"
                      style={{ background: TILES[p.tile], opacity: soldOut ? 0.6 : 1 }}
                    >
                      <span className="text-5xl sm:text-6xl" aria-hidden="true">
                        {p.glyph}
                      </span>
                      {isNew(p) && !soldOut && (
                        <span
                          className="absolute left-2 top-2 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white"
                          style={{ backgroundColor: A, borderRadius: 999 }}
                        >
                          New
                        </span>
                      )}
                      <span
                        className="absolute bottom-2 right-2 inline-flex items-center gap-1 bg-white/85 px-2 py-0.5 text-[10px] font-semibold"
                        style={{ borderRadius: 999, color: "#3F3B4E", fontVariantNumeric: "tabular-nums" }}
                      >
                        <Icons.FileText className="w-3 h-3" aria-hidden="true" />
                        {p.photos} photos
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col gap-2 p-3">
                      <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: N }}>
                        {CATEGORIES.find((c) => c.id === p.category_id).name}
                      </p>
                      <h3 className="text-[15px] font-bold leading-snug" style={{ fontFamily: brand.fontHeading }}>
                        {p.name}
                      </h3>
                      <p className="text-sm font-semibold" style={{ fontVariantNumeric: "tabular-nums" }}>
                        from {money(lowestPrice(p))}
                        <span className="ml-1.5 text-xs font-normal" style={{ color: N }}>
                          · {variantCount} {variantCount === 1 ? "option" : "options"}
                        </span>
                      </p>
                      <div className="mt-auto pt-1">
                        <Pill kind={av.kind}>{av.label}</Pill>
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        ) : q ? (
          <Panel>
            <Icons.Search className="mx-auto w-7 h-7" style={{ color: P }} aria-hidden="true" />
            <h3 className="mt-3 text-lg font-bold" style={{ fontFamily: brand.fontHeading }}>
              Nothing on the shelf called “{query.trim()}”
            </h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: N }}>
              We only print a few new things a month, so the catalogue is small on purpose. Try a shorter word,
              or have a look through the shelves.
            </p>
            <ul className="mt-4 flex flex-wrap justify-center gap-2">
              {SEARCH_SUGGESTIONS.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    onClick={() => onSearch(s)}
                    className="ps-chip ps-focus px-3 py-2 text-sm font-semibold"
                    style={{ borderRadius: 999, border: `1px solid ${hexToRgba(P, 0.3)}`, color: P }}
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
            <Button
              onClick={() => {
                onSearch("");
                setCat("all");
                setReadyOnly(false);
              }}
              className="ps-focus mt-5 px-5 py-2.5 text-sm font-semibold text-white"
              style={{ backgroundColor: P, borderRadius: R, border: "none" }}
            >
              Browse all {published.length} models
            </Button>
          </Panel>
        ) : readyOnly ? (
          <Panel>
            <Icons.Clock className="mx-auto w-7 h-7" style={{ color: P }} aria-hidden="true" />
            <h3 className="mt-3 text-lg font-bold" style={{ fontFamily: brand.fontHeading }}>
              Nothing boxed up on this shelf today
            </h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: N }}>
              Everything in {activeCat.name} is printed to order at the moment. Turn the filter off to see them
              with their lead times.
            </p>
            <Button
              onClick={() => {
                setReadyOnly(false);
                resetPaging();
              }}
              className="ps-focus mt-5 px-5 py-2.5 text-sm font-semibold text-white"
              style={{ backgroundColor: P, borderRadius: R, border: "none" }}
            >
              Show printed-to-order too
            </Button>
          </Panel>
        ) : (
          <Panel>
            <Icons.Package className="mx-auto w-7 h-7" style={{ color: P }} aria-hidden="true" />
            <h3 className="mt-3 text-lg font-bold" style={{ fontFamily: brand.fontHeading }}>
              The {activeCat.name} shelf is bare
            </h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: N }}>
              This year's advent and seasonal prints go on sale on 1 November. Everything else is ready now.
            </p>
            <Button
              onClick={() => chooseCat("all")}
              className="ps-focus mt-5 px-5 py-2.5 text-sm font-semibold text-white"
              style={{ backgroundColor: P, borderRadius: R, border: "none" }}
            >
              Browse everything
            </Button>
          </Panel>
        )}

        {/* ---------- Pagination / load error ---------- */}
        {!switching && shown.length > 0 && (
          <div className="mt-8 flex flex-col items-center gap-3">
            {pageState === "error" ? (
              <div
                className="ps-panel w-full max-w-md px-5 py-4 text-left"
                role="alert"
                style={{
                  borderRadius: RL,
                  backgroundColor: "#FFFFFF",
                  border: `1px solid ${hexToRgba(A, 0.5)}`,
                }}
              >
                <p className="flex items-center gap-2 text-sm font-bold">
                  <Icons.AlertCircle className="w-4 h-4" style={{ color: A }} aria-hidden="true" />
                  The next eight didn't come through
                </p>
                <p className="mt-1.5 text-sm leading-relaxed" style={{ color: N }}>
                  The shop lost its connection part-way through loading. Your search and shelf are still set —
                  the {shown.length} models above haven't moved.
                </p>
                <Button
                  onClick={loadMore}
                  className="ps-focus mt-3 px-4 py-2 text-sm font-semibold text-white"
                  style={{ backgroundColor: P, borderRadius: R, border: "none" }}
                >
                  Try loading them again
                </Button>
              </div>
            ) : remaining > 0 ? (
              <Button
                onClick={loadMore}
                disabled={pageState === "loading"}
                className="ps-focus px-6 py-3 text-sm font-semibold"
                style={{
                  backgroundColor: "#FFFFFF",
                  color: P,
                  border: `1px solid ${hexToRgba(P, 0.4)}`,
                  borderRadius: 999,
                  opacity: pageState === "loading" ? 0.7 : 1,
                }}
              >
                {pageState === "loading"
                  ? "Fetching more…"
                  : `Show ${Math.min(8, remaining)} more (${remaining} left)`}
              </Button>
            ) : (
              <p className="text-sm" style={{ color: N }}>
                That's the lot — {results.length} of {results.length} shown.
              </p>
            )}
          </div>
        )}
      </section>

      {/* ---------- Footer strip ---------- */}
      <footer className="mt-12 border-t pt-6" style={{ borderColor: hexToRgba(N, 0.16) }}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-relaxed" style={{ color: N }}>
            Prices include VAT at 20%. Posted Monday to Friday from {SHOP.town}.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              onClick={() => navigate("cart-checkout")}
              className="ps-focus inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white"
              style={{ backgroundColor: P, borderRadius: R, border: "none" }}
            >
              <Icons.Package className="w-4 h-4" aria-hidden="true" />
              View basket
            </Button>
            <Button
              onClick={() => navigate("account")}
              className="ps-focus inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold"
              style={{
                backgroundColor: "#FFFFFF",
                color: "#3F3B4E",
                border: `1px solid ${hexToRgba(N, 0.26)}`,
                borderRadius: R,
              }}
            >
              <Icons.User className="w-4 h-4" aria-hidden="true" />
              My orders
            </Button>
            <button
              ref={staffBtn}
              type="button"
              onClick={() => setStaffNotice((s) => !s)}
              aria-expanded={staffNotice}
              className="ps-focus px-2 py-2 text-sm underline underline-offset-2"
              style={{ color: N }}
            >
              Shop staff
            </button>
          </div>
        </div>

        {staffNotice && (
          <div
            className="ps-panel mt-4 px-5 py-4"
            role="note"
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setStaffNotice(false);
                staffBtn.current && staffBtn.current.focus();
              }
            }}
            style={{
              borderRadius: RL,
              backgroundColor: "#FFFFFF",
              border: `1px solid ${hexToRgba(N, 0.2)}`,
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-sm font-bold">The admin area is staff only</h2>
                <p className="mt-1.5 max-w-prose text-sm leading-relaxed" style={{ color: N }}>
                  You're browsing as a customer, and a customer account doesn't open the order queue. Nia Harker
                  (shop owner) can add a staff login for you — email nia@pocketshelf.co.uk.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button
                    onClick={() => navigate("admin-orders")}
                    className="ps-focus px-4 py-2 text-sm font-semibold text-white"
                    style={{ backgroundColor: P, borderRadius: R, border: "none" }}
                  >
                    Go to staff sign-in
                  </Button>
                  <Button
                    onClick={() => {
                      setStaffNotice(false);
                      staffBtn.current && staffBtn.current.focus();
                    }}
                    className="ps-focus px-4 py-2 text-sm font-semibold"
                    style={{
                      backgroundColor: "#FFFFFF",
                      color: "#3F3B4E",
                      border: `1px solid ${hexToRgba(N, 0.26)}`,
                      borderRadius: R,
                    }}
                  >
                    Keep shopping
                  </Button>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setStaffNotice(false);
                  staffBtn.current && staffBtn.current.focus();
                }}
                aria-label="Dismiss staff sign-in note"
                className="ps-focus p-1.5"
                style={{ color: N, borderRadius: 999 }}
              >
                <Icons.X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </footer>
    </div>
  );
}
