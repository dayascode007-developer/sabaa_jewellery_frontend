"use client";

import { useState } from "react";
import {
  MdCheckCircle,
  MdLocalShipping,
  MdDeliveryDining,
  MdHome,
  MdOpenInNew,
} from "react-icons/md";
import { TrackOrderShimmer } from "@/components/shimmer-loader/Shimmer-loader";

const MAROON = "#430121";
const GREEN = "#10b981";

const STATUS_ICONS = {
  pending: MdCheckCircle,
  confirmed: MdCheckCircle,
  shipped: MdLocalShipping,
  out_for_delivery: MdDeliveryDining,
  delivered: MdHome,
  cancelled: MdHome,
};

const ORDER_STATUSES = [
  { label: "Order Placed", icon: MdCheckCircle },
  { label: "Shipped", icon: MdLocalShipping },
  { label: "Out for Delivery", icon: MdDeliveryDining },
  { label: "Delivered", icon: MdHome },
];

export default function TrackOrder({ trackingData, loading = false }) {
  const [showInstructions, setShowInstructions] = useState(false);
  const [instructions, setInstructions] = useState("Leave at door");

  if (loading) {
    return <TrackOrderShimmer />;
  }

  if (!trackingData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No tracking data available</p>
      </div>
    );
  }

  const { purchase_id, status_label, timeline = [], shipment = {}, address = {}, items = [], total_amount, estimated_delivery } = trackingData;

  // Keep only 4 main statuses, filter out intermediate ones
  const mainStatuses = ["pending", "shipped", "out_for_delivery", "delivered"];

  const filteredTimeline = timeline
    .filter((step) => mainStatuses.includes(step.status))
    .map((step) => ({
      ...step,
      label: ORDER_STATUSES[
        mainStatuses.indexOf(step.status)
      ]?.label || step.label,
    }));

  const currentStep = filteredTimeline.find((s) => s.current);
  const currentIndex = filteredTimeline.findIndex((s) => s.current);
  const progressPercent = filteredTimeline.length > 0 ? ((currentIndex + 1) / filteredTimeline.length) * 100 : 25;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 md:py-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Track Order
        </h1>
        <p className="text-sm md:text-base text-gray-600 mt-1">
          Order #{purchase_id}
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Order Status Timeline */}
        <div className="bg-white rounded-lg p-4 md:p-8 mb-6 md:mb-8">
          <h2
            className="text-xl md:text-2xl font-bold mb-6 md:mb-8"
            style={{ color: MAROON }}
          >
            {currentStep?.label || status_label || "Order Placed"}
          </h2>

          {/* Timeline */}
          <div className="hidden md:block">
            {/* Desktop Timeline */}
            <div
              className="relative flex items-center justify-between mb-8"
              style={{ height: "80px" }}
            >
              {/* Progress Line Background */}
              <div
                className="absolute top-1/2 left-0 right-0 h-1 transform -translate-y-1/2"
                style={{ zIndex: 1 }}
              >
                <div className="flex h-full">
                  {filteredTimeline.map((step, index) => {
                    const isCompleted = step.completed;
                    return (
                      <div
                        key={index}
                        className="flex-1"
                        style={{
                          backgroundColor: isCompleted ? GREEN : "#d1d5db",
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Status Steps */}
              {timeline.map((step, index) => {
                const Icon = ORDER_STATUSES[index]?.icon || MdCheckCircle;
                const isCompleted = step.completed;
                const isCurrent = step.current;

                return (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center flex-1"
                    style={{ zIndex: 2, position: "relative" }}
                  >
                    {/* Icon Circle */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors bg-white border-4 ${
                        isCompleted || isCurrent
                          ? "text-white"
                          : "bg-gray-200 text-gray-400"
                      }`}
                      style={{
                        backgroundColor:
                          isCompleted || isCurrent ? GREEN : "#e5e7eb",
                        borderColor: "white",
                      }}
                    >
                      <Icon className="text-xl" />
                    </div>

                    {/* Label */}
                    <p
                      className={`text-xs md:text-sm font-medium text-center ${
                        isCompleted || isCurrent
                          ? "text-gray-900"
                          : "text-gray-500"
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden">
            <div className="relative">
              {/* Vertical tracking line - background */}
              <svg
                className="absolute top-6 bottom-6 w-1 pointer-events-none z-0"
                style={{
                  height: "calc(100% - 48px)",
                  left: "16px",
                }}
                preserveAspectRatio="none"
              >
                {/* Gray line for all steps */}
                <line
                  x1="2"
                  y1="0"
                  x2="2"
                  y2="100%"
                  stroke="#d1d5db"
                  strokeWidth="2"
                />

                {/* Green line overlay - shows progress through current status */}
                <line
                  x1="2"
                  y1="0"
                  x2="2"
                  y2={`${progressPercent}%`}
                  stroke={GREEN}
                  strokeWidth="2"
                />
              </svg>

              {/* Status items */}
              <div className="space-y-6">
                {timeline.map((step, index) => {
                  const Icon = ORDER_STATUSES[index]?.icon || MdCheckCircle;
                  const isCompleted = step.completed;
                  const isCurrent = step.current;

                  return (
                    <div
                      key={index}
                      className="relative z-10 flex items-start gap-4"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors border-4 bg-white ${
                          isCompleted || isCurrent
                            ? "text-white"
                            : "bg-gray-200 text-gray-400"
                        }`}
                        style={{
                          backgroundColor:
                            isCompleted || isCurrent ? GREEN : "#e5e7eb",
                          borderColor: "white",
                        }}
                      >
                        <Icon className="text-lg" />
                      </div>
                      <div className="flex-1">
                        <p
                          className={`text-sm font-semibold ${
                            isCompleted || isCurrent
                              ? "text-gray-900"
                              : "text-gray-500"
                          }`}
                        >
                          {step.label}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {isCompleted
                            ? "Completed"
                            : isCurrent
                            ? "In progress"
                            : "Pending"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Info Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Delivery Info */}
          <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
            <h3
              className="text-base md:text-lg font-bold mb-4"
              style={{ color: MAROON }}
            >
              Delivery Info
            </h3>

            {shipment?.courier_name ? (
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-600">Courier</p>
                  <p className="text-sm font-semibold text-gray-900">{shipment.courier_name}</p>
                </div>
                {shipment.tracking_number && (
                  <div>
                    <p className="text-xs text-gray-600">Tracking Number</p>
                    <p className="text-sm font-semibold text-gray-900">{shipment.tracking_number}</p>
                  </div>
                )}
                {shipment.estimated_delivery && (
                  <div>
                    <p className="text-xs text-gray-600">Estimated Delivery</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {new Date(shipment.estimated_delivery).toLocaleDateString()}
                    </p>
                  </div>
                )}
                {shipment.tracking_url && (
                  <a
                    href={shipment.tracking_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
                    style={{ color: MAROON }}
                  >
                    <MdOpenInNew className="text-base" />
                    Track on courier website
                  </a>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-600">Shipment details will be available soon</p>
            )}
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
            <h3
              className="text-base md:text-lg font-bold mb-4"
              style={{ color: MAROON }}
            >
              Shipping Address
            </h3>
            <div className="space-y-1 text-sm">
              <p className="font-semibold text-gray-900">
                {address.name || "N/A"}
              </p>
              <p className="text-gray-600">{address.house || ""} {address.area || ""}</p>
              <p className="text-gray-600">{address.landmark || ""}</p>
              <p className="text-gray-600">{address.city || ""}</p>
              <p className="text-gray-600">
                {address.state || ""} {address.pincode || ""}
              </p>
            </div>
          </div>

          {/* Order Info */}
          {/* <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
            <h3
              className="text-base md:text-lg font-bold mb-4"
              style={{ color: MAROON }}
            >
              Order Info
            </h3>
            <div className="space-y-3">
              <button
                className="w-full text-sm font-medium transition-opacity hover:opacity-70 text-center py-2 cursor-pointer"
                style={{ color: MAROON }}
              >
                View order details
              </button>
              <button
                className="w-full text-sm font-medium transition-opacity hover:opacity-70 flex items-center justify-center gap-2 py-2 border-2 rounded cursor-pointer"
                style={{ borderColor: MAROON, color: MAROON }}
              >
                <MdCancel className="text-base" />
                Cancel order
              </button>
            </div>
          </div> */}
        </div>

        {/* Estimated Delivery */}
        {estimated_delivery && (
          <div className="bg-white rounded-lg p-4 md:p-6 mt-6 md:mt-8 border-2 border-green-500">
            <p className="text-sm md:text-base text-gray-600">
              Your order is estimated to arrive by{" "}
              <strong className="text-gray-900" style={{ color: MAROON }}>
                {new Date(estimated_delivery).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
