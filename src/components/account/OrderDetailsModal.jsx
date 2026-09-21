"use client";

import { MdClose } from "react-icons/md";

const MAROON = "#430121";

export default function OrderDetailsModal({ isOpen, order, onClose }) {
  if (!isOpen || !order) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
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

  const getStatusColor = (status) => {
    const colors = {
      pending: "#FFA500",
      confirmed: "#3B82F6",
      processing: "#8B5CF6",
      shipped: "#06B6D4",
      out_for_delivery: "#14B8A6",
      delivered: "#10B981",
      cancelled: "#EF4444",
      returned: "#F59E0B",
      refunded: "#6B7280",
    };
    return colors[status] || "#6B7280";
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
            <p className="text-sm text-gray-600 mt-1">Order #{order.purchase_id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <MdClose className="text-2xl text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Order Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs font-medium text-gray-600 mb-1">ORDER DATE</p>
              <p className="text-sm font-semibold text-gray-900">
                {formatDate(order.created_at)}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-600 mb-1">TOTAL</p>
              <p className="text-sm font-semibold text-gray-900">
                {formatRupees(order.total_amount)}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-600 mb-1">PAYMENT</p>
              <p className="text-sm font-semibold text-gray-900 capitalize">
                {order.payment_method}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-600 mb-1">STATUS</p>
              <div
                className="text-xs font-bold px-3 py-1 rounded-full text-white inline-block"
                style={{ backgroundColor: getStatusColor(order.status) }}
              >
                {order.status_label || order.status}
              </div>
            </div>
          </div>

          {/* Items */}
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-3">Items</h3>
            <div className="space-y-3">
              {order.items?.map((item) => (
                <div key={item.id} className="p-3 bg-gray-50 rounded-lg space-y-3">
                  {/* Main Product Image & Details */}
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <img
                        src={item.main_image || "https://via.placeholder.com/80x80?text=Product"}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded"
                        onError={(e) => (e.target.src = "https://via.placeholder.com/80x80?text=Product")}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 line-clamp-2">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">Qty: {item.quantity}</p>
                      {item.ring_size && (
                        <p className="text-xs text-gray-600">Ring Size: {item.ring_size}</p>
                      )}
                      {item.ring_name && (
                        <p className="text-xs text-gray-600">Name: {item.ring_name}</p>
                      )}
                      {item.font_id && (
                        <p className="text-xs text-gray-600">Font: {item.font_id}</p>
                      )}
                      {item.color_id && (
                        <p className="text-xs text-gray-600">Color: {item.color_id}</p>
                      )}
                      {item.symbol_id && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <img
                              src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/symbols/${item.symbol_id.toLowerCase()}.webp`}
                              alt={`Symbol ${item.symbol_id}`}
                              className="w-8 h-8 object-cover rounded"
                              onError={(e) => (e.target.style.display = "none")}
                            />
                            <p className="text-xs text-gray-600">Symbol: {item.symbol_id}</p>
                          </div>
                          {item.symbol_side && (
                            <p className="text-xs text-gray-600">Symbol Direction: {item.symbol_side.charAt(0).toUpperCase() + item.symbol_side.slice(1)}</p>
                          )}
                        </div>
                      )}
                      <p className="text-sm font-semibold text-gray-900 mt-1">
                        {formatRupees(item.sale_price)}
                      </p>
                    </div>
                  </div>

                  {/* Customer Uploaded Photo */}
                  {item.customer_faced_img && (
                    <div>
                      <p className="text-xs font-bold text-gray-900 mb-2">Customized</p>
                      <img
                        src={item.customer_faced_img}
                        alt="Customer uploaded photo"
                        className="w-full h-auto max-h-32 object-contain rounded border border-gray-200"
                        onError={(e) => (e.target.src = "https://via.placeholder.com/200x200?text=Photo")}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium text-gray-900">
                {formatRupees(order.subtotal)}
              </span>
            </div>
            {order.discount_amount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Discount</span>
                <span className="font-medium text-green-600">
                  -{formatRupees(order.discount_amount)}
                </span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium text-gray-900">
                {formatRupees(order.shipping_cost)}
              </span>
            </div>
            <div className="border-t border-gray-200 pt-2 flex justify-between text-sm font-bold">
              <span>Total</span>
              <span style={{ color: MAROON }}>{formatRupees(order.total_amount)}</span>
            </div>
          </div>

          {/* Delivery Address */}
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-3">Delivery Address</h3>
            <div className="bg-blue-50 p-4 rounded-lg text-sm text-gray-700">
              <p className="font-semibold text-gray-900">{order.address?.name}</p>
              <p className="mt-1">
                {order.address?.house}, {order.address?.area}
                {order.address?.landmark && `, ${order.address.landmark}`}
              </p>
              <p>
                {order.address?.city}, {order.address?.state} — {order.address?.pincode}
              </p>
              <p className="mt-2 text-gray-600">Mobile: {order.address?.mobile}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full py-2 px-4 rounded-lg font-semibold text-sm border-2 transition-all hover:opacity-70"
              style={{ borderColor: MAROON, color: MAROON }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
