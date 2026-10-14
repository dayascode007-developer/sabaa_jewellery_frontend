import RevealTile from "@/components/common/RevealTile";
import { COLLECTIONS } from "@/constants/homeData";

const MAROON = "#7B1E2B";

// The captions are part of the artwork, so the tile is just the image. Sizing
// each tile to the file's own aspect ratio keeps object-cover from trimming
// the baked-in text off an edge.
function Tile({ collection, className = "", style, sizes, index = 0 }) {
  return (
    // Renders a Link, not <a> — a plain anchor reloads the whole page and the
    // category loader never gets a chance to show. The link carries the name,
    // so the image itself has empty alt text.
    <RevealTile
      href={collection.href}
      aria-label={collection.alt}
      index={index}
      className={`rounded-lg bg-neutral-100 ${className}`}
      style={style}
      image={{ src: collection.image, alt: "", sizes }}
    />
  );
}

export default function Collections() {
  const [first, ...rest] = COLLECTIONS;

  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6">
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
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        <Tile
          collection={first}
          index={0}
          style={{ aspectRatio: first.ratio }}
          sizes="(max-width: 640px) 100vw, 48vw"
        />

        <div className="flex flex-col gap-3 sm:h-full sm:gap-4">
          {rest.map((collection, i) => (
            <Tile
              key={collection.id}
              collection={collection}
              index={i + 1}
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
