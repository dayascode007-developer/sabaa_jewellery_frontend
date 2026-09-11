"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MdClose } from "react-icons/md";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/store/slices/categoriesSlice";
import navAllJewellery from "@/assets/svg_nav_icon/All Jewellery.svg";
import navRings from "@/assets/svg_nav_icon/Rings.svg";
import navImpon from "@/assets/svg_nav_icon/Impon Chains.svg";
import navPendant from "@/assets/svg_nav_icon/pandant.svg";
import navEarrings from "@/assets/svg_nav_icon/Ear Ring.svg";

const MAROON = "#7B1E2B";

const ICON_MAP = {
  rings: navRings,
  "impon chain": navImpon,
  impon: navImpon,
  pendant: navPendant,
  earrings: navEarrings,
  all: navAllJewellery,
};

const GLYPHS = {
  bracelet: (
    <>
      <ellipse cx="12" cy="13" rx="7.5" ry="5.5" />
      <circle cx="12" cy="7.5" r="1.5" />
    </>
  ),
  anklet: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="6.5" fill="none" />
      <circle cx="8" cy="12" r="1.2" />
      <circle cx="16" cy="12" r="1.2" />
    </>
  ),
};

function Glyph({ id }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-16 w-16"
      style={{ color: MAROON }}
      aria-hidden="true"
    >
      {GLYPHS[id.toLowerCase()]}
    </svg>
  );
}

function NavIcon({ categoryName }) {
  const icon = ICON_MAP[categoryName.toLowerCase()];

  if (!icon) {
    return <Glyph id={categoryName} />;
  }

  const isSvg = typeof icon?.src === "string" && icon.src.endsWith(".svg");

  return (
    <Image
      src={icon}
      alt=""
      width={64}
      height={64}
      unoptimized={isSvg}
      className="h-16 w-16 shrink-0 object-contain"
    />
  );
}

export default function CategoriesSheet({ isOpen, onClose }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { raw, loading } = useSelector((state) => state.categories);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!raw || raw.length === 0) {
      dispatch(fetchCategories());
    }
  }, [raw, dispatch]);

  if (!mounted) return null;

  const handleCategoryClick = (href) => {
    onClose();
    router.push(href);
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          style={{
            animation: "fadeIn 300ms ease-out",
          }}
        />
      )}

      {/* Bottom Sheet */}
      <div
        className="fixed inset-x-0 bottom-0 z-50 flex flex-col bg-white lg:hidden rounded-t-3xl"
        style={{
          maxHeight: "70vh",
          transform: isOpen ? "translateY(0)" : "translateY(100%)",
          transition: "transform 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Handle/Drag indicator */}
        <div className="flex justify-center pt-2 pb-2">
          <div
            className="h-1 w-12 rounded-full bg-gray-300"
            aria-hidden="true"
          />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <h2 className="text-lg font-bold" style={{ color: MAROON }}>Categories</h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center p-1 text-gray-600 hover:text-gray-900"
            aria-label="Close categories"
          >
            <MdClose size={24} />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          {loading ? (
            <div className="grid grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <div className="h-16 w-16 rounded-full bg-gray-200 animate-pulse" />
                  <div className="h-4 w-16 rounded bg-gray-200 animate-pulse" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {raw &&
                raw.map((category) => (
                  <button
                    key={category.id}
                    onClick={() =>
                      handleCategoryClick(
                        `/category/all-${category.name
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`
                      )
                    }
                    className="flex flex-col items-center gap-3 rounded-lg border-2 px-4 py-6 transition-all shadow-md hover:shadow-lg active:shadow-lg"
                    style={{
                      backgroundColor: "#FFF9E6",
                      borderColor: "#FFFFFF",
                    }}
                  >
                    <div className="flex h-16 w-16 items-center justify-center">
                      <NavIcon categoryName={category.name} />
                    </div>
                    <span
                      className="text-center text-[13px] font-medium"
                      style={{ color: MAROON }}
                    >
                      {category.name}
                    </span>
                  </button>
                ))}
            </div>
          )}
        </div>

        {/* Safe area for mobile with notch */}
        <div
          style={{
            height: "env(safe-area-inset-bottom)",
          }}
        />
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
