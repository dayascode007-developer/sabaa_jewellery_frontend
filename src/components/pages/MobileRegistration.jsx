"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import sabaaLogo from "@/assets/logo/High Quality Sabaa Logo.webp";
import OtpStep from "@/components/common/OtpStep";
import { googleSendOtp, googleVerifyOtp, googleResendOtp, initializeAuth } from "@/store/slices/authSlice";

const MAROON = "#7B1E2B";

export default function MobileRegistration() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const [googleData, setGoogleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobile, setMobile] = useState("");
  const [touched, setTouched] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  // Parse URL params on mount
  useEffect(() => {
    const status = searchParams.get("status");
    const token = searchParams.get("token");
    const customerId = searchParams.get("customerId");
    const googleId = searchParams.get("googleId");
    const email = searchParams.get("email");
    const name = searchParams.get("name");

    if (status === "existing" && token && customerId) {
      // Auto-login for existing customer - redirect immediately
      localStorage.setItem("authToken", token);
      if (customerId) {
        localStorage.setItem("customerId", customerId);
      }
      // Load customer data into Redux before redirecting
      dispatch(initializeAuth()).then(() => {
        router.replace("/account");
      });
      return;
    } else if (googleId && email) {
      // New customer - show mobile form
      setGoogleData({
        googleId,
        email,
        name: name || "",
      });
      setLoading(false);
    } else {
      // Invalid redirect - go back to login
      router.replace("/");
    }
  }, [searchParams, router]);

  // Validate mobile
  const validateMobile = (value) => {
    const digits = value.replace(/\D/g, "").replace(/^(91|0)/, "");
    return /^[6-9]\d{9}$/.test(digits);
  };

  const isValid = validateMobile(mobile);
  const showError = touched && !isValid && mobile.length > 0;

  const handleMobileChange = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "").slice(0, 10);
    setMobile(value);
    setServerError("");
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setTouched(true);

    if (!isValid) {
      setServerError("Enter a 10-digit mobile number");
      return;
    }

    if (!googleData) return;

    setSubmitting(true);
    setServerError("");

    try {
      const digits = mobile.replace(/\D/g, "").replace(/^(91|0)/, "");
      const result = await dispatch(
        googleSendOtp({
          googleId: googleData.googleId,
          mobile: digits,
          email: googleData.email,
          name: googleData.name,
        })
      );

      if (result.type === googleSendOtp.rejected.type) {
        throw new Error(result.payload || "Failed to send OTP");
      }

      setOtpSent(true);
    } catch (error) {
      setServerError(error.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleVerifyOtp = async ({ code }) => {
    if (!googleData) return;

    const digits = mobile.replace(/\D/g, "").replace(/^(91|0)/, "");
    const result = await dispatch(
      googleVerifyOtp({
        googleId: googleData.googleId,
        mobile: digits,
        otp: code,
      })
    );

    if (result.type === googleVerifyOtp.rejected.type) {
      throw new Error(result.payload || "OTP verification failed");
    }

    // Store token and update Redux state
    if (result.payload?.token) {
      localStorage.setItem("authToken", result.payload.token);
      if (result.payload.customer?.id) {
        localStorage.setItem("customerId", result.payload.customer.id);
      }
      // Wait for Redux state update before redirect
      await dispatch(initializeAuth());
    }
  };

  const handleResendOtp = async () => {
    if (!googleData) return;

    const digits = mobile.replace(/\D/g, "").replace(/^(91|0)/, "");
    const result = await dispatch(
      googleResendOtp({
        googleId: googleData.googleId,
        mobile: digits,
      })
    );

    if (result.type === googleResendOtp.rejected.type) {
      throw new Error(result.payload || "Failed to resend OTP");
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F1F1F1] px-4 py-10">
        <div className="text-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-maroon mx-auto"></div>
          <p className="mt-4 text-gray-600">Processing...</p>
        </div>
      </main>
    );
  }


  if (!googleData) {
    return null;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F1F1F1] px-4 py-10">
      <div className="w-full max-w-[440px] overflow-hidden rounded-xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.10)]">
        {/* Logo */}
        <div className="flex items-center justify-center bg-[#FBF0DE] px-6 py-6">
          <Link href="/" aria-label="Sabaa Jewel Arts — home">
            <Image
              src={sabaaLogo}
              alt="Sabaa Jewel Arts"
              priority
              className="h-14 w-auto"
            />
          </Link>
        </div>

        <div className="px-6 pt-7 pb-8 sm:px-8">
          {!otpSent ? (
            <>
              <h1
                className="text-center font-[family-name:var(--font-heading)] text-[26px] leading-tight sm:text-[32px]"
                style={{ color: MAROON }}
              >
                Complete Registration
              </h1>
              <p className="mx-auto mt-2 max-w-[340px] text-center text-[15px] leading-relaxed text-neutral-600">
                Enter your mobile number to complete your registration with Sabaa
              </p>

              {/* Google User Info */}
              <div className="mt-6 rounded-lg bg-blue-50 p-4">
                <p className="text-sm text-gray-600">Registering as:</p>
                <p className="mt-1 font-medium text-gray-900">{googleData.email}</p>
                {googleData.name && (
                  <p className="text-sm text-gray-600">({googleData.name})</p>
                )}
              </div>

              {/* Mobile Input Form */}
              <form onSubmit={handleSendOtp} noValidate className="mt-6 space-y-4">
                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                    Enter your 10-digit mobile number
                  </label>
                  <input
                    id="mobile"
                    type="text"
                    inputMode="numeric"
                    placeholder="10-digit mobile number"
                    value={mobile}
                    onChange={handleMobileChange}
                    onBlur={() => setTouched(true)}
                    aria-invalid={showError ? "true" : undefined}
                    aria-describedby={showError ? "mobile-error" : undefined}
                    className={`w-full rounded-md border px-4 py-3 text-[15px] text-gray-800 outline-none transition-colors placeholder:text-gray-400 ${
                      showError
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-[#7B1E2B]"
                    }`}
                    maxLength="10"
                    disabled={submitting}
                  />
                  {showError && (
                    <p id="mobile-error" className="mt-1.5 text-sm text-red-600">
                      Enter a 10-digit mobile number
                    </p>
                  )}
                </div>

                {serverError && (
                  <p role="alert" className="text-sm text-red-600">
                    {serverError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={!isValid || submitting}
                  className="w-full rounded-md py-3 text-[15px] font-medium text-white transition-opacity disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: !isValid || submitting ? "#CFA9B0" : MAROON,
                  }}
                >
                  {submitting ? "Sending OTP…" : "Send OTP to Mobile"}
                </button>
              </form>
            </>
          ) : (
            <OtpStep
              identifier={mobile}
              onVerify={handleVerifyOtp}
              onVerified={() => {
                router.push("/account");
              }}
              onResend={handleResendOtp}
              onBack={() => setOtpSent(false)}
              backLabel="Use a different mobile number"
            />
          )}
        </div>
      </div>
    </main>
  );
}
