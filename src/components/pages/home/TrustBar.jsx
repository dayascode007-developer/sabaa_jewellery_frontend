import { TRUST_ITEMS } from "@/constants/homeData";

const MAROON = "#7B1E2B";

const GLYPHS = {
  shield: (
    <>
      <path d="M12 3.5 19 6v6c0 4.2-2.9 7.5-7 8.5-4.1-1-7-4.3-7-8.5V6l7-2.5Z" />
      <path d="M9.2 12.2 11.4 14.4 15.7 10" />
    </>
  ),
  ring: (
    <>
      <circle cx="12" cy="14.5" r="5.5" />
      <path d="M9.5 5.5 12 8l2.5-2.5L13 3h-2L9.5 5.5Z" />
    </>
  ),
  truck: (
    <>
      <path d="M2.5 6.5h10v9h-10zM12.5 10h4l3 3v2.5h-7z" />
      <circle cx="6.5" cy="17.5" r="1.7" />
      <circle cx="16" cy="17.5" r="1.7" />
    </>
  ),
  heart: (
    <path d="M12 20s-7.5-4.6-7.5-9.6A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20Z" />
  ),
};

export default function TrustBar() {
  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-4xl rounded-lg border border-neutral-200 bg-white px-2 py-3 shadow-[0_1px_10px_rgba(0,0,0,0.04)]">
        <ul className="grid grid-cols-2 sm:grid-cols-4">
          {TRUST_ITEMS.map((item, i) => (
            <li
              key={item.id}
              // Divider on every item except the first in each row
              className={`flex items-center justify-center gap-2.5 px-3 py-2 ${
                i > 0 ? "sm:border-l sm:border-neutral-200" : ""
              } ${i % 2 === 1 ? "border-l border-neutral-200 sm:border-l" : ""}`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 shrink-0"
                style={{ color: MAROON }}
                aria-hidden="true"
              >
                {GLYPHS[item.icon]}
              </svg>
              <span className="text-[11px] leading-tight text-neutral-700">
                {item.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
