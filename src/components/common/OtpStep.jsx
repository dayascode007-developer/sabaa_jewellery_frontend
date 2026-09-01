"use client";

import { useEffect, useRef, useState } from "react";

const MAROON = "#7B1E2B";
const GOLD = "#C9A227";

const LENGTH = 6;
const RESEND_SECONDS = 30;

/**
 * The code-entry step. UI only. Shared by login and signup.
 *
 * onVerify({ code })  — throw an Error to show its message under the boxes
 * onVerified()        — called after a successful verify, for whatever is next
 * onResend()          — re-requests the code; the timer restarts either way
 * onBack()            — return to the previous step
 * backLabel           — wording of the back link
 */
export default function OtpStep({
  identifier,
  onVerify,
  onVerified,
  onResend,
  onBack,
  backLabel = "Use a different email or number",
}) {
  const [digits, setDigits] = useState(Array(LENGTH).fill(""));
  const [error, setError] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [seconds, setSeconds] = useState(RESEND_SECONDS);
  const inputs = useRef([]);

  const code = digits.join("");
  const complete = code.length === LENGTH;

  // Focus the first box on arrival so the code can be typed straight away.
  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  // Resend countdown. The guard is inside the effect so the interval is only
  // created while it is actually counting.
  useEffect(() => {
    if (seconds <= 0) return;
    const id = window.setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => window.clearInterval(id);
  }, [seconds]);

  const focusBox = (i) => inputs.current[i]?.focus();

  const setDigit = (i, value) => {
    const typed = value.replace(/\D/g, "");
    if (!typed) {
      setDigits((d) => d.map((x, n) => (n === i ? "" : x)));
      return;
    }

    // Typing into a box, or a paste that landed in one — spread it forward.
    setDigits((d) => {
      const next = [...d];
      for (let n = 0; n < typed.length && i + n < LENGTH; n++) {
        next[i + n] = typed[n];
      }
      return next;
    });
    setError("");
    focusBox(Math.min(i + typed.length, LENGTH - 1));
  };

  const onKeyDown = (i) => (e) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      e.preventDefault();
      setDigits((d) => d.map((x, n) => (n === i - 1 ? "" : x)));
      focusBox(i - 1);
    }
    if (e.key === "ArrowLeft" && i > 0) focusBox(i - 1);
    if (e.key === "ArrowRight" && i < LENGTH - 1) focusBox(i + 1);
  };

  const onPaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, LENGTH);
    if (!pasted) return;
    e.preventDefault();
    setDigits(Array.from({ length: LENGTH }, (_, n) => pasted[n] ?? ""));
    setError("");
    focusBox(Math.min(pasted.length, LENGTH - 1));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!complete || verifying) return;

    if (!onVerify) {
      // No API wired yet — a full code is accepted so the flow can be walked
      // through end to end.
      setError("");
      onVerified?.();
      return;
    }

    setVerifying(true);
    setError("");
    try {
      await onVerify({ code });
      onVerified?.();
    } catch (err) {
      setError(err?.message || "That code is not right. Please check and try again.");
      setDigits(Array(LENGTH).fill(""));
      focusBox(0);
    } finally {
      setVerifying(false);
    }
  };

  const resend = async () => {
    setDigits(Array(LENGTH).fill(""));
    setError("");
    setSeconds(RESEND_SECONDS);
    focusBox(0);
    if (onResend) {
      try {
        await onResend();
      } catch (err) {
        setError(err?.message || "Could not resend the code. Please try again.");
      }
    }
  };

  return (
    <div className="text-center">
      <span
        className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
        style={{ backgroundColor: "#FDF0F2", color: MAROON }}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="2.5" y="5" width="19" height="14" rx="2" />
          <path d="m3.5 6.5 8.5 6 8.5-6" />
        </svg>
      </span>

      <h1
        className="mt-4 font-[family-name:var(--font-heading)] text-[24px] leading-tight sm:text-[28px]"
        style={{ color: MAROON }}
      >
        Enter the code
      </h1>
      <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">
        We sent a {LENGTH}-digit code to{" "}
        <span className="font-medium text-neutral-800">{identifier}</span>
      </p>

      <form onSubmit={submit} className="mt-6">
        {/* One box per digit. onPaste sits on the wrapper so a code pasted
            anywhere in the row fills the whole thing. */}
        <div className="flex justify-center gap-2 sm:gap-2.5" onPaste={onPaste}>
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                inputs.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              autoComplete={i === 0 ? "one-time-code" : "off"}
              maxLength={LENGTH}
              value={digit}
              onChange={(e) => setDigit(i, e.target.value)}
              onKeyDown={onKeyDown(i)}
              onFocus={(e) => e.target.select()}
              aria-label={`Digit ${i + 1} of ${LENGTH}`}
              className={`h-12 w-11 rounded-md border text-center text-[20px] font-medium text-neutral-800 outline-none transition-colors sm:h-14 sm:w-12 ${
                error
                  ? "border-[#C0392B] focus:border-[#C0392B]"
                  : digit
                    ? "border-[#7B1E2B]"
                    : "border-neutral-300 focus:border-[#7B1E2B]"
              }`}
            />
          ))}
        </div>

        {error ? (
          <p role="alert" className="mt-3 text-[13px] text-[#C0392B]">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={!complete || verifying}
          className="mt-6 w-full rounded-md py-3 text-[15px] font-medium text-white transition-opacity disabled:cursor-not-allowed"
          style={{ backgroundColor: complete && !verifying ? MAROON : "#CFA9B0" }}
        >
          {verifying ? "Verifying…" : "Verify & Login"}
        </button>
      </form>

      <p className="mt-4 text-[14px] text-neutral-600">
        {seconds > 0 ? (
          <>
            Resend code in{" "}
            <span className="font-medium tabular-nums text-neutral-800">
              0:{String(seconds).padStart(2, "0")}
            </span>
          </>
        ) : (
          <button
            type="button"
            onClick={resend}
            className="font-medium underline underline-offset-2"
            style={{ color: MAROON, textDecorationColor: GOLD }}
          >
            Resend code
          </button>
        )}
      </p>

      <button
        type="button"
        onClick={onBack}
        className="mt-4 text-[14px] font-medium underline underline-offset-2"
        style={{ color: MAROON, textDecorationColor: GOLD }}
      >
        {backLabel}
      </button>
    </div>
  );
}
