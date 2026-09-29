"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MdClose, MdOutlineCameraAlt } from "react-icons/md";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const MAROON = "#7B1E2B";

/**
 * "Try it on" — the camera try-on, over the product page.
 *
 * The try-on is served by the backend at /try-on, and told which piece to open
 * on. It runs in a frame rather than being rebuilt in this app: it is a
 * three.js scene with face and hand tracking, and one copy of it serving both
 * the shop and the workshop is the point of hosting it with the API.
 *
 * The frame must carry allow="camera", or the try-on loads and then finds no
 * camera at all - a frame does not inherit the page's permission.
 *
 * Nothing renders when a product has no model, which is most of them.
 *
 * @param {string|null} modelId  the try-on model on this product's record
 * @param {string} title         the product's name, shown while the camera starts
 */
export default function TryOnButton({ modelId, title }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // The page behind must not scroll while the camera is over it, and Escape
  // should close it as it closes every other layer in this shop.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!modelId) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-2xl border-2 px-5 py-2.5 text-[13px] font-semibold transition-colors hover:text-white"
        style={{ borderColor: MAROON, color: MAROON }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = MAROON)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
      >
        <MdOutlineCameraAlt className="h-5 w-5" />
        Try it on
      </button>

      {mounted &&
        open &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex flex-col bg-black"
            role="dialog"
            aria-modal="true"
            aria-label={`Try on ${title}`}
          >
            <div className="flex items-center justify-between gap-3 px-4 py-3 text-white">
              <p className="truncate text-sm font-semibold">{title}</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close the try-on"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
              >
                <MdClose className="h-6 w-6" />
              </button>
            </div>

            <iframe
              // Opens on this product's own piece, with the viewer's catalogue
              // panel put away - see the try-on's own main.js.
              src={`${API_URL}/try-on/?model=${encodeURIComponent(modelId)}`}
              title={`Try on ${title}`}
              allow="camera; fullscreen"
              className="min-h-0 w-full flex-1 border-0"
            />

            <p className="px-4 py-2 text-center text-[12px] text-white/70">
              Allow the camera when asked. Nothing you see here is uploaded or
              saved — the video stays on your device.
            </p>
          </div>,
          document.body
        )}
    </>
  );
}
