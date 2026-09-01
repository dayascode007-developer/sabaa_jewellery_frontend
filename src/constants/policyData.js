// Every word of the policy page lives here so the page stays layout-only.
//
// ⚠ The specific numbers below — return window, warranty length, refund
// timelines, the 48-hour damage report — are sensible defaults, NOT facts I
// took from your files. Read them and change them to whatever you actually
// honour before this page goes live. They are all in this one file.

// The cookie policy is shared with the About page rather than written twice,
// so editing it there updates both.
export { COOKIE_POLICY } from "./aboutData";

export const POLICY_UPDATED = "Last updated: 26 August 2026";

export const POLICY_SECTIONS = [
  { id: "faq", label: "FAQ" },
  { id: "shipping", label: "Shipping Policy" },
  { id: "returns", label: "Return Policy" },
  { id: "cancellation", label: "Cancellation Policy" },
  { id: "warranty", label: "Warranty Policy" },
  { id: "privacy", label: "Privacy Policy" },
  { id: "terms", label: "Terms & Conditions" },
  { id: "cookies", label: "Cookie Policy" },
];

// Order, shipping and returns questions. Deliberately different from the FAQs
// on the About page, which cover the craft rather than the paperwork.
export const POLICY_FAQS = [
  {
    id: "track",
    q: "How do I track my order?",
    a: "Once your piece is dispatched we send the courier name and tracking number to your registered email and WhatsApp number. Customized orders are only dispatched after you have approved the final design.",
  },
  {
    id: "change",
    q: "Can I change the engraving after I have ordered?",
    a: "Yes, as long as engraving has not started. Message us on WhatsApp as soon as possible — once a name, face or waveform has been cut into the metal it cannot be undone.",
  },
  {
    id: "returnable",
    q: "Can I return a customized ring?",
    a: "Personalised pieces cannot be returned for a change of mind, because they cannot be resold to anyone else. If the piece arrives damaged, faulty, or does not match the design you approved, we replace it. See the Return Policy below.",
  },
  {
    id: "damaged",
    q: "My order arrived damaged. What do I do?",
    a: "Tell us within 48 hours of delivery and send photos — an unboxing video is the fastest way to get it resolved. We arrange a replacement or a refund at no cost to you.",
  },
  {
    id: "intl",
    q: "Do you ship outside India?",
    a: "Yes. Tick the international shipment option on the product page and we confirm the shipping cost and timeline with you before the order is finalised. Any customs duty charged by the destination country is payable by you.",
  },
  {
    id: "refundtime",
    q: "How long does a refund take?",
    a: "Once the returned piece reaches us and passes inspection, the refund is issued to the original payment method within 7 to 10 business days. How quickly it appears after that depends on your bank.",
  },
];

export const POLICY_BLOCKS = [
  {
    id: "shipping",
    eyebrow: "Getting it to you",
    title: "Shipping Policy",
    intro:
      "Every piece is checked, gift-packed and insured before it leaves the workshop in Cuddalore.",
    blocks: [
      {
        id: "dispatch",
        title: "Dispatch timelines",
        body: "Ready-to-ship pieces leave us within 2 to 3 business days. Customized and engraved orders are typically ready within 10 days, counted from the day you approve the final design — not from the day you pay.",
      },
      {
        id: "charges",
        title: "Shipping charges",
        body: "Domestic shipping charges, where they apply, are shown at checkout before you pay. Gift packaging is free and does not add to the shipping cost.",
      },
      {
        id: "tracking",
        title: "Tracking",
        body: "You receive the courier name and tracking number by email and WhatsApp on the day of dispatch. If tracking has not updated for more than 48 hours, contact us and we will chase the courier on your behalf.",
      },
      {
        id: "international",
        title: "International shipment",
        body: "We ship worldwide. Select the international option on the product page and we will confirm cost and delivery time with you before finalising the order. Customs duties, import taxes and clearance charges levied by the destination country are payable by the recipient.",
      },
      {
        id: "delays",
        title: "Delays outside our control",
        body: "Courier disruption, weather, strikes and customs holds can extend delivery beyond our estimate. We keep you informed and stay on it until the parcel arrives, but these delays are not grounds for cancellation once a customized piece has been made.",
      },
    ],
  },
  {
    id: "returns",
    eyebrow: "If something is wrong",
    title: "Return Policy",
    intro:
      "Customized jewellery is made for one person and cannot be resold, so returns work differently here than on a normal store. Read this before you order.",
    blocks: [
      {
        id: "custom",
        title: "Personalised pieces",
        body: "Rings engraved with a name, face, fingerprint, barcode or voice waveform cannot be returned or exchanged for a change of mind, or because a size was entered incorrectly at checkout. Please use the size chart and confirm your design carefully before approving it.",
      },
      {
        id: "eligible",
        title: "What we do take back",
        body: "We replace or refund any piece that arrives damaged or faulty, is the wrong item, or does not match the design you approved. That is on us, and it costs you nothing.",
      },
      {
        id: "window",
        title: "Non-customized items",
        body: "Ready-made, uncustomized pieces may be returned within 7 days of delivery if they are unworn, unaltered and returned in their original packaging with the invoice.",
      },
      {
        id: "how",
        title: "How to raise a return",
        body: "Message us on WhatsApp or email sabaajewelarts@gmail.com within 48 hours of delivery with your order number and photos of the issue. An unboxing video settles most claims immediately. We will tell you where to send the piece.",
      },
      {
        id: "refund",
        title: "Refunds",
        body: "Approved refunds are issued to the original payment method within 7 to 10 business days of the piece reaching us and passing inspection. Shipping charges already paid are refunded only where the fault was ours.",
      },
    ],
  },
  {
    id: "cancellation",
    eyebrow: "Changed your mind",
    title: "Cancellation Policy",
    intro:
      "Cancelling is free right up until we start cutting metal. After that, the piece exists and cannot be unmade.",
    blocks: [
      {
        id: "before",
        title: "Before production begins",
        body: "Cancel any order at no cost before we begin work, and you are refunded in full. For customized orders, that means any time before you approve the final design.",
      },
      {
        id: "after",
        title: "After production begins",
        body: "Once engraving or casting has started on a personalised piece, the order cannot be cancelled. The materials and the artisan's time have already gone into your specific design.",
      },
      {
        id: "readymade",
        title: "Ready-made items",
        body: "Uncustomized items can be cancelled any time before dispatch. If the parcel has already left us, treat it as a return instead.",
      },
      {
        id: "ours",
        title: "Cancellation by us",
        body: "We may cancel an order if the item is unavailable, if a pricing error is discovered, or if we cannot execute the design you requested to a standard we are willing to put our name on. You are refunded in full and we tell you why.",
      },
      {
        id: "how",
        title: "How to cancel",
        body: "Message us on WhatsApp with your order number. Cancellation is confirmed in writing — an unanswered message is not a cancellation.",
      },
    ],
  },
  {
    id: "warranty",
    eyebrow: "Made to last",
    title: "Warranty Policy",
    intro:
      "Every piece is made by hand at our bench, and we stand behind that work.",
    blocks: [
      {
        id: "covered",
        title: "What is covered",
        body: "Manufacturing and workmanship defects are covered for 6 months from the date of delivery — a failed solder joint, a stone that comes loose on its own, an engraving that was cut incorrectly. We repair or replace the piece free of charge.",
      },
      {
        id: "not",
        title: "What is not covered",
        body: "Normal wear, scratches, discolouration from perfume, chlorine or household cleaners, loss, theft, accidental damage, deliberate bending or resizing, and any work carried out by another jeweller.",
      },
      {
        id: "care",
        title: "Care and free polish",
        body: "Keep the piece away from chemicals, wipe it with a soft dry cloth and store it separately. Bring or send it to us any time for a polish and check-up — we do not charge for that.",
      },
      {
        id: "claim",
        title: "Making a claim",
        body: "Send us your order number and photographs of the issue on WhatsApp. If it needs to come back to the workshop, we tell you how to send it and cover the return leg on valid claims.",
      },
    ],
  },
  {
    id: "privacy",
    eyebrow: "Your information",
    title: "Privacy Policy",
    intro:
      "We collect what we need to make your jewellery and get it to you, and nothing beyond that. We do not sell your data.",
    blocks: [
      {
        id: "collect",
        title: "What we collect",
        body: "Your name, delivery address, phone number and email; your order and payment status; and anything you send us for a customized piece — photographs, fingerprints, voice recordings or artwork.",
      },
      {
        id: "why",
        title: "Why we collect it",
        body: "To make the piece you ordered, to deliver it, to handle returns and warranty claims, and to reply when you contact us. We use your number to send order and dispatch updates.",
      },
      {
        id: "custom",
        title: "Your design files",
        body: "Photographs, voice recordings and fingerprint scans you send for engraving are treated as personal and confidential. We use them only to produce your piece, and we do not publish them or use them in our marketing without asking you first.",
      },
      {
        id: "share",
        title: "Who we share it with",
        body: "Only with the parties who make delivery possible — the courier handling your parcel and the payment gateway processing your payment — and with authorities where the law requires it.",
      },
      {
        id: "rights",
        title: "Access and deletion",
        body: "Write to sabaajewelarts@gmail.com to see what we hold about you, correct it, or ask us to delete it. We keep order and invoice records for as long as tax and accounting law requires.",
      },
      {
        id: "security",
        title: "Security",
        body: "Payment card details are handled by the payment gateway and never stored on our systems. Access to customer records is limited to the people who need it to fulfil your order.",
      },
    ],
  },
  {
    id: "terms",
    eyebrow: "The agreement",
    title: "Terms & Conditions",
    intro:
      "By placing an order with Sabaa Jewel Arts you accept the terms below. The business is registered as Nakshath International, GST 33BHPPV7845F1ZQ.",
    blocks: [
      {
        id: "orders",
        title: "Orders and acceptance",
        body: "An order is confirmed only when we accept it in writing. We may decline an order — for example where an item is unavailable, a price is listed in error, or the requested design cannot be executed properly at that size.",
      },
      {
        id: "pricing",
        title: "Pricing",
        body: "Prices are in Indian Rupees and inclusive of applicable taxes unless stated otherwise. Prices for precious-metal items may change with metal rates; the price confirmed on your order is the price you pay.",
      },
      {
        id: "content",
        title: "Content you send us",
        body: "By sending a photograph, face image, fingerprint, signature, artwork or voice recording for engraving, you confirm that you own it or have permission from the person it belongs to. You are responsible for that permission. We decline any request that appears to infringe someone else's rights, or that is unlawful or offensive.",
      },
      {
        id: "handmade",
        title: "Handmade variation",
        body: "Every piece is finished by hand, so slight variation in polish, weight and engraving depth is normal and is not a defect. Screen colours vary between devices and are not an exact match for the metal.",
      },
      {
        id: "ip",
        title: "Our intellectual property",
        body: "The Sabaa name, mark, designs, photographs and site content belong to us and may not be copied or reproduced without written permission.",
      },
      {
        id: "liability",
        title: "Limitation of liability",
        body: "Our liability for any order is limited to the amount you paid for that order. We are not liable for indirect losses, or for delays caused by couriers, customs or events outside our control.",
      },
      {
        id: "law",
        title: "Governing law",
        body: "These terms are governed by the laws of India. Any dispute is subject to the exclusive jurisdiction of the courts at Cuddalore, Tamil Nadu.",
      },
    ],
  },
];
