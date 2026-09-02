"use client";

import { useEffect, useState } from "react";

const MAROON = "#7B1E2B";
const GOLD = "#C9A227";
// Digits only, country code included — wa.me rejects spaces and the leading +.
const WHATSAPP_NUMBER = "917871900140";

// Scattered across the pill. Delays are staggered left-to-right so the stars
// light up in sequence as the shine band passes over them, then in reverse on
// the return leg (the sweep runs `alternate`, which replays the timeline
// backwards).
const STARS = [
  { left: "10%", top: "26%", size: 7, delay: "0s" },
  { left: "27%", top: "64%", size: 5, delay: "0.3s" },
  { left: "46%", top: "18%", size: 6, delay: "0.6s" },
  { left: "63%", top: "60%", size: 5, delay: "0.9s" },
  { left: "82%", top: "30%", size: 7, delay: "1.2s" },
];

function Sparkle({ size }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M12 1.5 13.7 9.3 21.5 11 13.7 12.7 12 20.5 10.3 12.7 2.5 11 10.3 9.3Z" />
    </svg>
  );
}

export default function FloatingWidgets() {
  // Both start off-screen and slide in just after mount, so the movement is a
  // CSS transition rather than a keyframe added to globals.css.
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setEntered(true), 400);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <>
      {/* Keyframes live here rather than in globals.css so this widget stays
          self-contained. A plain one-way sweep — the `alternate` direction on
          the animation itself sends it back right-to-left, so the hold frame
          the previous version used is no longer needed. */}
      <style>{`
        @keyframes sabaaShine {
          from { transform: translateX(-150%) skewX(-20deg); }
          to   { transform: translateX(350%)  skewX(-20deg); }
        }
        @keyframes sabaaTwinkle {
          0%, 100% { opacity: 0.18; transform: scale(0.7) rotate(0deg); }
          50%      { opacity: 1;    transform: scale(1.25) rotate(45deg); }
        }
        /* Light hop. The ease pair gives it a little weight — slower at the
           top of the arc than on the way back down. */
        @keyframes sabaaHop {
          0%, 100% { transform: translateY(0);    animation-timing-function: cubic-bezier(0.3, 0, 0.5, 1); }
          50%      { transform: translateY(-7px); animation-timing-function: cubic-bezier(0.5, 0, 0.7, 1); }
        }
        /* A slow ring breathing outwards. Tailwind's animate-ping is faster and
           harder-edged; this is closer to a glow than a pulse. */
        @keyframes sabaaGlow {
          0%   { transform: scale(0.95); opacity: 0.55; }
          70%  { transform: scale(1.55); opacity: 0; }
          100% { transform: scale(1.55); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-shine], [data-hop], [data-glow] { animation: none !important; }
        }
      `}</style>

      {/* Left — Introducing Shortcuts. Sits flush against the viewport edge, so
          only the bottom-right corner is rounded; the other three meet the edge
          square. No dismiss control, so it is always shown. */}
      <div
        className={`fixed bottom-20 left-0 z-40 transition-transform duration-700 ease-out lg:bottom-6 ${
          entered ? "translate-x-0" : "-translate-x-[130%]"
        }`}
      >
        <div
          // overflow-hidden clips the shine sweep to the pill's rounded box.
          className="relative flex items-center gap-2 overflow-hidden rounded-br-[20px] border px-3 py-2 shadow-lg"
          style={{ backgroundColor: MAROON, borderColor: GOLD }}
        >
          {/* Stars sit behind the content and twinkle in step with the sweep */}
          {STARS.map((star) => (
            <span
              key={star.left}
              aria-hidden="true"
              data-shine
              className="pointer-events-none absolute text-white"
              style={{
                left: star.left,
                top: star.top,
                animation: `sabaaTwinkle 2.4s ease-in-out infinite alternate`,
                animationDelay: star.delay,
              }}
            >
              <Sparkle size={star.size} />
            </span>
          ))}

          <span className="text-[12px] font-medium whitespace-nowrap text-white sm:text-[13px]">
            Introducing Shortcuts
          </span>

          {/* Shine sweep. Last in the DOM so it passes over the text. */}
          <span
            aria-hidden="true"
            data-shine
            className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[#C9A227]/70 to-transparent"
            style={{ animation: "sabaaShine 2.4s ease-in-out infinite alternate" }}
          />
        </div>
      </div>

      {/* Right — WhatsApp. The chat prompt and chat button that used to sit
          under it are gone; nothing was wired behind them. */}
      <div
        className={`fixed right-3 bottom-20 z-40 flex flex-col items-end gap-2 transition-transform duration-700 ease-out lg:right-6 lg:bottom-6 ${
          entered ? "translate-x-0" : "translate-x-[130%]"
        }`}
      >
        {/* Tops the stack. The hop lives on this wrapper, not the anchor — both
            would write `transform`, and the keyframe would win over hover:scale. */}
        <span
          data-hop
          className="block"
          style={{ animation: "sabaaHop 1.6s ease-in-out infinite" }}
        >
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            // Solid and lit rather than translucent. The frosted version had to
            // borrow whatever was behind it, so it looked different on every
            // section of the page and washed out over white.
            className="group/wa relative flex h-14 w-14 items-center justify-center rounded-full text-white transition-transform duration-300 hover:scale-110"
            style={{
              // Lit from the top-left: bright mint on the highlight side, deep
              // WhatsApp green through the middle, darker on the shadow side.
              backgroundImage:
                "linear-gradient(145deg, #5BE68C 0%, #25D366 45%, #0F9D48 100%)",
              boxShadow:
                "0 10px 26px rgba(18,140,74,0.42), 0 3px 8px rgba(0,0,0,0.20), inset 0 1px 2px rgba(255,255,255,0.55), inset 0 -2px 6px rgba(0,0,0,0.12)",
            }}
          >
            {/* Ring breathing outwards behind the button. -z-10 keeps it under
                the glyph, and pointer-events-none keeps it out of the way of
                the tap target. */}
            <span
              data-glow
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 rounded-full"
              style={{
                backgroundColor: "#25D366",
                animation: "sabaaGlow 2.6s ease-out infinite",
              }}
            />

            {/* Crisp white rim, drawn as a ring rather than a border so it sits
                outside the gradient instead of eating into it. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-white/85"
            />

            <svg
              viewBox="0 0 24 24"
              className="relative h-8 w-8 drop-shadow-[0_1px_1px_rgba(0,0,0,0.18)]"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2.1a9.9 9.9 0 0 0-8.5 15L2.1 22l5-1.3A9.9 9.9 0 1 0 12 2.1Zm0 1.9a8 8 0 1 1-4.2 14.8l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 0 1 12 4Zm4.6 11.1c-.1-.2-.4-.3-.9-.6l-1.9-.9c-.2-.1-.4-.1-.6.1l-.8 1c-.2.2-.3.2-.6.1a8 8 0 0 1-2.3-1.4 8.7 8.7 0 0 1-1.6-1.9c-.2-.3 0-.4.1-.6l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.7 1.1 2.9c.2.2 2 3.2 5 4.4 2.4 1 2.9.8 3.4.7.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4Z" />
            </svg>

            {/* Label on hover, desktop only — a floating icon with no words is
                easy to mistake for decoration. */}
            <span className="pointer-events-none absolute right-[calc(100%+10px)] hidden whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-[13px] font-medium text-neutral-800 opacity-0 shadow-lg ring-1 ring-black/5 transition-opacity duration-200 group-hover/wa:opacity-100 lg:block">
              Chat with us
            </span>
          </a>
        </span>

      </div>
    </>
  );
}
