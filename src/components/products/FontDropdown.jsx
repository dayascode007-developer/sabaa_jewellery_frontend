"use client";

import { useState, useRef, useEffect } from "react";
import { fonts } from "@/constants/fonts";

const fontMap = fonts.reduce((acc, font) => {
  acc[font.id] = font.cssFamily;
  acc[String(font.id)] = font.cssFamily;
  acc[font.name] = font.cssFamily;
  return acc;
}, {});

const getFontCSSFamily = (fontIdOrName) => {
  return fontMap[fontIdOrName] || fontMap[String(fontIdOrName)] || "inherit";
};

export default function FontDropdown({ value, onChange, options = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedFont = options.find((f) => f.id === value || String(f.id) === String(value));

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full">
      {/* Dropdown trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full rounded border border-neutral-300 bg-white px-3 py-2.5 text-left text-[15px] text-neutral-800 outline-none focus:border-neutral-500 flex items-center justify-between"
        style={{ fontFamily: selectedFont ? getFontCSSFamily(selectedFont.name) : "inherit" }}
      >
        <span>{selectedFont?.name || "Select font"}</span>
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-64 overflow-y-auto rounded border border-neutral-300 bg-white shadow-lg">
          {options?.map((font) => (
            <button
              key={font.id}
              onClick={() => {
                onChange(font.id);
                setIsOpen(false);
              }}
              className={`w-full px-3 py-2.5 text-left text-[15px] hover:bg-blue-50 ${
                value === font.id || String(value) === String(font.id) ? "bg-blue-100" : ""
              }`}
              style={{ fontFamily: getFontCSSFamily(font.name) }}
            >
              {font.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
