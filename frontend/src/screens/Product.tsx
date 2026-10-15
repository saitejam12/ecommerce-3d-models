// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

const { Button, Card, CardContent, Label, Badge, Separator } = UI;
const { Check, X, ChevronRight, Package, Clock, ArrowLeft, ArrowRight, AlertCircle, CheckCircle } = Icons;

const DIMS = ['Colour', 'Size', 'Finish'];

const SWATCH = {
  'Ember Orange': '#F2662F',
  'Deep Violet': '#4B2E9E',
  'Glow Mint': '#8FE3C2',
  'Galaxy Black': '#2A2633',
  'Bubblegum Pink': '#F78FB3',
  'Clear Blue': '#8FC7E8',
  'Honey Amber': '#E8A33D',
};

const money = (n) => '£' + n.toFixed(2);

const SHOP = {
  freeThreshold: 45,
  postage: [
    ['Standard, 2–4 working days', '£3.49'],
    ['Tracked 24, next working day', '£4.95'],
  ],
};

const PRODUCTS = [
  {
    id: 'p-dragon',
    slug: 'hoard-dragon',
    glyph: '🐉',
    name: 'Hoard Dragon, Shelf Guardian',
    category: 'Dragons & Beasts',
    tagline: 'A chunky little dragon that perches on a shelf edge and keeps an eye on your pens.',
    tone: '#F2662F',
    images: [
      { id: 'd1', label: 'Front three-quarter, 100 mm in Ember Orange' },
      { id: 'd2', label: 'Wing and scale detail, close up' },
      { id: 'd3', label: 'Perched on a shelf edge beside a mug' },
      { id: 'd4', label: 'All three sizes lined up for scale' },
    ],
    description: [
      'Printed in one piece at 0.12 mm so the scales stay crisp, then hand-sanded along the wing edges and sealed. The tail hooks over a shelf lip, a monitor edge or the side of a pen pot.',
      'The 60 mm and 100 mm sizes sit on the shelf here and post the same day if you order before 2 pm. The 160 mm guardian takes nine hours on the printer, so it is made for you after you order.',
    ],
    care: [
      'PLA+ softens in a hot car or on a sunny windowsill. Keep it indoors and out of direct afternoon sun.',
      'Dust with a dry brush. If it needs more, warm soapy water and a soft cloth — never the dishwasher, and no alcohol wipes on the silk finish.',
    ],
    specs: [
      ['Material', 'PLA+, plant-based'],
      ['Layer height', '0.12 mm'],
      ['Weight', '48 g at 100 mm'],
      ['Designed by', 'Pocket Shelf Studio'],
      ['Product code', 'PS-DRG-01'],
    ],
    variants: [
      { id: 'drg-1', options: { Colour: 'Ember Orange', Size: '60 mm', Finish: 'Matte' }, price: 14, fulfilment_type: 'stocked', stock_count: 6, lead_time: null, active: true },
      { id: 'drg-2', options: { Colour: 'Ember Orange', Size: '100 mm', Finish: 'Matte' }, price: 24, fulfilment_type: 'stocked', stock_count: 2, lead_time: null, active: true },
      { id: 'drg-3', options: { Colour: 'Ember Orange', Size: '160 mm', Finish: 'Silk' }, price: 42, fulfilment_type: 'print_to_order', stock_count: null, lead_time: '5–7 working days to print', active: true },
      { id: 'drg-4', options: { Colour: 'Deep Violet', Size: '60 mm', Finish: 'Matte' }, price: 14, fulfilment_type: 'stocked', stock_count: 0, lead_time: null, active: true },
      { id: 'drg-5', options: { Colour: 'Deep Violet', Size: '100 mm', Finish: 'Matte' }, price: 24, fulfilment_type: 'stocked', stock_count: 5, lead_time: null, active: true },
      { id: 'drg-6', options: { Colour: 'Deep Violet', Size: '160 mm', Finish: 'Silk' }, price: 42, fulfilment_type: 'print_to_order', stock_count: null, lead_time: '5–7 working days to print', active: true },
      { id: 'drg-7', options: { Colour: 'Glow Mint', Size: '60 mm', Finish: 'Silk' }, price: 16, fulfilment_type: 'stocked', stock_count: 3, lead_time: null, active: true },
      { id: 'drg-8', options: { Colour: 'Glow Mint', Size: '100 mm', Finish: 'Silk' }, price: 26, fulfilment_type: 'print_to_order', stock_count: null, lead_time: '3–5 working days to print', active: true },
      { id: 'drg-9', options: { Colour: 'Galaxy Black', Size: '100 mm', Finish: 'Matte' }, price: 25, fulfilment_type: 'stocked', stock_count: 0, lead_time: null, active: true },
      { id: 'drg-10', options: { Colour: 'Galaxy Black', Size: '160 mm', Finish: 'Matte' }, price: 44, fulfilment_type: 'print_to_order', stock_count: null, lead_time: '5–7 working days to print', active: true },
      { id: 'drg-11', options: { Colour: 'Galaxy Black', Size: '60 mm', Finish: 'Matte' }, price: 14, fulfilment_type: 'stocked', stock_count: 0, lead_time: null, active: false },
    ],
  },
  {
    id: 'p-axolotl',
    slug: 'pocket-axolotl',
    glyph: '🦎',
    name: 'Pocket Axolotl Charm',
    category: 'Desk Pets',
    tagline: 'Smiling, slightly smug, fits in a coat pocket or clips onto a bag.',
    tone: '#8FE3C2',
    images: [
      { id: 'a1', label: 'Pair of charms in Glow Mint and Bubblegum Pink' },
      { id: 'a2', label: 'Clipped to a rucksack strap' },
      { id: 'a3', label: 'Glow finish photographed in the dark' },
    ],
    description: [
      'Forty-five millimetres of unbothered amphibian. The charm size comes with a split ring fitted; the desk size stands on its own four feet.',
      'The Clear Blue version is printed in glow-in-the-dark filament, which we only load on print days, so it is made to order.',
    ],
    care: [
      'The split ring is stainless steel and can be swapped for your own keyring.',
      'Charge the glow finish under a lamp for a minute and it will hold for about half an hour.',
    ],
    specs: [
      ['Material', 'PLA+, plant-based'],
      ['Layer height', '0.10 mm'],
      ['Weight', '9 g at 45 mm'],
      ['Designed by', 'Pocket Shelf Studio'],
      ['Product code', 'PS-AXO-02'],
    ],
    variants: [
      { id: 'axo-1', options: { Colour: 'Glow Mint', Size: '45 mm charm', Finish: 'Matte' }, price: 9.5, fulfilment_type: 'stocked', stock_count: 12, lead_time: null, active: true },
      { id: 'axo-2', options: { Colour: 'Glow Mint', Size: '80 mm desk', Finish: 'Matte' }, price: 16, fulfilment_type: 'stocked', stock_count: 4, lead_time: null, active: true },
      { id: 'axo-3', options: { Colour: 'Bubblegum Pink', Size: '45 mm charm', Finish: 'Matte' }, price: 9.5, fulfilment_type: 'stocked', stock_count: 0, lead_time: null, active: true },
      { id: 'axo-4', options: { Colour: 'Bubblegum Pink', Size: '80 mm desk', Finish: 'Matte' }, price: 16, fulfilment_type: 'stocked', stock_count: 7, lead_time: null, active: true },
      { id: 'axo-5', options: { Colour: 'Clear Blue', Size: '45 mm charm', Finish: 'Glow' }, price: 11, fulfilment_type: 'print_to_order', stock_count: null, lead_time: '3–5 working days to print', active: true },
      { id: 'axo-6', options: { Colour: 'Clear Blue', Size: '80 mm desk', Finish: 'Glow' }, price: 18.5, fulfilment_type: 'print_to_order', stock_count: null, lead_time: '3–5 working days to print', active: true },
    ],
  },
  {
    id: 'p-mushroom',
    slug: 'mushroom-lamp-topper',
    glyph: '🍄',
    name: 'Mushroom Lamp Topper',
    category: 'Lighting',
    tagline: 'Slips over a standard E14 bulb fitting and turns a bedside lamp into a toadstool.',
    tone: '#E8A33D',
    images: [
      { id: 'm1', label: 'Lit at dusk on a bedside table' },
      { id: 'm2', label: 'Translucent finish showing the gill pattern' },
    ],
    description: [
      'Vase-mode printed with a 0.8 mm wall so the light comes through the gills. Sits over the shade ring of most E14 bedside lamps — measure 42 mm across the ring before ordering.',
      'Every topper is printed after you order; nothing in this range is kept on the shelf.',
    ],
    care: [
      'LED bulbs only, 6 W or less. PLA will not take the heat from a halogen or filament bulb.',
      'Wipe cold, never while the lamp is on.',
    ],
    specs: [
      ['Material', 'PLA+, plant-based'],
      ['Wall thickness', '0.8 mm, vase mode'],
      ['Fitting', 'E14 shade ring, 42 mm'],
      ['Designed by', 'Pocket Shelf Studio'],
      ['Product code', 'PS-MSH-07'],
    ],
    variants: [
      { id: 'msh-1', options: { Colour: 'Honey Amber', Size: '90 mm', Finish: 'Silk' }, price: 18, fulfilment_type: 'print_to_order', stock_count: null, lead_time: '4–6 working days to print', active: true },
      { id: 'msh-2', options: { Colour: 'Honey Amber', Size: '90 mm', Finish: 'Translucent' }, price: 19.5, fulfilment_type: 'print_to_order', stock_count: null, lead_time: '4–6 working days to print', active: true },
      { id: 'msh-3', options: { Colour: 'Deep Violet', Size: '90 mm', Finish: 'Silk' }, price: 18, fulfilment_type: 'print_to_order', stock_count: null, lead_time: '4–6 working days to print', active: true },
      { id: 'msh-4', options: { Colour: 'Deep Violet', Size: '90 mm', Finish: 'Translucent' }, price: 19.5, fulfilment_type: 'print_to_order', stock_count: null, lead_time: '4–6 working days to print', active: true },
    ],
  },
  {
    id: 'p-kraken',
    slug: 'desk-kraken',
    glyph: '🐙',
    name: 'Desk Kraken Cable Keeper',
    category: 'Dragons & Beasts',
    tagline: 'Eight arms, each one holding onto a charging cable so your desk does not.',
    tone: '#2A2633',
    images: [
      { id: 'k1', label: 'Holding three cables at the back of a desk' },
      { id: 'k2', label: 'Underside showing the grippy pad' },
    ],
    description: [
      'The February batch sold out in a weekend. The next run goes on the printers once the current dragon orders clear, and the shelf count here updates the moment they come off the bed.',
    ],
    care: ['Peel the backing pad off gently if you move it; warm the pad with a hairdryer first.'],
    specs: [
      ['Material', 'PLA+, plant-based'],
      ['Layer height', '0.16 mm'],
      ['Weight', '61 g'],
      ['Designed by', 'Pocket Shelf Studio'],
      ['Product code', 'PS-KRK-04'],
    ],
    variants: [
      { id: 'krk-1', options: { Colour: 'Galaxy Black', Size: '120 mm', Finish: 'Matte' }, price: 22, fulfilment_type: 'stocked', stock_count: 0, lead_time: null, active: true },
      { id: 'krk-2', options: { Colour: 'Deep Violet', Size: '120 mm', Finish: 'Matte' }, price: 22, fulfilment_type: 'stocked', stock_count: 0, lead_time: null, active: true },
    ],
  },
];

const TABS = [
  { id: 'desc', label: 'Description' },
  { id: 'care', label: 'Printing & care' },
  { id: 'delivery', label: 'Delivery & returns' },
];

const activeVariants = (p) => p.variants.filter((v) => v.active);

const fits = (v, sel) => DIMS.every((d) => !sel[d] || v.options[d] === sel[d]);

function reconcile(p, sel, changedDim) {
  let s = { ...sel };
  const list = activeVariants(p);
  if (!list.some((v) => fits(v, s))) {
    const others = DIMS.filter((d) => d !== changedDim);
    let fixed = false;
    for (const d of others) {
      const test = { ...s, [d]: null };
      if (list.some((v) => fits(v, test))) {
        s = test;
        fixed = true;
        break;
      }
    }
    if (!fixed) others.forEach((d) => { s[d] = null; });
  }
  DIMS.forEach((d) => {
    if (!s[d]) {
      const probe = { ...s, [d]: null };
      const vals = [...new Set(list.filter((v) => fits(v, probe)).map((v) => v.options[d]))];
      if (vals.length === 1) s[d] = vals[0];
    }
  });
  return s;
}

function availability(v) {
  if (!v) return null;
  if (v.fulfilment_type === 'print_to_order') {
    return { key: 'pto', word: 'Printed to order', detail: v.lead_time, Icon: Icons.Clock, buyable: true };
  }
  if (v.stock_count <= 0) {
    return { key: 'out', word: 'Sold out', detail: 'This one is off the shelf for now', Icon: Icons.X, buyable: false };
  }
  if (v.stock_count <= 3) {
    return { key: 'low', word: 'Low stock', detail: 'Only ' + v.stock_count + ' left, posted today if you order before 2 pm', Icon: Icons.AlertCircle, buyable: true };
  }
  return { key: 'in', word: 'In stock', detail: v.stock_count + ' on the shelf, posted today if you order before 2 pm', Icon: Icons.CheckCircle, buyable: true };
}

function summarise(p) {
  const list = activeVariants(p);
  if (list.some((v) => v.fulfilment_type === 'stocked' && v.stock_count > 0)) return 'In stock';
  if (list.some((v) => v.fulfilment_type === 'print_to_order')) return 'Printed to order';
  return 'Sold out';
}

export default function Screen() {
  const navigate = useNavigate();
  const { Button, Badge, Card, CardContent, Separator, Label } = UI;

  const [productId, setProductId] = React.useState('p-dragon');
  const product = PRODUCTS.find((p) => p.id === productId);

  const [sel, setSel] = React.useState(() => reconcile(PRODUCTS[0], {}, null));
  const [photo, setPhoto] = React.useState(0);
  const [qty, setQty] = React.useState(1);
  const [tab, setTab] = React.useState('desc');
  const [notice, setNotice] = React.useState(null); // {kind:'prompt'|'cap', text}
  const [added, setAdded] = React.useState(null);
  const [stockAgeMins, setStockAgeMins] = React.useState(6);
  const [cart, setCart] = React.useState([
    { variantId: 'axo-1', product: 'Pocket Axolotl Charm', options: 'Glow Mint / 45 mm charm / Matte', unit_price: 9.5, quantity: 1 },
  ]);

  const list = activeVariants(product);
  const selected = DIMS.every((d) => sel[d]) ? list.find((v) => fits(v, sel)) || null : null;
  const avail = availability(selected);
  const prices = list.map((v) => v.price);
  const lowest = Math.min.apply(null, prices);
  const highest = Math.max.apply(null, prices);
  const maxQty = selected ? (selected.fulfilment_type === 'stocked' ? selected.stock_count : 10) : 10;
  const cartCount = cart.reduce((n, l) => n + l.quantity, 0);
  const cartTotal = cart.reduce((n, l) => n + l.quantity * l.unit_price, 0);
  const tint = (sel.Colour && SWATCH[sel.Colour]) || product.tone;
  const inStockAlt = list.find((v) => (v.fulfilment_type === 'stocked' && v.stock_count > 0) || v.fulfilment_type === 'print_to_order');

  const headingFont = { fontFamily: brand.fontHeading };
  const bodyFont = { fontFamily: brand.fontBody };
  const focus = 'focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';
  const cardStyle = { borderRadius: 'calc(' + brand.radius + ' * 2)', backgroundColor: '#FFFFFF', border: '1px solid ' + brand.neutralColor + '22' };

  function pick(dim, val) {
    setSel((s) => reconcile(product, { ...s, [dim]: val }, dim));
    setQty(1);
    setNotice(null);
    setAdded(null);
  }

  function switchProduct(id) {
    const p = PRODUCTS.find((x) => x.id === id);
    setProductId(id);
    setSel(reconcile(p, {}, null));
    setPhoto(0);
    setQty(1);
    setTab('desc');
    setNotice(null);
    setAdded(null);
    if (typeof window !== 'undefined' && window.scrollTo) window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function changeQty(next) {
    if (next < 1) return;
    if (selected && selected.fulfilment_type === 'stocked' && next > selected.stock_count) {
      setQty(selected.stock_count);
      setNotice({ kind: 'cap', text: 'We only have ' + selected.stock_count + ' of this one on the shelf, so the quantity is capped at ' + selected.stock_count + '. Need more? The 160 mm size is printed to order.' });
      return;
    }
    if (next > 10) {
      setQty(10);
      setNotice({ kind: 'cap', text: 'Ten per order is our limit on printed-to-order items. Email us for a bigger batch and we will quote you.' });
      return;
    }
    setNotice(null);
    setQty(next);
  }

  function addToCart() {
    if (!selected) {
      const missing = DIMS.filter((d) => !sel[d]);
      setNotice({ kind: 'prompt', text: 'Choose a ' + missing.map((m) => m.toLowerCase()).join(' and a ') + ' before adding this to your bag.' });
      const el = document.getElementById('opt-' + missing[0]);
      if (el) el.focus();
      return;
    }
    if (!avail.buyable) return;
    setCart((prev) => {
      const i = prev.findIndex((l) => l.variantId === selected.id);
      if (i > -1) {
        const copy = prev.slice();
        copy[i] = { ...copy[i], quantity: Math.min(copy[i].quantity + qty, maxQty) };
        return copy;
      }
      return prev.concat([{
        variantId: selected.id,
        product: product.name,
        options: DIMS.map((d) => selected.options[d]).join(' / '),
        unit_price: selected.price,
        quantity: qty,
      }]);
    });
    setNotice(null);
    setAdded({ qty: qty, options: DIMS.map((d) => selected.options[d]).join(' / '), price: selected.price * qty, lead: selected.fulfilment_type === 'print_to_order' ? selected.lead_time : null });
  }

  function onTabKey(e, i) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const n = (i + (e.key === 'ArrowRight' ? 1 : -1) + TABS.length) % TABS.length;
    setTab(TABS[n].id);
    const el = document.getElementById('tab-' + TABS[n].id);
    if (el) el.focus();
  }

  const photoBg = (t) => ({
    background: 'radial-gradient(120% 110% at 28% 12%, #FFFFFF 0%, ' + t + '26 42%, ' + t + 'AA 100%)',
  });

  const tabPanel = {
    desc: (
      <div className="space-y-4">
        {product.description.map((para, i) => (
          <p key={i} className="max-w-prose text-[15px] leading-relaxed" style={{ color: brand.neutralColor }}>{para}</p>
        ))}
        <dl className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {product.specs.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-4 border-b pb-2" style={{ borderColor: brand.neutralColor + '1F' }}>
              <dt className="text-xs font-semibold uppercase tracking-wide" style={{ color: brand.neutralColor }}>{k}</dt>
              <dd className="text-sm" style={{ fontVariantNumeric: 'tabular-nums' }}>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    ),
    care: (
      <ul className="space-y-3">
        {product.care.map((c, i) => (
          <li key={i} className="flex max-w-prose gap-3 text-[15px] leading-relaxed" style={{ color: brand.neutralColor }}>
            <Icons.Check className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" style={{ color: brand.primaryColor }} />
            <span>{c}</span>
          </li>
        ))}
      </ul>
    ),
    delivery: (
      <div className="space-y-4">
        <ul className="space-y-2">
          {SHOP.postage.map(([name, price]) => (
            <li key={name} className="flex items-center justify-between gap-4 border-b pb-2 text-[15px]" style={{ borderColor: brand.neutralColor + '1F' }}>
              <span>{name}</span>
              <span className="font-semibold" style={{ fontVariantNumeric: 'tabular-nums' }}>{price}</span>
            </li>
          ))}
        </ul>
        <p className="max-w-prose text-[15px] leading-relaxed" style={{ color: brand.neutralColor }}>
          Postage is free on orders over {money(SHOP.freeThreshold)}. We post within the UK only, and all prices include VAT at 20%.
        </p>
        <p className="max-w-prose text-[15px] leading-relaxed" style={{ color: brand.neutralColor }}>
          Shelf stock can come back within 14 days, unopened. Printed-to-order pieces are made for you so we cannot resell them — but if one arrives warped, stringy or snapped, send us a photo within 48 hours and we will reprint it.
        </p>
      </div>
    ),
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-4 sm:px-6" style={bodyFont}>
      <style>{`
        @keyframes ps-rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        @keyframes ps-pop { 0% { transform: scale(0.92); } 60% { transform: scale(1.06); } 100% { transform: scale(1); } }
        .ps-rise { animation: ps-rise 260ms cubic-bezier(.2,.9,.3,1.2) both; }
        .ps-pop { animation: ps-pop 300ms cubic-bezier(.2,.9,.3,1.2) both; }
        .ps-trans { transition: transform 140ms ease, box-shadow 140ms ease, background-color 140ms ease, opacity 140ms ease; }
        .ps-trans:active { transform: translateY(1px); }
        @media (prefers-reduced-motion: reduce) {
          .ps-rise, .ps-pop { animation: none !important; }
          .ps-trans { transition: none !important; }
        }
      `}</style>

      {/* top row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => navigate('catalogue')}
          className={'inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium ps-trans ' + focus}
          style={{ color: brand.primaryColor, outlineColor: brand.primaryColor, backgroundColor: brand.primaryColor + '12' }}
        >
          <Icons.ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All of {product.category}
        </button>

        <button
          type="button"
          onClick={() => navigate('cart-checkout')}
          className={'inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium ps-trans ' + focus}
          style={{ borderColor: brand.neutralColor + '33', backgroundColor: '#FFFFFF', outlineColor: brand.primaryColor }}
        >
          <Icons.Package className="h-4 w-4" aria-hidden="true" style={{ color: brand.neutralColor }} />
          <span>Bag</span>
          <span
            key={cartCount}
            className="ps-pop inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-bold text-white"
            style={{ backgroundColor: brand.accentColor, fontVariantNumeric: 'tabular-nums' }}
          >
            {cartCount}
          </span>
          <span className="sr-only">items in your bag, total {money(cartTotal)}. Go to bag and checkout</span>
          <span aria-hidden="true" className="hidden text-xs sm:inline" style={{ color: brand.neutralColor, fontVariantNumeric: 'tabular-nums' }}>{money(cartTotal)}</span>
        </button>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-12">
        {/* ---------------- gallery ---------------- */}
        <section aria-labelledby="gallery-h">
          <h2 id="gallery-h" className="sr-only">Photos of {product.name}</h2>
          <div className="relative overflow-hidden" style={{ ...cardStyle, padding: '0' }}>
            <div className="relative aspect-square w-full" style={photoBg(tint)}>
              <span aria-hidden="true" className="absolute inset-0 grid place-items-center text-[7rem] sm:text-[10rem]">{product.glyph}</span>
              {avail && avail.key === 'pto' && (
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-white" style={{ backgroundColor: brand.accentColor }}>
                  <Icons.Clock className="h-3.5 w-3.5" aria-hidden="true" /> Printed to order
                </span>
              )}
              {avail && avail.key === 'out' && (
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-white" style={{ backgroundColor: brand.neutralColor }}>
                  <Icons.X className="h-3.5 w-3.5" aria-hidden="true" /> Sold out
                </span>
              )}
              <p className="absolute inset-x-0 bottom-0 px-4 py-3 text-xs font-medium text-white" style={{ background: 'linear-gradient(transparent, rgba(24,18,46,0.62))' }}>
                Photo {photo + 1} of {product.images.length} — {product.images[photo].label}
              </p>
            </div>
          </div>

          <ul className="mt-3 flex gap-3 overflow-x-auto pb-1" aria-label="Choose a photo to enlarge">
            {product.images.map((img, i) => (
              <li key={img.id}>
                <button
                  type="button"
                  onClick={() => setPhoto(i)}
                  aria-pressed={photo === i}
                  className={'relative h-16 w-16 shrink-0 overflow-hidden ps-trans sm:h-20 sm:w-20 ' + focus}
                  style={{
                    ...photoBg(tint),
                    borderRadius: brand.radius,
                    boxShadow: photo === i ? '0 0 0 2px ' + brand.primaryColor : '0 0 0 1px ' + brand.neutralColor + '2E',
                    outlineColor: brand.primaryColor,
                    opacity: photo === i ? 1 : 0.75,
                  }}
                >
                  <span aria-hidden="true" className="absolute inset-0 grid place-items-center text-2xl sm:text-3xl">{product.glyph}</span>
                  <span className="sr-only">{img.label}</span>
                  {photo === i && <span className="sr-only">, shown now</span>}
                </button>
              </li>
            ))}
          </ul>

          <p className="mt-3 text-xs" style={{ color: brand.neutralColor }}>
            Photographed here in the workshop. Real prints, no renders — colours shift a little between filament batches.
          </p>
        </section>

        {/* ---------------- buy box ---------------- */}
        <section aria-labelledby="buy-h" className="lg:sticky lg:top-6 lg:self-start">
          <Badge>
            <span style={{ color: brand.primaryColor }}>{product.category}</span>
          </Badge>

          <h1 id="buy-h" className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl" style={headingFont}>
            {product.name}
          </h1>
          <p className="mt-2 max-w-prose text-[15px] leading-relaxed" style={{ color: brand.neutralColor }}>{product.tagline}</p>

          <p className="mt-5 flex items-baseline gap-2">
            <span className="text-4xl font-bold tracking-tight" style={{ fontVariantNumeric: 'tabular-nums', color: brand.primaryColor }}>
              {selected ? money(selected.price) : money(lowest)}
            </span>
            {!selected && lowest !== highest && (
              <span className="text-base" style={{ color: brand.neutralColor, fontVariantNumeric: 'tabular-nums' }}>– {money(highest)}</span>
            )}
            <span className="text-xs" style={{ color: brand.neutralColor }}>inc. VAT</span>
          </p>

          {/* availability */}
          <div className="mt-4" style={{ minHeight: '58px' }}>
            {avail ? (
              <div
                key={selected.id}
                className="ps-rise flex items-start gap-3 rounded-xl px-3 py-3"
                style={{
                  backgroundColor: avail.key === 'pto' ? brand.accentColor + '1A' : avail.key === 'out' ? brand.neutralColor + '14' : brand.primaryColor + '12',
                }}
              >
                <avail.Icon
                  className="mt-0.5 h-5 w-5 shrink-0"
                  aria-hidden="true"
                  style={{ color: avail.key === 'pto' ? brand.accentColor : avail.key === 'out' ? brand.neutralColor : brand.primaryColor }}
                />
                <p className="text-sm">
                  <span className="font-semibold">{avail.word}</span>
                  <span className="block" style={{ color: brand.neutralColor, fontVariantNumeric: 'tabular-nums' }}>{avail.detail}</span>
                </p>
              </div>
            ) : (
              <p className="rounded-xl px-3 py-3 text-sm" style={{ backgroundColor: brand.neutralColor + '12', color: brand.neutralColor }}>
                Pick your options to see the price, what is on the shelf and when it posts.
              </p>
            )}
          </div>

          {/* options */}
          <div className="mt-6 space-y-6">
            {DIMS.map((dim) => {
              const probe = { ...sel, [dim]: null };
              const values = [...new Set(list.map((v) => v.options[dim]))];
              return (
                <fieldset key={dim}>
                  <legend className="mb-2 flex w-full items-baseline justify-between gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider">{dim}</span>
                    <span className="text-sm" style={{ color: brand.neutralColor }}>{sel[dim] || 'not chosen yet'}</span>
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {values.map((val, vi) => {
                      const enabled = list.some((v) => v.options[dim] === val && fits(v, probe));
                      const isSel = sel[dim] === val;
                      return (
                        <button
                          key={val}
                          id={vi === 0 ? 'opt-' + dim : undefined}
                          type="button"
                          disabled={!enabled}
                          onClick={() => pick(dim, val)}
                          aria-pressed={isSel}
                          className={'inline-flex items-center gap-2 rounded-full border px-3.5 py-2.5 text-sm font-medium ps-trans ' + focus + (enabled ? '' : ' cursor-not-allowed line-through opacity-45')}
                          style={{
                            borderColor: isSel ? brand.primaryColor : brand.neutralColor + '33',
                            borderWidth: isSel ? '2px' : '1px',
                            backgroundColor: isSel ? brand.primaryColor + '12' : '#FFFFFF',
                            color: isSel ? brand.primaryColor : 'inherit',
                            outlineColor: brand.primaryColor,
                          }}
                        >
                          {dim === 'Colour' && (
                            <span
                              aria-hidden="true"
                              className="h-4 w-4 rounded-full"
                              style={{ backgroundColor: SWATCH[val] || brand.neutralColor, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.18)' }}
                            />
                          )}
                          {val}
                          {isSel && <Icons.Check className="h-4 w-4" aria-hidden="true" />}
                          {!enabled && <span className="sr-only"> (not made in the combination you have chosen)</span>}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              );
            })}
          </div>

          <p className="mt-3 text-xs" style={{ color: brand.neutralColor }}>
            Faded, struck-through options are not printed in the combination you have chosen. Pick them and we will adjust the rest.
          </p>

          {/* quantity + add */}
          <div className="mt-6 flex flex-wrap items-end gap-4">
            <div>
              <Label htmlFor="qty-input">
                <span className="text-xs font-bold uppercase tracking-wider">Quantity</span>
              </Label>
              <div className="mt-1.5 inline-flex items-center rounded-full border" style={{ borderColor: brand.neutralColor + '33', backgroundColor: '#FFFFFF' }}>
                <button
                  type="button"
                  onClick={() => changeQty(qty - 1)}
                  disabled={qty <= 1}
                  aria-label="Decrease quantity"
                  className={'grid h-11 w-11 place-items-center rounded-full text-lg font-bold ps-trans disabled:opacity-35 ' + focus}
                  style={{ color: brand.primaryColor, outlineColor: brand.primaryColor }}
                >
                  −
                </button>
                <input
                  id="qty-input"
                  type="text"
                  inputMode="numeric"
                  value={qty}
                  onChange={(e) => {
                    const n = parseInt(e.target.value.replace(/\D/g, ''), 10);
                    changeQty(isNaN(n) ? 1 : n);
                  }}
                  className={'w-10 border-0 bg-transparent text-center text-base font-semibold ' + focus}
                  style={{ fontVariantNumeric: 'tabular-nums', outlineColor: brand.primaryColor }}
                />
                <button
                  type="button"
                  onClick={() => changeQty(qty + 1)}
                  disabled={!!selected && qty >= maxQty}
                  aria-label="Increase quantity"
                  className={'grid h-11 w-11 place-items-center rounded-full text-lg font-bold ps-trans disabled:opacity-35 ' + focus}
                  style={{ color: brand.primaryColor, outlineColor: brand.primaryColor }}
                >
                  +
                </button>
              </div>
            </div>

            <div className="min-w-[200px] flex-1">
              <Button
                type="button"
                onClick={addToCart}
                disabled={!!selected && !avail.buyable}
                className={'w-full px-6 py-4 text-base font-bold ps-trans ' + focus}
                style={{
                  backgroundColor: selected && !avail.buyable ? brand.neutralColor + '2E' : brand.primaryColor,
                  color: selected && !avail.buyable ? brand.neutralColor : '#FFFFFF',
                  borderRadius: '999px',
                  outlineColor: brand.primaryColor,
                  boxShadow: selected && !avail.buyable ? 'none' : '0 8px 18px -8px ' + brand.primaryColor,
                  width: '100%',
                }}
              >
                {selected && !avail.buyable
                  ? 'Sold out in this colour'
                  : 'Add to bag' + (selected ? ' · ' + money(selected.price * qty) : '')}
              </Button>
            </div>
          </div>

          {/* live messages */}
          <div role="status" aria-live="polite" className="mt-3">
            {notice && (
              <p
                className="ps-rise flex items-start gap-2 rounded-xl px-3 py-2.5 text-sm"
                style={{ backgroundColor: brand.accentColor + '1F', color: '#7A2E12' }}
              >
                <Icons.AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{notice.text}</span>
              </p>
            )}

            {selected && !avail.buyable && inStockAlt && (
              <div className="ps-rise mt-3 rounded-xl px-3 py-3 text-sm" style={{ backgroundColor: brand.neutralColor + '12' }}>
                <p style={{ color: brand.neutralColor }}>
                  The {sel.Colour} at {sel.Size} is off the shelf. The next batch goes on the printer this week.
                </p>
                <button
                  type="button"
                  onClick={() => { setSel(reconcile(product, { ...inStockAlt.options }, 'Colour')); setQty(1); setNotice(null); }}
                  className={'mt-2 text-sm font-semibold underline underline-offset-4 ' + focus}
                  style={{ color: brand.primaryColor, outlineColor: brand.primaryColor }}
                >
                  Show me one I can buy today
                </button>
              </div>
            )}

            {added && (
              <div className="ps-rise mt-3 rounded-xl p-4" style={{ backgroundColor: brand.primaryColor, color: '#FFFFFF' }}>
                <div className="flex items-start gap-3">
                  <Icons.CheckCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold" style={{ fontVariantNumeric: 'tabular-nums' }}>
                      {added.qty} × {product.name} added, {money(added.price)}
                    </p>
                    <p className="text-sm opacity-85">{added.options}</p>
                    {added.lead && <p className="mt-1 text-sm opacity-85">Made to order — {added.lead}.</p>}
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => navigate('cart-checkout')}
                        className={'rounded-full px-4 py-2 text-sm font-bold ps-trans ' + focus}
                        style={{ backgroundColor: '#FFFFFF', color: brand.primaryColor, outlineColor: '#FFFFFF' }}
                      >
                        View bag ({money(cartTotal)})
                      </button>
                      <button
                        type="button"
                        onClick={() => setAdded(null)}
                        className={'rounded-full px-4 py-2 text-sm font-semibold ps-trans ' + focus}
                        style={{ backgroundColor: 'rgba(255,255,255,0.16)', color: '#FFFFFF', outlineColor: '#FFFFFF' }}
                      >
                        Keep browsing
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* stale stock indicator + reassurance */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs" style={{ color: brand.neutralColor }}>
            <span className="inline-flex items-center gap-1.5">
              <Icons.Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {stockAgeMins === 0 ? 'Shelf counts checked just now' : 'Shelf counts are ' + stockAgeMins + ' minutes old'}
            </span>
            <button
              type="button"
              onClick={() => setStockAgeMins(0)}
              disabled={stockAgeMins === 0}
              className={'rounded-full px-2.5 py-1 font-semibold underline underline-offset-4 disabled:no-underline disabled:opacity-50 ' + focus}
              style={{ color: stockAgeMins === 0 ? brand.neutralColor : brand.primaryColor, outlineColor: brand.primaryColor }}
            >
              {stockAgeMins === 0 ? 'Up to date' : 'Check again'}
            </button>
          </div>

          <ul className="mt-4 space-y-2 text-sm" style={{ color: brand.neutralColor }}>
            <li className="flex items-center gap-2">
              <Icons.Check className="h-4 w-4 shrink-0" aria-hidden="true" style={{ color: brand.primaryColor }} />
              Free UK postage over {money(SHOP.freeThreshold)}, tracked for {SHOP.postage[1][1]}
            </li>
            <li className="flex items-center gap-2">
              <Icons.Check className="h-4 w-4 shrink-0" aria-hidden="true" style={{ color: brand.primaryColor }} />
              Printed and packed by two people in Sheffield
            </li>
          </ul>
        </section>
      </div>

      {/* ---------------- tabs ---------------- */}
      <section aria-labelledby="detail-h" className="mt-14">
        <h2 id="detail-h" className="sr-only">More about {product.name}</h2>
        <div role="tablist" aria-label="Product details" className="flex flex-wrap gap-2 border-b pb-px" style={{ borderColor: brand.neutralColor + '2E' }}>
          {TABS.map((t, i) => {
            const on = tab === t.id;
            return (
              <button
                key={t.id}
                id={'tab-' + t.id}
                role="tab"
                type="button"
                aria-selected={on}
                aria-controls={'panel-' + t.id}
                tabIndex={on ? 0 : -1}
                onClick={() => setTab(t.id)}
                onKeyDown={(e) => onTabKey(e, i)}
                className={'-mb-px border-b-2 px-3 py-3 text-sm font-semibold ps-trans ' + focus}
                style={{
                  borderColor: on ? brand.primaryColor : 'transparent',
                  color: on ? brand.primaryColor : brand.neutralColor,
                  outlineColor: brand.primaryColor,
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>
        <div
          id={'panel-' + tab}
          role="tabpanel"
          aria-labelledby={'tab-' + tab}
          tabIndex={0}
          className={'ps-rise pt-6 ' + focus}
          style={{ outlineColor: brand.primaryColor }}
        >
          {tabPanel[tab]}
        </div>
      </section>

      {/* ---------------- related ---------------- */}
      <section aria-labelledby="more-h" className="mt-14">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 id="more-h" className="text-xl font-bold tracking-tight" style={headingFont}>Small things that go with it</h2>
          <button
            type="button"
            onClick={() => navigate('catalogue')}
            className={'inline-flex items-center gap-1 rounded-full px-2 py-1 text-sm font-semibold ps-trans ' + focus}
            style={{ color: brand.primaryColor, outlineColor: brand.primaryColor }}
          >
            Browse the whole shelf
            <Icons.ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.filter((p) => p.id !== productId).map((p) => {
            const state = summarise(p);
            const from = Math.min.apply(null, activeVariants(p).map((v) => v.price));
            return (
              <li key={p.id}>
                <Card style={cardStyle} className="h-full overflow-hidden">
                  <CardContent>
                    <button
                      type="button"
                      onClick={() => switchProduct(p.id)}
                      className={'group block w-full text-left ps-trans ' + focus}
                      style={{ outlineColor: brand.primaryColor }}
                    >
                      <span className="relative block aspect-[4/3] w-full overflow-hidden" style={{ ...photoBg(p.tone), borderRadius: brand.radius }}>
                        <span aria-hidden="true" className="absolute inset-0 grid place-items-center text-5xl">{p.glyph}</span>
                      </span>
                      <span className="mt-3 block font-semibold leading-snug" style={headingFont}>{p.name}</span>
                      <span className="mt-1 flex items-center gap-2">
                        <span className="text-sm font-bold" style={{ color: brand.primaryColor, fontVariantNumeric: 'tabular-nums' }}>from {money(from)}</span>
                        <span
                          className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold"
                          style={{
                            backgroundColor: state === 'Sold out' ? brand.neutralColor + '1F' : state === 'Printed to order' ? brand.accentColor + '1F' : brand.primaryColor + '14',
                            color: state === 'Sold out' ? brand.neutralColor : state === 'Printed to order' ? '#7A2E12' : brand.primaryColor,
                          }}
                        >
                          {state === 'Sold out' ? <Icons.X className="h-3 w-3" aria-hidden="true" /> : state === 'Printed to order' ? <Icons.Clock className="h-3 w-3" aria-hidden="true" /> : <Icons.CheckCircle className="h-3 w-3" aria-hidden="true" />}
                          {state}
                        </span>
                      </span>
                      <span className="mt-2 block text-sm" style={{ color: brand.neutralColor }}>{p.tagline}</span>
                    </button>
                  </CardContent>
                </Card>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
