"use client";

import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { MdDateRange } from "react-icons/md";
import { editProfile } from "@/store/slices/authSlice";
import ErrorModal from "@/components/common/ErrorModal";
import "react-datepicker/dist/react-datepicker.css";

const datePickerStyles = `
  .react-datepicker__input-container {
    position: relative;
    width: 100%;
    overflow: visible !important;
  }

  .react-datepicker__input-container svg {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    z-index: 1;
  }

  .react-datepicker__input-container input {
    width: 100% !important;
    padding-right: 45px !important;
    box-sizing: border-box !important;
    text-overflow: clip !important;
  }

  .react-datepicker__popper {
    border: 1px solid #ccc !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
  }

  .react-datepicker {
    max-width: 100% !important;
    border: 1px solid #ddd !important;
    box-shadow: none !important;
    margin: 0 auto !important;
    border-radius: 8px !important;
  }

  .react-datepicker__header {
    padding: 8px !important;
  }

  .react-datepicker__month {
    margin: 0 !important;
    padding: 8px !important;
  }

  /* Mobile modal centering */
  @media (max-width: 768px) {
    .react-datepicker {
      margin: 0 auto !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
    }

    .react-datepicker__month-container {
      width: auto !important;
    }
  }

  @media (max-width: 768px) {
    .react-datepicker-wrapper {
      position: static !important;
      overflow: visible !important;
    }

    .react-datepicker__popper {
      position: fixed !important;
      left: 0 !important;
      right: 0 !important;
      top: 50% !important;
      bottom: auto !important;
      transform: translateY(-50%) !important;
      margin: 0 auto !important;
      padding: 0 !important;
      z-index: 10000 !important;
      width: calc(100vw - 20px) !important;
      max-width: calc(100vw - 20px) !important;
      pointer-events: auto !important;
      visibility: visible !important;
    }

    .react-datepicker__input-container {
      overflow: visible !important;
      position: relative !important;
    }

    .react-datepicker__input-container input {
      padding-right: 50px !important;
      font-size: 13px;
    }

    .react-datepicker__input-container svg {
      right: 10px;
    }

    .react-datepicker {
      width: 100% !important;
      font-size: 12px !important;
      margin: 0 !important;
    }

    .react-datepicker__day {
      width: 30px !important;
      line-height: 28px !important;
      margin: 2px !important;
      padding: 0 !important;
      font-size: 11px !important;
    }

    .react-datepicker__header__dropdown {
      padding: 0 4px !important;
    }

    .react-datepicker__current-month,
    .react-datepicker__current-month--hasYearDropdown {
      font-size: 12px !important;
    }
  }

  @media (max-width: 480px) {
    .react-datepicker-wrapper {
      position: static !important;
      overflow: visible !important;
    }

    .react-datepicker__popper {
      position: fixed !important;
      left: 0 !important;
      right: 0 !important;
      top: 50% !important;
      bottom: auto !important;
      transform: translateY(-50%) !important;
      margin: 0 auto !important;
      padding: 0 !important;
      z-index: 10000 !important;
      width: calc(100vw - 20px) !important;
      max-width: calc(100vw - 20px) !important;
      pointer-events: auto !important;
      visibility: visible !important;
    }

    .react-datepicker__input-container input {
      padding-right: 40px !important;
      font-size: 12px;
      letter-spacing: -0.5px;
    }

    .react-datepicker__input-container svg {
      right: 8px;
      width: 18px;
      height: 18px;
    }

    .react-datepicker {
      width: 100% !important;
      font-size: 11px !important;
    }

    .react-datepicker__day {
      width: 28px !important;
      line-height: 26px !important;
      margin: 1px !important;
      padding: 0 !important;
      font-size: 10px !important;
    }

    .react-datepicker__day-names {
      padding: 0 4px !important;
    }

    .react-datepicker__day-name {
      width: 28px !important;
      line-height: 26px !important;
      margin: 1px !important;
      font-size: 9px !important;
    }

    .react-datepicker__header {
      padding: 6px 4px !important;
    }

    .react-datepicker__month {
      padding: 4px !important;
    }

    .react-datepicker__current-month,
    .react-datepicker__current-month--hasYearDropdown {
      font-size: 11px !important;
    }

    .react-datepicker__navigation {
      top: 6px !important;
      width: 20px !important;
      height: 20px !important;
    }

    .react-datepicker__navigation--previous {
      left: 4px !important;
    }

    .react-datepicker__navigation--next {
      right: 4px !important;
    }
  }
`;

const MAROON = "#430121";

export default function EditPersonalInfoModal({
  isOpen,
  onClose,
  onSaveSuccess,
}) {
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.auth.customer);
  const [formData, setFormData] = useState({
    title: "Mr",
    fullName: "",
    dateOfBirth: "",
    anniversary: "",
    newsletter: false,
    phone: "",
    email: "",
    addressName: "",
    street: "",
    city: "",
    postalCode: "",
    state: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showDobPicker, setShowDobPicker] = useState(false);
  const [showAnniversaryPicker, setShowAnniversaryPicker] = useState(false);

  // Only sync when modal opens - NOT on every customer change to preserve edits
  useEffect(() => {
    if (isOpen && customer) {
      const newFormData = {
        title: customer.title || "Mr",
        fullName: customer.name || "",
        dateOfBirth: customer.date_of_birth || "",
        anniversary: customer.anniversary_date || "",
        newsletter: customer.newsletter_opt_in || false,
        phone: customer.mobile || "",
        email: customer.email || "",
        addressName: customer.address_name || "",
        street: customer.street || "",
        city: customer.city || "",
        postalCode: customer.postal_code || "",
        state: customer.state || "",
        country: customer.country || "",
      };
      setFormData(newFormData);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleDateChange = (field, date) => {
    if (date) {
      const dateString = date.toISOString().split("T")[0];
      setFormData((prev) => ({
        ...prev,
        [field]: dateString,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handlePostalCodeChange = (e) => {
    const value = e.target.value;
    const numbersOnly = value.replace(/[^0-9]/g, "").slice(0, 6);
    setFormData((prev) => ({
      ...prev,
      postalCode: numbersOnly,
    }));
  };

  const handleSave = useCallback(() => {
    setLoading(true);

    const profileData = {
      name: formData.fullName,
      title: formData.title,
      date_of_birth: formData.dateOfBirth || null,
      anniversary_date: formData.anniversary || null,
      newsletter_opt_in: formData.newsletter,
      address_name: formData.addressName || null,
      street: formData.street || null,
      city: formData.city || null,
      postal_code: formData.postalCode || null,
      state: formData.state || null,
      country: formData.country || null,
    };

    dispatch(editProfile(profileData))
      .then((result) => {
        if (editProfile.rejected.match(result)) {
          setErrorMessage(result.payload || "Failed to save profile");
          setShowError(true);
          setLoading(false);
          return;
        }

        onSaveSuccess();
        setLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err.message || "Failed to save profile");
        setShowError(true);
        setLoading(false);
      });
  }, [dispatch, formData, onSaveSuccess]);

  if (!isOpen) return null;

  return (
    <>
      <style>{datePickerStyles}</style>
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
                    className="w-full px-3 md:px-4 py-2 text-sm text-black border border-gray-300 focus:ring-2 focus:outline-none rounded"
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
                    className="w-full px-3 md:px-4 py-2 text-sm text-black border border-gray-300 focus:ring-2 focus:outline-none rounded"
                    style={{ "--tw-ring-color": MAROON }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-6">
                {/* Date of Birth */}
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>

                  <div className="hidden md:block">
                    <DatePicker
                      selected={
                        formData.dateOfBirth
                          ? new Date(formData.dateOfBirth)
                          : null
                      }
                      onChange={(date) => handleDateChange("dateOfBirth", date)}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="dd/mm/yyyy"
                      className="w-full px-3 md:px-4 py-2 text-sm text-black border border-gray-300 focus:ring-2 focus:outline-none rounded"
                      style={{ "--tw-ring-color": MAROON }}
                      wrapperClassName="w-full"
                      showIcon
                      icon={<MdDateRange size={20} className="text-gray-600" />}
                    />
                  </div>

                  <div className="block md:hidden">
                    <div
                      onClick={() => setShowDobPicker(true)}
                      className="w-full px-3 py-2 text-sm text-black border border-gray-300 rounded bg-white flex items-center justify-between cursor-pointer hover:bg-gray-50"
                    >
                      <span>
                        {formData.dateOfBirth
                          ? new Date(formData.dateOfBirth).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric'
                            })
                          : 'dd/mm/yyyy'}
                      </span>
                      <MdDateRange size={20} className="text-gray-600" />
                    </div>
                  </div>
                </div>
                {/* Anniversary Date */}
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                    Anniversary date
                  </label>

                  <div className="hidden md:block">
                    <DatePicker
                      selected={
                        formData.anniversary
                          ? new Date(formData.anniversary)
                          : null
                      }
                      onChange={(date) => handleDateChange("anniversary", date)}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="dd/mm/yyyy"
                      className="w-full px-3 md:px-4 py-2 text-sm text-black border border-gray-300 focus:ring-2 focus:outline-none rounded"
                      style={{ "--tw-ring-color": MAROON }}
                      wrapperClassName="w-full"
                      showIcon
                      icon={<MdDateRange size={20} className="text-gray-600" />}
                    />
                  </div>

                  <div className="block md:hidden">
                    <div
                      onClick={() => setShowAnniversaryPicker(true)}
                      className="w-full px-3 py-2 text-sm text-black border border-gray-300 rounded bg-white flex items-center justify-between cursor-pointer hover:bg-gray-50"
                    >
                      <span>
                        {formData.anniversary
                          ? new Date(formData.anniversary).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric'
                            })
                          : 'dd/mm/yyyy'}
                      </span>
                      <MdDateRange size={20} className="text-gray-600" />
                    </div>
                  </div>
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
                    className="w-full px-3 md:px-4 py-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded cursor-not-allowed"
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
                    className="w-full px-3 md:px-4 py-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded cursor-not-allowed"
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
                    className="w-full px-3 md:px-4 py-2 text-sm text-black border border-gray-300 focus:ring-2 focus:outline-none rounded"
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
                      className="w-full px-3 md:px-4 py-2 text-sm text-black border border-gray-300 focus:ring-2 focus:outline-none rounded"
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
                      className="w-full px-3 md:px-4 py-2 text-sm text-black border border-gray-300 focus:ring-2 focus:outline-none rounded"
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
                      onChange={handlePostalCodeChange}
                      inputMode="numeric"
                      className="w-full px-3 md:px-4 py-2 text-sm text-black border border-gray-300 focus:ring-2 focus:outline-none rounded"
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
                    className="w-full px-3 md:px-4 py-2 text-sm text-black border border-gray-300 focus:ring-2 focus:outline-none rounded"
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
              disabled={loading}
              className="flex-1 px-4 md:px-6 py-2.5 md:py-3 text-sm md:text-base border-2 rounded-3xl font-semibold transition-all hover:opacity-85 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                borderColor: MAROON,
                color: MAROON,
              }}
            >
              {loading ? "Please wait..." : "Cancel"}
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex-1 px-4 md:px-6 py-2.5 md:py-3 text-sm md:text-base rounded-3xl font-semibold text-white transition-all hover:opacity-90 shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ backgroundColor: MAROON }}
            >
              {loading && (
                <svg
                  className="h-4 w-4 animate-spin"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.3"
                  />
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M4 12a8 8 0 018-8"
                  />
                </svg>
              )}
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>

      {/* Error Modal */}
      <ErrorModal
        isOpen={showError}
        message={errorMessage}
        onClose={() => setShowError(false)}
      />

      {/* Date of Birth Picker Modal (Mobile Only) */}
      {showDobPicker && (
        <div className="fixed inset-0 z-[10001] flex items-end md:hidden">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setShowDobPicker(false)}
          />
          <div className="relative w-full bg-white rounded-t-2xl p-4 animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Date of Birth
              </h3>
              <button
                onClick={() => setShowDobPicker(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="flex justify-center mb-4 w-full">
              <div className="flex justify-center w-full">
                <DatePicker
                  selected={
                    formData.dateOfBirth
                      ? new Date(formData.dateOfBirth)
                      : null
                  }
                  onChange={(date) => {
                    handleDateChange("dateOfBirth", date);
                    setShowDobPicker(false);
                  }}
                  dateFormat="dd/MM/yyyy"
                  inline
                />
              </div>
            </div>
            <button
              onClick={() => setShowDobPicker(false)}
              className="w-full py-2.5 rounded-lg font-semibold text-white"
              style={{ backgroundColor: MAROON }}
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Anniversary Date Picker Modal (Mobile Only) */}
      {showAnniversaryPicker && (
        <div className="fixed inset-0 z-[10001] flex items-end md:hidden">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setShowAnniversaryPicker(false)}
          />
          <div className="relative w-full bg-white rounded-t-2xl p-4 animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Anniversary Date
              </h3>
              <button
                onClick={() => setShowAnniversaryPicker(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="flex justify-center mb-4 w-full">
              <div className="flex justify-center w-full">
                <DatePicker
                  selected={
                    formData.anniversary
                      ? new Date(formData.anniversary)
                      : null
                  }
                  onChange={(date) => {
                    handleDateChange("anniversary", date);
                    setShowAnniversaryPicker(false);
                  }}
                  dateFormat="dd/MM/yyyy"
                  inline
                />
              </div>
            </div>
            <button
              onClick={() => setShowAnniversaryPicker(false)}
              className="w-full py-2.5 rounded-lg font-semibold text-white"
              style={{ backgroundColor: MAROON }}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
}
