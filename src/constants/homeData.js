// Static imports let Next optimise the assets and gives each one intrinsic
// dimensions, so no width/height guessing is needed at the call site.
import engrave from "@/assets/jewels/engrave.png";
import faceAndPhotoRing from "@/assets/jewels/faceAndPhotoRing.png";
import symbolsRing from "@/assets/jewels/symbolsRing.png";
import mensChain from "@/assets/jewels/mensChain.png";
import womensChain from "@/assets/jewels/womensChain.png";
import kids from "@/assets/jewels/Kids.png";
import earings from "@/assets/jewels/earings.png";

import earringWidget from "@/assets/widget/Earing.jpg";
import ringWidget from "@/assets/widget/Ring.jpg";
import chainWidget from "@/assets/widget/Chain.jpg";

import panchalogaRings from "@/assets/jewels/image.png";
import divineRings from "@/assets/jewels/sabaa New arrival ring.png";
import godEngravedRings from "@/assets/jewels/sabaa god ring.png";
import templePendants from "@/assets/jewels/sabaa new divine temple  (1).png";

import murugaRing from "@/assets/CustomizeRing/muruga ring.png";
import craftedRing from "@/assets/CustomizeRing/crafted with tradition ring.png";
import vijayRing from "@/assets/CustomizeRing/vijay ring (1).png";

import heroBanner from "@/assets/banner/heroBanner.jpg";

import banner from "@/assets/banner/banner.png";
import banner1 from "@/assets/banner/banner1.jpg";
import banner3 from "@/assets/banner/banner3.jpg";
import banner4 from "@/assets/banner/banner4.jpg";
import banner5 from "@/assets/banner/banner5.jpg";

export const NAV_ITEMS = [
  { id: "all", label: "All Jewellery", href: "#" },
  { id: "rings", label: "Rings", href: "#" },
  { id: "impon", label: "Impon Chain", href: "#" },
  { id: "pendant", label: "Pendant", href: "#" },
  { id: "bracelet", label: "Bracelet", href: "#" },
  { id: "earrings", label: "Earrings", href: "#" },
  { id: "more", label: "More", href: "#" },
];

export const CATEGORIES = [
  { id: "engraving-rings", label: "Engraving Rings", image: engrave, href: "#" },
  { id: "face-photo-rings", label: "Face & Photo Rings", image: faceAndPhotoRing, href: "#" },
  { id: "symbol-rings", label: "Symbol Rings", image: symbolsRing, href: "#" },
  { id: "mens-chain", label: "Mens Chain", image: mensChain, href: "#" },
  { id: "womens-chain", label: "Womens Chain", image: womensChain, href: "#" },
  { id: "kids-chain", label: "Kids Chain", image: kids, href: "#" },
  { id: "earrings", label: "Earrings", image: earings, href: "#" },
];

// The banner artwork already contains the wordmark, headline, feature badges
// and both buttons — so slides render as images only. Anything overlaid in
// HTML would duplicate what is painted into the file.
export const HERO_SLIDES = [
  { id: "banner", image: banner, alt: "Crafted by tradition, personalized for you", href: "#" },
  { id: "banner1", image: banner1, alt: "Customized Panchaloga rings", href: "#" },
  { id: "banner3", image: banner3, alt: "Handcrafted by skilled smiths", href: "#" },
  { id: "banner4", image: banner4, alt: "Laser engraved Panchaloga jewellery", href: "#" },
  { id: "banner5", image: banner5, alt: "Authentic Panchaloga craftsmanship", href: "#" },
];

// Newly-launched collection tiles.
// The captions ("Stunning every Ear", "Initials", "Art Jewellery") are painted
// into the artwork itself, so nothing is overlaid in HTML — that would print
// each caption twice. `ratio` mirrors each file's native aspect so the tile
// never crops the baked-in text off an edge.
export const COLLECTIONS = [
  {
    id: "earrings",
    image: earringWidget,
    alt: "Stunning every ear — gold earrings collection",
    ratio: "813/945",
    href: "#",
  },
  {
    id: "initials",
    image: ringWidget,
    alt: "Initials — personalised signet rings",
    ratio: "1666/944",
    href: "#",
  },
  {
    id: "art-jewellery",
    image: chainWidget,
    alt: "Art Jewellery — handcrafted gold chains",
    ratio: "801/457",
    href: "#",
  },
];

// Unboxing videos. Static for now — this array is the shape a future API should
// return, and <CustomerUnboxing videos={...} /> accepts it as a prop, so going
// dynamic needs no component change.
// `youtubeId` null → the card opens a modal saying no video is linked yet.
export const UNBOXING_VIDEOS = [
  { id: "u1", youtubeId: null, title: "Our valuable customer feedback after delivery", channel: "Sabaa Jewel Arts", duration: "0:45", thumbnail: null },
  { id: "u2", youtubeId: null, title: "Customer Unboxing vedio after delivery", channel: "Sabaa Jewel Arts", duration: "0:52", thumbnail: null },
  { id: "u3", youtubeId: null, title: "Delivery unbox vedio sent by our customer", channel: "Sabaa Jewel Arts", duration: "0:58", thumbnail: null },
  { id: "u4", youtubeId: null, title: "Delivery unboxing by customer", channel: "Sabaa Jewel Arts", duration: "0:40", thumbnail: null },
  { id: "u5", youtubeId: null, title: "Happy customer receiving her Impon chain", channel: "Sabaa Jewel Arts", duration: "1:05", thumbnail: null },
  { id: "u6", youtubeId: null, title: "Symbol ring unboxing from Madurai", channel: "Sabaa Jewel Arts", duration: "0:37", thumbnail: null },
  { id: "u7", youtubeId: null, title: "Engraved ring reveal — anniversary gift", channel: "Sabaa Jewel Arts", duration: "0:49", thumbnail: null },
  { id: "u8", youtubeId: null, title: "Kids chain unboxing with family", channel: "Sabaa Jewel Arts", duration: "1:12", thumbnail: null },
];

// Voice notes. Same static-now/dynamic-later contract as UNBOXING_VIDEOS.
// `audio` null → the player renders but reports that no clip is attached.
// Set a URL (e.g. "/audio/meena.mp3" in public/) and it plays for real.
export const CUSTOMER_VOICES = [
  {
    id: "v1",
    name: "Meena",
    city: "Coimbatore",
    avatar: null,
    title: "Our happy Customer Feedback - 1",
    lines: [
      "Superb quality ring and beautiful engraving.",
      "Packaging was so good and delivery was on time.",
      "Very happy with my purchase!",
    ],
    audio: null,
    duration: "08:12",
    youtubeUrl: "#",
  },
  {
    id: "v2",
    name: "Karthik",
    city: "Madurai",
    avatar: null,
    title: "Our happy customer voice - 2",
    lines: [
      "The ring looks exactly like shown in the photos.",
      "I really loved the design and the finishing.",
      "Thank you Sabaa Jewel Arts!",
    ],
    audio: null,
    duration: "08:12",
    youtubeUrl: "#",
  },
  {
    id: "v3",
    name: "Subramani",
    city: "Tiruchirappalli",
    avatar: null,
    title: "Our customer voice 3",
    lines: [
      "Fast delivery and excellent customer service.",
      "The ring quality is top-notch.",
      "Highly recommended!",
    ],
    audio: null,
    duration: "08:12",
    youtubeUrl: "#",
  },
  {
    id: "v4",
    name: "Lakshmi",
    city: "Chennai",
    avatar: null,
    title: "Our customer feedback 4",
    lines: [
      "I gifted this ring to my husband and he loved it.",
      "The engraving came out perfect.",
      "Very much satisfied!",
    ],
    audio: null,
    duration: "08:12",
    youtubeUrl: "#",
  },
  {
    id: "v5",
    name: "Anitha",
    city: "Salem",
    avatar: null,
    title: "Our customer voice 5",
    lines: [
      "Ordered an Impon chain for my mother.",
      "She was delighted with the finish.",
      "Will order again soon.",
    ],
    audio: null,
    duration: "06:40",
    youtubeUrl: "#",
  },
  {
    id: "v6",
    name: "Rajesh",
    city: "Erode",
    avatar: null,
    title: "Our customer voice 6",
    lines: [
      "The symbol ring is exactly what I wanted.",
      "Craftsmanship is genuinely excellent.",
      "Worth every rupee.",
    ],
    audio: null,
    duration: "05:18",
    youtubeUrl: "#",
  },
  {
    id: "v7",
    name: "Divya",
    city: "Tirunelveli",
    avatar: null,
    title: "Our customer voice 7",
    lines: [
      "Beautiful photo ring, the image is so clear.",
      "Delivery was quicker than expected.",
      "Thank you so much!",
    ],
    audio: null,
    duration: "07:02",
    youtubeUrl: "#",
  },
  {
    id: "v8",
    name: "Muthu",
    city: "Thanjavur",
    avatar: null,
    title: "Our customer voice 8",
    lines: [
      "Bought kids chains for both my children.",
      "Light weight and very well made.",
      "Highly satisfied with the service.",
    ],
    audio: null,
    duration: "04:55",
    youtubeUrl: "#",
  },
];

// Full-width promo strip. Headline, badges and both buttons are painted into
// the artwork, so it renders as an image only — nothing overlaid in HTML.
export const PROMO_BANNER = {
  image: heroBanner,
  alt: "Crafted by tradition, personalized for you — customized Panchaloga rings",
  ratio: "1774/511",
  href: "#",
};

// 3D coverflow slides. Portrait/reel format. `image` null → gradient
// placeholder at the same size, so dropping real artwork in is a swap:
//   { id: "s1", image: myReel, alt: "..." }
export const STYLE_SLIDES = [
  { id: "s1", image: null, alt: "Styling look 1", tone: "from-[#1B3A6B] via-[#12294D] to-[#0B1A33]" },
  { id: "s2", image: null, alt: "Styling look 2", tone: "from-[#1F6F6B] via-[#155450] to-[#0C3835]" },
  { id: "s3", image: null, alt: "Styling look 3", tone: "from-[#6B4A2A] via-[#4E351E] to-[#2E1F12]" },
  { id: "s4", image: null, alt: "Styling look 4", tone: "from-[#1A2360] via-[#131A45] to-[#0A0E28]" },
  { id: "s5", image: null, alt: "Styling look 5", tone: "from-[#2E5B6B] via-[#20404C] to-[#132830]" },
  { id: "s6", image: null, alt: "Styling look 6", tone: "from-[#5B2540] via-[#411A2E] to-[#26101B]" },
  { id: "s7", image: null, alt: "Styling look 7", tone: "from-[#3F5B25] via-[#2D411A] to-[#1A2610]" },
];

export const TRUST_ITEMS = [
  { id: "trusted", icon: "shield", lines: ["Trusted by 5000+", "Happy Customers"] },
  { id: "quality", icon: "ring", lines: ["Premium Quality", "Rings"] },
  { id: "delivery", icon: "truck", lines: ["Fast & Secure", "Delivery"] },
  { id: "satisfaction", icon: "heart", lines: ["Customer Satisfaction", "is Our Priority"] },
];

// New-arrival tiles. The caption and its diamond rule are painted into each
// file, so nothing is overlaid in HTML — that would print every label twice.
// `ratio` mirrors the file's native aspect so the baked-in caption is never
// cropped off the bottom-left corner.
export const NEW_ARRIVALS = [
  { id: "panchaloga-rings", alt: "Panchaloga Rings", image: panchalogaRings, ratio: "1416/595", href: "#" },
  { id: "divine-rings", alt: "Divine Rings Collection", image: divineRings, ratio: "1415/592", href: "#" },
  { id: "god-engraved", alt: "God Engraved Rings", image: godEngravedRings, ratio: "1411/595", href: "#" },
  { id: "temple-pendants", alt: "Divine Temple Pendants", image: templePendants, ratio: "1407/597", href: "#" },
];

export const ASSURANCE_ITEMS = [
  { id: "craftsmanship", icon: "tools", lines: ["Quality", "Craftsmanship"] },
  { id: "ethical", icon: "heart", lines: ["Ethically", "Sourced"] },
  { id: "transparency", icon: "gem", lines: ["100%", "Transparency"] },
];

// Photo-ring showcase. Each file is the complete card — icon, title, ornament
// rule, ring and its rounded cream backdrop are all painted in. So the card
// renders the image alone; anything added in HTML would duplicate it.
// `ratio` is the file's native aspect so nothing is cropped.
export const PHOTO_RING_CARDS = [
  { id: "moment", alt: "Your Moment, Forever", image: murugaRing, ratio: "587/621" },
  { id: "tradition", alt: "Crafted With Tradition", image: craftedRing, ratio: "589/622" },
  { id: "gift", alt: "A Gift That Speaks Hearts", image: vijayRing, ratio: "586/623" },
];

export const PHOTO_RING_FEATURES = [
  { id: "pure", icon: "shieldCheck", title: "Pure Panchalogam", lines: ["Durable &", "Skin-Friendly"] },
  { id: "love", icon: "handHeart", title: "Made With Love", lines: ["Crafted with", "Care"] },
  { id: "trusted", icon: "medal", title: "Trusted By Generations", lines: ["Quality You", "Can Trust"] },
  { id: "delivery", icon: "truck", title: "Safe & Secure Delivery", lines: ["Delivered to Your", "Doorstep"] },
];

export const TESTIMONIALS = [
  {
    id: "priya",
    quote: "Super beautiful ring! Loved the design and quality.",
    rating: 5,
    name: "Priya S.",
    city: "Coimbatore",
    image: null,
  },
  {
    id: "karthik",
    quote: "Excellent finish and perfect fit. Truly satisfied!",
    rating: 5,
    name: "Karthik R.",
    city: "Madurai",
    image: null,
  },
  {
    id: "manikandan",
    quote: "Fast delivery and amazing product. Highly recommended!",
    rating: 5,
    name: "Manikandan",
    city: "Madurai",
    image: null,
  },
  {
    id: "aravind",
    quote: "Loved it! Thank you so much. Will shop again.",
    rating: 5,
    name: "Aravind",
    city: "Chennai",
    image: null,
  },
];
