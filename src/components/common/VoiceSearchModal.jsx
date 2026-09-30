"use client";

import { useEffect, useState } from "react";

const MAROON = "#7B1E2B";
const ORANGE = "#E8A33D";
const GREEN = "#10B981";

export default function VoiceSearchModal({ isOpen, text, error, isListening, hasResults, onClose }) {
  const [show, setShow] = useState(isOpen);

  useEffect(() => {
    setShow(isOpen);

    // Auto-close on success (has results, no error, not listening)
    if (isOpen && !isListening && !error && hasResults) {
      const timer = setTimeout(() => {
        setShow(false);
        onClose?.();
      }, 1000);
      return () => clearTimeout(timer);
    }

    // Keep modal open on error
    if (isOpen && !isListening && error) {
      return; // Don't auto-close on error
    }
  }, [isOpen, isListening, error, hasResults, onClose]);

  if (!show) return null;

  const isSuccess = hasResults && !error && !isListening;
  const iconColor = isSuccess ? GREEN : ORANGE;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-11/12 flex flex-col items-center text-center shadow-lg">
        {/* Icon */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
          style={{ backgroundColor: iconColor }}
        >
          <svg
            className="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 15h-2v-2h2v2m0-4h-2V7h2v6z" />
          </svg>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {isListening ? "Listening..." : isSuccess ? "Found Products!" : error ? "Sorry I didn't get that" : "Voice Search"}
        </h3>

        {/* Error Message or Transcript */}
        {error && (
          <p className="text-sm text-gray-600 mb-4 font-medium">
            {error}
          </p>
        )}
        {text && !error && (
          <p className="text-sm text-gray-600 mb-4 font-medium">
            "{text}"
          </p>
        )}

        {/* Loading indicator */}
        {isListening && (
          <div className="flex items-center gap-1 mb-4">
            <div
              className="w-2 h-2 rounded-full animate-bounce"
              style={{ backgroundColor: ORANGE }}
            />
            <div
              className="w-2 h-2 rounded-full animate-bounce"
              style={{ backgroundColor: ORANGE, animationDelay: "0.2s" }}
            />
            <div
              className="w-2 h-2 rounded-full animate-bounce"
              style={{ backgroundColor: ORANGE, animationDelay: "0.4s" }}
            />
          </div>
        )}

        {/* Message */}
        <p className="text-sm mb-4" style={{ color: ORANGE }}>
          {isListening ? "Please speak clearly..." : "Tap microphone to try again"}
        </p>

        {/* Close button - only show on error */}
        {!isListening && error && (
          <button
            onClick={onClose}
            className="mt-4 px-6 py-2 rounded-full text-white font-medium transition-opacity hover:opacity-90"
            style={{ backgroundColor: MAROON }}
          >
            OK
          </button>
        )}
      </div>
    </div>
  );
}
