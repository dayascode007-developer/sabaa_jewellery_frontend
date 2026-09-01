import { TRUST_ITEMS } from "@/constants/homeData";

const MAROON = "#7B1E2B";

// Each glyph says the thing its label says. Drawn for 24px at stroke 1.4 —
// detail finer than that closes up at this size.
const GLYPHS = {
  // Two customers, not an abstract shield — the claim is about people.
  people: (
    <>
      <circle cx="9.2" cy="8.8" r="3.1" />
      <path d="M2.8 19c0-3 2.9-5.1 6.4-5.1s6.4 2.1 6.4 5.1" />
      <path d="M16.1 6.9a3.1 3.1 0 0 1 0 5.9" />
      <path d="M17.4 13.9c2.3.5 3.8 2.2 3.8 4.4" />
    </>
  ),

  // An actual ring: faceted stone above a band, which is what "Premium
  // Quality Rings" should show.
  ring: (
    <>
      <path d="M9.1 6.1 10.6 3.9h2.8l1.5 2.2L12 9.9 9.1 6.1Z" />
      <path d="M9.1 6.1h5.8M10.6 3.9 12 6.1l1.4-2.2M12 6.1v3.8" />
      <circle cx="12" cy="15.6" r="4.9" />
    </>
  ),

  // Van with motion lines behind it — the lines carry the "Fast".
  truck: (
    <>
      <path d="M3.4 7.4h9.4v9H3.4z" />
      <path d="M12.8 10.4h3.6l3.2 3.2v2.8h-6.8z" />
      <circle cx="7.4" cy="17.9" r="1.6" />
      <circle cx="16.6" cy="17.9" r="1.6" />
      <path d="M1 10.2h1.6M1 13.4h1.6" />
    </>
  ),

  // A satisfied customer. The header already uses a heart for wishlist, so
  // repeating it here would say two different things with one shape.
  smile: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <circle cx="9.3" cy="10.2" r="0.95" fill="currentColor" stroke="none" />
      <circle cx="14.7" cy="10.2" r="0.95" fill="currentColor" stroke="none" />
      <path d="M8.4 13.9c1 2.2 5.2 2.2 6.2 0" />
    </>
  ),
};

export default function TrustBar() {
  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-6xl rounded-xl border border-neutral-200 bg-white px-3 py-5 shadow-[0_2px_16px_rgba(0,0,0,0.05)] sm:px-4 sm:py-6">
        <ul className="grid grid-cols-2 gap-y-5 sm:grid-cols-4 sm:gap-y-0">
          {TRUST_ITEMS.map((item, i) => (
            <li
              key={item.id}
              // Divider on every item except the first in each row
              className={`flex items-center justify-center gap-3.5 px-4 py-1 ${
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
                className="h-8 w-8 shrink-0 sm:h-9 sm:w-9"
                style={{ color: MAROON }}
                aria-hidden="true"
              >
                {GLYPHS[item.icon]}
              </svg>
              <span className="text-[13px] leading-snug text-neutral-700 sm:text-[14px]">
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
