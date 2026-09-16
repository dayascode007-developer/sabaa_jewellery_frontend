"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectOrder } from "@/store/slices/paymentSlice";
import { selectSelectedAddressId, selectAddressesList } from "@/store/slices/addressesSlice";
import { selectAppliedCoupon } from "@/store/slices/couponSlice";
import { selectShippingConfig } from "@/store/slices/settingsSlice";
import { calculateOrderSummary } from "@/utils/orderCalculations";
import { getOrderItemsApi } from "@/store/api/ordersApi";

const MAROON = "#A91D3A";
const GREEN = "#22C55E";

export default function OrderConfirmation() {
  const createdOrder = useSelector(selectOrder);
  const selectedAddressId = useSelector(selectSelectedAddressId);
  const addresses = useSelector(selectAddressesList);
  const appliedCoupon = useSelector(selectAppliedCoupon);
  const shippingConfig = useSelector(selectShippingConfig);

  const [orderItems, setOrderItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);

  console.log("🔍 OrderConfirmation createdOrder data:", createdOrder);

  // Fetch order items from database
  useEffect(() => {
    if (createdOrder?.orderId) {
      setLoadingItems(true);
      getOrderItemsApi(createdOrder.orderId)
        .then((items) => {
          setOrderItems(items || []);
        })
        .catch((error) => {
          console.error("Error fetching order items:", error);
          setOrderItems([]);
        })
        .finally(() => {
          setLoadingItems(false);
        });
    }
  }, [createdOrder?.orderId]);

  const address = addresses.find((a) => a.id === selectedAddressId) || {};

  // Use order data from database
  const subtotal = parseFloat(createdOrder?.subtotal || 0);
  const discount = parseFloat(createdOrder?.discount_amount || 0);
  const orderSummary = {
    subtotal,
    discount,
    shippingCost: parseFloat(createdOrder?.shipping_cost || 0),
    grandTotal: parseFloat(createdOrder?.total_amount || 0),
    freeDelivery: parseFloat(createdOrder?.shipping_cost || 0) === 0,
  };

  const {
    orderId = `#SABA${createdOrder?.orderId || ""}`,
    purchaseId = createdOrder?.purchaseId || "",
    paymentMethod = "online",
  } = createdOrder || {};

  const orderDate = new Date().toLocaleDateString("en-IN");
  const estimatedDelivery = "5-7 business days";

  const rupees = (amount) => `₹${Number(amount || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

  return (
    <>
      {/* Order Confirmation Header */}
      <div className="mb-6 rounded-lg p-6 text-center" style={{ backgroundColor: "#F0F8F5", border: `1px solid ${GREEN}` }}>
        <div className="mx-auto mb-4 h-12 w-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "#E8F5E9" }}>
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12.5 4.5 4.5L19 7.5" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-neutral-900">Order Confirmed!</h2>
        <p className="mt-2 text-[14px] text-neutral-600">Thank you for your order. We're preparing your items.</p>
      </div>

      {/* Order Details Grid */}
      <div className="mb-6 rounded-lg border border-neutral-200 bg-white p-6">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          <div>
            <p className="text-[12px] font-medium text-neutral-500 uppercase tracking-wide">Order ID</p>
            <p className="mt-1 text-[15px] font-semibold text-neutral-900">{orderId}</p>
          </div>
          <div>
            <p className="text-[12px] font-medium text-neutral-500 uppercase tracking-wide">Order Date</p>
            <p className="mt-1 text-[15px] font-semibold text-neutral-900">{orderDate}</p>
          </div>
          <div>
            <p className="text-[12px] font-medium text-neutral-500 uppercase tracking-wide">Payment Method</p>
            <p className="mt-1 text-[15px] font-semibold text-neutral-900 capitalize">{paymentMethod}</p>
          </div>
          <div>
            <p className="text-[12px] font-medium text-neutral-500 uppercase tracking-wide">Estimated Delivery</p>
            <p className="mt-1 text-[15px] font-semibold text-neutral-900">{estimatedDelivery}</p>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="mb-6 rounded-lg border border-neutral-200 bg-white p-6">
        <h3 className="mb-4 text-[16px] font-semibold text-neutral-900">Order Items</h3>
        <ul className="divide-y divide-neutral-100">
          {loadingItems ? (
            <li className="py-4 text-center text-[14px] text-neutral-500">Loading items...</li>
          ) : orderItems && orderItems.length > 0 ? (
            orderItems.map((item) => (
              <li key={item.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded bg-neutral-100">
                  {item.main_image ? (
                    typeof item.main_image === "string" && item.main_image.startsWith("http") ? (
                      <img src={item.main_image} alt={item.title} className="absolute inset-0 h-full w-full object-cover" />
                    ) : (
                      <Image src={item.main_image} alt={item.title} fill sizes="64px" className="object-cover" />
                    )
                  ) : (
                    <span className="block h-full w-full bg-gradient-to-br from-[#EDE3D3] to-[#D8C6A8]" />
                  )}
                </span>
                <div className="flex-1">
                  <p className="text-[14px] font-medium text-neutral-900">{item.title}</p>
                  <p className="mt-1 text-[12px] text-neutral-600">
                    Qty {item.quantity}
                    {item.ring_size ? ` • Size: ${item.ring_size}` : ""}
                  </p>
                  <p className="mt-2 text-[14px] font-semibold text-neutral-900">{rupees(item.sale_price * item.quantity)}</p>
                </div>
              </li>
            ))
          ) : (
            <li className="py-4 text-center text-[14px] text-neutral-500">No items</li>
          )}
        </ul>
      </div>

      {/* Delivery Address */}
      <div className="mb-6 rounded-lg border border-neutral-200 bg-white p-6">
        <h3 className="mb-4 text-[16px] font-semibold text-neutral-900">Delivering To</h3>
        <p className="text-[14px] leading-relaxed text-neutral-700">
          <span className="font-medium text-neutral-900">{address.name}</span>
          <br />
          {address.house}, {address.area}
          {address.landmark ? `, ${address.landmark}` : ""}
          <br />
          {address.city}, {address.state} — {address.pincode}
          <br />
          <span className="text-neutral-600">Mobile: {address.mobile}</span>
        </p>
      </div>

      {/* Price Summary */}
      <div className="rounded-lg border border-neutral-200 bg-white p-6">
        <h3 className="mb-4 text-[16px] font-semibold text-neutral-900">Order Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-[14px]">
            <span className="text-neutral-600">Subtotal</span>
            <span className="font-medium text-neutral-900">{rupees(orderSummary.subtotal)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-[14px]">
              <span className="text-neutral-600">Discount</span>
              <span className="font-medium text-green-600">−{rupees(discount)}</span>
            </div>
          )}
          <div className="flex justify-between text-[14px]">
            <span className="text-neutral-600">Shipping</span>
            <span className="font-medium text-neutral-900">{orderSummary.freeDelivery ? "FREE" : rupees(orderSummary.shippingCost)}</span>
          </div>
          <div className="border-t border-neutral-100 pt-3">
            <div className="flex justify-between">
              <span className="font-semibold text-neutral-900">Order Total</span>
              <span className="text-[18px] font-bold" style={{ color: MAROON }}>
                {rupees(orderSummary.grandTotal)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
