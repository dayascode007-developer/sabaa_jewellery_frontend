"use client";

import { useEffect, useState } from "react";
import { COMPANY_INFO } from "@/constants/footerData";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// wa.me rejects spaces and the leading +, and wants the country code. A plain
// 10-digit Indian number gets 91 prefixed; anything already carrying a country
// code is just stripped down to digits.
const toWhatsappNumber = (phone) => {
  const digits = String(phone || "").replace(/\D/g, "");
  if (!digits) return "";
  return digits.length === 10 ? `91${digits}` : digits;
};

// Store details the admin panel owns (Settings → General Information). The
// constants in footerData stay as the fallback, so the footer renders correctly
// on the server, while the API is unreachable, and before the fetch resolves.
// Updating after mount avoids a hydration mismatch: the first client render
// matches the server's.
export default function useStoreSettings() {
  const [info, setInfo] = useState(COMPANY_INFO);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const response = await fetch(`${API_URL}/api/settings/store`);
        if (!response.ok) return;

        const body = await response.json();
        const data = body?.data;
        if (!data || cancelled) return;

        const addressLines = [
          data.storeName ? `${data.storeName}.` : null,
          ...String(data.address || "").split("\n"),
        ]
          .map((line) => (line || "").trim())
          .filter(Boolean);

        setInfo({
          ...COMPANY_INFO,
          address: addressLines.length ? addressLines : COMPANY_INFO.address,
          mobileLabel: data.contactNumber
            ? `Mobile : ${data.contactNumber}`
            : COMPANY_INFO.mobileLabel,
          email: data.storeEmail || COMPANY_INFO.email,
          phone: data.contactNumber || COMPANY_INFO.phone,
          whatsapp: toWhatsappNumber(data.contactNumber) || COMPANY_INFO.whatsapp,
        });
      } catch {
        // Network failure: keep the constants already in state.
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return info;
}
