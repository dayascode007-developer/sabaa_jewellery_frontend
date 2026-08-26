"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import CategoryNav from "@/components/layout/CategoryNav";

// Past this many pixels the category row collapses, leaving just the compact
// header bar pinned to the top.
const COLLAPSE_AT = 80;

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > COLLAPSE_AT);
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
        className={`transition-[max-height,opacity] duration-300 ease-out ${
          scrolled ? "max-h-0 overflow-hidden opacity-0" : "max-h-24 opacity-100"
        }`}
      >
        <CategoryNav />
      </div>
    </div>
  );
}
