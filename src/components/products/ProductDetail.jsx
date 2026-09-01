"use client";

import { useState } from "react";
import Image from "next/image";
import RingSizeGuide from "@/components/products/RingSizeGuide";
import CareGuide from "@/components/products/CareGuide";

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

function Gallery({ product }) {
  const [active, setActive] = useState(0);
  // The product shot first, then the workshop images shot for its category.
  // Padded to four so the thumbnail row keeps its shape on sparse categories.
  const shots = [...(product.gallery ?? [product.image])];
  while (shots.length < 4) shots.push(null);

  return (
    <div>
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-neutral-100">
        {shots[active] ? (
          <Image src={shots[active]} alt={product.title} fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" priority />
        ) : (
          <Placeholder label={product.title} />
        )}
      </div>

      <div className="mt-3 flex gap-2">
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
              <Image src={shot} alt="" fill sizes="64px" className="object-cover" />
            ) : (
              <span className="block h-full w-full bg-gradient-to-br from-[#EDE3D3] to-[#D8C6A8]" />
            )}
          </button>
        ))}
      </div>

      {/* Trust badges under the gallery */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        {[
          { id: "delivery", label: "Delivery in 10 Days", icon: <><path d="M2.5 6.5h10v9h-10zM12.5 10h4l3 3v2.5h-7z" /><circle cx="6.5" cy="17.5" r="1.7" /><circle cx="16" cy="17.5" r="1.7" /></> },
          { id: "safe", label: "Safe to Use", icon: <><path d="M12 3.5 19 6v6c0 4.2-2.9 7.5-7 8.5-4.1-1-7-4.3-7-8.5V6l7-2.5Z" /><path d="M9.2 12.2 11.4 14.4 15.7 10" /></> },
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

export default function ProductDetail({ product }) {
  const [size, setSize] = useState(product.sizes?.[2] ?? "");
  const [qty, setQty] = useState(1);
  const [intl, setIntl] = useState(false);
  const [giftWrap, setGiftWrap] = useState(false);

  const discount =
    product.mrp && product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  return (
    <>
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
      <Gallery product={product} />

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
          Product Code : <span className="text-neutral-700">#{product.productCode}</span>
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
          <button type="button" className="mt-1.5 inline-flex items-center gap-1 text-[12px] text-neutral-600 hover:text-neutral-900">
            Size Chart
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>
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
              className="rounded px-6 py-2.5 text-[13px] font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: MAROON }}
            >
              Add to Cart
            </button>

            <label htmlFor="qty" className="mt-3 block text-[12px] text-neutral-700">
              Quantity
            </label>
            <input
              id="qty"
              type="number"
              min={1}
              max={product.maxQty}
              value={qty}
              onChange={(e) => setQty(Math.min(Number(e.target.value) || 1, product.maxQty))}
              className="mt-1 w-20 rounded border border-neutral-300 px-2 py-1.5 text-[13px] outline-none focus:border-neutral-500"
            />
            <p className="mt-1 text-[10px] text-neutral-500">*Maximum allowed qty {product.maxQty}</p>
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
              <rect x="4" y="10" width="16" height="9" rx="1.5" />
              <path d="M4 13.5h16M12 10v9" />
              <path d="M12 10c-1.6-3-3-4-4.4-3.4C6.4 7.1 6.8 9.4 12 10Zm0 0c1.6-3 3-4 4.4-3.4 1.2.5.8 2.8-4.4 3.4Z" />
            </svg>
            <span className="text-[12px] text-neutral-700">Precious Gifting</span>
          </div>

          <label className="flex items-center gap-2 text-[12px] text-neutral-700">
            <input type="checkbox" checked={intl} onChange={(e) => setIntl(e.target.checked)} className="h-3.5 w-3.5" />
            For international shipment
          </label>
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
    </>
  );
}
