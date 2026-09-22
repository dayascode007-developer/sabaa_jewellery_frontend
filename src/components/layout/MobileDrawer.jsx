"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { NAV_ITEMS } from "@/constants/homeData";
import { logout } from "@/store/slices/authSlice";
import { fetchCategories, selectNavItems, selectCategoriesLoading } from "@/store/slices/categoriesSlice";
import { MobileDrawerShimmer } from "@/components/shimmer-loader/Shimmer-loader";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSolidUserCircle } from "react-icons/bi";
import { IoMdLogIn } from "react-icons/io";
import LogoutConfirmModal from "@/components/account/LogoutConfirmModal";
import Image from "next/image";
// Decorative artwork for the drawer, from assets/side_bar.
import drawerTopArt from "@/assets/side_bar/image2.webp"; // gold chain with the heart
import drawerBottomArt from "@/assets/side_bar/side bar image.webp"; // ring, flowers, wave

// Nav icons for drawer
import navAllJewellery from "@/assets/svg_nav_icon/All Jewellery.svg";
import navRings from "@/assets/svg_nav_icon/Rings.svg";
import navImpon from "@/assets/svg_nav_icon/Impon Chains.svg";
import navPendant from "@/assets/svg_nav_icon/pandant.svg";
import navEarrings from "@/assets/svg_nav_icon/Ear Ring.svg";
import navAnklet from "@/assets/svg_nav_icon/anklet_Icon.svg";
import navMore from "@/assets/svg_nav_icon/More.svg";

const MAROON = "#7B1E2B";
const GOLD = "#C9A227";

// Drawer palette, taken from the reference. (The cream ground, #F8F2E9, is set
// on the panel's className.)
const BADGE = "#F1E5D2"; // the round disc behind each icon
const ICON_GOLD = "#A9792B";
const INK = "#3B2A1E"; // row labels
const RULE = "#E9DAC3"; // the thin divider between rows

// Map icon IDs to imported SVG files
const DRAWER_ICONS_MAP = {
  all: navAllJewellery,
  rings: navRings,
  impon: navImpon,
  pendant: navPendant,
  earrings: navEarrings,
  anklet: navAnklet,
  more: navMore,
};

// Fallback line-art glyphs for categories not in the set above
const DRAWER_ICONS = {
  // Solitaire — the diamond sits proud of the band.
  all: (
    <>
      <circle cx="12" cy="15" r="5.6" />
      <path d="M9.6 6.2 12 3.6l2.4 2.6-2.4 3-2.4-3Z" />
      <path d="M9.6 6.2h4.8" />
    </>
  ),
  // Ring with a crown setting.
  rings: (
    <>
      <circle cx="12" cy="15.2" r="5.4" />
      <path d="M8.8 8.2 9.8 5l2.2 1.8L14.2 5l1 3.2" />
      <path d="M8.8 8.2h6.4" />
    </>
  ),
  // Necklace dipping to a small pendant, beads along the chain.
  impon: (
    <>
      <path d="M5 4c.6 4.6 3.2 8 7 8s6.4-3.4 7-8" />
      <circle cx="6.6" cy="7.4" r="0.9" />
      <circle cx="17.4" cy="7.4" r="0.9" />
      <circle cx="12" cy="15.4" r="2.6" />
      <path d="M12 12v.8" />
    </>
  ),
  // A V of chain ending in a teardrop.
  pendant: (
    <>
      <path d="M6 3.5 12 12l6-8.5" />
      <path d="M12 12c-2 2.6-2.6 4-2.6 5.2a2.6 2.6 0 0 0 5.2 0c0-1.2-.6-2.6-2.6-5.2Z" />
    </>
  ),
  // A ring of beads.
  bracelet: (
    <>
      <circle cx="12" cy="4.8" r="1.5" />
      <circle cx="17.1" cy="6.9" r="1.5" />
      <circle cx="19.2" cy="12" r="1.5" />
      <circle cx="17.1" cy="17.1" r="1.5" />
      <circle cx="12" cy="19.2" r="1.5" />
      <circle cx="6.9" cy="17.1" r="1.5" />
      <circle cx="4.8" cy="12" r="1.5" />
      <circle cx="6.9" cy="6.9" r="1.5" />
    </>
  ),
  // A pair of drops on hooks.
  earrings: (
    <>
      <path d="M8 3.5a1.4 1.4 0 0 1 1.4 1.4v1.8" />
      <path d="M9.4 6.7c-2 2.8-3 4.8-3 6.6a3 3 0 0 0 6 0c0-1.8-1-3.8-3-6.6Z" />
      <path d="M15.6 3.5a1.4 1.4 0 0 1 1.4 1.4v1.8" />
      <path d="M17 6.7c-2 2.8-3 4.8-3 6.6a3 3 0 0 0 6 0c0-1.8-1-3.8-3-6.6Z" />
    </>
  ),
  anklet: (
    <>
      <circle cx="12" cy="13" r="7" />
      <circle cx="9" cy="13" r="1" />
      <circle cx="15" cy="13" r="1" />
    </>
  ),
  more: (
    <>
      <circle cx="6" cy="12" r="1.3" fill="currentColor" />
      <circle cx="12" cy="12" r="1.3" fill="currentColor" />
      <circle cx="18" cy="12" r="1.3" fill="currentColor" />
    </>
  ),
};

// Anything not in the set above (a category added in the admin panel later)
// still gets a mark rather than an empty disc.
const DRAWER_ICON_FALLBACK = <path d="M12 4 18 10 12 20 6 10Z" />;

function DrawerBadge({ id }) {
  const svgIcon = DRAWER_ICONS_MAP[id];

  if (svgIcon) {
    return (
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: BADGE }}
      >
        <Image
          src={svgIcon}
          alt=""
          width={24}
          height={24}
          className="h-6 w-6"
          style={{ color: ICON_GOLD }}
        />
      </span>
    );
  }

  // Fallback to inline SVG for unknown icons
  return (
    <span
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
      style={{ backgroundColor: BADGE, color: ICON_GOLD }}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {DRAWER_ICONS[id] ?? DRAWER_ICON_FALLBACK}
      </svg>
    </span>
  );
}

function Chevron({ open }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function MobileDrawer({ open, onClose }) {
  const [expandedId, setExpandedId] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { customer, token } = useSelector((state) => state.auth);
  const navItemsFromRedux = useSelector(selectNavItems);
  const loading = useSelector(selectCategoriesLoading);
  const dispatch = useDispatch();
  const router = useRouter();

  // Fetch categories on mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Use Redux nav items if available, fallback to static
  const navItems = navItemsFromRedux.length > 0 ? navItemsFromRedux : NAV_ITEMS;

  // Fix hydration mismatch: only render auth UI after hydration.
  // The store starts empty on the server, then AuthInitializer fills it from
  // localStorage on the client — so a logged-in visitor would hydrate with a
  // Logout button the server never sent. Same guard Header.jsx uses.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const isLoggedIn = mounted && !!token && !!customer;

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    dispatch(logout(token));
    onClose();
    router.push("/");
  };

  // Escape closes, and the page behind must not scroll while the drawer is up.
  // The `open` guard lives inside the effect because hooks run unconditionally —
  // without it this would lock body scroll on every page load.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel — always mounted so it can animate rather than pop.
          It unfolds like a sheet of paper hinged on the left edge: closed, it
          stands edge-on at -90° and cannot be seen; open, it lies flat. The
          perspective lives on this wrapper because a 3D transform only gets
          depth from its parent. */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-[82%] max-w-[320px] lg:hidden ${
          open ? "" : "pointer-events-none"
        }`}
        style={{ perspective: "1100px", perspectiveOrigin: "left center" }}
      >
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        // visibility is switched off only AFTER the fold closes (the delay on
        // the visibility transition), so the animation plays out in full and a
        // closed menu's links cannot be reached with Tab.
        // Cream instead of white, as in the reference. Rounded on the right
        // only — the left edge meets the side of the screen. overflow-hidden
        // clips the artwork to those rounded corners too.
        className={`relative flex h-full w-full flex-col overflow-hidden rounded-r-3xl bg-[#F8F2E9] shadow-2xl [backface-visibility:hidden] motion-reduce:transition-none ${
          open
            ? "visible [transition:transform_480ms_cubic-bezier(0.22,0.9,0.3,1),visibility_0s]"
            : "invisible [transition:transform_380ms_cubic-bezier(0.55,0,0.8,0.4),visibility_0s_380ms]"
        }`}
        style={{
          transformOrigin: "left center",
          transform: open ? "rotateY(0deg)" : "rotateY(-90deg)",
        }}
      >
        {/* Shading across the sheet while it turns — darkest on the far edge,
            fading out as it flattens — which is what makes it read as paper
            catching the light rather than a flat card swinging round. */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-black/5 via-black/20 to-black/45 motion-reduce:transition-none ${
            open
              ? "opacity-0 [transition:opacity_480ms_ease-out]"
              : "opacity-100 [transition:opacity_380ms_ease-in]"
          }`}
        />

        {/* Top-right: the gold chain with its heart, tucked into the corner
            behind the close button. The file is a wide landscape, so it is
            cropped to its right-hand side, where the heart hangs, and faded
            out along its left and bottom edges so it melts into the cream
            rather than ending in a hard line. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0 z-0 h-[150px] w-[62%]"
          style={{
            WebkitMaskImage:
              "radial-gradient(120% 110% at 100% 0%, #000 55%, transparent 100%)",
            maskImage:
              "radial-gradient(120% 110% at 100% 0%, #000 55%, transparent 100%)",
          }}
        >
          <Image
            src={drawerTopArt}
            alt=""
            fill
            sizes="200px"
            className="object-cover"
            style={{ objectPosition: "82% 70%" }}
          />
        </div>

        {/* Bottom: the ring on its stone, the flowers and the green wave with
            gold leaves. Faded out at the top so the list above sits on plain
            cream and the art rises out of it. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 aspect-[1515/1038]"
          style={{
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, #000 28%)",
            maskImage: "linear-gradient(to bottom, transparent 0%, #000 28%)",
          }}
        >
          <Image
            src={drawerBottomArt}
            alt=""
            fill
            sizes="360px"
            className="object-cover object-bottom"
          />
        </div>

        {/* Everything interactive sits above the two pieces of art. */}
        <div className="relative z-[1] flex items-center justify-between px-6 pt-6 pb-4">
          {/* Show SABAA if not logged in, Avatar icon + Name + Login icon if logged in */}
          {isLoggedIn && customer ? (
            <button
              type="button"
              onClick={() => router.push("/account")}
              className="flex items-center gap-2 min-w-0 cursor-pointer hover:opacity-70 transition-opacity"
            >
              <BiSolidUserCircle
                className="h-7 w-7 flex-shrink-0"
                style={{ color: MAROON }}
                title={customer.name || "User"}
              />
              <span className="font-[family-name:var(--font-category)] text-[18px] truncate max-w-[96px]" style={{ color: GOLD }}>
                {customer.name?.length > 5
                  ? `${customer.name.substring(0, 5)}...`
                  : customer.name}
              </span>
              <IoMdLogIn
                className="h-7 w-7 flex-shrink-0"
                style={{ color: GOLD }}
              />
            </button>
          ) : (
            <span
              className="font-[family-name:var(--font-display)] text-xl"
              style={{ color: MAROON }}
            >
              Sabaa
            </span>
          )}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            // Darker than before so it still reads over the chain artwork.
            className="flex-shrink-0 p-1 text-[#3B2A1E] transition-opacity hover:opacity-70"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* Above the art. The bottom padding leaves the ring artwork clear
            once the list has been scrolled to its end. */}
        <nav className="relative z-[1] min-h-0 flex-1 overflow-y-auto px-5 pt-3 pb-40">
          {loading && navItemsFromRedux.length === 0 ? (
            <MobileDrawerShimmer />
          ) : (
            <ul>
              {navItems.map((item) => {
              const isExpanded = expandedId === item.id;
              // Flatten the mega-menu columns into one list for the drawer.
              // A column with a heading is a sub-main plus its children. A
              // column without one holds a sub-main that has no children
              // (Initial Rings, Raasi Rings…) — the same level, so it is styled
              // like a heading too, while keeping its own link.
              const links = item.menu
                ? [
                    // Sub-mains that have children come first, then the ones
                    // that stand alone — otherwise a childless sub-main lands
                    // between a heading and its own subcategories and reads as
                    // if it belonged to it.
                    ...item.menu.columns.filter((c) => c.heading),
                    ...item.menu.columns.filter((c) => !c.heading),
                  ].flatMap((c) =>
                    c.heading
                      ? [{ label: c.heading, href: "#", isHeading: true }, ...c.items]
                      : c.items.map((link) => ({ ...link, isHeading: true })),
                  )
                : null;

              return (
                // The divider starts under the label rather than under the
                // icon, as in the reference — so it is drawn as a line inset
                // by the badge's width instead of a full-width border.
                <li key={item.id} className="relative">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-0 bottom-0 left-[3.75rem] h-px"
                    style={{ backgroundColor: RULE }}
                  />
                  {links ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setExpandedId(isExpanded ? null : item.id)}
                        aria-expanded={isExpanded}
                        className="flex w-full items-center gap-4 py-3.5 text-left"
                      >
                        <DrawerBadge id={item.id} />
                        <span
                          className="flex-1 font-[family-name:var(--font-category)] text-[17px]"
                          style={{ color: INK }}
                        >
                          {item.label}
                        </span>
                        <span style={{ color: INK }}>
                          <Chevron open={isExpanded} />
                        </span>
                      </button>

                      {isExpanded ? (
                        // Indented to line up under the label, on a faint wash
                        // of the badge colour rather than grey.
                        <ul
                          className="mb-2 ml-[3.75rem] rounded-md py-1"
                          style={{ backgroundColor: "rgba(241,229,210,0.55)" }}
                        >
                          {links.map((link) => (
                            <li key={link.label}>
                              <Link
                                href={link.href}
                                onClick={onClose}
                                // Sub-mains sit a size up from their children,
                                // so the two levels read apart at a glance.
                                className={`block px-3 py-2 ${
                                  link.isHeading
                                    ? "text-[16px] font-semibold text-[#7B1E2B]"
                                    : "text-[14px] text-[#5A4636]"
                                }`}
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex w-full items-center gap-4 py-3.5"
                    >
                      <DrawerBadge id={item.id} />
                      <span
                        className="flex-1 font-[family-name:var(--font-category)] text-[17px]"
                        style={{ color: INK }}
                      >
                        {item.label}
                      </span>
                      {/* On every row, as in the reference. Here it only marks
                          the row — this item has no dropdown to open. */}
                      <span style={{ color: INK }}>
                        <Chevron open={false} />
                      </span>
                    </Link>
                  )}
                </li>
              );
            })}
            </ul>
          )}
        </nav>

        {/* Logout Section - Only show if logged in */}
        {isLoggedIn && (
          // Sits over the bottom artwork, so it gets a soft cream backing to
          // stay readable.
          <div
            className="relative z-[1] mx-5 mb-4 rounded-lg p-1 backdrop-blur-[2px]"
            style={{ backgroundColor: "rgba(248,242,233,0.85)" }}
          >
            <button
              type="button"
              onClick={handleLogoutClick}
              className="flex w-full items-center justify-start gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors rounded font-[family-name:var(--font-category)] text-[14px] font-medium"
            >
              <AiOutlineLogout className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </aside>
      </div>

      {/* Logout Confirmation Modal */}
      <LogoutConfirmModal
        isOpen={showLogoutModal}
        onConfirm={handleConfirmLogout}
        onCancel={() => setShowLogoutModal(false)}
      />
    </>
  );
}
