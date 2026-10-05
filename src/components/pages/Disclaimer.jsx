"use client";

import { DISCLAIMER_CONTENT } from "@/constants/disclaimerData";

const MAROON = "#7B1E2B";

function SectionHead({ title, children }) {
  return (
    <div className="text-center">
      <h2
        className="mt-2 font-[family-name:var(--font-heading)] text-[26px] leading-tight sm:text-[32px] lg:text-[40px]"
        style={{ color: MAROON }}
      >
        {title}
      </h2>

      <div className="mt-2 flex items-center justify-center gap-2">
        <span className="h-px w-14 bg-[#E0CDBA]" />
        <span className="text-[10px]" style={{ color: MAROON }} aria-hidden="true">
          &#10050;
        </span>
        <span className="h-px w-14 bg-[#E0CDBA]" />
      </div>

      {children ? (
        <p className="mx-auto mt-3 max-w-[760px] text-[16px] leading-relaxed text-neutral-600">
          {children}
        </p>
      ) : null}
    </div>
  );
}

export default function Disclaimer() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-12 sm:px-6 sm:py-16">
      <SectionHead title={DISCLAIMER_CONTENT.title}>
        {DISCLAIMER_CONTENT.description}
      </SectionHead>

      <div className="mt-12 space-y-8">
        {DISCLAIMER_CONTENT.sections.map((section) => (
          <section key={section.id} className="rounded-lg border border-[#EFDCD4] bg-white p-6">
            <h3
              className="font-[family-name:var(--font-heading)] text-[20px] font-semibold leading-tight"
              style={{ color: MAROON }}
            >
              {section.title}
            </h3>

            <p className="mt-3 leading-relaxed text-neutral-700">
              {section.content}
            </p>

            {section.points && (
              <ul className="mt-3 space-y-2 ml-6">
                {section.points.map((point, idx) => (
                  <li key={idx} className="list-disc text-neutral-700">
                    {point}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
