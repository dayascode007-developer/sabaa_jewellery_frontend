"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CATEGORIES } from "@/constants/homeData";

function Arrow({ direction, onClick, disabled }) {
  const isLeft = direction === "left";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={isLeft ? "Previous categories" : "Next categories"}
      className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-300 text-neutral-500 transition hover:border-neutral-400 hover:text-neutral-700 disabled:cursor-default disabled:opacity-30 disabled:hover:border-neutral-300 lg:flex"
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
    <a
      href={category.href}
      className="group block w-[46%] shrink-0 snap-start sm:w-[30%] lg:w-[calc((100%-5rem)/6)]"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-neutral-100">
        <Image
          src={category.image}
          alt={category.label}
          fill
          sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 16vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <p className="mt-2.5 text-center font-[family-name:var(--font-category)] text-[13px] text-neutral-700">
        {category.label}
      </p>
    </a>
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
      <div className="flex items-center gap-3 lg:gap-5">
        <Arrow direction="left" onClick={() => scrollByCard("left")} disabled={atStart} />

        <div
          ref={trackRef}
          onScroll={syncEdges}
          className="flex min-w-0 flex-1 snap-x snap-mandatory gap-4 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
