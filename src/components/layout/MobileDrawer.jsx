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

const MAROON = "#7B1E2B";
const GOLD = "#C9A227";

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

      {/* Panel — always mounted so it can slide rather than pop */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed inset-y-0 left-0 z-50 flex w-[82%] max-w-[320px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
          {/* Show SABAA if not logged in, Avatar icon + Name + Login icon if logged in */}
          {isLoggedIn && customer ? (
            <button
              type="button"
              onClick={() => router.push("/account")}
              className="flex items-center gap-2 min-w-0 cursor-pointer hover:opacity-70 transition-opacity"
            >
              <BiSolidUserCircle
                className="h-[22px] w-[22px] flex-shrink-0"
                style={{ color: MAROON }}
                title={customer.name || "User"}
              />
              <span className="font-[family-name:var(--font-category)] text-sm font-medium truncate max-w-[80px]" style={{ color: GOLD }}>
                {customer.name?.length > 5
                  ? `${customer.name.substring(0, 5)}...`
                  : customer.name}
              </span>
              <IoMdLogIn
                className="h-[22px] w-[22px] flex-shrink-0"
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
            className="p-1 text-neutral-500 transition-colors hover:text-neutral-800 flex-shrink-0"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <nav className="min-h-0 flex-1 overflow-y-auto py-2">
          {loading && navItemsFromRedux.length === 0 ? (
            <MobileDrawerShimmer />
          ) : (
            <ul>
              {navItems.map((item) => {
              const isExpanded = expandedId === item.id;
              // Flatten the mega-menu columns into one list for the drawer.
              const links = item.menu
                ? item.menu.columns.flatMap((c) =>
                    c.heading
                      ? [{ label: c.heading, href: "#", isHeading: true }, ...c.items]
                      : c.items,
                  )
                : null;

              return (
                <li key={item.id} className="border-b border-neutral-100">
                  {links ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setExpandedId(isExpanded ? null : item.id)}
                        aria-expanded={isExpanded}
                        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left font-[family-name:var(--font-category)] text-[14px] text-neutral-800"
                      >
                        {item.label}
                        <Chevron open={isExpanded} />
                      </button>

                      {isExpanded ? (
                        <ul className="bg-neutral-50 pb-2">
                          {links.map((link) => (
                            <li key={link.label}>
                              <Link
                                href={link.href}
                                onClick={onClose}
                                className={`block py-2 pr-4 pl-7 text-[13px] ${
                                  link.isHeading
                                    ? "font-semibold text-[#7B1E2B]"
                                    : "text-neutral-600"
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
                      className="block px-4 py-3 font-[family-name:var(--font-category)] text-[14px] text-neutral-800"
                    >
                      {item.label}
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
          <div className="border-t border-neutral-200 p-4">
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

      {/* Logout Confirmation Modal */}
      <LogoutConfirmModal
        isOpen={showLogoutModal}
        onConfirm={handleConfirmLogout}
        onCancel={() => setShowLogoutModal(false)}
      />
    </>
  );
}
