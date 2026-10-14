"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { SlHandbag } from "react-icons/sl";
import { BiSolidOffer } from "react-icons/bi";

import { addToCart, selectCartItems } from "@/store/slices/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/store/slices/wishlistSlice";
import SuccessModal from "@/components/common/SuccessModal";
import AuthModal from "@/components/common/AuthModal";

const MAROON = "#7B1E2B";

const toSlug = (name) =>
  name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/&/g, "")
    .replace(/--+/g, "-");

const rupees = (n) =>
  "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const cartItems = useSelector(selectCartItems);

  const wishlisted = useMemo(() => {
    return (wishlistItems || []).some(
      (item) => item?.product_id === product.id || item?.id === product.id
    );
  }, [wishlistItems, product.id]);

  const inCart = useMemo(() => {
    return (cartItems || []).some(
      (item) => item?.product_id === product.id || item?.id === product.id
    );
  }, [cartItems, product.id]);

  // Without this the click looked like it had done nothing — the item went in
  // silently and only the header badge changed.
  const [added, setAdded] = useState(false);
  const [wishlistSuccess, setWishlistSuccess] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null); // "addToCart" or "wishlist"
  // The dialog is portalled to <body>, which does not exist during the server
  // render, so it can only be mounted once we are on the client.
  const [mounted, setMounted] = useState(false);
  const isAddingToWishlist = useRef(false);

  useEffect(() => setMounted(true), []);

  // Staggered reveal: each card fades and lifts into place the first time it
  // scrolls into view, offset slightly from its neighbours so a row arrives as
  // a ripple rather than all at once.
  //
  // The delay comes from the card's position within its own grid, wrapped every
  // four, so the stagger stays under a quarter second no matter how far down
  // the page a card sits. A plain running index would leave card fifty waiting
  // three seconds after it had already been scrolled past.
  const cardRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    // Browsers without IntersectionObserver must not be left looking at an
    // invisible grid. Scheduled rather than called straight here, so this never
    // sets state synchronously inside the effect.
    if (typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setRevealed(true));
      return () => cancelAnimationFrame(id);
    }

    // Written to the node rather than held in state: the delay only affects
    // styling, so re-rendering every card just to store a number is wasted
    // work. Wrapped every four so the stagger stays under a quarter second
    // however far down the page a card sits — a plain running index would
    // leave card fifty waiting three seconds after it had been scrolled past.
    const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
    el.style.transitionDelay = `${(siblings.indexOf(el) % 4) * 70}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setRevealed(true);
        // Once revealed it stays revealed; scrolling back up must not replay it.
        observer.disconnect();
      },
      // The negative margin holds the reveal until the card is properly in
      // view, rather than firing while its first pixel is still off-screen.
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Show modal when item is added to wishlist
  useEffect(() => {
    if (isAddingToWishlist.current && wishlisted) {
      setWishlistSuccess(true);
      isAddingToWishlist.current = false;
    }
  }, [wishlisted, product.id]);

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
    if (!token) {
      setPendingAction("wishlist");
      setAuthOpen(true);
      return;
    }

    if (wishlisted) {
      dispatch(removeFromWishlist(product.id));
    } else {
      isAddingToWishlist.current = true;
      dispatch(addToWishlist(product.id));
    }
  };

  const onAddToCart = async (e) => {
    stop(e);

    if (!token) {
      setPendingAction("addToCart");
      setAuthOpen(true);
      return;
    }

    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      ...(product.code ? { sku: product.code } : {}),
      quantity: 1,
    };

    try {
      await dispatch(addToCart(cartItem)).unwrap();

      // Remove from wishlist after successful add to cart
      dispatch(removeFromWishlist(product.id));

      setAdded(true);
    } catch (error) {
      alert(`Failed to add to cart: ${error}`);
    }
  };

  return (
    <article
      ref={cardRef}
      // motion-reduce keeps the card fully visible for anyone who has asked
      // their system for less movement — a long grid of sliding cards is
      // genuinely unpleasant for them.
      className={`group relative flex flex-col overflow-hidden rounded-lg border border-neutral-200/80 bg-white transition-[opacity,transform,box-shadow] duration-500 ease-out hover:shadow-[0_6px_24px_rgba(0,0,0,0.09)] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
    >
      {/* Stretched link: covers the whole card so anywhere is clickable, without
          wrapping the markup — nesting a link around some of the text but not
          the rest produces invalid JSX. Controls sit above it on higher z. */}
      <Link
        href={`/product/${product.id}-${toSlug(product.title)}`}
        className="absolute inset-0 z-10"
        aria-label={product.title}
      />

      {/* Rectangular (80% height) on mobile, square on larger screens. On hover it gives up exactly the 44px the button row
          takes, so the card's total height never changes and the grid cannot
          shove its neighbours around.
          Sized with padding-bottom rather than aspect-square because a
          percentage padding can be transitioned; an aspect ratio cannot be
          relied on to animate. */}
      <div className="relative w-full overflow-hidden bg-neutral-100 pb-[80%] transition-[padding-bottom] duration-300 ease-out sm:pb-[100%] group-hover:pb-[calc(80%-30px)] sm:group-hover:pb-[calc(100%-44px)] group-focus-within:pb-[calc(80%-30px)] sm:group-focus-within:pb-[calc(100%-44px)]">
        {product.image ? (
          typeof product.image === "string" && product.image.startsWith("http") ? (
            <img
              src={product.image}
              alt={product.title}
              className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${revealed ? "scale-100" : "scale-75"} motion-reduce:scale-100`}
            />
          ) : (
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${revealed ? "scale-100" : "scale-75"} motion-reduce:scale-100`}
            />
          )
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#EDE3D3] via-[#E3D5BE] to-[#D8C6A8] p-3 text-center">
            <span className="text-[10px] leading-tight text-[#8A6E45]">{product.title}</span>
          </div>
        )}

        {/* Wishlist button, top-right */}
        <div className="absolute top-1.5 right-1.5 z-30 flex flex-col gap-1.5 sm:top-2 sm:right-2 sm:gap-2">
          <button
            type="button"
            onClick={onWishlist}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={wishlisted}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/95 shadow-sm ring-1 ring-neutral-200 transition-transform hover:scale-105 sm:h-8 sm:w-8"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5 sm:h-4 sm:w-4"
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
      <div className="flex flex-1 flex-col px-2 py-1.5 sm:px-4 sm:pt-3.5 sm:pb-4">
        <h3 className="font-[family-name:var(--font-heading)] mt-0 line-clamp-2 min-h-[1.6em] text-[12px] leading-tight text-neutral-800 transition-colors group-hover:text-[#7B1E2B] sm:mt-0 sm:min-h-[2.6em] sm:text-[15px] sm:leading-snug">
          {product.title}
        </h3>

        <div className="mt-1 sm:mt-2">
          <p className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1 sm:gap-x-2 sm:gap-y-0.5">
            <span className="text-[17px] font-semibold text-neutral-900">
              {rupees(product.price)}
            </span>
            {product.mrp && product.mrp > product.price ? (
              <>
                <span className="text-[13px] text-neutral-400 line-through">
                  {rupees(product.mrp)}
                </span>
                {/* Premium discount text with animation */}
                <span
                  className="w-full sm:w-auto text-[10px] sm:text-[12px] font-bold inline-flex items-center gap-0.5"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #DD9836, #FFB347, #DD9836)",
                    backgroundSize: "200% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "shimmer 3s ease-in-out infinite"
                  }}
                >
                  <BiSolidOffer className="h-3 w-3 sm:h-4 sm:w-4" style={{ color: "#DD9836" }} />
                  {discount} off
                </span>
              </>
            ) : null}
          </p>
        </div>

        {/* Mobile: always show button. Desktop: show only on hover. */}
        <div className="mt-auto h-8 w-full overflow-hidden transition-[height] duration-300 ease-out sm:h-11 md:h-0 md:group-hover:h-11 md:group-focus-within:h-11">
          <Link
            href={`/product/${product.id}-${toSlug(product.title)}`}
            className="relative z-20 mt-0.5 inline-flex h-[30px] w-full items-center justify-center gap-1.5 rounded-full font-[family-name:var(--font-category)] text-[10px] font-medium transition-colors hover:bg-[#7B1E2B] hover:text-white sm:mt-1.5 sm:h-[38px] sm:gap-2 sm:text-[12px]"
            style={{ borderWidth: "1.5px", borderColor: MAROON, color: MAROON, backgroundColor: "transparent" }}
          >
            <SlHandbag className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            Click Here
          </Link>
        </div>
      </div>

      {/* Portalled to <body> rather than rendered here: the card lives inside
          the 3D slider on the home page, and a transformed ancestor makes a
          position:fixed overlay lay itself out inside the card instead of the
          viewport. */}
      {mounted && added
        ? createPortal(
            <SuccessModal
              isOpen
              message={`${product.title} has been added to your cart.`}
              onClose={() => setAdded(false)}
            />,
            document.body
          )
        : null}

      {/* Wishlist success modal */}
      {mounted && wishlistSuccess
        ? createPortal(
            <SuccessModal
              isOpen
              message={`${product.title} has been added to your wishlist.`}
              onClose={() => setWishlistSuccess(false)}
            />,
            document.body
          )
        : null}

      {/* Auth modal for login/signup */}
      {mounted ? (
        <AuthModal
          open={authOpen}
          onClose={() => setAuthOpen(false)}
        />
      ) : null}
    </article>
  );
}
