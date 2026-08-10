import { USEFUL_LINKS, COMPANY_INFO, LEGAL_LINKS } from "@/constants/footerData";

const FOOTER_BG = "#3D0F0F";

function Icon({ path, className = "h-5 w-5", filled = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {path}
    </svg>
  );
}

const GLYPHS = {
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  x: (
    <path
      d="M4 3h4.2l4 5.6L17 3h3l-6.4 8.6L20.5 21h-4.2l-4.4-6.1L6.6 21H3.5l6.8-9.1L4 3Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  facebook: (
    <path
      d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H16.7V3.6c-.3 0-1.3-.13-2.45-.13-2.43 0-4.1 1.48-4.1 4.2v2.23H7.4V13h2.75v8h3.35Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" fill="currentColor" stroke="none" />
      <path d="M10.3 9.2v5.6l5-2.8-5-2.8Z" fill={FOOTER_BG} stroke="none" />
    </>
  ),
  whatsapp: (
    <path
      d="M12 2.8a9.1 9.1 0 0 0-7.8 13.8L2.9 21.3l4.9-1.3A9.1 9.1 0 1 0 12 2.8Zm0 1.9a7.2 7.2 0 1 1-3.8 13.3l-.3-.2-2.6.7.7-2.5-.2-.3A7.2 7.2 0 0 1 12 4.7Zm4.4 10.2c-.1-.2-.4-.3-.8-.5l-1.7-.8c-.2-.1-.4-.1-.6.1l-.7.9c-.1.2-.3.2-.5.1a7.4 7.4 0 0 1-2-1.2 8 8 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.5-.6c.1-.2.2-.3.1-.5l-.8-1.7c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-.9.9-.9 2.1 0 1.3.9 2.5 1 2.6.2.2 1.8 2.9 4.5 4 2.2.9 2.7.7 3.2.7.5 0 1.6-.6 1.8-1.3.2-.6.2-1.1.1-1.2Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  mail: (
    <>
      <path d="M3.5 6.5h17v11h-17z" />
      <path d="m3.5 7.5 8.5 6 8.5-6" />
    </>
  ),
  chat: (
    <>
      <path d="M20.5 12.2c0 3.7-3.6 6.7-8 6.7-1 0-2-.2-2.9-.5L4.5 20l1.3-3.4a6.3 6.3 0 0 1-2.3-4.4c0-3.7 3.6-6.7 8-6.7s9 3 9 6.7Z" />
    </>
  ),
};

// Ornate knot mark above the wordmark.
function Wordmark() {
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 80 80" className="h-16 w-16 text-white" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M40 16c-7 0-12 5-12 11s5 10 12 10 12-4 12-10-5-11-12-11Z" />
          <path d="M40 64c-7 0-12-5-12-11s5-10 12-10 12 4 12 10-5 11-12 11Z" />
          <path d="M16 40c0-7 5-12 11-12s10 5 10 12-4 12-10 12-11-5-11-12Z" />
          <path d="M64 40c0-7-5-12-11-12s-10 5-10 12 4 12 10 12 11-5 11-12Z" />
          <circle cx="40" cy="40" r="7" />
        </g>
      </svg>
      <span className="mt-1 font-[family-name:var(--font-display)] text-4xl leading-none text-white">
        Sabaa
      </span>
    </div>
  );
}

// The notch bitten out of the top and bottom edges. Two arcs sweeping down from
// each side and meeting at a sharp cusp in the middle — not a single rounded
// hump, which is what makes it read as two petals rather than a dome.
function Notch({ position }) {
  const isTop = position === "top";
  return (
    <svg
      viewBox="0 0 120 40"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute left-1/2 h-10 w-40 -translate-x-1/2 text-white ${
        isTop ? "top-0" : "bottom-0 rotate-180"
      }`}
      aria-hidden="true"
    >
      {/* The control points next to each endpoint must sit below y=0. With them
          on the baseline the shape tapers to a sub-pixel sliver either side of
          the notch, which antialiases into a visible 1px line. */}
      <path
        d="M0 0 L120 0 C113 5 86 10 60 34 C34 10 7 5 0 0 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Footer() {
  return (
    <div className="w-full bg-white px-3 pt-10 pb-3 sm:px-5 sm:pt-14 sm:pb-5">
      <footer
        className="relative overflow-hidden rounded-[28px] px-6 py-12 sm:px-10 sm:py-14"
        style={{ backgroundColor: FOOTER_BG }}
      >
        <Notch position="top" />
        <Notch position="bottom" />

        <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-10 lg:flex-row lg:gap-0">
          {/* Brand column, ruled off from the rest */}
          <aside className="flex flex-col items-center px-2 lg:w-[30%] lg:border-r lg:border-white/15 lg:pr-8">
            <Wordmark />

            <p className="mt-7 font-[family-name:var(--font-heading)] text-lg font-semibold text-white">
              Follow us on Instagram
            </p>

            {/* Placeholder for the Instagram QR image */}
            <div className="mt-4 flex aspect-square w-full max-w-[240px] items-center justify-center rounded-sm bg-white text-[11px] text-neutral-500">
              QR code
            </div>

            <span className="mt-6 hidden h-px w-full max-w-[340px] bg-white/15 lg:block" />
          </aside>

          {/* Everything else aligns to this column, including the rows below */}
          <div className="min-w-0 flex-1 lg:pl-10">
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-3">
              {/* Useful links */}
              <nav>
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-white">
                  Useful Links
                </h3>
                <ul className="mt-5 space-y-4">
                  {USEFUL_LINKS.map((link) => (
                    <li key={link.id}>
                      <a
                        href={link.href}
                        className="font-[family-name:var(--font-heading)] text-[15px] leading-snug text-neutral-200 transition-colors hover:text-white"
                      >
                        {link.label.split("\n").map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Information */}
              <div>
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-white">
                  Information
                </h3>
                <p className="mt-5 font-[family-name:var(--font-heading)] text-[15px] text-neutral-200">
                  {COMPANY_INFO.addressLabel}
                </p>
                <address className="mt-4 font-[family-name:var(--font-heading)] text-[15px] leading-relaxed text-neutral-200 not-italic">
                  {COMPANY_INFO.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                  <span className="block">{COMPANY_INFO.mobileLabel}</span>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="block transition-colors hover:text-white"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </address>

                <span className="mt-4 block h-px w-40 bg-white/25" />

                <div className="mt-4 flex items-center gap-6 text-white">
                  <a href="#" aria-label="WhatsApp" className="transition-opacity hover:opacity-70">
                    <Icon path={GLYPHS.whatsapp} filled className="h-6 w-6" />
                  </a>
                  <a href="#" aria-label="Email" className="transition-opacity hover:opacity-70">
                    <Icon path={GLYPHS.mail} className="h-6 w-6" />
                  </a>
                  <a href="#" aria-label="Chat" className="transition-opacity hover:opacity-70">
                    <Icon path={GLYPHS.chat} className="h-6 w-6" />
                  </a>
                </div>
              </div>

              {/* Contact + map */}
              <div className="sm:text-center">
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-white">
                  Contact Us
                </h3>
                <a
                  href={`tel:${COMPANY_INFO.phone.replace(/\s/g, "")}`}
                  className="mt-2 block font-[family-name:var(--font-heading)] text-[15px] text-neutral-200 transition-colors hover:text-white"
                >
                  {COMPANY_INFO.phone}
                </a>

                {/* Placeholder for the embedded Google map */}
                <div className="mt-4 flex aspect-[5/3] w-full max-w-[260px] items-center justify-center rounded-sm bg-neutral-300 text-[11px] text-neutral-600 sm:mx-auto">
                  Map
                </div>
                <a
                  href={COMPANY_INFO.mapUrl}
                  className="mt-2 block max-w-[260px] font-[family-name:var(--font-heading)] text-[15px] text-neutral-200 transition-colors hover:text-white sm:mx-auto"
                >
                  Google Map
                </a>
              </div>
            </div>

            {/* Social */}
            <div className="mt-8 flex items-center gap-5 border-t border-white/15 pt-6">
              <span className="font-[family-name:var(--font-heading)] text-lg font-semibold text-white">
                Social
              </span>
              <div className="flex items-center gap-3">
                {["instagram", "x", "facebook", "youtube"].map((key) => (
                  <a
                    key={key}
                    href="#"
                    aria-label={key}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#3D0F0F] transition-opacity hover:opacity-80"
                  >
                    <Icon path={GLYPHS[key]} className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Payments */}
            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/15 pt-6">
              <span className="rounded-sm bg-white px-1.5 py-1 text-[9px] font-bold tracking-tight text-[#1A1F71] italic">
                VISA
              </span>
              <span className="flex items-center rounded-sm bg-white px-1.5 py-1">
                <span className="h-3 w-3 rounded-full bg-[#EB001B]" />
                <span className="-ml-1 h-3 w-3 rounded-full bg-[#F79E1B]" />
              </span>
              <span className="flex items-center rounded-sm bg-white/10 px-1.5 py-1">
                <span className="h-3 w-3 rounded-full bg-white" />
                <span className="-ml-1 h-3 w-3 rounded-full bg-white/40" />
              </span>
              <span className="rounded-sm bg-white px-1.5 py-1 text-[9px] font-bold text-[#003087] italic">
                PayPal
              </span>
              <span className="font-[family-name:var(--font-heading)] text-sm text-white italic">
                UPI
              </span>
            </div>

            {/* Legal */}
            <div className="mt-6 flex flex-col gap-3 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[13px] text-neutral-300">
                © 2026 <span className="font-semibold text-white">Nakshath International.</span>{" "}
                All Rights Reserved.
              </p>
              <ul className="flex flex-wrap items-center gap-5">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className="text-[13px] text-neutral-300 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
