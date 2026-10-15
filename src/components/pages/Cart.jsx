"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

import {
  selectCartItems,
  selectCartCount,
  fetchCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} from "@/store/slices/cartSlice";
import {
  validateCoupon,
  selectAppliedCoupon,
  selectCouponError,
  selectCouponLoading,
} from "@/store/slices/couponSlice";
import { selectShippingConfig } from "@/store/slices/settingsSlice";
import { calculateOrderSummary } from "@/utils/orderCalculations";

const MAROON = "#7B1E2B";

const rupees = (n) => {
  if (n === undefined || n === null) return "₹0.00";
  return "₹" + Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const toSlug = (name) =>
  name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/&/g, "")
    .replace(/--+/g, "-");

function Stepper({ item }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const updateQty = (newQty) => {
    const productId = item.product_id || item.id;

    if (newQty <= 0) {
      dispatch(removeFromCart(productId));
    } else {
      setLoading(true);
      dispatch(updateCartQuantity({ productId, quantity: newQty }));
      setLoading(false);
    }
  };

  return (
    <div className="inline-flex items-stretch overflow-hidden rounded border border-neutral-300">
      <button
        type="button"
        onClick={() => updateQty(item.quantity - 1)}
        disabled={loading || item.quantity <= 1}
        aria-label="Decrease quantity"
        className="w-8 text-[16px] leading-none text-neutral-600 transition-colors hover:bg-neutral-50 disabled:opacity-50"
      >
        −
      </button>
      <span className="w-10 border-x border-neutral-300 py-1.5 text-center text-[14px] font-medium text-neutral-900">
        {item.quantity}
      </span>
      <button
        type="button"
        onClick={() => updateQty(item.quantity + 1)}
        disabled={loading || item.limit_purchases}
        aria-label="Increase quantity"
        className="w-8 text-[16px] leading-none text-neutral-600 transition-colors hover:bg-neutral-50 disabled:opacity-50"
      >
        +
      </button>
    </div>
  );
}

function CartLine({ item, selected, onToggle }) {
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
    <article
      className={`flex gap-3 rounded-lg border bg-white p-3 transition-colors sm:gap-4 sm:p-4 ${
        selected ? "border-[#7B1E2B]/40" : "border-neutral-200"
      }`}
    >
      {/* Ticked pieces are the ones that get ordered — the rest stay in the
          cart for later. Sits before the image so a long list can be scanned
          down a single column of boxes. */}
      <label className="flex shrink-0 cursor-pointer items-start pt-0.5">
        <span className="sr-only">Select {item.title} for checkout</span>
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onToggle(item.id)}
          className="h-[18px] w-[18px] cursor-pointer accent-[#7B1E2B]"
        />
      </label>

      <Link
        href={`/product/${item.id}-${toSlug(item.title)}`}
        className="relative h-24 w-24 shrink-0 overflow-hidden rounded bg-neutral-100 sm:h-28 sm:w-28"
      >
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="block h-full w-full bg-gradient-to-br from-[#EDE3D3] to-[#D8C6A8]" />
        )}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <Link
            href={`/product/${item.id}-${toSlug(item.title)}`}
            className="text-[15px] leading-snug font-medium text-neutral-900 transition-colors hover:text-[#7B1E2B]"
          >
            {item.title}
          </Link>

          <button
            type="button"
            onClick={() => dispatch(removeFromCart(item.product_id || item.id))}
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
              <path d="m7 7 10 10M17 7 7 17" />
            </svg>
          </button>
        </div>

        {meta && <p className="mt-1 text-[12px] text-neutral-500">{meta}</p>}

        <div className="mt-3 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <Stepper item={item} />
            {(item?.limit_purchases === true || item?.maxQty === 1) && (
              <p className="text-[12px] text-neutral-600">
                * Maximum allowed qty 1
              </p>
            )}
          </div>
          <span className="text-[14px] font-semibold text-neutral-900">
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
  const cartState = useSelector((state) => state.cart);
  const totalCount = useSelector(selectCartCount);
  const [clearedCart, setClearedCart] = useState(false);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Tracked as the pieces that are NOT ticked, so anything added to the cart
  // afterwards arrives selected without this state having to be kept in sync.
  const [unselected, setUnselected] = useState(() => new Set());

  const toggleOne = (id) =>
    setUnselected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const selectedItems = items.filter((i) => !unselected.has(i.id));
  const allSelected = selectedItems.length === items.length;
  const toggleAll = () =>
    setUnselected(allSelected ? new Set(items.map((i) => i.id)) : new Set());

  // The summary prices what is ticked, not what is in the cart.
  const count = selectedItems.reduce((n, i) => n + i.quantity, 0);
  const subtotal = selectedItems.reduce((t, i) => t + i.price * i.quantity, 0);

  const [coupon, setCoupon] = useState("");
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const appliedCoupon = useSelector(selectAppliedCoupon);
  const couponError = useSelector(selectCouponError);
  const couponLoading = useSelector(selectCouponLoading);
  const shippingConfig = useSelector(selectShippingConfig);

  const discount = appliedCoupon?.discountAmount || 0;
  const orderSummary = calculateOrderSummary(subtotal, discount, shippingConfig);

  const handleCouponChange = (e) => {
    const value = e.target.value;
    // Allow only alphanumeric characters, convert to uppercase
    const filtered = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    setCoupon(filtered);
  };

  const handleApplyCoupon = async (e) => {
    e.preventDefault();

    if (!coupon.trim()) {
      return;
    }

    dispatch(validateCoupon({ code: coupon, cartTotal: subtotal }));
  };

  // Confirmation modal for clearing cart
  if (showClearConfirm) {
    return (
      <main className="mx-auto w-full max-w-[1400px] px-4 py-16 text-center sm:px-6">
        <div className="mx-auto max-w-sm">
          <h2 className="font-[family-name:var(--font-heading)] text-[24px]" style={{ color: MAROON }}>
            Clear cart?
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            This will remove all items from your cart. This action cannot be undone.
          </p>
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => setShowClearConfirm(false)}
              className="flex-1 rounded-md border border-neutral-300 px-4 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                dispatch(clearCart());
                setShowClearConfirm(false);
              }}
              className="flex-1 rounded-md px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: MAROON }}
            >
              Clear Cart
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (cartState.loading) {
    return (
      <main className="mx-auto w-full max-w-[1400px] px-4 py-16 text-center sm:px-6">
        <div className="flex items-center justify-center gap-2">
          <div className="h-2 w-2 rounded-full bg-neutral-300 animate-pulse" />
          <div className="h-2 w-2 rounded-full bg-neutral-300 animate-pulse" style={{ animationDelay: "0.1s" }} />
          <div className="h-2 w-2 rounded-full bg-neutral-300 animate-pulse" style={{ animationDelay: "0.2s" }} />
        </div>
        <p className="mt-4 text-neutral-600">Loading your cart...</p>
      </main>
    );
  }

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
          <span className="text-[18px] font-normal text-neutral-600">
            ({totalCount} {totalCount === 1 ? "item" : "items"})
          </span>
        </h1>

        {items.length > 0 && (
          <button
            type="button"
            onClick={() => setShowClearConfirm(true)}
            className="text-[13px] font-medium transition-opacity hover:opacity-70"
            style={{ color: MAROON }}
          >
            Clear cart
          </button>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <CartLine
              key={item.id}
              item={item}
              selected={!unselected.has(item.id)}
              onToggle={toggleOne}
            />
          ))}
        </div>

        {/* Order Summary */}
        <aside className="rounded-lg border border-neutral-200 bg-white p-4 sm:p-6 h-fit">
          {/* Coupon section */}
          <div className="border-b border-neutral-200 pb-4">
            <p className="flex items-center gap-2 text-[13px] text-neutral-600">
              <span
                className="flex h-5 w-5 items-center justify-center rounded text-[10px]"
                style={{ backgroundColor: MAROON, color: "white" }}
              >
                🎁
              </span>
              Have a Coupon?
            </p>

            {appliedCoupon ? (
              <div className="mt-3 rounded-lg border border-green-200 bg-green-50 p-3">
                <p className="text-[13px] font-medium text-green-900">
                  ✓ {appliedCoupon.code} applied
                </p>
                <p className="text-[12px] text-green-700">
                  {appliedCoupon.description}
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleApplyCoupon}
                className="mt-3 flex items-stretch overflow-hidden rounded border border-neutral-300"
              >
                <label htmlFor="coupon" className="sr-only">
                  Coupon code
                </label>
                <input
                  id="coupon"
                  value={coupon}
                  onChange={handleCouponChange}
                  placeholder="Enter Coupon Code"
                  disabled={couponLoading}
                  className="min-w-0 flex-1 px-3 py-2.5 text-[13px] text-neutral-800 outline-none placeholder:text-neutral-400 disabled:bg-gray-50"
                />
                <button
                  type="submit"
                  disabled={couponLoading || !coupon.trim()}
                  className="shrink-0 border-l border-neutral-300 px-5 text-[13px] font-medium transition-colors hover:bg-[#FDF0F2] disabled:cursor-not-allowed disabled:opacity-50"
                  style={{ color: MAROON }}
                >
                  {couponLoading ? "Validating..." : "Apply"}
                </button>
              </form>
            )}

            {couponError && (
              <p className="mt-2 text-[12px] text-red-600">
                ✗ {couponError}
              </p>
            )}
          </div>

          {/* Order Summary */}
          <div className="mt-6">
            <h2
              className="font-[family-name:var(--font-heading)] text-[18px] font-medium"
              style={{ color: MAROON }}
            >
              Order Summary
            </h2>

            <div className="mt-6 space-y-3">
              <SummaryRow label={`Items (${selectedItems.length})`} value={rupees(subtotal)} />
              <SummaryRow label="Subtotal" value={rupees(subtotal)} />
              {discount > 0 && <SummaryRow label="Discount" value={`-${rupees(discount)}`} accent={MAROON} />}
              <div className="border-t border-neutral-200 pt-3">
                <div className="flex items-baseline justify-between gap-4 text-[16px] font-bold">
                  <span style={{ color: MAROON }}>{`Grand Total`}</span>
                  <span style={{ color: "#000000" }}>{rupees(orderSummary.grandTotal)}</span>
                </div>
              </div>
            </div>

            <Link
              href="/checkout"
              className={`mt-6 block w-full rounded-md py-3 text-center text-[15px] font-semibold text-white transition-opacity hover:opacity-90 ${
                selectedItems.length === 0 ? "cursor-not-allowed opacity-50" : ""
              }`}
              style={{
                backgroundColor: MAROON,
                pointerEvents: selectedItems.length === 0 ? "none" : "auto",
              }}
            >
              {selectedItems.length === 0 ? "Select items to checkout" : "Proceed to Checkout"}
            </Link>

            <p className="mt-3 text-center text-[12px] text-neutral-600 flex items-center justify-center gap-1.5">
              <IoShieldCheckmarkOutline className="h-4 w-4" />
              100% Secure Checkout
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
