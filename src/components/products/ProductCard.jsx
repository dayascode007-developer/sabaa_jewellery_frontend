"use client";

import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "@/store/slices/cartSlice";
import { toggleItem, selectIsWishlisted } from "@/store/slices/wishlistSlice";
import ShareMenu from "@/components/products/ShareMenu";
import { getCategoryLabel } from "@/constants/productData";

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
    dispatch(
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        // The cart line shows a thumbnail and an SKU, so they travel with it.
        image: product.image,
        code: product.code,
        quantity: 1,
      })
    );
  };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-neutral-200/80 bg-white transition-shadow duration-300 hover:shadow-[0_6px_24px_rgba(0,0,0,0.09)]">
      {/* Stretched link: covers the whole card so anywhere is clickable, without
          wrapping the markup — nesting a link around some of the text but not
          the rest produces invalid JSX. Controls sit above it on higher z. */}
      <Link
        href={`/product/${product.id}`}
        className="absolute inset-0 z-10"
        aria-label={product.title}
      />

      {/* Square normally. On hover it gives up exactly the 44px the button row
          takes, so the card's total height never changes and the grid cannot
          shove its neighbours around.
          Sized with padding-bottom rather than aspect-square because a
          percentage padding can be transitioned; an aspect ratio cannot be
          relied on to animate. */}
      <div className="relative w-full overflow-hidden bg-neutral-100 pb-[100%] transition-[padding-bottom] duration-300 ease-out group-hover:pb-[calc(100%-44px)] group-focus-within:pb-[calc(100%-44px)]">
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

        {/* Share + wishlist, stacked top-right — unchanged. */}
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

      {/* Left-aligned, like the reference. Centred text made every card look
          like a poster; ranged left, the eye runs straight down the column of
          names and prices. */}
      <div className="flex flex-1 flex-col px-4 pt-3.5 pb-4">
        {/* Category, in its original place above the title. Shown as its proper
            label rather than the raw slug the card used to print. */}
        <p className="text-[10px] tracking-[0.12em] text-neutral-500 uppercase">
          {getCategoryLabel(product.category)}
        </p>

        <h3 className="mt-1.5 line-clamp-2 min-h-[2.6em] text-[15px] leading-snug text-neutral-800 transition-colors group-hover:text-[#7B1E2B]">
          {product.title}
        </h3>

        <p className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="text-[17px] font-semibold text-neutral-900">
            {rupees(product.price)}
          </span>
          {product.mrp && product.mrp > product.price ? (
            <>
              <span className="text-[13px] text-neutral-400 line-through">
                {rupees(product.mrp)}
              </span>
              {/* The saving, said in words rather than shouted from a green
                  flag over the photograph. */}
              <span className="text-[12px] font-medium" style={{ color: "#2E7D32" }}>
                {discount}% off
              </span>
            </>
          ) : null}
        </p>

        {/* Opens to exactly the 44px the image gave up. The two transitions are
            the same length, so the card breathes in one place and out in the
            other and its height stays put. */}
        <div className="mt-auto h-0 w-full overflow-hidden transition-[height] duration-300 ease-out group-hover:h-11 group-focus-within:h-11">
          <button
            type="button"
            onClick={onAddToCart}
            className="relative z-20 mt-1.5 inline-flex h-[38px] w-full items-center justify-center gap-2 rounded text-[12px] font-medium text-white transition-opacity hover:opacity-90"
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
