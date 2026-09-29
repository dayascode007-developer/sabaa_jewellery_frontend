"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MdClose, MdOutlineCameraAlt } from "react-icons/md";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const MAROON = "#7B1E2B";

const ARROWS = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
};

/** One key, drawn as a key. */
function Key({ glyph }) {
  return (
    <kbd className="flex h-8 w-8 items-center justify-center rounded-md border border-white/25 bg-white/10 text-[15px] font-semibold text-white">
      {glyph}
    </kbd>
  );
}

/**
 * "Try it on" — the camera try-on, over the product page.
 *
 * The try-on is served by the backend at /try-on and told which piece to open
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
  const [mode, setMode] = useState(null);
  const frame = useRef(null);

  useEffect(() => setMounted(true), []);

  // What the piece is, so the sideways arrows can be described honestly. A
  // pair of earrings moves out of the face or in toward it - the two go
  // opposite ways - where a ring or a chain slides left and right.
  useEffect(() => {
    if (!modelId) return;
    let live = true;
    fetch(`${API_URL}/api/ar/models/${encodeURIComponent(modelId)}`)
      .then((r) => r.json())
      .then((body) => live && body?.success && setMode(body.data.mode))
      .catch(() => {});
    return () => {
      live = false;
    };
  }, [modelId]);

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      // The arrows belong to the try-on, but a key press goes to whichever
      // document has the focus, and that is this page until the customer
      // clicks inside the frame. Nobody would guess that, so they are caught
      // here and handed over. The frame is a different origin, so a message is
      // the only way in.
      const direction = ARROWS[e.key];
      if (!direction || e.metaKey || e.ctrlKey || e.altKey) return;
      e.preventDefault(); // or the page behind scrolls
      frame.current?.contentWindow?.postMessage({ sabaaTryOn: direction }, "*");
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!modelId) return null;

  const sideways = mode === "jimiki" ? "Move it in or out" : "Move it left or right";

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

            <div className="relative min-h-0 w-full flex-1">
              <iframe
                ref={frame}
                // Opens on this product's own piece, with the viewer's
                // catalogue panel put away - see the try-on's own main.js.
                src={`${API_URL}/try-on/?model=${encodeURIComponent(modelId)}`}
                title={`Try on ${title}`}
                allow="camera; fullscreen"
                className="h-full w-full border-0"
              />

              {/* The piece will not land perfectly on every face and every
                  hand, and a customer who does not know it can be moved reads
                  that as the try-on being wrong. So the controls are shown
                  rather than waited to be found. On a wide screen there is
                  empty black either side of the portrait view, which is where
                  this goes; on a phone there is not, so it becomes a line
                  under the view pointing at the pad the viewer puts there. */}
              <div className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 lg:block">
                <div className="w-56 rounded-2xl border border-white/15 bg-white/[0.07] p-4 backdrop-blur-sm">
                  <p className="mb-3 text-[13px] font-semibold text-white">
                    Not sitting right?
                  </p>
                  <div className="mb-3 flex items-center gap-2">
                    <Key glyph="↑" />
                    <Key glyph="↓" />
                    <span className="text-[12px] text-white/75">
                      Move it up or down
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Key glyph="←" />
                    <Key glyph="→" />
                    <span className="text-[12px] text-white/75">{sideways}</span>
                  </div>
                  <p className="mt-3 text-[11px] leading-snug text-white/50">
                    Use the arrow keys on your keyboard.
                  </p>
                </div>
              </div>
            </div>

            <p className="px-4 py-2 text-center text-[12px] text-white/70">
              <span className="lg:hidden">
                Use the arrows in the corner of the view to move the piece up,
                down{mode === "jimiki" ? ", in or out" : ", left or right"}.{" "}
              </span>
              Allow the camera when asked. Nothing you see here is uploaded or
              saved — the video stays on your device.
            </p>
          </div>,
          document.body
        )}
    </>
  );
}
