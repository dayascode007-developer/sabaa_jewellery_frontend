"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";

const toSlug = (name) =>
  name.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "").replace(/--+/g, "-");

export default function CascadingMoreMenu({ moreCategories = [], staticItems = [], isOpen = false, onClose = () => {}, featureImage = null, featureCaption = null }) {
  const [level1Selected, setLevel1Selected] = useState(null);
  const [level2Selected, setLevel2Selected] = useState(null);
  const containerRef = useRef(null);

  const handleLinkClick = () => {
    onClose();
  };

  const level2Data = level1Selected
    ? moreCategories.find((cat) => cat.id === level1Selected)?.sub_main_categories || []
    : [];

  const level3Data = level2Selected
    ? level2Data.find((sub) => sub.id === level2Selected)?.subcategories || []
    : [];

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      onMouseLeave={() => {
        setLevel1Selected(null);
        setLevel2Selected(null);
      }}
      className="bg-white shadow-[0_14px_28px_rgba(0,0,0,0.10)] border-t border-neutral-200"
    >
      {/* Cascading Menu Panel */}
        <div className="mx-auto max-w-[1400px] flex">
          <div className="flex-1 px-4 py-3 sm:px-6">
            <div className="flex">
            {/* Level 1: Main Categories */}
            {moreCategories.length > 0 && (
              <div className="w-56 border-r border-neutral-200 py-3 pr-4">
                {moreCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onMouseEnter={() => {
                      setLevel1Selected(cat.id);
                      setLevel2Selected(null);
                    }}
                    onClick={() => {
                      if (!cat.sub_main_categories || cat.sub_main_categories.length === 0) {
                        window.location.href = `/category/${toSlug(cat.name)}`;
                      }
                    }}
                    className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 justify-between transition-colors ${
                      level1Selected === cat.id
                        ? "bg-neutral-50 text-[#7B1E2B] font-medium"
                        : "text-neutral-700 hover:bg-neutral-50"
                    }`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 flex-shrink-0"
                      style={{ color: "#7B1E2B" }}
                    >
                      <path d="M12 4 18 10 12 20 6 10Z" />
                    </svg>
                    <span>{cat.name}</span>
                    {cat.sub_main_categories && cat.sub_main_categories.length > 0 && (
                      <span className="text-xs">›</span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Level 2: Sub Main Categories */}
            {level2Data.length > 0 && (
              <div className="w-56 border-r border-neutral-200 py-3 px-4">
                {level2Data.map((subMain) => (
                  <button
                    key={subMain.id}
                    onMouseEnter={() => setLevel2Selected(subMain.id)}
                    onClick={() => {
                      if (!subMain.subcategories || subMain.subcategories.length === 0) {
                        window.location.href = `/category/${toSlug(subMain.name)}`;
                      }
                    }}
                    className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 justify-between transition-colors ${
                      level2Selected === subMain.id
                        ? "bg-neutral-50 text-[#7B1E2B] font-medium"
                        : "text-neutral-700 hover:bg-neutral-50"
                    }`}
                  >
                    <span>{subMain.name}</span>
                    {subMain.subcategories && subMain.subcategories.length > 0 && (
                      <span className="text-xs">›</span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Level 3: Subcategories */}
            {level3Data.length > 0 && (
              <div className="w-56 py-3 px-4">
                {level3Data.map((sub) => (
                  <Link
                    key={sub.id}
                    href={`/category/${toSlug(sub.name)}`}
                    onClick={handleLinkClick}
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Static items (always shown) */}
            <div className={`min-w-max py-3 px-4 ${moreCategories.length > 0 ? "border-l border-neutral-200" : ""}`}>
              {staticItems.length > 0 && (
                <div>
                  {staticItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={handleLinkClick}
                      className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            </div>
          </div>

          {/* Right: Feature Panel */}
          {featureImage && (
            <div className="hidden border-l border-neutral-200 px-4 py-3 lg:block" style={{ width: '300px' }}>
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded bg-neutral-100">
                <Image
                  src={featureImage}
                  alt="Featured category"
                  fill
                  sizes="300px"
                  className="object-cover"
                />
              </div>
              {featureCaption && (
                <p className="mt-2 text-[12px] leading-snug text-neutral-700">
                  {featureCaption}
                </p>
              )}
            </div>
          )}
        </div>
    </div>
  );
}
