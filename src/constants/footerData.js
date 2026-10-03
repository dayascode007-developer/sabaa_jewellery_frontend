export const USEFUL_LINKS = [
  { id: "about", label: "About Us", href: "/about" },
  { id: "polish", label: "Jewel Polish & Care", href: "#" },
  { id: "tracking", label: "Order Tracking", href: "#" },
  { id: "returns", label: "Policy Page", href: "/policy" },
  { id: "blogs", label: "Blogs", href: "/blogs" },
  { id: "faqs", label: "Help & FAQs", href: "#" },
];

export const COMPANY_INFO = {
  addressLabel: "Head office Address:",
  address: [
    "Sabaa Jewel Arts.",
    "54,Gandhinagar,Vilvanagar,",
    "Semmandalam,cuddalore,",
    "Tamilnadu 607002",
  ],
  mobileLabel: "Mobile : 7871900355",
  email: "sabaajewelarts@gmail.com",
  phone: "+91 7871900355",
  // Digits only, country code included — wa.me rejects spaces and the leading +.
  whatsapp: "917871900355",
  // The embed shown in the footer.
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d62496.2804578447!2d79.75563!3d11.763816!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a549982c54b46c9%3A0x721b8ba7ed2dd42a!2sSaba%20jewel%20arts%2C%20engraving%20and%20enamel%20works!5e0!3m2!1sen!2sus!4v1787746524728!5m2!1sen!2sus",
  // Same listing, opened full-size. The cid is the decimal form of the
  // 0x721b8ba7ed2dd42a place id carried in the embed URL above.
  mapUrl: "https://maps.google.com/?cid=8222319098049975338",
};

export const LEGAL_LINKS = [
  { id: "cyber", label: "Cyber Security Policy", href: "#" },
  { id: "terms", label: "Terms & Conditions", href: "#" },
  { id: "privacy", label: "Privacy Notice", href: "#" },
  { id: "disclaimer", label: "Disclaimer", href: "#" },
];

const currentYear = new Date().getFullYear();

export const COPYRIGHT = `© ${currentYear} Nakshath International. All Rights Reserved.`;
