// Videos are served from public/ rather than imported — the bundler has no
// loader for .mp4, and a video wants range requests, which static serving gives.
//
// Two loaders, used in different places:
//   mark  — the rotating Sabaa mark.        Home page and the footer-link pages.
//   strip — the jewellery line-art strip.   Nav links, categories and products.
const LOADERS = {
  mark: {
    src: "/sabaa-loader.mp4",
    // Square, so one dimension sizes it.
    box: "h-[88px] w-[88px] sm:h-[104px] sm:w-[104px]",
  },
  strip: {
    src: "/sabaa-loader-v2.mp4",
    // 1914x730 at source — a wide banner. Held to its own ratio so it is never
    // squashed into a square.
    box: "aspect-[1914/730] w-[min(80vw,460px)]",
  },
};

// The videos carry their own animation, so there is no CSS spin here —
// animating the element too would move the artwork twice over.
const KEYFRAMES = `
  @keyframes sabaaLoaderPulse {
    0%, 100% { opacity: 0.55; }
    50%      { opacity: 1; }
  }
  @media (prefers-reduced-motion: reduce) {
    [data-sabaa-loader-pulse] { animation: none !important; }
  }
`;

/**
 * One loader animation on its own. Use inside a section that is waiting on
 * data; for a whole page use FullScreenLoader below.
 */
export function SabaaSpinner({ variant = "mark", label = "Loading", className }) {
  const loader = LOADERS[variant] ?? LOADERS.mark;

  return (
    <span
      role="status"
      aria-label={label}
      className={`block leading-none ${className ?? loader.box}`}
    >
      <style>{KEYFRAMES}</style>
      <video
        src={loader.src}
        // All four are required or mobile Safari and Chrome refuse to start it.
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className="block h-full w-full object-contain"
      />
    </span>
  );
}

/**
 * Full-page cover.
 *
 * variant "mark"  — home page and the footer-link pages (about, policy, blogs)
 * variant "strip" — nav links, category listings and product pages
 */
export default function FullScreenLoader({
  variant = "mark",
  message = "Crafting your page",
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5 bg-white"
      role="status"
      aria-live="polite"
    >
      <SabaaSpinner variant={variant} label={message} />

      <p
        data-sabaa-loader-pulse
        className="font-[family-name:var(--font-heading)] text-[15px] tracking-[0.16em] uppercase"
        style={{
          color: "#7B1E2B",
          animation: "sabaaLoaderPulse 1.6s ease-in-out infinite",
        }}
      >
        {message}
      </p>
    </div>
  );
}
