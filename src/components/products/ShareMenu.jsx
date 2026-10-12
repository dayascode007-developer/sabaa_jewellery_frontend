"use client";

import { useEffect, useRef, useState } from "react";

// Each entry builds its own share URL from the page link and product title.
const TARGETS = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    color: "#25D366",
    href: (url, text) => `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
    icon: <path d="M12 2.8a9.1 9.1 0 0 0-7.8 13.8L2.9 21.3l4.9-1.3A9.1 9.1 0 1 0 12 2.8Zm4.4 12.1c-.2.6-1.2 1.2-1.7 1.2-.8.1-1.4 0-3-.6-2.5-1.1-4.1-3.6-4.2-3.8-.1-.2-1-1.3-1-2.5s.6-1.8.8-2c.2-.3.5-.3.6-.3h.5c.2 0 .4 0 .6.4l.8 1.8c.1.2 0 .4-.1.5l-.5.6c-.1.2-.2.3-.1.5.1.2.6 1 1.4 1.7 1 .8 1.7 1.1 2 1.2.2 0 .4 0 .5-.1l.8-1c.2-.2.3-.2.5-.1l1.8.8c.2.1.3.2.4.3v.9Z" />,
  },
  {
    id: "facebook",
    label: "Facebook",
    color: "#1877F2",
    href: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    icon: <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H16.7V3.6c-.3 0-1.3-.13-2.45-.13-2.43 0-4.1 1.48-4.1 4.2v2.23H7.4V13h2.75v8h3.35Z" />,
  },
  {
    id: "x",
    label: "X",
    color: "#000000",
    href: (url, text) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    icon: <path d="M4 3h4.2l4 5.6L17 3h3l-6.4 8.6L20.5 21h-4.2l-4.4-6.1L6.6 21H3.5l6.8-9.1L4 3Z" />,
  },
  {
    id: "telegram",
    label: "Telegram",
    color: "#229ED9",
    href: (url, text) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    icon: <path d="M21 5 3 11.5l5 1.8L19 7l-8.5 8.2.4 4.3 2.6-3.3 4 3L21 5Z" />,
  },
  {
    id: "pinterest",
    label: "Pinterest",
    color: "#E60023",
    href: (url, text) =>
      `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(text)}`,
    icon: <path d="M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.5 1.8-2.5.9 0 1.3.6 1.3 1.4 0 .9-.6 2.2-.9 3.4-.2 1 .5 1.9 1.5 1.9 1.8 0 3.1-1.9 3.1-4.6 0-2.4-1.7-4.1-4.2-4.1-2.9 0-4.6 2.1-4.6 4.3 0 .9.3 1.8.7 2.3.1.1.1.2.1.3l-.3 1c0 .2-.1.2-.3.1-1.2-.6-1.9-2.3-1.9-3.7 0-3 2.2-5.8 6.3-5.8 3.3 0 5.9 2.4 5.9 5.5 0 3.3-2.1 5.9-5 5.9-1 0-1.9-.5-2.2-1.1l-.6 2.3c-.2.8-.8 1.9-1.2 2.5A10 10 0 1 0 12 2Z" />,
  },
];

export default function ShareMenu({ title, path }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");
  const ref = useRef(null);

  // window is not available during render, so the absolute URL is read after mount.
  useEffect(() => {
    if (typeof window !== "undefined") setUrl(window.location.origin + path);
  }, [path]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    // On phones the OS share sheet lists every app the user actually has, which
    // beats a fixed list. Fall back to the popover where it is unsupported.
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // cancelled or blocked — fall through to the popover
      }
    }
    setOpen((v) => !v);
  };

  const copyLink = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      // Try modern Clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        // Fallback: use old document.execCommand method
        const textarea = document.createElement("textarea");
        textarea.value = url;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (error) {
      setCopied(false);
    }
  };

  return (
    <div ref={ref} className="relative z-30">
      <button
        type="button"
        onClick={handleClick}
        aria-label="Share this product"
        aria-expanded={open}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-neutral-600 shadow-sm ring-1 ring-neutral-200 transition-colors hover:text-neutral-900 sm:h-8 sm:w-8"
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="18" cy="5" r="2.6" />
          <circle cx="6" cy="12" r="2.6" />
          <circle cx="18" cy="19" r="2.6" />
          <path d="m8.3 10.8 7.4-4.3M8.3 13.2l7.4 4.3" />
        </svg>
      </button>

      {open ? (
        <>
          {/* Mobile modal backdrop */}
          <div className="fixed inset-0 z-40 bg-black/20 sm:hidden" onClick={() => setOpen(false)} />

          {/* Modal card */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="fixed bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 z-50 w-48 rounded-lg bg-white py-2 shadow-xl ring-1 ring-neutral-200 sm:absolute sm:left-auto sm:right-0 sm:bottom-auto sm:translate-x-0 sm:translate-y-0 sm:-right-10 sm:top-10 sm:w-44 sm:py-1"
          >
            {/* Close button for mobile */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute -top-8 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-white text-neutral-600 shadow-sm ring-1 ring-neutral-200 transition-colors hover:text-neutral-900 sm:hidden"
              aria-label="Close share menu"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          {TARGETS.map((t) => (
            <a
              key={t.id}
              href={t.href(url, title)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-[12px] text-neutral-700 transition-colors hover:bg-neutral-50"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" fill={t.color} aria-hidden="true">
                {t.icon}
              </svg>
              {t.label}
            </a>
          ))}

          <button
            type="button"
            onClick={copyLink}
            className="flex w-full items-center gap-2.5 border-t border-neutral-100 px-3 py-2 text-left text-[12px] text-neutral-700 transition-colors hover:bg-neutral-50"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 text-neutral-500 sm:h-4 sm:w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="9" y="9" width="11" height="11" rx="2" />
              <path d="M5 15V5a2 2 0 0 1 2-2h8" />
            </svg>
            {copied ? "Link copied" : "Copy link"}
          </button>
        </div>
        </>
      ) : null}
    </div>
  );
}
