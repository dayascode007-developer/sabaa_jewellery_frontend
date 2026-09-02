"use client";

import { useState } from "react";
import EditPersonalInfoModal from "./EditPersonalInfoModal";

const MAROON = "#430121";

export default function PersonalInformation({ customer }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="space-y-4 md:space-y-6">
        <div className="flex items-center justify-between gap-2 md:gap-4">
          <h2 className="text-lg md:text-2xl font-bold text-gray-900 flex-1 min-w-0">
            Personal Information
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm border-2 rounded-3xl font-semibold transition-all hover:opacity-85 shrink-0 whitespace-nowrap"
            style={{
              borderColor: MAROON,
              color: MAROON,
            }}
          >
            Edit Details
          </button>
        </div>

      {/* Personal Information Card */}
      <div className="bg-white border border-gray-200 rounded overflow-hidden">
        <div
          className="px-4 md:px-8 py-4 md:py-6"
          style={{ backgroundColor: "#FDF0F2" }}
        >
          <h3 className="text-base md:text-lg font-bold" style={{ color: MAROON }}>
            Personal Information
          </h3>
        </div>
        <div className="px-4 md:px-8 py-4 md:py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <div className="space-y-4 md:space-y-6">
              <div>
                <label className="text-xs md:text-sm font-medium text-gray-600">
                  Title
                </label>
                <p className="text-gray-900 font-medium text-sm md:text-base mt-1">
                  {customer?.title || "—"}
                </p>
              </div>
              <div>
                <label className="text-xs md:text-sm font-medium text-gray-600">
                  Date of birth
                </label>
                <p className="text-gray-900 font-medium text-sm md:text-base mt-1">
                  —
                </p>
              </div>
            </div>
            <div className="space-y-4 md:space-y-6">
              <div>
                <label className="text-xs md:text-sm font-medium text-gray-600">
                  Full Name
                </label>
                <p className="text-gray-900 font-medium text-sm md:text-base mt-1">
                  {customer?.name || "—"}
                </p>
              </div>
              <div>
                <label className="text-xs md:text-sm font-medium text-gray-600">
                  Anniversary
                </label>
                <p className="text-gray-900 font-medium text-sm md:text-base mt-1">
                  —
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200">
            <div className="space-y-4 md:space-y-6">
              <div>
                <label className="text-xs md:text-sm font-medium text-gray-600">
                  NeuCoins
                </label>
                <p className="text-gray-900 font-medium text-sm md:text-base mt-1">
                  0
                </p>
              </div>
            </div>
            <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-100">
              <h4 className="text-sm md:text-base font-semibold text-gray-900 mb-4 md:mb-6" style={{ color: MAROON }}>
                Contact Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {/* Left Column - Address */}
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <label className="text-xs md:text-sm font-medium text-gray-600">
                      Address
                    </label>
                    <p className="text-gray-900 font-medium text-sm md:text-base mt-2 space-y-1">
                      <span className="block">Jerin A</span>
                      <span className="block">+91 6384582060</span>
                      <span className="block">Scode,</span>
                      <span className="block">CUDDALORE - 607301</span>
                      <span className="block">TAMIL NADU</span>
                      <span className="block">India</span>
                    </p>
                  </div>
                </div>

                {/* Right Column - Phone & Email */}
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <label className="text-xs md:text-sm font-medium text-gray-600">
                      Phone number
                    </label>
                    <p className="text-gray-900 font-medium text-sm md:text-base mt-1">
                      {customer?.mobile || "6384582060"}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs md:text-sm font-medium text-gray-600">
                      Email address
                    </label>
                    <p className="text-gray-900 font-medium text-sm md:text-base mt-1 break-all">
                      {customer?.email || "jerinsujith.scode@gmail.com"}
                    </p>
                  </div>
                </div>
              </div>
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
    </>
  );
}
