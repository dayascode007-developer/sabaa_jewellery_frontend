"use client";

import { useState } from "react";
import { FAQS } from "@/constants/aboutData";

const MAROON = "#7B1E2B";

export default function FaqAccordion({ faqs = FAQS }) {
  // First question starts open so the section never reads as an empty list.
  const [openId, setOpenId] = useState(faqs[0]?.id ?? null);

  return (
    <div className="mx-auto mt-7 max-w-[900px] divide-y divide-[#EFDCD4] overflow-hidden rounded-lg border border-[#EFDCD4] bg-white">
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div key={faq.id}>
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : faq.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition-colors hover:bg-[#FDF8F5] sm:px-5"
            >
              <span className="text-[16px] font-medium" style={{ color: MAROON }}>
                {faq.q}
              </span>
              <svg
                viewBox="0 0 24 24"
                className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
                style={{ color: MAROON }}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {isOpen ? (
              <p className="px-4 pb-4 text-[16px] leading-relaxed text-neutral-600 sm:px-5">
                {faq.a}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
