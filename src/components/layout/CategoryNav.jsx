"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { NAV_ITEMS } from "@/constants/homeData";

const MAROON = "#7B1E2B";

// One glyph per nav item, keyed by the ids in NAV_ITEMS.
const GLYPHS = {
  all: (
    <>
      <circle cx="12" cy="9" r="4.5" />
      <path d="M5 20c1.5-3.5 4-5.2 7-5.2s5.5 1.7 7 5.2" />
    </>
  ),
  rings: (
    <>
      <circle cx="8" cy="14" r="5" />
      <circle cx="16" cy="14" r="5" />
    </>
  ),
  impon: <path d="M6 4v8a6 6 0 0 0 12 0V4" />,
  pendant: (
    <>
      <path d="M4 5c3.5 3 5.5 4.5 8 4.5S16.5 8 20 5" />
      <path d="M12 9.5 8.8 14 12 20l3.2-6L12 9.5Z" />
    </>
  ),
  bracelet: <ellipse cx="12" cy="12" rx="8" ry="5.5" />,
  earrings: (
    <>
      <path d="M8 4a2 2 0 1 0 0 4M16 4a2 2 0 1 1 0 4" />
      <path d="M8 8 5.5 14h5L8 8ZM16 8l-2.5 6h5L16 8Z" />
      <circle cx="8" cy="17" r="1.6" />
      <circle cx="16" cy="17" r="1.6" />
    </>
  ),
  more: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1" />
      <rect x="13" y="4" width="7" height="7" rx="1" />
      <rect x="4" y="13" width="7" height="7" rx="1" />
      <rect x="13" y="13" width="7" height="7" rx="1" />
    </>
  ),
};

const FALLBACK = <circle cx="12" cy="12" r="8" />;

function Glyph({ id, className = "h-6 w-6" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ color: MAROON }}
      aria-hidden="true"
    >
      {GLYPHS[id] ?? FALLBACK}
    </svg>
  );
}

// Uses the supplied artwork as the nav icon. Bracelet has no image yet, so it
// falls back to its drawn glyph; drop a file in and set `icon` to switch it.
function NavIcon({ item }) {
  if (item.icon) {
    // The optimiser refuses SVG unless dangerouslyAllowSVG is set, so vector
    // sources are served as-is instead.
    const isSvg = typeof item.icon?.src === "string" && item.icon.src.endsWith(".svg");
    return (
      <Image
        src={item.icon}
        alt=""
        width={35}
        height={35}
        unoptimized={isSvg}
        className="h-[35px] w-[35px] shrink-0 object-contain"
      />
    );
  }
  return <Glyph id={item.id} className="h-[35px] w-[35px]" />;
}

// Small ringed mark beside each menu link, echoing the reference layout.
function ItemMark() {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-neutral-200">
      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ color: "#C9A227" }} aria-hidden="true">
        <circle cx="12" cy="14" r="6" />
        <path d="M9.5 5.5 12 8l2.5-2.5" />
      </svg>
    </span>
  );
}

function MegaPanel({ menu, onNavigate }) {
  return (
    <div className="absolute inset-x-0 top-full z-40 border-t border-neutral-200 bg-white shadow-[0_14px_28px_rgba(0,0,0,0.10)]">
      <div className="mx-auto grid w-full max-w-[1400px] lg:grid-cols-[1fr_300px]">
        <div className="p-4 sm:p-6">
          {/* Link columns */}
          <div className="grid gap-x-6 sm:grid-cols-2 lg:grid-cols-3 lg:divide-x lg:divide-neutral-200">
            {menu.columns.map((column, i) => (
              <div key={column.heading ?? i} className={i > 0 ? "lg:pl-6" : ""}>
                {column.heading ? (
                  <p
                    className="mb-1 px-1 text-[12px] font-semibold tracking-wide uppercase"
                    style={{ color: MAROON }}
                  >
                    {column.heading}
                  </p>
                ) : null}
                <ul>
                  {column.items.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        onClick={onNavigate}
                        className="flex items-center gap-2.5 rounded px-1 py-2 text-[13px] text-neutral-700 transition-colors hover:text-[#7B1E2B]"
                      >
                        <ItemMark />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Promo strip */}
          {menu.promo ? (
            <div className="mt-4 flex items-center gap-3 rounded border border-[#F0E4D8] bg-[#FDF8F3] px-3 py-2.5">
              <span className="flex shrink-0 -space-x-2" aria-hidden="true">
                {["#EDE3D3", "#E3D5BE", "#D8C6A8"].map((c) => (
                  <span
                    key={c}
                    className="h-8 w-8 rounded-sm ring-2 ring-white"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[12px] font-semibold text-neutral-800">
                  {menu.promo.title}
                </span>
                <span className="block truncate text-[11px] text-neutral-500">
                  {menu.promo.subtitle}
                </span>
              </span>
              <Link
                href={menu.promo.href}
                onClick={onNavigate}
                className="shrink-0 rounded-full px-4 py-1.5 text-[11px] font-medium text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: MAROON }}
              >
                {menu.promo.cta}
              </Link>
            </div>
          ) : null}
        </div>

        {/* Feature panel */}
        {menu.feature ? (
          <div className="hidden border-l border-neutral-200 p-4 lg:block">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded bg-neutral-100">
              {menu.feature.image ? (
                <Image
                  src={menu.feature.image}
                  alt=""
                  fill
                  sizes="300px"
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-[#EDE3D3] via-[#E3D5BE] to-[#D8C6A8]" />
              )}
            </div>
            <p className="mt-2 text-[12px] leading-snug text-neutral-700">
              {menu.feature.caption}
            </p>
            <Link
              href={menu.feature.href}
              onClick={onNavigate}
              className="mt-1 inline-flex items-center gap-1 text-[12px] underline"
              style={{ color: MAROON }}
            >
              {menu.feature.cta}
              <span aria-hidden="true">&#8599;</span>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function CategoryNav() {
  const [openId, setOpenId] = useState(null);
  const navRef = useRef(null);

  const close = useCallback(() => setOpenId(null), []);

  // Escape closes; so does a click anywhere outside the nav.
  useEffect(() => {
    if (!openId) return;
    const onKey = (e) => e.key === "Escape" && close();
    const onClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [openId, close]);

  const openMenu = NAV_ITEMS.find((item) => item.id === openId)?.menu;

  return (
    <nav
      ref={navRef}
      // Hidden below lg — on phones and tablets these links live in the
      // hamburger drawer instead, so the two never compete.
      className="relative hidden w-full border-b border-neutral-200 bg-white lg:block"
      onMouseLeave={close}
    >
      <ul className="mx-auto flex max-w-[1400px] items-center gap-5 overflow-x-auto px-4 py-2 sm:gap-8 sm:px-6 lg:justify-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {NAV_ITEMS.map((item) => {
          const isOpen = openId === item.id;
          return (
            <li
              key={item.id}
              className="shrink-0"
              // Hover opens on pointer devices; the button handles taps.
              onMouseEnter={() => item.menu && setOpenId(item.id)}
            >
              {item.menu ? (
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  className={`flex items-center gap-2 py-1 font-[family-name:var(--font-category)] text-[16px] whitespace-nowrap transition-colors ${
                    isOpen ? "text-[#7B1E2B]" : "text-neutral-700 hover:text-[#7B1E2B]"
                  }`}
                >
                  <NavIcon item={item} />
                  {item.label}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
              ) : (
                <Link
                  href={item.href}
                  className="flex items-center gap-2 py-1 font-[family-name:var(--font-category)] text-[16px] whitespace-nowrap text-neutral-700 transition-colors hover:text-[#7B1E2B]"
                >
                  <NavIcon item={item} />
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>

      {openMenu ? <MegaPanel menu={openMenu} onNavigate={close} /> : null}
    </nav>
  );
}
