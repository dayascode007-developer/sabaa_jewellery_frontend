// STATIC FOR NOW — this is the shape a future API should return, so swapping in
// real data means replacing getProductsBySlug() and nothing else.
//   { id, category, title, price, mrp, image }
// `mrp` is the struck-through original; the discount badge is derived from the
// difference, so it never disagrees with the prices shown.

export const CATEGORY_LABELS = {
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

export function getCategoryLabel(slug) {
  return CATEGORY_LABELS[slug] ?? "Products";
}

// Every category returns the same sample set while this is static. Swap the
// body for a fetch and the pages keep working unchanged.
export function getProductsBySlug() {
  return SAMPLE_PRODUCTS;
}

// Detail-page fields. Kept separate from the card fields so the grid payload
// stays small; a real API would return these only on the detail endpoint.
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
  const base = SAMPLE_PRODUCTS.find((p) => p.id === id);
  if (!base) return null;
  return { ...PRODUCT_DETAIL, ...base };
}
