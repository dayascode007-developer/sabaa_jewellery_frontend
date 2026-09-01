"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import sizeGuide from "@/assets/logo/Ring Size Guide.webp";

const MAROON = "#7B1E2B";
const GOLD = "#C9A227";
const WHATSAPP_NUMBER = "917871900140";

// The chart artwork already carries the size table and the "measure the inner
// diameter" illustration, so none of that is repeated below it — only the parts
// the picture cannot say.
const STEPS = [
  {
    id: "existing",
    title: "Measure a ring they already wear",
    body: "The most reliable method. Lay a ring that fits the correct finger flat, and measure straight across the inside in millimetres — not the outside edge, which the band's thickness throws off by a full size. Match that number to the chart above.",
  },
  {
    id: "finger",
    title: "Measure the finger itself",
    body: "Wrap a strip of paper snugly around the base of the finger, mark where it overlaps, then lay it flat and measure to the mark. That length is the circumference — send it to us and we will convert it for you.",
  },
];

const TIPS = [
  "Measure in the evening at normal room temperature — fingers are smallest in the morning and in cold weather.",
  "Check the ring passes the knuckle. A band that fits the base of the finger but will not go over the knuckle is the wrong size.",
  "Take the measurement three times on three different days. If the readings disagree, use the largest.",
  "Engraved rings cannot always be resized — resizing means cutting the band, and the engraving may not survive it. Please confirm before you order.",
];

export default function RingSizeGuide() {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  // The `!open` guard must be INSIDE the effect: hooks run unconditionally, so
  // checking outside would lock body scroll on mount and never restore it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, close]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-medium transition-colors hover:bg-[#FDF0F2]"
        style={{ borderColor: GOLD, color: MAROON }}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-3.5 w-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="14" r="6" />
          <path d="m9 7 3-4 3 4" />
        </svg>
        Ring Size Guide
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Ring size guide"
          onClick={close}
          className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto bg-black/60 p-4 sm:items-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="my-auto w-full max-w-[520px] overflow-hidden rounded-lg bg-white shadow-2xl"
          >
            {/* Header stays put while the body scrolls */}
            <div
              className="flex items-center justify-between gap-3 px-4 py-3"
              style={{ backgroundColor: MAROON }}
            >
              <h2 className="font-[family-name:var(--font-heading)] text-[18px] text-white sm:text-[20px]">
                Ring Size Guide
              </h2>
              <button
                type="button"
                onClick={close}
                aria-label="Close ring size guide"
                className="shrink-0 text-white/70 transition-colors hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <div className="max-h-[75vh] overflow-y-auto">
              {/* The artwork is 486x730. Never stretched past that — upscaling
                  softened it and pushed it to 841px tall, so the chart no longer
                  fit on screen. max-h keeps the whole chart visible on open;
                  only the text below it scrolls. */}
              <div className="bg-[#FDF0F2] px-3 py-3">
                <Image
                  src={sizeGuide}
                  alt="How to measure ring size — inner diameter in millimetres for sizes 6 to 30"
                  sizes="(max-width: 640px) 92vw, 486px"
                  className="mx-auto h-auto max-h-[66vh] w-auto max-w-full"
                  placeholder="blur"
                />
              </div>

              <div className="px-5 pt-5 pb-6">
                <h3
                  className="font-[family-name:var(--font-heading)] text-[18px] leading-snug sm:text-[20px]"
                  style={{ color: MAROON }}
                >
                  Two ways to measure at home
                </h3>

                <ol className="mt-3 space-y-4">
                  {STEPS.map((step, i) => (
                    <li key={step.id} className="flex gap-3">
                      <span
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white"
                        style={{ backgroundColor: MAROON }}
                        aria-hidden="true"
                      >
                        {i + 1}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[14px] font-medium text-neutral-900">
                          {step.title}
                        </span>
                        <span className="mt-1 block text-[14px] leading-relaxed text-neutral-600">
                          {step.body}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>

                <h3
                  className="mt-6 font-[family-name:var(--font-heading)] text-[18px] leading-snug sm:text-[20px]"
                  style={{ color: MAROON }}
                >
                  Before you order
                </h3>

                <ul className="mt-3 space-y-2">
                  {TIPS.map((tip) => (
                    <li key={tip} className="flex gap-3 text-[14px] leading-relaxed text-neutral-600">
                      <span
                        className="mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45"
                        style={{ backgroundColor: GOLD }}
                        aria-hidden="true"
                      />
                      {tip}
                    </li>
                  ))}
                </ul>

                <p className="mt-5 rounded-lg border border-[#EFDCD4] bg-[#FDF8F3] p-4 text-[14px] leading-relaxed text-neutral-700">
                  Sizes are measured by inner diameter with a tolerance of
                  &plusmn;0.45&nbsp;mm. Still unsure? Send us your measurement and we
                  will confirm the size before anything is made.
                </p>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#25D366" }}
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                    <path d="M12 2.8a9.1 9.1 0 0 0-7.8 13.8L2.9 21.3l4.9-1.3A9.1 9.1 0 1 0 12 2.8Zm0 1.9a7.2 7.2 0 1 1-3.8 13.3l-.3-.2-2.6.7.7-2.5-.2-.3A7.2 7.2 0 0 1 12 4.7Z" />
                  </svg>
                  Ask us on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
