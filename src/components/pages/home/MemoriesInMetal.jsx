import Image from "next/image";
import { PHOTO_RING_CARDS, PHOTO_RING_FEATURES } from "@/constants/homeData";

const MAROON = "#7B1E2B";
const GOLD = "#B8892F";

const FEATURE_GLYPHS = {
  shieldCheck: (
    <>
      <path d="M12 3.5 19 6v6c0 4.2-2.9 7.5-7 8.5-4.1-1-7-4.3-7-8.5V6l7-2.5Z" />
      <path d="M9.2 12.2 11.4 14.4 15.7 10" />
    </>
  ),
  handHeart: (
    <>
      <path d="M12 13.5s-3.6-2.2-3.6-4.6a2.1 2.1 0 0 1 3.6-1.4 2.1 2.1 0 0 1 3.6 1.4c0 2.4-3.6 4.6-3.6 4.6Z" />
      <path d="M4 19c2-2.5 4.6-3.5 8-3.5s6 1 8 3.5" />
    </>
  ),
  medal: (
    <>
      <circle cx="12" cy="10" r="5" />
      <path d="M9.5 14.5 8 21l4-2 4 2-1.5-6.5" />
    </>
  ),
  truck: (
    <>
      <path d="M2.5 6.5h10v9h-10zM12.5 10h4l3 3v2.5h-7z" />
      <circle cx="6.5" cy="17.5" r="1.7" />
      <circle cx="16" cy="17.5" r="1.7" />
    </>
  ),
};

function IconRing({ children, size = "h-11 w-11", iconSize = "h-5 w-5" }) {
  return (
    <span
      className={`flex ${size} shrink-0 items-center justify-center rounded-full border`}
      style={{ borderColor: "#E3C89A" }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={iconSize}
        style={{ color: GOLD }}
        aria-hidden="true"
      >
        {children}
      </svg>
    </span>
  );
}

export default function MemoriesInMetal() {
  return (
    <section className="w-full bg-[#FCF3E7] py-11">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6">
        <div className="text-center">
          <p className="text-[12px] tracking-[0.18em] text-neutral-700 uppercase">
            Customised Panchaloga Photo Rings
          </p>

          <div className="mt-2 flex items-center justify-center gap-2">
            <span className="h-px w-20" style={{ backgroundColor: "#E3C89A" }} />
            <span className="text-[11px]" style={{ color: GOLD }} aria-hidden="true">
              &#10050;
            </span>
            <span className="h-px w-20" style={{ backgroundColor: "#E3C89A" }} />
          </div>

          <h2 className="mt-3 font-[family-name:var(--font-heading)] text-[28px] leading-tight text-neutral-900 sm:text-[34px]">
            Memories in Metal. Bonds for Generations.
          </h2>

          {/* Swirl — heart — swirl */}
          <div className="mt-2 flex items-center justify-center gap-2">
            <span className="h-px w-16" style={{ backgroundColor: "#E3C89A" }} />
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill={MAROON} aria-hidden="true">
              <path d="M12 20s-7.5-4.6-7.5-9.6A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20Z" />
            </svg>
            <span className="h-px w-16" style={{ backgroundColor: "#E3C89A" }} />
          </div>
        </div>

        {/* Three photo-ring cards */}
        <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {PHOTO_RING_CARDS.map((card) => (
            <div
              key={card.id}
              className="relative overflow-hidden rounded-[22px] border"
              style={{ aspectRatio: card.ratio, borderColor: "#E6CFA8" }}
            >
              <Image
                src={card.image}
                alt={card.alt}
                fill
                sizes="(max-width: 640px) 90vw, 32vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Four guarantees */}
        <ul className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PHOTO_RING_FEATURES.map((feature) => (
            <li key={feature.id} className="flex items-start gap-3">
              <IconRing size="h-10 w-10">{FEATURE_GLYPHS[feature.icon]}</IconRing>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold tracking-wide text-neutral-800 uppercase">
                  {feature.title}
                </p>
                <p className="mt-0.5 text-[11px] leading-tight text-neutral-600">
                  {feature.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
