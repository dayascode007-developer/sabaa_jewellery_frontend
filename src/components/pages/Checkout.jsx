"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import OrderConfirmation from "./OrderConfirmation";
import { selectCartItems, clearCart } from "@/store/slices/cartSlice";
import { selectShippingConfig } from "@/store/slices/settingsSlice";
import { calculateOrderSummary } from "@/utils/orderCalculations";
import { fetchShippingRatesApi, validatePincodeApi } from "@/store/api/settingsApi";
import {
  selectAddressesList,
  selectSelectedAddressId,
  selectAddressesLoading,
  createAddress,
  selectAddress,
} from "@/store/slices/addressesSlice";
import { selectAppliedCoupon, applyCoupon } from "@/store/slices/couponSlice";
import {
  createRazorpayOrder,
  verifyPayment,
  createOrder,
  selectRazorpayOrder,
  selectPaymentVerified,
  selectOrder,
  selectPaymentLoading,
  selectRazorpayError,
  clearPayment,
} from "@/store/slices/paymentSlice";

const MAROON = "#7B1E2B";
const GOLD = "#C9A227";
const GREEN = "#22C55E";
const COD_ADVANCEMENT = 120; // Fixed advancement payment for COD

const rupees = (n) => {
  if (n === undefined || n === null) return "₹0.00";
  return "₹" + Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const STEPS = ["Address", "Payment", "Ordered Confirm"];

/* ------------------------------------------------------------------ stepper */

function Stepper({ current }) {
  const isLastStep = (i) => i === STEPS.length - 1;
  const icons = [
    // Address icon
    <svg key="address" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>,
    // Payment icon
    <svg key="payment" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>,
    // Checkmark icon
    <svg key="confirm" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>,
  ];

  return (
    <ol className="flex items-start">
      {STEPS.map((label, i) => {
        const done = i < current || (i === current && isLastStep(i));
        const active = i === current && !isLastStep(i);
        return (
          <li key={label} className="flex flex-1 items-start last:flex-none">
            <div className="flex shrink-0 flex-col items-center gap-2">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors"
                style={{
                  borderColor: done || active ? GREEN : "#E5E7EB",
                  backgroundColor: done || active ? GREEN : "#F3F4F6",
                  color: done || active ? "#fff" : "#9CA3AF",
                }}
                aria-hidden="true"
              >
                {done ? (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12.5 4.5 4.5L19 7.5" />
                  </svg>
                ) : (
                  icons[i]
                )}
              </span>
              <span
                className="text-center text-[11px] leading-tight whitespace-nowrap sm:text-[13px] font-medium text-neutral-900"
              >
                {label}
              </span>
            </div>

            {/* Connector. Not after the last step. */}
            {i < STEPS.length - 1 ? (
              <span
                className="mt-5 h-px flex-1 transition-colors"
                style={{ backgroundColor: i < current ? GREEN : "#E0D6CC" }}
                aria-hidden="true"
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

/* ------------------------------------------------------------------- pieces */

function Card({ title, children }) {
  return (
    <section className="rounded-lg border border-[#EFDCD4] bg-white p-4 sm:p-5">
      <h2
        className="font-[family-name:var(--font-heading)] text-[19px] leading-none"
        style={{ color: MAROON }}
      >
        {title}
      </h2>
      <div className="mt-2 flex items-center gap-2">
        <span className="h-px w-10 bg-[#E0CDBA]" />
        <span className="text-[9px]" style={{ color: MAROON }} aria-hidden="true">
          &#10050;
        </span>
        <span className="h-px flex-1 bg-[#E0CDBA]" />
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Field({ label, name, value, onChange, type = "text", maxLength, inputMode, className = "", required = false }) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1 block text-[12px] text-neutral-600">
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        inputMode={inputMode}
        className="w-full rounded-md border border-neutral-300 px-3 py-2.5 text-[14px] text-neutral-800 outline-none transition-colors focus:border-[#7B1E2B]"
      />
    </div>
  );
}

const EMPTY_ADDRESS = {
  name: "",
  mobile: "",
  pincode: "",
  house: "",
  area: "",
  landmark: "",
  city: "",
  state: "",
};

/* ------------------------------------------------------------ payment icons */

const PAY_ICON = {
  online: (
    <>
      <path d="M12 3 5 12l7 9 7-9-7-9Z" />
      <path d="M12 8.5 8.5 12l3.5 3.5L15.5 12 12 8.5Z" />
    </>
  ),
  cod: (
    <>
      <rect x="2.5" y="6.5" width="19" height="11" rx="1.6" />
      <circle cx="12" cy="12" r="2.6" />
      <path d="M6 10v4M18 10v4" />
    </>
  ),
};

// Two ways to pay, each with its own action button — no radio buttons, so one
// tap chooses the method and moves on rather than needing a second click.
const PAYMENT_METHODS = [
  {
    id: "online",
    label: "Online payment",
    note: "UPI, Google Pay, PhonePe, Paytm, card or net banking",
    icon: "online",
    action: "Pay now",
  },
  {
    id: "cod",
    label: "Cash on Delivery",
    note: "Pay the courier when the piece reaches you",
    icon: "cod",
    action: "Place your order",
  },
];

/* ----------------------------------------------------------------- checkout */

export default function Checkout() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const shippingConfig = useSelector(selectShippingConfig) || { deliveryCharge: 200, freeDeliveryAbove: 999 };
  const addresses = useSelector(selectAddressesList);
  const selectedAddressId = useSelector(selectSelectedAddressId);
  const addressesLoading = useSelector(selectAddressesLoading);

  const [step, setStep] = useState(0);
  const appliedCoupon = useSelector(selectAppliedCoupon);
  const [addingAddress, setAddingAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);

  const [address, setAddress] = useState(EMPTY_ADDRESS);
  const [addressType, setAddressType] = useState("home");
  const [savingAddress, setSavingAddress] = useState(false);
  const [addressError, setAddressError] = useState(null);
  const [showCODModal, setShowCODModal] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showLoadingState, setShowLoadingState] = useState(false); // Minimum loader display time
  const [paymentSuccessful, setPaymentSuccessful] = useState(false); // Prevent Payment screen flash after Razorpay success

  // Dynamic shipping rates state
  const [dynamicShippingCost, setDynamicShippingCost] = useState(null);
  const [shippingRatesLoading, setShippingRatesLoading] = useState(false);
  const [availableCouriers, setAvailableCouriers] = useState([]);

  // Store Razorpay instance to close it after payment
  const razorpayInstanceRef = useRef(null);
  const razorpayOpenedRef = useRef(false);
  const paymentDetailsRef = useRef(null); // Store payment verification details
  const orderSummaryRef = useRef(null); // Ref for Order Summary auto-scroll

  // Redux payment state
  const razorpayOrder = useSelector(selectRazorpayOrder);
  const paymentVerified = useSelector(selectPaymentVerified);
  const createdOrder = useSelector(selectOrder);
  const paymentLoading = useSelector(selectPaymentLoading);
  const razorpayError = useSelector(selectRazorpayError);

  const resetRazorpayState = useCallback(() => {
    razorpayOpenedRef.current = false;
    razorpayInstanceRef.current = null;
  }, []);

  const handlePaymentMethodClick = useCallback(
    (methodId, amount = 0) => {
      if (methodId === "cod") {
        setShowCODModal(true);
      } else if (amount > 0) {
        resetRazorpayState();
        dispatch(clearPayment());
        dispatch(createRazorpayOrder(amount));
      }
    },
    [dispatch, resetRazorpayState]
  );

  const handleCODConfirm = useCallback(() => {
    setShowCODModal(false);
    setPaymentMethod("cod");
    // Reset Razorpay state before creating new order (in case they came from a cancelled Online attempt)
    resetRazorpayState();
    dispatch(clearPayment());
    dispatch(createRazorpayOrder(COD_ADVANCEMENT));
  }, [dispatch, resetRazorpayState]);

  // Fetch shipping rates based on payment method (no pincode needed)
  useEffect(() => {
    setShippingRatesLoading(true);

    const method = paymentMethod === "cod" ? "cod" : "prepaid";
    // Use any pincode or dummy pincode since rates are fixed
    fetchShippingRatesApi("560001", 0.5, method)
      .then((data) => {

        // Use the rate from Shiprocket
        const shippingCost = data.rate || (method === "cod" ? 100 : 60);
        setDynamicShippingCost(shippingCost);

        // Show courier info if available
        if (data.courier) {
          setAvailableCouriers([{
            courierName: data.courier,
            rate: data.rate,
          }]);
        }
      })
      .catch((error) => {
        // Fallback: ₹100 for COD, ₹60 for Prepaid
        const fallbackRate = method === "cod" ? 100 : 60;
        setDynamicShippingCost(fallbackRate);
        setAvailableCouriers([]);
      })
      .finally(() => {
        setShippingRatesLoading(false);
      });
  }, [paymentMethod]);

  // Auto-scroll to Order Summary when payment method is selected
  useEffect(() => {
    if (paymentMethod && orderSummaryRef.current) {
      setTimeout(() => {
        orderSummaryRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  }, [paymentMethod]);

  // Handle Razorpay order creation and checkout opening
  useEffect(() => {
    if (razorpayOrder && !paymentLoading && !razorpayOpenedRef.current) {
      razorpayOpenedRef.current = true;
      openRazorpayCheckout();
    }
  }, [razorpayOrder, paymentLoading]);

  const openRazorpayCheckout = () => {
    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => startRazorpayCheckout();
    } else {
      startRazorpayCheckout();
    }
  };

  const startRazorpayCheckout = () => {
    // Disable Razorpay's browser detection to work in all environments
    window.RazorpayConfig = { disable_validation: true };

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      order_id: razorpayOrder.orderId,
      amount: razorpayOrder.amount,
      currency: "INR",
      name: "Sabaa Jewellery",
      description: "Order Purchase",
      handler: handlePaymentSuccess,
      prefill: {
        email: "customer@example.com",
        contact: selectedAddress?.mobile || "",
      },
      theme: { color: MAROON },
      modal: {
        ondismiss: () => {
          // User dismissed Razorpay by clicking X or backing out
          // Reset temporary Razorpay state to allow fresh attempts
          resetRazorpayState();
        },
      },
      redirect: false,
    };

    try {
      // Force Razorpay to ignore browser checks
      const RazorpayCheckout = window.Razorpay;
      const rzp = new RazorpayCheckout(options);
      razorpayInstanceRef.current = rzp;

      // Only trigger failure handler if payment processing hasn't already succeeded
      rzp.on("payment.failed", (error) => {
        if (!isProcessingPayment) {
          setPaymentSuccessful(false); // Reset if payment fails
          resetRazorpayState();
          dispatch(clearPayment());
        }
      });

      rzp.open();
    } catch (error) {
      resetRazorpayState();
      // If Razorpay fails, fallback to COD message
      alert("Online payment unavailable. Please use Cash on Delivery instead.");
      dispatch(clearPayment());
    }
  };

  const handlePaymentSuccess = (response) => {
    // Guard: prevent processing the same payment twice
    if (isProcessingPayment) {
      return;
    }

    // Mark payment as successful to prevent Payment Method screen from flashing
    setPaymentSuccessful(true);

    // Store payment details for later use in order creation
    paymentDetailsRef.current = {
      razorpayOrderId: razorpayOrder.orderId,
      razorpayPaymentId: response.razorpay_payment_id,
      razorpaySignature: response.razorpay_signature,
    };

    setIsProcessingPayment(true);

    // Inject CSS to hide Razorpay modals and show OrderConfirmation
    const injectHidingCSS = () => {
      if (document.getElementById('razorpay-hide-css')) return; // Already injected

      const style = document.createElement('style');
      style.id = 'razorpay-hide-css';
      style.textContent = `
        /* Hide all Razorpay error modals */
        [role="dialog"] { display: none !important; }
        .razorpay-dialog { display: none !important; }
        .razorpay-modal { display: none !important; }
        .razorpay-container { display: none !important; }
        [class*="razorpay"] { display: none !important; }

        /* Hide overlays/backdrops */
        [class*="overlay"] { display: none !important; }
        [class*="backdrop"] { display: none !important; }

        /* Ensure checkout content is visible */
        body { overflow: auto !important; }
      `;
      document.head.appendChild(style);
    };

    injectHidingCSS();

    dispatch(
      verifyPayment({
        razorpayOrderId: razorpayOrder.orderId,
        razorpayPaymentId: response.razorpay_payment_id,
        razorpaySignature: response.razorpay_signature,
      })
    );
  };

  // Handle payment verification and order creation
  useEffect(() => {
    if (paymentVerified && razorpayOrder && !paymentLoading && !createdOrder) {
      // Recalculate order summary with fresh values
      const itemsTotal = items.reduce((t, i) => t + i.price * i.quantity, 0);
      const discount = appliedCoupon?.discountAmount || 0;
      const freshOrderSummary = calculateOrderSummary(itemsTotal, discount, shippingConfig);

      const method = paymentMethod === "cod" ? "cod" : "online";

      // Use dynamic shipping cost if available, otherwise use calculated shipping cost
      const finalShippingCost = dynamicShippingCost !== null ? dynamicShippingCost : freshOrderSummary.shippingCost;

      const orderPayload = {
        subtotal: freshOrderSummary.subtotal,
        discountAmount: discount,
        shippingCost: finalShippingCost,
        paymentMethod: method,
        couponId: appliedCoupon?.couponId || null,
        addressId: selectedAddressId,
        itemCount: items.length,
        cartItems: items, // Send cart items to backend for order_items table
        // Include payment verification details for storing in payment_transactions table
        ...(paymentDetailsRef.current && {
          razorpayOrderId: paymentDetailsRef.current.razorpayOrderId,
          razorpayPaymentId: paymentDetailsRef.current.razorpayPaymentId,
          razorpaySignature: paymentDetailsRef.current.razorpaySignature,
        }),
      };

      dispatch(createOrder(orderPayload));
    }
  }, [paymentVerified, razorpayOrder, paymentLoading, createdOrder, items, shippingConfig, appliedCoupon, paymentMethod, selectedAddressId, dynamicShippingCost, dispatch]);

  // Handle order created (Online payment)
  useEffect(() => {
    if (createdOrder && paymentVerified && paymentMethod !== "cod") {
      if (appliedCoupon) {
        dispatch(
          applyCoupon({
            couponId: appliedCoupon.couponId,
            discountAmount: appliedCoupon.discountAmount,
            orderId: createdOrder.orderId,
          })
        );
      }

      dispatch(clearCart());
      setPaymentMethod(null);
      setPaymentSuccessful(false); // Reset payment success state for next order

      // Show loader for minimum 1.5 seconds, then show confirmation
      console.log("⏱️ Starting loader - 1.5 second display");
      setShowLoadingState(true);
      setStep(2); // Change step FIRST so loader renders while showLoadingState is true
      setTimeout(() => {
        console.log("✅ Loader complete - showing order confirmation");
        setShowLoadingState(false);
        setIsProcessingPayment(false);
      }, 1500);
    }
  }, [createdOrder, paymentVerified, paymentMethod, appliedCoupon, dispatch]);

  // Handle order created (COD payment)
  useEffect(() => {
    if (createdOrder && paymentVerified && paymentMethod === "cod") {
      dispatch(clearCart());
      setPaymentMethod(null);
      setPaymentSuccessful(false); // Reset payment success state for next order

      // Show loader for minimum 1.5 seconds, then show confirmation
      console.log("⏱️ Starting loader - 1.5 second display");
      setShowLoadingState(true);
      setStep(2); // Change step FIRST so loader renders while showLoadingState is true
      setTimeout(() => {
        console.log("✅ Loader complete - showing order confirmation");
        setShowLoadingState(false);
        setIsProcessingPayment(false);
      }, 1500);
    }
  }, [createdOrder, paymentVerified, paymentMethod, dispatch]);

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId) ?? null;

  const saveAddress = async () => {
    setAddressError(null);

    // Validate pincode with Shiprocket
    try {
      const validation = await validatePincodeApi(address.pincode);
      if (!validation.valid) {
        setAddressError("please enter valid pincode");
        return;
      }
    } catch (error) {
      setAddressError("please enter valid pincode");
      return;
    }

    setSavingAddress(true);
    try {
      const addressData = {
        name: address.name,
        mobile: address.mobile,
        pincode: address.pincode,
        house: address.house,
        area: address.area,
        landmark: address.landmark,
        city: address.city,
        state: address.state,
        type: addressType,
        isDefault: addresses.length === 0, // Set first address as default
      };

      let result;
      if (editingAddressId) {
        // Update existing address
        const { updateAddress } = await import("@/store/slices/addressesSlice");
        result = await dispatch(updateAddress({ addressId: editingAddressId, addressData }));
      } else {
        // Create new address
        result = await dispatch(createAddress(addressData));
      }

      if (result.payload) {
        setAddress(EMPTY_ADDRESS);
        setAddressType("home");
        setAddingAddress(false);
        setEditingAddressId(null);
        if (!editingAddressId) {
          dispatch(selectAddress(result.payload.id));
        }
      }
    } catch (error) {
      // Address save failed silently
    } finally {
      setSavingAddress(false);
    }
  };

  const startEditAddress = (addr) => {
    setAddress({
      name: addr.name,
      mobile: addr.mobile,
      pincode: addr.pincode,
      house: addr.house,
      area: addr.area,
      landmark: addr.landmark || "",
      city: addr.city,
      state: addr.state,
    });
    setAddressType(addr.type);
    setEditingAddressId(addr.id);
    setAddingAddress(true);
  };

  const setField = (e) => {
    setAddressError(null);
    setAddress((a) => ({
      ...a,
      // Digits only in the two numeric fields, so a stray letter cannot reach
      // the courier's system later.
      [e.target.name]:
        e.target.name === "mobile" || e.target.name === "pincode"
          ? e.target.value.replace(/\D/g, "")
          : e.target.value,
    }));
  };

  const itemCount = items.reduce((n, i) => n + i.quantity, 0);
  const itemsTotal = items.reduce((t, i) => t + i.price * i.quantity, 0);
  const discount = appliedCoupon?.discountAmount || 0;

  // Use created order data on confirmation step, otherwise use cart calculation
  const orderSummary = step === 2 && createdOrder
    ? {
        subtotal: parseFloat(createdOrder.subtotal || 0),
        grandTotal: parseFloat(createdOrder.total_amount || 0),
        deliveryCharge: parseFloat(createdOrder.shipping_cost || 0),
        freeDelivery: parseFloat(createdOrder.shipping_cost || 0) === 0,
        discountAmount: parseFloat(createdOrder.discount_amount || 0),
      }
    : dynamicShippingCost !== null
    ? {
        subtotal: itemsTotal,
        deliveryCharge: dynamicShippingCost,
        shippingCost: dynamicShippingCost,
        freeDelivery: false,
        discountAmount: discount,
        grandTotal: itemsTotal - discount + dynamicShippingCost, // Calculate with dynamic shipping
      }
    : calculateOrderSummary(itemsTotal, discount, shippingConfig);

  // Enough to move on, not a full validation pass — the server has to check
  // again anyway, and the real rules arrive with the order API.
  const addressReady =
    address.name.trim() &&
    /^[6-9]\d{9}$/.test(address.mobile) &&
    /^\d{6}$/.test(address.pincode) &&
    address.house.trim() &&
    address.area.trim() &&
    address.city.trim() &&
    address.state.trim();

  // Show empty message only if cart is empty AND not on Order Confirmation step
  if (items.length === 0 && step !== 2) {
    return (
      <main className="mx-auto w-full max-w-[1400px] px-4 py-16 text-center sm:px-6">
        <h1
          className="font-[family-name:var(--font-heading)] text-[26px] leading-tight sm:text-[32px]"
          style={{ color: MAROON }}
        >
          There is nothing to check out
        </h1>
        <p className="mt-2 text-[15px] text-neutral-600">
          Add a piece to your cart and it will appear here.
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
      <h1
        className="font-[family-name:var(--font-heading)] text-[26px] leading-tight sm:text-[32px]"
        style={{ color: MAROON }}
      >
        Place Your Order
      </h1>

      <div className="mt-5 rounded-lg border border-[#EFDCD4] bg-[#FDF8F3] px-4 py-4 sm:px-8">
        <Stepper current={step} />
      </div>

      <div className="mt-5 flex flex-col-reverse gap-5 lg:grid lg:grid-cols-[1fr_340px]">
        <div className="space-y-5">
          {/* ---------------------------------------------------- 1. address */}
          {step === 0 && !addingAddress ? (
            <Card title="Saved Addresses">
              {/* Add New sits above the list, as in the reference. */}
              <button
                type="button"
                onClick={() => setAddingAddress(true)}
                className="flex w-full items-center gap-2 rounded-lg bg-[#FDF0F2] px-4 py-3.5 text-left transition-opacity hover:opacity-90"
                style={{ color: MAROON }}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                <span className="flex-1 text-[15px] font-medium">Add New</span>
                <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m9 5 7 7-7 7" />
                </svg>
              </button>

              {addresses.length === 0 ? (
                <div className="pt-8 pb-4 text-center">
                  <p className="mx-auto inline-block rounded-md bg-[#F6F2EE] px-5 py-2.5 text-[15px] text-neutral-600">
                    You do not have any saved address
                  </p>

                  {/* A house with a question mark, drawn rather than an image
                      file so it takes the page's own colours. */}
                  <svg
                    viewBox="0 0 200 150"
                    className="mx-auto mt-6 h-28 w-auto"
                    fill="none"
                    aria-hidden="true"
                  >
                    <ellipse cx="100" cy="128" rx="58" ry="9" fill="#EDE7E1" />
                    <path d="M56 72 100 38l44 34v50H56V72Z" fill="#fff" stroke="#DCD3CB" strokeWidth="4" strokeLinejoin="round" />
                    <path d="M48 76 100 34l52 42" stroke="#DCD3CB" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="122" y="44" width="12" height="22" rx="2" fill="#fff" stroke="#DCD3CB" strokeWidth="4" />
                    <rect x="88" y="92" width="24" height="30" rx="1.5" fill="#F6F2EE" stroke="#DCD3CB" strokeWidth="4" />
                    <rect x="70" y="86" width="14" height="14" rx="1.5" stroke="#DCD3CB" strokeWidth="4" />
                    <path
                      d="M158 34c0-5 4-8 8-8s8 3 8 8c0 5-8 5-8 11"
                      stroke="#C9BFB6"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                    <circle cx="166" cy="58" r="3" fill="#C9BFB6" />
                    <path
                      d="M142 20c0-3.5 2.8-5.5 5.5-5.5s5.5 2 5.5 5.5-5.5 3.5-5.5 7.5"
                      stroke="#D8CFC7"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <circle cx="147.5" cy="36" r="2.2" fill="#D8CFC7" />
                  </svg>
                </div>
              ) : (
                <ul className="mt-3 space-y-2.5">
                  {addresses.map((a) => {
                    const selected = a.id === selectedAddressId;
                    return (
                      <li key={a.id}>
                        <label
                          className="flex cursor-pointer items-start gap-3 rounded-lg border p-3.5 transition-colors"
                          style={
                            selected
                              ? { borderColor: MAROON, backgroundColor: "#FDF0F2" }
                              : { borderColor: "#E5DDD5" }
                          }
                        >
                          <input
                            type="radio"
                            name="address"
                            checked={selected}
                            onChange={() => dispatch(selectAddress(a.id))}
                            className="mt-0.5 h-4 w-4 shrink-0 accent-[#7B1E2B]"
                          />
                          <span className="min-w-0 flex-1">
                            <span className="flex flex-wrap items-center gap-2">
                              <span className="text-[14px] font-medium text-neutral-900">
                                {a.name}
                              </span>
                              <span
                                className="rounded-full px-2 py-0.5 text-[10px] tracking-wide uppercase"
                                style={{ backgroundColor: "#FDF0F2", color: MAROON }}
                              >
                                {a.type}
                              </span>
                            </span>
                            <span className="mt-1 block text-[13px] leading-relaxed text-neutral-600">
                              {a.house}, {a.area}
                              {a.landmark ? `, ${a.landmark}` : ""}
                              <br />
                              {a.city}, {a.state} — {a.pincode}
                              <br />
                              Mobile: {a.mobile}
                            </span>
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              startEditAddress(a);
                            }}
                            className="ml-auto shrink-0 self-start text-neutral-500 transition-colors hover:text-neutral-900"
                            title="Edit address"
                            aria-label="Edit address"
                          >
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          </button>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              )}
            </Card>
          ) : null}

          {step === 0 && addingAddress ? (
            <Card title={editingAddressId ? "Edit Address" : "Add New Address"}>
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <Field label="Full name" name="name" value={address.name} onChange={setField} required />
                <Field
                  label="Mobile number"
                  name="mobile"
                  value={address.mobile}
                  onChange={setField}
                  inputMode="numeric"
                  maxLength={10}
                  required
                />
                <Field
                  label="Pincode"
                  name="pincode"
                  value={address.pincode}
                  onChange={setField}
                  inputMode="numeric"
                  maxLength={6}
                  required
                />
                <Field label="Town / City" name="city" value={address.city} onChange={setField} required />
                <Field
                  label="Flat, house no., building"
                  name="house"
                  value={address.house}
                  onChange={setField}
                  className="sm:col-span-2"
                  required
                />
                <Field
                  label="Area, street, village"
                  name="area"
                  value={address.area}
                  onChange={setField}
                  className="sm:col-span-2"
                  required
                />
                <Field label="Landmark (optional)" name="landmark" value={address.landmark} onChange={setField} />
                <Field label="State" name="state" value={address.state} onChange={setField} required />
              </div>

              <fieldset className="mt-4">
                <legend className="mb-2 text-[12px] text-neutral-600">
                  Address type
                  <span className="text-red-600 ml-1">*</span>
                </legend>
                <div className="flex gap-2.5">
                  {["home", "work"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setAddressType(t)}
                      className="rounded-full border px-4 py-1.5 text-[13px] capitalize transition-colors"
                      style={
                        addressType === t
                          ? { borderColor: MAROON, backgroundColor: "#FDF0F2", color: MAROON }
                          : { borderColor: "#DDD3CA", color: "#6B6B6B" }
                      }
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </fieldset>

              {addressError && (
                <div className="mt-4 rounded-md bg-red-50 border border-red-200 p-3">
                  <p className="text-[14px] text-red-700">{addressError}</p>
                </div>
              )}
            </Card>
          ) : null}

          {/* ---------------------------------------------------- 2. payment */}
          {step === 1 && !paymentSuccessful ? (
            <Card title="Payment Method">
              <fieldset className="space-y-2.5">
                <legend className="sr-only">Choose payment method</legend>
                {PAYMENT_METHODS.map((m) => (
                  <label
                    key={m.id}
                    className="flex cursor-pointer items-start gap-3 rounded-lg border p-3.5 transition-colors hover:bg-neutral-50"
                    style={{
                      borderColor: paymentMethod === m.id ? MAROON : "#E5DDD5",
                      backgroundColor: paymentMethod === m.id ? "#FDF8F3" : "transparent"
                    }}
                  >
                    <input
                      type="radio"
                      name="payment-method"
                      value={m.id}
                      checked={paymentMethod === m.id}
                      onChange={() => setPaymentMethod(m.id)}
                      className="mt-1 h-4 w-4 accent-[#7B1E2B]"
                    />
                    <div className="flex min-w-0 flex-1 items-start gap-3">
                      <svg
                        viewBox="0 0 24 24"
                        className="mt-0.5 h-5 w-5 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ color: MAROON }}
                        aria-hidden="true"
                      >
                        {PAY_ICON[m.icon]}
                      </svg>
                      <div className="min-w-0">
                        <p className="text-[14px] font-medium text-neutral-800">{m.label}</p>
                        <p className="mt-0.5 text-[12px] leading-snug text-neutral-500">
                          {m.note}
                        </p>
                        <p className="mt-1 text-[12px] font-semibold" style={{ color: MAROON }}>
                          Shipping: {m.id === "cod" ? "₹100.00" : "₹60.00"}
                        </p>
                      </div>
                    </div>
                  </label>
                ))}
              </fieldset>

              <p className="mt-4 flex items-start gap-2 rounded-md bg-[#FDF8F3] p-3 text-[12px] leading-relaxed text-neutral-600">
                <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0" fill="none" stroke={MAROON} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3.5 19 6v6c0 4.2-2.9 7.5-7 8.5-4.1-1-7-4.3-7-8.5V6l7-2.5Z" />
                  <path d="M9.2 12.2 11.4 14.4 15.7 10" />
                </svg>
                Your card details never reach our servers. Payments are handled by
                Razorpay, an RBI-authorised payment gateway.
              </p>

              <button
                type="button"
                disabled={!paymentMethod}
                onClick={() => handlePaymentMethodClick(paymentMethod, orderSummary.grandTotal)}
                className="mt-4 w-full rounded-md px-6 py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed"
                style={{ backgroundColor: paymentMethod ? MAROON : "#CFA9B0" }}
              >
                Continue to Payment
              </button>
            </Card>
          ) : null}

          {/* Show loader while payment is processing after Razorpay success */}
          {step === 1 && paymentSuccessful ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                  <div
                    className="absolute inset-0 rounded-full border-4 border-transparent"
                    style={{
                      borderTopColor: MAROON,
                      animation: 'spin 1s linear infinite',
                    }}
                  ></div>
                </div>
                <div className="text-center">
                  <p className="text-gray-900 font-medium">Processing your payment</p>
                  <p className="text-gray-600 text-sm mt-1">Verifying with bank...</p>
                </div>
              </div>
              <style>{`
                @keyframes spin {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          ) : null}

          {/* ---------------------------------------------------- 3. confirm */}
          {step === 2 ? (
            <>
              {(() => {
                console.log("🔄 Loader State:", { showLoadingState, createdOrder: !!createdOrder });
                return null;
              })()}
              {showLoadingState ? (
                // Show loader for minimum 1.5 seconds after order creation
                <div className="flex items-center justify-center py-20">
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative w-16 h-16">
                      <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                      <div
                        className="absolute inset-0 rounded-full border-4 border-transparent"
                        style={{
                          borderTopColor: MAROON,
                          animation: 'spin 1s linear infinite',
                        }}
                      ></div>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-900 font-medium">Processing your order</p>
                      <p className="text-gray-600 text-sm mt-1">Please wait...</p>
                    </div>
                  </div>
                  <style>{`
                    @keyframes spin {
                      from { transform: rotate(0deg); }
                      to { transform: rotate(360deg); }
                    }
                  `}</style>
                </div>
              ) : createdOrder ? (
                <OrderConfirmation />
              ) : (
                <>
                  <Card title="Review Your Order">
                <ul className="divide-y divide-neutral-100">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-3 py-3 first:pt-0 last:pb-0">
                      <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded bg-neutral-100">
                        {item.image ? (
                          typeof item.image === "string" && item.image.startsWith("http") ? (
                            <img src={item.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
                          ) : (
                            <Image src={item.image} alt="" fill sizes="64px" className="object-cover" />
                          )
                        ) : (
                          <span className="block h-full w-full bg-gradient-to-br from-[#EDE3D3] to-[#D8C6A8]" />
                        )}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block text-[14px] leading-snug text-neutral-900">
                          {item.title}
                        </span>
                        <span className="mt-0.5 block text-[12px] text-neutral-500">
                          Qty {item.quantity}
                          {item.size ? ` • Ring Size: ${item.size}` : ""}
                          {item.ringName ? ` • Name: ${item.ringName}` : ""}
                        </span>
                      </span>

                      <span className="shrink-0 text-[14px] font-semibold text-neutral-900">
                        {rupees(item.price * item.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card title="Delivering To">
                <p className="text-[14px] leading-relaxed text-neutral-700">
                  <span className="font-medium text-neutral-900">{selectedAddress?.name}</span>
                  <br />
                  {selectedAddress?.house}, {selectedAddress?.area}
                  {selectedAddress?.landmark ? `, ${selectedAddress.landmark}` : ""}
                  <br />
                  {selectedAddress?.city}, {selectedAddress?.state} — {selectedAddress?.pincode}
                  <br />
                  <span className="text-neutral-500">Mobile: {selectedAddress?.mobile}</span>
                </p>
                  </Card>
                </>
              )}
            </>
          ) : null}

          {/* ------------------------------------------------------- footer */}
          <div className="flex items-center justify-between gap-3">
            {step === 0 && addingAddress ? (
              <button
                type="button"
                onClick={() => {
                  setAddingAddress(false);
                  setEditingAddressId(null);
                  setAddress(EMPTY_ADDRESS);
                  setAddressType("home");
                }}
                className="flex items-center gap-1.5 text-[14px] text-neutral-600 transition-colors hover:text-neutral-900"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 5l-7 7 7 7" />
                </svg>
                Cancel
              </button>
            ) : step > 0 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="flex items-center gap-1.5 text-[14px] text-neutral-600 transition-colors hover:text-neutral-900"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 5l-7 7 7 7" />
                </svg>
                Back
              </button>
            ) : (
              <Link
                href="/cart"
                className="flex items-center gap-1.5 text-[14px] text-neutral-600 transition-colors hover:text-neutral-900"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 5l-7 7 7 7" />
                </svg>
                Back to cart
              </Link>
            )}

            {/* On the form it saves; on the list it moves to payment. */}
            {step === 0 && addingAddress ? (
              <button
                type="button"
                disabled={!addressReady || savingAddress}
                onClick={saveAddress}
                className="rounded-md px-7 py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed"
                style={{ backgroundColor: addressReady && !savingAddress ? MAROON : "#CFA9B0" }}
              >
                {savingAddress ? "Saving..." : editingAddressId ? "Update address" : "Save address"}
              </button>
            ) : step === 0 ? (
              <button
                type="button"
                disabled={!selectedAddress}
                onClick={() => setStep(1)}
                className="rounded-md px-7 py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed"
                style={{ backgroundColor: selectedAddress ? MAROON : "#CFA9B0" }}
              >
                Deliver to this address
              </button>
            ) : null}
            {/* No button on the payment step — each method card carries its own
                action, so a second one here would be a duplicate. */}
          </div>
        </div>

        {/* ------------------------------------------------------- summary */}
        <div ref={orderSummaryRef} className="lg:sticky lg:top-4 lg:self-start">
          <div className="rounded-lg border border-[#EFDCD4] bg-white p-4">
            <h2
              className="font-[family-name:var(--font-heading)] text-[20px] leading-none"
              style={{ color: MAROON }}
            >
              Order Summary
            </h2>

            <div className="mt-4 space-y-2.5 border-b border-neutral-200 pb-4 text-[13px]">
              <div className="flex justify-between gap-4">
                <span className="text-neutral-600">Items ({itemCount})</span>
                <span className="text-neutral-800">{rupees(step === 2 && createdOrder ? orderSummary.subtotal : itemsTotal)}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-neutral-600">Subtotal</span>
                <span className="text-neutral-800">{rupees(step === 2 && createdOrder ? orderSummary.subtotal : itemsTotal)}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-neutral-600">Shipping</span>
                <span
                  className="text-neutral-800"
                  style={orderSummary.freeDelivery ? { color: GREEN } : undefined}
                >
                  {shippingRatesLoading ? (
                    <span className="text-xs text-neutral-500">Calculating...</span>
                  ) : orderSummary.freeDelivery ? (
                    "FREE"
                  ) : (
                    rupees(orderSummary.deliveryCharge)
                  )}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between gap-4">
                  <span style={{ color: GREEN }}>Discount ({appliedCoupon.code})</span>
                  <span style={{ color: GREEN }}>−{rupees(discount)}</span>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-baseline justify-between gap-4">
              <span
                className="font-[family-name:var(--font-heading)] text-[17px]"
                style={{ color: MAROON }}
              >
                Order Total
              </span>
              <span className="text-[20px] font-semibold text-neutral-900">
                {rupees(orderSummary.grandTotal)}
              </span>
            </div>

            {step > 0 ? (
              <p className="mt-4 flex items-center justify-center gap-1.5 text-[12px] text-neutral-500">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3.5 19 6v6c0 4.2-2.9 7.5-7 8.5-4.1-1-7-4.3-7-8.5V6l7-2.5Z" />
                  <path d="M9.2 12.2 11.4 14.4 15.7 10" />
                </svg>
                100% Secure Checkout
              </p>
            ) : null}
          </div>
        </div>
      </div>

      {/* COD Modal */}
      {showCODModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm p-4 z-50" style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
          <div className="max-w-sm w-full p-6 sm:p-8 rounded-2xl" style={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)"
          }}>
            <h2 className="text-xl font-semibold text-neutral-900" style={{ color: MAROON }}>
              Cash on Delivery
            </h2>
            <p className="mt-4 text-[14px] text-neutral-600 leading-relaxed">
              You will need to pay an advancement payment of{" "}
              <span className="font-semibold px-2 py-1 rounded" style={{ color: MAROON, backgroundColor: "#FDF0F2" }}>
                ₹120
              </span>
              {" "}to confirm your order. This will be deducted from your final payment.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setShowCODModal(false)}
                className="flex-1 px-4 py-3 text-[14px] font-medium text-neutral-700 border border-neutral-300 rounded-md transition-colors hover:bg-neutral-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCODConfirm}
                className="flex-1 px-4 py-3 text-[14px] font-medium text-white rounded-md transition-opacity hover:opacity-90"
                style={{ backgroundColor: MAROON }}
              >
                Pay now
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
