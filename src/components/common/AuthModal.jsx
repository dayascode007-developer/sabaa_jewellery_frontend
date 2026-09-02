"use client";

import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Login from "@/components/pages/Login";
import SignUp from "@/components/pages/SignUp";
import { login, resendLoginOtp, verifyLoginOtp } from "@/store/slices/authSlice";

/**
 * Login / signup as a dialog over whatever page the visitor is on, so they are
 * not taken away from it. The routes /login and /signup still exist for direct
 * links — the same components render both ways.
 */
export default function AuthModal({ open, initialView = "login", onClose }) {
  const [view, setView] = useState(initialView);
  const dispatch = useDispatch();
  const { identifier } = useSelector((state) => state.auth);

  const close = useCallback(() => onClose?.(), [onClose]);

  // Redux login handlers
  const handleLoginRequest = useCallback(
    async ({ value }) => {
      const result = await dispatch(login({ emailOrPhone: value, recaptchaToken: "placeholder" }));
      if (result.type === login.rejected.type) {
        // Map backend errors to user-friendly messages
        const errorMessage = result.payload;
        let userMessage = "Login failed";

        if (errorMessage?.includes("not found") || errorMessage?.includes("404")) {
          userMessage = "Please enter a valid email or phone number and sign up first";
        } else if (errorMessage?.includes("invalid") || errorMessage?.includes("Invalid")) {
          userMessage = "Please enter a valid email or phone number";
        } else if (errorMessage?.includes("network") || errorMessage?.includes("Network")) {
          userMessage = "Network error. Please check your connection and try again";
        } else {
          userMessage = errorMessage || "Login failed. Please try again";
        }

        throw new Error(userMessage);
      }
    },
    [dispatch]
  );

  const handleVerifyLoginOtp = useCallback(
    async ({ code }) => {
      const result = await dispatch(verifyLoginOtp({ emailOrPhone: identifier, otp: code }));
      if (result.type === verifyLoginOtp.rejected.type) {
        // Map backend errors to user-friendly messages
        const errorMessage = result.payload;
        let userMessage = "Verification failed";

        if (errorMessage?.includes("invalid") || errorMessage?.includes("Invalid") || errorMessage?.includes("incorrect")) {
          userMessage = "Incorrect OTP. Please check and try again";
        } else if (errorMessage?.includes("expired") || errorMessage?.includes("Expired")) {
          userMessage = "OTP has expired. Please request a new code";
        } else if (errorMessage?.includes("maximum") || errorMessage?.includes("Maximum")) {
          userMessage = "Too many failed attempts. Please request a new code";
        } else {
          userMessage = errorMessage || "Verification failed. Please try again";
        }

        throw new Error(userMessage);
      }
    },
    [dispatch, identifier]
  );

  const handleResendLoginOtp = useCallback(async () => {
    const result = await dispatch(resendLoginOtp({ emailOrPhone: identifier }));
    if (result.type === resendLoginOtp.rejected.type) {
      // Map backend errors to user-friendly messages
      const errorMessage = result.payload;
      let userMessage = "Failed to send OTP";

      if (errorMessage?.includes("rate limit") || errorMessage?.includes("Rate limit")) {
        userMessage = "Please wait before requesting another code";
      } else if (errorMessage?.includes("not found") || errorMessage?.includes("404")) {
        userMessage = "Account not found. Please sign up first";
      } else {
        userMessage = errorMessage || "Failed to send OTP. Please try again";
      }

      throw new Error(userMessage);
    }
  }, [dispatch, identifier]);

  const handleGoogleLogin = useCallback(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    window.location.href = `${apiUrl}/auth/google`;
  }, []);

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
            onRequestOtp={handleLoginRequest}
            onVerifyOtp={handleVerifyLoginOtp}
            onResend={handleResendLoginOtp}
            onGoogleLogin={handleGoogleLogin}
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
