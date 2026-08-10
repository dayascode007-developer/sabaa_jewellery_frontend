"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { TESTIMONIALS } from "@/constants/homeData";

const MAROON = "#7B1E2B";

function Stars({ rating }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="h-3 w-3"
          fill={i < rating ? MAROON : "#D8D8D8"}
          aria-hidden="true"
        >
          <path d="m12 2 2.9 6.3 6.8.8-5 4.7 1.3 6.8L12 17.4 5.9 20.6 7.3 13.8l-5-4.7 6.8-.8L12 2Z" />
        </svg>
      ))}
    </div>
  );
}

function Arrow({ direction, onClick, disabled }) {
  const isLeft = direction === "left";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={isLeft ? "Previous testimonials" : "Next testimonials"}
      className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-500 transition hover:border-neutral-400 hover:text-neutral-700 disabled:opacity-30 sm:flex"
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

function TestimonialCard({ testimonial }) {
  return (
    <figure className="w-[70%] shrink-0 snap-start overflow-hidden rounded-lg border border-neutral-200 bg-white sm:w-[46%] lg:w-[calc((100%-3rem)/4)]">
      <div className="relative aspect-[4/5] w-full bg-neutral-100">
        {testimonial.image ? (
          <Image
            src={testimonial.image}
            alt=""
            fill
            sizes="(max-width: 640px) 70vw, (max-width: 1024px) 46vw, 24vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#EDE3D3] via-[#E3D5BE] to-[#D8C6A8]">
            <span className="px-3 text-center text-[10px] text-[#8A6E45]">
              {testimonial.name}
            </span>
          </div>
        )}
      </div>

      <figcaption className="px-3 pt-3 pb-4">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill={MAROON} aria-hidden="true">
          <path d="M9.5 6C6.5 7.4 5 9.7 5 12.9V18h5.4v-5.3H7.9c0-1.9.8-3.2 2.6-4L9.5 6Zm8.6 0c-3 1.4-4.5 3.7-4.5 6.9V18H19v-5.3h-2.5c0-1.9.8-3.2 2.6-4L18.1 6Z" />
        </svg>
        <p className="mt-1.5 min-h-[52px] text-[11px] leading-snug text-neutral-700">
          {testimonial.quote}
        </p>
        <div className="mt-2">
          <Stars rating={testimonial.rating} />
        </div>
        <p className="mt-2 text-[11px] font-medium text-neutral-800">
          &ndash; {testimonial.name}
        </p>
        <p className="text-[10px] text-neutral-500">{testimonial.city}</p>
      </figcaption>
    </figure>
  );
}

export default function CustomerLove() {
  const trackRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [active, setActive] = useState(0);

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setAtStart(track.scrollLeft <= 1);
    setAtEnd(track.scrollLeft >= max - 1);
    const card = track.firstElementChild;
    const step = card ? card.offsetWidth + 16 : 1;
    setActive(Math.round(track.scrollLeft / step));
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  const scrollByCard = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild;
    const step = card ? card.offsetWidth + 16 : track.clientWidth * 0.6;
    track.scrollBy({ left: direction === "left" ? -step : step, behavior: "smooth" });
  };

  const goTo = (i) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild;
    const step = card ? card.offsetWidth + 16 : 0;
    track.scrollTo({ left: i * step, behavior: "smooth" });
  };

  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 pb-12 sm:px-6">
      <div className="rounded-lg border border-[#F0E4D8] bg-[#FDF8F3] px-4 py-9 sm:px-8">
        <div className="text-center">
          <p
            className="flex items-center justify-center gap-2 text-[10px] tracking-[0.22em] uppercase"
            style={{ color: MAROON }}
          >
            <span aria-hidden="true">&#10022;</span>
            Real People, Real Love
            <span aria-hidden="true">&#10022;</span>
          </p>

          <h2
            className="mt-2 font-[family-name:var(--font-heading)] text-[40px] leading-tight"
            style={{ color: MAROON }}
          >
            Customer Love
          </h2>

          {/* Ornament divider */}
          <div className="mt-2 flex items-center justify-center gap-2">
            <span className="h-px w-16 bg-[#E0CDBA]" />
            <span className="text-[10px]" style={{ color: MAROON }} aria-hidden="true">
              &#10050;
            </span>
            <span className="h-px w-16 bg-[#E0CDBA]" />
          </div>

          <p className="mt-3 text-[13px] leading-relaxed text-neutral-600">
            See how our customers are flaunting their love with our rings!
            <br />
            Real moments, real smiles, real satisfaction.
          </p>

          <span
            className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-medium text-white"
            style={{ backgroundColor: MAROON }}
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
              <path d="M8.5 11a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Zm7.5.5a2.7 2.7 0 1 0 0-5.4 2.7 2.7 0 0 0 0 5.4ZM8.5 12.8c-3 0-6 1.5-6 3.6V19h12v-2.6c0-2.1-3-3.6-6-3.6Zm7.5.4c-.8 0-1.7.1-2.4.4 1.2.8 2 1.8 2 3v2.4h6V17c0-1.9-2.7-3.8-5.6-3.8Z" />
            </svg>
            5000+ Happy Customers
          </span>
        </div>

        {/* Testimonial carousel */}
        <div className="mt-7 flex items-center gap-3">
          <Arrow direction="left" onClick={() => scrollByCard("left")} disabled={atStart} />

          <div
            ref={trackRef}
            onScroll={sync}
            className="flex min-w-0 flex-1 snap-x snap-mandatory gap-4 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {TESTIMONIALS.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>

          <Arrow direction="right" onClick={() => scrollByCard("right")} disabled={atEnd} />
        </div>

        <div className="mt-5 flex items-center justify-center gap-1">
          {TESTIMONIALS.map((testimonial, i) => (
            <button
              key={testimonial.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={i === active}
              className="flex h-6 w-6 items-center justify-center"
            >
              <span
                className="block rotate-45 transition-all duration-300"
                style={{
                  width: i === active ? 9 : 6,
                  height: i === active ? 9 : 6,
                  backgroundColor: i === active ? MAROON : "#D9CFC4",
                }}
              />
            </button>
          ))}
        </div>

        <p
          className="mt-5 flex items-center justify-center gap-2 text-[13px]"
          style={{ color: MAROON }}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
            <path d="M12 20s-7.5-4.6-7.5-9.6A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20Z" />
          </svg>
          Your trust inspires us every day!
        </p>
      </div>
    </section>
  );
}
