// Static imports let Next optimise the assets and gives each one intrinsic
// dimensions, so no width/height guessing is needed at the call site.
import engrave from "@/assets/jewels/engrave.webp";
import faceAndPhotoRing from "@/assets/jewels/faceAndPhotoRing.webp";
import symbolsRing from "@/assets/jewels/symbolsRing.webp";
import mensChain from "@/assets/jewels/mensChain.webp";
import womensChain from "@/assets/jewels/womensChain.webp";
import kids from "@/assets/jewels/Kids.webp";
import earings from "@/assets/jewels/earings.webp";

import earringWidget from "@/assets/widget/Earing.jpg.webp";
import ringWidget from "@/assets/widget/Ring.jpg.webp";
import chainWidget from "@/assets/widget/Chain.jpg.webp";

import panchalogaRings from "@/assets/jewels/image.webp";
import divineRings from "@/assets/jewels/sabaa New arrival ring (1).webp";
import godEngravedRings from "@/assets/jewels/sabaa god ring (1).webp";
import templePendants from "@/assets/jewels/sabaa new divine temple  (1).webp";

// Feature panels for the nav mega-menus. All four are portrait, so they sit in
// the panel's 3/4 box with only light top/bottom cropping.
import ringsMenuImage from "@/assets/jewels/ring.jpg";
import imponMenuImage from "@/assets/jewels/Ipoon_Chain.jpg";
import pendantMenuImage from "@/assets/jewels/pendent.jpg";
import earringsMenuImage from "@/assets/jewels/earings.jpg";
// No lifestyle shot for bracelets yet, so the panel uses the product
// photography. Swap this import when a model image arrives.
import braceletMenuImage from "@/assets/products/kaapu/panchaloga-kaapu-kada-silver-impon-sabaa-jewel.webp";
import moreMenuImage from "@/assets/jewels/wedding-rings-engagement-rings-wedding-rings.jpg";

// 3D slider slides. Prefixed `style*` because widget/earings.webp collides by
// name with jewels/earings.webp, which is a different file.
import styleChain from "@/assets/widget/chain.webp";
import styleChain2 from "@/assets/widget/chain2.webp";
import styleEarings from "@/assets/widget/earings.webp";
import styleEarings2 from "@/assets/widget/earings2.webp";
import styleNeckless from "@/assets/widget/neckless.webp";
import stylePendent from "@/assets/widget/pendent.webp";
import stylePendent2 from "@/assets/widget/pendent2.webp";

// Customer feedback photos, one per testimonial card.
import testimonialPriya from "@/assets/testimonial_image/image.png";
import testimonialKarthik from "@/assets/testimonial_image/image1.png";
import testimonialManikandan from "@/assets/testimonial_image/image2.png";
import testimonialAravind from "@/assets/testimonial_image/image3.png";

import murugaRing from "@/assets/CustomizeRing/muruga ring (1).webp";
import craftedRing from "@/assets/CustomizeRing/crafted with tradition ring (1).webp";
import vijayRing from "@/assets/CustomizeRing/vijay ring (1).webp";

import newArrivalsBg from "@/assets/banner/Bg card image (1).webp";
import heroBanner from "@/assets/banner/heroBanner.jpg.webp";
// Square (1024x1024) phone cut of the same promo artwork.
import heroBannerMobile from "@/assets/banner/mobile-hero banner.webp";

import banner from "@/assets/banner/banner.webp";
import banner1 from "@/assets/banner/banner1.jpg.webp";
import banner3 from "@/assets/banner/banner3.jpg.webp";
import banner4 from "@/assets/banner/banner4.jpg.webp";
import banner5 from "@/assets/banner/banner5.jpg.webp";

// Square (1:1) re-cuts of the same artwork for phones. The desktop files are
// 2.67 wide, so their baked-in copy becomes unreadable at phone widths.
import bannerMobile from "@/assets/banner/banner_Mobile.webp";
import bannerMobile1 from "@/assets/banner/banner_Mobile_1.webp";
import bannerMobile3 from "@/assets/banner/banner_Mobile_3.webp";
import bannerMobile4 from "@/assets/banner/banner_Mobile_4.webp";
import bannerMobile5 from "@/assets/banner/banner_Mobile_5.webp";

// Nav bar icons — SVG, 560x560 viewBox. Vectors stay crisp at any size, and
// NavIcon serves them unoptimised since Next refuses SVG through the image
// optimiser by default. No Bracelet icon yet, so that one keeps its glyph.
import navAllJewellery from "@/assets/svg_nav_icon/All Jewellery.svg";
import navRings from "@/assets/svg_nav_icon/Rings.svg";
import navImpon from "@/assets/svg_nav_icon/Impon Chains.svg";
import navPendant from "@/assets/svg_nav_icon/pandant.svg";
import navEarrings from "@/assets/svg_nav_icon/Ear Ring.svg";
import navAnklet from "@/assets/svg_nav_icon/anklet_Icon.svg";
import navMore from "@/assets/svg_nav_icon/More.svg";

// Nav items. An item with a `menu` opens a mega panel; without one it is a
// plain link. Each menu has up to three link columns, an optional promo strip
// under them and an optional feature panel on the right.
//   columns: [{ heading?, items: [{ label, href }] }]
const PROMO = {
  title: "From Classic to Contemporary.",
  subtitle: "Explore 6000+ Stunning Designs.",
  cta: "View All",
  href: "#",
};

export const NAV_ITEMS = [
  {
    id: "all",
    label: "All Jewellery",
    href: "/category/all-jewellery",
    icon: navAllJewellery,
  },
  {
    id: "rings",
    label: "Rings",
    href: "#",
    icon: navRings,
    menu: {
      columns: [
        {
          items: [
            {
              label: "Name Engrave ring",
              href: "/category/name-engrave-rings",
            },
            { label: "Astrology Raasi Rings", href: "/category/raasi-rings" },
            { label: "Face & Photo Ring", href: "/category/photo-rings" },
          ],
        },
        {
          heading: "God Symbol Rings",
          items: [
            { label: "Hindu Rings", href: "/category/hindu-rings" },
            { label: "Christian Rings", href: "/category/christian-rings" },
            { label: "Muslim Rings", href: "/category/muslim-rings" },
          ],
        },
      ],
      promo: PROMO,
      feature: {
        caption: "Handcrafted Panchaloga rings, personalized for you",
        cta: "Explore Now",
        href: "#",
        image: ringsMenuImage,
      },
    },
  },
  {
    id: "impon",
    label: "Impon Chain",
    href: "#",
    icon: navImpon,
    menu: {
      columns: [
        {
          items: [
            { label: "MensChain", href: "/category/menz-chain" },
            { label: "FemaleChain", href: "/category/female-chains" },
            { label: "Kidz Chain", href: "/category/kids-chains" },
          ],
        },
      ],
      promo: PROMO,
      feature: {
        caption: "Impon chains crafted in the five sacred metals",
        cta: "Explore Now",
        href: "#",
        image: imponMenuImage,
      },
    },
  },
  {
    id: "pendant",
    label: "Pendant",
    href: "#",
    icon: navPendant,
    menu: {
      columns: [
        {
          items: [
            // Slugs follow the admin spellings ("Hindu Pendent", "Cristian Pendent").
            { label: "Hindu Pendants", href: "/category/hindu-pendent" },
            { label: "Christian Pendants", href: "/category/cristian-pendent" },
          ],
        },
      ],
      promo: PROMO,
      feature: {
        caption: "Divine temple pendants for every occasion",
        cta: "Explore Now",
        href: "#",
        image: pendantMenuImage,
      },
    },
  },
  {
    id: "bracelet",
    label: "Bracelet",
    // "#" like its neighbours — the dropdown does the navigating, and the
    // "View All" button covers the whole category.
    href: "#",
    menu: {
      columns: [
        {
          items: [
            { label: "Mens Bracelet", href: "/category/mens-bracelet" },
            { label: "Womens Bracelet", href: "/category/female-bracelet" },
          ],
        },
      ],
      promo: PROMO,
      feature: {
        caption: "Panchaloga kaapu and kada, handcrafted for every wrist",
        cta: "Explore Now",
        href: "#",
        image: braceletMenuImage,
      },
    },
  },
  {
    id: "earrings",
    label: "Earrings",
    href: "#",
    icon: navEarrings,
    menu: {
      columns: [
        {
          items: [
            { label: "Stud", href: "/category/stud" },
            { label: "Jimikki", href: "/category/jimikki" },
          ],
        },
      ],
      promo: PROMO,
      feature: {
        caption: "Traditional studs and jimikki in Panchaloga",
        cta: "Explore Now",
        href: "#",
        image: earringsMenuImage,
      },
    },
  },
  {
    id: "anklet",
    label: "Anklet",
    href: "/category/all-anklet",
    icon: navAnklet,
  },
  {
    id: "more",
    label: "More",
    href: "#",
    menu: {
      columns: [
        {
          items: [
            { label: "About Us", href: "/about" },
            { label: "Blogs", href: "/blogs" },
            { label: "Jewel Polish & Care", href: "#" },
          ],
        },
      ],
      feature: {
        caption: "Explore more about our craftsmanship and jewel care",
        image: moreMenuImage,
      },
    },
  },
];

// Each tile opens its own listing page. The slug is the id, and the matching
// label lives in CATEGORY_LABELS in productData.js — add one there whenever a
// tile is added here, or the page falls back to the heading "Products".
export const CATEGORIES = [
  // hrefs must match the slugs the category page derives from the API's own
  // subcategory names (name lowercased, spaces collapsed to hyphens) — the same
  // slugs the nav dropdown already uses. The tiles carried hand-written names
  // instead, so they opened a page with no cards on it.
  //
  // These follow the sub-main names as the admin panel has them today ("Name
  // Engrave Rings", "Photo Rings", "God Rings", "Menz Chain", "Female Chains",
  // "Kids Chains"). Renaming one there changes its slug, so update it here too.
  {
    id: "engraving-rings",
    label: "Engraving Rings",
    image: engrave,
    href: "/category/name-engrave-ring",
  },
  // "Face &" dropped — the tile now reads simply "Photo Rings".
  {
    id: "face-photo-rings",
    label: "Photo Rings",
    image: faceAndPhotoRing,
    href: "/category/photo-ring",
  },
  // Opens the Raasi rings sub-main, not the God rings it pointed at before.
  {
    id: "symbol-rings",
    label: "Symbol Rings",
    image: symbolsRing,
    href: "/category/raasi-rings",
  },
  {
    id: "mens-chain",
    label: "Mens Chain",
    image: mensChain,
    href: "/category/menschain",
  },
  {
    id: "womens-chain",
    label: "Womens Chain",
    image: womensChain,
    href: "/category/femalechain",
  },
  {
    id: "kids-chain",
    label: "Kids Chain",
    image: kids,
    href: "/category/kidzchain",
  },
  // The whole Earrings category — Stud and Jimikki both — rather than one of them.
  {
    id: "earrings",
    label: "Earrings",
    image: earings,
    href: "/category/all-earrings",
  },
];

// The banner artwork already contains the wordmark, headline, feature badges
// and both buttons — so slides render as images only. Anything overlaid in
// HTML would duplicate what is painted into the file.
// `image` is the wide desktop cut, `mobileImage` the square phone cut. The
// carousel swaps between them at the sm breakpoint.
export const HERO_SLIDES = [
  {
    id: "banner",
    image: banner,
    mobileImage: bannerMobile,
    alt: "Crafted by tradition, personalized for you",
    href: "#",
  },
  {
    id: "banner1",
    image: banner1,
    mobileImage: bannerMobile1,
    alt: "Customized Panchaloga rings",
    href: "#",
  },
  {
    id: "banner3",
    image: banner3,
    mobileImage: bannerMobile3,
    alt: "Handcrafted by skilled smiths",
    href: "#",
  },
  {
    id: "banner4",
    image: banner4,
    mobileImage: bannerMobile4,
    alt: "Laser engraved Panchaloga jewellery",
    href: "#",
  },
  {
    id: "banner5",
    image: banner5,
    mobileImage: bannerMobile5,
    alt: "Authentic Panchaloga craftsmanship",
    href: "#",
  },
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
    href: "/category/all-earrings",
  },
  {
    id: "initials",
    image: ringWidget,
    alt: "Initials — personalised signet rings",
    ratio: "1666/944",
    href: "/category/initial-rings",
  },
  {
    id: "art-jewellery",
    image: chainWidget,
    alt: "Art Jewellery — handcrafted gold chains",
    ratio: "801/457",
    href: "/category/all-impon-chain",
  },
];

// Unboxing videos. Static for now — this array is the shape a future API should
// return, and <CustomerUnboxing videos={...} /> accepts it as a prop, so going
// dynamic needs no component change.
// `youtubeId` null → the card opens a modal saying no video is linked yet.
export const UNBOXING_VIDEOS = [
  {
    id: "u1",
    youtubeId: null,
    title: "Our valuable customer feedback after delivery",
    channel: "Sabaa Jewel Arts",
    duration: "0:45",
    thumbnail: null,
  },
  {
    id: "u2",
    youtubeId: null,
    title: "Customer Unboxing vedio after delivery",
    channel: "Sabaa Jewel Arts",
    duration: "0:52",
    thumbnail: null,
  },
  {
    id: "u3",
    youtubeId: null,
    title: "Delivery unbox vedio sent by our customer",
    channel: "Sabaa Jewel Arts",
    duration: "0:58",
    thumbnail: null,
  },
  {
    id: "u4",
    youtubeId: null,
    title: "Delivery unboxing by customer",
    channel: "Sabaa Jewel Arts",
    duration: "0:40",
    thumbnail: null,
  },
  {
    id: "u5",
    youtubeId: null,
    title: "Happy customer receiving her Impon chain",
    channel: "Sabaa Jewel Arts",
    duration: "1:05",
    thumbnail: null,
  },
  {
    id: "u6",
    youtubeId: null,
    title: "Symbol ring unboxing from Madurai",
    channel: "Sabaa Jewel Arts",
    duration: "0:37",
    thumbnail: null,
  },
  {
    id: "u7",
    youtubeId: null,
    title: "Engraved ring reveal — anniversary gift",
    channel: "Sabaa Jewel Arts",
    duration: "0:49",
    thumbnail: null,
  },
  {
    id: "u8",
    youtubeId: null,
    title: "Kids chain unboxing with family",
    channel: "Sabaa Jewel Arts",
    duration: "1:12",
    thumbnail: null,
  },
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
  // Used below 640px. The wide strip's painted-in headline and buttons are too
  // small to read on a phone, so phones get their own square cut.
  mobileImage: heroBannerMobile,
  alt: "Crafted by tradition, personalized for you — customized Panchaloga rings",
  ratio: "1774/511",
  href: "#",
};

// 3D coverflow slides. Portrait/reel format. `image` null → gradient
// placeholder at the same size, so dropping real artwork in is a swap:
//   { id: "s1", image: myReel, alt: "..." }
export const STYLE_SLIDES = [
  {
    id: "s1",
    image: styleChain,
    alt: "Impon chain styling look",
    tone: "from-[#1B3A6B] via-[#12294D] to-[#0B1A33]",
  },
  {
    id: "s2",
    image: styleEarings,
    alt: "Earrings styling look",
    tone: "from-[#1F6F6B] via-[#155450] to-[#0C3835]",
  },
  {
    id: "s3",
    image: styleNeckless,
    alt: "Necklace styling look",
    tone: "from-[#6B4A2A] via-[#4E351E] to-[#2E1F12]",
  },
  {
    id: "s4",
    image: stylePendent,
    alt: "Pendant styling look",
    tone: "from-[#1A2360] via-[#131A45] to-[#0A0E28]",
  },
  {
    id: "s5",
    image: styleChain2,
    alt: "Gold chain styling look",
    tone: "from-[#2E5B6B] via-[#20404C] to-[#132830]",
  },
  {
    id: "s6",
    image: styleEarings2,
    alt: "Jimikki earrings styling look",
    tone: "from-[#5B2540] via-[#411A2E] to-[#26101B]",
  },
  {
    id: "s7",
    image: stylePendent2,
    alt: "Temple pendant styling look",
    tone: "from-[#3F5B25] via-[#2D411A] to-[#1A2610]",
  },
];

export const TRUST_ITEMS = [
  {
    id: "trusted",
    icon: "people",
    lines: ["Trusted by 5000+", "Happy Customers"],
  },
  { id: "quality", icon: "ring", lines: ["Premium Quality", "Rings"] },
  { id: "delivery", icon: "truck", lines: ["Fast & Secure", "Delivery"] },
  {
    id: "satisfaction",
    icon: "smile",
    lines: ["Customer Satisfaction", "is Our Priority"],
  },
];

// Backdrop for the New Arrivals block. The "New Arrivals" heading, the
// "500+ New Items" badge and both copy lines are painted into this file, so
// nothing is overlaid in HTML — that would print the whole block twice.
export const NEW_ARRIVALS_BANNER = {
  image: newArrivalsBg,
  alt: "New Arrivals — dropping daily, Monday through Friday",
  ratio: "1717/916",
};

// New-arrival tiles. The caption and its diamond rule are painted into each
// file, so nothing is overlaid in HTML — that would print every label twice.
// `ratio` mirrors the file's native aspect so the baked-in caption is never
// cropped off the bottom-left corner.
export const NEW_ARRIVALS = [
  {
    id: "panchaloga-rings",
    alt: "Panchaloga Rings",
    image: panchalogaRings,
    ratio: "1416/595",
    href: "/category/all-rings",
  },
  // "symbol-rings" matched nothing — the API has no grouping for god rings,
  // only Hindu, Christian and Muslim separately, and Hindu is the only one
  // carrying stock.
  {
    id: "divine-rings",
    alt: "Divine Rings Collection",
    image: divineRings,
    ratio: "1415/592",
    href: "/category/hindu-rings",
  },
  {
    id: "god-engraved",
    alt: "God Engraved Rings",
    image: godEngravedRings,
    ratio: "1411/595",
    href: "/category/hindu-rings",
  },
  // The API category is "Pendant", singular — "all-pendants" resolved to nothing.
  {
    id: "temple-pendants",
    alt: "Divine Temple Pendants",
    image: templePendants,
    ratio: "1407/597",
    href: "/category/all-pendant",
  },
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
  {
    id: "moment",
    alt: "Your Moment, Forever",
    image: murugaRing,
    ratio: "587/621",
  },
  {
    id: "tradition",
    alt: "Crafted With Tradition",
    image: craftedRing,
    ratio: "589/622",
  },
  {
    id: "gift",
    alt: "A Gift That Speaks Hearts",
    image: vijayRing,
    ratio: "586/623",
  },
];

export const PHOTO_RING_FEATURES = [
  {
    id: "pure",
    icon: "shieldCheck",
    title: "Pure Panchalogam",
    lines: ["Durable &", "Skin-Friendly"],
  },
  {
    id: "love",
    icon: "handHeart",
    title: "Made With Love",
    lines: ["Crafted with", "Care"],
  },
  {
    id: "trusted",
    icon: "medal",
    title: "Trusted By Generations",
    lines: ["Quality You", "Can Trust"],
  },
  {
    id: "delivery",
    icon: "truck",
    title: "Safe & Secure Delivery",
    lines: ["Delivered to Your", "Doorstep"],
  },
];

export const TESTIMONIALS = [
  {
    id: "priya",
    quote:
      "The ring looks even better in person. I really liked the simple design and the finishing is beautiful. Very happy with my purchase.",
    rating: 5,
    name: "Priya S.",
    city: "Coimbatore",
    image: testimonialPriya,
  },
  {
    id: "karthik",
    quote:
      "I ordered these rings and honestly loved how neat the finishing was. The fit was perfect and the rings looked really elegant when worn.",
    rating: 5,
    name: "Karthik R.",
    city: "Madurai",
    image: testimonialKarthik,
  },
  {
    id: "manikandan",
    quote:
      "The ring has a really nice finish and feels good to wear. It looked exactly like I expected, and the delivery was also smooth.",
    rating: 5,
    name: "Manikandan",
    city: "Madurai",
    image: testimonialManikandan,
  },
  {
    id: "aravind",
    quote:
      "The photo inside the ring came out really nice. It feels personal and special, and the quality was better than I expected.",
    rating: 5,
    name: "Aravind",
    city: "Chennai",
    image: testimonialAravind,
  },
];
