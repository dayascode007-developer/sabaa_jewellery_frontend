"use client";

import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "@/store/slices/cartSlice";
import { toggleItem, selectIsWishlisted } from "@/store/slices/wishlistSlice";
import ShareMenu from "@/components/products/ShareMenu";

const MAROON = "#7B1E2B";

const rupees = (n) =>
  "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const wishlisted = useSelector(selectIsWishlisted(product.id));

  // Derived rather than stored, so the badge can never contradict the prices.
  const discount =
    product.mrp && product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  // The card is covered by a stretched link, so every control on top of it must
  // stop the click from bubbling up and navigating away.
  const stop = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onWishlist = (e) => {
    stop(e);
    dispatch(toggleItem({ id: product.id, title: product.title, price: product.price }));
  };

  const onAddToCart = (e) => {
    stop(e);
    dispatch(addItem({ id: product.id, title: product.title, price: product.price, quantity: 1 }));
  };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white transition-shadow hover:shadow-lg">
      {/* Stretched link: covers the whole card so anywhere is clickable, without
          wrapping the markup — nesting a link around some of the text but not
          the rest produces invalid JSX. Controls sit above it on higher z. */}
      <Link
        href={`/product/${product.id}`}
        className="absolute inset-0 z-10"
        aria-label={product.title}
      />

      <div className="relative aspect-square w-full overflow-hidden bg-neutral-100">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#EDE3D3] via-[#E3D5BE] to-[#D8C6A8] p-3 text-center">
            <span className="text-[10px] leading-tight text-[#8A6E45]">{product.title}</span>
          </div>
        )}

        {discount > 0 ? (
          <span className="absolute top-2 left-2 z-20 rounded bg-[#2E7D32] px-1.5 py-0.5 text-[11px] font-medium text-white">
            -{discount}%
          </span>
        ) : null}

        {/* Share + wishlist, stacked top-right */}
        <div className="absolute top-2 right-2 z-30 flex flex-col gap-2">
          <ShareMenu title={product.title} path={`/product/${product.id}`} />

          <button
            type="button"
            onClick={onWishlist}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={wishlisted}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/95 shadow-sm ring-1 ring-neutral-200 transition-transform hover:scale-105"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              // Filled once wishlisted, so the card shows its own state.
              fill={wishlisted ? MAROON : "none"}
              stroke={wishlisted ? MAROON : "#6B6B6B"}
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 20s-7.5-4.6-7.5-9.6A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20Z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center px-3 pt-3 pb-4 text-center">
        <p className="text-[10px] tracking-[0.12em] text-neutral-500 uppercase">
          {product.category}
        </p>

        <h3 className="mt-1.5 font-[family-name:var(--font-heading)] text-[14px] leading-snug text-neutral-800 transition-colors group-hover:text-[#7B1E2B]">
          {product.title}
        </h3>

        <p className="mt-2 flex items-baseline justify-center gap-2">
          {product.mrp && product.mrp > product.price ? (
            <span className="text-[12px] text-neutral-400 line-through">{rupees(product.mrp)}</span>
          ) : null}
          <span className="text-[14px] font-semibold text-neutral-900">{rupees(product.price)}</span>
        </p>

        {/* Collapsed in the normal flow, so expanding on hover does not change
            the card's height and shove the grid around. */}
        <div className="mt-2 w-full max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-16 group-hover:opacity-100">
          <button
            type="button"
            onClick={onAddToCart}
            className="relative z-20 mt-1 inline-flex w-full items-center justify-center gap-2 rounded px-4 py-2.5 text-[12px] font-medium text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: MAROON }}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d="M3 4h2.2l2.3 11.2a1.6 1.6 0 0 0 1.6 1.3h8.3a1.6 1.6 0 0 0 1.6-1.3L21 7.5H6" />
              <circle cx="9.5" cy="20" r="1.4" />
              <circle cx="17.5" cy="20" r="1.4" />
            </svg>
            Add To Cart
          </button>
        </div>
      </div>
    </article>
  );
}
