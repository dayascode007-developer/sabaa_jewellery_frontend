// Blog content. Static for now — the shape mirrors what an API would return,
// so swapping in a fetch later means changing the page, not the components.
//
// Covers reuse existing product photography; drop dedicated blog artwork into
// assets/ and change the `cover` import when you have it.

import coverEngrave from "@/assets/jewels/engrave.webp";
import coverFaceRing from "@/assets/jewels/faceAndPhotoRing.webp";
import coverSymbols from "@/assets/jewels/symbolsRing.webp";
import coverRing from "@/assets/jewels/ring.jpg";
import coverMensChain from "@/assets/jewels/mensChain.webp";
import coverWomensChain from "@/assets/jewels/womensChain.webp";
import coverKids from "@/assets/jewels/Kids.webp";
import coverEarrings from "@/assets/jewels/earings.webp";
import coverPendant from "@/assets/jewels/pendent.jpg";
import coverImpon from "@/assets/jewels/Ipoon_Chain.jpg";

// The four sub-topics. `id` doubles as the anchor target on the listing page.
export const BLOG_CATEGORIES = [
  {
    id: "jewellery-tips",
    label: "Jewellery Tips",
    blurb:
      "Practical things worth knowing before and after you buy — sizing, care, and choosing what to engrave.",
    icon: "ring",
  },
  {
    id: "spiritual-articles",
    label: "Spiritual Articles",
    blurb:
      "Panchaloga, temple jewellery and the traditions behind the metal we have worked in since 1980.",
    icon: "lotus",
  },
  {
    id: "gift-guides",
    label: "Gift Guides",
    blurb:
      "What to give, and how to get it right when the piece is being made for one particular person.",
    icon: "gift",
  },
  {
    id: "festival-guides",
    label: "Festival Guides",
    blurb:
      "Ordering around Deepavali, weddings and muhurtham dates — mostly a question of timing.",
    icon: "lamp",
  },
  {
    id: "authenticity-quality",
    label: "Authenticity & Quality",
    blurb:
      "How to tell real Panchaloga from an imitation, what we check before a piece leaves, and what to ask any jeweller before you pay.",
    icon: "seal",
  },
  {
    id: "handmade-process",
    label: "Handmade Process",
    blurb:
      "What actually happens at the bench — from your photograph to the finished engraving, by the people who cut it.",
    icon: "hand",
  },
];

export const BLOG_POSTS = [
  /* ---------------- Jewellery Tips ---------------- */
  {
    slug: "how-to-care-for-panchaloga-ring",
    category: "jewellery-tips",
    title: "How to Care for Your Panchaloga Ring",
    excerpt:
      "Panchaloga darkens over time. That is the alloy behaving normally — here is how to keep it looking the way it did on day one.",
    cover: coverRing,
    author: "Sabaa Workshop",
    date: "2026-08-12",
    readMins: 4,
    content: [
      {
        type: "p",
        text: "Panchaloga is a living alloy. It reacts to skin, air, perfume and water, and over months it develops a deeper tone. Most customers grow to like it. If you would rather keep the original brightness, the work involved is small, but it has to be regular.",
      },
      { type: "h", text: "The daily habit that matters most" },
      {
        type: "p",
        text: "Put the ring on last and take it off first. Perfume, deodorant, hair spray and moisturiser all leave a film on the metal, and that film is what dulls an engraving. Wipe the piece with a soft dry cloth when you take it off at night — that single habit does more than any polish.",
      },
      { type: "h", text: "Keep it away from" },
      {
        type: "ul",
        items: [
          "Chlorinated water — swimming pools are the fastest way to discolour the alloy",
          "Household cleaners, bleach and dishwashing liquid",
          "Salt water, and prolonged soaking of any kind",
          "Ultrasonic cleaners, unless we have told you the piece can take one",
        ],
      },
      { type: "h", text: "Storing it properly" },
      {
        type: "p",
        text: "Store the ring on its own, in the pouch it arrived in or a soft-lined box. Loose in a drawer with other jewellery, harder metals will scratch across the engraving — and a scratch through a name is the one kind of damage that cannot be polished out without losing detail.",
      },
      {
        type: "quote",
        text: "Bring the piece back to us any time for a polish and a check of the setting. We do not charge for that.",
      },
      { type: "h", text: "What not to do yourself" },
      {
        type: "p",
        text: "Toothpaste, baking soda and metal polish are all abrasive. They will brighten the surface and, over a few applications, soften the edges of an engraving. If the piece needs more than a dry cloth, send it to us instead.",
      },
    ],
  },
  {
    slug: "find-your-ring-size-at-home",
    category: "jewellery-tips",
    title: "Finding Your Exact Ring Size at Home",
    excerpt:
      "An engraved ring cannot always be resized. Ten minutes of measuring now saves a conversation neither of us enjoys later.",
    cover: coverEngrave,
    author: "Sabaa Workshop",
    date: "2026-07-28",
    readMins: 5,
    content: [
      {
        type: "p",
        text: "This is the single most common thing people get wrong when ordering online, and with a customized piece it is the hardest to fix. Resizing an engraved band means cutting through the metal, and depending on where the engraving sits, the pattern may not survive it.",
      },
      { type: "h", text: "Method one — measure a ring you already wear" },
      {
        type: "p",
        text: "This is the most reliable. Take a ring that fits the correct finger comfortably, lay it flat, and measure the inside diameter across the widest point with a ruler that has millimetre markings. Send us that number. Do not guess from the outside edge — the band's thickness will throw you off by a full size.",
      },
      { type: "h", text: "Method two — measure the finger" },
      {
        type: "ul",
        items: [
          "Wrap a strip of paper snugly around the base of the finger — snug, not tight",
          "Mark where the strip overlaps, then lay it flat and measure to the mark in millimetres",
          "That length is the circumference; send it to us and we will convert it",
        ],
      },
      { type: "h", text: "Measure at the right time of day" },
      {
        type: "p",
        text: "Fingers are smallest in the early morning and in cold weather, and largest in the evening and in heat. Measure in the evening, at normal room temperature, and measure the same finger three times on three different days. If the readings disagree, take the largest.",
      },
      { type: "h", text: "One thing people forget" },
      {
        type: "p",
        text: "The ring has to pass the knuckle. A band that fits the base of the finger perfectly but will not go over the knuckle is the wrong size. Check that the paper strip slides over the knuckle before you trust the measurement.",
      },
      {
        type: "note",
        text: "Not confident? Send us your measurements on WhatsApp before you order and we will check them with you.",
      },
    ],
  },
  {
    slug: "name-face-or-fingerprint-what-to-engrave",
    category: "jewellery-tips",
    title: "Name, Face or Fingerprint — Choosing What to Engrave",
    excerpt:
      "Not every idea works at ring scale. An honest look at what each option actually looks like in metal.",
    cover: coverFaceRing,
    author: "Sabaa Workshop",
    date: "2026-07-09",
    readMins: 6,
    content: [
      {
        type: "p",
        text: "You have roughly the width of a fingernail to work with. What reads beautifully on a screen does not always survive that reduction, and it is better to know which is which before the piece is made.",
      },
      { type: "h", text: "Names" },
      {
        type: "p",
        text: "The safest choice, and still the most popular after forty years. Short names in a clean script hold up best. Long names force smaller letters, and very fine script strokes can close up when cut. If the name is long, consider initials on the face and the full name inside the band.",
      },
      { type: "h", text: "Faces and photographs" },
      {
        type: "p",
        text: "These can be extraordinary, but they depend entirely on the photograph. What we need is a sharp, well-lit, front-facing image where the face fills a good part of the frame. Group photos cropped down, dim indoor shots and heavily filtered images all lose the detail that makes the engraving recognisable.",
      },
      { type: "h", text: "Fingerprints" },
      {
        type: "p",
        text: "Quietly the most personal option. A fingerprint engraves cleanly because it is essentially line work, and it carries meaning without announcing itself to everyone who sees the ring. We will tell you how to take a usable print.",
      },
      { type: "h", text: "Voice waveforms" },
      {
        type: "p",
        text: "A few seconds of a recording, rendered as its waveform. Short phrases work far better than long ones — three or four seconds gives a shape with real character, while thirty seconds becomes an undifferentiated band.",
      },
      {
        type: "quote",
        text: "Send us your idea before you pay. If it will not work at that size, we would rather tell you now than hand you something disappointing.",
      },
    ],
  },

  /* ---------------- Spiritual Articles ---------------- */
  {
    slug: "what-is-panchaloga",
    category: "spiritual-articles",
    title: "What Panchaloga Actually Is",
    excerpt:
      "Five metals, one alloy, and a tradition that predates every workshop currently working in it. A plain explanation.",
    cover: coverSymbols,
    author: "Venkatesan. R",
    date: "2026-08-04",
    readMins: 5,
    content: [
      {
        type: "p",
        text: "Panchaloga — from pancha, five, and loha, metal — is a traditional South Indian alloy used for temple icons and ceremonial jewellery for centuries. The word describes a practice rather than a single fixed recipe, and proportions have always varied between workshops and regions.",
      },
      { type: "h", text: "The five metals" },
      {
        type: "p",
        text: "Gold, silver, copper, zinc and iron are the metals most commonly named, with copper usually forming the bulk of the mix. Some traditions substitute lead or tin for one of the five. Each workshop has its own composition, generally passed down rather than published.",
      },
      { type: "h", text: "Why it is used for sacred objects" },
      {
        type: "p",
        text: "Temple bronzes have been cast in five-metal alloys since at least the Chola period, and the tradition holds that combining the five brings together qualities no single metal carries alone. That belief is why Panchaloga sits at the centre of ceremonial metalwork rather than being simply one alloy among many.",
      },
      {
        type: "note",
        text: "Panchaloga carries traditional and ayurvedic associations that many families hold sincerely. We make the metal; we make no medical claims about it.",
      },
      { type: "h", text: "Why it suits engraving" },
      {
        type: "p",
        text: "Practically speaking, the alloy is hard enough to hold a cut edge cleanly and soft enough to work by hand. That combination is why an engraved Panchaloga ring keeps its detail for decades, and it is the reason Sabaa began in this metal in 1980 rather than any other.",
      },
      { type: "h", text: "How it ages" },
      {
        type: "p",
        text: "It darkens. Copper content means the surface tones down over months of wear, deepening in the recesses of an engraving and staying brighter on the raised surfaces. Many people prefer it after a year to the day they received it.",
      },
    ],
  },
  {
    slug: "why-temple-jewellery-uses-five-metals",
    category: "spiritual-articles",
    title: "Why Temple Jewellery Is Made of Five Metals",
    excerpt:
      "The bronzes in a South Indian temple and the ring on your finger come from the same metallurgical tradition.",
    cover: coverPendant,
    author: "Venkatesan. R",
    date: "2026-06-22",
    readMins: 4,
    content: [
      {
        type: "p",
        text: "Walk into any older temple in Tamil Nadu and the processional icons you see are cast metal, not stone. Stone deities stay in the sanctum; the figures that go out into the streets during festivals are metal, because metal can be carried, and because it can be cast in one piece by the lost-wax method.",
      },
      { type: "h", text: "One tradition, two scales" },
      {
        type: "p",
        text: "The same alloy family used for those icons is used for the jewellery associated with them. A deity ring and a processional bronze are separated by scale and by purpose, not by material or by craft lineage. The artisan skills transfer directly.",
      },
      { type: "h", text: "The completeness of five" },
      {
        type: "p",
        text: "Traditional texts describe the five metals as corresponding to elements and to planetary associations, so that an object made of all five is understood as complete in a way a single-metal object is not. Whether one reads that symbolically or literally, it is the reasoning that put five metals into the crucible in the first place.",
      },
      { type: "h", text: "Why families still choose it" },
      {
        type: "p",
        text: "For most of our customers the appeal is continuity. A Panchaloga ring engraved with a family name is made from the same alloy as the icons their grandparents stood in front of. That connection is the point, and it is not something a newer material can be given.",
      },
    ],
  },
  {
    slug: "wearing-a-deity-ring",
    category: "spiritual-articles",
    title: "Wearing a Deity Ring: What the Traditions Say",
    excerpt:
      "Which finger, which hand, and what to do when you are asked to remove it. Customs, described as customs.",
    cover: coverImpon,
    author: "Sabaa Workshop",
    date: "2026-05-30",
    readMins: 4,
    content: [
      {
        type: "p",
        text: "We are asked about this constantly, so here is what the common practices are — presented as practice and custom, which is what they are. Families differ, regions differ, and no one should feel they are doing it wrongly.",
      },
      { type: "h", text: "Which finger" },
      {
        type: "p",
        text: "The ring finger and the middle finger of the right hand are the most common choices in South Indian practice. Some traditions associate particular fingers with particular planetary influences and prescribe accordingly; many families simply wear the ring where it fits comfortably.",
      },
      { type: "h", text: "Everyday wear" },
      {
        type: "p",
        text: "A deity ring is generally treated as something worn continuously rather than only on occasions. Most people remove it for bathing, cooking with strong ingredients, and any work involving chemicals — practical reasons that happen to also be good for the metal.",
      },
      { type: "h", text: "Respect and handling" },
      {
        type: "p",
        text: "Customs commonly observed include removing the ring before entering certain areas, keeping it off the floor, and not lending it casually. If you are unsure what your own family observes, ask an elder rather than the internet — the answer that matters is the one your household keeps.",
      },
      {
        type: "note",
        text: "We make these pieces with care and we take the traditions around them seriously. If your family has a specific requirement about how a piece is made or handed over, tell us when you order.",
      },
    ],
  },

  /* ---------------- Gift Guides ---------------- */
  {
    slug: "anniversary-personalised-ring-guide",
    category: "gift-guides",
    title: "A Gift That Cannot Be Bought Twice",
    excerpt:
      "Personalised rings for anniversaries — what to put on them, and the one mistake that ruins the surprise.",
    cover: coverWomensChain,
    author: "Sabaa Workshop",
    date: "2026-08-18",
    readMins: 5,
    content: [
      {
        type: "p",
        text: "The strength of a personalised gift is that it could not have been bought for anyone else. That is also its risk: get a detail wrong and there is no exchanging it. Here is how to get the details right.",
      },
      { type: "h", text: "What people actually choose" },
      {
        type: "ul",
        items: [
          "Both names on a matching pair of bands — the most requested anniversary piece we make",
          "A wedding date engraved inside the band, where only the wearer sees it",
          "A fingerprint of the other person, which reads as pattern to everyone else",
          "A few seconds of a voice message rendered as a waveform",
        ],
      },
      { type: "h", text: "The mistake" },
      {
        type: "p",
        text: "Ordering without knowing the size. People try to preserve the surprise and guess, and a guessed size on an engraved band is the one thing we often cannot fix. Borrow a ring they already wear and measure it — see our sizing guide. If that is impossible, order a piece that is not size-dependent, such as a pendant.",
      },
      { type: "h", text: "How far ahead to order" },
      {
        type: "p",
        text: "Allow ten days for a customized piece from the day the design is approved, and approve the design early rather than the night before. If the anniversary is close, message us first — we will tell you honestly whether it can be done.",
      },
      {
        type: "quote",
        text: "The design approval is the clock, not the payment. Confirm the layout early and the rest is straightforward.",
      },
    ],
  },
  {
    slug: "gifting-without-knowing-their-size",
    category: "gift-guides",
    title: "Gifting When You Do Not Know Their Size",
    excerpt:
      "Four ways to give personalised jewellery without asking the question and spoiling the surprise.",
    cover: coverEarrings,
    author: "Sabaa Workshop",
    date: "2026-06-14",
    readMins: 4,
    content: [
      {
        type: "p",
        text: "Every week someone asks us how to give a ring as a surprise. The honest answer is that a ring is the hardest personalised gift to surprise someone with. But there are ways around it.",
      },
      { type: "h", text: "Borrow a ring they already own" },
      {
        type: "p",
        text: "The classic solution and still the best. Take one they wear on the correct finger, measure the inside diameter in millimetres, and put it back. You do not need to keep it — you need one measurement.",
      },
      { type: "h", text: "Choose a piece that does not need a size" },
      {
        type: "ul",
        items: [
          "A pendant with an engraved name or fingerprint",
          "A chain, which is chosen by length rather than fitted",
          "Earrings, engraved with initials or a symbol",
        ],
      },
      { type: "h", text: "Give the design, order the size later" },
      {
        type: "p",
        text: "Some customers approve the design with us, give the recipient a printed card showing what is coming, and let them confirm their own size afterwards. The surprise survives, and the ring fits.",
      },
      { type: "h", text: "Ask someone who would know" },
      {
        type: "p",
        text: "A sibling, a close friend, a parent. In our experience they are usually delighted to be brought in, and they keep the secret better than people expect.",
      },
    ],
  },

  /* ---------------- Festival Guides ---------------- */
  {
    slug: "deepavali-gifting-order-in-time",
    category: "festival-guides",
    title: "Deepavali Gifting: Ordering in Time",
    excerpt:
      "Customized pieces take ten days, and everyone remembers at once. Work backwards from the date.",
    cover: coverMensChain,
    author: "Sabaa Workshop",
    date: "2026-08-20",
    readMins: 4,
    content: [
      {
        type: "p",
        text: "Deepavali is the busiest point in our year, and the constraint is not stock — it is bench time. Every customized piece is engraved by hand, and a workshop can only cut so many in a week. The people who are disappointed are almost always the ones who ordered late.",
      },
      { type: "h", text: "Work backwards from the date" },
      {
        type: "ul",
        items: [
          "Ten days for a customized piece, counted from design approval",
          "Two to three days for the design conversation before that",
          "Delivery time on top, longer for international addresses",
        ],
      },
      {
        type: "p",
        text: "That puts a comfortable order date at roughly three weeks before the festival. Closer than that and we will still try, but we will tell you plainly what is realistic rather than promise and fail.",
      },
      { type: "h", text: "Ordering for several people" },
      {
        type: "p",
        text: "Family orders of five or six engraved pieces are common at Deepavali and need more notice, not the same notice. Send the full list in one message rather than one piece at a time — it lets us schedule the whole set through the bench together.",
      },
      { type: "h", text: "If you have left it late" },
      {
        type: "p",
        text: "Ready-made pieces without customization dispatch in two to three days. A ready piece delivered on time is a better gift than a customized one that arrives the week after.",
      },
    ],
  },
  {
    slug: "wedding-muhurtham-jewellery-planning",
    category: "festival-guides",
    title: "Planning Custom Jewellery Around Muhurtham Dates",
    excerpt:
      "Wedding season concentrates every order into a few weeks. Here is how to plan around a fixed date.",
    cover: coverKids,
    author: "Sabaa Workshop",
    date: "2026-07-16",
    readMins: 5,
    content: [
      {
        type: "p",
        text: "A muhurtham date does not move. That single fact should shape the whole schedule, and it is why wedding jewellery is the one category where we ask people to start early even when they feel it is too early.",
      },
      { type: "h", text: "Start six weeks out" },
      {
        type: "p",
        text: "Six weeks gives room for the design conversation, the ten-day production window, delivery, and — most importantly — a second attempt if something needs changing. Three weeks gives you production and nothing else.",
      },
      { type: "h", text: "Matching sets take longer" },
      {
        type: "p",
        text: "Pairs and sets have to be made together to match properly in tone and finish. Two rings ordered in the same week are a set; the same two ordered a month apart are two rings that will not quite agree with each other.",
      },
      { type: "h", text: "Sizes across a family" },
      {
        type: "p",
        text: "Collect every size in one go, in writing, before anything is approved. Chasing a size from a relative in another city during wedding preparations is not a task anyone needs, and it is the most common cause of delay we see.",
      },
      {
        type: "note",
        text: "Send us the muhurtham date when you first message us. We plan the schedule backwards from it and tell you the last safe order date.",
      },
    ],
  },

  /* ---------------- Authenticity & Quality ---------------- */
  {
    slug: "how-to-tell-real-panchaloga",
    category: "authenticity-quality",
    title: "How to Tell Real Panchaloga from an Imitation",
    excerpt:
      "Brass polished to look like gold is sold as Panchaloga every day. Here is what actually distinguishes the real alloy.",
    cover: coverRing,
    author: "Venkatesan. R",
    date: "2026-08-22",
    readMins: 6,
    content: [
      {
        type: "p",
        text: "Panchaloga is an alloy, not a single metal, and that makes it easier to imitate than gold. Plated brass looks close enough in a photograph, and most buyers only discover the difference months later. These are the checks worth making.",
      },
      { type: "h", text: "Weight in the hand" },
      {
        type: "p",
        text: "Panchaloga is dense. A ring of any size has a heft that hollow or plated pieces do not. If a band feels light for its bulk, it is either hollow or a lighter base metal underneath a coating.",
      },
      { type: "h", text: "How it ages" },
      {
        type: "p",
        text: "This is the clearest test, and it takes time rather than equipment. Panchaloga darkens gradually and evenly, deepening in the recesses. A plated piece does not darken — it wears through, showing a different colour at the edges and high points where it rubs. Uneven colour after a few months means plating.",
      },
      { type: "h", text: "Look at the inside of the band" },
      {
        type: "p",
        text: "The inner surface is where shortcuts show. It should be finished to the same standard as the outside. Rough tool marks, a seam, or a colour that does not match the exterior are all signs of a coated base metal.",
      },
      { type: "h", text: "Ask what is in it" },
      {
        type: "p",
        text: "Any workshop genuinely working in Panchaloga can tell you which five metals go in and roughly which dominates. Exact proportions are usually a workshop's own and not published — that is normal. What is not normal is a seller who cannot name the metals at all.",
      },
      { type: "h", text: "Ask for it in writing" },
      {
        type: "p",
        text: "A proper invoice naming the metal, the weight and the seller's registered business is the only thing you can actually rely on afterwards. Ours is issued by Nakshath International under GST 33BHPPV7845F1ZQ. A seller unwilling to put the metal on the bill is telling you something.",
      },
      {
        type: "note",
        text: "Unsure about a piece you already own — from us or from anyone else? Send us photographs on WhatsApp and we will tell you honestly what we think it is.",
      },
    ],
  },
  {
    slug: "inside-our-quality-check",
    category: "authenticity-quality",
    title: "What We Check Before a Piece Leaves the Workshop",
    excerpt:
      "Six checks, every piece, by hand. Anything that fails goes back to the bench rather than into the box.",
    cover: coverEngrave,
    author: "Sabaa Workshop",
    date: "2026-08-08",
    readMins: 4,
    content: [
      {
        type: "p",
        text: "A customized piece cannot be swapped for another off a shelf, so a fault caught here costs us a day and a fault missed costs you weeks. Every piece is checked against the same list before it is packed.",
      },
      {
        type: "ul",
        items: [
          "The engraving against your approved artwork — spelling, spacing and orientation, letter by letter",
          "Depth and consistency of the cut, so no part of the engraving is shallower than the rest",
          "Stone settings, pressed and checked by hand rather than by eye",
          "Inner and outer edges filed smooth, so nothing catches on skin or fabric",
          "The finished size measured against the size on your order, not the size on the design",
          "Final weight recorded, and the piece photographed before it goes in the box",
        ],
      },
      { type: "h", text: "The check that catches the most" },
      {
        type: "p",
        text: "Spelling. Not our spelling — yours. A name approved with a typo will be engraved exactly as approved, so we read it back against your original message rather than against the design file. It has saved more pieces than any other step on the list.",
      },
      { type: "h", text: "What happens when something fails" },
      {
        type: "p",
        text: "It goes back to the bench. If that pushes past the date we promised you, we tell you the same day rather than quietly shipping something we are not happy with.",
      },
    ],
  },
  {
    slug: "questions-before-ordering-custom-jewellery",
    category: "authenticity-quality",
    title: "Five Questions to Ask Before Ordering Customized Jewellery",
    excerpt:
      "Ask any jeweller these before you pay — including us. The answers tell you more than the photographs do.",
    cover: coverSymbols,
    author: "Sabaa Workshop",
    date: "2026-07-22",
    readMins: 5,
    content: [
      {
        type: "p",
        text: "Customized jewellery cannot be returned for a change of mind, so almost everything depends on what is agreed before the metal is cut. These five questions are worth asking of anyone, us included.",
      },
      { type: "h", text: "1. Will I see the design before you make it?" },
      {
        type: "p",
        text: "You should approve a layout before any work starts, and the production clock should begin at that approval — not at payment. If a seller will not show you the design first, you are paying for a guess.",
      },
      { type: "h", text: "2. What exactly is the metal?" },
      {
        type: "p",
        text: "Panchaloga, silver, gold — and at what purity where it applies. It should appear on the invoice, not just in the chat.",
      },
      { type: "h", text: "3. What happens if the size is wrong?" },
      {
        type: "p",
        text: "Get the honest answer, because for an engraved band it is often \"nothing can be done\". Anyone promising free resizing on any engraved ring has either not made many, or is planning to cut through your engraving.",
      },
      { type: "h", text: "4. Who owns what I send you?" },
      {
        type: "p",
        text: "If you are sending a photograph of a face, a fingerprint or a voice recording, ask what happens to it afterwards. It should be used for your piece and nothing else, and it should not appear in anyone's marketing without your permission.",
      },
      { type: "h", text: "5. What is the real timeline?" },
      {
        type: "p",
        text: "Ask for the date the piece will be dispatched, not the number of days it takes to make. Those are different numbers, and the gap between them is where festival orders go wrong.",
      },
      {
        type: "quote",
        text: "A jeweller who answers all five plainly is worth more than one with better photographs.",
      },
    ],
  },

  /* ---------------- Handmade Process ---------------- */
  {
    slug: "from-photograph-to-metal",
    category: "handmade-process",
    title: "From Your Photograph to the Metal",
    excerpt:
      "How a face becomes an engraving — and why the photograph you send decides most of the result.",
    cover: coverFaceRing,
    author: "Sabaa Workshop",
    date: "2026-08-15",
    readMins: 6,
    content: [
      {
        type: "p",
        text: "A face engraved on a ring has perhaps the width of a fingernail to work in. Everything that happens between your photograph and the finished piece is about deciding what survives that reduction and what has to go.",
      },
      { type: "h", text: "Reading the photograph" },
      {
        type: "p",
        text: "We look for one thing first: is the face lit from the front and in focus. Side lighting throws shadows that read as marks in metal. Soft focus loses the eyes, and the eyes are what make an engraving recognisable as a person rather than as a shape.",
      },
      { type: "h", text: "Reducing it to lines" },
      {
        type: "p",
        text: "A photograph has thousands of tones. An engraving has cut and not-cut. So the image is worked down to the lines that carry the likeness — the jaw, the brow, the set of the eyes and mouth — and everything decorative is dropped. This is judgement, not a filter, and it is the step that decides whether the finished ring looks like your person.",
      },
      { type: "h", text: "Your approval" },
      {
        type: "p",
        text: "You see that layout at the size it will actually be cut, not enlarged. Enlarged, everything looks good. At true size you can see what will really be there, and that is the version you approve.",
      },
      { type: "h", text: "Cutting it" },
      {
        type: "p",
        text: "The lines go into the metal by hand. It is slow, and deliberately so — a cut that goes too deep cannot be undone, and there is no second attempt on a piece that already has your name on the other side of it.",
      },
      { type: "h", text: "What makes a photograph work" },
      {
        type: "ul",
        items: [
          "Front-facing, with the face filling a good part of the frame",
          "Even daylight — a window is better than a flash",
          "Sharp enough that you can see the eyes clearly when you zoom in",
          "The original file, not a screenshot or a forwarded copy",
        ],
      },
      {
        type: "note",
        text: "Send us the photograph before you order. We will tell you honestly whether it will work at ring scale — that conversation costs nothing and saves the disappointing version.",
      },
    ],
  },
  {
    slug: "why-two-handmade-rings-differ",
    category: "handmade-process",
    title: "Why Two Handmade Rings Are Never Identical",
    excerpt:
      "Slight variation is what handmade means. Here is what is normal, and what is genuinely a fault.",
    cover: coverPendant,
    author: "Sabaa Workshop",
    date: "2026-07-30",
    readMins: 4,
    content: [
      {
        type: "p",
        text: "Customers ordering a matching pair sometimes ask why the two are not exactly the same. They are not, and they cannot be — but there is a real line between variation and a defect, and you are entitled to know where it sits.",
      },
      { type: "h", text: "What is normal" },
      {
        type: "ul",
        items: [
          "Slight differences in polish and how the light catches each piece",
          "Small variation in weight between two pieces of the same design",
          "Engraving depth differing very slightly across a piece",
          "Colour that is not an exact match to your screen — no screen shows metal accurately",
        ],
      },
      { type: "h", text: "What is not" },
      {
        type: "ul",
        items: [
          "Engraving that does not match the design you approved",
          "A stone that moves in its setting",
          "Edges that catch on skin or fabric",
          "A size that differs from the size on your order",
        ],
      },
      { type: "p", text: "The second list is our problem, not yours. We replace or repair, and it costs you nothing." },
      { type: "h", text: "Ordering a matching pair" },
      {
        type: "p",
        text: "Pairs and sets are made together, in the same batch, from the same prepared alloy. Two rings ordered a month apart are two rings; ordered together they are a set, and they will agree with each other in a way separately-made pieces never quite do.",
      },
      {
        type: "quote",
        text: "If every piece were identical, it would not have been made by hand — and the engraving would not be worth having.",
      },
    ],
  },
  {
    slug: "a-day-at-the-bench",
    category: "handmade-process",
    title: "A Day at the Bench",
    excerpt:
      "The tools, the hours and the people behind a Sabaa piece — the part of the business no photograph really shows.",
    cover: coverImpon,
    author: "Venkatesan. R",
    date: "2026-06-30",
    readMins: 5,
    content: [
      {
        type: "p",
        text: "Most of what we do happens at a wooden bench in Cuddalore that has been worked at for four decades. There is no production line. There is a person, a set of files and gravers, and one piece at a time.",
      },
      { type: "h", text: "The morning" },
      {
        type: "p",
        text: "Alloy is prepared first, in-house, so the composition stays the same from piece to piece. That consistency is why two rings ordered together match — buying ready-made alloy from different suppliers is where mismatched sets come from.",
      },
      { type: "h", text: "Casting and shaping" },
      {
        type: "p",
        text: "The piece is cast, then filed and shaped by hand until it is round, even and the right size. This is the stage where a ring stops being metal and starts being a ring, and it is almost entirely feel — the file tells you more than the eye does.",
      },
      { type: "h", text: "The slow part" },
      {
        type: "p",
        text: "Engraving. A name might take an hour; a face takes most of a day. There is no undo, so an artisan cutting a face works in short sessions and stops when concentration goes. A tired hand is how mistakes get into metal.",
      },
      { type: "h", text: "The end of the day" },
      {
        type: "p",
        text: "Setting, polishing and the final check against your original request. Then it is photographed, gift-packed and put aside for dispatch. Whatever number of pieces went through the bench that day, each one had someone's full attention for the time it took.",
      },
      {
        type: "note",
        text: "Passing through Cuddalore? You are welcome to come and see the workshop. Message us first so someone is there to show you around.",
      },
    ],
  },
];

/* ------------------------- helpers ------------------------- */

export const getCategory = (id) => BLOG_CATEGORIES.find((c) => c.id === id);

export const getCategoryLabel = (id) => getCategory(id)?.label ?? "Blog";

export const getPostsByCategory = (id) =>
  BLOG_POSTS.filter((post) => post.category === id);

export const getPostBySlug = (slug) =>
  BLOG_POSTS.find((post) => post.slug === slug);

// Same category first, then anything else, so the rail is never empty.
export const getRelatedPosts = (post, limit = 3) => {
  const sameCategory = BLOG_POSTS.filter(
    (p) => p.slug !== post.slug && p.category === post.category
  );
  const rest = BLOG_POSTS.filter(
    (p) => p.slug !== post.slug && p.category !== post.category
  );
  return [...sameCategory, ...rest].slice(0, limit);
};

// Dates are stored ISO so they sort correctly; this is display only.
export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
