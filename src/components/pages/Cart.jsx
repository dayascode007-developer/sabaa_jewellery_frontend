"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
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

function Stepper({ item }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const updateQty = (newQty) => {
    const productId = item.product_id || item.id;
    console.log(`📊 Quantity Update - Product ID: ${productId}, New Quantity: ${newQty}`);

    if (newQty <= 0) {
      console.log(`🗑️ Removing item ${productId} from cart`);
      dispatch(removeFromCart(productId));
    } else {
      setLoading(true);
      console.log(`⬆️ Updating quantity for ${productId} to ${newQty}`);
      dispatch(updateCartQuantity({ productId, quantity: newQty }));
      setLoading(false);
      console.log(`✅ Quantity updated successfully`);
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
        href={`/product/${item.id}`}
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
            href={`/product/${item.id}`}
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
              <path d="M4 7h16M9.5 7V5h5v2M6.5 7l.8 12.2h9.4L17.5 7" />
            </svg>
          </button>
        </div>

        <p className="mt-1 text-[12px] text-neutral-500">{meta}</p>
        {item.code ? (
          <p className="text-[12px] text-neutral-400">SKU: {item.code}</p>
        ) : null}

        <div className="mt-auto flex flex-col-reverse md:flex-row md:items-end md:justify-between gap-3 pt-3">
          <div className="flex flex-col">
            <Stepper item={item} />
            {item.limit_purchases && (
              <p className="mt-1 text-[11px] text-neutral-600">
                * Maximum allowed qty 1
              </p>
            )}
          </div>
          <span className="font-semibold text-neutral-900 flex-shrink-0 whitespace-nowrap md:text-right" style={{fontSize: 'clamp(14px, 4vw, 18px)'}}>
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
    console.log("🛒 Cart Component Mounted - Fetching cart items from API");
    dispatch(fetchCart()).then(() => {
      console.log("✅ Cart items loaded:", items.length);
    });
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
          <span className="text-[16px] font-normal text-neutral-500">
            ({totalCount} {totalCount === 1 ? "Item" : "Items"})
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
            onClick={() => {
              if (window.confirm("Clear your entire cart?")) {
                dispatch(clearCart());
              }
            }}
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
          <div className="flex items-center justify-between gap-3 rounded-lg border border-neutral-200 bg-white px-4 py-3">
            <label className="flex cursor-pointer items-center gap-2.5 text-[14px] font-medium text-neutral-800">
              <input
                type="checkbox"
                checked={allSelected}
                // Some ticked but not all — shown as a dash rather than a tick.
                ref={(el) => {
                  if (el) el.indeterminate = !allSelected && selectedItems.length > 0;
                }}
                onChange={toggleAll}
                className="h-[18px] w-[18px] cursor-pointer accent-[#7B1E2B]"
              />
              Select All
            </label>

            <span className="text-[13px] text-neutral-500">
              {selectedItems.length} of {items.length} selected
            </span>
          </div>

          {items.map((item) => (
            <CartLine
              key={item.id}
              item={item}
              selected={!unselected.has(item.id)}
              onToggle={toggleOne}
            />
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
              {discount > 0 && (
                <SummaryRow
                  label={`Discount (${appliedCoupon.code})`}
                  value={`−${rupees(discount)}`}
                  accent="#1E7A45"
                />
              )}
            </div>

            <div className="mt-4 flex items-baseline justify-between gap-4">
              <span
                className="font-[family-name:var(--font-heading)] text-[17px]"
                style={{ color: MAROON }}
              >
                Grand Total
              </span>
              <span className="text-[20px] font-semibold text-neutral-900">
                {rupees(orderSummary.grandTotal)}
              </span>
            </div>

            {/* Muted with nothing ticked — there is nothing to check out, and
                the button itself says so rather than failing on click.
                A Link when it is usable, a disabled button when it is not:
                an <a> cannot be disabled. */}
            {selectedItems.length ? (
              <Link
                href="/checkout"
                className="mt-4 block w-full rounded-md py-3 text-center text-[15px] font-medium text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: MAROON }}
              >
                Proceed to Payment ({selectedItems.length})
              </Link>
            ) : (
              <button
                type="button"
                disabled
                className="mt-4 w-full cursor-not-allowed rounded-md py-3 text-[15px] font-medium text-white"
                style={{ backgroundColor: "#CFA9B0" }}
              >
                Select items to order
              </button>
            )}

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
