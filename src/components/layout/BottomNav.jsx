"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCartCount } from "@/store/slices/cartSlice";
import AuthModal from "@/components/common/AuthModal";
import CategoriesSheet from "@/components/layout/CategoriesSheet";

const MAROON = "#7B1E2B";

const ITEMS = [
  {
    id: "home",
    label: "Home",
    href: "/",
    icon: (
      <>
        <path d="M4 11 12 4l8 7" />
        <path d="M6.5 9.8V20h11V9.8" />
      </>
    ),
  },
  {
    id: "categories",
    label: "Categories",
    href: "/all-jewellery",
    icon: (
      <>
        <rect x="4" y="4" width="7" height="7" rx="1.2" />
        <rect x="13" y="4" width="7" height="7" rx="1.2" />
        <rect x="4" y="13" width="7" height="7" rx="1.2" />
        <rect x="13" y="13" width="7" height="7" rx="1.2" />
      </>
    ),
  },
  {
    id: "cart",
    label: "Cart",
    href: "/cart",
    badge: 0,
    icon: (
      <>
        <path d="M3 4h2.2l2.3 11.2a1.6 1.6 0 0 0 1.6 1.3h8.3a1.6 1.6 0 0 0 1.6-1.3L21 7.5H6" />
        <circle cx="9.5" cy="20" r="1.2" />
        <circle cx="17.5" cy="20" r="1.2" />
      </>
    ),
  },
  {
    id: "account",
    label: "Account",
    href: "#",
    icon: (
      <>
        <circle cx="12" cy="8" r="3.8" />
        <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
      </>
    ),
  },
];

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeId, setActiveId] = useState("home");
  const [authOpen, setAuthOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const cartCount = useSelector(selectCartCount);
  const customer = useSelector((state) => state.auth.customer);

  // The cart starts empty on the server and is filled from localStorage once
  // the client is running, so the badge rendered "0" in the HTML and "1" on
  // hydration — which is the mismatch React reported. Holding the badge at its
  // server value until after mount makes both renders agree; it updates on the
  // next paint. Same guard Header.jsx uses for the logged-in state.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Sync activeId with current pathname
  useEffect(() => {
    if (pathname === "/" || pathname === "/") {
      setActiveId("home");
    } else if (pathname === "/all-jewellery") {
      setActiveId("categories");
    } else if (pathname === "/cart") {
      setActiveId("cart");
    } else if (pathname === "/account") {
      setActiveId("account");
    }
  }, [pathname]);

  return (
    // Fixed to the viewport bottom on phones and tablets; the desktop nav takes
    // over from lg up. pb-[env(safe-area-inset-bottom)] clears the iOS home bar.
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-2px_10px_rgba(0,0,0,0.06)] lg:hidden"
    >
      <ul className="mx-auto flex max-w-[600px] items-stretch">
        {ITEMS.map((item) => {
          const isActive = activeId === item.id;
          const isAccount = item.id === "account";
          const isCategories = item.id === "categories";
          const Tag = isAccount || isCategories ? "button" : Link;

          const handleAccountClick = () => {
            if (customer) {
              router.push("/account");
              setActiveId("account");
            } else {
              setAuthOpen(true);
            }
          };

          const handleCategoriesClick = () => {
            setCategoriesOpen(true);
          };

          const tagProps = isAccount
            ? { type: "button", "aria-haspopup": "dialog", onClick: handleAccountClick }
            : isCategories
            ? { type: "button", onClick: handleCategoriesClick }
            : { href: item.href, onClick: () => setActiveId(item.id) };

          return (
            <li key={item.id} className="flex-1 p-1.5">
              <Tag
                {...tagProps}
                aria-current={isActive ? "page" : undefined}
                // Active item is a filled maroon pill with white content,
                // rather than only recolouring the icon and label.
                className="flex w-full flex-col items-center gap-1 rounded-lg py-2 transition-colors"
                style={{
                  backgroundColor: isActive ? MAROON : "transparent",
                  color: isActive ? "#FFFFFF" : "#6B6B6B",
                }}
              >
                <span className="relative">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={isActive ? 1.8 : 1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-[22px] w-[22px]"
                    aria-hidden="true"
                  >
                    {item.icon}
                  </svg>
                  {item.badge !== undefined ? (
                    <span
                      // Inverts on the active pill — a maroon badge on a maroon
                      // background would be invisible.
                      className="absolute -top-1.5 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-medium"
                      style={{
                        backgroundColor: isActive ? "#FFFFFF" : MAROON,
                        color: isActive ? MAROON : "#FFFFFF",
                      }}
                    >
                      {item.id === "cart" ? (mounted ? cartCount : 0) : item.badge}
                    </span>
                  ) : null}
                </span>
                <span className="text-[10px] leading-none font-medium">{item.label}</span>
              </Tag>
            </li>
          );
        })}
      </ul>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      <CategoriesSheet isOpen={categoriesOpen} onClose={() => setCategoriesOpen(false)} />
    </nav>
  );
}
