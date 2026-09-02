"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import sabaaLogo from "@/assets/logo/High Quality Sabaa Logo.webp";
import OtpStep from "@/components/common/OtpStep";
import { signup, resendOtp, verifyOtp, clearError } from "@/store/slices/authSlice";

const MAROON = "#7B1E2B";
const GOLD = "#C9A227";

// Password and confirm-password are deliberately absent — this form collects
// identity only. If the API later needs a password, add the fields here and to
// validate() together; nothing else has to change.
const FIELDS = [
  { name: "name", label: "Name", type: "text", autoComplete: "name", inputMode: "text" },
  { name: "email", label: "Email address", type: "email", autoComplete: "email", inputMode: "email" },
  { name: "mobile", label: "Mobile number", type: "tel", autoComplete: "tel", inputMode: "numeric", maxLength: 10 },
];

const EMPTY = { name: "", email: "", mobile: "" };

// Client-side only. The server must validate again — a browser check stops
// typos, not bad actors.
function validate(values) {
  const errors = {};

  if (!values.name.trim()) errors.name = "Please enter your name";
  else if (values.name.trim().length < 2) errors.name = "That name looks too short";

  if (!values.email.trim()) errors.email = "Please enter your email address";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = "That does not look like an email address";

  // Indian mobile numbers: 10 digits starting 6-9, with an optional +91 or 0.
  const digits = values.mobile.replace(/\D/g, "").replace(/^(91|0)/, "");
  if (!values.mobile.trim()) errors.mobile = "Please enter your mobile number";
  else if (!/^[6-9]\d{9}$/.test(digits))
    errors.mobile = "Enter a 10-digit mobile number";

  return errors;
}

/**
 * Sign-up form. UI only.
 *
 * Three steps: form → OTP sent to the mobile number → done.
 *
 * ── HANDOFF ──────────────────────────────────────────────────────────────
 *   <SignUp
 *     onSubmit={async ({ name, email, mobile }) => { … }}  // register + send OTP
 *     onResendOtp={async ({ mobile }) => { … }}            // send it again
 *     onVerifyOtp={async ({ code, mobile }) => { … }}      // confirm the number
 *   />
 *
 * `mobile` is already stripped to 10 digits and `email` lowercased. Throw an
 * Error from any of them to show its message in place.
 * If onResendOtp is omitted, "Resend code" falls back to onSubmit.
 * ─────────────────────────────────────────────────────────────────────────
 */
export default function SignUp({
  onSubmit,
  onResendOtp,
  onVerifyOtp,
  embedded = false,
  onSwitchToLogin,
  onDone,
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error, otpSent, identifier, customer, token } = useSelector(
    (state) => state.auth
  );

  // Closes the dialog as well as navigating. A plain link to "/" did nothing
  // visible when the visitor was already on the home page — the route did not
  // change and the dialog stayed open on top of it.
  const goHome = () => {
    onDone?.();
    router.push("/");
  };
  const [values, setValues] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [agreed, setAgreed] = useState(false);
  // "form" → "otp" → "done"
  const [step, setStep] = useState("form");

  const errors = validate(values);
  const canSubmit = agreed && Object.keys(errors).length === 0 && !loading;

  const setField = (name) => (e) => {
    let value = e.target.value;

    // Name field: capitalize first letter
    if (name === "name" && value.length > 0) {
      value = value.charAt(0).toUpperCase() + value.slice(1);
    }

    // Mobile field: only allow digits
    if (name === "mobile") {
      value = value.replace(/\D/g, "");
    }

    setValues((v) => ({ ...v, [name]: value }));
    setServerError("");
  };

  const markTouched = (name) => () => setTouched((t) => ({ ...t, [name]: true }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Reveal every error at once if they submit early.
    setTouched({ name: true, email: true, mobile: true });
    if (!canSubmit) return;

    const payload = {
      name: values.name.trim(),
      email: values.email.trim().toLowerCase(),
      mobile: values.mobile.replace(/\D/g, "").replace(/^(91|0)/, ""),
      terms_agreed: agreed,
    };

    try {
      const result = await dispatch(signup(payload));
      if (result.type === signup.fulfilled.type) {
        setStep("otp");
      }
    } catch (err) {
      // Error is handled by Redux
    }
  };

  // Stripped to the 10 digits the API and the OTP step both want.
  const mobile = identifier || values.mobile.replace(/\D/g, "").replace(/^(91|0)/, "");

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
          {step === "otp" ? (
            <OtpStep
              identifier={mobile}
              onVerify={({ code }) =>
                dispatch(verifyOtp({ mobile, otp: code }))
                  .then((result) => {
                    if (result.type === verifyOtp.fulfilled.type) {
                      return;
                    }
                    throw new Error(result.payload || "Verification failed");
                  })
              }
              onResend={() => dispatch(resendOtp({ mobile }))}
              onVerified={() => {
                setStep("done");
                setTimeout(() => goHome(), 1600);
              }}
              onBack={() => setStep("form")}
              backLabel="Change my details"
            />
          ) : step === "done" ? (
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
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m5 12.5 4.5 4.5L19 7.5" />
                </svg>
              </span>
              <h1
                className="mt-4 font-[family-name:var(--font-heading)] text-[26px] leading-tight"
                style={{ color: MAROON }}
              >
                You&apos;re signed up
              </h1>
              <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">
                We&apos;ll send your coupons and offers to{" "}
                <span className="font-medium text-neutral-800">{values.email.trim()}</span>.
              </p>
              <button
                type="button"
                onClick={goHome}
                className="mt-6 inline-block rounded-md px-6 py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: MAROON }}
              >
                Start shopping
              </button>
            </div>
          ) : (
            <>
              <h1
                className="text-center font-[family-name:var(--font-heading)] text-[26px] leading-tight sm:text-[32px]"
                style={{ color: MAROON }}
              >
                Sign Up
              </h1>
              <p className="mx-auto mt-2 max-w-[320px] text-center text-[15px] leading-relaxed text-neutral-600">
                Sign up with Sabaa to get exciting coupons and offers!
              </p>

              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
                {FIELDS.map((field) => {
                  const invalid = touched[field.name] && errors[field.name];
                  return (
                    <div key={field.name}>
                      {/* Label is visually hidden — the design uses placeholders,
                          but a screen reader still needs the field named. */}
                      <label htmlFor={field.name} className="sr-only">
                        {field.label}
                      </label>
                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        inputMode={field.inputMode}
                        maxLength={field.maxLength}
                        autoComplete={field.autoComplete}
                        placeholder={`${field.label}*`}
                        value={values[field.name]}
                        onChange={setField(field.name)}
                        onBlur={markTouched(field.name)}
                        aria-invalid={invalid ? "true" : undefined}
                        aria-describedby={invalid ? `${field.name}-error` : undefined}
                        className={`w-full rounded-md border px-4 py-3 text-[15px] text-neutral-800 outline-none transition-colors placeholder:text-neutral-400 ${
                          invalid
                            ? "border-[#C0392B] focus:border-[#C0392B]"
                            : "border-neutral-300 focus:border-[#7B1E2B]"
                        }`}
                      />
                      {invalid ? (
                        <p id={`${field.name}-error`} className="mt-1.5 text-[12px] text-[#C0392B]">
                          {errors[field.name]}
                        </p>
                      ) : null}
                    </div>
                  );
                })}

                <label className="flex items-start gap-2.5 pt-1 text-[14px] text-neutral-700">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[#7B1E2B]"
                  />
                  <span>
                    I agree to{" "}
                    <Link
                      href="/policy#terms"
                      className="font-medium underline underline-offset-2"
                      style={{ color: MAROON, textDecorationColor: GOLD }}
                    >
                      Terms and Conditions
                    </Link>
                  </span>
                </label>

                {error ? (
                  <p role="alert" className="text-[13px] text-[#C0392B]">
                    {error}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={!canSubmit || loading}
                  // Muted until the form is valid and the terms are ticked, so
                  // the button itself shows what is still missing.
                  className="w-full rounded-md py-3 text-[15px] font-medium text-white transition-opacity disabled:cursor-not-allowed"
                  style={{ backgroundColor: canSubmit && !loading ? MAROON : "#CFA9B0" }}
                >
                  {loading ? "Signing up…" : "Sign Up"}
                </button>
              </form>

              <p className="mt-5 text-center text-[14px] text-neutral-700">
                Already have an account?{" "}
                {/* Inside the modal this swaps the panel; on the standalone
                    route there is nowhere to swap to, so it navigates. */}
                {onSwitchToLogin ? (
                  <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="font-medium underline underline-offset-2"
                    style={{ color: MAROON, textDecorationColor: GOLD }}
                  >
                    Login
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="font-medium underline underline-offset-2"
                    style={{ color: MAROON, textDecorationColor: GOLD }}
                  >
                    Login
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
