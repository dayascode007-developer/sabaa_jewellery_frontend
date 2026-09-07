import {
  Geist,
  Geist_Mono,
  Cinzel,
  Pinyon_Script,
  // Fraunces,      // previous heading face — kept for an easy switch back
  // IBM_Plex_Sans, // previous tab-menu face — kept for an easy switch back
  ZCOOL_XiaoWei,
  Antic_Didone,
} from "next/font/google";
import Providers from "@/store/Providers";
import "./globals.css";

// preload: false on the faces that are not used in the first screenful. They
// still load the moment something asks for them — this only stops Next emitting
// a <link rel="preload">, which is what the console was warning about: the
// browser fetched five woff2 files at high priority and then found nothing on
// the page using them.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  preload: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

// Engraved-serif. Only the mobile drawer uses it, and that is off-screen until
// the hamburger is tapped.
const cinzel = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  preload: false,
});

// Calligraphic accent. Currently referenced nowhere — the hero artwork carries
// its own lettering — so it is kept declared but never preloaded.
const pinyonScript = Pinyon_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
  preload: false,
});

// --- PREVIOUS FONTS — commented out, not deleted -------------------------
// Restore by uncommenting these two (and their imports above), then removing
// the two declarations below and swapping the names back in the <html> class.
//
// // Section headings and their taglines.
// const fraunces = Fraunces({
//   variable: "--font-heading",
//   subsets: ["latin"],
// });
//
// // Category labels and navigation.
// const ibmPlexSans = IBM_Plex_Sans({
//   variable: "--font-category",
//   subsets: ["latin"],
//   weight: ["400", "500", "600"],
// });
// -------------------------------------------------------------------------

// Headings, buttons and body copy. One weight only (400) — the family has no
// bold, so `font-bold`/`font-semibold` render as the browser's synthetic bold.
const zcoolXiaoWei = ZCOOL_XiaoWei({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "400",
});

// Tab menu / category labels. Also a single 400 weight.
const anticDidone = Antic_Didone({
  variable: "--font-category",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Sabaa Jewel Arts — Customized Panchaloga Jewellery",
  description:
    "Handcrafted, laser-engraved Panchaloga rings and chains, personalized for you. Crafted by tradition since 1984.",
  // Browser tab icon. The scaffold's src/app/favicon.ico was removed so it
  // cannot take precedence over this.
  icons: {
    icon: [{ url: "/logo_hd.webp", type: "image/webp" }],
    apple: "/logo_hd.webp",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      // was: ${fraunces.variable} ${ibmPlexSans.variable}
      className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} ${pinyonScript.variable} ${zcoolXiaoWei.variable} ${anticDidone.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {/* Loaders live per section, in each folder's loading.js — nothing here. */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
