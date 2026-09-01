"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import CategoryNav from "@/components/layout/CategoryNav";

// The category row is 96px tall (max-h-24). Collapsing it removes that height
// from above the viewport, and the browser then corrects the scroll position by
// the same 96px to keep the page from jumping.
//
// So the ONLY thing that stops an endless collapse/expand loop is a dead zone
// WIDER than that correction. 96px of correction can never carry the scroll
// position across a 200px gap, whichever direction it moves.
const ROW_HEIGHT = 96;
const COLLAPSE_AT = 240;
const EXPAND_AT = 40; // gap of 200 — comfortably clear of ROW_HEIGHT

// Guard so this cannot quietly regress if someone retunes the thresholds later.
if (process.env.NODE_ENV !== "production" && COLLAPSE_AT - EXPAND_AT <= ROW_HEIGHT) {
  console.warn(
    `SiteHeader: the gap between COLLAPSE_AT and EXPAND_AT (${
      COLLAPSE_AT - EXPAND_AT
    }px) must exceed the collapsing row's ${ROW_HEIGHT}px, or the header will flicker.`
  );
}

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      // Only flip when the current position is past the far side of the dead
      // zone; anywhere inside it, whatever state we are in is kept.
      setScrolled((was) => (was ? y > EXPAND_AT : y > COLLAPSE_AT));
    };
    onScroll(); // run once in case the page loads already scrolled
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-[0_2px_12px_rgba(0,0,0,0.08)]" : ""
      }`}
    >
      <Header />

      {/* Collapsed by height rather than unmounted, so the mega-menu keeps its
          state and the transition has something to animate.
          overflow-hidden is applied ONLY while collapsed — the mega panel is
          absolutely positioned below this box, so clipping it when expanded
          would cut every dropdown off. */}
      <div
        // overflow-anchor:none stops the browser compensating for this row's
        // height change. Without it, collapsing 96px above the viewport makes
        // Chrome adjust the scroll position by the same 96px — which crosses
        // the threshold again and drives the flicker.
        style={{ overflowAnchor: "none" }}
        className={`transition-[max-height,opacity] duration-300 ease-out ${
          scrolled ? "max-h-0 overflow-hidden opacity-0" : "max-h-24 opacity-100"
        }`}
      >
        <CategoryNav />
      </div>
    </div>
  );
}
