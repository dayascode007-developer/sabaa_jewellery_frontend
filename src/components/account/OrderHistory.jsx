"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { MdLocalShipping, MdEdit, MdStarBorder, MdDownload } from "react-icons/md";
import { downloadInvoicePDF } from "@/utils/invoiceGenerator";

const MAROON = "#430121";

export default function OrderHistory({ onTrackOrder }) {
  const customer = useSelector((state) => state.auth.customer);
  const [orders] = useState([
    {
      id: "171-1261698-7565901",
      date: "29 July 2026",
      total: "₹212.10",
      shipTo: "Venkataesan",
      arriving: "7 August",
      status: "arriving",
      products: [
        {
          id: 1,
          name: "Vama Soya Flour 500g | 100% Natural & Gluten free Soyabean Atta | High Plant Protein (50%) | 98% Fat free | No Preservatives & No Adulteration",
          image: "https://via.placeholder.com/100x100?text=Product",
          qty: 1,
        },
      ],
    },
  ]);

  return (
    <div className="space-y-6">
      {orders.length > 0 ? (
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden"
          >
            {/* Order Header - Gray Background */}
            <div
              className="px-4 md:px-6 py-4 md:py-5"
              style={{ backgroundColor: "#F5F5F5" }}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {/* Order Placed */}
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600 mb-1">
                    ORDER PLACED
                  </p>
                  <p className="text-sm md:text-base font-semibold text-gray-900">
                    {order.date}
                  </p>
                </div>

                {/* Total */}
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600 mb-1">
                    TOTAL
                  </p>
                  <p className="text-sm md:text-base font-semibold text-gray-900">
                    {order.total}
                  </p>
                </div>

                {/* Ship To */}
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600 mb-1">
                    SHIP TO
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm md:text-base font-semibold text-gray-900">
                      {order.shipTo}
                    </p>
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>
                </div>

                {/* Order Number - Hidden on mobile */}
                <div className="hidden md:block">
                  <p className="text-xs md:text-sm font-medium text-gray-600 mb-1">
                    ORDER #
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-xs md:text-sm font-semibold text-gray-900">
                      {order.id}
                    </p>
                  </div>
                </div>

                {/* Action Links - Hidden on mobile */}
                <div className="hidden lg:flex flex-col gap-2">
                  <button
                    className="text-xs font-medium transition-opacity hover:opacity-70"
                    style={{ color: MAROON }}
                  >
                    View order details
                  </button>
                  <button
                    onClick={() => downloadInvoicePDF(order, customer?.name || "Customer")}
                    className="text-xs font-medium transition-opacity hover:opacity-70 flex items-center gap-1"
                    style={{ color: MAROON }}
                  >
                    <MdDownload className="text-sm" />
                    Invoice
                  </button>
                </div>
              </div>

              {/* Mobile Order Number & Actions */}
              <div className="md:hidden mt-3 pt-3 border-t border-gray-300">
                <p className="text-xs font-medium text-gray-600 mb-2">
                  ORDER # {order.id}
                </p>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => downloadInvoicePDF(order, customer?.name || "Customer")}
                    className="text-xs font-medium transition-opacity hover:opacity-70 flex items-center gap-1"
                    style={{ color: MAROON }}
                  >
                    <MdDownload className="text-sm" />
                    Download Invoice
                  </button>
                </div>
              </div>
            </div>

            {/* Arrival Status */}
            <div className="px-4 md:px-6 py-4 md:py-5 border-b border-gray-200 flex items-center gap-3">
              <div
                className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full text-white"
                style={{ backgroundColor: MAROON }}
              >
                <MdLocalShipping className="text-lg md:text-xl" />
              </div>
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-600">
                  Arriving {order.arriving}
                </p>
                <p className="text-xs text-gray-500">Track your package</p>
              </div>
            </div>

            {/* Products */}
            <div className="px-4 md:px-6 py-4 md:py-5">
              {order.products.map((product) => (
                <div key={product.id} className="flex gap-3 md:gap-4 mb-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 md:w-24 md:h-24 object-cover rounded bg-gray-100"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm font-medium text-gray-900 line-clamp-2 md:line-clamp-3">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Qty: {product.qty}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="px-4 md:px-6 py-4 md:py-5 border-t border-gray-200 flex flex-col sm:flex-row gap-2 md:gap-3">
              {/* Track Package - Primary Button */}
              <button
                onClick={() => onTrackOrder && onTrackOrder(order)}
                className="flex-1 py-2.5 md:py-3 px-4 md:px-6 rounded-lg font-semibold text-white text-sm md:text-base transition-all hover:opacity-90 cursor-pointer"
                style={{ backgroundColor: MAROON }}
              >
                Track package
              </button>

              {/* View or Edit Order - Secondary Button */}
              <button className="flex-1 py-2.5 md:py-3 px-4 md:px-6 rounded-lg font-semibold text-sm md:text-base border-2 transition-all hover:opacity-70 cursor-pointer"
                style={{
                  borderColor: MAROON,
                  color: MAROON,
                }}
              >
                View or edit order
              </button>

              {/* Write Review - Secondary Button */}
              <button className="flex-1 py-2.5 md:py-3 px-4 md:px-6 rounded-lg font-semibold text-sm md:text-base border-2 transition-all hover:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
                style={{
                  borderColor: MAROON,
                  color: MAROON,
                }}
              >
                <MdStarBorder className="text-lg" />
                <span className="hidden sm:inline">Write review</span>
                <span className="sm:hidden">Review</span>
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-12">
          <MdLocalShipping className="mx-auto text-4xl text-gray-300 mb-4" />
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
            No orders yet
          </h3>
          <p className="text-sm md:text-base text-gray-600 mb-6">
            Start shopping to see your orders here
          </p>
          <a
            href="/category"
            className="inline-block px-6 md:px-8 py-2.5 md:py-3 rounded-3xl font-semibold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: MAROON }}
          >
            Continue Shopping
          </a>
        </div>
      )}
    </div>
  );
}
