"use client";

import Image from "next/image";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

// next/image plus the product cards' scroll-in zoom.
//
// Kept as its own client component so the sections that use it — Collections,
// NewArrivals, MemoriesInMetal — stay server components. Marking those files
// "use client" instead would ship their whole markup to the browser just to
// animate an image.
//
// `from`/`to` exist for tiles whose resting scale is not 1: the phone-sized
// category cards sit at scale-125 on purpose, so they zoom 100 -> 125 rather
// than 75 -> 100 and keep their crop.
export default function RevealImage({
  // Declared rather than left to the spread so the a11y lint can see it.
  alt = "",
  index = 0,
  className = "",
  from = "scale-75",
  to = "scale-100",
  ...imageProps
}) {
  const [ref, revealed] = useRevealOnScroll(index);

  return (
    <Image
      ref={ref}
      alt={alt}
      className={`transition-[transform,filter,opacity] duration-500 ease-out motion-reduce:scale-100 motion-reduce:blur-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        revealed ? `${to} blur-0 opacity-100` : `${from} blur-[6px] opacity-0`
      } ${className}`}
      {...imageProps}
    />
  );
}
