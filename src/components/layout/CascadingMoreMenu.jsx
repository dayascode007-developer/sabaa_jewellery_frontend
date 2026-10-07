"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";

const toSlug = (name) =>
  name.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "").replace(/--+/g, "-");

// The static entries are pages rather than jewellery, so they get their own
// glyphs instead of the category marks. Same gold circle as the category
// dropdowns, so the two lists read as one menu.
const STATIC_MARKS = {
  // An open book — the brand story.
  about: (
    <>
      <path d="M12 7c-1.8-1.3-4-2-6.5-2v12c2.5 0 4.7.7 6.5 2 1.8-1.3 4-2 6.5-2V5c-2.5 0-4.7.7-6.5 2Z" />
      <path d="M12 7v12" />
    </>
  ),
  // A written page.
  blogs: (
    <>
      <path d="M6 3.5h8.5L19 8v12.5H6Z" />
      <path d="M14 3.5V8h5" />
      <path d="M9 12.5h7M9 16h5" />
    </>
  ),
  // A sparkle — polish and shine.
  care: (
    <>
      <path d="M12 3.5 13.7 9l5.5 1.7-5.5 1.7L12 18l-1.7-5.6L4.8 10.7 10.3 9Z" />
      <path d="M18.5 15.5l.6 1.9 1.9.6-1.9.6-.6 1.9-.6-1.9-1.9-.6 1.9-.6Z" />
    </>
  ),
};

function StaticMark({ mark }) {
  // No mark supplied: render the circle anyway so labels stay aligned.
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-neutral-200">
      <svg
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ color: "#C9A227" }}
        aria-hidden="true"
      >
        {STATIC_MARKS[mark] ?? null}
      </svg>
    </span>
  );
}

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
              <div className="w-56 flex-shrink-0 border-r border-neutral-200 py-3 pr-4">
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
                    className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 justify-start transition-colors ${
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
                    <span className="flex-1">{cat.name}</span>
                    {cat.sub_main_categories && cat.sub_main_categories.length > 0 && (
                      <span className="text-xs ml-auto">›</span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Level 2: Sub Main Categories */}
            {level2Data.length > 0 && (
              <div className="w-56 flex-shrink-0 border-r border-neutral-200 py-3 px-4">
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
              <div className="w-56 flex-shrink-0 py-3 px-4">
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
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                    >
                      <StaticMark mark={item.mark} />
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
