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

function CloseIcon({ className = "h-3.5 w-3.5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export default function FloatingWidgets() {
  // Both start off-screen and slide in just after mount, so the movement is a
  // CSS transition rather than a keyframe added to globals.css.
  const [entered, setEntered] = useState(false);
  const [showChatPrompt, setShowChatPrompt] = useState(true);

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
        @media (prefers-reduced-motion: reduce) {
          [data-shine], [data-hop] { animation: none !important; }
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

      {/* Right — WhatsApp, then the chat prompt, then the chat button */}
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
            // Glass, but opaque enough to hold its shape against a white page —
            // at 45% it disappeared wherever there was nothing behind it to blur.
            className="flex h-12 w-12 items-center justify-center rounded-full border text-white backdrop-blur-md backdrop-saturate-150 transition-transform hover:scale-105"
            style={{
              backgroundColor: "rgba(37, 211, 102, 0.82)",
              borderColor: "rgba(255, 255, 255, 0.6)",
              boxShadow:
                "0 6px 20px rgba(37,211,102,0.35), 0 2px 8px rgba(0,0,0,0.18), inset 0 1px 1px rgba(255,255,255,0.55)",
            }}
          >
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
              <path d="M12 2.1a9.9 9.9 0 0 0-8.5 15L2.1 22l5-1.3A9.9 9.9 0 1 0 12 2.1Zm0 1.9a8 8 0 1 1-4.2 14.8l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 0 1 12 4Zm4.6 11.1c-.1-.2-.4-.3-.9-.6l-1.9-.9c-.2-.1-.4-.1-.6.1l-.8 1c-.2.2-.3.2-.6.1a8 8 0 0 1-2.3-1.4 8.7 8.7 0 0 1-1.6-1.9c-.2-.3 0-.4.1-.6l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.7 1.1 2.9c.2.2 2 3.2 5 4.4 2.4 1 2.9.8 3.4.7.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4Z" />
            </svg>
          </a>
        </span>

        {showChatPrompt ? (
          <div className="flex items-center gap-2 rounded-md bg-white px-3 py-2 shadow-lg ring-1 ring-neutral-200">
            <span className="text-[12px] font-medium whitespace-nowrap text-neutral-800 sm:text-[13px]">
              How can I help you?
            </span>
            <button
              type="button"
              onClick={() => setShowChatPrompt(false)}
              aria-label="Dismiss chat prompt"
              className="shrink-0 text-neutral-400 transition-colors hover:text-neutral-700"
            >
              <CloseIcon />
            </button>
          </div>
        ) : null}

        <button
          type="button"
          aria-label="Open chat"
          className="relative flex h-12 w-12 items-center justify-center rounded-full text-white shadow-xl transition-transform hover:scale-105"
          style={{ backgroundColor: MAROON }}
        >
          {/* Soft halo so the button reads as live without animating itself */}
          <span
            className="absolute inset-0 animate-ping rounded-full opacity-30"
            style={{ backgroundColor: MAROON }}
          />
          {/* Filled bubble with typing dots — reads more clearly at this size
              than the previous thin outline. */}
          <svg viewBox="0 0 24 24" className="relative h-6 w-6" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 3.2c-5 0-9 3.2-9 7.2 0 2.2 1.2 4.2 3.1 5.5-.1 1.1-.6 2.3-1.5 3.3-.2.2 0 .6.3.5 2-.3 3.6-1.1 4.7-1.9.8.2 1.6.3 2.4.3 5 0 9-3.2 9-7.2s-4-7.7-9-7.7Z"
            />
            <circle cx="8.3" cy="10.6" r="1.15" fill={MAROON} />
            <circle cx="12" cy="10.6" r="1.15" fill={MAROON} />
            <circle cx="15.7" cy="10.6" r="1.15" fill={MAROON} />
          </svg>
        </button>
      </div>
    </>
  );
}
