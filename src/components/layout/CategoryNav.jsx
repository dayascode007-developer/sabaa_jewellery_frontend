import { NAV_ITEMS } from "@/constants/homeData";

const MAROON = "#7B1E2B";

// One simple glyph per category. Keyed by the ids in NAV_ITEMS so adding an
// item there without a glyph falls back to the generic mark.
const GLYPHS = {
  all: (
    <>
      <circle cx="12" cy="9" r="4.5" />
      <path d="M5 20c1.5-3.5 4-5.2 7-5.2s5.5 1.7 7 5.2" />
    </>
  ),
  rings: (
    <>
      <circle cx="8" cy="14" r="5" />
      <circle cx="16" cy="14" r="5" />
    </>
  ),
  impon: <path d="M6 4v8a6 6 0 0 0 12 0V4" />,
  pendant: (
    <>
      <path d="M4 5c3.5 3 5.5 4.5 8 4.5S16.5 8 20 5" />
      <path d="M12 9.5 8.8 14 12 20l3.2-6L12 9.5Z" />
    </>
  ),
  bracelet: <ellipse cx="12" cy="12" rx="8" ry="5.5" />,
  earrings: (
    <>
      <path d="M8 4a2 2 0 1 0 0 4M16 4a2 2 0 1 1 0 4" />
      <path d="M8 8 5.5 14h5L8 8ZM16 8l-2.5 6h5L16 8Z" />
      <circle cx="8" cy="17" r="1.6" />
      <circle cx="16" cy="17" r="1.6" />
    </>
  ),
  more: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1" />
      <rect x="13" y="4" width="7" height="7" rx="1" />
      <rect x="4" y="13" width="7" height="7" rx="1" />
      <rect x="13" y="13" width="7" height="7" rx="1" />
    </>
  ),
};

const FALLBACK = <circle cx="12" cy="12" r="8" />;

export default function CategoryNav() {
  return (
    <nav className="w-full border-b border-neutral-200 bg-white">
      <ul
        className="mx-auto flex max-w-[1400px] items-center gap-6 overflow-x-auto px-4 py-2 sm:gap-10 sm:px-6 lg:justify-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ color: MAROON }}
      >
        {NAV_ITEMS.map((item) => (
          <li key={item.id} className="shrink-0">
            <a
              href={item.href}
              className="flex items-center gap-2 py-1 font-[family-name:var(--font-category)] text-[13px] whitespace-nowrap text-neutral-700 transition-colors hover:text-[#7B1E2B]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 shrink-0"
                style={{ color: MAROON }}
                aria-hidden="true"
              >
                {GLYPHS[item.id] ?? FALLBACK}
              </svg>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
