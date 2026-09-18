"use client";

import { FaStar, FaUser } from "react-icons/fa6";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReviewShimmer } from "@/components/shimmer-loader/Shimmer-loader";
import {
  fetchProductReviews,
  selectProductReviews,
  selectProductRatingStats,
  selectReviewsLoading,
  selectReviewsError,
} from "@/store/slices/productReviewsSlice";

const MAROON = "#7B1E2B";
const GOLD = "#C9A227";

export default function ReviewsSection({ productId }) {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => selectProductReviews(state, productId));
  const ratingStats = useSelector((state) => selectProductRatingStats(state, productId));
  const loading = useSelector(selectReviewsLoading);
  const error = useSelector(selectReviewsError);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductReviews({ productId, limit: 3, offset: 0 }));
    }
  }, [productId, dispatch]);

  if (loading) {
    return (
      <div className="mt-8 pt-4 md:pt-6 bg-white rounded-lg p-4 md:p-6">
        <h3
          className="mb-6 font-[family-name:var(--font-category)] text-[16px] md:text-[18px] font-medium"
          style={{ color: MAROON }}
        >
          Customer Reviews
        </h3>
        <ReviewShimmer count={3} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 pt-4 md:pt-6 bg-white rounded-lg p-4 md:p-6">
        <p className="text-red-600 text-sm">Failed to load reviews</p>
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="mt-8 pt-4 md:pt-6 bg-white rounded-lg p-4 md:p-6">
        <h3
          className="mb-6 font-[family-name:var(--font-category)] text-[16px] md:text-[18px] font-medium"
          style={{ color: MAROON }}
        >
          Customer Reviews
        </h3>
        <p className="text-neutral-600 text-center py-8">
          No reviews yet. Be the first to review this product!
        </p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="mt-8 pt-4 md:pt-6 bg-white rounded-lg p-4 md:p-6">
      {/* Header with Rating Stats */}
      <div className="mb-8">
        <h3
          className="mb-4 font-[family-name:var(--font-category)] text-[16px] md:text-[18px] font-medium"
          style={{ color: MAROON }}
        >
          Customer Reviews
        </h3>

        {/* Rating Stats */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  size={16}
                  color={
                    i < Math.round(ratingStats?.average_rating || 0)
                      ? GOLD
                      : "#DDD"
                  }
                />
              ))}
            </div>
            <span className="text-[14px] md:text-[16px] font-medium text-neutral-900">
              {(ratingStats?.average_rating || 0).toFixed(1)}
            </span>
          </div>
          <span className="text-[12px] md:text-[13px] text-neutral-600">
            ({ratingStats?.total_reviews || 0} reviews)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="pb-6 border-b border-neutral-200 md:border-b-0 lg:border-b-0"
          >
            {/* Reviewer Info */}
            <div className="flex items-center gap-3 mb-3">
              <div
                className="h-10 w-10 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0"
                style={{ backgroundColor: MAROON }}
              >
                <FaUser size={16} />
              </div>
              <div>
                <p className="text-[13px] md:text-[14px] font-medium text-neutral-900">
                  {review.customer_name || "Anonymous"}
                </p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex gap-0.5">
                {[...Array(review.rating)].map((_, i) => (
                  <FaStar key={i} size={14} color={GOLD} />
                ))}
              </div>
              <p className="text-[13px] md:text-[14px] font-medium text-neutral-900">
                {review.review_title}
              </p>
            </div>

            {/* Review Meta */}
            <div className="flex flex-wrap items-center gap-2 mb-3 text-[11px] md:text-[12px] text-neutral-600">
              <span>Reviewed on {formatDate(review.created_at)}</span>
              <span>|</span>
              <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded text-[10px] md:text-[11px] font-medium">
                Verified Purchase
              </span>
            </div>

            {/* Review Text */}
            <p className="text-[12px] md:text-[13px] text-neutral-700 mb-3 leading-relaxed">
              {review.review_text}
            </p>

            {/* Review Image */}
            {review.user_img && (
              <div className="mb-4">
                <img
                  src={review.user_img}
                  alt="Review"
                  className="w-20 h-20 md:w-24 md:h-24 object-cover rounded border border-neutral-200"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* See More Reviews */}
      {ratingStats?.total_reviews > 3 && (
        <button
          className="mt-6 text-[13px] md:text-[14px] font-medium hover:underline cursor-pointer"
          style={{ color: MAROON }}
        >
          See more reviews
        </button>
      )}
    </div>
  );
}
