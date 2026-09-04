"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartCount,
  selectCartSubtotal,
  setQuantity,
  removeItem,
  clearCart,
} from "@/store/slices/cartSlice";

const MAROON = "#7B1E2B";

const rupees = (n) =>
  "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function Stepper({ item }) {
  const dispatch = useDispatch();
  const set = (q) => dispatch(setQuantity({ id: item.id, quantity: q }));

  return (
    <div className="inline-flex items-stretch overflow-hidden rounded border border-neutral-300">
      <button
        type="button"
        onClick={() => set(item.quantity - 1)}
        aria-label="Decrease quantity"
        className="w-8 text-[16px] leading-none text-neutral-600 transition-colors hover:bg-neutral-50"
      >
        −
      </button>
      <span className="w-10 border-x border-neutral-300 py-1.5 text-center text-[14px] font-medium text-neutral-900">
        {item.quantity}
      </span>
      <button
        type="button"
        onClick={() => set(item.quantity + 1)}
        aria-label="Increase quantity"
        className="w-8 text-[16px] leading-none text-neutral-600 transition-colors hover:bg-neutral-50"
      >
        +
      </button>
    </div>
  );
}

function CartLine({ item }) {
  const dispatch = useDispatch();

  // Only the parts that were actually recorded, joined with a dot — an empty
  // "Ring Size:" reads worse than no line at all.
  const meta = [
    item.metal ?? "Panchaloga",
    item.size ? `Ring Size: ${item.size}` : null,
    item.ringName ? `Name: ${item.ringName}` : null,
  ]
    .filter(Boolean)
    .join(" • ");

  return (
    <article className="flex gap-4 rounded-lg border border-neutral-200 bg-white p-3 sm:p-4">
      <Link
        href={`/product/${item.id}`}
        className="relative h-24 w-24 shrink-0 overflow-hidden rounded bg-neutral-100 sm:h-28 sm:w-28"
      >
        {item.image ? (
          <Image src={item.image} alt="" fill sizes="112px" className="object-cover" />
        ) : (
          <span className="block h-full w-full bg-gradient-to-br from-[#EDE3D3] to-[#D8C6A8]" />
        )}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <Link
            href={`/product/${item.id}`}
            className="text-[15px] leading-snug font-medium text-neutral-900 transition-colors hover:text-[#7B1E2B]"
          >
            {item.title}
          </Link>

          <button
            type="button"
            onClick={() => dispatch(removeItem(item.id))}
            className="flex shrink-0 items-center gap-1 text-[12px] transition-opacity hover:opacity-70"
            style={{ color: MAROON }}
          >
            Remove
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 7h16M9.5 7V5h5v2M6.5 7l.8 12.2h9.4L17.5 7" />
            </svg>
          </button>
        </div>

        <p className="mt-1 text-[12px] text-neutral-500">{meta}</p>
        {item.code ? (
          <p className="text-[12px] text-neutral-400">SKU: {item.code}</p>
        ) : null}

        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          <Stepper item={item} />
          <span className="text-[16px] font-semibold text-neutral-900">
            {rupees(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </article>
  );
}

function SummaryRow({ label, value, accent }) {
  return (
    <div className="flex items-baseline justify-between gap-4 text-[13px]">
      <span className="text-neutral-600">{label}</span>
      <span className={accent ? "font-medium" : "text-neutral-800"} style={accent ? { color: accent } : undefined}>
        {value}
      </span>
    </div>
  );
}

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const count = useSelector(selectCartCount);
  const subtotal = useSelector(selectCartSubtotal);

  const [coupon, setCoupon] = useState("");
  // Nothing validates a code yet — the API decides what is valid, so the field
  // collects it and the discount stays at zero until that exists.
  const discount = 0;

  if (items.length === 0) {
    return (
      <main className="mx-auto w-full max-w-[1400px] px-4 py-16 text-center sm:px-6">
        <span
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
          style={{ backgroundColor: "#FDF0F2", color: MAROON }}
        >
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 4h2.2l2.3 11.2a1.6 1.6 0 0 0 1.6 1.3h8.3a1.6 1.6 0 0 0 1.6-1.3L21 7.5H6" />
            <circle cx="9.5" cy="20" r="1.2" />
            <circle cx="17.5" cy="20" r="1.2" />
          </svg>
        </span>
        <h1
          className="mt-4 font-[family-name:var(--font-heading)] text-[26px] leading-tight sm:text-[32px]"
          style={{ color: MAROON }}
        >
          Your cart is empty
        </h1>
        <p className="mt-2 text-[15px] text-neutral-600">
          Nothing here yet — the pieces you add will show up on this page.
        </p>
        <Link
          href="/category/all-jewellery"
          className="mt-6 inline-block rounded-md px-6 py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: MAROON }}
        >
          Start shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1
          className="font-[family-name:var(--font-heading)] text-[26px] leading-tight sm:text-[32px]"
          style={{ color: MAROON }}
        >
          My Cart{" "}
          <span className="text-[16px] font-normal text-neutral-500">
            ({count} {count === 1 ? "Item" : "Items"})
          </span>
        </h1>

        <div className="flex items-center gap-5 text-[13px]">
          <Link
            href="/category/all-jewellery"
            className="flex items-center gap-1 text-neutral-600 transition-colors hover:text-neutral-900"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" />
            </svg>
            Continue Shopping
          </Link>

          <button
            type="button"
            onClick={() => dispatch(clearCart())}
            className="flex items-center gap-1 transition-opacity hover:opacity-70"
            style={{ color: MAROON }}
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 7h16M9.5 7V5h5v2M6.5 7l.8 12.2h9.4L17.5 7" />
            </svg>
            Clear Cart
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_340px]">
        {/* Lines */}
        <div className="space-y-4">
          {items.map((item) => (
            <CartLine key={item.id} item={item} />
          ))}
        </div>

        {/* Coupon + summary */}
        <div className="space-y-5">
          <div className="rounded-lg border border-neutral-200 bg-white p-4">
            <p className="flex items-center gap-2.5 text-[14px] font-medium text-neutral-800">
              <span
                className="flex h-9 w-9 items-center justify-center rounded"
                style={{ backgroundColor: "#FDF0F2", color: MAROON }}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3.5 8.5V6.5h17v2a2 2 0 0 0 0 7v2h-17v-2a2 2 0 0 0 0-7Z" />
                  <path d="M9.5 9.5l5 5M9.8 9.8h.01M14.2 14.2h.01" />
                </svg>
              </span>
              Have a Coupon?
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-3 flex items-stretch overflow-hidden rounded border border-neutral-300"
            >
              <label htmlFor="coupon" className="sr-only">
                Coupon code
              </label>
              <input
                id="coupon"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Enter Coupon Code"
                className="min-w-0 flex-1 px-3 py-2.5 text-[13px] text-neutral-800 outline-none placeholder:text-neutral-400"
              />
              <button
                type="submit"
                className="shrink-0 border-l border-neutral-300 px-5 text-[13px] font-medium transition-colors hover:bg-[#FDF0F2]"
                style={{ color: MAROON }}
              >
                Apply
              </button>
            </form>
          </div>

          <div className="rounded-lg border border-neutral-200 bg-white p-4">
            <h2
              className="font-[family-name:var(--font-heading)] text-[20px] leading-none"
              style={{ color: MAROON }}
            >
              Order Summary
            </h2>

            <div className="mt-4 space-y-2.5 border-b border-neutral-200 pb-4">
              <SummaryRow label={`Items (${count})`} value={rupees(subtotal)} />
              <SummaryRow label="Subtotal" value={rupees(subtotal)} />
              <SummaryRow label="Shipping" value="FREE" accent="#1E7A45" />
              <SummaryRow label="Discount" value={rupees(discount)} />
            </div>

            <div className="mt-4 flex items-baseline justify-between gap-4">
              <span
                className="font-[family-name:var(--font-heading)] text-[17px]"
                style={{ color: MAROON }}
              >
                Grand Total
              </span>
              <span className="text-[20px] font-semibold text-neutral-900">
                {rupees(subtotal - discount)}
              </span>
            </div>

            <button
              type="button"
              className="mt-4 w-full rounded-md py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: MAROON }}
            >
              Place Order
            </button>

            <p className="mt-2.5 flex items-center justify-center gap-1.5 text-[12px] text-neutral-500">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3.5 19 6v6c0 4.2-2.9 7.5-7 8.5-4.1-1-7-4.3-7-8.5V6l7-2.5Z" />
                <path d="M9.2 12.2 11.4 14.4 15.7 10" />
              </svg>
              100% Secure Checkout
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
