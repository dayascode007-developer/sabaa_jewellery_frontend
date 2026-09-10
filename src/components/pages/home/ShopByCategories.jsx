"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/constants/homeData";

const MAROON = "#7B1E2B";

function Arrow({ direction, onClick, disabled }) {
  const isLeft = direction === "left";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={isLeft ? "Previous categories" : "Next categories"}
      // Hidden below lg: on phones the peeking third card already signals that
      // the row scrolls, and swiping is the natural gesture there.
      className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-500 shadow-sm transition hover:border-neutral-400 hover:text-neutral-700 disabled:cursor-default disabled:opacity-30 disabled:hover:border-neutral-300 lg:flex lg:h-10 lg:w-10"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path d={isLeft ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
      </svg>
    </button>
  );
}

function CategoryCard({ category }) {
  return (
    <Link
      href={category.href}
      // 40% on phones so a third card peeks in at the edge — that sliver is
      // what tells people the row scrolls. At 46% two cards filled the width
      // and the row looked complete.
      // 30% is the widest that still fits three whole cards with the fourth
      // showing at the edge. At 32% only two fit and the row stops reading as
      // scrollable.
      className="group block w-[30%] shrink-0 snap-start sm:w-[30%] lg:w-[calc((100%-5rem)/6)]"
    >
      {/* One rounded card holding image and label, rather than a bare image
          with the caption floating underneath. */}
      <div className="overflow-hidden rounded-xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] ring-1 ring-neutral-200 transition-shadow duration-300 group-hover:shadow-[0_6px_18px_rgba(0,0,0,0.13)]">
        <div className="relative aspect-square w-full overflow-hidden bg-neutral-100">
          <Image
            src={category.image}
            alt={category.label}
            fill
            // Left at 40vw even though the card is now 27% wide: the extra
            // pixels are what keep the zoom below sharp instead of soft.
            sizes="(max-width: 640px) 40vw, (max-width: 1024px) 30vw, 16vw"
            // Zoomed 25% on phones. The cards shrank to fit three across, and
            // at that size the piece was too small to make out; scaling in
            // crops the empty workbench around it and fills the frame with the
            // jewellery. Unchanged from sm up, where the card is big enough.
            className="scale-125 object-cover transition-transform duration-300 sm:scale-100 sm:group-hover:scale-105"
          />
        </div>
        <p
          // Normal weight with a little letter-spacing rather than font-medium:
          // Antic Didone has only a 400 cut, so a medium is faked by the
          // browser and thickens the fine serifs unevenly. Spacing gives the
          // label the same presence without smudging it.
          // 11px on phones so the longest name — "Face & Photo Rings" — stays
          // on one line; at 13px it wrapped and pushed "Rings" onto its own
          // row. The full 14px returns from sm up, where the card is wider.
          //
          // The two-line minimum stays as a safety net: below about 360px even
          // 11px wraps, and it keeps every card the same height when it does.
          className="flex min-h-[2.75rem] items-center justify-center px-2.5 py-2 text-center font-[family-name:var(--font-category)] text-[11px] leading-tight tracking-[0.02em] sm:min-h-[3.25rem] sm:text-[14px]"
          style={{ color: MAROON }}
        >
          {category.label}
        </p>
      </div>
    </Link>
  );
}

export default function ShopByCategories() {
  const trackRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const syncEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setAtStart(track.scrollLeft <= 1);
    // 1px tolerance — sub-pixel widths never land exactly on the maximum.
    setAtEnd(track.scrollLeft >= max - 1);
  }, []);

  useEffect(() => {
    syncEdges();
    window.addEventListener("resize", syncEdges);
    return () => window.removeEventListener("resize", syncEdges);
  }, [syncEdges]);

  const scrollByCard = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    // Derive the step from the rendered card so it stays correct at every
    // breakpoint instead of hardcoding a pixel value.
    const card = track.firstElementChild;
    const step = card ? card.offsetWidth + 16 : track.clientWidth * 0.6;
    track.scrollBy({ left: direction === "left" ? -step : step, behavior: "smooth" });
  };

  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 sm:px-6">
      {/* Tighter gap on phones so the arrows take as little width from the
          cards as possible now that they are always visible. */}
      <div className="flex items-center gap-2 sm:gap-3 lg:gap-5">
        <Arrow direction="left" onClick={() => scrollByCard("left")} disabled={atStart} />

        <div
          ref={trackRef}
          onScroll={syncEdges}
          // Tighter gap on phones — at 16px the three narrower cards lost too
          // much of the row to empty space. The lg width calc assumes 1rem, so
          // the full gap returns from sm up.
          className="flex min-w-0 flex-1 snap-x snap-mandatory gap-2 overflow-x-auto pb-1 [scrollbar-width:none] sm:gap-4 [&::-webkit-scrollbar]:hidden"
        >
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        <Arrow direction="right" onClick={() => scrollByCard("right")} disabled={atEnd} />
      </div>
    </section>
  );
}
