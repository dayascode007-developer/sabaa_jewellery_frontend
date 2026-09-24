// The accordion is reused from the About page rather than duplicated. If you
// want it somewhere neutral later, components/common/ is the natural home.
import FaqAccordion from "@/components/pages/about/FaqAccordion";
import {
  POLICY_SECTIONS,
  POLICY_UPDATED,
  POLICY_FAQS,
  POLICY_BLOCKS,
} from "@/constants/policyData";

const MAROON = "#7B1E2B";

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
  const parseBodyContent = (body) => {
    const lines = body.split("\n");
    const elements = [];
    let currentParagraph = [];
    let currentBulletList = [];
    let currentNumberedList = [];
    let currentStepList = [];

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        elements.push({
          type: "paragraph",
          content: currentParagraph.join(" "),
        });
        currentParagraph = [];
      }
    };

    const flushBulletList = () => {
      if (currentBulletList.length > 0) {
        elements.push({
          type: "bulletList",
          items: currentBulletList,
        });
        currentBulletList = [];
      }
    };

    const flushNumberedList = () => {
      if (currentNumberedList.length > 0) {
        elements.push({
          type: "numberedList",
          items: currentNumberedList,
        });
        currentNumberedList = [];
      }
    };

    const flushStepList = () => {
      if (currentStepList.length > 0) {
        elements.push({
          type: "stepList",
          items: currentStepList,
        });
        currentStepList = [];
      }
    };

    lines.forEach((line) => {
      const trimmedLine = line.trim();

      if (trimmedLine.startsWith("•")) {
        flushParagraph();
        flushNumberedList();
        flushStepList();
        currentBulletList.push(trimmedLine.substring(1).trim());
      } else if (/^\d+\./.test(trimmedLine)) {
        flushParagraph();
        flushBulletList();
        flushStepList();
        currentNumberedList.push(trimmedLine.replace(/^\d+\.\s*/, ""));
      } else if (/^Step\s+\d+:/.test(trimmedLine)) {
        flushParagraph();
        flushBulletList();
        flushNumberedList();
        currentStepList.push(trimmedLine);
      } else if (trimmedLine === "") {
        flushParagraph();
        flushBulletList();
        flushNumberedList();
        flushStepList();
      } else {
        flushBulletList();
        flushNumberedList();
        flushStepList();
        currentParagraph.push(trimmedLine);
      }
    });

    flushParagraph();
    flushBulletList();
    flushNumberedList();
    flushStepList();

    return elements;
  };

  return (
    <ol className="mx-auto mt-8 max-w-[900px] space-y-4">
      {blocks.map((block, blockIndex) => {
        const parsedContent = parseBodyContent(block.body);

        return (
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
                {String(blockIndex + 1).padStart(2, "0")}
              </span>
              <span
                className="font-[family-name:var(--font-heading)] text-[20px] leading-snug sm:text-[24px]"
                style={{ color: MAROON }}
              >
                {block.title}
              </span>
            </h3>

            <div className="mt-1.5 space-y-3 text-[16px] leading-relaxed text-neutral-600">
              {parsedContent.map((element, idx) => {
                const renderContent = (text) => {
                  const parts = text.split(/(\*\*[^*]+\*\*)/);
                  return parts.map((part, i) => {
                    if (part.startsWith("**") && part.endsWith("**")) {
                      return <strong key={i}>{part.slice(2, -2)}</strong>;
                    }
                    return part;
                  });
                };

                if (element.type === "paragraph") {
                  return (
                    <p key={idx}>{renderContent(element.content)}</p>
                  );
                } else if (element.type === "bulletList") {
                  return (
                    <ul key={idx} className="list-disc list-inside space-y-1 pl-2">
                      {element.items.map((item, itemIdx) => (
                        <li key={itemIdx}>{renderContent(item)}</li>
                      ))}
                    </ul>
                  );
                } else if (element.type === "numberedList") {
                  return (
                    <ol key={idx} className="list-decimal list-inside space-y-1 pl-2">
                      {element.items.map((item, itemIdx) => (
                        <li key={itemIdx}>{renderContent(item)}</li>
                      ))}
                    </ol>
                  );
                } else if (element.type === "stepList") {
                  return (
                    <div key={idx} className="space-y-1">
                      {element.items.map((item, itemIdx) => (
                        <p key={itemIdx} className="font-medium">{renderContent(item)}</p>
                      ))}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </li>
        );
      })}
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
    </main>
  );
}
