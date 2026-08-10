import Image from "next/image";
import { PROMO_BANNER } from "@/constants/homeData";

// Image-only: the headline, trust badges and both CTAs are painted into the
// artwork. Sizing to the file's native ratio keeps object-cover from cropping
// the buttons off the bottom-left.
export default function PromoBanner() {
  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6">
      <h2 className="mb-4 text-center font-[family-name:var(--font-heading)] text-[28px] leading-tight font-semibold text-neutral-800">
        Crafted for You
      </h2>

      <a
        href={PROMO_BANNER.href}
        className="group relative block overflow-hidden rounded-lg bg-neutral-900"
        style={{ aspectRatio: PROMO_BANNER.ratio }}
      >
        <Image
          src={PROMO_BANNER.image}
          alt={PROMO_BANNER.alt}
          fill
          sizes="(max-width: 1400px) 100vw, 1400px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </a>
    </section>
  );
}
