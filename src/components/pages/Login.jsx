"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import sabaaLogo from "@/assets/logo/High Quality Sabaa Logo.webp";
import captchaIcon from "@/assets/svg_nav_icon/recaptcha-icon 1.svg";
import OtpStep from "@/components/common/OtpStep";

const MAROON = "#7B1E2B";
const GOLD = "#C9A227";

// One field accepts either form, so work out which was given before validating.
function readIdentifier(raw) {
  const value = raw.trim();
  if (!value) return { kind: "empty" };

  if (value.includes("@")) {
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
    return { kind: "email", ok, value: value.toLowerCase() };
  }

  // Indian mobile: 10 digits starting 6-9, with an optional +91 or 0.
  const digits = value.replace(/\D/g, "").replace(/^(91|0)/, "");
  return { kind: "mobile", ok: /^[6-9]\d{9}$/.test(digits), value: digits };
}

/**
 * Login form. UI only.
 *
 * ── HANDOFF ──────────────────────────────────────────────────────────────
 *   <Login
 *     onRequestOtp={async ({ kind, value }) => { … }}   // kind: "email" | "mobile"
 *     onVerifyOtp={async ({ code }) => { … }}           // 6 digits; redirect on success
 *     onGoogleLogin={() => { … }}
 *   />
 *
 * For a mobile the value is already stripped to 10 digits; for an email it is
 * lowercased. Throw an Error to show its message above the button.
 * onRequestOtp is reused for "Resend code" on the second step.
 *
 * The "I'm not a robot" box below is a PLACEHOLDER, not reCAPTCHA — see the
 * comment on it. Swap in the real widget once you have a site key.
 * ─────────────────────────────────────────────────────────────────────────
 */
export default function Login({
  onRequestOtp,
  onVerifyOtp,
  onResend,
  onGoogleLogin,
  embedded = false,
  onSwitchToSignUp,
  onDone,
}) {
  const [identifier, setIdentifier] = useState("");
  const [touched, setTouched] = useState(false);
  const [notRobot, setNotRobot] = useState(false);
  // Spins the captcha mark for a moment after ticking, the way a real widget
  // shows it is working before it settles.
  const [checking, setChecking] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [sent, setSent] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const router = useRouter();

  // ── TEMPORARY ──────────────────────────────────────────────────────────
  // With no API wired, any 6-digit code is accepted so the flow can be walked
  // through. This whole effect goes away once onVerifyOtp is passed in — the
  // real handler should establish the session and redirect itself.
  useEffect(() => {
    if (!signedIn) return;
    const id = window.setTimeout(() => {
      // In the modal there is nowhere to go — the page behind is already the
      // page they wanted. On the standalone route, send them home.
      if (onDone) onDone();
      else router.push("/");
    }, 1600);
    return () => window.clearTimeout(id);
  }, [signedIn, router, onDone]);

  const parsed = readIdentifier(identifier);
  const error =
    parsed.kind === "empty"
      ? "Please enter your email address or mobile number"
      : parsed.ok
        ? ""
        : parsed.kind === "email"
          ? "That does not look like an email address"
          : "Enter a 10-digit mobile number";

  const canSubmit = !error && notRobot && !submitting;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);
    if (!canSubmit) return;

    if (!onRequestOtp) {
      // No API wired yet — the form is valid and stops here.
      setSent(true);
      return;
    }

    setSubmitting(true);
    setServerError("");
    try {
      await onRequestOtp({ kind: parsed.kind, value: parsed.value });
      setSent(true);
    } catch (err) {
      setServerError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const showError = touched && error;

  // Built once, used two ways: on its own route it gets the page wrapper below,
  // and inside AuthModal it is dropped straight into the dialog.
  const card = (
    <>
        {/* Logo band */}
        <div className="flex items-center justify-center bg-[#FBF0DE] px-6 py-6">
          <Link href="/" aria-label="Sabaa Jewel Arts — home">
            <Image src={sabaaLogo} alt="Sabaa Jewel Arts" priority className="h-14 w-auto" />
          </Link>
        </div>

        <div className="px-6 pt-7 pb-8 sm:px-8">
          {signedIn ? (
            <div className="py-4 text-center">
              <span
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
                style={{ backgroundColor: "#E8F6ED", color: "#1E7A45" }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m5 12.5 4.5 4.5L19 7.5" />
                </svg>
              </span>

              <h1
                className="mt-4 font-[family-name:var(--font-heading)] text-[24px] leading-tight sm:text-[28px]"
                style={{ color: MAROON }}
              >
                Login successful
              </h1>
              <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">
                Taking you to the home page&hellip;
              </p>

              <button
                type="button"
                onClick={() => {
                  onDone?.();
                  router.push("/");
                }}
                className="mt-5 inline-block text-[14px] font-medium underline underline-offset-2"
                style={{ color: MAROON, textDecorationColor: GOLD }}
              >
                Go now
              </button>
            </div>
          ) : sent ? (
            <OtpStep
              identifier={identifier.trim()}
              onVerify={onVerifyOtp}
              onVerified={() => setSignedIn(true)}
              onResend={
                onResend
                  ? onResend
                  : onRequestOtp
                  ? () => onRequestOtp({ kind: parsed.kind, value: parsed.value })
                  : undefined
              }
              onBack={() => setSent(false)}
            />
          ) : (
            <>
              <h1
                className="text-center font-[family-name:var(--font-heading)] text-[26px] leading-tight sm:text-[32px]"
                style={{ color: MAROON }}
              >
                Login to Sabaa
              </h1>
              <p className="mx-auto mt-2 max-w-[340px] text-center text-[15px] leading-relaxed text-neutral-600">
                Login with your email address or mobile number to get the coupons
                associated with your account.
              </p>

              <form onSubmit={handleSubmit} noValidate className="mt-6">
                <label htmlFor="identifier" className="sr-only">
                  Email address or phone number
                </label>
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  autoComplete="username"
                  placeholder="Email address or Phone Number*"
                  value={identifier}
                  onChange={(e) => {
                    const v = e.target.value;
                    // Digits only means they are typing a number, so cap it at
                    // 10. An email is left alone — it needs the length.
                    setIdentifier(/^\d*$/.test(v) ? v.slice(0, 10) : v);
                    setServerError("");
                  }}
                  onBlur={() => setTouched(true)}
                  aria-invalid={showError ? "true" : undefined}
                  aria-describedby={showError ? "identifier-error" : undefined}
                  className={`w-full rounded-md border px-4 py-3 text-[15px] text-neutral-800 outline-none transition-colors placeholder:text-neutral-400 ${
                    showError
                      ? "border-[#C0392B] focus:border-[#C0392B]"
                      : "border-neutral-300 focus:border-[#7B1E2B]"
                  }`}
                />
                {showError ? (
                  <p id="identifier-error" className="mt-1.5 text-[12px] text-[#C0392B]">
                    {error}
                  </p>
                ) : null}

                {/* PLACEHOLDER — this is NOT reCAPTCHA and verifies nothing. It
                    is a stand-in so the layout is right; deliberately carries no
                    Google branding, because showing the reCAPTCHA mark where no
                    reCAPTCHA runs would tell visitors something untrue.
                    Replace this whole block with the real widget once you have a
                    site key, and verify the token server-side. */}
                <div className="mt-5 flex items-center gap-3 rounded-md border border-neutral-300 bg-[#F9F9F9] px-4 py-4">
                  <input
                    id="not-robot"
                    type="checkbox"
                    checked={notRobot}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setNotRobot(checked);
                      setChecking(checked);
                      // Long enough to read as "checking", short enough not to
                      // hold up someone who wants to log in.
                      if (checked) setTimeout(() => setChecking(false), 1200);
                    }}
                    className="h-6 w-6 shrink-0 accent-[#7B1E2B]"
                  />
                  <label htmlFor="not-robot" className="text-[14px] text-neutral-700">
                    I&apos;m not a robot
                  </label>
                  <Image
                    src={captchaIcon}
                    alt=""
                    aria-hidden="true"
                    width={32}
                    height={32}
                    className={`ml-auto h-8 w-8 shrink-0 object-contain ${
                      checking ? "animate-spin" : ""
                    }`}
                  />
                </div>

                {serverError ? (
                  <p role="alert" className="mt-3 text-[13px] text-[#C0392B]">
                    {serverError}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="mt-5 w-full rounded-md py-3 text-[15px] font-medium text-white transition-opacity disabled:cursor-not-allowed"
                  style={{ backgroundColor: canSubmit ? MAROON : "#CFA9B0" }}
                >
                  {submitting ? "Sending code…" : "Login with OTP"}
                </button>
              </form>

              {/* or Login with */}
              <div className="mt-6 flex items-center gap-3">
                <span className="h-px flex-1 bg-neutral-200" />
                <span className="text-[13px] text-neutral-500">or Login with</span>
                <span className="h-px flex-1 bg-neutral-200" />
              </div>

              <div className="mt-4 flex justify-center">
                <button
                  type="button"
                  onClick={onGoogleLogin}
                  className="inline-flex items-center gap-2.5 rounded-md border border-neutral-300 bg-white px-6 py-2.5 text-[15px] font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
                >
                  <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
                    <path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-2.8-.4-4H24v7.3h12.1c-.2 2-1.6 5-4.5 7l6.9 5.4c4.1-3.8 6.6-9.4 6.6-15.7Z" />
                    <path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.3l-6.9-5.4c-1.9 1.3-4.4 2.2-7.6 2.2-5.8 0-10.7-3.8-12.5-9.1l-7.1 5.5C8 41.4 15.4 46 24 46Z" />
                    <path fill="#FBBC05" d="M11.5 28.4c-.5-1.4-.7-2.9-.7-4.4s.3-3 .7-4.4l-7.1-5.5A22 22 0 0 0 2 24c0 3.5.8 6.9 2.4 9.9l7.1-5.5Z" />
                    <path fill="#EA4335" d="M24 9.5c4.1 0 6.9 1.8 8.5 3.3l6.2-6C34.9 3.4 29.9 1 24 1 15.4 1 8 5.6 4.4 14.1l7.1 5.5C13.3 14.3 18.2 9.5 24 9.5Z" />
                  </svg>
                  Google
                </button>
              </div>

              <p className="mt-6 text-center text-[14px] text-neutral-700">
                New User?{" "}
                {/* Inside the modal this swaps the panel; on the standalone
                    route there is nowhere to swap to, so it navigates. */}
                {onSwitchToSignUp ? (
                  <button
                    type="button"
                    onClick={onSwitchToSignUp}
                    className="font-medium underline underline-offset-2"
                    style={{ color: MAROON, textDecorationColor: GOLD }}
                  >
                    Sign Up
                  </button>
                ) : (
                  <Link
                    href="/signup"
                    className="font-medium underline underline-offset-2"
                    style={{ color: MAROON, textDecorationColor: GOLD }}
                  >
                    Sign Up
                  </Link>
                )}
              </p>
            </>
          )}
        </div>
    </>
  );

  if (embedded) return card;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F1F1F1] px-4 py-10">
      <div className="w-full max-w-[440px] overflow-hidden rounded-xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.10)]">
        {card}
      </div>
    </main>
  );
}
