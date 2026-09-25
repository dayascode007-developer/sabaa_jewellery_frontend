import Image from "next/image";
import FaqAccordion from "@/components/pages/about/FaqAccordion";
import {
  aboutImage,
  ABOUT_SECTIONS,
  ABOUT_PARAGRAPHS,
  FOUNDER_QUOTE,
  STORY_MILESTONES,
  PANCHALOGA_INTRO,
  PANCHALOGA_BENEFITS,
  PANCHALOGA_COMPOSITION,
  PROCESS_STEPS,
  COOKIE_POLICY,
  CONTACT,
} from "@/constants/aboutData";

const MAROON = "#7B1E2B";
const GOLD = "#C9A227";

/* ------------------------------------------------------------------ */
/*  Shared bits                                                        */
/* ------------------------------------------------------------------ */

// The same ornament lockup the home page sections use, so About does not read
// as a page from a different site.
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
        <p className="mx-auto mt-3 max-w-[720px] text-[16px] leading-relaxed text-neutral-600">
          {children}
        </p>
      ) : null}
    </div>
  );
}

// Segments come from aboutData so the bold / accent emphasis in the founder's
// note is data, not markup baked into this file.
function RichText({ segments }) {
  return (
    <>
      {segments.map((segment, i) => {
        if (typeof segment === "string") return segment;
        if (segment.strong) {
          return (
            <strong key={i} className="font-semibold text-neutral-900">
              {segment.strong}
            </strong>
          );
        }
        return (
          <span key={i} style={{ color: "#A07B4B" }}>
            {segment.accent}
          </span>
        );
      })}
    </>
  );
}

const STEP_ICONS = {
  shield: (
    <>
      <path d="M12 3.5 19 6v6c0 4.2-2.9 7.5-7 8.5-4.1-1-7-4.3-7-8.5V6l7-2.5Z" />
      <path d="M9.2 12.2 11.4 14.4 15.7 10" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7.5V12l3 1.8" />
    </>
  ),
  coin: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7.8v8.4M14.2 9.8c-.5-.7-1.3-1-2.2-1-1.2 0-2.1.6-2.1 1.6 0 2.2 4.4 1.2 4.4 3.4 0 1-1 1.6-2.2 1.6-1 0-1.8-.4-2.3-1.1" />
    </>
  ),
  gift: (
    <>
      <rect x="3.5" y="9" width="17" height="11" rx="1.5" />
      <path d="M2.5 9h19M12 9v11" />
      <path d="M12 9c-1.7-3.2-3.2-4.3-4.7-3.6C6 6 6.5 8.5 12 9Zm0 0c1.7-3.2 3.2-4.3 4.7-3.6C18 6 17.5 8.5 12 9Z" />
    </>
  ),
  pencil: <path d="M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17v3ZM14.5 6.5l3 3" />,
  flame: (
    <path d="M12 3s5 4.2 5 8.5a5 5 0 0 1-10 0C7 9.8 8.6 8.4 9.5 7c.3 1.4 1 2.2 1.8 2.6.6-1.9.5-4.3.7-6.6Z" />
  ),
  hammer: <path d="M14 3.5 20.5 10 18 12.5 11.5 6 14 3.5ZM12.7 7.2 4 15.9V20h4.1l8.7-8.7" />,
  engrave: (
    <>
      <circle cx="12" cy="12" r="7" />
      <path d="M9.5 13.8 12 9l2.5 4.8M10.3 12.6h3.4" />
    </>
  ),
  sparkle: <path d="M12 3.5 13.9 9.6 20 11.5l-6.1 1.9L12 19.5l-1.9-6.1L4 11.5l6.1-1.9L12 3.5Z" />,
};

function StepIcon({ name }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {STEP_ICONS[name]}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  1 — About Sabaa                                                    */
/* ------------------------------------------------------------------ */

function AboutSabaa() {
  return (
    <section id="about-sabaa" className="scroll-mt-28 bg-[#FDF0F2] py-12">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6">
        <SectionHead eyebrow="Since 1980" title="About Sabaa" />

        <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_minmax(0,440px)] lg:gap-12">
          <div>
            {ABOUT_PARAGRAPHS.map((segments, i) => (
              <p
                key={i}
                className={`text-[16px] leading-relaxed text-neutral-700 ${i > 0 ? "mt-4" : ""}`}
              >
                <RichText segments={segments} />
              </p>
            ))}

            <figure
              className="mt-6 border-l-2 pl-4"
              style={{ borderColor: GOLD }}
            >
              <figcaption className="text-[16px]">
                <span className="font-medium" style={{ color: MAROON }}>
                  &mdash; {FOUNDER_QUOTE.name}
                </span>
                <span className="text-neutral-500">, {FOUNDER_QUOTE.role}</span>
              </figcaption>
            </figure>
          </div>

          {/* The artwork already carries "Since 1980", the mark, both office
              addresses and the workshop photos, so nothing here is repeated in
              HTML — and it is object-contain so none of that text is cropped. */}
          <div className="overflow-hidden rounded-lg bg-white p-2 shadow-sm ring-1 ring-[#EFDCD4]">
            <Image
              src={aboutImage}
              alt="Sabaa Jewel Arts — since 1980, with head office in Cuddalore and a branch in Palakkad"
              sizes="(max-width: 1024px) 92vw, 440px"
              className="h-auto w-full rounded"
              placeholder="blur"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  2 — Our Story                                                      */
/* ------------------------------------------------------------------ */

function OurStory() {
  return (
    <section id="our-story" className="scroll-mt-28 bg-white py-12">
      <div className="mx-auto w-full max-w-[1000px] px-4 sm:px-6">
        <SectionHead eyebrow="Four decades at the bench" title="Our Story">
          How a single engraved Panchalogam ring in Cuddalore became the workshop
          behind every piece we send out today.
        </SectionHead>

        {/* The rail is drawn on the list, so it stops exactly at the last item
            instead of running past it. */}
        <ol className="mt-9 space-y-8 border-l-2 border-[#F0E0D6] pl-6 sm:pl-8">
          {STORY_MILESTONES.map((milestone) => (
            <li key={milestone.id} className="relative">
              <span
                className="absolute top-1.5 -left-[31px] h-3.5 w-3.5 rotate-45 sm:-left-[39px]"
                style={{ backgroundColor: MAROON }}
                aria-hidden="true"
              />
              <p
                className="text-[11px] font-medium tracking-[0.18em] uppercase"
                style={{ color: GOLD }}
              >
                {milestone.year}
              </p>
              <h3
                className="mt-1 font-[family-name:var(--font-heading)] text-[20px] leading-snug sm:text-[24px]"
                style={{ color: MAROON }}
              >
                {milestone.title}
              </h3>
              <p className="mt-1.5 text-[16px] leading-relaxed text-neutral-600">
                {milestone.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  3 — What is Panchaloga?                                            */
/* ------------------------------------------------------------------ */

function WhatIsPanchaloga() {
  return (
    <section id="what-is-panchaloga" className="scroll-mt-28 bg-[#FDF0F2] py-12">
      <div className="mx-auto w-full max-w-[1000px] px-4 sm:px-6">
        <SectionHead eyebrow="Five metals, one alloy" title="What is Panchaloga?" />

        <p className="mt-8 text-[16px] leading-relaxed font-medium text-neutral-800">
          {PANCHALOGA_INTRO.lead}
        </p>

        {PANCHALOGA_INTRO.paragraphs.map((paragraph) => (
          <p key={paragraph} className="mt-4 text-[16px] leading-relaxed text-neutral-700">
            {paragraph}
          </p>
        ))}

        <dl className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {PANCHALOGA_INTRO.facts.map((fact) => (
            <div
              key={fact.id}
              className="rounded-lg border border-[#EFDCD4] bg-white p-4 text-center"
            >
              <dt
                className="text-[11px] font-medium tracking-[0.16em] uppercase"
                style={{ color: GOLD }}
              >
                {fact.label}
              </dt>
              <dd className="mt-1 text-[16px] leading-snug" style={{ color: MAROON }}>
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  4 — Benefits of Panchaloga Jewellery                               */
/* ------------------------------------------------------------------ */

function PanchalogaBenefits() {
  return (
    <section id="panchaloga-benefits" className="scroll-mt-28 bg-white py-12">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6">
        <SectionHead eyebrow="Why this metal" title="Benefits of Panchaloga Jewellery">
          What the alloy actually gives you — and, kept separate, what tradition
          holds about it.
        </SectionHead>

        <ul className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PANCHALOGA_BENEFITS.practical.map((benefit) => (
            <li
              key={benefit.id}
              className="rounded-lg border border-[#EFDCD4] bg-white p-5 transition-shadow hover:shadow-md"
            >
              <span
                className="flex h-11 w-11 items-center justify-center rounded-full"
                style={{ backgroundColor: "#FDF0F2", color: MAROON }}
              >
                <StepIcon name={benefit.icon} />
              </span>

              <h3
                className="mt-3 font-[family-name:var(--font-heading)] text-[20px] leading-snug sm:text-[24px]"
                style={{ color: MAROON }}
              >
                {benefit.title}
              </h3>
              <p className="mt-1.5 text-[16px] leading-relaxed text-neutral-600">
                {benefit.body}
              </p>
            </li>
          ))}
        </ul>

        {/* Belief is presented as belief, in its own panel, never mixed in with
            the practical claims above. */}
        <div
          className="mx-auto mt-6 max-w-[900px] rounded-lg border-l-2 bg-[#FDF8F3] p-5"
          style={{ borderColor: GOLD }}
        >
          <h3
            className="font-[family-name:var(--font-heading)] text-[20px] leading-snug sm:text-[24px]"
            style={{ color: MAROON }}
          >
            {PANCHALOGA_BENEFITS.traditionalTitle}
          </h3>
          <p className="mt-1.5 text-[16px] leading-relaxed text-neutral-600">
            {PANCHALOGA_BENEFITS.traditional}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  5 — Panchaloga Composition                                         */
/* ------------------------------------------------------------------ */

function PanchalogaComposition() {
  return (
    <section id="panchaloga-composition" className="scroll-mt-28 bg-[#FDF8F3] py-12">
      <div className="mx-auto w-full max-w-[1000px] px-4 sm:px-6">
        <SectionHead eyebrow="What goes into the crucible" title="Panchaloga Composition">
          {PANCHALOGA_COMPOSITION.intro}
        </SectionHead>

        <ol className="mt-9 space-y-3">
          {PANCHALOGA_COMPOSITION.metals.map((metal) => (
            <li
              key={metal.id}
              className="flex items-start gap-4 rounded-lg border border-[#EFDCD4] bg-white p-5"
            >
              {/* The symbol disc is tinted to that metal's own colour. */}
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[15px] font-semibold text-white"
                style={{ backgroundColor: metal.tone }}
                aria-hidden="true"
              >
                {metal.symbol}
              </span>

              <div className="min-w-0">
                <h3
                  className="font-[family-name:var(--font-heading)] text-[20px] leading-snug sm:text-[24px]"
                  style={{ color: MAROON }}
                >
                  {metal.name}
                </h3>
                <p className="mt-1 text-[16px] leading-relaxed text-neutral-600">
                  {metal.role}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-6 rounded-lg border border-[#EFDCD4] bg-white p-5 text-[16px] leading-relaxed text-neutral-600">
          {PANCHALOGA_COMPOSITION.note}
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  6 — Manufacturing Process                                          */
/* ------------------------------------------------------------------ */

function ManufacturingProcess() {
  return (
    <section id="manufacturing" className="scroll-mt-28 bg-[#FAF8F6] py-12">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6">
        <SectionHead eyebrow="Made by hand, not by machine" title="Manufacturing Process">
          Every Sabaa piece passes through the same five stages, and a person is
          responsible for each one.
        </SectionHead>

        <ol className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROCESS_STEPS.map((step, i) => (
            <li
              key={step.id}
              className="rounded-lg border border-[#EFDCD4] bg-white p-5 transition-shadow hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: "#FDF0F2", color: MAROON }}
                >
                  <StepIcon name={step.icon} />
                </span>
                <span
                  className="font-[family-name:var(--font-heading)] text-[24px] leading-none"
                  style={{ color: "#EBD8C8" }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <h3
                className="mt-3 font-[family-name:var(--font-heading)] text-[20px] leading-snug sm:text-[24px]"
                style={{ color: MAROON }}
              >
                {step.title}
              </h3>
              <p className="mt-1.5 text-[16px] leading-relaxed text-neutral-600">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  4 — Help & FAQs                                                    */
/* ------------------------------------------------------------------ */

function HelpFaqs() {
  return (
    <section id="faqs" className="scroll-mt-28 bg-white py-12">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6">
        <SectionHead eyebrow="Before you order" title="Help & FAQs">
          The questions we are asked most often. If yours is not here, WhatsApp us
          and you will get a straight answer.
        </SectionHead>

        <FaqAccordion />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  5 — Cookie Policy                                                  */
/* ------------------------------------------------------------------ */

function CookiePolicy() {
  return (
    <section id="cookies" className="scroll-mt-28 bg-[#FDF8F3] py-12">
      <div className="mx-auto w-full max-w-[1000px] px-4 sm:px-6">
        <SectionHead eyebrow="How this site remembers you" title="Cookie Policy">
          {COOKIE_POLICY.intro}
        </SectionHead>

        <div className="mt-8 space-y-4">
          {COOKIE_POLICY.blocks.map((block) => (
            <div
              key={block.id}
              className="rounded-lg border border-[#EFDCD4] bg-white p-5"
            >
              <h3
                className="font-[family-name:var(--font-heading)] text-[20px] leading-snug sm:text-[24px]"
                style={{ color: MAROON }}
              >
                {block.title}
              </h3>
              <p className="mt-1.5 text-[16px] leading-relaxed text-neutral-600">{block.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  6 — Contact Us                                                     */
/* ------------------------------------------------------------------ */

const CONTACT_CHANNELS = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: CONTACT.phoneDisplay,
    hint: "Fastest reply — send us your design idea",
    href: `https://wa.me/${CONTACT.whatsapp}`,
    external: true,
    tint: "#25D366",
    icon: (
      <path d="M12 2.1a9.9 9.9 0 0 0-8.5 15L2.1 22l5-1.3A9.9 9.9 0 1 0 12 2.1Zm0 1.9a8 8 0 1 1-4.2 14.8l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 0 1 12 4Zm4.6 11.1c-.1-.2-.4-.3-.9-.6l-1.9-.9c-.2-.1-.4-.1-.6.1l-.8 1c-.2.2-.3.2-.6.1a8 8 0 0 1-2.3-1.4 8.7 8.7 0 0 1-1.6-1.9c-.2-.3 0-.4.1-.6l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.7 1.1 2.9c.2.2 2 3.2 5 4.4 2.4 1 2.9.8 3.4.7.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4Z" />
    ),
  },
  {
    id: "email",
    label: "Email",
    value: CONTACT.email,
    hint: "Opens in your default mail app",
    href: `mailto:${CONTACT.email}`,
    external: false,
    tint: MAROON,
    icon: (
      <>
        <rect x="2.5" y="5" width="19" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="m3.5 6.5 8.5 6 8.5-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    id: "gmail",
    label: "Gmail",
    value: "Compose in Gmail",
    hint: "Writes to us straight from your browser",
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT.email}`,
    external: true,
    tint: "#C5221F",
    icon: (
      <>
        <rect x="2.5" y="5" width="19" height="14" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3 6.5 12 13l9-6.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2.6 18.4V9.2l4.6 3.3v5.9M21.4 18.4V9.2l-4.6 3.3v5.9" fill="currentColor" opacity="0.18" />
      </>
    ),
  },
];

function ContactUs() {
  return (
    <section id="contact" className="scroll-mt-28 bg-white pt-12 pb-14">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6">
        <SectionHead eyebrow="We reply in person" title="Contact Us">
          Tell us what you want engraved and we will tell you honestly whether it
          will work — before you pay for anything.
        </SectionHead>

        <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {CONTACT_CHANNELS.map((channel) => (
            <a
              key={channel.id}
              href={channel.href}
              {...(channel.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group flex items-start gap-3 rounded-lg border border-[#EFDCD4] bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: "#FDF0F2", color: channel.tint }}
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
                  {channel.icon}
                </svg>
              </span>

              <span className="min-w-0">
                <span
                  className="block text-[11px] font-medium tracking-[0.18em] uppercase"
                  style={{ color: GOLD }}
                >
                  {channel.label}
                </span>
                <span
                  className="mt-0.5 block truncate text-[16px] font-medium"
                  style={{ color: MAROON }}
                >
                  {channel.value}
                </span>
                <span className="mt-0.5 block text-[13px] leading-snug text-neutral-500">
                  {channel.hint}
                </span>
              </span>
            </a>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {CONTACT.offices.map((office) => (
            <div
              key={office.id}
              className="rounded-lg border border-[#EFDCD4] bg-[#FDF8F3] p-5"
            >
              <p
                className="flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] uppercase"
                style={{ color: GOLD }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 21s-6.5-5.6-6.5-10a6.5 6.5 0 0 1 13 0c0 4.4-6.5 10-6.5 10Z" />
                  <circle cx="12" cy="11" r="2.4" />
                </svg>
                {office.label}
              </p>
              <address className="mt-2 text-[16px] leading-relaxed text-neutral-700 not-italic">
                {office.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export default function About() {
  return (
    <main>
      {/* Jump links. Plain anchors + scroll-mt on each section, so this needs no
          client JS and works with the browser's own back/forward. */}
      <nav
        aria-label="On this page"
        className="border-b border-[#EFDCD4] bg-white"
      >
        <ul className="mx-auto flex w-full max-w-[1400px] gap-2 overflow-x-auto px-4 py-3 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {ABOUT_SECTIONS.map((section) => (
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

      <AboutSabaa />
      <ManufacturingProcess />
      <HelpFaqs />
      <ContactUs />
    </main>
  );
}
