import { ASSURANCE_ITEMS } from "@/constants/homeData";

const MAROON = "#7B1E2B";
const GOLD = "#C9A227";

const GLYPHS = {
  tools: (
    <>
      <path d="M4 5h16v4H4zM7 9v10M17 9v10M7 14h10" />
    </>
  ),
  heart: (
    <>
      <path d="M12 21s-7.5-4.6-7.5-9.6A4.4 4.4 0 0 1 12 8.6a4.4 4.4 0 0 1 7.5 2.8C19.5 16.4 12 21 12 21Z" />
      <path d="M12 11.5v3l2 1.2" />
    </>
  ),
  gem: <path d="M6 3h12l3 5-9 13L3 8l3-5Zm-3 5h18M9 3 6 8l6 13M15 3l3 5-6 13" />,
};

export default function SabaaAssurance() {
  return (
    <section className="w-full border-y border-neutral-200 bg-white">
      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 lg:grid-cols-2">
        {/* Left: the promise */}
        <div className="flex flex-col items-center justify-center px-6 py-12 text-center lg:border-r lg:border-neutral-200">
          <h2 className="font-[family-name:var(--font-heading)] text-[40px] leading-tight text-neutral-800">
            Sabaa <span style={{ color: MAROON }}>Assurance</span>
          </h2>
          <p className="mt-1 font-[family-name:var(--font-heading)] text-[15px] text-neutral-500">
            Crafted by experts, cherished by you
          </p>
        </div>

        {/* Right: the three guarantees */}
        <ul className="grid grid-cols-3 items-start gap-4 px-6 py-12">
          {ASSURANCE_ITEMS.map((item) => (
            <li key={item.id} className="flex flex-col items-center text-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-9 w-9"
                style={{ color: GOLD }}
                aria-hidden="true"
              >
                {GLYPHS[item.icon]}
              </svg>
              <span className="mt-2 text-[11px] leading-tight font-medium tracking-wide text-neutral-700">
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
