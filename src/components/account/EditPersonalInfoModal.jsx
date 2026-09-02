"use client";

import { useState } from "react";

const MAROON = "#430121";

export default function EditPersonalInfoModal({ isOpen, onClose, customer }) {
  const [formData, setFormData] = useState({
    title: customer?.title || "Mr",
    fullName: customer?.name || "",
    dateOfBirth: "",
    anniversary: "",
    newsletter: false,
    phone: customer?.mobile || "",
    email: customer?.email || "",
    addressName: "Jerin A",
    addressPhone: "+91 6384582060",
    street: "Scode,",
    city: "CUDDALORE",
    postalCode: "607301",
    state: "TAMIL NADU",
    country: "India",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving:", formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4"
      style={{ zIndex: 9999, backgroundColor: "transparent" }}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[95vh] overflow-y-auto font-[family-name:var(--font-category)]">
        {/* Modal Header */}
        <div className="px-4 md:px-8 py-4 md:py-6 border-b border-gray-200 sticky top-0 bg-white">
          <h2
            className="text-xl md:text-2xl font-bold"
            style={{ color: MAROON }}
          >
            Edit Details
          </h2>
        </div>

        {/* Modal Content */}
        <div className="p-4 md:p-8 space-y-6 md:space-y-8">
          {/* Personal Information Section */}
          <div className="space-y-4">
            <h3
              className="text-base md:text-lg font-bold"
              style={{ color: MAROON }}
            >
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Title */}
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <select
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 md:px-4 py-2 text-sm text-black border border-gray-300 focus:ring-2 focus:outline-none"
                  style={{ "--tw-ring-color": MAROON }}
                >
                  <option>Mr</option>
                  <option>Ms</option>
                  <option>Mrs</option>
                  <option>Dr</option>
                </select>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-3 md:px-4 py-2 text-sm text-black border border-gray-300 focus:ring-2 focus:outline-none"
                  style={{ "--tw-ring-color": MAROON }}
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full px-3 md:px-4 py-2 text-sm text-black border border-gray-300 focus:ring-2 focus:outline-none"
                  style={{ "--tw-ring-color": MAROON }}
                />
              </div>

              {/* Anniversary Date */}
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                  Anniversary date
                </label>
                <input
                  type="date"
                  name="anniversary"
                  value={formData.anniversary}
                  onChange={handleChange}
                  className="w-full px-3 md:px-4 py-2 text-sm text-black border border-gray-300 focus:ring-2 focus:outline-none"
                  style={{ "--tw-ring-color": MAROON }}
                />
              </div>
            </div>

            {/* Newsletter Checkbox */}
            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="newsletter"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleChange}
                className="w-4 h-4 rounded"
              />
              <label htmlFor="newsletter" className="text-sm text-gray-700">
                Receive our newsletters and special offers
              </label>
            </div>
          </div>

          {/* Contact Details Section */}
          <div className="space-y-4 pt-4 md:pt-6 border-t border-gray-200">
            <h3
              className="text-base md:text-lg font-bold"
              style={{ color: MAROON }}
            >
              Contact Details
            </h3>

            {/* Phone and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Phone Number */}
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled
                  className="w-full px-3 md:px-4 py-2 text-sm text-black border border-gray-300 focus:ring-2 focus:outline-none cursor-not-allowed opacity-70"
                  style={{ "--tw-ring-color": MAROON }}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled
                  className="w-full px-3 md:px-4 py-2 text-sm text-black border border-gray-300 focus:ring-2 focus:outline-none cursor-not-allowed opacity-70"
                  style={{ "--tw-ring-color": MAROON }}
                />
              </div>
            </div>

            {/* Address Section */}
            <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200">
              <h4 className="text-sm md:text-base font-semibold text-gray-900 mb-4">
                Address
              </h4>

              {/* Street */}
              <div className="mb-4 md:mb-6">
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                  Street
                </label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  className="w-full px-3 md:px-4 py-2 text-sm text-black border border-gray-300 focus:ring-2 focus:outline-none"
                  style={{ "--tw-ring-color": MAROON }}
                />
              </div>

              {/* City, State, Postal Code */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-3 md:px-4 py-2 text-sm text-black border border-gray-300 focus:ring-2 focus:outline-none"
                    style={{ "--tw-ring-color": MAROON }}
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-3 md:px-4 py-2 text-sm text-black border border-gray-300 focus:ring-2 focus:outline-none"
                    style={{ "--tw-ring-color": MAROON }}
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="w-full px-3 md:px-4 py-2 text-sm text-black border border-gray-300 focus:ring-2 focus:outline-none"
                    style={{ "--tw-ring-color": MAROON }}
                  />
                </div>
              </div>

              {/* Country */}
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-3 md:px-4 py-2 text-sm text-black border border-gray-300 focus:ring-2 focus:outline-none"
                  style={{ "--tw-ring-color": MAROON }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-4 md:px-8 py-4 md:py-6 border-t border-gray-200 flex gap-3 md:gap-4 sticky bottom-0 bg-white">
          <button
            onClick={onClose}
            className="flex-1 px-4 md:px-6 py-2.5 md:py-3 text-sm md:text-base border-2 rounded-3xl font-semibold transition-all hover:opacity-85"
            style={{
              borderColor: MAROON,
              color: MAROON,
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 md:px-6 py-2.5 md:py-3 text-sm md:text-base rounded-3xl font-semibold text-white transition-all hover:opacity-90 shadow-md"
            style={{ backgroundColor: MAROON }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
