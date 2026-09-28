import { CARE_GUIDE } from "@/constants/productData";

const MAROON = "#7B1E2B";
const GOLD = "#C9A227";
const WHATSAPP_NUMBER = "917871900355";

const ICONS = {
  drop: <path d="M12 3.5c3.2 3.6 5.2 6.3 5.2 8.9a5.2 5.2 0 0 1-10.4 0c0-2.6 2-5.3 5.2-8.9Z" />,
  cloth: (
    <>
      <path d="M4 7.5c2.7-2 5.3-2 8 0s5.3 2 8 0v9c-2.7 2-5.3 2-8 0s-5.3-2-8 0v-9Z" />
      <path d="M4 12c2.7-2 5.3-2 8 0s5.3 2 8 0" />
    </>
  ),
  box: (
    <>
      <path d="M3.5 8.5 12 4.5l8.5 4v7L12 19.5l-8.5-4v-7Z" />
      <path d="M3.5 8.5 12 12.5l8.5-4M12 12.5v7" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5 19 6v6c0 4.2-2.9 7.5-7 8.5-4.1-1-7-4.3-7-8.5V6l7-2.5Z" />
      <path d="M9.2 12.2 11.4 14.4 15.7 10" />
    </>
  ),
};

function CareIcon({ name }) {
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
      {ICONS[name]}
    </svg>
  );
}

export default function CareGuide({ guide = CARE_GUIDE }) {
  return (
    <section className="mt-12 border-t border-[#EFDCD4] pt-10">
      <div className="text-center">
        <p
          className="flex items-center justify-center gap-2 text-[11px] font-medium tracking-[0.2em] uppercase"
          style={{ color: MAROON }}
        >
          <span aria-hidden="true">&#10022;&mdash;</span>
          Keep it looking new
          <span aria-hidden="true">&mdash;&#10022;</span>
        </p>

        <h2
          className="mt-2 font-[family-name:var(--font-heading)] text-[26px] leading-tight sm:text-[32px] lg:text-[40px]"
          style={{ color: MAROON }}
        >
          Jewellery Care Guide
        </h2>

        <div className="mt-2 flex items-center justify-center gap-2">
          <span className="h-px w-14 bg-[#E0CDBA]" />
          <span className="text-[10px]" style={{ color: MAROON }} aria-hidden="true">
            &#10050;
          </span>
          <span className="h-px w-14 bg-[#E0CDBA]" />
        </div>

        <p className="mx-auto mt-3 max-w-[640px] text-[16px] leading-relaxed text-neutral-600">
          {guide.intro}
        </p>
      </div>

      {/* Four everyday habits */}
      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {guide.daily.map((item) => (
          <li
            key={item.id}
            className="rounded-lg border border-[#EFDCD4] bg-white p-5 transition-shadow hover:shadow-md"
          >
            <span
              className="flex h-11 w-11 items-center justify-center rounded-full"
              style={{ backgroundColor: "#FDF0F2", color: MAROON }}
            >
              <CareIcon name={item.icon} />
            </span>
            <h3
              className="mt-3 font-[family-name:var(--font-heading)] text-[20px] leading-snug"
              style={{ color: MAROON }}
            >
              {item.title}
            </h3>
            <p className="mt-1.5 text-[14px] leading-relaxed text-neutral-600">{item.body}</p>
          </li>
        ))}
      </ul>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* What to keep it away from */}
        <div className="rounded-lg border border-[#EFDCD4] bg-[#FDF8F3] p-5">
          <h3
            className="flex items-center gap-2 font-[family-name:var(--font-heading)] text-[20px] leading-snug"
            style={{ color: MAROON }}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="8.5" />
              <path d="m6.5 6.5 11 11" />
            </svg>
            Keep it away from
          </h3>

          <ul className="mt-3 space-y-2">
            {guide.avoid.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-[14px] leading-relaxed text-neutral-600"
              >
                <span
                  className="mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45"
                  style={{ backgroundColor: GOLD }}
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          {/* The single most common "is my ring faulty?" question */}
          <div className="rounded-lg border border-[#EFDCD4] bg-white p-5">
            <h3
              className="font-[family-name:var(--font-heading)] text-[20px] leading-snug"
              style={{ color: MAROON }}
            >
              {guide.patina.title}
            </h3>
            <p className="mt-1.5 text-[14px] leading-relaxed text-neutral-600">
              {guide.patina.body}
            </p>
          </div>

          <div
            className="rounded-lg border-l-2 bg-[#FDF0F2] p-5"
            style={{ borderColor: GOLD }}
          >
            <h3
              className="font-[family-name:var(--font-heading)] text-[20px] leading-snug"
              style={{ color: MAROON }}
            >
              {guide.service.title}
            </h3>
            <p className="mt-1.5 text-[14px] leading-relaxed text-neutral-600">
              {guide.service.body}
            </p>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#25D366" }}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M12 2.8a9.1 9.1 0 0 0-7.8 13.8L2.9 21.3l4.9-1.3A9.1 9.1 0 1 0 12 2.8Zm0 1.9a7.2 7.2 0 1 1-3.8 13.3l-.3-.2-2.6.7.7-2.5-.2-.3A7.2 7.2 0 0 1 12 4.7Z" />
              </svg>
              Ask about a polish
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
