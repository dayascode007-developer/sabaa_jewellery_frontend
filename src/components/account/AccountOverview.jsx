"use client";

import { useState } from "react";
import EditPersonalInfoModal from "./EditPersonalInfoModal";

const MAROON = "#430121";

export default function AccountOverview({ customer }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!customer) {
    return (
      <div className="bg-white border border-gray-200 rounded p-8">
        <p className="text-gray-600">
          Please log in to view your account overview.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900">Account Overview</h2>

      {/* Personal Information Card */}
      <div className="bg-white border border-gray-200 rounded overflow-hidden">
        {/* Header */}
        <div
          className="px-4 md:px-8 py-4 md:py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0"
          style={{ backgroundColor: "#FDF0F2" }}
        >
          <h3 className="text-base md:text-lg font-bold" style={{ color: MAROON }}>
            Personal Information
          </h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base border-2 rounded-md font-medium transition-colors hover:opacity-80 whitespace-nowrap"
            style={{
              borderColor: MAROON,
              color: MAROON,
            }}
          >
            Edit Details
          </button>
        </div>

        {/* Content */}
        <div className="px-4 md:px-8 py-4 md:py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {/* Left Column */}
            <div className="space-y-4 md:space-y-6">
              {/* Name */}
              <div>
                <label className="text-xs md:text-sm font-medium text-gray-600">
                  Name
                </label>
                <p className="text-gray-900 font-medium text-sm md:text-base mt-1">
                  {customer.name || "—"}
                </p>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="text-xs md:text-sm font-medium text-gray-600">
                  Date of birth
                </label>
                <p className="text-gray-900 font-medium text-sm md:text-base mt-1">—</p>
              </div>

              {/* Anniversary Date */}
              <div>
                <label className="text-xs md:text-sm font-medium text-gray-600">
                  Anniversary date
                </label>
                <p className="text-gray-900 font-medium text-sm md:text-base mt-1">—</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4 md:space-y-6">
              {/* Phone */}
              <div>
                <label className="text-xs md:text-sm font-medium text-gray-600">
                  Phone number
                </label>
                <p className="text-gray-900 font-medium text-sm md:text-base mt-1">
                  {customer.mobile || "—"}
                </p>
              </div>

              {/* Email */}
              <div>
                <label className="text-xs md:text-sm font-medium text-gray-600">
                  Email address
                </label>
                <p className="text-gray-900 font-medium text-sm md:text-base mt-1">
                  {customer.email || "—"}
                </p>
              </div>

              {/* NeuCoins */}
              <div>
                <label className="text-xs md:text-sm font-medium text-gray-600">
                  NeuCoins
                </label>
                <p className="text-gray-900 font-medium text-sm md:text-base mt-1">0</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Default Address Card */}
      <div className="bg-white border border-gray-200 rounded overflow-hidden">
        {/* Header */}
        <div
          className="px-4 md:px-8 py-4 md:py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0"
          style={{ backgroundColor: "#FDF0F2" }}
        >
          <h3 className="text-base md:text-lg font-bold" style={{ color: MAROON }}>
            Default Address
          </h3>
          <button
            className="px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base border-2 rounded-md font-medium transition-colors hover:opacity-80 whitespace-nowrap"
            style={{
              borderColor: MAROON,
              color: MAROON,
            }}
          >
            Edit Address
          </button>
        </div>

        {/* Content */}
        <div className="px-4 md:px-8 py-4 md:py-6">
          <div className="space-y-2 md:space-y-3">
            <div>
              <label className="text-xs md:text-sm font-medium text-gray-600">
                Address
              </label>
              <div className="text-gray-900 font-medium text-sm md:text-base mt-1 space-y-0.5 md:space-y-1">
                <p>Jerin A</p>
                <p>+91 6384582060</p>
                <p>Scoda,</p>
                <p>CUDDALORE - 607301</p>
                <p>TAMIL NADU</p>
                <p>India</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditPersonalInfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        customer={customer}
      />
    </div>
  );
}
