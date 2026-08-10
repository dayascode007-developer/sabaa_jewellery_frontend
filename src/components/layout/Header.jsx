const MAROON = "#7B1E2B";

function Icon({ path, className = "h-6 w-6" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {path}
    </svg>
  );
}

const ICONS = {
  search: <path d="M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm10 18-4.35-4.35" />,
  camera: (
    <>
      <path d="M3 8.5A1.5 1.5 0 0 1 4.5 7h2.2l1.1-2h8.4l1.1 2h2.2A1.5 1.5 0 0 1 21 8.5v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5v-9Z" />
      <circle cx="12" cy="13" r="3.2" />
    </>
  ),
  mic: (
    <>
      <rect x="9.5" y="3" width="5" height="10" rx="2.5" />
      <path d="M6 11.5a6 6 0 0 0 12 0M12 17.5V21" />
    </>
  ),
  gem: <path d="M6 3h12l3 5-9 13L3 8l3-5Zm-3 5h18M9 3 6 8l6 13M15 3l3 5-6 13" />,
  store: (
    <>
      <path d="M3 9.5 4.5 4h15L21 9.5M3 9.5h18M3 9.5v9A1.5 1.5 0 0 0 4.5 20h15a1.5 1.5 0 0 0 1.5-1.5v-9" />
      <path d="M9 20v-5.5h6V20" />
    </>
  ),
  heart: (
    <path d="M12 20s-7.5-4.6-7.5-9.6A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20Z" />
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.8" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </>
  ),
  cart: (
    <>
      <path d="M3 4h2.2l2.3 11.2a1.6 1.6 0 0 0 1.6 1.3h8.3a1.6 1.6 0 0 0 1.6-1.3L21 7.5H6" />
      <circle cx="9.5" cy="20" r="1.2" />
      <circle cx="17.5" cy="20" r="1.2" />
    </>
  ),
};

function Logo() {
  return (
    <a href="#" className="flex shrink-0 flex-col items-center leading-none">
      {/* Ornament above the wordmark */}
      <svg viewBox="0 0 40 12" className="mb-0.5 h-3 w-10" style={{ color: MAROON }} aria-hidden="true">
        <path
          d="M20 1c-3 0-5 2.2-5 4.6 0 2 1.6 3.4 3.3 3.4 1.2 0 2-.7 2-1.6 0-.8-.6-1.3-1.3-1.3M20 1c3 0 5 2.2 5 4.6 0 2-1.6 3.4-3.3 3.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
      <span
        className="font-[family-name:var(--font-display)] text-2xl tracking-wide"
        style={{ color: MAROON }}
      >
        Sabaa
      </span>
      <span
        className="mt-0.5 text-[9px] tracking-[0.3em]"
        style={{ color: MAROON }}
      >
        JEWEL ARTS
      </span>
      <span className="mt-0.5 text-[6px] tracking-[0.2em] text-neutral-400">
        since 1984
      </span>
    </a>
  );
}

export default function Header() {
  const actions = [
    { key: "gem", icon: ICONS.gem, label: "Collections" },
    { key: "store", icon: ICONS.store, label: "Stores" },
    { key: "heart", icon: ICONS.heart, label: "Wishlist" },
    { key: "user", icon: ICONS.user, label: "Account" },
  ];

  return (
    <header className="w-full bg-white">
      <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-4 py-3 sm:gap-8 sm:px-6">
        <Logo />

        {/* Search */}
        <div className="mx-auto w-full max-w-2xl">
          <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 shadow-[0_1px_6px_rgba(0,0,0,0.06)] focus-within:border-neutral-300">
            <span className="text-neutral-400">
              <Icon path={ICONS.search} className="h-[18px] w-[18px]" />
            </span>
            <input
              type="text"
              placeholder="Search for gold necklace"
              aria-label="Search"
              className="min-w-0 flex-1 bg-transparent text-sm text-neutral-700 outline-none placeholder:text-neutral-400"
            />
            <span className="flex items-center gap-3 text-neutral-400">
              <button type="button" aria-label="Search by image" className="hover:text-neutral-600">
                <Icon path={ICONS.camera} className="h-[18px] w-[18px]" />
              </button>
              <button type="button" aria-label="Search by voice" className="hover:text-neutral-600">
                <Icon path={ICONS.mic} className="h-[18px] w-[18px]" />
              </button>
            </span>
          </div>
        </div>

        {/* Actions */}
        <nav className="flex shrink-0 items-center gap-4 sm:gap-5" style={{ color: MAROON }}>
          {actions.map((a) => (
            <button
              key={a.key}
              type="button"
              aria-label={a.label}
              className="hidden transition-opacity hover:opacity-70 sm:block"
            >
              <Icon path={a.icon} />
            </button>
          ))}
          <button type="button" aria-label="Cart" className="relative transition-opacity hover:opacity-70">
            <Icon path={ICONS.cart} />
            <span
              className="absolute -right-1.5 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-medium text-white"
              style={{ backgroundColor: MAROON }}
            >
              0
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
}
