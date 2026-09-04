"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useState } from "react";
import { USEFUL_LINKS, COMPANY_INFO, LEGAL_LINKS } from "@/constants/footerData";
import sabaaLogo from "@/assets/logo/New High Quality Sabaa Logo.webp";
import instagramQr from "@/assets/logo/Untitled.svg";
import AuthModal from "@/components/common/AuthModal";

const FOOTER_BG = "#3D0F0F";

// X and YouTube were dropped; WhatsApp took their place. All three render
// identically — same white disc, same size — so nothing looks bolted on.
// The Instagram URL is the clean profile link. The ?ig_mid=… and utm_source
// parameters on the one you sent are your own browser's session identifiers —
// they belong to whoever copied the link, not to the profile, and should not be
// published on the site.
const SOCIAL_LINKS = [
  {
    key: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/sabajewelarts/",
  },
  {
    key: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/sabaajewelarts",
  },
  { key: "whatsapp", label: "WhatsApp", href: `https://wa.me/${COMPANY_INFO.whatsapp}` },
];

function Icon({ path, className = "h-5 w-5", filled = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {path}
    </svg>
  );
}

const GLYPHS = {
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: (
    <path
      d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H16.7V3.6c-.3 0-1.3-.13-2.45-.13-2.43 0-4.1 1.48-4.1 4.2v2.23H7.4V13h2.75v8h3.35Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  whatsapp: (
    <path
      d="M12 2.8a9.1 9.1 0 0 0-7.8 13.8L2.9 21.3l4.9-1.3A9.1 9.1 0 1 0 12 2.8Zm0 1.9a7.2 7.2 0 1 1-3.8 13.3l-.3-.2-2.6.7.7-2.5-.2-.3A7.2 7.2 0 0 1 12 4.7Zm4.4 10.2c-.1-.2-.4-.3-.8-.5l-1.7-.8c-.2-.1-.4-.1-.6.1l-.7.9c-.1.2-.3.2-.5.1a7.4 7.4 0 0 1-2-1.2 8 8 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.5-.6c.1-.2.2-.3.1-.5l-.8-1.7c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-.9.9-.9 2.1 0 1.3.9 2.5 1 2.6.2.2 1.8 2.9 4.5 4 2.2.9 2.7.7 3.2.7.5 0 1.6-.6 1.8-1.3.2-.6.2-1.1.1-1.2Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  mail: (
    <>
      <path d="M3.5 6.5h17v11h-17z" />
      <path d="m3.5 7.5 8.5 6 8.5-6" />
    </>
  ),
  chat: (
    <>
      <path d="M20.5 12.2c0 3.7-3.6 6.7-8 6.7-1 0-2-.2-2.9-.5L4.5 20l1.3-3.4a6.3 6.3 0 0 1-2.3-4.4c0-3.7 3.6-6.7 8-6.7s9 3 9 6.7Z" />
    </>
  ),
};

// Ornate knot mark above the wordmark.
// Same logo file as the header. Its artwork is maroon, which would vanish on
// this dark background, so brightness(0) invert(1) flattens it to pure white —
// the transparent areas stay transparent.
function Wordmark() {
  return (
    <div className="flex flex-col items-center">
      <Image
        src={sabaaLogo}
        alt="Sabaa Jewel Arts"
        className="h-32 w-auto sm:h-40"
        style={{ filter: "brightness(0) invert(1)" }}
      />
    </div>
  );
}

// The notch bitten out of the top and bottom edges: two deep, rounded lobes
// meeting at a sharp cusp in the middle.
//
// Offset by 1px beyond the edge (-top-px / -bottom-px) on purpose. However
// steep the curve, the shape must taper to zero thickness where it meets the
// footer edge, and that sub-pixel tail antialiases into a faint hairline
// running out to both sides — very visible at mobile widths and at browser
// zoom. Pushing it 1px out lets the footer's overflow-hidden swallow exactly
// that tail; everything thicker than 1px is unaffected.
function Notch({ position }) {
  const isTop = position === "top";
  return (
    <svg
      viewBox="0 0 120 44"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute left-1/2 h-8 w-40 -translate-x-1/2 text-white sm:h-11 sm:w-56 ${
        // -scale-y-100 mirrors vertically only. rotate-180 flips both axes and
        // composes with the -translate-x-1/2 above it, which made the bottom
        // notch render differently from the top instead of mirroring it.
        isTop ? "-top-px" : "-bottom-px -scale-y-100"
      }`}
      aria-hidden="true"
    >
      {/* An S-curve: it leaves the edge almost flat (control 102,3 — a rounded
          shoulder) then steepens into the centre (control 76,10 -> 60,32), so
          the two halves meet at a point. Arriving level would round the bottom
          off; arriving straight would make a triangle. This is between. */}
      <path
        d="M0 0 L120 0 C102 3 76 10 60 32 C44 10 18 3 0 0 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Footer() {
  const router = useRouter();
  const { token } = useSelector((state) => state.auth);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleOrderTracking = () => {
    if (token) {
      router.push("/account?tab=orders");
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <div className="w-full bg-white px-3 pt-10 pb-3 sm:px-5 sm:pt-14 sm:pb-5">
      <footer
        className="relative overflow-hidden rounded-[28px] px-6 py-12 sm:px-10 sm:py-14"
        style={{ backgroundColor: FOOTER_BG }}
      >
        <Notch position="top" />
        <Notch position="bottom" />

        <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-10 lg:flex-row lg:gap-0">
          {/* Brand column, ruled off from the rest */}
          <aside className="flex flex-col items-center px-2 lg:w-[30%] lg:border-r lg:border-white/15 lg:pr-8">
            <Wordmark />

            <p className="mt-7 font-[family-name:var(--font-heading)] text-lg font-semibold text-white">
              Follow us on Instagram
            </p>

            {/* The QR is black on white, so it keeps its own white card to stay
                scannable against the maroon. The padding is the quiet zone a
                scanner needs around the code. */}
            <div className="mt-4 aspect-square w-full max-w-[240px] rounded-sm bg-white p-2">
              <Image
                src={instagramQr}
                alt="Scan to follow Sabaa Jewel Arts on Instagram"
                // next/image refuses to optimise SVG unless dangerouslyAllowSVG
                // is set, so this one is served as-is.
                unoptimized
                className="h-full w-full"
              />
            </div>

            <span className="mt-6 hidden h-px w-full max-w-[340px] bg-white/15 lg:block" />
          </aside>

          {/* Everything else aligns to this column, including the rows below */}
          <div className="min-w-0 flex-1 lg:pl-10">
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-3">
              {/* Useful links */}
              <nav>
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-white">
                  Useful Links
                </h3>
                <ul className="mt-5 space-y-4">
                  {USEFUL_LINKS.map((link) => {
                    // Order Tracking requires login check
                    const isTrackingLink = link.id === "tracking";

                    if (isTrackingLink) {
                      return (
                        <li key={link.id}>
                          <button
                            type="button"
                            onClick={handleOrderTracking}
                            className="font-[family-name:var(--font-heading)] text-[15px] leading-snug text-neutral-200 transition-colors hover:text-white cursor-pointer w-full text-left"
                          >
                            {link.label.split("\n").map((line) => (
                              <span key={line} className="block">
                                {line}
                              </span>
                            ))}
                          </button>
                        </li>
                      );
                    }

                    // Real routes go through next/link so they navigate on the
                    // client; the ones still parked on "#" stay plain anchors.
                    const Tag = link.href.startsWith("/") ? Link : "a";
                    return (
                      <li key={link.id}>
                        <Tag
                          href={link.href}
                          className="font-[family-name:var(--font-heading)] text-[15px] leading-snug text-neutral-200 transition-colors hover:text-white"
                        >
                          {link.label.split("\n").map((line) => (
                            <span key={line} className="block">
                              {line}
                            </span>
                          ))}
                        </Tag>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Information */}
              <div>
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-white">
                  Information
                </h3>
                <p className="mt-5 font-[family-name:var(--font-heading)] text-[15px] text-neutral-200">
                  {COMPANY_INFO.addressLabel}
                </p>
                <address className="mt-4 font-[family-name:var(--font-heading)] text-[15px] leading-relaxed text-neutral-200 not-italic">
                  {COMPANY_INFO.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                  <span className="block">{COMPANY_INFO.mobileLabel}</span>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="block transition-colors hover:text-white"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </address>

                <span className="mt-4 block h-px w-40 bg-white/25" />

                <div className="mt-4 flex items-center gap-6 text-white">
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="transition-opacity hover:opacity-70"
                  >
                    <Icon path={GLYPHS.whatsapp} filled className="h-6 w-6" />
                  </a>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    aria-label="Email"
                    className="transition-opacity hover:opacity-70"
                  >
                    <Icon path={GLYPHS.mail} className="h-6 w-6" />
                  </a>
                  <a href="#" aria-label="Chat" className="transition-opacity hover:opacity-70">
                    <Icon path={GLYPHS.chat} className="h-6 w-6" />
                  </a>
                </div>
              </div>

              {/* Contact + map */}
              <div className="sm:text-center">
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-white">
                  Contact Us
                </h3>
                <a
                  href={`tel:${COMPANY_INFO.phone.replace(/\s/g, "")}`}
                  className="mt-2 block font-[family-name:var(--font-heading)] text-[15px] text-neutral-200 transition-colors hover:text-white"
                >
                  {COMPANY_INFO.phone}
                </a>

                {/* Embedded Google map. The iframe is absolutely positioned so
                    it fills the ratio box — its own width/height attributes are
                    600x450 and would otherwise blow out the footer column. */}
                <div className="relative mt-4 aspect-[5/3] w-full max-w-[260px] overflow-hidden rounded-sm bg-neutral-300 sm:mx-auto">
                  <iframe
                    src={COMPANY_INFO.mapEmbedUrl}
                    title="Sabaa Jewel Arts on Google Maps"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="absolute inset-0 h-full w-full border-0"
                  />
                </div>
                <a
                  href={COMPANY_INFO.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block max-w-[260px] font-[family-name:var(--font-heading)] text-[15px] text-neutral-200 transition-colors hover:text-white sm:mx-auto"
                >
                  Google Map
                </a>
              </div>
            </div>

            {/* Social */}
            <div className="mt-8 flex items-center gap-5 border-t border-white/15 pt-6">
              <span className="font-[family-name:var(--font-heading)] text-lg font-semibold text-white">
                Social
              </span>
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.key}
                    href={social.href}
                    // The placeholders stay in-page; the live WhatsApp link opens
                    // in a new tab like every other outbound link on the site.
                    {...(social.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    aria-label={social.label}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#3D0F0F] transition-opacity hover:opacity-80"
                  >
                    <Icon path={GLYPHS[social.key]} className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Payments */}
            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/15 pt-6">
              <span className="rounded-sm bg-white px-1.5 py-1 text-[9px] font-bold tracking-tight text-[#1A1F71] italic">
                VISA
              </span>
              <span className="flex items-center rounded-sm bg-white px-1.5 py-1">
                <span className="h-3 w-3 rounded-full bg-[#EB001B]" />
                <span className="-ml-1 h-3 w-3 rounded-full bg-[#F79E1B]" />
              </span>
              <span className="flex items-center rounded-sm bg-white/10 px-1.5 py-1">
                <span className="h-3 w-3 rounded-full bg-white" />
                <span className="-ml-1 h-3 w-3 rounded-full bg-white/40" />
              </span>
              <span className="rounded-sm bg-white px-1.5 py-1 text-[9px] font-bold text-[#003087] italic">
                PayPal
              </span>
              <span className="font-[family-name:var(--font-heading)] text-sm text-white italic">
                UPI
              </span>
            </div>

            {/* Legal */}
            <div className="mt-6 flex flex-col gap-3 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[13px] text-neutral-300">
                © 2026 <span className="font-semibold text-white">Nakshath International.</span>{" "}
                All Rights Reserved.
              </p>
              <ul className="flex flex-wrap items-center gap-5">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className="text-[13px] text-neutral-300 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>

      <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}
