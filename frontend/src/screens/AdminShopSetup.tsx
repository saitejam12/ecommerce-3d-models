// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

const { Plus, Search, Check, X, ChevronRight, ChevronLeft, Settings, FileText, Package, Clock, Trash, Edit, Filter, Upload, ArrowLeft, ArrowRight, AlertCircle, CheckCircle } = Icons;

const {
  Plus, Search, Check, X, ChevronRight, ChevronLeft, Package, FileText, Settings,
  Filter, Trash, ArrowLeft, ArrowRight, AlertCircle, CheckCircle, Upload, Clock, Edit
} = Icons;

const hexA = (hex, a) => {
  const h = String(hex).replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
};
const money = (n) => '£' + Number(n || 0).toFixed(2);
const slugify = (s) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const optionText = (options) => Object.values(options).filter(Boolean).join(' · ');

const CATEGORIES_SEED = [
  { id: 'c1', name: 'Desk creatures', slug: 'desk-creatures', created_at: '2026-02-11' },
  { id: 'c2', name: 'Tabletop & dice', slug: 'tabletop-dice', created_at: '2026-02-11' },
  { id: 'c3', name: 'Planters & pots', slug: 'planters-pots', created_at: '2026-03-02' },
  { id: 'c4', name: 'Fidgets & charms', slug: 'fidgets-charms', created_at: '2026-04-19' },
  { id: 'c5', name: 'Lamps & light', slug: 'lamps-light', created_at: '2026-05-30' },
  { id: 'c6', name: 'Keycaps', slug: 'keycaps', created_at: '2026-08-07' },
  { id: 'c7', name: 'Seasonal & gifts', slug: 'seasonal-gifts', created_at: '2026-10-09' }
];

const img = (key) => ({ id: 'i-' + key, s3_key: key });

const PRODUCTS_SEED = [
  {
    id: 'p-101', category_id: 'c1', name: 'Articulated Pocket Dragon', slug: 'articulated-pocket-dragon',
    description: 'A 32-piece flexi dragon printed in one go — no glue, no supports. Fits in a coat pocket and rattles pleasingly on a desk.',
    published: true, updated_at: '2026-10-14',
    images: [img('dragon-hero.jpg'), img('dragon-scale-detail.jpg'), img('dragon-in-hand.jpg'), img('dragon-colourways.jpg')],
    variants: [
      { id: 'v-1', options: { Colour: 'Ember red', Size: '120 mm', Finish: 'Matte' }, price: 18, fulfilment_type: 'stocked', stock_count: 12, lead_time: '', active: true },
      { id: 'v-2', options: { Colour: 'Galaxy purple', Size: '120 mm', Finish: 'Silk' }, price: 19.5, fulfilment_type: 'stocked', stock_count: 0, lead_time: '', active: true },
      { id: 'v-3', options: { Colour: 'Glow green', Size: '180 mm', Finish: 'Matte' }, price: 27, fulfilment_type: 'printed_to_order', stock_count: null, lead_time: '3–5 working days to print', active: true },
      { id: 'v-4', options: { Colour: 'Copper', Size: '120 mm', Finish: 'Metallic' }, price: 21, fulfilment_type: 'stocked', stock_count: 4, lead_time: '', active: true }
    ]
  },
  {
    id: 'p-102', category_id: 'c2', name: 'Hex Dice Tower “Moss Keep”', slug: 'hex-dice-tower-moss-keep',
    description: 'A ruined keep that eats your dice and spits them back out. Three internal baffles, felt-lined tray, packs flat for game night.',
    published: true, updated_at: '2026-10-12',
    images: [img('moss-keep-front.jpg'), img('moss-keep-tray.jpg'), img('moss-keep-scale.jpg')],
    variants: [
      { id: 'v-5', options: { Colour: 'Forest green', Size: '210 mm', Finish: 'Textured' }, price: 32, fulfilment_type: 'stocked', stock_count: 6, lead_time: '', active: true },
      { id: 'v-6', options: { Colour: 'Stone grey', Size: '210 mm', Finish: 'Textured' }, price: 34, fulfilment_type: 'printed_to_order', stock_count: null, lead_time: '5–7 working days to print', active: true }
    ]
  },
  {
    id: 'p-103', category_id: 'c3', name: 'Sleepy Fox Planter', slug: 'sleepy-fox-planter',
    description: 'A curled-up fox with a drainage hole under the tail. Sized for a 6 cm succulent.',
    published: true, updated_at: '2026-10-11',
    images: [img('fox-planter-01.jpg'), img('fox-planter-succulent.jpg')],
    variants: [
      { id: 'v-7', options: { Colour: 'Terracotta', Size: '90 mm', Finish: 'Matte' }, price: 14, fulfilment_type: 'stocked', stock_count: 9, lead_time: '', active: true },
      { id: 'v-8', options: { Colour: 'Sage', Size: '90 mm', Finish: 'Matte' }, price: 14, fulfilment_type: 'stocked', stock_count: 2, lead_time: '', active: true },
      { id: 'v-9', options: { Colour: 'Cream', Size: '140 mm', Finish: 'Silk' }, price: 22, fulfilment_type: 'printed_to_order', stock_count: null, lead_time: '2–4 working days to print', active: true }
    ]
  },
  {
    id: 'p-104', category_id: 'c1', name: 'Cable Whale Organiser', slug: 'cable-whale-organiser',
    description: 'A chubby whale that holds two charging cables in its mouth. Our best seller at markets.',
    published: true, updated_at: '2026-10-09',
    images: [img('cable-whale-blue.jpg')],
    variants: [
      { id: 'v-10', options: { Colour: 'Ocean blue', Size: '55 mm', Finish: 'Matte' }, price: 7.5, fulfilment_type: 'stocked', stock_count: 38, lead_time: '', active: true },
      { id: 'v-11', options: { Colour: 'Soft pink', Size: '55 mm', Finish: 'Matte' }, price: 7.5, fulfilment_type: 'stocked', stock_count: 0, lead_time: '', active: true }
    ]
  },
  {
    id: 'p-105', category_id: 'c5', name: 'Hollow Skull Tealight', slug: 'hollow-skull-tealight',
    description: 'Light spills through the eye sockets and jaw. Takes a standard LED tealight — no naked flames near PLA, please.',
    published: false, updated_at: '2026-10-13',
    images: [img('skull-tealight-lit.jpg'), img('skull-tealight-off.jpg')],
    variants: [
      { id: 'v-12', options: { Colour: 'Bone white', Size: '100 mm', Finish: 'Matte' }, price: 16, fulfilment_type: 'printed_to_order', stock_count: null, lead_time: '4–6 working days to print', active: true }
    ]
  },
  {
    id: 'p-106', category_id: 'c4', name: 'Fidget Slider Coin', slug: 'fidget-slider-coin',
    description: 'Magnet-free print-in-place slider. Quiet enough for the back of a meeting.',
    published: true, updated_at: '2026-10-07',
    images: [img('slider-silver.jpg'), img('slider-fade.jpg'), img('slider-pocket.jpg')],
    variants: [
      { id: 'v-13', options: { Colour: 'Brushed silver', Size: '40 mm', Finish: 'Metallic' }, price: 9, fulfilment_type: 'stocked', stock_count: 24, lead_time: '', active: true },
      { id: 'v-14', options: { Colour: 'Sunset fade', Size: '40 mm', Finish: 'Silk' }, price: 11, fulfilment_type: 'stocked', stock_count: 7, lead_time: '', active: true },
      { id: 'v-15', options: { Colour: 'Lilac', Size: '40 mm', Finish: 'Matte' }, price: 9, fulfilment_type: 'stocked', stock_count: 0, lead_time: '', active: false }
    ]
  },
  {
    id: 'p-107', category_id: 'c5', name: 'Toadstool Night Light', slug: 'toadstool-night-light',
    description: 'USB-powered, vase-mode cap that glows like a jar of jam. Cable included, bulb pre-fitted.',
    published: true, updated_at: '2026-10-15',
    images: [img('toadstool-glow.jpg'), img('toadstool-day.jpg'), img('toadstool-bedside.jpg'), img('toadstool-base.jpg')],
    variants: [
      { id: 'v-16', options: { Colour: 'Warm white', Size: '160 mm', Finish: 'Translucent' }, price: 28, fulfilment_type: 'stocked', stock_count: 3, lead_time: '', active: true },
      { id: 'v-17', options: { Colour: 'Red cap', Size: '160 mm', Finish: 'Translucent' }, price: 30, fulfilment_type: 'printed_to_order', stock_count: null, lead_time: '3–5 working days to print', active: true }
    ]
  },
  {
    id: 'p-108', category_id: 'c2', name: 'Pocket Mecha Kit', slug: 'pocket-mecha-kit',
    description: 'Eleven snap-fit parts, fully posable at the shoulders and hips. Comes in a little drawstring bag.',
    published: true, updated_at: '2026-10-06',
    images: [img('mecha-posed.jpg'), img('mecha-parts.jpg'), img('mecha-bag.jpg')],
    variants: [
      { id: 'v-18', options: { Colour: 'Grey / orange', Size: '95 mm', Finish: 'Matte' }, price: 34, fulfilment_type: 'stocked', stock_count: 5, lead_time: '', active: true },
      { id: 'v-19', options: { Colour: 'Full colour', Size: '95 mm', Finish: 'Silk' }, price: 39, fulfilment_type: 'printed_to_order', stock_count: null, lead_time: '5–7 working days to print', active: true }
    ]
  },
  {
    id: 'p-109', category_id: 'c6', name: 'Keycap Set “Space Cadet”', slug: 'keycap-set-space-cadet',
    description: 'Six artisan caps — rocket, moon, satellite, comet, lander and a very small astronaut. MX stem.',
    published: false, updated_at: '2026-10-15',
    images: [],
    variants: [
      { id: 'v-20', options: { Colour: 'Deep navy', Size: 'MX stem', Finish: 'Resin-smooth' }, price: 24, fulfilment_type: 'printed_to_order', stock_count: null, lead_time: '7–10 working days to print', active: true }
    ]
  }
];

const POSTAGE_SEED = [
  { id: 'po1', name: 'Standard', description: 'Royal Mail 48, 2–3 working days, no tracking', price: 3.49, active: true },
  { id: 'po2', name: 'Tracked', description: 'Royal Mail Tracked 24, next working day, signed for', price: 5.95, active: true },
  { id: 'po3', name: 'Collect from the studio', description: 'Pick up from Unit 4, Bedminster, by arrangement', price: 0, active: false }
];

const PAGES_SEED = [
  { slug: 'about', title: 'About Pocket Shelf', published: true, updated_at: '2026-09-28',
    body: 'Pocket Shelf is two Prusa MK4s, a resin printer and me, Mara, in a rented unit in Bedminster, Bristol.\n\nEverything on this site is designed in-house and printed in small batches on PLA and PETG. Nothing is resold, nothing is drop-shipped. If a print comes out with a blemish it goes in the seconds box, not in your parcel.' },
  { slug: 'faq', title: 'Frequently asked questions', published: true, updated_at: '2026-10-02',
    body: 'How long do printed-to-order items take?\nThe lead time is shown on every variant — usually 3 to 7 working days before we post it.\n\nAre the models waterproof?\nThe planters are sealed but not dishwasher safe. Hand wash, lukewarm water.\n\nCan I ask for a custom colour?\nSometimes. Email hello@pocketshelf.co.uk with the model and the colour and I will tell you honestly if I have the filament.' },
  { slug: 'delivery', title: 'Delivery', published: true, updated_at: '2026-10-02',
    body: 'We post to UK addresses only.\n\nStandard post is £3.49 and arrives in 2–3 working days. Tracked post is £5.95 and arrives the next working day. Orders over £45 get free standard post automatically.\n\nIn-stock items go out the next working day. Printed-to-order items leave once the lead time shown on the product page has passed.' },
  { slug: 'returns', title: 'Returns & refunds', published: false, updated_at: '2026-10-15',
    body: 'Changed your mind? Send it back within 14 days, unused and in its packaging, and we will refund the item cost.\n\nIf something arrives broken, photograph it and email within 48 hours — we will reprint or refund, your choice.\n\nDRAFT NOTE: add the bit about personalised keycaps being non-returnable before publishing.' }
];

const GUIDE_STEPS = [
  { id: 'g1', title: 'Sign in to the admin', body: 'Your staff login is separate from a customer account. Bookmark the admin sign-in page and keep the password out of the shared notes app.' },
  { id: 'g2', title: 'Add your first product with photos', body: 'Products tab → Add product. Give it a name, a description and a category, upload photos and drag the best one to the front — that is the listing image.' },
  { id: 'g3', title: 'Add variants and prices', body: 'Each colour, size or finish is its own variant with its own price. A product with no variants cannot be bought.' },
  { id: 'g4', title: 'Set stock or a lead time', body: 'Mark a variant “stocked” and type how many you have, or mark it “printed to order” and write the lead time customers will see instead.' },
  { id: 'g5', title: 'Set postage and the VAT rate', body: 'Postage & tax tab. At least one postage option must be switched on or nobody can check out. The VAT rate is shown as its own line at checkout.' },
  { id: 'g6', title: 'Write your About, FAQ and policy pages', body: 'Pages tab. These four pages are linked from the storefront footer once published.' },
  { id: 'g7', title: 'Run a test order from paid to shipped', body: 'Buy something from your own shop with a real card, then work it through the order queue: paid → printing → packed → shipped with a tracking number. Refund yourself afterwards.' }
];

const CREDENTIALS = [
  { key: 'STRIPE_SECRET_KEY', what: 'Takes card and wallet payments' },
  { key: 'STRIPE_WEBHOOK_SECRET', what: 'Confirms payment and creates the order' },
  { key: 'RESEND_API_KEY', what: 'Sends confirmation, shipped and refund emails' }
];

const TABS = [
  { id: 'products', label: 'Products', icon: Package },
  { id: 'categories', label: 'Categories', icon: Filter },
  { id: 'postage', label: 'Postage & tax', icon: Settings },
  { id: 'pages', label: 'Pages', icon: FileText },
  { id: 'guide', label: 'Getting started', icon: CheckCircle }
];

const Toggle = ({ checked, onChange, label, disabled }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    disabled={disabled}
    onClick={() => onChange(!checked)}
    className="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-40"
    style={{
      backgroundColor: checked ? brand.primaryColor : hexA(brand.neutralColor, 0.3),
      outlineColor: brand.primaryColor
    }}
  >
    <span
      className="inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200"
      style={{ transform: checked ? 'translateX(22px)' : 'translateX(2px)' }}
    />
  </button>
);

const Pill = ({ tone = 'neutral', children }) => {
  const tones = {
    live: { bg: hexA(brand.primaryColor, 0.12), fg: brand.primaryColor },
    warn: { bg: hexA(brand.accentColor, 0.16), fg: '#B33E22' },
    neutral: { bg: hexA(brand.neutralColor, 0.14), fg: brand.neutralColor }
  };
  const t = tones[tone];
  return (
    <span
      className="inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold"
      style={{ backgroundColor: t.bg, color: t.fg }}
    >
      {children}
    </span>
  );
};

export default function Screen() {
  const navigate = useNavigate();
  const [tab, setTab] = React.useState('products');
  const tabRefs = React.useRef([]);

  const [products, setProducts] = React.useState(PRODUCTS_SEED);
  const [categories, setCategories] = React.useState(CATEGORIES_SEED);
  const [postage, setPostage] = React.useState(POSTAGE_SEED);
  const [pages, setPages] = React.useState(PAGES_SEED);
  const [settings, setSettings] = React.useState({
    currency: 'GBP (£)', language: 'English (United Kingdom)',
    tax_rate: '20', free_postage_enabled: true, free_postage_threshold: '45.00'
  });

  const [query, setQuery] = React.useState('');
  const [catFilter, setCatFilter] = React.useState('all');
  const [statusFilter, setStatusFilter] = React.useState('all');

  const [editingId, setEditingId] = React.useState(null);
  const [draft, setDraft] = React.useState(null);
  const [errors, setErrors] = React.useState({});
  const [vForm, setVForm] = React.useState(null);
  const [vErrors, setVErrors] = React.useState({});

  const [newCat, setNewCat] = React.useState('');
  const [renaming, setRenaming] = React.useState(null);
  const [renameText, setRenameText] = React.useState('');
  const [catNotice, setCatNotice] = React.useState(null);

  const [newPostage, setNewPostage] = React.useState({ name: '', description: '', price: '' });
  const [settingsError, setSettingsError] = React.useState(null);

  const [pageSlug, setPageSlug] = React.useState('about');
  const [pageDraft, setPageDraft] = React.useState(PAGES_SEED[0]);

  const [guideDone, setGuideDone] = React.useState(['g1', 'g2', 'g3']);

  const [pending, setPending] = React.useState(null);
  const [toast, setToast] = React.useState(null);

  React.useEffect(() => {
    if (!pending) return;
    const t = setTimeout(() => { pending.run(); setToast(pending.toast); setPending(null); }, 650);
    return () => clearTimeout(t);
  }, [pending]);

  React.useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3600);
    return () => clearTimeout(t);
  }, [toast]);

  const catName = (id) => (categories.find((c) => c.id === id) || {}).name || 'Uncategorised';
  const productCount = (catId) => products.filter((p) => p.category_id === catId).length;
  const busy = (what) => pending && pending.what === what;

  const filtered = products.filter((p) => {
    const q = query.trim().toLowerCase();
    const matchQ = !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.slug.includes(q);
    const matchC = catFilter === 'all' || p.category_id === catFilter;
    const matchS = statusFilter === 'all' || (statusFilter === 'published' ? p.published : !p.published);
    return matchQ && matchC && matchS;
  });

  const openProduct = (p) => {
    setDraft(JSON.parse(JSON.stringify(p)));
    setEditingId(p.id);
    setErrors({});
    setVForm(null);
  };

  const openNewProduct = () => {
    setDraft({
      id: 'new', category_id: categories[0].id, name: '', slug: '', description: '',
      published: false, updated_at: '2026-10-15', images: [], variants: []
    });
    setEditingId('new');
    setErrors({});
    setVForm(null);
  };

  const original = editingId && editingId !== 'new' ? products.find((p) => p.id === editingId) : null;
  const dirty = draft && (editingId === 'new' ? !!draft.name || draft.variants.length > 0 : JSON.stringify(draft) !== JSON.stringify(original));

  const patchDraft = (patch) => setDraft((d) => ({ ...d, ...patch }));

  const saveProduct = () => {
    const name = (draft.name || '').trim();
    if (!name) {
      setErrors({ name: 'Give the product a name before saving — it is what customers search for.' });
      return;
    }
    setErrors({});
    const next = { ...draft, name, slug: draft.slug || slugify(name), updated_at: '2026-10-15' };
    setPending({
      what: 'product',
      toast: { kind: 'ok', text: editingId === 'new' ? `“${name}” added to ${catName(next.category_id)}` : `“${name}” saved` },
      run: () => {
        setProducts((list) =>
          editingId === 'new'
            ? [{ ...next, id: 'p-' + (110 + list.length) }, ...list]
            : list.map((p) => (p.id === next.id ? next : p))
        );
        setEditingId(null);
        setDraft(null);
      }
    });
  };

  const addVariant = () => {
    const e = {};
    const priceNum = Number(vForm.price);
    if (vForm.price === '' || Number.isNaN(priceNum)) e.price = 'Enter a price, for example 18.00.';
    else if (priceNum < 0) e.price = 'A price cannot be negative.';
    if (!vForm.colour.trim() && !vForm.size.trim() && !vForm.finish.trim()) e.options = 'Describe the variant with at least one option.';
    if (vForm.fulfilment_type === 'stocked' && (vForm.stock_count === '' || Number(vForm.stock_count) < 0)) e.stock = 'Enter how many you have on the shelf (0 is fine).';
    if (vForm.fulfilment_type === 'printed_to_order' && !vForm.lead_time.trim()) e.lead = 'Tell customers how long printing takes.';
    setVErrors(e);
    if (Object.keys(e).length) return;
    const v = {
      id: 'v-new-' + Date.now(),
      options: { Colour: vForm.colour.trim(), Size: vForm.size.trim(), Finish: vForm.finish.trim() },
      price: priceNum,
      fulfilment_type: vForm.fulfilment_type,
      stock_count: vForm.fulfilment_type === 'stocked' ? Number(vForm.stock_count) : null,
      lead_time: vForm.fulfilment_type === 'printed_to_order' ? vForm.lead_time.trim() : '',
      active: true,
      isNew: true
    };
    patchDraft({ variants: [...draft.variants, v] });
    setVForm(null);
    setVErrors({});
  };

  const saveSettings = () => {
    const rate = Number(settings.tax_rate);
    if (settings.tax_rate === '' || Number.isNaN(rate) || rate < 0 || rate > 100) {
      setSettingsError('That VAT rate does not look right. Enter a percentage between 0 and 100 — your other changes are still here.');
      return;
    }
    setSettingsError(null);
    setPending({ what: 'settings', toast: { kind: 'ok', text: 'Postage and tax settings saved — new checkouts use them straight away' }, run: () => {} });
  };

  const savePage = () => {
    setPending({
      what: 'page',
      toast: { kind: 'ok', text: pageDraft.published ? `“${pageDraft.title}” published to the footer` : `“${pageDraft.title}” saved as a draft` },
      run: () => setPages((list) => list.map((p) => (p.slug === pageDraft.slug ? { ...pageDraft, updated_at: '2026-10-15' } : p)))
    });
  };

  const onTabKey = (e, i) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = e.key === 'ArrowRight' ? (i + 1) % TABS.length : (i - 1 + TABS.length) % TABS.length;
    setTab(TABS[next].id);
    const el = tabRefs.current[next];
    if (el) el.focus();
  };

  const focusStyle = { outlineColor: brand.primaryColor };
  const focusCls = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';
  const cardStyle = { borderRadius: brand.radius, borderColor: hexA(brand.neutralColor, 0.18) };
  const inputCls = `w-full rounded-lg border bg-white px-3 py-2 text-sm ${focusCls}`;
  const inputStyle = { borderColor: hexA(brand.neutralColor, 0.3), borderRadius: brand.radius, outlineColor: brand.primaryColor, color: '#262233' };
  const labelCls = 'mb-1.5 block text-xs font-semibold uppercase tracking-wide';
  const labelStyle = { color: brand.neutralColor, letterSpacing: '0.06em' };

  const PrimaryButton = ({ children, onClick, type = 'button', disabled, full }) => (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white transition-transform duration-150 active:scale-[0.98] disabled:opacity-60 ${focusCls} ${full ? 'w-full' : ''}`}
      style={{ backgroundColor: brand.primaryColor, borderRadius: brand.radius, outlineColor: brand.primaryColor }}
    >
      {children}
    </button>
  );

  const GhostButton = ({ children, onClick, danger, small }) => (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 border bg-white font-semibold transition-colors ${focusCls} ${small ? 'px-2.5 py-1.5 text-xs' : 'px-3.5 py-2 text-sm'}`}
      style={{
        borderColor: danger ? hexA(brand.accentColor, 0.5) : hexA(brand.neutralColor, 0.3),
        color: danger ? '#B33E22' : brand.primaryColor,
        borderRadius: brand.radius,
        outlineColor: brand.primaryColor
      }}
    >
      {children}
    </button>
  );

  const SectionHeading = ({ children, sub }) => (
    <div className="mb-4">
      <h2 className="text-lg font-bold" style={{ color: '#201C2E', fontFamily: brand.fontHeading }}>{children}</h2>
      {sub ? <p className="mt-1 text-sm" style={{ color: brand.neutralColor }}>{sub}</p> : null}
    </div>
  );

  /* ---------------------------------- products list --------------------------------- */
  const renderProductList = () => (
    <div>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold" style={{ color: '#201C2E' }}>Products</h2>
          <p className="mt-1 text-sm" style={{ color: brand.neutralColor }}>
            {products.filter((p) => p.published).length} live on the storefront ·{' '}
            {products.filter((p) => !p.published).length} drafts ·{' '}
            {products.reduce((n, p) => n + p.variants.length, 0)} variants
          </p>
        </div>
        <PrimaryButton onClick={openNewProduct}>
          <Plus className="h-4 w-4" aria-hidden="true" /> Add product
        </PrimaryButton>
      </div>

      <div className="mb-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <div>
          <label htmlFor="prod-search" className={labelCls} style={labelStyle}>Search the catalogue</label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: brand.neutralColor }} aria-hidden="true" />
            <input
              id="prod-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="dragon, planter, keycap…"
              className={inputCls + ' pl-9'}
              style={inputStyle}
            />
          </div>
        </div>
        <div>
          <label htmlFor="cat-filter" className={labelCls} style={labelStyle}>Category</label>
          <select
            id="cat-filter"
            value={catFilter}
            onChange={(e) => setCatFilter(e.target.value)}
            className={inputCls + ' sm:w-56'}
            style={inputStyle}
          >
            <option value="all">All categories</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="Filter by publish state">
        {[
          { id: 'all', label: 'All', n: products.length },
          { id: 'published', label: 'Published', n: products.filter((p) => p.published).length },
          { id: 'draft', label: 'Drafts', n: products.filter((p) => !p.published).length }
        ].map((f) => {
          const on = statusFilter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={on}
              onClick={() => setStatusFilter(f.id)}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors ${focusCls}`}
              style={{
                backgroundColor: on ? brand.primaryColor : '#FFFFFF',
                color: on ? '#FFFFFF' : brand.neutralColor,
                borderColor: on ? brand.primaryColor : hexA(brand.neutralColor, 0.25),
                outlineColor: brand.primaryColor
              }}
            >
              {f.label} <span style={{ fontVariantNumeric: 'tabular-nums', opacity: 0.8 }}>{f.n}</span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed bg-white px-6 py-14 text-center" style={cardStyle}>
          <Search className="mx-auto h-6 w-6" style={{ color: brand.primaryColor }} aria-hidden="true" />
          <h3 className="mt-3 text-base font-bold" style={{ color: '#201C2E' }}>Nothing in the catalogue matches that</h3>
          <p className="mx-auto mt-1 max-w-sm text-sm" style={{ color: brand.neutralColor }}>
            No product name or description contains “{query || '—'}” with these filters. Try a shorter word, or clear the filters and scroll.
          </p>
          <div className="mt-5 flex justify-center gap-2">
            <GhostButton onClick={() => { setQuery(''); setCatFilter('all'); setStatusFilter('all'); }}>Clear filters</GhostButton>
            <PrimaryButton onClick={openNewProduct}><Plus className="h-4 w-4" aria-hidden="true" /> Add product</PrimaryButton>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-white" style={cardStyle}>
          <table className="w-full text-sm" style={{ fontVariantNumeric: 'tabular-nums', borderCollapse: 'collapse' }}>
            <caption className="sr-only">Products with their category, variants, price and publish state</caption>
            <thead>
              <tr style={{ backgroundColor: hexA(brand.primaryColor, 0.05) }}>
                {['Product', 'Category', 'Variants', 'From', 'Availability', 'State', ''].map((h, i) => (
                  <th
                    key={h + i}
                    scope="col"
                    className={`px-4 py-3 text-left text-xs font-semibold uppercase ${i > 1 ? 'hidden md:table-cell' : ''}`}
                    style={{ color: brand.neutralColor, letterSpacing: '0.06em' }}
                  >
                    {h || <span className="sr-only">Edit</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const active = p.variants.filter((v) => v.active);
                const prices = active.map((v) => v.price);
                const stocked = active.filter((v) => v.fulfilment_type === 'stocked');
                const onShelf = stocked.reduce((n, v) => n + (v.stock_count || 0), 0);
                const toOrder = active.filter((v) => v.fulfilment_type === 'printed_to_order').length;
                const soldOut = stocked.length > 0 && stocked.every((v) => v.stock_count === 0);
                return (
                  <tr key={p.id} className="border-t align-middle" style={{ borderColor: hexA(brand.neutralColor, 0.14) }}>
                    <th scope="row" className="px-4 py-3 text-left font-normal">
                      <button
                        type="button"
                        onClick={() => openProduct(p)}
                        className={`text-left text-sm font-semibold hover:underline ${focusCls}`}
                        style={{ color: brand.primaryColor, ...focusStyle }}
                      >
                        {p.name}
                      </button>
                      <span className="mt-0.5 block text-xs" style={{ color: brand.neutralColor }}>
                        /{p.slug} · {p.images.length} photo{p.images.length === 1 ? '' : 's'}
                      </span>
                      <span className="mt-1 flex gap-1.5 md:hidden">
                        <Pill tone={p.published ? 'live' : 'neutral'}>{p.published ? 'Published' : 'Draft'}</Pill>
                      </span>
                    </th>
                    <td className="px-4 py-3" style={{ color: brand.neutralColor }}>{catName(p.category_id)}</td>
                    <td className="hidden px-4 py-3 md:table-cell" style={{ color: brand.neutralColor }}>
                      {active.length}
                      {toOrder > 0 ? <span className="block text-xs">{toOrder} printed to order</span> : null}
                    </td>
                    <td className="hidden px-4 py-3 font-semibold md:table-cell" style={{ color: '#201C2E' }}>
                      {prices.length ? money(Math.min.apply(null, prices)) : '—'}
                    </td>
                    <td className="hidden px-4 py-3 md:table-cell">
                      {stocked.length === 0 ? (
                        <span className="inline-flex items-center gap-1 text-xs" style={{ color: brand.neutralColor }}>
                          <Clock className="h-3.5 w-3.5" aria-hidden="true" /> Made to order
                        </span>
                      ) : soldOut ? (
                        <Pill tone="warn"><AlertCircle className="h-3 w-3" aria-hidden="true" /> Sold out</Pill>
                      ) : (
                        <span style={{ color: onShelf <= 5 ? '#B33E22' : brand.neutralColor }}>
                          {onShelf} on the shelf{onShelf <= 5 ? ' · low' : ''}
                        </span>
                      )}
                    </td>
                    <td className="hidden px-4 py-3 md:table-cell">
                      <Pill tone={p.published ? 'live' : 'neutral'}>{p.published ? 'Published' : 'Draft'}</Pill>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => openProduct(p)}
                        aria-label={`Edit ${p.name}`}
                        className={`inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors ${focusCls}`}
                        style={{ color: brand.primaryColor, backgroundColor: hexA(brand.primaryColor, 0.08), ...focusStyle }}
                      >
                        <ChevronRight className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <p className="mt-3 text-xs" style={{ color: brand.neutralColor }}>
        Showing {filtered.length} of {products.length} products. Unpublished products stay here but vanish from storefront browsing, search and their own URL.
      </p>
    </div>
  );

  /* ---------------------------------- product editor -------------------------------- */
  const renderEditor = () => (
    <div className="animate-ps-in">
      <button
        type="button"
        onClick={() => { setEditingId(null); setDraft(null); }}
        className={`mb-4 inline-flex items-center gap-1.5 text-sm font-semibold ${focusCls}`}
        style={{ color: brand.primaryColor, ...focusStyle }}
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All products
      </button>

      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold" style={{ color: '#201C2E' }}>
            {editingId === 'new' ? 'New product' : draft.name}
          </h2>
          <p className="mt-1 text-sm" style={{ color: brand.neutralColor }}>
            {editingId === 'new' ? 'Saved as a draft until you switch it to published.' : `Last updated ${draft.updated_at} · ${draft.variants.length} variants`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {dirty ? <Pill tone="warn">Unsaved changes</Pill> : null}
          <GhostButton onClick={() => { setEditingId(null); setDraft(null); }}>Discard</GhostButton>
          <PrimaryButton onClick={saveProduct} disabled={!!pending}>
            {busy('product') ? (<><span className="ps-dots" aria-hidden="true" /> Saving…</>) : (<><Check className="h-4 w-4" aria-hidden="true" /> Save product</>)}
          </PrimaryButton>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
        <div className="space-y-5">
          {/* details */}
          <section className="rounded-xl border bg-white p-5" style={cardStyle}>
            <h3 className="mb-4 text-base font-bold" style={{ color: '#201C2E' }}>Details</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="p-name" className={labelCls} style={labelStyle}>Product name</label>
                <input
                  id="p-name"
                  value={draft.name}
                  onChange={(e) => patchDraft({ name: e.target.value })}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'p-name-err' : 'p-name-hint'}
                  className={inputCls}
                  style={{ ...inputStyle, borderColor: errors.name ? brand.accentColor : inputStyle.borderColor }}
                  placeholder="Articulated Pocket Dragon"
                />
                {errors.name ? (
                  <p id="p-name-err" role="alert" className="mt-1.5 flex items-start gap-1.5 text-sm font-medium" style={{ color: '#B33E22' }}>
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /> {errors.name}
                  </p>
                ) : (
                  <p id="p-name-hint" className="mt-1.5 text-xs" style={{ color: brand.neutralColor }}>
                    Web address: /{draft.slug || slugify(draft.name) || 'your-product'}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="p-desc" className={labelCls} style={labelStyle}>Description</label>
                <textarea
                  id="p-desc"
                  rows={4}
                  value={draft.description}
                  onChange={(e) => patchDraft({ description: e.target.value })}
                  className={inputCls}
                  style={inputStyle}
                  placeholder="What it is, how big it is, what it is printed in."
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="p-cat" className={labelCls} style={labelStyle}>Category</label>
                  <select id="p-cat" value={draft.category_id} onChange={(e) => patchDraft({ category_id: e.target.value })} className={inputCls} style={inputStyle}>
                    {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="flex items-center justify-between gap-3 self-end rounded-lg border px-3 py-2.5" style={{ borderColor: hexA(brand.neutralColor, 0.25), borderRadius: brand.radius }}>
                  <span>
                    <span className="block text-sm font-semibold" style={{ color: '#201C2E' }}>
                      {draft.published ? 'Published' : 'Draft'}
                    </span>
                    <span className="block text-xs" style={{ color: brand.neutralColor }}>
                      {draft.published ? 'Visible on the storefront' : 'Hidden from browsing and search'}
                    </span>
                  </span>
                  <Toggle checked={draft.published} onChange={(v) => patchDraft({ published: v })} label="Publish this product on the storefront" />
                </div>
              </div>
            </div>
          </section>

          {/* variants */}
          <section className="rounded-xl border bg-white p-5" style={cardStyle}>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base font-bold" style={{ color: '#201C2E' }}>Variants &amp; prices</h3>
              {!vForm ? (
                <GhostButton small onClick={() => { setVForm({ colour: '', size: '', finish: '', price: '', fulfilment_type: 'stocked', stock_count: '', lead_time: '' }); setVErrors({}); }}>
                  <Plus className="h-3.5 w-3.5" aria-hidden="true" /> Add variant
                </GhostButton>
              ) : null}
            </div>

            {draft.variants.length === 0 && !vForm ? (
              <div className="rounded-lg border border-dashed px-5 py-10 text-center" style={{ borderColor: hexA(brand.neutralColor, 0.3) }}>
                <h4 className="text-sm font-bold" style={{ color: '#201C2E' }}>No variants yet</h4>
                <p className="mx-auto mt-1 max-w-xs text-sm" style={{ color: brand.neutralColor }}>
                  A product needs at least one variant with a price before anyone can buy it. Start with the colour and size you print most.
                </p>
              </div>
            ) : null}

            {draft.variants.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm" style={{ fontVariantNumeric: 'tabular-nums' }}>
                  <caption className="sr-only">Variants of this product</caption>
                  <thead>
                    <tr>
                      {['Options', 'Price', 'Fulfilment & availability', 'Offered', ''].map((h, i) => (
                        <th key={h + i} scope="col" className="px-2 pb-2 text-left text-xs font-semibold uppercase" style={{ color: brand.neutralColor, letterSpacing: '0.06em' }}>
                          {h || <span className="sr-only">Remove</span>}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {draft.variants.map((v, vi) => (
                      <tr key={v.id} className={`border-t align-top ${v.isNew ? 'animate-ps-in' : ''}`} style={{ borderColor: hexA(brand.neutralColor, 0.14), opacity: v.active ? 1 : 0.55 }}>
                        <th scope="row" className="px-2 py-3 text-left text-sm font-semibold" style={{ color: '#201C2E' }}>
                          {optionText(v.options)}
                          {!v.active ? <span className="mt-1 block"><Pill>Not offered</Pill></span> : null}
                        </th>
                        <td className="px-2 py-3">
                          <label className="sr-only" htmlFor={`price-${v.id}`}>Price for {optionText(v.options)}</label>
                          <div className="flex items-center gap-1">
                            <span style={{ color: brand.neutralColor }}>£</span>
                            <input
                              id={`price-${v.id}`}
                              type="number"
                              min="0"
                              step="0.50"
                              value={v.price}
                              onChange={(e) => {
                                const val = e.target.value;
                                patchDraft({ variants: draft.variants.map((x, i) => (i === vi ? { ...x, price: val === '' ? '' : Number(val) } : x)) });
                              }}
                              className={`w-20 rounded-lg border px-2 py-1.5 text-sm ${focusCls}`}
                              style={inputStyle}
                            />
                          </div>
                        </td>
                        <td className="px-2 py-3">
                          {v.fulfilment_type === 'stocked' ? (
                            <div className="flex flex-wrap items-center gap-2">
                              <label className="text-xs" style={{ color: brand.neutralColor }} htmlFor={`stock-${v.id}`}>In stock</label>
                              <input
                                id={`stock-${v.id}`}
                                type="number"
                                min="0"
                                value={v.stock_count}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  patchDraft({ variants: draft.variants.map((x, i) => (i === vi ? { ...x, stock_count: val === '' ? 0 : Number(val) } : x)) });
                                }}
                                className={`w-16 rounded-lg border px-2 py-1.5 text-sm ${focusCls}`}
                                style={inputStyle}
                              />
                              {Number(v.stock_count) === 0 ? <Pill tone="warn"><AlertCircle className="h-3 w-3" aria-hidden="true" /> Sold out</Pill> : null}
                            </div>
                          ) : (
                            <div className="flex flex-wrap items-center gap-2">
                              <Clock className="h-3.5 w-3.5" style={{ color: brand.primaryColor }} aria-hidden="true" />
                              <label className="sr-only" htmlFor={`lead-${v.id}`}>Lead time for {optionText(v.options)}</label>
                              <input
                                id={`lead-${v.id}`}
                                value={v.lead_time}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  patchDraft({ variants: draft.variants.map((x, i) => (i === vi ? { ...x, lead_time: val } : x)) });
                                }}
                                className={`w-56 rounded-lg border px-2 py-1.5 text-sm ${focusCls}`}
                                style={inputStyle}
                              />
                            </div>
                          )}
                          <span className="mt-1 block text-xs" style={{ color: brand.neutralColor }}>
                            {v.fulfilment_type === 'stocked' ? 'Sells from the shelf' : 'Printed to order — no stock check'}
                          </span>
                        </td>
                        <td className="px-2 py-3">
                          <Toggle
                            checked={v.active}
                            onChange={(val) => patchDraft({ variants: draft.variants.map((x, i) => (i === vi ? { ...x, active: val } : x)) })}
                            label={`Offer ${optionText(v.options)} on the storefront`}
                          />
                        </td>
                        <td className="px-2 py-3 text-right">
                          <button
                            type="button"
                            aria-label={`Remove variant ${optionText(v.options)}`}
                            onClick={() => patchDraft({ variants: draft.variants.filter((_, i) => i !== vi) })}
                            className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${focusCls}`}
                            style={{ color: '#B33E22', backgroundColor: hexA(brand.accentColor, 0.12), ...focusStyle }}
                          >
                            <Trash className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}

            {vForm ? (
              <div className="animate-ps-in mt-4 rounded-lg border p-4" style={{ borderColor: hexA(brand.primaryColor, 0.35), backgroundColor: hexA(brand.primaryColor, 0.04), borderRadius: brand.radius }}>
                <h4 className="mb-3 text-sm font-bold" style={{ color: '#201C2E' }}>New variant</h4>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div>
                    <label htmlFor="v-colour" className={labelCls} style={labelStyle}>Colour</label>
                    <input id="v-colour" value={vForm.colour} onChange={(e) => setVForm({ ...vForm, colour: e.target.value })} className={inputCls} style={inputStyle} placeholder="Ember red" />
                  </div>
                  <div>
                    <label htmlFor="v-size" className={labelCls} style={labelStyle}>Size / scale</label>
                    <input id="v-size" value={vForm.size} onChange={(e) => setVForm({ ...vForm, size: e.target.value })} className={inputCls} style={inputStyle} placeholder="120 mm" />
                  </div>
                  <div>
                    <label htmlFor="v-finish" className={labelCls} style={labelStyle}>Finish</label>
                    <input id="v-finish" value={vForm.finish} onChange={(e) => setVForm({ ...vForm, finish: e.target.value })} className={inputCls} style={inputStyle} placeholder="Matte" />
                  </div>
                </div>
                {vErrors.options ? <p role="alert" className="mt-1.5 text-sm font-medium" style={{ color: '#B33E22' }}>{vErrors.options}</p> : null}

                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  <div>
                    <label htmlFor="v-price" className={labelCls} style={labelStyle}>Price (£)</label>
                    <input
                      id="v-price" type="number" min="0" step="0.50" value={vForm.price}
                      onChange={(e) => setVForm({ ...vForm, price: e.target.value })}
                      aria-invalid={!!vErrors.price}
                      className={inputCls}
                      style={{ ...inputStyle, borderColor: vErrors.price ? brand.accentColor : inputStyle.borderColor }}
                      placeholder="18.00"
                    />
                    {vErrors.price ? <p role="alert" className="mt-1.5 text-sm font-medium" style={{ color: '#B33E22' }}>{vErrors.price}</p> : null}
                  </div>
                  <fieldset className="sm:col-span-2">
                    <legend className={labelCls} style={labelStyle}>Fulfilment</legend>
                    <div className="flex flex-wrap gap-4 pt-1">
                      {[
                        { v: 'stocked', l: 'Stocked — I count what is on the shelf' },
                        { v: 'printed_to_order', l: 'Printed to order — show a lead time' }
                      ].map((o) => (
                        <label key={o.v} className="flex items-center gap-2 text-sm" style={{ color: '#262233' }}>
                          <input
                            type="radio"
                            name="fulfilment"
                            value={o.v}
                            checked={vForm.fulfilment_type === o.v}
                            onChange={() => setVForm({ ...vForm, fulfilment_type: o.v })}
                            className="h-4 w-4"
                            style={{ accentColor: brand.primaryColor }}
                          />
                          {o.l}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>

                <div className="mt-3">
                  {vForm.fulfilment_type === 'stocked' ? (
                    <div className="sm:w-48">
                      <label htmlFor="v-stock" className={labelCls} style={labelStyle}>Stock count</label>
                      <input id="v-stock" type="number" min="0" value={vForm.stock_count} onChange={(e) => setVForm({ ...vForm, stock_count: e.target.value })} className={inputCls} style={{ ...inputStyle, borderColor: vErrors.stock ? brand.accentColor : inputStyle.borderColor }} placeholder="12" />
                      {vErrors.stock ? <p role="alert" className="mt-1.5 text-sm font-medium" style={{ color: '#B33E22' }}>{vErrors.stock}</p> : null}
                    </div>
                  ) : (
                    <div className="sm:w-96">
                      <label htmlFor="v-lead" className={labelCls} style={labelStyle}>Lead time shown to customers</label>
                      <input id="v-lead" value={vForm.lead_time} onChange={(e) => setVForm({ ...vForm, lead_time: e.target.value })} className={inputCls} style={{ ...inputStyle, borderColor: vErrors.lead ? brand.accentColor : inputStyle.borderColor }} placeholder="3–5 working days to print" />
                      {vErrors.lead ? <p role="alert" className="mt-1.5 text-sm font-medium" style={{ color: '#B33E22' }}>{vErrors.lead}</p> : null}
                    </div>
                  )}
                </div>

                <div className="mt-4 flex gap-2">
                  <PrimaryButton onClick={addVariant}><Check className="h-4 w-4" aria-hidden="true" /> Add this variant</PrimaryButton>
                  <GhostButton onClick={() => { setVForm(null); setVErrors({}); }}>Cancel</GhostButton>
                </div>
              </div>
            ) : null}
          </section>
        </div>

        {/* photos */}
        <section className="rounded-xl border bg-white p-5" style={cardStyle}>
          <h3 className="text-base font-bold" style={{ color: '#201C2E' }}>Photos</h3>
          <p className="mt-1 text-xs" style={{ color: brand.neutralColor }}>
            JPG or PNG up to 8 MB. The first photo is the listing image. Uploaded photos only — this shop does not host 3D files, a viewer or AR previews.
          </p>

          {draft.images.length === 0 ? (
            <div className="mt-4 rounded-lg border border-dashed px-4 py-10 text-center" style={{ borderColor: hexA(brand.neutralColor, 0.3) }}>
              <Upload className="mx-auto h-5 w-5" style={{ color: brand.primaryColor }} aria-hidden="true" />
              <p className="mt-2 text-sm font-semibold" style={{ color: '#201C2E' }}>No photos yet</p>
              <p className="mt-1 text-xs" style={{ color: brand.neutralColor }}>The first one you add becomes the listing image on category pages.</p>
            </div>
          ) : (
            <ul className="mt-4 grid grid-cols-2 gap-3">
              {draft.images.map((im, i) => (
                <li key={im.id} className="animate-ps-in">
                  <div
                    className="relative flex aspect-square items-end overflow-hidden rounded-lg p-2"
                    style={{
                      background: `linear-gradient(${135 + i * 25}deg, ${hexA(brand.primaryColor, 0.22)}, ${hexA(brand.accentColor, 0.26)})`,
                      borderRadius: brand.radius
                    }}
                  >
                    {i === 0 ? <span className="absolute left-2 top-2"><Pill tone="live">Listing image</Pill></span> : null}
                    <span className="truncate rounded bg-white/85 px-1.5 py-0.5 text-[11px] font-medium" style={{ color: '#262233' }}>{im.s3_key}</span>
                  </div>
                  <div className="mt-1.5 flex gap-1">
                    <button
                      type="button" aria-label={`Move ${im.s3_key} earlier`} disabled={i === 0}
                      onClick={() => { const a = draft.images.slice(); [a[i - 1], a[i]] = [a[i], a[i - 1]]; patchDraft({ images: a }); }}
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-md border disabled:opacity-30 ${focusCls}`}
                      style={{ borderColor: hexA(brand.neutralColor, 0.25), color: brand.primaryColor, ...focusStyle }}
                    ><ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /></button>
                    <button
                      type="button" aria-label={`Move ${im.s3_key} later`} disabled={i === draft.images.length - 1}
                      onClick={() => { const a = draft.images.slice(); [a[i + 1], a[i]] = [a[i], a[i + 1]]; patchDraft({ images: a }); }}
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-md border disabled:opacity-30 ${focusCls}`}
                      style={{ borderColor: hexA(brand.neutralColor, 0.25), color: brand.primaryColor, ...focusStyle }}
                    ><ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /></button>
                    <button
                      type="button" aria-label={`Delete ${im.s3_key}`}
                      onClick={() => patchDraft({ images: draft.images.filter((_, x) => x !== i) })}
                      className={`ml-auto inline-flex h-8 w-8 items-center justify-center rounded-md ${focusCls}`}
                      style={{ color: '#B33E22', backgroundColor: hexA(brand.accentColor, 0.12), ...focusStyle }}
                    ><Trash className="h-3.5 w-3.5" aria-hidden="true" /></button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <button
            type="button"
            onClick={() => patchDraft({ images: [...draft.images, img(`${slugify(draft.name) || 'upload'}-${draft.images.length + 1}.jpg`)] })}
            className={`mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed px-4 py-3 text-sm font-semibold ${focusCls}`}
            style={{ borderColor: hexA(brand.primaryColor, 0.45), color: brand.primaryColor, borderRadius: brand.radius, ...focusStyle }}
          >
            <Upload className="h-4 w-4" aria-hidden="true" /> Upload photos
          </button>
        </section>
      </div>
    </div>
  );

  /* ---------------------------------- categories ------------------------------------ */
  const renderCategories = () => (
    <div className="max-w-3xl">
      <SectionHeading sub="A category appears in storefront navigation once it holds at least one published product.">
        Categories
      </SectionHeading>

      <form
        className="mb-5 flex flex-wrap items-end gap-3 rounded-xl border bg-white p-4"
        style={cardStyle}
        onSubmit={(e) => {
          e.preventDefault();
          const name = newCat.trim();
          if (!name) return;
          setCategories((list) => [...list, { id: 'c' + (list.length + 1) + Date.now(), name, slug: slugify(name), created_at: '2026-10-15', isNew: true }]);
          setNewCat('');
          setToast({ kind: 'ok', text: `Category “${name}” created` });
          setCatNotice(null);
        }}
      >
        <div className="min-w-[14rem] flex-1">
          <label htmlFor="new-cat" className={labelCls} style={labelStyle}>New category name</label>
          <input id="new-cat" value={newCat} onChange={(e) => setNewCat(e.target.value)} className={inputCls} style={inputStyle} placeholder="Halloween 2026" />
        </div>
        <PrimaryButton type="submit"><Plus className="h-4 w-4" aria-hidden="true" /> Create category</PrimaryButton>
      </form>

      {catNotice ? (
        <div role="alert" className="animate-ps-in mb-4 flex items-start gap-3 rounded-xl border p-4" style={{ borderColor: hexA(brand.accentColor, 0.5), backgroundColor: hexA(brand.accentColor, 0.1), borderRadius: brand.radius }}>
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" style={{ color: '#B33E22' }} aria-hidden="true" />
          <div>
            <p className="text-sm font-bold" style={{ color: '#201C2E' }}>{catNotice.title}</p>
            <p className="mt-0.5 text-sm" style={{ color: brand.neutralColor }}>{catNotice.body}</p>
          </div>
          <button type="button" onClick={() => setCatNotice(null)} aria-label="Dismiss message" className={`ml-auto rounded-full p-1 ${focusCls}`} style={{ color: brand.neutralColor, ...focusStyle }}>
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      ) : null}

      <ul className="divide-y overflow-hidden rounded-xl border bg-white" style={cardStyle}>
        {categories.map((c) => {
          const n = productCount(c.id);
          return (
            <li key={c.id} className={`flex flex-wrap items-center gap-3 px-4 py-3.5 ${c.isNew ? 'animate-ps-in' : ''}`} style={{ borderColor: hexA(brand.neutralColor, 0.14) }}>
              {renaming === c.id ? (
                <form
                  className="flex flex-1 flex-wrap items-end gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const name = renameText.trim();
                    if (!name) return;
                    setCategories((list) => list.map((x) => (x.id === c.id ? { ...x, name, slug: slugify(name) } : x)));
                    setRenaming(null);
                    setToast({ kind: 'ok', text: `Renamed to “${name}” — storefront navigation updated` });
                  }}
                >
                  <div className="min-w-[12rem] flex-1">
                    <label htmlFor={`rename-${c.id}`} className={labelCls} style={labelStyle}>Rename category</label>
                    <input id={`rename-${c.id}`} value={renameText} onChange={(e) => setRenameText(e.target.value)} className={inputCls} style={inputStyle} />
                  </div>
                  <PrimaryButton type="submit"><Check className="h-4 w-4" aria-hidden="true" /> Save</PrimaryButton>
                  <GhostButton onClick={() => setRenaming(null)}>Cancel</GhostButton>
                </form>
              ) : (
                <>
                  <div className="min-w-[10rem] flex-1">
                    <p className="text-sm font-semibold" style={{ color: '#201C2E' }}>{c.name}</p>
                    <p className="text-xs" style={{ color: brand.neutralColor }}>/{c.slug} · added {c.created_at}</p>
                  </div>
                  <span className="text-sm" style={{ color: brand.neutralColor, fontVariantNumeric: 'tabular-nums' }}>
                    {n === 0 ? 'No products' : `${n} product${n === 1 ? '' : 's'}`}
                  </span>
                  <GhostButton small onClick={() => { setRenaming(c.id); setRenameText(c.name); setCatNotice(null); }}>
                    <Edit className="h-3.5 w-3.5" aria-hidden="true" /> Rename
                  </GhostButton>
                  <GhostButton
                    small danger
                    onClick={() => {
                      if (n > 0) {
                        setCatNotice({
                          title: `“${c.name}” still holds ${n} product${n === 1 ? '' : 's'}`,
                          body: 'Move those products to another category or unpublish them first — deleting now would leave them stranded.'
                        });
                        return;
                      }
                      setCategories((list) => list.filter((x) => x.id !== c.id));
                      setToast({ kind: 'ok', text: `Category “${c.name}” deleted` });
                      setCatNotice(null);
                    }}
                  >
                    <Trash className="h-3.5 w-3.5" aria-hidden="true" /> Delete
                  </GhostButton>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );

  /* ---------------------------------- postage & tax --------------------------------- */
  const anyActivePostage = postage.some((p) => p.active);
  const renderPostage = () => (
    <div className="grid max-w-5xl gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
      <div className="space-y-5">
        <section className="rounded-xl border bg-white p-5" style={cardStyle}>
          <SectionHeading sub="Flat rates you set yourself. No live carrier quotes — what you type is what customers pay.">
            Postage options
          </SectionHeading>

          {!anyActivePostage ? (
            <div role="alert" className="animate-ps-in mb-4 flex items-start gap-3 rounded-lg p-3.5" style={{ backgroundColor: hexA(brand.accentColor, 0.12), borderRadius: brand.radius }}>
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" style={{ color: '#B33E22' }} aria-hidden="true" />
              <p className="text-sm" style={{ color: '#201C2E' }}>
                <strong>No postage option is switched on.</strong> Customers cannot finish checkout until at least one is active.
              </p>
            </div>
          ) : null}

          <ul className="space-y-3">
            {postage.map((p, i) => (
              <li key={p.id} className={`rounded-lg border p-4 ${p.isNew ? 'animate-ps-in' : ''}`} style={{ borderColor: hexA(brand.neutralColor, 0.2), borderRadius: brand.radius, opacity: p.active ? 1 : 0.6 }}>
                <div className="flex flex-wrap items-start gap-3">
                  <div className="min-w-[12rem] flex-1">
                    <p className="text-sm font-bold" style={{ color: '#201C2E' }}>
                      {p.name} {!p.active ? <Pill>Switched off</Pill> : null}
                    </p>
                    <p className="mt-0.5 text-sm" style={{ color: brand.neutralColor }}>{p.description}</p>
                  </div>
                  <div>
                    <label htmlFor={`pp-${p.id}`} className={labelCls} style={labelStyle}>Flat price</label>
                    <div className="flex items-center gap-1">
                      <span style={{ color: brand.neutralColor }}>£</span>
                      <input
                        id={`pp-${p.id}`} type="number" min="0" step="0.01" value={p.price}
                        onChange={(e) => { const val = e.target.value; setPostage((l) => l.map((x, xi) => (xi === i ? { ...x, price: val === '' ? 0 : Number(val) } : x))); }}
                        className={`w-24 rounded-lg border px-2 py-1.5 text-sm ${focusCls}`}
                        style={{ ...inputStyle, fontVariantNumeric: 'tabular-nums' }}
                      />
                    </div>
                  </div>
                  <div className="self-end pb-1">
                    <Toggle checked={p.active} onChange={(v) => setPostage((l) => l.map((x, xi) => (xi === i ? { ...x, active: v } : x)))} label={`Offer ${p.name} at checkout`} />
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <form
            className="mt-4 grid gap-3 rounded-lg border border-dashed p-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_auto] sm:items-end"
            style={{ borderColor: hexA(brand.primaryColor, 0.4), borderRadius: brand.radius }}
            onSubmit={(e) => {
              e.preventDefault();
              if (!newPostage.name.trim()) return;
              setPostage((l) => [...l, { id: 'po' + Date.now(), name: newPostage.name.trim(), description: newPostage.description.trim() || 'Flat rate', price: Number(newPostage.price || 0), active: true, isNew: true }]);
              setToast({ kind: 'ok', text: `“${newPostage.name.trim()}” is now offered at checkout` });
              setNewPostage({ name: '', description: '', price: '' });
            }}
          >
            <div>
              <label htmlFor="np-name" className={labelCls} style={labelStyle}>Option name</label>
              <input id="np-name" value={newPostage.name} onChange={(e) => setNewPostage({ ...newPostage, name: e.target.value })} className={inputCls} style={inputStyle} placeholder="Special delivery" />
            </div>
            <div>
              <label htmlFor="np-desc" className={labelCls} style={labelStyle}>Short description</label>
              <input id="np-desc" value={newPostage.description} onChange={(e) => setNewPostage({ ...newPostage, description: e.target.value })} className={inputCls} style={inputStyle} placeholder="Guaranteed by 1pm next day" />
            </div>
            <div className="flex items-end gap-2">
              <div>
                <label htmlFor="np-price" className={labelCls} style={labelStyle}>£</label>
                <input id="np-price" type="number" min="0" step="0.01" value={newPostage.price} onChange={(e) => setNewPostage({ ...newPostage, price: e.target.value })} className={`w-24 ${inputCls}`} style={inputStyle} placeholder="7.95" />
              </div>
              <PrimaryButton type="submit"><Plus className="h-4 w-4" aria-hidden="true" /> Add</PrimaryButton>
            </div>
          </form>
        </section>

        <section className="rounded-xl border bg-white p-5" style={cardStyle}>
          <SectionHeading sub="Applies to the cheapest active option once the goods subtotal reaches your threshold.">
            Free postage
          </SectionHeading>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Toggle checked={settings.free_postage_enabled} onChange={(v) => setSettings({ ...settings, free_postage_enabled: v })} label="Offer free postage above a spend threshold" />
              <span className="text-sm font-semibold" style={{ color: '#201C2E' }}>
                {settings.free_postage_enabled ? 'Free postage is on' : 'Free postage is off'}
              </span>
            </div>
            <div>
              <label htmlFor="fp-threshold" className={labelCls} style={labelStyle}>Spend threshold</label>
              <div className="flex items-center gap-1">
                <span style={{ color: brand.neutralColor }}>£</span>
                <input
                  id="fp-threshold" type="number" min="0" step="1" value={settings.free_postage_threshold}
                  disabled={!settings.free_postage_enabled}
                  onChange={(e) => setSettings({ ...settings, free_postage_threshold: e.target.value })}
                  className={`w-28 rounded-lg border px-2 py-2 text-sm disabled:opacity-40 ${focusCls}`}
                  style={{ ...inputStyle, fontVariantNumeric: 'tabular-nums' }}
                />
              </div>
            </div>
          </div>
          <p className="mt-3 text-sm" style={{ color: brand.neutralColor }}>
            {settings.free_postage_enabled
              ? `Carts of ${money(settings.free_postage_threshold)} or more see Standard postage at £0.00, labelled “Free postage”.`
              : 'Every order pays the full flat rate for the option they pick.'}
          </p>
        </section>
      </div>

      <div className="space-y-5">
        <section className="rounded-xl border bg-white p-5" style={cardStyle}>
          <SectionHeading sub="One domestic rate, shown as its own line at checkout.">Tax, currency &amp; language</SectionHeading>
          <div className="space-y-4">
            <div>
              <label htmlFor="tax-rate" className={labelCls} style={labelStyle}>VAT rate (%)</label>
              <input
                id="tax-rate" type="number" min="0" max="100" step="0.5" value={settings.tax_rate}
                aria-invalid={!!settingsError}
                aria-describedby={settingsError ? 'tax-err' : undefined}
                onChange={(e) => setSettings({ ...settings, tax_rate: e.target.value })}
                className={inputCls}
                style={{ ...inputStyle, fontVariantNumeric: 'tabular-nums', borderColor: settingsError ? brand.accentColor : inputStyle.borderColor }}
              />
            </div>
            {settingsError ? (
              <p id="tax-err" role="alert" className="flex items-start gap-2 rounded-lg p-3 text-sm" style={{ backgroundColor: hexA(brand.accentColor, 0.12), color: '#201C2E', borderRadius: brand.radius }}>
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" style={{ color: '#B33E22' }} aria-hidden="true" />
                {settingsError}
              </p>
            ) : null}
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="shop-currency" className={labelCls} style={labelStyle}>Currency</label>
                <input id="shop-currency" value={settings.currency} readOnly className={inputCls} style={{ ...inputStyle, backgroundColor: hexA(brand.neutralColor, 0.07) }} />
              </div>
              <div>
                <label htmlFor="shop-language" className={labelCls} style={labelStyle}>Language</label>
                <input id="shop-language" value={settings.language} readOnly className={inputCls} style={{ ...inputStyle, backgroundColor: hexA(brand.neutralColor, 0.07) }} />
              </div>
            </div>
            <p className="text-xs" style={{ color: brand.neutralColor }}>
              Set once at install. The shop runs in a single currency and language, and posts to UK addresses only — there is no switcher for customers.
            </p>
            <PrimaryButton full onClick={saveSettings} disabled={!!pending}>
              {busy('settings') ? (<><span className="ps-dots" aria-hidden="true" /> Saving…</>) : (<><Check className="h-4 w-4" aria-hidden="true" /> Save postage &amp; tax</>)}
            </PrimaryButton>
          </div>
        </section>

        <section className="rounded-xl border p-5" style={{ ...cardStyle, backgroundColor: hexA(brand.neutralColor, 0.06) }}>
          <h3 className="flex items-center gap-2 text-base font-bold" style={{ color: '#201C2E' }}>
            <AlertCircle className="h-4 w-4" style={{ color: brand.neutralColor }} aria-hidden="true" />
            Payment &amp; email keys
          </h3>
          <p className="mt-2 text-sm" style={{ color: brand.neutralColor }}>
            You are signed in as a studio assistant, so these are hidden. Only the shop owner, Nia Oyelaran, can see or change the Stripe and email provider keys.
          </p>
          <p className="mt-2 text-sm" style={{ color: brand.neutralColor }}>
            Need one rotated? Email <span className="font-semibold" style={{ color: '#201C2E' }}>nia@pocketshelf.co.uk</span> and she can update them from Settings → Credentials.
          </p>
        </section>
      </div>
    </div>
  );

  /* ---------------------------------- content pages --------------------------------- */
  const renderPages = () => (
    <div className="grid max-w-5xl gap-5 lg:grid-cols-[14rem_minmax(0,1fr)]">
      <nav aria-label="Content pages">
        <h2 className="mb-3 text-lg font-bold" style={{ color: '#201C2E' }}>Pages</h2>
        <ul className="space-y-1.5">
          {pages.map((p) => {
            const on = p.slug === pageSlug;
            return (
              <li key={p.slug}>
                <button
                  type="button"
                  aria-current={on ? 'page' : undefined}
                  onClick={() => { setPageSlug(p.slug); setPageDraft(p); }}
                  className={`w-full rounded-lg border px-3 py-2.5 text-left transition-colors ${focusCls}`}
                  style={{
                    backgroundColor: on ? hexA(brand.primaryColor, 0.1) : '#FFFFFF',
                    borderColor: on ? brand.primaryColor : hexA(brand.neutralColor, 0.2),
                    borderRadius: brand.radius,
                    outlineColor: brand.primaryColor
                  }}
                >
                  <span className="block text-sm font-semibold" style={{ color: on ? brand.primaryColor : '#201C2E' }}>{p.title}</span>
                  <span className="mt-0.5 block text-xs" style={{ color: brand.neutralColor }}>
                    {p.published ? 'Published' : 'Draft'} · {p.updated_at}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <p className="mt-3 text-xs" style={{ color: brand.neutralColor }}>
          These four pages are fixed and link from the storefront footer. There is no blog or page builder.
        </p>
      </nav>

      <section className="rounded-xl border bg-white p-5" style={cardStyle}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-base font-bold" style={{ color: '#201C2E' }}>Editing /{pageDraft.slug}</h3>
          <div className="flex items-center gap-3">
            <span className="text-sm" style={{ color: brand.neutralColor }}>{pageDraft.published ? 'Published' : 'Draft'}</span>
            <Toggle checked={pageDraft.published} onChange={(v) => setPageDraft({ ...pageDraft, published: v })} label="Publish this page in the storefront footer" />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label htmlFor="page-title" className={labelCls} style={labelStyle}>Page title</label>
            <input id="page-title" value={pageDraft.title} onChange={(e) => setPageDraft({ ...pageDraft, title: e.target.value })} className={inputCls} style={inputStyle} />
          </div>
          <div>
            <label htmlFor="page-body" className={labelCls} style={labelStyle}>Page content</label>
            <textarea id="page-body" rows={14} value={pageDraft.body} onChange={(e) => setPageDraft({ ...pageDraft, body: e.target.value })} className={inputCls + ' leading-relaxed'} style={inputStyle} />
            <p className="mt-1.5 text-xs" style={{ color: brand.neutralColor }}>
              {pageDraft.body.trim().split(/\s+/).filter(Boolean).length} words · blank lines become paragraphs on the storefront.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <PrimaryButton onClick={savePage} disabled={!!pending}>
              {busy('page') ? (<><span className="ps-dots" aria-hidden="true" /> Saving…</>) : (<><Check className="h-4 w-4" aria-hidden="true" /> Save page</>)}
            </PrimaryButton>
            <GhostButton onClick={() => navigate('catalogue')}>View the storefront</GhostButton>
          </div>
        </div>
      </section>
    </div>
  );

  /* ---------------------------------- guide ----------------------------------------- */
  const renderGuide = () => {
    const done = guideDone.length;
    return (
      <div className="max-w-3xl">
        <SectionHeading sub="Written for the first week. Work down the list and you will have taken and shipped a real order by the end of it.">
          Getting started with Pocket Shelf
        </SectionHeading>

        <div className="mb-6 rounded-xl border bg-white p-5" style={cardStyle}>
          <div className="flex items-baseline justify-between">
            <p className="text-sm font-semibold" style={{ color: '#201C2E' }}>Setup progress</p>
            <p className="text-sm font-bold" style={{ color: brand.primaryColor, fontVariantNumeric: 'tabular-nums' }}>
              {done} of {GUIDE_STEPS.length} done
            </p>
          </div>
          <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full" style={{ backgroundColor: hexA(brand.neutralColor, 0.15) }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${(done / GUIDE_STEPS.length) * 100}%`, backgroundColor: brand.accentColor }}
            />
          </div>
        </div>

        <ol className="space-y-3">
          {GUIDE_STEPS.map((s, i) => {
            const checked = guideDone.includes(s.id);
            return (
              <li key={s.id} className="rounded-xl border bg-white p-4" style={cardStyle}>
                <div className="flex items-start gap-3">
                  <input
                    id={`guide-${s.id}`}
                    type="checkbox"
                    checked={checked}
                    onChange={() => setGuideDone((l) => (checked ? l.filter((x) => x !== s.id) : [...l, s.id]))}
                    className={`mt-1 h-5 w-5 shrink-0 ${focusCls}`}
                    style={{ accentColor: brand.primaryColor, outlineColor: brand.primaryColor }}
                  />
                  <div>
                    <label htmlFor={`guide-${s.id}`} className="cursor-pointer text-sm font-bold" style={{ color: '#201C2E', textDecoration: checked ? 'line-through' : 'none' }}>
                      {i + 1}. {s.title}
                    </label>
                    <p className="mt-1 text-sm leading-relaxed" style={{ color: brand.neutralColor }}>{s.body}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <section className="mt-6 rounded-xl border p-5" style={{ ...cardStyle, backgroundColor: hexA(brand.primaryColor, 0.05) }}>
          <h3 className="text-base font-bold" style={{ color: '#201C2E' }}>Keys the shop owner must supply</h3>
          <p className="mt-1 text-sm" style={{ color: brand.neutralColor }}>
            Entered once in Settings → Credentials. Until all three are present the site shows a setup error instead of taking payment.
          </p>
          <ul className="mt-3 space-y-2">
            {CREDENTIALS.map((c) => (
              <li key={c.key} className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg bg-white px-3 py-2.5" style={{ borderRadius: brand.radius }}>
                <code className="text-xs font-bold" style={{ color: brand.primaryColor }}>{c.key}</code>
                <span className="text-sm" style={{ color: brand.neutralColor }}>{c.what}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-5 flex flex-wrap gap-2">
          <PrimaryButton onClick={() => navigate('admin-orders')}>Open the order queue <ChevronRight className="h-4 w-4" aria-hidden="true" /></PrimaryButton>
          <GhostButton onClick={() => navigate('catalogue')}>View the storefront</GhostButton>
        </div>
      </div>
    );
  };

  const panels = {
    products: editingId ? renderEditor() : renderProductList(),
    categories: renderCategories(),
    postage: renderPostage(),
    pages: renderPages(),
    guide: renderGuide()
  };

  return (
    <div style={{ backgroundColor: brand.backgroundColor, fontFamily: brand.fontBody, color: '#262233' }} className="min-h-full">
      <style>{`
        @keyframes psIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        .animate-ps-in { animation: psIn 240ms cubic-bezier(.22,1,.36,1) both; }
        @keyframes psPulse { 0%,100% { opacity: .35; } 50% { opacity: 1; } }
        .ps-dots { display:inline-block; width:.5rem; height:.5rem; border-radius:9999px; background:currentColor; animation: psPulse 900ms ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .animate-ps-in, .ps-dots { animation: none !important; }
          * { transition-duration: 1ms !important; }
        }
      `}</style>

      <div className="mx-auto max-w-6xl px-4 py-7 sm:px-6 lg:px-8">
        <header className="mb-6">
          <p className="text-xs font-semibold uppercase" style={{ color: brand.accentColor, letterSpacing: '0.1em' }}>
            Pocket Shelf admin
          </p>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ color: '#1B1729', fontFamily: brand.fontHeading }}>
                Catalogue &amp; shop setup
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed" style={{ color: brand.neutralColor }}>
                Everything customers see: the models you sell, what each variant costs, what is on the shelf, what gets printed to order, and the postage, tax and policy pages behind checkout.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-medium" style={{ color: brand.neutralColor, border: `1px solid ${hexA(brand.neutralColor, 0.2)}` }}>
                <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: brand.primaryColor }} aria-hidden="true" />
                Catalogue synced 4 minutes ago
              </span>
              <GhostButton onClick={() => navigate('admin-orders')}>Order queue</GhostButton>
            </div>
          </div>
        </header>

        <div role="tablist" aria-label="Catalogue and shop setup sections" className="mb-6 flex flex-wrap gap-1.5 border-b pb-px" style={{ borderColor: hexA(brand.neutralColor, 0.2) }}>
          {TABS.map((t, i) => {
            const on = tab === t.id;
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                ref={(el) => { tabRefs.current[i] = el; }}
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={on}
                aria-controls={`panel-${t.id}`}
                tabIndex={on ? 0 : -1}
                onKeyDown={(e) => onTabKey(e, i)}
                onClick={() => setTab(t.id)}
                className={`inline-flex items-center gap-2 rounded-t-lg px-3.5 py-2.5 text-sm font-semibold transition-colors ${focusCls}`}
                style={{
                  backgroundColor: on ? '#FFFFFF' : 'transparent',
                  color: on ? brand.primaryColor : brand.neutralColor,
                  boxShadow: on ? `inset 0 -3px 0 0 ${brand.primaryColor}` : 'none',
                  outlineColor: brand.primaryColor
                }}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {t.label}
              </button>
            );
          })}
        </div>

        {TABS.map((t) => (
          <div
            key={t.id}
            role="tabpanel"
            id={`panel-${t.id}`}
            aria-labelledby={`tab-${t.id}`}
            hidden={tab !== t.id}
            tabIndex={-1}
          >
            {tab === t.id ? panels[t.id] : null}
          </div>
        ))}
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-4 flex justify-center px-4" aria-live="polite" role="status">
        {toast ? (
          <div
            className="animate-ps-in pointer-events-auto flex items-center gap-3 rounded-full px-4 py-3 shadow-lg"
            style={{ backgroundColor: '#1B1729', color: '#FFFFFF', borderRadius: '999px' }}
          >
            <CheckCircle className="h-4 w-4 shrink-0" style={{ color: brand.accentColor }} aria-hidden="true" />
            <span className="text-sm font-medium">{toast.text}</span>
            <button
              type="button"
              onClick={() => setToast(null)}
              aria-label="Dismiss notification"
              className={`rounded-full p-1 ${focusCls}`}
              style={{ color: '#FFFFFF', outlineColor: brand.accentColor }}
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
