// All About-page copy lives here so the page itself stays layout-only and the
// text can be edited (or swapped for API data) without touching components.

import aboutImage from "@/assets/logo/aboutPageImage.webp";

export { aboutImage };

// The six sections, in order. `id` doubles as the anchor target for the chip
// nav at the top of the page.
export const ABOUT_SECTIONS = [
  { id: "about-sabaa", label: "About Sabaa" },
  { id: "our-story", label: "Our Story" },
  { id: "what-is-panchaloga", label: "What is Panchaloga?" },
  { id: "panchaloga-benefits", label: "Benefits of Panchaloga Jewellery" },
  { id: "panchaloga-composition", label: "Panchaloga Composition" },
  { id: "manufacturing", label: "Manufacturing Process" },
  { id: "faqs", label: "Help & FAQs" },
  { id: "cookies", label: "Cookie Policy" },
  { id: "contact", label: "Contact Us" },
];

// Paragraphs are arrays of segments so the emphasis from the reference survives.
// `strong` = bold, `accent` = the muted gold-brown highlight, plain string = body.
export const ABOUT_PARAGRAPHS = [
  [
    "The Journey of Sabaa started with the launch of Panchalogam rings engraved with customer names and symbols in ",
    { strong: "1980" },
    ". But, it soon grew into silver rings customized for customers. The term Sabaa was established by ",
    { strong: "Mr. Venkatesan" },
    ", son of ",
    { strong: "Mr. Rathina Sabapathy" },
    " — the brand name Sabaa follows the father of the proprietor. The initial workshop was set up in Cuddalore, Tamilnadu, registered as ",
    { accent: "Nakshath International" },
    " with GST 33BHPPV7845F1ZQ.",
  ],
  [
    "We help you choose different kinds of customized rings in panchalogam and silver jewellery, and you can engrave or carve or ",
    { strong: "sculpt your loved one's name or face on it" },
    " and it will last forever. We are also specialized in ",
    { strong: "custom engraved rings" },
    " and you can engrave name, fingerprint, barcode, ",
    { accent: "your voice wave form" },
    " or anything you want to ",
    { accent: "engrave on your gold ring" },
    ". It will be the best gift you can come up with, as it is personalized and speaks volumes about your loved one's personality. No matter what the occasion is and who the lucky person is, these ",
    { accent: "personalized gifts" },
    " will top the list of their favorites.",
  ],
];

export const FOUNDER_QUOTE = {
  name: "Venkatesan. R",
  role: "Founder, Sabaa",
};

// Milestones drawn from the founder's note above and the studio artwork.
export const STORY_MILESTONES = [
  {
    id: "1980",
    year: "1980",
    title: "The first engraved Panchalogam ring",
    body: "Sabaa began with Panchalogam rings engraved with customer names and symbols — one ring, one name, one story at a time.",
  },
  {
    id: "name",
    year: "The name",
    title: "Named for a father",
    body: "Mr. Venkatesan established the name Sabaa after his father, Mr. Rathina Sabapathy. The brand carries his name forward.",
  },
  {
    id: "silver",
    year: "Growing",
    title: "From Panchalogam into silver",
    body: "What started as engraved Panchalogam rings soon grew into silver jewellery, customized to what each customer asked for.",
  },
  {
    id: "workshop",
    year: "The workshop",
    title: "Set up in Cuddalore",
    body: "The first workshop was set up in Cuddalore, Tamilnadu — still the head office, now with a branch in Palakkad, Kerala.",
  },
  {
    id: "registered",
    year: "Registered",
    title: "Nakshath International",
    body: "The business is registered as Nakshath International under GST 33BHPPV7845F1ZQ.",
  },
];

/* ------------------------------------------------------------------ */
/*  Panchaloga — what it is, what it gives you, what is in it          */
/* ------------------------------------------------------------------ */

export const PANCHALOGA_INTRO = {
  lead:
    "Panchaloga — from pancha, five, and loha, metal — is the traditional South Indian alloy of five metals used for temple icons and ceremonial jewellery for centuries. It is the metal Sabaa started in, and it is still what we do best.",
  paragraphs: [
    "The word describes a practice rather than one fixed recipe. Temple bronzes have been cast in five-metal alloys since at least the Chola period, and every workshop has carried its own composition forward, generally passed down rather than published.",
    "What makes it right for engraved jewellery is a practical matter. The alloy is hard enough to hold a cut edge cleanly and soft enough to be worked by hand at the bench. That combination is why an engraved Panchaloga ring keeps its detail for decades, and it is why we began in this metal in 1980 rather than any other.",
  ],
  // Small factual callouts beside the text.
  facts: [
    { id: "meaning", label: "Meaning", value: "Pancha = five, Loha = metal" },
    { id: "origin", label: "Tradition", value: "South Indian temple metalwork" },
    { id: "use", label: "Used for", value: "Icons, ceremonial & daily jewellery" },
    { id: "sabaa", label: "At Sabaa since", value: "1980" },
  ],
};

// Split deliberately: what the metal actually does for you, kept separate from
// what tradition holds about it. We do not present belief as fact.
export const PANCHALOGA_BENEFITS = {
  practical: [
    {
      id: "engraving",
      title: "Holds an engraving",
      body: "Hard enough to keep a crisp cut edge, soft enough to carve by hand. A name, face or fingerprint stays legible for decades rather than wearing smooth.",
      icon: "engrave",
    },
    {
      id: "durable",
      title: "Built for daily wear",
      body: "Panchaloga is a working metal, not a display metal. It takes knocks, water and everyday handling far better than soft high-carat gold.",
      icon: "shield",
    },
    {
      id: "ages",
      title: "Ages into character",
      body: "The copper content deepens the tone over months, darkening in the recesses of an engraving and staying bright on the raised surfaces. Most people prefer it after a year.",
      icon: "clock",
    },
    {
      id: "value",
      title: "Within reach",
      body: "A five-metal piece costs a fraction of the same design in gold, which is why a whole family can be given matching pieces for a wedding or a festival.",
      icon: "coin",
    },
    {
      id: "repair",
      title: "Repairable and re-polishable",
      body: "It can be cleaned, polished and reset at the bench. Bring a piece back to us any time and we will restore it — we do not charge for a polish.",
      icon: "sparkle",
    },
    {
      id: "gift",
      title: "Made for one person",
      body: "Because each piece is engraved to order, it cannot be bought twice or resold. That is exactly what makes it worth giving.",
      icon: "gift",
    },
  ],
  // Clearly framed as tradition, not as claims we are making.
  traditionalTitle: "What tradition holds",
  traditional:
    "Families have long associated the five metals with the five elements and with planetary influences, so that a piece containing all five is understood as complete in a way a single-metal piece is not. Many households also keep ayurvedic associations around wearing the alloy. We share these beliefs as the living tradition they are — we make the metal, and we make no medical or astrological claims about it.",
};

export const PANCHALOGA_COMPOSITION = {
  intro:
    "Five metals go into the crucible. Gold and silver are present in small, precious quantities; copper usually forms the bulk of the mix and gives the alloy its warmth.",
  metals: [
    {
      id: "gold",
      symbol: "Au",
      name: "Gold",
      role: "The precious core of the mix, present in a small proportion. Traditionally regarded as the most auspicious of the five.",
      tone: "#C9A227",
    },
    {
      id: "silver",
      symbol: "Ag",
      name: "Silver",
      role: "Brightens the alloy and softens its working temperature, which helps the metal take fine detail at the bench.",
      tone: "#9AA0A6",
    },
    {
      id: "copper",
      symbol: "Cu",
      name: "Copper",
      role: "Usually the largest share. It gives Panchaloga its warm colour and is the reason the surface deepens in tone with wear.",
      tone: "#B87333",
    },
    {
      id: "zinc",
      symbol: "Zn",
      name: "Zinc",
      role: "Improves how cleanly the alloy casts and adds hardness, so an engraved edge holds its shape instead of rounding off.",
      tone: "#7E8B99",
    },
    {
      id: "iron",
      symbol: "Fe",
      name: "Iron",
      role: "The fifth metal, added in trace quantity. Its presence is what completes the five and makes the alloy Panchaloga rather than an ordinary bronze.",
      tone: "#5C6169",
    },
  ],
  note:
    "Exact proportions vary between workshops and regions, and some traditions substitute lead or tin for one of the five. Our own composition is prepared in-house and kept consistent from piece to piece, so two rings ordered together will match.",
};

// Editable copy — adjust any step to match how your workshop actually runs.
export const PROCESS_STEPS = [
  {
    id: "idea",
    title: "Your idea, captured",
    body: "Share the name, face, fingerprint, barcode or voice waveform you want on the piece. We confirm the layout with you before any metal is touched.",
    icon: "pencil",
  },
  {
    id: "alloy",
    title: "The Panchaloga alloy",
    body: "Panchaloga is the traditional blend of five metals. It is prepared in-house so the composition of every piece stays consistent.",
    icon: "flame",
  },
  {
    id: "form",
    title: "Casting & shaping",
    body: "The ring is cast and then filed, shaped and sized by hand at the bench — the stage where the piece first takes its form.",
    icon: "hammer",
  },
  {
    id: "engrave",
    title: "Hand engraving & carving",
    body: "Your name, face or waveform is engraved and carved by our artisans. This is the slowest step, and deliberately so.",
    icon: "engrave",
  },
  {
    id: "finish",
    title: "Setting, polish & final check",
    body: "Stones are set, the piece is polished, then checked against your original request before it is gift-packed and dispatched.",
    icon: "sparkle",
  },
];

export const FAQS = [
  {
    id: "panchaloga",
    q: "What is Panchaloga?",
    a: "Panchaloga is a traditional South Indian alloy of five metals, used in temple and ceremonial jewellery for centuries. Sabaa has been working in Panchalogam since 1980.",
  },
  {
    id: "engrave",
    q: "What can I engrave on my ring?",
    a: "A name, a face, a fingerprint, a barcode, a voice waveform — or anything else you send us. If you are unsure whether your idea will work at ring scale, message us on WhatsApp and we will tell you honestly before you order.",
  },
  {
    id: "metals",
    q: "Which metals do you work in?",
    a: "Panchalogam and silver are our core, and we also take on custom engraved gold rings.",
  },
  {
    id: "delivery",
    q: "How long does a customized order take?",
    a: "Customized pieces are typically ready within 10 days. Because every piece is made to your request, the exact timeline is confirmed with you when the design is approved.",
  },
  {
    id: "size",
    q: "How do I find my ring size?",
    a: "Every product page has a size selector with a size chart beside it. If you are still unsure, send us a message before ordering — resizing an engraved ring is not always possible.",
  },
  {
    id: "gifting",
    q: "Do you offer gift packaging and international shipping?",
    a: "Gift packaging is free and can be selected on the product page. International shipment is available — tick the option at checkout and we will confirm the details with you.",
  },
  {
    id: "care",
    q: "How do I care for an engraved piece?",
    a: "Keep it away from perfumes, chlorine and household cleaners, wipe it with a soft dry cloth after wearing, and store it separately so the engraving is not scratched by other jewellery.",
  },
];

export const COOKIE_POLICY = {
  intro:
    "This policy explains how sabaajewelarts.com uses cookies and similar technologies when you browse the site. By continuing to use the site you agree to the cookies described below.",
  blocks: [
    {
      id: "what",
      title: "What cookies are",
      body: "Cookies are small text files a website stores in your browser. They let the site remember things between page loads — what is in your cart, whether you are signed in, and which preferences you have set.",
    },
    {
      id: "essential",
      title: "Essential cookies",
      body: "These keep the site working: your cart and wishlist contents, your session while you are signed in, and basic security. The site cannot function correctly without them, so they cannot be switched off.",
    },
    {
      id: "preference",
      title: "Preference cookies",
      body: "These remember choices you have made — such as your ring size selections or dismissed prompts — so you are not asked for the same thing on every visit.",
    },
    {
      id: "analytics",
      title: "Analytics cookies",
      body: "These help us understand which pages and products people actually use, in aggregate, so we can improve the site. They do not identify you personally.",
    },
    {
      id: "control",
      title: "Controlling cookies",
      body: "Every browser lets you view, block or delete cookies in its settings. Blocking essential cookies will stop the cart and account areas from working. If you have a question about this policy, write to us at sabaajewelarts@gmail.com.",
    },
  ],
};

// Digits only, country code included — wa.me rejects spaces and the leading +.
export const CONTACT = {
  whatsapp: "917871900140",
  phoneDisplay: "+91 78719 00140",
  email: "sabaajewelarts@gmail.com",
  offices: [
    {
      id: "head",
      label: "Head Office",
      lines: [
        "Sabaa Jewel Arts",
        "54, Gandhinagar, Vilvanagar,",
        "Semmandalam, Cuddalore,",
        "Tamilnadu - 607002",
      ],
    },
    {
      id: "branch",
      label: "Branch Office",
      lines: ["Velan Street, Sultanpet,", "Palakkad - 678001,", "Kerala"],
    },
  ],
};
