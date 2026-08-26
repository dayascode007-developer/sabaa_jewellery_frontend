import Link from "next/link";

const MAROON = "#7B1E2B";

// items: [{ label, href }] — the last entry is the current page and is rendered
// as plain text, not a link.
export default function Breadcrumb({ items }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full border-b border-neutral-200 bg-gradient-to-b from-neutral-50 to-white"
    >
      <ol className="mx-auto flex w-full max-w-[1400px] flex-wrap items-center gap-2 px-4 py-3 sm:px-6">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2">
              {isLast ? (
                <span
                  aria-current="page"
                  className="text-[14px] font-semibold"
                  style={{ color: MAROON }}
                >
                  {item.label}
                </span>
              ) : (
                <>
                  <Link
                    href={item.href}
                    className="text-[14px] text-neutral-600 transition-colors hover:text-neutral-900"
                  >
                    {item.label}
                  </Link>
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5 shrink-0 text-neutral-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m9 5 7 7-7 7" />
                  </svg>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
