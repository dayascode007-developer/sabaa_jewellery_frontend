"use client";

import { useState } from "react";
import { MdClose } from "react-icons/md";

const MAROON = "#430121";

export default function FilterModal({
  isOpen,
  onClose,
  onApply,
  availableStatuses = [],
  availableTimeRanges = [],
}) {
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);

  const statusLabels = {
    pending: "Order Placed",
    confirmed: "Order Confirmed",
    shipped: "Shipped",
    out_for_delivery: "Out for Delivery",
    delivered: "Delivered",
    cancelled: "Cancelled",
    returned: "Returned",
  };

  const statuses = availableStatuses.map((status) => ({
    value: status,
    label:
      statusLabels[status] || status.charAt(0).toUpperCase() + status.slice(1),
  }));

  // Use dynamic time ranges from props, or default empty
  const timeOptions = availableTimeRanges.length > 0 ? availableTimeRanges : [];

  const toggleStatus = (value) => {
    setSelectedStatuses((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  };

  const toggleTime = (value) => {
    setSelectedTimes((prev) =>
      prev.includes(value) ? prev.filter((t) => t !== value) : [...prev, value]
    );
  };

  const handleApply = () => {
    onApply({ statuses: selectedStatuses, times: selectedTimes });
    onClose();
  };

  const handleClearFilters = () => {
    setSelectedStatuses([]);
    setSelectedTimes([]);
    onApply({ statuses: [], times: [] });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with Glass Effect */}
      <div
        className="fixed inset-0 backdrop-blur-sm bg-white/10 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Bottom Sheet Modal */}
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 max-h-[80vh] overflow-y-auto animate-slideUp" style={{ boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.15), 0 4px 20px rgba(0, 0, 0, 0.1), -4px 0 20px rgba(0, 0, 0, 0.1), 4px 0 20px rgba(0, 0, 0, 0.1)" }}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">
            Filters
          </h2>
          <div className="flex items-center gap-3">
            <button
              onClick={handleClearFilters}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Clear Filter
            </button>
            <button
              onClick={onClose}
              className="flex items-center justify-center p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <MdClose className="text-xl text-gray-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6 space-y-6">
          {/* Order Status */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-3">
              Order Status
            </h3>
            <div className="flex flex-wrap gap-2">
              {statuses.map((status) => (
                <button
                  key={status.value}
                  onClick={() => toggleStatus(status.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedStatuses.includes(status.value)
                      ? "bg-maroon text-white"
                      : "border border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                  style={{
                    backgroundColor: selectedStatuses.includes(status.value)
                      ? MAROON
                      : "transparent",
                  }}
                >
                  {status.label}
                  <span className="ml-2 font-bold">+</span>
                </button>
              ))}
            </div>
          </div>

          {/* Order Time */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-3">
              Order Time
            </h3>
            <div className="flex flex-wrap gap-2">
              {timeOptions.map((time) => (
                <button
                  key={time.value}
                  onClick={() => toggleTime(time.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedTimes.includes(time.value)
                      ? "bg-maroon text-white"
                      : "border border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                  style={{
                    backgroundColor: selectedTimes.includes(time.value)
                      ? MAROON
                      : "transparent",
                  }}
                >
                  {time.label}
                  <span className="ml-2 font-bold">+</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-4 md:p-6 border-t border-gray-200 sticky bottom-0 bg-white">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 md:py-4 border-2 border-gray-300 rounded-lg text-gray-900 font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="flex-1 px-4 py-3 md:py-4 rounded-lg text-white font-semibold transition-all hover:opacity-90"
            style={{ backgroundColor: MAROON }}
          >
            Apply
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
