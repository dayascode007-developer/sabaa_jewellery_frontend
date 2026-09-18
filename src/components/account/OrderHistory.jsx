"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdLocalShipping, MdStarBorder, MdDownload } from "react-icons/md";
import { downloadInvoicePDF } from "@/utils/invoiceGenerator";
import { fetchOrders } from "@/store/slices/ordersSlice";
import { OrderHistoryShimmer } from "@/components/shimmer-loader/Shimmer-loader";

const MAROON = "#430121";

export default function OrderHistory({ onTrackOrder }) {
  const dispatch = useDispatch();
  const { list: orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatRupees = (amount) => {
    return `₹${Number(amount).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const getStatusMessage = (status) => {
    const messages = {
      pending: "Order Placed",
      confirmed: "Order Confirmed",
      shipped: "Shipped",
      delivered: "Delivered",
      cancelled: "Cancelled",
    };
    return messages[status] || status;
  };

  if (loading) {
    return <OrderHistoryShimmer count={3} />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <MdLocalShipping className="mx-auto text-4xl text-red-300 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Error loading orders</h3>
        <p className="text-sm text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders && orders.length > 0 ? (
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
                    {formatDate(order.created_at)}
                  </p>
                </div>

                {/* Total */}
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600 mb-1">
                    TOTAL
                  </p>
                  <p className="text-sm md:text-base font-semibold text-gray-900">
                    {formatRupees(order.total_amount)}
                  </p>
                </div>

                {/* Ship To */}
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600 mb-1">
                    SHIP TO
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm md:text-base font-semibold text-gray-900">
                      {order.address?.name || "N/A"}
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
                      {order.purchase_id}
                    </p>
                  </div>
                </div>

                {/* Download Invoice - Hidden on mobile */}
                <div className="hidden lg:flex items-center">
                  <button
                    onClick={() => downloadInvoicePDF(order)}
                    className="flex items-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90 cursor-pointer"
                    style={{ backgroundColor: MAROON }}
                  >
                    <MdDownload className="text-lg" />
                    Download Invoice
                  </button>
                </div>
              </div>

              {/* Mobile Order Number & Actions */}
              <div className="md:hidden mt-3 pt-3 border-t border-gray-300">
                <p className="text-xs font-medium text-gray-600 mb-2">
                  ORDER # {order.purchase_id}
                </p>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => downloadInvoicePDF(order)}
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
                  {getStatusMessage(order.status)}
                </p>
                <p className="text-xs text-gray-500">
                  {order.tracking_url ? "Track your package" : "Awaiting shipment"}
                </p>
              </div>
            </div>

            {/* Products */}
            <div className="px-4 md:px-6 py-4 md:py-5">
              {order.items && order.items.length > 0 ? (
                order.items.map((item) => (
                  <div key={item.id} className="flex gap-3 md:gap-4 mb-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.main_image || "https://via.placeholder.com/100x100?text=Product"}
                        alt={item.title}
                        className="w-20 h-20 md:w-24 md:h-24 object-cover rounded bg-gray-100"
                        onError={(e) => (e.target.src = "https://via.placeholder.com/100x100?text=Product")}
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs md:text-sm font-medium text-gray-900 line-clamp-2 md:line-clamp-3">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {formatRupees(item.sale_price)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No items in this order</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="px-4 md:px-6 py-4 md:py-5 border-t border-gray-200 flex flex-col sm:flex-row gap-2 md:gap-3">
              {/* Track Package - Primary Button */}
              <button
                onClick={() => onTrackOrder && onTrackOrder(order)}
                className="flex-1 py-2 md:py-3 px-3 md:px-6 rounded-full font-semibold text-white text-xs md:text-sm transition-all hover:opacity-90 cursor-pointer"
                style={{ backgroundColor: MAROON }}
              >
                Tracking Package
              </button>

              {/* View or Edit Order - Secondary Button */}
              <button className="flex-1 py-2 md:py-3 px-3 md:px-6 rounded-full font-semibold text-xs md:text-sm border-2 transition-all hover:opacity-70 cursor-pointer"
                style={{
                  borderColor: MAROON,
                  color: MAROON,
                }}
              >
                View order details
              </button>

              {/* Write Review - Secondary Button */}
              <button className="flex-1 py-2 md:py-3 px-3 md:px-6 rounded-full font-semibold text-xs md:text-sm border-2 transition-all hover:opacity-70 flex items-center justify-center gap-1 md:gap-2 cursor-pointer"
                style={{
                  borderColor: MAROON,
                  color: MAROON,
                }}
              >
                <MdStarBorder className="text-xs md:text-sm" />
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
