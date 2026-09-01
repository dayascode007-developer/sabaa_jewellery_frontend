// The accordion is reused from the About page rather than duplicated. If you
// want it somewhere neutral later, components/common/ is the natural home.
import FaqAccordion from "@/components/pages/about/FaqAccordion";
import {
  POLICY_SECTIONS,
  POLICY_UPDATED,
  POLICY_FAQS,
  POLICY_BLOCKS,
  COOKIE_POLICY,
} from "@/constants/policyData";

const MAROON = "#7B1E2B";
const GOLD = "#C9A227";

// The same ornament lockup the home and About sections use.
function SectionHead({ eyebrow, title, children }) {
  return (
    <div className="text-center">
      {eyebrow ? (
        <p
          className="flex items-center justify-center gap-2 text-[11px] font-medium tracking-[0.2em] uppercase"
          style={{ color: MAROON }}
        >
          <span aria-hidden="true">&#10022;&mdash;</span>
          {eyebrow}
          <span aria-hidden="true">&mdash;&#10022;</span>
        </p>
      ) : null}

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

// Numbered clause list — the same shape for every policy, so the page reads
// consistently from top to bottom.
function ClauseList({ blocks }) {
  return (
    <ol className="mx-auto mt-8 max-w-[900px] space-y-4">
      {blocks.map((block, i) => (
        <li
          key={block.id}
          className="rounded-lg border border-[#EFDCD4] bg-white p-5"
        >
          <h3 className="flex items-baseline gap-3">
            <span
              className="shrink-0 font-[family-name:var(--font-heading)] text-[20px] leading-none"
              style={{ color: "#EBD8C8" }}
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className="font-[family-name:var(--font-heading)] text-[20px] leading-snug sm:text-[24px]"
              style={{ color: MAROON }}
            >
              {block.title}
            </span>
          </h3>
          <p className="mt-1.5 text-[16px] leading-relaxed text-neutral-600">{block.body}</p>
        </li>
      ))}
    </ol>
  );
}

export default function Policy() {
  return (
    <main>
      {/* Jump links. Plain anchors + scroll-mt on each section, so this needs no
          client JS and works with the browser's own back/forward. */}
      <nav aria-label="On this page" className="border-b border-[#EFDCD4] bg-white">
        <ul className="mx-auto flex w-full max-w-[1400px] gap-2 overflow-x-auto px-4 py-3 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {POLICY_SECTIONS.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="block rounded-full border px-3.5 py-1.5 text-[13px] whitespace-nowrap transition-colors hover:bg-[#FDF0F2]"
                style={{ borderColor: "#EFDCD4", color: MAROON }}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Page title */}
      <section className="bg-[#FDF0F2] py-12">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6">
          <SectionHead eyebrow="Everything in one place" title="Our Policies">
            How we ship, what happens if something goes wrong, and what we do with
            your information. Written plainly, because you should not need a lawyer
            to buy a ring.
          </SectionHead>
          <p className="mt-4 text-center text-[13px] text-neutral-500">{POLICY_UPDATED}</p>
        </div>
      </section>

      {/* 1 — FAQ */}
      <section id="faq" className="scroll-mt-28 bg-white py-12">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6">
          <SectionHead eyebrow="Start here" title="FAQ">
            The questions that come up most often about orders, shipping and
            returns. Anything about the craft itself is answered on the About page.
          </SectionHead>

          <FaqAccordion faqs={POLICY_FAQS} />
        </div>
      </section>

      {/* 2-7 — one section per policy, alternating background so they separate */}
      {POLICY_BLOCKS.map((policy, i) => (
        <section
          key={policy.id}
          id={policy.id}
          className={`scroll-mt-28 py-12 ${i % 2 === 0 ? "bg-[#FAF8F6]" : "bg-white"}`}
        >
          <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6">
            <SectionHead eyebrow={policy.eyebrow} title={policy.title}>
              {policy.intro}
            </SectionHead>

            <ClauseList blocks={policy.blocks} />
          </div>
        </section>
      ))}

      {/* 8 — Cookie Policy, shared with the About page */}
      <section id="cookies" className="scroll-mt-28 bg-[#FDF8F3] pt-12 pb-14">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6">
          <SectionHead eyebrow="How this site remembers you" title="Cookie Policy">
            {COOKIE_POLICY.intro}
          </SectionHead>

          <ClauseList blocks={COOKIE_POLICY.blocks} />

          <p className="mx-auto mt-8 max-w-[900px] rounded-lg border border-[#EFDCD4] bg-white p-5 text-[16px] leading-relaxed text-neutral-600">
            Something here unclear, or not matching what you were told? Write to{" "}
            <a
              href="mailto:sabaajewelarts@gmail.com"
              className="font-medium underline decoration-[#C9A227] underline-offset-4"
              style={{ color: MAROON }}
            >
              sabaajewelarts@gmail.com
            </a>{" "}
            or message us on{" "}
            <a
              href="https://wa.me/917871900140"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline decoration-[#C9A227] underline-offset-4"
              style={{ color: MAROON }}
            >
              WhatsApp
            </a>
            , and a person will answer you.
          </p>
        </div>
      </section>
    </main>
  );
}
