"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { HERO_SLIDES } from "@/constants/homeData";

const MAROON = "#7B1E2B";
const AUTOPLAY_MS = 5000;

// Each slide takes SLIDE_W% of the track; the remainder is split so the
// previous and next slides peek at both edges.
const SLIDE_W = 84;
const EDGE = (100 - SLIDE_W) / 2;

function NavArrow({ direction, onClick }) {
  const isLeft = direction === "left";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isLeft ? "Previous slide" : "Next slide"}
      className={`absolute top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-neutral-700 shadow-md backdrop-blur-sm transition hover:bg-white md:flex ${
        isLeft ? "left-3 lg:left-6" : "right-3 lg:right-6"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
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

export default function HeroBanner() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = HERO_SLIDES.length;

  const goTo = useCallback((i) => setIndex(((i % count) + count) % count), [count]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Autoplay. Restarts whenever index changes so a manual click gives a full
  // interval before the next auto-advance.
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, count, index]);

  // Swipe support for touch devices.
  const touchX = useRef(null);
  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(delta) > 50) (delta < 0 ? next : prev)();
    touchX.current = null;
  };

  return (
    <section
      className="relative w-full overflow-hidden py-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carousel"
      aria-label="Featured collections"
    >
      <NavArrow direction="left" onClick={prev} />
      <NavArrow direction="right" onClick={next} />

      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(calc(${EDGE}% - ${index * SLIDE_W}%))` }}
      >
        {HERO_SLIDES.map((slide, i) => (
          <div key={slide.id} className="w-[84%] shrink-0 px-2">
            <a
              href={slide.href}
              // Clicking a peeking neighbour brings it to centre rather than
              // navigating, which is what that affordance implies.
              onClick={(e) => {
                if (i !== index) {
                  e.preventDefault();
                  goTo(i);
                }
              }}
              className="relative block aspect-[8/3] overflow-hidden rounded-lg bg-neutral-900"
              tabIndex={i === index ? 0 : -1}
              aria-hidden={i !== index}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                sizes="(max-width: 768px) 84vw, 84vw"
                className="object-cover object-left"
                priority={i === 0}
              />
            </a>
          </div>
        ))}
      </div>

      {/* Diamonds are squares turned 45°. The rotation lives on an inner span
          so the button keeps a comfortably square tap target. */}
      <div className="mt-5 flex items-center justify-center gap-1">
        {HERO_SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            className="flex h-6 w-6 items-center justify-center"
          >
            <span
              className="block rotate-45 transition-all duration-300"
              style={{
                width: i === index ? 9 : 6,
                height: i === index ? 9 : 6,
                backgroundColor: i === index ? MAROON : "#D4D4D4",
              }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
