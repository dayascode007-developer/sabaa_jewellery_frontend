"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdClose, MdStar } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import { closeReviewModal, selectSelectedProduct, selectSelectedOrderId, selectReviewError } from "@/store/slices/reviewsSlice";
import { submitReviewApi } from "@/store/api/reviewsApi";

const MAROON = "#7B1E2B";
const GOLD = "#C9A227";

export default function ReviewModal({ isOpen, onSuccess }) {
  const dispatch = useDispatch();
  const [customerName, setCustomerName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [localError, setLocalError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const selectedProduct = useSelector(selectSelectedProduct);
  const selectedOrderId = useSelector(selectSelectedOrderId);
  const error = useSelector(selectReviewError);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customerName.trim()) {
      setLocalError("Please enter your name");
      return;
    }

    if (!rating) {
      setLocalError("Please select a rating");
      return;
    }

    if (!reviewTitle.trim()) {
      setLocalError("Please write a review title");
      return;
    }

    if (!reviewText.trim()) {
      setLocalError("Please write a review");
      return;
    }

    setLocalError(null);
    setSubmitting(true);

    try {
      const userImgInput = document.getElementById("review-user-img");
      const userImgFile = userImgInput?.files?.[0] || null;

      const capitalizedName = customerName.trim().charAt(0).toUpperCase() + customerName.trim().slice(1);

      await submitReviewApi(
        selectedOrderId,
        selectedProduct.product_id,
        capitalizedName,
        rating,
        reviewTitle.trim(),
        reviewText.trim(),
        userImgFile
      );

      setSuccess(true);
      setTimeout(() => {
        handleClose();
        // Wait for modal to close, then re-fetch orders
        setTimeout(() => {
          if (onSuccess) {
            onSuccess();
          }
        }, 300);
      }, 2000);
    } catch (error) {
      setLocalError(error.message || "Failed to submit review");
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    resetForm();
    dispatch(closeReviewModal());
  };

  const resetForm = () => {
    setCustomerName("");
    setRating(0);
    setReviewTitle("");
    setReviewText("");
    setLocalError(null);
  };

  if (!isOpen || !selectedProduct) return null;

  // Reviews disabled - "Please wait" state
  if (!selectedProduct?.enable_reviews) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-6 text-center">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <MdClose size={24} className="text-gray-500" />
          </button>

          <div className="mb-4">
            <MdStar size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Please Wait</h3>
            <p className="text-sm text-gray-600">
              Admin has not enabled reviews for this product yet. Please check back later!
            </p>
          </div>

          <button
            onClick={handleClose}
            className="w-full py-2 px-4 rounded-lg font-semibold text-white transition-colors cursor-pointer"
            style={{ backgroundColor: MAROON }}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  // Reviews enabled - show form
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
          <h3 className="text-base md:text-lg font-semibold text-gray-900">Write a Review</h3>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <MdClose size={24} className="text-gray-500" />
          </button>
        </div>

        {success ? (
          <div className="text-center py-8">
            <FaStar size={48} className="mx-auto text-green-500 mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Thank You!</h4>
            <p className="text-sm text-gray-600">
              Your review has been submitted for approval. It will appear on the website after admin approval.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Product Info */}
            <div className="p-3 rounded-lg" style={{ backgroundColor: "#f9fafb", borderLeft: `3px solid ${MAROON}` }}>
              <p className="text-xs text-gray-600 font-medium uppercase mb-1">Product</p>
              <p className="text-sm font-medium text-gray-900 line-clamp-2">
                {selectedProduct?.title}
              </p>
            </div>

            {/* Customer Name */}
            <div>
              <p className="text-sm font-medium mb-2" style={{ color: MAROON }}>
                Your Name <span className="text-red-600">*</span>
              </p>
              <input
                type="text"
                value={customerName}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length > 0) {
                    const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
                    setCustomerName(capitalized);
                  } else {
                    setCustomerName(value);
                  }
                }}
                placeholder="e.g., John Doe"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400"
                maxLength="255"
              />
            </div>

            {/* Rating */}
            <div>
              <p className="text-sm font-medium mb-2" style={{ color: MAROON }}>
                Rating <span className="text-red-600">*</span>
              </p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform hover:scale-110 cursor-pointer"
                  >
                    <FaStar
                      size={28}
                      color={star <= (hoverRating || rating) ? GOLD : "#d1d5db"}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-xs text-gray-600 mt-1">
                  {["Poor", "Fair", "Good", "Very Good", "Excellent"][rating - 1]}
                </p>
              )}
            </div>

            {/* Review Title */}
            <div>
              <p className="text-sm font-medium mb-2" style={{ color: MAROON }}>
                Review Title <span className="text-red-600">*</span>
              </p>
              <input
                type="text"
                value={reviewTitle}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length > 0) {
                    const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
                    setReviewTitle(capitalized);
                  } else {
                    setReviewTitle(value);
                  }
                }}
                placeholder="e.g., Beautiful ring"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400"
                maxLength="255"
              />
            </div>

            {/* Review Text */}
            <div>
              <p className="text-sm font-medium mb-2" style={{ color: MAROON }}>
                Your Review <span className="text-red-600">*</span>
              </p>
              <textarea
                value={reviewText}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length > 0) {
                    const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
                    setReviewText(capitalized);
                  } else {
                    setReviewText(value);
                  }
                }}
                placeholder="Share your experience with this product..."
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:border-gray-400"
                rows="4"
                maxLength="500"
              />
              <p className="text-xs text-gray-500 mt-1 text-right">
                {reviewText.length}/500 characters
              </p>
            </div>

            {/* User Photo Upload */}
            <div>
              <label className="text-xs font-medium block mb-1" style={{ color: MAROON }}>Upload Img</label>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="w-full text-xs text-gray-500 border border-gray-200 rounded-lg px-3 py-2 file:mr-4 file:py-2 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:cursor-pointer"
                id="review-user-img"
                name="review-user-img"
              />
              <p className="text-[11px] text-gray-500 mt-1">Upload unboxing/experience photo (Max 5MB)</p>
            </div>

            {/* Error Message */}
            {(error || localError) && (
              <div className="p-3 rounded-lg" style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca" }}>
                <p className="text-xs" style={{ color: "#991b1b" }}>{error || localError}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2 px-4 rounded-full font-semibold text-white transition-colors disabled:opacity-50 cursor-pointer"
              style={{ backgroundColor: MAROON }}
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
