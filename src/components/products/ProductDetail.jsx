"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/slices/cartSlice";
import Image from "next/image";
import RingSizeGuide from "@/components/products/RingSizeGuide";
import CareGuide from "@/components/products/CareGuide";
import SuccessModal from "@/components/common/SuccessModal";
import { FONT_STYLES, SYMBOLS, NAME_MAX_LENGTH } from "@/constants/productData";
import qualityBadge from "@/assets/batch/Sabaa Quality Batch.png";

const MAROON = "#7B1E2B";
const WHATSAPP = "#25D366";

const rupees = (n) =>
  "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function Stars({ rating }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-4 w-4" fill={i < rating ? "#E8A33D" : "#DDD"} aria-hidden="true">
          <path d="m12 2 2.9 6.3 6.8.8-5 4.7 1.3 6.8L12 17.4 5.9 20.6 7.3 13.8l-5-4.7 6.8-.8L12 2Z" />
        </svg>
      ))}
    </div>
  );
}

function Placeholder({ label }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#EDE3D3] via-[#E3D5BE] to-[#D8C6A8] p-4 text-center">
      <span className="text-[11px] leading-tight text-[#8A6E45]">{label}</span>
    </div>
  );
}

// How much the magnifier enlarges, and how much of the frame it covers.
const ZOOM = 2.4;
// 0.45 covered nearly half the frame and read as a panel sitting on the photo
// rather than as a glass held over it.
const LENS_RATIO = 0.3;

function Gallery({ product }) {
  const [active, setActive] = useState(0);
  // null when the cursor is away; { x, y } as percentages while hovering.
  const [lens, setLens] = useState(null);

  // The product shot first, then the workshop images shot for its category.
  // Padded to four so the thumbnail row keeps its shape on sparse categories.
  const shots = [...(product.gallery ?? [product.image])];
  while (shots.length < 4) shots.push(null);

  const current = shots[active];
  // The magnifier reads the original file, not the resized <Image> output —
  // zooming a downscaled copy would only show bigger blur.
  const fullSrc = typeof current === "string" ? current : current?.src ?? null;

  // Pixel maths, not percentages — the background offset inside the lens has
  // to be expressed against the scaled image's real size.
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setLens({
      x: e.clientX - r.left,
      y: e.clientY - r.top,
      w: r.width,
      h: r.height,
    });
  };

  // The lens is a window onto the image blown up to ZOOM, so what you see
  // inside it is the area underneath, magnified — a magnifying glass held over
  // the photo rather than a separate panel beside it.
  let magnifier = null;
  if (lens && fullSrc) {
    const lw = lens.w * LENS_RATIO;
    const lh = lens.h * LENS_RATIO;
    // Kept fully inside the frame, so the lens never shows blank edges.
    const cx = Math.min(lens.w - lw / 2, Math.max(lw / 2, lens.x));
    const cy = Math.min(lens.h - lh / 2, Math.max(lh / 2, lens.y));

    magnifier = {
      left: cx - lw / 2,
      top: cy - lh / 2,
      width: lw,
      height: lh,
      // Quoted. Next keeps the original file name in the emitted URL, and 13
      // of the Initial Rings files contain a space ("Letter A-…"). Unquoted,
      // that space ends the CSS url() early, the whole rule is dropped, and
      // the lens magnifies nothing.
      // Quotes rather than encodeURI: encodeURI also escapes "%", so a path
      // that arrived already encoded would come out double-encoded.
      backgroundImage: `url("${fullSrc}")`,
      backgroundSize: `${lens.w * ZOOM}px ${lens.h * ZOOM}px`,
      backgroundPosition: `${-(cx * ZOOM - lw / 2)}px ${-(cy * ZOOM - lh / 2)}px`,
      backgroundRepeat: "no-repeat",
    };
  }

  return (
    // Fills its grid column. A max-width here left a band of empty space
    // between the image and the details, because the column stays half the
    // page wide whatever the image does.
    <div className="w-full">
      {/* relative wrapper, so the magnifier panel can sit outside the image's
          overflow-hidden box and float over the column beside it. */}
      <div className="relative">
        <div
          className="relative aspect-square w-full overflow-hidden rounded-lg bg-neutral-100"
          onMouseMove={fullSrc ? onMove : undefined}
          onMouseLeave={() => setLens(null)}
        >
          {current ? (
            typeof current === "string" && current.startsWith("http") ? (
              <img
                src={current}
                alt={product.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <Image src={current} alt={product.title} fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" priority />
            )
          ) : (
            <Placeholder label={product.title} />
          )}

          {/* The magnifier itself. Desktop only — there is no hover to follow
              on a touch screen. The wide ring shadow darkens everything outside
              it, so the eye goes straight to the magnified part. */}
          {magnifier ? (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute hidden rounded-sm ring-2 ring-white/90 shadow-[0_0_0_9999px_rgba(0,0,0,0.28)] lg:block"
              style={magnifier}
            />
          ) : null}
        </div>
      </div>

      {/* Thumbnail gallery with scroll indicator */}
      <div className="mt-3 relative">
        <div className="flex gap-2 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {shots.map((shot, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={i === active}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded border transition-colors ${
                i === active ? "border-[#7B1E2B]" : "border-neutral-200 hover:border-neutral-400"
              }`}
            >
              {shot ? (
                typeof shot === "string" && shot.startsWith("http") ? (
                  <img src={shot} alt="" className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <Image src={shot} alt="" fill sizes="64px" className="object-cover" />
                )
              ) : (
                <span className="block h-full w-full bg-gradient-to-br from-[#EDE3D3] to-[#D8C6A8]" />
              )}
            </button>
          ))}
        </div>

      </div>

      {/* Trust badges under the gallery */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        {[
          {
            id: "delivery",
            label: "Delivery in 10 Days",
            // Van with the wheels sitting clear of the body rather than cutting
            // through it, and two speed lines behind carrying the "10 Days".
            icon: (
              <>
                <rect x="2.4" y="7.4" width="9.6" height="8.5" rx="1" />
                <path d="M12 10.4h3.7l3.3 3.3v2.2H12z" />
                <circle cx="6.5" cy="17.7" r="1.6" />
                <circle cx="16.3" cy="17.7" r="1.6" />
                <path d="M0.6 9.8h1.2M0.6 13h1.2" />
              </>
            ),
          },
          {
            id: "safe",
            label: "Safe to Use",
            // Narrower shield with a shorter tick sitting properly inside it —
            // the old tick ran almost edge to edge.
            icon: (
              <>
                <path d="M12 3.4 18.4 5.8v5.9c0 3.9-2.6 7-6.4 8-3.8-1-6.4-4.1-6.4-8V5.8L12 3.4Z" />
                <path d="M9.4 11.8 11.3 13.7 14.8 10.2" />
              </>
            ),
          },
        ].map((b) => (
          <div key={b.id} className="flex flex-col items-center gap-1.5 text-center">
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" style={{ color: MAROON }} aria-hidden="true">
              {b.icon}
            </svg>
            <span className="text-[12px] text-neutral-700">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Accordion({ sections, description }) {
  // Description starts open, matching the reference.
  const [openId, setOpenId] = useState("description");
  const rows = [...sections, { id: "description", title: "Description", body: description }];

  return (
    <div className="mt-6 divide-y divide-neutral-200 rounded-lg border border-neutral-200">
      {rows.map((row) => {
        const isOpen = openId === row.id;
        return (
          <div key={row.id}>
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : row.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
            >
              <span className="text-[13px] font-medium" style={{ color: MAROON }}>
                {row.title}
              </span>
              <svg viewBox="0 0 24 24" className={`h-4 w-4 shrink-0 text-neutral-500 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            {isOpen ? (
              <p className="px-4 pb-4 text-[12px] leading-relaxed text-neutral-600">{row.body}</p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  Symbol wheel — the iOS time-picker pattern.
 * ------------------------------------------------------------------ */

const ITEM_H = 44; // px per row
const VISIBLE = 5; // rows on screen: two above, the selected one, two below
const PAD = ITEM_H * Math.floor(VISIBLE / 2); // lets the first and last rows reach the centre

function SymbolWheel({ value, onChange }) {
  const listRef = useRef(null);
  const index = Math.max(
    0,
    SYMBOLS.findIndex((s) => s.id === value)
  );

  // Line the chosen row up with the highlight on first paint only. Re-running
  // it on every value change would yank the list while a finger is still on it.
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = index * ITEM_H;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Whichever row is nearest the centre is the selection. Scroll-snap settles
  // on exact multiples, so rounding is enough — no timer needed.
  const onScroll = () => {
    const el = listRef.current;
    if (!el) return;
    const i = Math.min(
      SYMBOLS.length - 1,
      Math.max(0, Math.round(el.scrollTop / ITEM_H))
    );
    if (SYMBOLS[i].id !== value) onChange(SYMBOLS[i].id);
  };

  const scrollTo = (i) => {
    listRef.current?.scrollTo({ top: i * ITEM_H, behavior: "smooth" });
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(
        SYMBOLS.length - 1,
        Math.max(0, index + (e.key === "ArrowDown" ? 1 : -1))
      );
      scrollTo(next);
      onChange(SYMBOLS[next].id);
    }
  };

  return (
    <div
      className="relative mt-1.5 overflow-hidden rounded-xl border border-neutral-300 bg-white"
      style={{ height: ITEM_H * VISIBLE }}
    >
      {/* The stationary selection bar the rows pass under */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-1.5 top-1/2 z-0 -translate-y-1/2 rounded-lg"
        style={{ height: ITEM_H, backgroundColor: "#FDF0F2" }}
      />

      <div
        ref={listRef}
        onScroll={onScroll}
        onKeyDown={onKeyDown}
        tabIndex={0}
        role="listbox"
        aria-label="Symbol"
        aria-activedescendant={`symbol-opt-${SYMBOLS[index].id}`}
        // relative z-10 matters: the mask below makes this element a stacking
        // context, so the rows inside it can no longer out-rank the selection
        // bar on their own — the bar was painting over the chosen row and
        // leaving the highlight looking empty.
        //
        // The scrollbar is deliberately left visible, and made thin, so it is
        // obvious there is more to scroll to. Hidden, the wheel looked like a
        // fixed list of five.
        className="relative z-10 h-full snap-y snap-mandatory overflow-y-auto outline-none [scrollbar-color:#D6C3BB_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#D6C3BB] [&::-webkit-scrollbar-track]:bg-transparent"
        style={{
          paddingTop: PAD,
          paddingBottom: PAD,
          // Rows dissolve towards the top and bottom edges instead of being cut
          // off — that fade is what makes it read as a wheel rather than a list.
          maskImage:
            "linear-gradient(to bottom, transparent, #000 26%, #000 74%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, #000 26%, #000 74%, transparent)",
        }}
      >
        {SYMBOLS.map((s, i) => {
          const active = i === index;
          const distance = Math.abs(i - index);
          return (
            <div
              key={s.id}
              id={`symbol-opt-${s.id}`}
              role="option"
              aria-selected={active}
              onClick={() => {
                scrollTo(i);
                onChange(s.id);
              }}
              className="relative z-20 flex cursor-pointer snap-center items-center justify-center gap-2.5 select-none"
              style={{
                height: ITEM_H,
                // Further from the centre, smaller and fainter — the same cue
                // the iOS picker uses for depth.
                opacity: active ? 1 : distance === 1 ? 0.55 : 0.3,
                transform: active ? "scale(1)" : "scale(0.9)",
                transition: "opacity 150ms, transform 150ms",
              }}
            >
              {s.glyph ? (
                <span className="text-[20px] leading-none text-neutral-700">{s.glyph}</span>
              ) : null}
              <span
                className={`text-[15px] leading-none ${active ? "font-semibold" : ""}`}
                style={{ color: active ? MAROON : "#6B6B6B" }}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Shows what the engraving will read, in the chosen face, with the symbol on
 * the chosen side. Sits under the gallery so the customer can watch it change
 * while filling the fields on the right.
 */
function StylePreview({ name, fontId, symbolId, side }) {
  const font = FONT_STYLES.find((f) => f.id === fontId) ?? FONT_STYLES[0];
  const symbol = SYMBOLS.find((s) => s.id === symbolId) ?? SYMBOLS[0];
  const text = name.trim();

  return (
    <div className="mt-5">
      <p className="text-center text-[13px] font-medium" style={{ color: MAROON }}>
        Style Preview
      </p>

      {/* Graph paper, drawn with two repeating gradients rather than an image */}
      <div
        className="mt-2 flex min-h-[104px] items-center justify-center rounded-lg border border-[#EFDCD4] px-4 py-5"
        style={{
          backgroundColor: "#FFFDFB",
          backgroundImage:
            "repeating-linear-gradient(0deg, #F0E4DC 0 1px, transparent 1px 14px), repeating-linear-gradient(90deg, #F0E4DC 0 1px, transparent 1px 14px)",
        }}
      >
        {text ? (
          <p className="flex items-baseline gap-2 text-center break-all">
            {symbol.glyph && side === "left" ? (
              <span className="text-[22px] text-neutral-700">{symbol.glyph}</span>
            ) : null}

            <span
              className="text-[30px] leading-tight sm:text-[36px]"
              style={{ color: MAROON, fontFamily: `var(${font.cssVar})` }}
            >
              {text}
            </span>

            {symbol.glyph && side === "right" ? (
              <span className="text-[22px] text-neutral-700">{symbol.glyph}</span>
            ) : null}
          </p>
        ) : (
          <p className="text-[13px] text-neutral-400">
            Type a name to see it here
          </p>
        )}
      </div>

      <p className="mt-1.5 text-center text-[11px] text-neutral-500">
        Indicative only — the finished engraving is cut by hand.
      </p>
    </div>
  );
}

export default function ProductDetail({ product }) {
  const [size, setSize] = useState(product.sizes?.[2] ?? "");
  const [qty, setQty] = useState(1);
  const [giftWrap, setGiftWrap] = useState(false);

  // Engraving options. Only rings carry them — a chain has no "ring name".
  const [ringName, setRingName] = useState("");
  const [fontId, setFontId] = useState(FONT_STYLES[0].id);
  const [symbolId, setSymbolId] = useState(SYMBOLS[0].id);
  const [symbolSide, setSymbolSide] = useState("left");

  const dispatch = useDispatch();

  // The button gave no sign it had worked — the same gap the product cards had.
  const [added, setAdded] = useState(false);
  // Portalled to <body>, which does not exist during the server render.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Everything the workshop needs to make this exact piece travels with the
  // line, not just the product id — otherwise the engraving is lost at checkout.
  const onAddToCart = () => {
    dispatch(
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        code: product.productCode,
        quantity: qty,
        ...(product.hasRingSize ? { size } : {}),
        ...(product.isCustomisable
          ? { ringName, fontId, symbolId, symbolSide }
          : {}),
      })
    );
    setAdded(true);
  };

  const discount =
    product.mrp && product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  return (
    <>
    <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12">
      <div className="sm:sticky sm:top-4 sm:h-fit lg:sticky lg:top-4 lg:h-fit">
        <Gallery product={product} />

        {/* Preview of the engraving — only where there is engraving to preview. */}
        {product.isCustomisable ? (
          <StylePreview
            name={ringName}
            fontId={fontId}
            symbolId={symbolId}
            side={symbolSide}
          />
        ) : null}
      </div>

      <div>
        {/* Top row — bestseller flag and quick actions */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {product.bestseller ? (
            <span className="inline-flex items-center gap-1.5 rounded bg-[#FDF0F2] px-2.5 py-1 text-[11px] font-medium" style={{ color: MAROON }}>
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden="true">
                <path d="m12 2 2.9 6.3 6.8.8-5 4.7 1.3 6.8L12 17.4 5.9 20.6 7.3 13.8l-5-4.7 6.8-.8L12 2Z" />
              </svg>
              BESTSELLER
            </span>
          ) : null}

          <div className="flex items-center gap-4 text-[12px] text-neutral-600">
            {["Share", "Wishlist", "View Similar"].map((a) => (
              <button key={a} type="button" className="transition-colors hover:text-neutral-900">
                {a}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-3 text-[11px] text-neutral-500">
          Product Code : <span className="text-neutral-700">{product.code}</span>
        </p>

        <h1 className="mt-1 font-[family-name:var(--font-heading)] text-[26px] leading-snug text-neutral-900 sm:text-[32px] lg:text-[40px]">
          {product.title}
        </h1>

        <div className="mt-2">
          <Stars rating={product.rating} />
        </div>

        <div className="mt-3 flex flex-wrap items-baseline gap-2">
          <span className="text-[22px] font-semibold" style={{ color: MAROON }}>
            {rupees(product.price)}
          </span>
          {product.mrp > product.price ? (
            <>
              <span className="text-[14px] text-neutral-400 line-through">{rupees(product.mrp)}</span>
              <span className="text-[13px] text-neutral-600">({discount}% OFF)</span>
            </>
          ) : null}
        </div>
        <p className="mt-0.5 text-[11px] text-neutral-500">MRP inclusive of all taxes</p>

        {/* Quality seal, on its own line under the tax note.
            width/height matter here: the source is 1024px square, and without
            them Next serves a variant sized for the full intrinsic width
            rather than the small size this actually renders at. */}
        <Image
          src={qualityBadge}
          alt="Premium product — excellent quality"
          width={54}
          height={54}
          sizes="54px"
          className="mt-2 h-[54px] w-[54px]"
        />

        {/* Ring size — rings only. A chain, pendant or pair of earrings has no
            finger size, so the whole block is left out rather than shown with
            values that mean nothing for the piece. */}
        {product.hasRingSize ? (
        <div className="mt-5">
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="ring-size" className="text-[13px] font-medium" style={{ color: MAROON }}>
              Ring Size
            </label>
            <RingSizeGuide />
          </div>
          <select
            id="ring-size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="mt-1.5 w-full rounded border border-neutral-300 bg-white px-3 py-2.5 text-[13px] text-neutral-800 outline-none focus:border-neutral-500"
          >
            {product.sizes?.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        ) : null}

        {/* Engraving — Name Engrave Rings only. The other ring categories are
            finished designs, so they get the size selector above but nothing
            here: there is nothing to cut into them. */}
        {product.isCustomisable ? (
          <>
            <div className="mt-4">
              <label
                htmlFor="ring-name"
                className="block text-[13px] font-medium"
                style={{ color: MAROON }}
              >
                Ring Name
              </label>
              <input
                id="ring-name"
                type="text"
                value={ringName}
                maxLength={NAME_MAX_LENGTH}
                onChange={(e) => setRingName(e.target.value)}
                placeholder="Name to engrave"
                className="mt-1.5 w-full rounded border border-neutral-300 bg-white px-3 py-2.5 text-[13px] text-neutral-800 outline-none focus:border-neutral-500"
              />
              <p className="mt-1 text-right text-[10px] text-neutral-500">
                {ringName.length}/{NAME_MAX_LENGTH}
              </p>
            </div>

            <div className="mt-3">
              <label
                htmlFor="font-style"
                className="block text-[13px] font-medium"
                style={{ color: MAROON }}
              >
                Font Style
              </label>
              {/* The select shows the chosen face, so the control previews
                  itself before you look at the panel below the photo. */}
              <select
                id="font-style"
                value={fontId}
                onChange={(e) => setFontId(e.target.value)}
                className="mt-1.5 w-full rounded border border-neutral-300 bg-white px-3 py-2.5 text-[15px] text-neutral-800 outline-none focus:border-neutral-500"
                style={{
                  fontFamily: `var(${
                    FONT_STYLES.find((f) => f.id === fontId)?.cssVar ?? "--font-heading"
                  })`,
                }}
              >
                {FONT_STYLES.map((f) => (
                  <option key={f.id} value={f.id} style={{ fontFamily: `var(${f.cssVar})` }}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-3">
              <p className="block text-[13px] font-medium" style={{ color: MAROON }}>
                Symbol Selections
              </p>
              {/* Scroll wheel rather than a dropdown — spin it up or down and
                  whichever row lands in the bar is the choice. */}
              <SymbolWheel value={symbolId} onChange={setSymbolId} />
            </div>

            {/* Which side of the name the symbol sits on. Hidden while no
                symbol is chosen — there is nothing to place. */}
            {symbolId !== "none" ? (
              <fieldset className="mt-3">
                <legend className="text-[13px] font-medium" style={{ color: MAROON }}>
                  Symbol Direction
                </legend>
                <div className="mt-1.5 flex items-center gap-5">
                  {[
                    { value: "left", label: "Left side" },
                    { value: "right", label: "Right side" },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className="flex items-center gap-2 text-[13px] text-neutral-700"
                    >
                      <input
                        type="radio"
                        name="symbol-side"
                        value={opt.value}
                        checked={symbolSide === opt.value}
                        onChange={(e) => setSymbolSide(e.target.value)}
                        className="h-3.5 w-3.5 accent-[#7B1E2B]"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </fieldset>
            ) : null}
          </>
        ) : null}

        {/* WhatsApp assist + Add to cart */}
        <div className="mt-5 flex flex-wrap items-start gap-4">
          <div className="rounded border border-[#BFE9CC] bg-[#EAF9EF] p-3">
            <p className="flex items-center gap-1.5 text-[12px] font-medium" style={{ color: "#128C4A" }}>
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                <path d="M12 2.8a9.1 9.1 0 0 0-7.8 13.8L2.9 21.3l4.9-1.3A9.1 9.1 0 1 0 12 2.8Z" />
              </svg>
              Whatsapp
            </p>
            <p className="mt-1 text-[11px] leading-tight text-neutral-600">
              Get Whatsapp Assistance -<br />
              Chat with us
            </p>
            <button
              type="button"
              className="mt-2 rounded px-3 py-1.5 text-[11px] font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: WHATSAPP }}
            >
              Chat with Us
            </button>
          </div>

          <div>
            <button
              type="button"
              onClick={onAddToCart}
              className="rounded px-6 py-2.5 text-[13px] font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: MAROON }}
            >
              Add to Cart
            </button>

            <label htmlFor="qty" className="mt-3 block text-[12px] text-neutral-700">
              Quantity
            </label>
            {/* The browser's own spinner only paints on hover in Chrome, and
                behaves differently again in Firefox and Safari, so it is
                switched off and replaced with arrows of our own that are always
                on screen. Typing still works. */}
            <div className="mt-1 flex w-24 items-stretch overflow-hidden rounded border border-neutral-300 bg-white focus-within:border-[#7B1E2B]">
              <input
                id="qty"
                type="number"
                min={1}
                max={product.maxQty}
                value={qty}
                // Clamped at both ends. The previous version only capped the top,
                // so a typed "-5" went straight through as -5.
                onChange={(e) =>
                  setQty(
                    Math.min(Math.max(1, Number(e.target.value) || 1), product.maxQty)
                  )
                }
                // The number had no colour of its own, so it inherited the pale
                // grey from the surrounding text and read as disabled.
                className="min-w-0 flex-1 bg-transparent py-2 pl-3 text-center text-[15px] font-semibold text-neutral-900 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />

              <span className="flex w-6 shrink-0 flex-col border-l border-neutral-200">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(q + 1, product.maxQty))}
                  disabled={qty >= product.maxQty}
                  aria-label="Increase quantity"
                  className="flex flex-1 items-center justify-center transition-colors hover:bg-[#FDF0F2] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke={MAROON} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m6 15 6-6 6 6" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(q - 1, 1))}
                  disabled={qty <= 1}
                  aria-label="Decrease quantity"
                  className="flex flex-1 items-center justify-center border-t border-neutral-200 transition-colors hover:bg-[#FDF0F2] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke={MAROON} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
              </span>
            </div>
          </div>
        </div>

        {/* Assurance row */}
        <div className="mt-6 flex flex-wrap items-center gap-6">
          <div className="flex flex-col items-center gap-1 text-center">
            <span className="font-[family-name:var(--font-heading)] text-[20px]" style={{ color: MAROON }}>
              100%
            </span>
            <span className="text-[12px] text-neutral-700">Genuine Jewellery</span>
          </div>

          <div className="flex flex-col items-center gap-1 text-center">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" style={{ color: MAROON }} aria-hidden="true">
              {/* Lid, box, ribbon and a bow of two loops sitting on top — the
                  previous bow was merged into the lid and read as a blob. */}
              <rect x="3.6" y="9.9" width="16.8" height="3.3" rx="0.7" />
              <path d="M5.1 13.2v6a1 1 0 0 0 1 1h11.8a1 1 0 0 0 1-1v-6" />
              <path d="M12 9.9v10.3" />
              <path d="M12 9.9C10.7 7.6 9.5 6.7 8.4 7.2c-1 .5-.7 2.4 3.6 2.7Z" />
              <path d="M12 9.9c1.3-2.3 2.5-3.2 3.6-2.7 1 .5.7 2.4-3.6 2.7Z" />
            </svg>
            <span className="text-[12px] text-neutral-700">Precious Gifting</span>
          </div>
        </div>

        <label className="mt-4 flex items-center gap-2 text-[12px] text-neutral-700">
          <input type="checkbox" checked={giftWrap} onChange={(e) => setGiftWrap(e.target.checked)} className="h-3.5 w-3.5" />
          Gift Packaging (Free)
        </label>

        <Accordion sections={product.sections} description={product.description} />
      </div>
    </div>

    {/* Full width below the product grid — it needs the room, and it is the
        same on every product, so it reads as page content rather than as one
        more thing to click through. */}
    <CareGuide />

    {/* Portalled to <body> so the overlay is measured against the viewport and
        not against any transformed ancestor on the page. */}
    {mounted && added
      ? createPortal(
          <SuccessModal
            isOpen
            message={
              qty > 1
                ? `${qty} × ${product.title} have been added to your cart.`
                : `${product.title} has been added to your cart.`
            }
            onClose={() => setAdded(false)}
          />,
          document.body
        )
      : null}
    </>
  );
}
