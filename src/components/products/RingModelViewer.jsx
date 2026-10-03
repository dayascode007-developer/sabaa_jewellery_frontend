"use client";

import Image from "next/image";
import { FONT_STYLES, SYMBOLS } from "@/constants/productData";

const MAROON = "#7B1E2B";

export default function RingModelViewer({
  ringName,
  fontId,
  symbolId,
  symbolSide,
  colorId,
  fonts = [],
  symbols = [],
  colors = [],
  productImage,
}) {
  const allSymbols =
    symbols.length > 0
      ? [{ id: "", name: "None", glyph: "", url: "" }, ...symbols]
      : SYMBOLS;
  const allFonts = fonts.length > 0 ? fonts : FONT_STYLES;

  const symbol = allSymbols.find((s) => s.id === symbolId) ?? allSymbols[0];
  const font = allFonts.find((f) => f.id === fontId) ?? allFonts[0];
  const color = colors.length > 0 ? colors.find((c) => c.id == colorId) : null;
  const text = ringName.trim();
  const displayText = text || "Your Name";

  return (
    <div className="relative w-full">
      <div
        className="relative w-full aspect-square rounded-lg border border-[#EFDCD4] overflow-hidden bg-[#FFFDFB]"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {productImage && (
          <Image
            src={productImage}
            alt="Ring model"
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
            priority
          />
        )}

        {/* Engraving text overlay on ring */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            {symbol.url && symbolSide === "left" ? (
              <img
                src={symbol.url}
                alt={symbol.name}
                style={{
                  width: "32px",
                  height: "32px",
                  objectFit: "contain",
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                }}
              />
            ) : null}

            <span
              style={{
                color: text
                  ? color?.name === "Black"
                    ? "#000000"
                    : color?.name === "Red"
                    ? "#DC143C"
                    : color?.name === "Blue"
                    ? "#0047AB"
                    : MAROON
                  : "#CCCCCC",
                fontSize: "28px",
                fontWeight: "bold",
                fontFamily: font.name ? `'${font.name}', serif` : "serif",
                textShadow:
                  "0 1px 3px rgba(255,255,255,0.4), 0 2px 6px rgba(0,0,0,0.2)",
                whiteSpace: "nowrap",
                letterSpacing: font.id ? "0.5px" : "0",
                lineHeight: "1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {displayText}
            </span>

            {symbol.url && symbolSide === "right" ? (
              <img
                src={symbol.url}
                alt={symbol.name}
                style={{
                  width: "32px",
                  height: "32px",
                  objectFit: "contain",
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                  flexShrink: 0,
                }}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
