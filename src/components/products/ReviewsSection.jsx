"use client";

import { FaStar, FaUser } from "react-icons/fa6";
import { useState } from "react";

const MAROON = "#7B1E2B";
const GOLD = "#C9A227";

export default function ReviewsSection() {
  const [reviews] = useState([
    {
      id: 1,
      name: "Esha",
      rating: 5,
      title: "Beautiful",
      date: "5 July 2026",
      color: "Luster",
      verified: true,
      text: "Very beautiful ring",
      image: "https://via.placeholder.com/80x80?text=Ring",
      helpful: 0,
    },
    {
      id: 2,
      name: "Manu sharma",
      rating: 5,
      title: "It's pretty",
      date: "6 June 2026",
      color: "Luster",
      verified: true,
      text: "It's very pretty ring at this price, quality is good but after u color.",
      image: null,
      helpful: 1,
    },
  ]);

  return (
    <div className="mt-8 pt-4 md:pt-6 bg-white rounded-lg p-4 md:p-6">
      <h3
        className="mb-6 font-[family-name:var(--font-category)] text-[16px] md:text-[18px] font-medium"
        style={{ color: MAROON }}
      >
        Top reviews from India
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="pb-6 border-b border-neutral-200 md:border-b-0 lg:border-b-0">
            {/* Reviewer Info */}
            <div className="flex items-center gap-3 mb-3">
              <div
                className="h-10 w-10 rounded-full flex items-center justify-center text-white text-sm font-medium"
                style={{ backgroundColor: MAROON }}
              >
                <FaUser size={16} />
              </div>
              <div>
                <p className="text-[13px] md:text-[14px] font-medium text-neutral-900">
                  {review.name}
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
                {review.title}
              </p>
            </div>

            {/* Review Meta */}
            <div className="flex flex-wrap items-center gap-2 mb-3 text-[11px] md:text-[12px] text-neutral-600">
              <span>Reviewed in India on {review.date}</span>
              {review.color && (
                <>
                  <span>|</span>
                  <span>Colour: {review.color}</span>
                </>
              )}
              {review.verified && (
                <>
                  <span>|</span>
                  <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded text-[10px] md:text-[11px] font-medium">
                    Verified Purchase
                  </span>
                </>
              )}
            </div>

            {/* Review Text */}
            <p className="text-[12px] md:text-[13px] text-neutral-700 mb-3 leading-relaxed">
              {review.text}
            </p>

            {/* Review Image */}
            {review.image && (
              <div className="mb-4">
                <img
                  src={review.image}
                  alt="Review"
                  className="w-20 h-20 md:w-24 md:h-24 object-cover rounded border border-neutral-200"
                />
              </div>
            )}

            {/* Helpful Section */}
            <div className="flex items-center gap-2 md:gap-3">
              <button className="px-4 py-1.5 text-[12px] md:text-[13px] font-medium border border-neutral-300 rounded-full hover:bg-neutral-50 transition-colors cursor-pointer">
                Helpful
              </button>
              <button className="px-4 py-1.5 text-[12px] md:text-[13px] font-medium text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer">
                Report
              </button>
            </div>

            {/* Helpful Count */}
            {review.helpful > 0 && (
              <p className="text-[11px] md:text-[12px] text-neutral-600 mt-2">
                {review.helpful} person{review.helpful !== 1 ? "s" : ""} found this helpful
              </p>
            )}
          </div>
        ))}
      </div>

      {/* See More Reviews */}
      <button
        className="mt-6 text-[13px] md:text-[14px] font-medium hover:underline cursor-pointer"
        style={{ color: MAROON }}
      >
        See more reviews
      </button>
    </div>
  );
}
