"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { STYLE_SLIDES } from "@/constants/homeData";

const MAROON = "#7B1E2B";

// How many cards stay visible either side of the centre one.
const VISIBLE = 2;
// Per-step horizontal shift, depth push-back and shrink.
const STEP_X = 46;
const STEP_Z = 190;
const STEP_SCALE = 0.07;

function Arrow({ direction, onClick }) {
  const isLeft = direction === "left";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isLeft ? "Previous slide" : "Next slide"}
      className={`absolute top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow-md transition hover:bg-white ${
        isLeft ? "left-2 sm:left-6" : "right-2 sm:right-6"
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

// `slides` is a prop so API data can be passed later; the constant is only the
// fallback while this section is static.
export default function Card3DSlider({ slides = STYLE_SLIDES }) {
  const count = slides.length;
  const [index, setIndex] = useState(Math.floor(count / 2));

  const goTo = useCallback(
    (i) => setIndex(((i % count) + count) % count),
    [count],
  );

  // Shortest signed distance around the ring, so the deck wraps instead of
  // running out of cards at either end.
  const offsetOf = (i) => {
    let d = i - index;
    if (d > count / 2) d -= count;
    if (d < -count / 2) d += count;
    return d;
  };

  const touchX = useRef(null);
  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(delta) > 50) goTo(index + (delta < 0 ? 1 : -1));
    touchX.current = null;
  };

  return (
    <section
      className="w-full overflow-hidden bg-white py-10"
      aria-roledescription="carousel"
      aria-label="Styling looks"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative mx-auto h-[300px] w-full max-w-[1400px] sm:h-[420px] lg:h-[500px]">
        <Arrow direction="left" onClick={() => goTo(index - 1)} />
        <Arrow direction="right" onClick={() => goTo(index + 1)} />

        {/* perspective on the stage makes translateZ read as real depth */}
        <div className="relative h-full w-full [perspective:1400px]">
          {slides.map((slide, i) => {
            const offset = offsetOf(i);
            const distance = Math.abs(offset);
            const hidden = distance > VISIBLE;
            const isActive = offset === 0;

            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={isActive ? slide.alt : `Show ${slide.alt}`}
                aria-hidden={hidden}
                tabIndex={hidden ? -1 : 0}
                className="absolute top-0 left-1/2 h-full w-[150px] overflow-hidden rounded-xl shadow-2xl transition-all duration-500 ease-out sm:w-[220px] lg:w-[270px]"
                style={{
                  transform: `translateX(-50%) translateX(${offset * STEP_X}%) translateZ(${-distance * STEP_Z}px) scale(${(1 - distance * STEP_SCALE).toFixed(2)})`,
                  zIndex: count - distance,
                  opacity: hidden ? 0 : 1,
                  pointerEvents: hidden ? "none" : "auto",
                  cursor: isActive ? "default" : "pointer",
                }}
              >
                {slide.image ? (
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    sizes="(max-width: 640px) 220px, 270px"
                    className="object-cover"
                  />
                ) : (
                  <span
                    className={`absolute inset-0 flex items-end justify-center bg-gradient-to-br p-4 ${slide.tone}`}
                  >
                    <span className="text-[11px] text-white/70">{slide.alt}</span>
                  </span>
                )}

                {/* Side cards sit back visually as well as in depth */}
                <span
                  className="absolute inset-0 bg-black transition-opacity duration-500"
                  style={{ opacity: isActive ? 0 : 0.35 }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Dots */}
      <div className="mt-6 flex items-center justify-center gap-1">
        {slides.map((slide, i) => (
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
