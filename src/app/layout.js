import {
  Geist,
  Geist_Mono,
  // Cinzel,        // previous drawer-wordmark face — site now uses ZCOOL only
  // Pinyon_Script, // previous (unused) script face — site now uses ZCOOL only
  // Fraunces,      // previous heading face — kept for an easy switch back
  // IBM_Plex_Sans, // previous tab-menu face — kept for an easy switch back
  ZCOOL_XiaoWei,
  // Antic_Didone,  // previous menu-bar face — kept for an easy switch back
} from "next/font/google";
import { Suspense } from "react";
import Providers from "@/store/Providers";
import MetaPixel from "@/components/analytics/MetaPixel";
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

// --- ONE FONT FOR THE WHOLE SITE — commented out, not deleted -------------
// --font-display and --font-script now point at ZCOOL XiaoWei in globals.css.
// These two would set the same variables on <html> and fight that, so they are
// switched off here. Restore by uncommenting both and their imports above, and
// adding the two names back to the <html> className.
//
// // Engraved-serif. Only the mobile drawer uses it.
// const cinzel = Cinzel({
//   variable: "--font-display",
//   subsets: ["latin"],
//   preload: false,
// });
//
// // Calligraphic accent. Currently referenced nowhere.
// const pinyonScript = Pinyon_Script({
//   variable: "--font-script",
//   subsets: ["latin"],
//   weight: "400",
//   preload: false,
// });
// ---------------------------------------------------------------------------

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

// --- MENU BAR FONT — now ZCOOL XiaoWei, like everything else ---------------
// --font-category is set in globals.css to var(--font-heading). The previous
// menu faces — Ariane Coachella (self-hosted) and Antic Didone below — are kept
// commented for an easy switch back.
//
// // Tab menu / category labels. Also a single 400 weight.
// const anticDidone = Antic_Didone({
//   variable: "--font-category",
//   subsets: ["latin"],
//   weight: "400",
// });
// ---------------------------------------------------------------------------

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
      // was: ${fraunces.variable} ${ibmPlexSans.variable} ${anticDidone.variable}
      //      ${cinzel.variable} ${pinyonScript.variable}
      // Only ZCOOL XiaoWei supplies a site font now; the other font variables
      // are pointed at it in globals.css.
      className={`${geistSans.variable} ${geistMono.variable} ${zcoolXiaoWei.variable} h-full antialiased`}
    >
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-JL84ZVP5TS"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-JL84ZVP5TS');`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {/* Loaders live per section, in each folder's loading.js — nothing here. */}
        <Providers>{children}</Providers>

        {/* Suspense is required, not optional: MetaPixel reads useSearchParams,
            and without a boundary that opts every page out of static rendering
            and fails the production build. */}
        <Suspense fallback={null}>
          <MetaPixel />
        </Suspense>
      </body>
    </html>
  );
}
