import Image from "next/image";
import Link from "next/link";
import { NEW_ARRIVALS, NEW_ARRIVALS_BANNER } from "@/constants/homeData";

// The caption and its diamond rule are part of the artwork, so the tile is just
// the image. Sizing to the file's own aspect ratio stops object-cover trimming
// the baked-in label off the bottom-left corner.
function ArrivalTile({ item }) {
  return (
    // Link, not <a> — a plain anchor reloads the whole page and the category
    // loader never gets a chance to show.
    <Link
      href={item.href}
      aria-label={item.alt}
      className="group relative block overflow-hidden rounded-sm ring-1 ring-white/60"
      style={{ aspectRatio: item.ratio }}
    >
      {/* The link carries the name now, so repeating it here would read it
          out twice. */}
      <Image
        src={item.image}
        alt=""
        fill
        sizes="(max-width: 768px) 90vw, 44vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </Link>
  );
}

export default function NewArrivals() {
  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 pb-8 sm:px-6">
      {/* Heading, badge and copy are painted into the file, so nothing is
          overlaid here. The source is 1717x916 (1.87) — rendering that natively
          makes the banner roughly twice as tall as the design, so it is cropped
          to a 5:2 strip. object-cover centres the crop, which keeps the copy
          and both engraved rings and trims only the empty top and bottom. */}
      {/* On phones the crop is relaxed toward the file's native 1.87 so less of
          the artwork is thrown away; the 5:2 strip returns from sm up. */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-sm sm:aspect-[5/2]">
        <Image
          src={NEW_ARRIVALS_BANNER.image}
          alt={NEW_ARRIVALS_BANNER.alt}
          fill
          sizes="(max-width: 1400px) 100vw, 1400px"
          className="object-cover"
        />
      </div>

      {/* Pulled up so the first row overlaps the banner's empty lower band. A
          percentage margin tracks the banner height as it scales, which a fixed
          -mt would not. 7% leaves the engraved rings (which end at 79% of the
          banner) clear; 8% clipped them by a few pixels. */}
      <div className="relative z-10 -mt-[7%] px-2 sm:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {NEW_ARRIVALS.map((item) => (
            <ArrivalTile key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
