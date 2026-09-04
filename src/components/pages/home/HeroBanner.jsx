"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { getImageProps } from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { fetchBanners } from "@/store/slices/bannerSlice";
import { BannerShimmer } from "@/components/shimmer-loader/Shimmer-loader";
import { HERO_SLIDES } from "@/constants/homeData";

const MAROON = "#7B1E2B";
const AUTOPLAY_MS = 5000;

// Slide width and the centring offset differ by breakpoint, so they are CSS
// variables rather than JS constants: phones run the banner full-bleed
// (100% wide, no offset) while sm and up keep the 84% slide with the previous
// and next peeking at both edges. The transform below reads whichever pair the
// media query has set.
//   --slide-w : how much of the track one slide takes
//   --edge    : half the leftover, to centre the active slide

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

function SlideMedia({ slide, priority }) {
  const [imageError, setImageError] = React.useState(false);

  // For API banners, use simple img tag; for static imports, use next/image optimization
  const isApiImage =
    typeof slide.image === "string" && slide.image.startsWith("http");

  if (isApiImage || imageError) {
    return (
      <img
        src={slide.image}
        alt={slide.alt}
        className="absolute inset-0 h-full w-full object-cover"
        onError={() => setImageError(true)}
        loading={priority ? "eager" : "lazy"}
      />
    );
  }

  // For static images with intrinsic dimensions, use Next.js optimization
  try {
    const common = {
      alt: slide.alt,
      sizes: "(max-width: 639px) 100vw, 84vw",
      priority,
      width: 2400,
      height: 900,
    };

    const {
      props: { srcSet: desktopSrcSet },
    } = getImageProps({ ...common, src: slide.image });

    const mobileCommon = {
      ...common,
      width: 736,
      height: 736,
    };

    const {
      props: { srcSet: mobileSrcSet, ...rest },
    } = getImageProps({ ...mobileCommon, src: slide.mobileImage });

    return (
      <picture>
        <source media="(min-width: 640px)" srcSet={desktopSrcSet} />
        <source media="(max-width: 639px)" srcSet={mobileSrcSet} />
        <img
          {...rest}
          alt={slide.alt}
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setImageError(true)}
        />
      </picture>
    );
  } catch (error) {
    console.warn(
      "SlideMedia optimization failed, using fallback:",
      error.message
    );
    return (
      <img
        src={slide.image}
        alt={slide.alt}
        className="absolute inset-0 h-full w-full object-cover"
        onError={() => setImageError(true)}
        loading={priority ? "eager" : "lazy"}
      />
    );
  }
}

export default function HeroBanner() {
  const dispatch = useDispatch();
  const { banners, loading } = useSelector((state) => state.banners);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Use API banners if available, fallback to static slides
  const slides =
    banners && banners.length > 0
      ? banners.map((banner, idx) => ({
          id: `banner-${banner.id}`,
          image: banner.image_url,
          mobileImage: banner.image_url,
          alt: `Banner ${idx + 1}`,
          href: "#",
        }))
      : HERO_SLIDES;

  const count = slides.length;

  // Fetch banners on mount
  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);

  const goTo = useCallback(
    (i) => setIndex(((i % count) + count) % count),
    [count]
  );
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Autoplay. Restarts whenever index changes so a manual click gives a full
  // interval before the next auto-advance.
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % count),
      AUTOPLAY_MS
    );
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

  if (loading) {
    return <BannerShimmer />;
  }

  return (
    <section
      className="relative w-full overflow-hidden pb-0"
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
        className="flex transition-transform duration-700 ease-out [--edge:0%] [--slide-w:100%] sm:[--edge:8%] sm:[--slide-w:84%]"
        style={{
          transform: `translateX(calc(var(--edge) - ${index} * var(--slide-w)))`,
        }}
      >
        {slides.map((slide, i) => (
          <div key={slide.id} className="w-full shrink-0 sm:w-[84%] sm:px-2">
            <a
              href={slide.href}
              onClick={(e) => {
                if (i !== index) {
                  e.preventDefault();
                  goTo(i);
                }
              }}
              className="relative block aspect-[4/2] overflow-hidden bg-neutral-900 sm:aspect-[8/3] sm:rounded-lg"
              tabIndex={i === index ? 0 : -1}
              aria-hidden={i !== index}
            >
              <SlideMedia slide={slide} priority={i === 0} />
            </a>
          </div>
        ))}
      </div>

      {/* Diamonds are squares turned 45°. The rotation lives on an inner span
          so the button keeps a comfortably square tap target. */}
      <div className="mt-4 flex items-center justify-center gap-1 sm:mt-5">
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
