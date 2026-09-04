"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import EditPersonalInfoModal from "./EditPersonalInfoModal";
import SuccessModal from "@/components/common/SuccessModal";
import ShimmerLoader from "@/components/shimmer-loader/Shimmer-loader";

const MAROON = "#430121";

export default function PersonalInformation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const loading = useSelector((state) => state.auth.loading);
  const customer = useSelector((state) => state.auth.customer);

  if (loading || !customer) {
    return (
      <div className="space-y-4 md:space-y-6">
        <div className="flex items-center justify-between gap-2 md:gap-4">
          <ShimmerLoader width="w-32 sm:w-40 md:w-48" height="h-6 md:h-8" count={1} />
          <ShimmerLoader width="w-24 sm:w-28 md:w-32" height="h-8 md:h-10" count={1} />
        </div>
        <div className="bg-white border border-gray-200 rounded overflow-hidden">
          <div className="px-4 md:px-8 py-4 md:py-6" style={{ backgroundColor: "#FDF0F2" }}>
            <ShimmerLoader width="w-32 sm:w-36 md:w-40" height="h-5 md:h-6" count={1} />
          </div>
          <div className="px-4 md:px-8 py-4 md:py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <div>
                <ShimmerLoader width="w-20 md:w-24" height="h-3 md:h-4" count={1} className="mb-3 md:mb-4" />
                <ShimmerLoader width="w-24 md:w-28" height="h-4 md:h-5" count={1} />
              </div>
              <div>
                <ShimmerLoader width="w-20 md:w-24" height="h-3 md:h-4" count={1} className="mb-3 md:mb-4" />
                <ShimmerLoader width="w-24 md:w-32" height="h-4 md:h-5" count={1} />
              </div>
            </div>
            <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200">
              <ShimmerLoader width="w-16 md:w-20" height="h-4 md:h-5" count={1} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4 md:space-y-6">
        <div className="flex items-center justify-between gap-2 md:gap-4">
          <h2 className="text-lg md:text-2xl font-bold text-gray-900 flex-1 min-w-0">
            Personal Information
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm border-2 rounded-3xl font-semibold transition-all hover:opacity-85 shrink-0 whitespace-nowrap cursor-pointer"
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
                  {customer?.date_of_birth
                    ? new Date(customer.date_of_birth).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })
                    : "—"}
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
                  {customer?.anniversary_date
                    ? new Date(customer.anniversary_date).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })
                    : "—"}
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
                {/* Right Column - Phone & Email */}
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <label className="text-xs md:text-sm font-medium text-gray-600">
                      Phone number
                    </label>
                    <p className="text-gray-900 font-medium text-sm md:text-base mt-1">
                      {customer?.mobile || "—"}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs md:text-sm font-medium text-gray-600">
                      Email address
                    </label>
                    <p className="text-gray-900 font-medium text-sm md:text-base mt-1 break-all">
                      {customer?.email || "—"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Address Section */}
              <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-200">
                <h4 className="text-sm md:text-base font-semibold text-gray-900 mb-4 md:mb-6" style={{ color: MAROON }}>
                  Address
                </h4>
                <div className="space-y-4 md:space-y-6">
                  {customer?.address_name && (
                    <div>
                      <label className="text-xs md:text-sm font-medium text-gray-600">
                        Name
                      </label>
                      <p className="text-gray-900 font-medium text-sm md:text-base mt-1">
                        {customer.address_name}
                      </p>
                    </div>
                  )}
                  {customer?.street && (
                    <div>
                      <label className="text-xs md:text-sm font-medium text-gray-600">
                        Street
                      </label>
                      <p className="text-gray-900 font-medium text-sm md:text-base mt-1">
                        {customer.street}
                      </p>
                    </div>
                  )}
                  {(customer?.city || customer?.state || customer?.postal_code) && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                      {customer?.city && (
                        <div>
                          <label className="text-xs md:text-sm font-medium text-gray-600">
                            City
                          </label>
                          <p className="text-gray-900 font-medium text-sm md:text-base mt-1">
                            {customer.city}
                          </p>
                        </div>
                      )}
                      {customer?.state && (
                        <div>
                          <label className="text-xs md:text-sm font-medium text-gray-600">
                            State
                          </label>
                          <p className="text-gray-900 font-medium text-sm md:text-base mt-1">
                            {customer.state}
                          </p>
                        </div>
                      )}
                      {customer?.postal_code && (
                        <div>
                          <label className="text-xs md:text-sm font-medium text-gray-600">
                            Postal Code
                          </label>
                          <p className="text-gray-900 font-medium text-sm md:text-base mt-1">
                            {customer.postal_code}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                  {customer?.country && (
                    <div>
                      <label className="text-xs md:text-sm font-medium text-gray-600">
                        Country
                      </label>
                      <p className="text-gray-900 font-medium text-sm md:text-base mt-1">
                        {customer.country}
                      </p>
                    </div>
                  )}
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
        onSaveSuccess={() => {
          setShowSuccess(true);
          setIsModalOpen(false);
        }}
      />

      <SuccessModal
        isOpen={showSuccess}
        message="Profile updated successfully!"
        onClose={() => {
          setShowSuccess(false);
        }}
      />
    </>
  );
}
