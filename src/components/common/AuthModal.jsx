"use client";

import { useCallback, useEffect, useState } from "react";
import Login from "@/components/pages/Login";
import SignUp from "@/components/pages/SignUp";

/**
 * Login / signup as a dialog over whatever page the visitor is on, so they are
 * not taken away from it. The routes /login and /signup still exist for direct
 * links — the same components render both ways.
 */
export default function AuthModal({ open, initialView = "login", onClose }) {
  const [view, setView] = useState(initialView);

  const close = useCallback(() => onClose?.(), [onClose]);

  // Reopening should always start from whichever view the trigger asked for,
  // not from wherever the visitor left off last time.
  useEffect(() => {
    if (open) setView(initialView);
  }, [open, initialView]);

  // The `!open` guard sits INSIDE the effect: hooks run unconditionally, so
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

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={view === "login" ? "Login" : "Sign up"}
      onClick={close}
      // Dimmed and lightly blurred, so the shop stays visible behind the card
      // and it reads as a layer over the page rather than a new screen.
      className="fixed inset-0 z-[95] flex items-start justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm sm:items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative my-auto w-full max-w-[440px] overflow-hidden rounded-xl bg-white shadow-[0_24px_70px_rgba(0,0,0,0.35)]"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-black/5 hover:text-neutral-800"
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

        {view === "login" ? (
          <Login
            embedded
            onSwitchToSignUp={() => setView("signup")}
            onDone={close}
          />
        ) : (
          <SignUp embedded onSwitchToLogin={() => setView("login")} onDone={close} />
        )}
      </div>
    </div>
  );
}
