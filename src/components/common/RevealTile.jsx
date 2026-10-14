"use client";

import Image from "next/image";
import Link from "next/link";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

// An image tile with the same scroll-in effect as ProductCard: the tile fades
// and lifts into place while the image zooms from 75% to full size, and the
// image zooms slightly on hover. No blur.
//
// Kept as its own client component so the sections that use it — Collections,
// NewArrivals, MemoriesInMetal — stay server components. Renders a Link when
// given an href, otherwise a plain div.
export default function RevealTile({
  href,
  index = 0,
  className = "",
  style,
  image,
  ...rest
}) {
  const [ref, revealed] = useRevealOnScroll(index);
  const Tag = href ? Link : "div";

  return (
    <Tag
      ref={ref}
      href={href}
      className={`group relative block overflow-hidden transition-[opacity,transform] duration-500 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      } ${className}`}
      style={style}
      {...rest}
    >
      <Image
        src={image.src}
        alt={image.alt ?? ""}
        fill
        sizes={image.sizes}
        className={`object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
          revealed ? "scale-100" : "scale-75"
        } motion-reduce:scale-100`}
      />
    </Tag>
  );
}
