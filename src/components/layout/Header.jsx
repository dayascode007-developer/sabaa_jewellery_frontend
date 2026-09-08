"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCartCount } from "@/store/slices/cartSlice";
import { selectWishlistCount } from "@/store/slices/wishlistSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { IoMdLogIn } from "react-icons/io";
import { BiUserCircle } from "react-icons/bi";
import { BiSolidUserCircle } from "react-icons/bi";

import AuthModal from "@/components/common/AuthModal";
import MobileDrawer from "@/components/layout/MobileDrawer";
import sabaaLogo from "@/assets/logo/New High Quality Sabaa Logo.webp";

const MAROON = "#7B1E2B";
const GOLD = "#C9A227";

function Icon({ path, className = "h-6 w-6" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {path}
    </svg>
  );
}

const ICONS = {
  search: <path d="M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm10 18-4.35-4.35" />,
  camera: (
    <>
      <path d="M3 8.5A1.5 1.5 0 0 1 4.5 7h2.2l1.1-2h8.4l1.1 2h2.2A1.5 1.5 0 0 1 21 8.5v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5v-9Z" />
      <circle cx="12" cy="13" r="3.2" />
    </>
  ),
  // Camera with a plus, as in the reference — the body is pulled in on the
  // right so the plus sits beside it rather than on top of it.
  cameraPlus: (
    <>
      <path d="M2.5 9A1.5 1.5 0 0 1 4 7.5h1.9l1-1.8h6.2l1 1.8H16A1.5 1.5 0 0 1 17.5 9v7A1.5 1.5 0 0 1 16 17.5H4A1.5 1.5 0 0 1 2.5 16V9Z" />
      <circle cx="10" cy="12" r="2.9" />
      <path d="M19.4 5v4.2M17.3 7.1h4.2" />
    </>
  ),
  mic: (
    <>
      <rect x="9.5" y="3" width="5" height="10" rx="2.5" />
      <path d="M6 11.5a6 6 0 0 0 12 0M12 17.5V21" />
    </>
  ),
  heart: (
    <path d="M12 20s-7.5-4.6-7.5-9.6A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20Z" />
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.8" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </>
  ),
  cart: (
    <>
      <path d="M3 4h2.2l2.3 11.2a1.6 1.6 0 0 0 1.6 1.3h8.3a1.6 1.6 0 0 0 1.6-1.3L21 7.5H6" />
      <circle cx="9.5" cy="20" r="1.2" />
      <circle cx="17.5" cy="20" r="1.2" />
    </>
  ),
};

// The artwork already contains the ornament, wordmark, "JEWEL ARTS" and
// "since 1984", so nothing is drawn in HTML — that would duplicate the lockup.
function Logo() {
  return (
    <Link
      href="/"
      className="flex shrink-0 items-center"
      aria-label="Sabaa Jewel Arts — home"
    >
      <Image
        src={sabaaLogo}
        alt="Sabaa Jewel Arts"
        priority
        // The lockup carries "JEWEL ARTS" and "since 1984" as fine print, so it
        // needs real height to stay legible.
        className="h-16 w-auto sm:h-20"
      />
    </Link>
  );
}

export default function Header() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const actions = [
    { key: "heart", icon: ICONS.heart, label: "Wishlist" },
    { key: "user", icon: ICONS.user, label: "Account" },
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const cartCount = useSelector(selectCartCount);
  const wishlistCount = useSelector(selectWishlistCount);
  const { customer, token } = useSelector((state) => state.auth);

  const isLoggedIn = !!token && !!customer && customer.id !== "temp";

  // Fix hydration mismatch: only render auth UI after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Monitor auth state for display
  useEffect(() => {
    console.log("👤 Header Display:", {
      isLoggedIn,
      token: !!token,
      customer: customer?.name || "N/A",
    });
  }, [isLoggedIn, token, customer]);

  return (
    <header className="w-full bg-white">
      {/* Below md the search drops to its own row — three items in one row at
          phone widths squeezes the input to almost nothing.

          lg:pb-2 — the category row only appears from lg up, and the header's
          full bottom padding stacked with the nav's own, leaving a wide gap
          between the search bar and the links. Trimmed only at that breakpoint,
          so spacing below lg (where the search has its own row) is unchanged. */}
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-3 gap-y-3 px-4 py-4 sm:gap-x-4 sm:px-6 sm:py-5 md:flex-nowrap md:gap-8 lg:pb-2">
        {/* Hamburger — opens the left drawer. Phones and tablets only; the
            category bar handles navigation from lg up. */}
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          className="shrink-0 p-1 lg:hidden"
          style={{ color: MAROON }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="h-6 w-6"
            aria-hidden="true"
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>

        <Logo />

        {/* Search — full width on its own row until md, then inline */}
        <div className="order-last w-full min-w-0 md:order-none md:mx-auto md:max-w-2xl">
          {/* Flat hairline pill, no drop shadow — in the reference the bar sits
              on the page rather than floating above it. */}
          <div className="flex items-center gap-2.5 rounded-full border border-neutral-200 bg-white px-4 py-2 focus-within:border-[#7B1E2B]/40">
            <span className="shrink-0" style={{ color: MAROON }}>
              <Icon path={ICONS.search} className="h-[18px] w-[18px]" />
            </span>
            <input
              type="text"
              placeholder="Search for gold necklace"
              aria-label="Search"
              className="min-w-0 flex-1 bg-transparent text-[13px] text-neutral-700 outline-none placeholder:text-neutral-400 sm:text-sm"
            />
            {/* Maroon rather than grey — in the reference these read as the
                shop's own controls, not as disabled placeholders. */}
            <span
              className="flex shrink-0 items-center gap-3 sm:gap-3.5"
              style={{ color: MAROON }}
            >
              <button
                type="button"
                aria-label="Search by image"
                className="transition-opacity hover:opacity-70"
              >
                <Icon path={ICONS.cameraPlus} className="h-[19px] w-[19px]" />
              </button>
              <button
                type="button"
                aria-label="Search by voice"
                className="transition-opacity hover:opacity-70"
              >
                <Icon path={ICONS.mic} className="h-[18px] w-[18px]" />
              </button>
            </span>
          </div>
        </div>

        {/* Actions */}
        <nav
          className="ml-auto flex shrink-0 items-center gap-3.5 sm:gap-5 md:ml-0"
          style={{ color: MAROON }}
        >
          {actions.map((a) =>
            // Account is a real destination now, so it is a link with a visible
            // "Login" label — icon and word are one target, not two.
            a.key === "user" ? (
              // Render nothing during hydration to prevent mismatch
              !mounted ? (
                <div key={a.key} className="hidden lg:block w-[100px]" />
              ) : isLoggedIn ? (
                // Show avatar with first letter when logged in
                <button
                  key={a.key}
                  type="button"
                  onClick={() => router.push("/account")}
                  aria-label={`Account for ${customer.name}`}
                  className="hidden items-center gap-1.5 transition-opacity hover:opacity-70 lg:flex font-[family-name:var(--font-category)] cursor-pointer"
                >
                  <BiSolidUserCircle
                    className="h-[22px] w-[22px] sm:h-6 sm:w-6 flex-shrink-0"
                    style={{ color: MAROON }}
                    title={customer.name}
                  />
                  <span
                    className="text-[14px] font-medium truncate max-w-[80px]"
                    style={{ color: GOLD }}
                  >
                    {customer.name?.length > 5
                      ? `${customer.name.substring(0, 5)}...`
                      : customer.name}
                  </span>
                  <IoMdLogIn
                    className="h-[22px] w-[22px] sm:h-6 sm:w-6 flex-shrink-0"
                    style={{ color: GOLD }}
                  />
                </button>
              ) : (
                // Opens the dialog rather than navigating — the visitor keeps the
                // page they were on behind it.
                <button
                  key={a.key}
                  type="button"
                  onClick={() => setAuthOpen(true)}
                  aria-label="Login to your account"
                  aria-haspopup="dialog"
                  className="hidden items-center gap-1.5 transition-opacity hover:opacity-70 lg:flex cursor-pointer font-[family-name:var(--font-category)]"
                  style={{ color: MAROON }}
                >
                  <Icon
                    path={a.icon}
                    className="h-[22px] w-[22px] sm:h-6 sm:w-6"
                  />
                  <span className="text-[14px] font-medium">Login</span>
                </button>
              )
            ) : (
              <button
                key={a.key}
                type="button"
                aria-label={a.label}
                onClick={() => {
                  if (isLoggedIn) {
                    router.push("/account?tab=wishlist");
                  } else {
                    setAuthOpen(true);
                  }
                }}
                // Wishlist is the only action kept on phones. Account lives in
                // the bottom bar below lg, so showing it here too would duplicate it.
                className="block transition-opacity hover:opacity-70 cursor-pointer"
              >
                <span className="relative block">
                  <Icon
                    path={a.icon}
                    className="h-[22px] w-[22px] sm:h-6 sm:w-6"
                  />
                  {a.key === "heart" && wishlistCount > 0 ? (
                    <span
                      className="absolute -right-1.5 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-medium text-white"
                      style={{ backgroundColor: MAROON }}
                    >
                      {wishlistCount}
                    </span>
                  ) : null}
                </span>
              </button>
            )
          )}
          {/* Visible at every width. It is also in the bottom bar on phones,
              but a cart in the header is the convention shoppers reach for. */}
          {/* A link, not a button — it was a <button> with no handler, so
              clicking the cart did nothing at all. */}
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative transition-opacity hover:opacity-70 cursor-pointer"
          >
            <Icon
              path={ICONS.cart}
              className="h-[22px] w-[22px] sm:h-6 sm:w-6"
            />
            <span
              className="absolute -right-1.5 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-medium text-white"
              style={{ backgroundColor: MAROON }}
            >
              {cartCount}
            </span>
          </Link>
        </nav>
      </div>

      <MobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </header>
  );
}
