// STATIC FOR NOW — this is the shape a future API should return, so swapping in
// real data means replacing getProductsBySlug() and nothing else.
//   { id, category, title, price, mrp, image }
// `mrp` is the struck-through original; the discount badge is derived from the
// difference, so it never disagrees with the prices shown.

import {
  GENERATED_PRODUCTS,
  GENERATED_CATEGORY_LABELS,
  CATEGORY_GALLERY,
} from "./generatedProducts";

export const CATEGORY_LABELS = {
  // Top-level nav destinations — these have no dropdown of their own, so the
  // nav label links straight to a listing page.
  "all-jewellery": "All Jewellery",
  bracelet: "Bracelet",

  // The "Shop by Categories" tiles on the home page.
  "engraving-rings": "Engraving Rings",
  "face-photo-rings": "Face & Photo Rings",
  "symbol-rings": "Symbol Rings",
  "womens-chain": "Womens Chain",
  "kids-chain": "Kids Chain",
  earrings: "Earrings",

  "name-engrave-ring": "Name Engrave Ring",
  "astrology-raasi-rings": "Astrology Raasi Rings",
  "face-photo-ring": "Face & Photo Ring",
  "hindu-rings": "Hindu Rings",
  "christian-rings": "Christian Rings",
  "muslim-rings": "Muslim Rings",
  "mens-chain": "Mens Chain",
  "female-chain": "Female Chain",
  "kidz-chain": "Kidz Chain",
  "hindu-pendants": "Hindu Pendants",
  "christian-pendants": "Christian Pendants",
  "stud": "Stud",
  "jimikki": "Jimikki",
};

const SAMPLE_PRODUCTS = [
  { id: "p1", category: "Photo Rings", title: "Custom Face Engraved Panchaloga Ring - Unique & Personalised", price: 1400, mrp: 1600, image: null },
  { id: "p2", category: "Photo Rings", title: "Personalized Photo Ring PR01 – Oval 1/2 Inch Photo Sized", price: 1000, mrp: 1200, image: null },
  { id: "p3", category: "Photo Rings", title: "Personalized Photo Ring - 3/4”Inch- Oval AD Stone-PR03S", price: 1400, mrp: 1600, image: null },
  { id: "p4", category: "Photo Rings", title: "Photo Ring- VIP Square Stone Model PS03S", price: 1600, mrp: 2100, image: null },
  { id: "p5", category: "Initial Rings, Laser Name Rings", title: "Stylish “K” Initial Panchaloga Ring", price: 885, mrp: 985, image: null },
  { id: "p6", category: "Initial Rings, Laser Name Rings", title: "Stylish “H” Initial Panchaloga Ring", price: 885, mrp: 985, image: null },
  { id: "p7", category: "Initial Rings, Laser Name Rings", title: "Stylish “G” Initial Panchaloga Ring", price: 885, mrp: 985, image: null },
  { id: "p8", category: "Initial Rings, Laser Name Rings", title: "Stylish “D” Initial Panchaloga Ring", price: 885, mrp: 995, image: null },
];

// Several slugs point at the same shelf — the nav and the home-page tiles grew
// separate names for the same thing. Rather than break either set of links,
// each alias resolves to the real category (or categories) it means.
const CATEGORY_ALIASES = {
  "engraving-rings": ["name-engrave-ring"],
  "face-photo-rings": ["face-photo-ring"],
  "symbol-rings": ["hindu-rings", "christian-rings", "muslim-rings"],
  "womens-chain": ["female-chain"],
  "kids-chain": ["kidz-chain"],
  earrings: ["jimikki"],
  stud: ["jimikki"],
};

// Only these are worn on a finger. Chains, pendants, earrings, anklets and
// bracelets get no ring-size selector and no ring-size guide.
const RING_CATEGORIES = new Set([
  "name-engrave-ring",
  "astrology-raasi-rings",
  "face-photo-ring",
  "hindu-rings",
  "christian-rings",
  "muslim-rings",
]);

export const isRingCategory = (category) => RING_CATEGORIES.has(category);

export function getCategoryLabel(slug) {
  return CATEGORY_LABELS[slug] ?? GENERATED_CATEGORY_LABELS[slug] ?? "Products";
}

// Static for now, but keyed by real category — swap the body for a fetch and
// every page keeps working unchanged.
export function getProductsBySlug(slug) {
  if (!slug || slug === "all-jewellery") return GENERATED_PRODUCTS;

  const wanted = CATEGORY_ALIASES[slug] ?? [slug];
  const found = GENERATED_PRODUCTS.filter((p) => wanted.includes(p.category));

  // A slug with no photography yet still shows a full page rather than an
  // empty one.
  return found.length ? found : GENERATED_PRODUCTS;
}

// Detail-page fields. Kept separate from the card fields so the grid payload
// stays small; a real API would return these only on the detail endpoint.
// Shown in full on every product page. Panchaloga behaves differently from
// plain gold or silver, and most returns start with someone not knowing that —
// so this is deliberately visible rather than hidden behind an accordion.
export const CARE_GUIDE = {
  intro:
    "Panchaloga is a living alloy of five metals. Looked after, an engraved piece keeps its detail for decades.",
  daily: [
    {
      id: "last-on",
      icon: "drop",
      title: "Last on, first off",
      body: "Put the piece on after perfume, cream and hairspray, and take it off before you do anything with your hands. That single habit does more than any polish.",
    },
    {
      id: "wipe",
      icon: "cloth",
      title: "Wipe it every night",
      body: "A soft dry cloth when you take it off removes the film of sweat and cosmetics that dulls an engraving. No water, no cleaning liquid.",
    },
    {
      id: "store",
      icon: "box",
      title: "Store it on its own",
      body: "Keep it in its pouch or a soft-lined box. Loose in a drawer, harder metals scratch across the engraving — and a scratch through a name cannot be polished out.",
    },
    {
      id: "dry",
      icon: "shield",
      title: "Remove before water",
      body: "Take it off for bathing, swimming and washing up. Chlorine is the fastest way to discolour the alloy, and salt water is not far behind.",
    },
  ],
  avoid: [
    "Perfume, deodorant, hairspray and moisturiser",
    "Chlorinated pools, salt water and long soaking",
    "Bleach, dishwashing liquid and household cleaners",
    "Toothpaste, baking soda and metal polish — all abrasive, and they soften engraved edges",
    "Ultrasonic cleaners, unless we have told you the piece can take one",
  ],
  patina: {
    title: "Darkening is normal, not a fault",
    body: "The copper in Panchaloga deepens in tone over months of wear, going darker in the recesses of an engraving and staying bright on the raised surfaces. It is the alloy behaving exactly as it should, and most people prefer it after a year to the day it arrived.",
  },
  service: {
    title: "Free polishing, for as long as you own it",
    body: "Bring the piece to our Cuddalore workshop or send it to us any time for a polish and a check of the setting. We do not charge for it. If something needs more than a dry cloth at home, send it to us rather than trying to fix it yourself.",
  },
};

const PRODUCT_DETAIL = {
  productCode: "PGRG00525",
  rating: 4,
  sizes: ["16", "17", "18", "19", "20", "21", "22"],
  maxQty: 1,
  bestseller: true,
  sections: [
    {
      id: "details",
      title: "Product Details",
      body: "Handcrafted in authentic Panchaloga — the traditional five-metal alloy of gold, silver, copper, zinc and iron. Laser engraved by skilled smiths and finished by hand.",
    },
    {
      id: "cleaning",
      title: "Cleaning & Polishing",
      body: "Wipe with a soft dry cloth after each wear. Avoid perfume, chlorine and household cleaners. Free polishing is offered at our Cuddalore store.",
    },
    {
      id: "guarantee",
      title: "Usage & Color Gaurantee",
      body: "Colour guaranteed for one year under normal wear. Remove before swimming, bathing or applying cosmetics.",
    },
    {
      id: "returns",
      title: "Return & Exchange Policy",
      body: "Returns accepted within 7 days of delivery in original condition. Personalised pieces are exchange-only.",
    },
    {
      id: "contact",
      title: "Our Address & Contact",
      body: "Sabaa Jewel Arts, 54 Gandhinagar, Vilvanagar, Semmandalam, Cuddalore, Tamilnadu 607002. Mobile: 7871900140.",
    },
  ],
  description:
    "Smoothly even 22 karat yellow gold circles form the center of this finger ring that will set every outfit ablaze with its stunning charm and style. Designed for the rigours of everyday wear, this finger ring can easily be worn with any attire — be it a simple traditional kurta or chic office formals. It goes great with jeans and casual tops making it a must have addition.",
};

export function getProductById(id) {
  const base = GENERATED_PRODUCTS.find((p) => p.id === id);
  if (!base) return null;

  return {
    ...PRODUCT_DETAIL,
    ...base,
    // The real product code out of the filename wins over the placeholder.
    productCode: base.code ?? PRODUCT_DETAIL.productCode,
    categoryLabel: getCategoryLabel(base.category),
    // Drives whether the page shows the ring-size selector and guide at all.
    hasRingSize: isRingCategory(base.category),
    // Main shot first, then any workshop/detail images shot for that category.
    gallery: [base.image, ...(CATEGORY_GALLERY[base.category] ?? [])].slice(0, 5),
  };
}

// Every product, for building static params.
export function getAllProducts() {
  return GENERATED_PRODUCTS;
}
