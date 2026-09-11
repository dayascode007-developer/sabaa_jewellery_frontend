import { getImageProps } from "next/image";
import { PROMO_BANNER } from "@/constants/homeData";

// Image-only: the headline, trust badges and both CTAs are painted into the
// artwork. Sizing to the file's native ratio keeps object-cover from cropping
// the buttons off the bottom-left.
//
// Two cuts of the same artwork, art-directed with <picture>: the wide strip
// from sm up, and a square cut on phones, where the strip's painted-in text is
// too small to read. <picture> rather than two <Image>s side by side, so each
// device downloads only the one file it shows.
export default function PromoBanner() {
  const common = { alt: PROMO_BANNER.alt, fill: true };

  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...common,
    src: PROMO_BANNER.image,
    sizes: "(max-width: 1400px) 100vw, 1400px",
  });

  const {
    props: { srcSet: mobileSrcSet, ...rest },
  } = getImageProps({
    ...common,
    src: PROMO_BANNER.mobileImage ?? PROMO_BANNER.image,
    sizes: "100vw",
  });

  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6">
      {/* Maroon, like the site's other section headings — it was near-black. */}
      <h2 className="mb-4 text-center font-[family-name:var(--font-heading)] text-[26px] leading-tight font-semibold text-[#7B1E2B] sm:text-[32px] lg:text-[40px]">
        Crafted for You
      </h2>

      <a
        href={PROMO_BANNER.href}
        // Square on phones to match the 1024x1024 mobile cut; the wide strip's
        // own 1774/511 ratio from sm up. A frame of the wrong shape would crop
        // whichever image was in it.
        className="group relative block aspect-square overflow-hidden rounded-lg bg-neutral-900 sm:aspect-[1774/511]"
      >
        <picture>
          <source media="(min-width: 640px)" srcSet={desktopSrcSet} />
          <source media="(max-width: 639px)" srcSet={mobileSrcSet} />
          <img
            {...rest}
            alt={PROMO_BANNER.alt}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </picture>
      </a>
    </section>
  );
}
