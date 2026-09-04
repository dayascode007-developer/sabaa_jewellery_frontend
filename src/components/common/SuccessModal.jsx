"use client";

import { useEffect } from "react";

const MAROON = "#430121";

export default function SuccessModal({ isOpen, message, onClose, autoClose = 3000 }) {
  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(onClose, autoClose);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full animate-in fade-in zoom-in">
        {/* Header */}
        <div className="px-4 md:px-6 py-4 md:py-5 border-b border-gray-200 flex items-center gap-3">
          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full" style={{ backgroundColor: "#E8F5E9" }}>
            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900">Success</h2>
        </div>

        {/* Content */}
        <div className="px-4 md:px-6 py-4 md:py-5">
          <p className="text-sm md:text-base text-gray-600">{message}</p>
        </div>

        {/* Footer */}
        <div className="px-4 md:px-6 py-3 md:py-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 md:px-6 py-2 text-sm md:text-base font-semibold text-white rounded-lg transition-all hover:opacity-90"
            style={{ backgroundColor: MAROON }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
