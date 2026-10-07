// All About-page copy lives here so the page itself stays layout-only and the
// text can be edited (or swapped for API data) without touching components.

import aboutImage from "@/assets/batch/image.png";
// The goldsmith at the bench, shown beside the story of the name.
import craftsmanImage from "@/assets/about_image/image1.png";
// The founder's portrait, shown in "Founder with a vision".
import founderImage from "@/assets/about_image/image2.png";
// The workshop team, shown in "Inhouse design and manufacturing".
import teamImage from "@/assets/about_image/image.png";

export { aboutImage, craftsmanImage, founderImage, teamImage };

// The six sections, in order. `id` doubles as the anchor target for the chip
// nav at the top of the page.
export const ABOUT_SECTIONS = [
  { id: "about-sabaa", label: "About Sabaa" },
  { id: "your-story", label: "Jewellery That Tells Your Story" },
  { id: "name-meaning", label: "What does the name Sabaa mean?" },
  { id: "our-legacy", label: "Our Legacy. Your Story." },
  { id: "founder", label: "Founder with a vision" },
  { id: "inhouse", label: "Inhouse design and manufacturing" },
  { id: "manufacturing", label: "Manufacturing Process" },
  { id: "faqs", label: "Help & FAQs" },
  { id: "contact", label: "Contact Us" },
];

// Paragraphs are arrays of segments so the emphasis from the reference survives.
// `strong` = bold, `accent` = the muted gold-brown highlight, plain string = body.
export const ABOUT_PARAGRAPHS = [
  [{ strong: "A Genuine Jewellery Brand from Tamil Nadu, Rooted in Tradition" }],
  [
    { strong: "SABAA" },
    " is a genuine jewellery brand specialising in ",
    { accent: "Panchaloga and Silver jewellery" },
    ", proudly based in Cuddalore, Tamil Nadu. Over the years, we have grown into one of India's leading customised ring jewellery brands, earning the trust of thousands of customers and becoming a preferred choice for meaningful gifting.",
  ],
  [
    "At SABAA, we believe jewellery is more than an accessory. It is a symbol of ",
    { strong: "faith, love, identity, tradition, and personal memories" },
    ".",
  ],
  [
    "Our journey continues to shine as we bring together the convenience of online shopping with the warmth and personal experience of an in-store jewellery experience through our growing ",
    { accent: "omnichannel approach" },
    ".",
  ],
  [
    "We specialise in ",
    { strong: "customised engraved rings" },
    ", combining advanced customisation techniques with the expertise of skilled artisans. Every design is created with precision and care, while preserving the traditional handmade touch and craftsmanship that makes Indian jewellery truly special.",
  ],
];

// Sits between "About Sabaa" and "Manufacturing Process".
export const STORY_PARAGRAPHS = [
  [
    "Every SABAA creation is thoughtfully designed for people who believe that jewellery should have a ",
    { strong: "deeper meaning" },
    ".",
  ],
  [
    "From sacred symbols and spiritual motifs to ",
    { accent: "personalised names, photographs, messages" },
    ", and unique designs, every piece is created to represent something special in your life.",
  ],
  [
    "Whether it celebrates ",
    { strong: "faith, love, family, memories, identity, or heritage" },
    ", we strive to create jewellery that becomes a meaningful part of your journey.",
  ],
  [
    "Because the most beautiful jewellery is the jewellery that ",
    { accent: "tells your story" },
    ".",
  ],
];

// Sits between "Jewellery That Tells Your Story" and "Manufacturing Process".
export const NAME_STORY_PARAGRAPHS = [
  [
    "The name ",
    { strong: "SABAA" },
    " is inspired by the name of ",
    { strong: "Late Mr. R. Rathina Sabapathy" },
    ", the father of our founder, ",
    { strong: "Mr. Venkatesan" },
    ".",
  ],
  [
    "Our story began in ",
    { strong: "1988" },
    ", when Mr. Rathina Sabapathy, an accomplished goldsmith, specialised in engraving ",
    { strong: "intricate, traditional, and highly detailed designs on gold rings" },
    ". His dedication to craftsmanship and his mastery of traditional engraving became the foundation of the family's jewellery journey.",
  ],
  [
    "Inspired by his father's knowledge and craftsmanship, ",
    { strong: "Mr. Venkatesan carried this legacy forward" },
    " and began developing similar intricate customisation techniques for ",
    { strong: "Panchaloga Impon metal rings" },
    ", bringing traditional craftsmanship into a more accessible and personalised form of jewellery.",
  ],
  [
    "After the passing of Mr. Rathina Sabapathy in ",
    { strong: "2019" },
    ", the brand ",
    { strong: "SABAA was born" },
    " as a tribute to his legacy.",
  ],
  [
    "Today, SABAA is more than just a name. ",
    { strong: "It represents a family legacy, craftsmanship, authenticity, and the timeless beauty of Indian tradition." },
  ],
  [
    "We continue to ",
    { accent: "honour the values passed down through generations" },
    " while embracing modern technology, innovative designs, and personalised jewellery experiences.",
  ],
];

// Sits below "What does the name Sabaa mean?".
export const LEGACY_INTRO = [
  "At SABAA, our vision is to preserve the beauty of traditional Indian craftsmanship while making ",
  { strong: "personalised jewellery accessible to everyone" },
  ".",
];

// Shown as four linked pillars, in the order of the original line:
// Traditional Craftsmanship + Modern Technology + Personalisation + Spirituality
export const LEGACY_PILLARS = [
  "Traditional Craftsmanship",
  "Modern Technology",
  "Personalisation",
  "Spirituality",
];

export const LEGACY_OUTRO = [
  "to create jewellery that is not only beautiful to wear, but also ",
  { strong: "meaningful to own" },
  ". Every SABAA piece carries a little bit of our heritage—and becomes a part of yours.",
];

export const LEGACY_TAGLINE = "SABAA – Wear Your Story. Celebrate Your Heritage.";

// Sits below "Our Legacy. Your Story.".
export const FOUNDER = {
  name: "Venkatesan Rathinasabapathy",
  role: "Founder, SABAA",
  credentials: [
    "B.E. – Electronics & Communication Engineering (ECE)",
    "10+ Years of Experience in Jewellery Manufacturing",
  ],
};

export const FOUNDER_PARAGRAPHS = [
  [
    "Venkatesan, Founder and CEO of SABAA, is a graduate of ",
    { accent: "Krishnasamy Engineering College, Cuddalore" },
    ", affiliated with Anna University.",
  ],
  [
    "Driven by a vision to make traditional jewellery more accessible and affordable amid the rising price of gold, he founded SABAA as a ",
    { strong: "clutter-breaking Panchaloga jewellery brand" },
    ". Under his leadership, SABAA has grown into a recognized name in the gold imitation jewellery industry, with a strong focus on design, quality, customer experience, and innovation.",
  ],
  [
    "With a customer-first approach and a commitment to building a seamless omnichannel presence, Venkatesan has played a pivotal role in shaping SABAA into a trusted and well-respected jewellery brand.",
  ],
  [
    "Looking ahead, SABAA is expanding its horizons beyond imitation jewellery, with plans to enter the ",
    { strong: "gold and lab-grown diamond segments" },
    ", further strengthening its vision of becoming a diverse and innovative jewellery brand.",
  ],
];

// Sits below "Founder with a vision".
export const INHOUSE_PARAGRAPHS = [
  [
    "We have a passionate and dedicated team working behind the scenes to build SABAA into a ",
    { strong: "global Panchaloga jewellery brand" },
    ". Our team brings together some of the finest craftsmen in the country, skilled in the age-old techniques of Indian jewellery making, along with a creative design team trained at some of the leading design institutes in India.",
  ],
  [
    "Together, their craftsmanship, creativity, and expertise enable us to create jewellery that blends ",
    { accent: "traditional artistry with contemporary design" },
    ".",
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

// Supplied by Sabaa. Contact details appear in several answers and are kept in
// SUPPORT_EMAIL / SUPPORT_WHATSAPP below so a change is made in one place.
export const SUPPORT_EMAIL = "admin@sabaa.in";
export const SUPPORT_WHATSAPP = "7871900355";

const contactLine = `For support ${SUPPORT_EMAIL}. WhatsApp: ${SUPPORT_WHATSAPP}`;

export const FAQS = [
  {
    id: "composition",
    q: "What is the metal composition of Panchalogam impon?",
    a: "Copper, Zinc, Tin, Silver and Brass.",
  },
  {
    id: "ring-tarnish",
    q: "Do this Panchaloga ring color fade or tarnish?",
    a: "It depends on your usage. All rings are delivered with a buffing mirror polish — raw metal without any coating. Once you start using it, the ring changes to an antique finish, and it remains an antique finish with daily usage. If rings are kept on a shelf without usage, the copper content starts to tarnish and fade. You can repolish it with vibhuti powder or Colgate powder to remove the tarnish and continue using it.",
  },
  {
    id: "chain-tarnish",
    q: "Do this Panchaloga ring color fade or tarnish?",
    a: "All Sabaa chains are provided with a 6 month warranty on colour. All chains are micro coated, unlike the rings, so they need to be removed while taking a bath. Please use them gently — rough use is not advisable if you want to increase the life of the chain colour.",
  },
  {
    id: "customise",
    q: "Can I customize a Panchaloga ring with my name or initials?",
    a: "Yes. Depending on the selected ring design, you can personalise your Panchaloga ring with a name, initials, date, short word, or other suitable engraving.",
  },
  {
    id: "engrave-what",
    q: "What can I engrave on a customized ring?",
    a: "You can typically engrave names, initials, special dates, meaningful words, or short messages. The available character limit may vary depending on the ring size and design.",
  },
  {
    id: "symbols",
    q: "Can I add a symbol or religious design to the ring?",
    a: "Yes, selected customized designs may allow symbols, initials, zodiac signs, religious symbols, or other motifs. Please check the customization options available for the particular product.",
  },
  {
    id: "fonts",
    q: "Can I choose the font for the engraving?",
    a: "Font options are given on the ordering page during the customization process. Sabaa will use an engraving style that provides good visibility and durability while complementing the ring design.",
  },
  {
    id: "provide-details",
    q: "How do I provide my customization details?",
    a: "After selecting the customized ring, enter your required engraving or personalization details in the designated customization field during the ordering process. Select size, font and enamel colour on the order page.",
  },
  {
    id: "ring-size",
    q: "How do I select the correct ring size?",
    a: "Please refer to Sabaa's ring size guide before placing your order. Since customized rings are made specifically according to the selected details and size, we recommend checking your ring size carefully before ordering.",
  },
  {
    id: "change-size",
    q: "Can I change the ring size after placing a customized order?",
    a: "Size changes may not be possible once customization or production has started.",
  },
  {
    id: "preview",
    q: "Can I see a preview of my customized ring before production?",
    a: "Preview availability depends on the product and customization option. If a preview is provided, production will proceed after the required confirmation.",
  },
  {
    id: "production-time",
    q: "How long does it take to make a customized Panchaloga ring?",
    a: "Customized rings may require 7-10 days, with additional processing time depending on the design.",
  },
  {
    id: "cancel",
    q: "Can I cancel a customized ring order?",
    a: "Yes, you can cancel the order. But the advance payment cannot be refunded.",
  },
  {
    id: "return",
    q: "Can I return or exchange a customized Panchaloga ring?",
    a: `There is no return or exchange accepted unless there is damage on the delivered product. ${contactLine}`,
  },
  {
    id: "unique",
    q: "Is every customized Panchaloga ring unique?",
    a: "Yes. Since the ring is personalized according to your selected details, each customized piece has its own individual character.",
  },
  {
    id: "not-gold",
    q: "Is Panchaloga the same as gold?",
    a: "No. There is no gold content in this ring. Panchaloga is a traditional metal alloy used in Indian jewellery and spiritual craftsmanship. A Panchaloga ring is different from solid gold jewellery and should not be represented as gold jewellery unless specifically stated.",
  },
  {
    id: "engraving-fade",
    q: "Will the engraving fade over time?",
    a: "No. We engrave to a depth that lasts lifelong, subject to usage, friction and care.",
  },
  {
    id: "care",
    q: "How should I care for my customized Panchaloga ring?",
    a: "Use it daily to avoid tarnish. Clean it with vibhuti or Colgate powder to polish it whenever required.",
  },
  {
    id: "gifting",
    q: "Can I order customized Panchaloga rings as gifts?",
    a: "Yes. Customized Panchaloga rings can be a meaningful gift for birthdays, anniversaries, weddings, religious occasions, or other special moments.",
  },
  {
    id: "couples",
    q: "Can I customize rings for couples?",
    a: "Yes, depending on the available designs. You can consider matching rings with names, initials, dates, or complementary engravings for couples.",
  },
  {
    id: "multiple",
    q: "Can I order multiple customized rings with different names?",
    a: "No, this is limited to 1 item per order.",
  },
  {
    id: "wrong-details",
    q: "What happens if I enter the wrong name or engraving details?",
    a: `Please carefully verify all customization details before placing your order. Once production has started, changes may not be possible. ${contactLine}`,
  },
  {
    id: "contact",
    q: "How can I contact Sabaa regarding a customized ring?",
    a: `For questions about customization, sizing, design, or an existing order, contact Sabaa customer support through the contact details provided on our website. Our team will assist you with the available customization options. ${contactLine}`,
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
  whatsapp: "917871900355",
  phoneDisplay: "+91 78719 00355",
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
