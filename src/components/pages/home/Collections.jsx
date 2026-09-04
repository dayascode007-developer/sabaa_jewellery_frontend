import Image from "next/image";
import Link from "next/link";
import { COLLECTIONS } from "@/constants/homeData";

const MAROON = "#7B1E2B";

// The captions are part of the artwork, so the tile is just the image. Sizing
// each tile to the file's own aspect ratio keeps object-cover from trimming
// the baked-in text off an edge.
function Tile({ collection, className, style, sizes }) {
  return (
    // Link, not <a> — a plain anchor reloads the whole page and the category
    // loader never gets a chance to show.
    <Link
      href={collection.href}
      aria-label={collection.alt}
      className={`group relative block overflow-hidden rounded-lg bg-neutral-100 ${className}`}
      style={style}
    >
      {/* The link carries the name now, so repeating it here would read it
          out twice. */}
      <Image
        src={collection.image}
        alt=""
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </Link>
  );
}

export default function Collections() {
  const [first, ...rest] = COLLECTIONS;

  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 py-10 sm:px-6">
      {/* Heading with a rule running out to both sides */}
      <div className="flex items-center gap-4 sm:gap-6">
        <span className="h-px flex-1 bg-neutral-200" />
        <div className="shrink-0 text-center">
          <h2
            className="flex items-baseline justify-center gap-3 font-[family-name:var(--font-heading)] text-[26px] leading-tight sm:text-[32px] lg:text-[40px]"
            style={{ color: MAROON }}
          >
            <span className="tracking-[0.08em]">SABAA</span>
            <span>Collections</span>
          </h2>
          <p className="mt-0.5 font-[family-name:var(--font-heading)] text-[16px] leading-tight sm:text-[20px] lg:text-[24px] text-neutral-700">
            Explore Our Newly launched
          </p>
        </div>
        <span className="h-px flex-1 bg-neutral-200" />
      </div>

      {/* The tall tile sets the row height; the right column stretches to match
          it and splits that height between its two tiles. */}
      <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        <Tile
          collection={first}
          style={{ aspectRatio: first.ratio }}
          sizes="(max-width: 640px) 100vw, 48vw"
        />

        <div className="flex flex-col gap-3 sm:h-full sm:gap-4">
          {rest.map((collection) => (
            <Tile
              key={collection.id}
              collection={collection}
              className="sm:flex-1"
              style={{ aspectRatio: collection.ratio }}
              sizes="(max-width: 640px) 100vw, 48vw"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
