"use client";

import { useEffect } from "react";

const MAROON = "#7B1E2B";
const GOLD = "#C9A227";

/**
 * Site-wide success dialog.
 *
 * Styled to match the rest of Sabaa — the Fraunces heading, the maroon/gold
 * palette and the ornament rule the About, Policy and Blogs sections use — so a
 * confirmation looks like it belongs to the shop rather than to the framework.
 *
 * Props are unchanged from the original: isOpen, message, onClose, autoClose.
 * `title` is optional and defaults to "Success".
 */
export default function SuccessModal({
  isOpen,
  message,
  onClose,
  autoClose = 3000,
  title = "Success",
}) {
  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(onClose, autoClose);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, onClose]);

  // Escape closes it, the way every other dialog on the site does.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      // No tint over the page — the blur alone separates the dialog from what
      // is behind it, so the shop's own colours stay true.
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-[6px]"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        // Clicking the card itself must not close it.
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[360px] overflow-hidden rounded-xl bg-white text-center shadow-[0_10px_40px_rgba(43,10,14,0.28)] ring-1 ring-[#EFDCD4]"
      >
        {/* Tick, on the same pink band the rest of the site uses for a soft
            ground. The gold ring around it is the one gold accent. */}
        <div className="flex justify-center bg-[#FDF0F2] pt-7 pb-6">
          <span
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm"
            style={{ boxShadow: `0 0 0 2px ${GOLD}` }}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-7 w-7"
              fill="none"
              stroke={MAROON}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </span>
        </div>

        <div className="px-6 pt-5 pb-6 sm:px-7">
          <h2
            className="font-[family-name:var(--font-heading)] text-[24px] leading-tight"
            style={{ color: MAROON }}
          >
            {title}
          </h2>

          {/* The same ornament rule the section headings carry. */}
          <div className="mt-2 flex items-center justify-center gap-2">
            <span className="h-px w-10 bg-[#E0CDBA]" />
            <span className="text-[10px]" style={{ color: MAROON }} aria-hidden="true">
              &#10050;
            </span>
            <span className="h-px w-10 bg-[#E0CDBA]" />
          </div>

          <p className="mt-3 text-[15px] leading-relaxed text-neutral-600">{message}</p>

          <button
            type="button"
            onClick={onClose}
            autoFocus
            className="mt-5 w-full rounded-md py-2.5 text-[14px] font-medium text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: MAROON }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
