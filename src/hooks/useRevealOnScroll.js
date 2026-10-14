"use client";

import { useEffect, useRef, useState } from "react";

// The scroll-in zoom the product cards use, pulled out so the home-page
// sections can share it rather than each growing its own observer.
//
// Returns [ref, revealed]. Put the ref on the element that should be watched
// and swap the image between scale-75 and scale-100 on `revealed`:
//
//   const [ref, revealed] = useRevealOnScroll();
//   <div ref={ref}>
//     <Image className={`... ${revealed ? "scale-100" : "scale-75"}`} />
//   </div>
//
// `index` staggers neighbouring tiles. It wraps every four, so a tile far down
// a long list never waits seconds for its turn.
export function useRevealOnScroll(index = 0) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Without IntersectionObserver the section would stay shrunken forever,
    // so reveal it outright. Scheduled rather than called here, so state is
    // never set synchronously inside the effect.
    if (typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setRevealed(true));
      return () => cancelAnimationFrame(id);
    }

    el.style.transitionDelay = `${(index % 4) * 70}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setRevealed(true);
        // Once revealed it stays revealed; scrolling back up must not replay it.
        observer.disconnect();
      },
      // Held until the tile is properly in view rather than firing on its
      // first pixel.
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return [ref, revealed];
}

export default useRevealOnScroll;
