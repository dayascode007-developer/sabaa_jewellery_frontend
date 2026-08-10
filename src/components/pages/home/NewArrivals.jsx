import Image from "next/image";
import { NEW_ARRIVALS } from "@/constants/homeData";

// The caption and its diamond rule are part of the artwork, so the tile is just
// the image. Sizing to the file's own aspect ratio stops object-cover trimming
// the baked-in label off the bottom-left corner.
function ArrivalTile({ item }) {
  return (
    <a
      href={item.href}
      className="group relative block overflow-hidden rounded-sm ring-1 ring-white/60"
      style={{ aspectRatio: item.ratio }}
    >
      <Image
        src={item.image}
        alt={item.alt}
        fill
        sizes="(max-width: 768px) 90vw, 44vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </a>
  );
}

export default function NewArrivals() {
  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 pb-8 sm:px-6">
      {/* Banner block. Its height is what the tiles below overlap into. */}
      <div className="relative overflow-hidden rounded-sm pt-7 pb-28 sm:pt-9 sm:pb-32">
        {/* Stand-in for the ring photography behind the banner */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#B39F86] via-[#A08A6E] to-[#7C6448]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/35 to-transparent" />

        <div className="relative px-5 sm:px-10">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-[family-name:var(--font-heading)] text-[32px] leading-none text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
              New Arrivals
            </h2>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/25 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden="true">
                <path d="M6 3h12l3 5-9 13L3 8l3-5Z" />
              </svg>
              500+ New Items
            </span>
          </div>

          <p className="mt-2 text-[13px] leading-relaxed text-white/90">
            New Arrivals Dropping Daily, Monday through Friday.
            <br />
            Explore the Latest Launches Now!
          </p>
        </div>
      </div>

      {/* Pulled up so the first row sits over the banner and the second lands
          on the white page below it, as in the design. */}
      <div className="relative z-10 -mt-24 px-2 sm:-mt-28 sm:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {NEW_ARRIVALS.map((item) => (
            <ArrivalTile key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
