import {
  Geist,
  Geist_Mono,
  Cinzel,
  Pinyon_Script,
  Fraunces,
  IBM_Plex_Sans,
} from "next/font/google";
import Providers from "@/store/Providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Engraved-serif for the wordmark and headlines.
const cinzel = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
});

// Calligraphic accent — section headings and the "You" in the hero.
const pinyonScript = Pinyon_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

// Section headings and their taglines.
const fraunces = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
});

// Category labels and navigation.
const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-category",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
      className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} ${pinyonScript.variable} ${fraunces.variable} ${ibmPlexSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
