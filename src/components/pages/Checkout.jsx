"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectCartItems } from "@/store/slices/cartSlice";

const MAROON = "#7B1E2B";
const GOLD = "#C9A227";
const GREEN = "#1E7A45";

const rupees = (n) =>
  "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Flat rate for now. When the order API exists this comes back from the server
// along with the tax and any coupon.
const DELIVERY = 200;
const FREE_DELIVERY_ABOVE = 999;

const STEPS = ["Address", "Payment", "Confirm order"];

// Saved addresses are kept in the browser while this is still the static UI, so
// they survive a reload. When the address API exists, delete this and read the
// list from the server — the shape is the same.
const ADDRESS_STORE = "sabaa.checkout.addresses";

/* ------------------------------------------------------------------ stepper */

function Stepper({ current }) {
  return (
    <ol className="flex items-start">
      {STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={label} className="flex flex-1 items-start last:flex-none">
            <div className="flex shrink-0 flex-col items-center gap-1.5">
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full border-2 transition-colors"
                style={{
                  borderColor: done || active ? MAROON : "#D8CFC6",
                  backgroundColor: done ? MAROON : "transparent",
                }}
                aria-hidden="true"
              >
                {done ? (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12.5 4.5 4.5L19 7.5" />
                  </svg>
                ) : (
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: active ? MAROON : "#D8CFC6" }}
                  />
                )}
              </span>
              <span
                className="text-center text-[11px] leading-tight whitespace-nowrap sm:text-[13px]"
                style={{ color: done || active ? MAROON : "#9C9086" }}
              >
                {label}
              </span>
            </div>

            {/* Connector. Not after the last step. */}
            {i < STEPS.length - 1 ? (
              <span
                className="mt-3.5 h-px flex-1 transition-colors"
                style={{ backgroundColor: i < current ? MAROON : "#E0D6CC" }}
                aria-hidden="true"
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

/* ------------------------------------------------------------------- pieces */

function Card({ title, children }) {
  return (
    <section className="rounded-lg border border-[#EFDCD4] bg-white p-4 sm:p-5">
      <h2
        className="font-[family-name:var(--font-heading)] text-[19px] leading-none"
        style={{ color: MAROON }}
      >
        {title}
      </h2>
      <div className="mt-2 flex items-center gap-2">
        <span className="h-px w-10 bg-[#E0CDBA]" />
        <span className="text-[9px]" style={{ color: MAROON }} aria-hidden="true">
          &#10050;
        </span>
        <span className="h-px flex-1 bg-[#E0CDBA]" />
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Field({ label, name, value, onChange, type = "text", maxLength, inputMode, className = "" }) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1 block text-[12px] text-neutral-600">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        inputMode={inputMode}
        className="w-full rounded-md border border-neutral-300 px-3 py-2.5 text-[14px] text-neutral-800 outline-none transition-colors focus:border-[#7B1E2B]"
      />
    </div>
  );
}

const EMPTY_ADDRESS = {
  name: "",
  mobile: "",
  pincode: "",
  house: "",
  area: "",
  landmark: "",
  city: "",
  state: "",
};

/* ------------------------------------------------------------ payment icons */

const PAY_ICON = {
  online: (
    <>
      <path d="M12 3 5 12l7 9 7-9-7-9Z" />
      <path d="M12 8.5 8.5 12l3.5 3.5L15.5 12 12 8.5Z" />
    </>
  ),
  cod: (
    <>
      <rect x="2.5" y="6.5" width="19" height="11" rx="1.6" />
      <circle cx="12" cy="12" r="2.6" />
      <path d="M6 10v4M18 10v4" />
    </>
  ),
};

// Two ways to pay, each with its own action button — no radio buttons, so one
// tap chooses the method and moves on rather than needing a second click.
const PAYMENT_METHODS = [
  {
    id: "online",
    label: "Online payment",
    note: "UPI, Google Pay, PhonePe, Paytm, card or net banking",
    icon: "online",
    action: "Pay now",
  },
  {
    id: "cod",
    label: "Cash on Delivery",
    note: "Pay the courier when the piece reaches you",
    icon: "cod",
    action: "Place your order",
  },
];

/* ----------------------------------------------------------------- checkout */

export default function Checkout() {
  const items = useSelector(selectCartItems);

  const [step, setStep] = useState(0);

  // The address step opens as a list of saved addresses, the way the reference
  // does — the form only appears behind "Add New". Static for now: the list
  // starts empty and lives in memory, so it resets on reload. When the address
  // API exists this array comes from the server instead.
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [addingAddress, setAddingAddress] = useState(false);

  const [address, setAddress] = useState(EMPTY_ADDRESS);
  const [addressType, setAddressType] = useState("home");
  const [method, setMethod] = useState("online");
  const [placed, setPlaced] = useState(false);

  // Read after mount, never during render: the server has no localStorage, and
  // seeding state from it directly would make the first client paint disagree
  // with the server's HTML.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(ADDRESS_STORE) ?? "null");
      if (Array.isArray(saved?.addresses)) setAddresses(saved.addresses);
      if (saved?.selectedAddressId) setSelectedAddressId(saved.selectedAddressId);
    } catch {
      // Private mode, cleared storage, or a value from an older shape — start
      // empty rather than breaking the page.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    // Guarded: without this the empty initial state would overwrite the saved
    // list on the very first render, before the read above has run.
    if (!hydrated) return;
    try {
      localStorage.setItem(
        ADDRESS_STORE,
        JSON.stringify({ addresses, selectedAddressId })
      );
    } catch {
      // Storage full or blocked — the addresses simply do not persist.
    }
  }, [hydrated, addresses, selectedAddressId]);

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId) ?? null;

  const saveAddress = () => {
    const saved = { ...address, type: addressType, id: Date.now() };
    setAddresses((list) => [...list, saved]);
    // A freshly added address is the one you meant to use.
    setSelectedAddressId(saved.id);
    setAddress(EMPTY_ADDRESS);
    setAddressType("home");
    setAddingAddress(false);
  };

  const setField = (e) =>
    setAddress((a) => ({
      ...a,
      // Digits only in the two numeric fields, so a stray letter cannot reach
      // the courier's system later.
      [e.target.name]:
        e.target.name === "mobile" || e.target.name === "pincode"
          ? e.target.value.replace(/\D/g, "")
          : e.target.value,
    }));

  const itemCount = items.reduce((n, i) => n + i.quantity, 0);
  const itemsTotal = items.reduce((t, i) => t + i.price * i.quantity, 0);
  const freeDelivery = itemsTotal >= FREE_DELIVERY_ABOVE;
  const orderTotal = itemsTotal + (freeDelivery ? 0 : DELIVERY);

  // Enough to move on, not a full validation pass — the server has to check
  // again anyway, and the real rules arrive with the order API.
  const addressReady =
    address.name.trim() &&
    /^[6-9]\d{9}$/.test(address.mobile) &&
    /^\d{6}$/.test(address.pincode) &&
    address.house.trim() &&
    address.area.trim() &&
    address.city.trim() &&
    address.state.trim();

  if (items.length === 0 && !placed) {
    return (
      <main className="mx-auto w-full max-w-[1400px] px-4 py-16 text-center sm:px-6">
        <h1
          className="font-[family-name:var(--font-heading)] text-[26px] leading-tight sm:text-[32px]"
          style={{ color: MAROON }}
        >
          There is nothing to check out
        </h1>
        <p className="mt-2 text-[15px] text-neutral-600">
          Add a piece to your cart and it will appear here.
        </p>
        <Link
          href="/category/all-jewellery"
          className="mt-6 inline-block rounded-md px-6 py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: MAROON }}
        >
          Start shopping
        </Link>
      </main>
    );
  }

  if (placed) {
    return (
      <main className="mx-auto w-full max-w-[560px] px-4 py-16 text-center sm:px-6">
        <span
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white"
          style={{ boxShadow: `0 0 0 2px ${GOLD}` }}
        >
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke={MAROON} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m5 12.5 4.5 4.5L19 7.5" />
          </svg>
        </span>
        <h1
          className="mt-4 font-[family-name:var(--font-heading)] text-[28px] leading-tight sm:text-[34px]"
          style={{ color: MAROON }}
        >
          Thank you for your order
        </h1>
        <div className="mt-2 flex items-center justify-center gap-2">
          <span className="h-px w-12 bg-[#E0CDBA]" />
          <span className="text-[10px]" style={{ color: MAROON }} aria-hidden="true">&#10050;</span>
          <span className="h-px w-12 bg-[#E0CDBA]" />
        </div>
        <p className="mt-3 text-[15px] leading-relaxed text-neutral-600">
          We will send the confirmation to{" "}
          <span className="font-medium text-neutral-800">{selectedAddress?.mobile}</span> and
          begin work on your piece.
        </p>
        {/* Nothing has been charged — this screen is the UI only, until the
            order and payment APIs exist. */}
        <p className="mt-2 text-[12px] text-neutral-400">
          Demo screen — no payment has been taken and no order was recorded.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-md px-6 py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: MAROON }}
        >
          Continue shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6">
      <h1
        className="font-[family-name:var(--font-heading)] text-[26px] leading-tight sm:text-[32px]"
        style={{ color: MAROON }}
      >
        Place Your Order
      </h1>

      <div className="mt-5 rounded-lg border border-[#EFDCD4] bg-[#FDF8F3] px-4 py-4 sm:px-8">
        <Stepper current={step} />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_340px]">
        <div className="space-y-5">
          {/* ---------------------------------------------------- 1. address */}
          {step === 0 && !addingAddress ? (
            <Card title="Saved Addresses">
              {/* Add New sits above the list, as in the reference. */}
              <button
                type="button"
                onClick={() => setAddingAddress(true)}
                className="flex w-full items-center gap-2 rounded-lg bg-[#FDF0F2] px-4 py-3.5 text-left transition-opacity hover:opacity-90"
                style={{ color: MAROON }}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                <span className="flex-1 text-[15px] font-medium">Add New</span>
                <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m9 5 7 7-7 7" />
                </svg>
              </button>

              {addresses.length === 0 ? (
                <div className="pt-8 pb-4 text-center">
                  <p className="mx-auto inline-block rounded-md bg-[#F6F2EE] px-5 py-2.5 text-[15px] text-neutral-600">
                    You do not have any saved address
                  </p>

                  {/* A house with a question mark, drawn rather than an image
                      file so it takes the page's own colours. */}
                  <svg
                    viewBox="0 0 200 150"
                    className="mx-auto mt-6 h-28 w-auto"
                    fill="none"
                    aria-hidden="true"
                  >
                    <ellipse cx="100" cy="128" rx="58" ry="9" fill="#EDE7E1" />
                    <path d="M56 72 100 38l44 34v50H56V72Z" fill="#fff" stroke="#DCD3CB" strokeWidth="4" strokeLinejoin="round" />
                    <path d="M48 76 100 34l52 42" stroke="#DCD3CB" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="122" y="44" width="12" height="22" rx="2" fill="#fff" stroke="#DCD3CB" strokeWidth="4" />
                    <rect x="88" y="92" width="24" height="30" rx="1.5" fill="#F6F2EE" stroke="#DCD3CB" strokeWidth="4" />
                    <rect x="70" y="86" width="14" height="14" rx="1.5" stroke="#DCD3CB" strokeWidth="4" />
                    <path
                      d="M158 34c0-5 4-8 8-8s8 3 8 8c0 5-8 5-8 11"
                      stroke="#C9BFB6"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                    <circle cx="166" cy="58" r="3" fill="#C9BFB6" />
                    <path
                      d="M142 20c0-3.5 2.8-5.5 5.5-5.5s5.5 2 5.5 5.5-5.5 3.5-5.5 7.5"
                      stroke="#D8CFC7"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <circle cx="147.5" cy="36" r="2.2" fill="#D8CFC7" />
                  </svg>
                </div>
              ) : (
                <ul className="mt-3 space-y-2.5">
                  {addresses.map((a) => {
                    const selected = a.id === selectedAddressId;
                    return (
                      <li key={a.id}>
                        <label
                          className="flex cursor-pointer items-start gap-3 rounded-lg border p-3.5 transition-colors"
                          style={
                            selected
                              ? { borderColor: MAROON, backgroundColor: "#FDF0F2" }
                              : { borderColor: "#E5DDD5" }
                          }
                        >
                          <input
                            type="radio"
                            name="address"
                            checked={selected}
                            onChange={() => setSelectedAddressId(a.id)}
                            className="mt-0.5 h-4 w-4 shrink-0 accent-[#7B1E2B]"
                          />
                          <span className="min-w-0 flex-1">
                            <span className="flex flex-wrap items-center gap-2">
                              <span className="text-[14px] font-medium text-neutral-900">
                                {a.name}
                              </span>
                              <span
                                className="rounded-full px-2 py-0.5 text-[10px] tracking-wide uppercase"
                                style={{ backgroundColor: "#FDF0F2", color: MAROON }}
                              >
                                {a.type}
                              </span>
                            </span>
                            <span className="mt-1 block text-[13px] leading-relaxed text-neutral-600">
                              {a.house}, {a.area}
                              {a.landmark ? `, ${a.landmark}` : ""}
                              <br />
                              {a.city}, {a.state} — {a.pincode}
                              <br />
                              Mobile: {a.mobile}
                            </span>
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              )}
            </Card>
          ) : null}

          {step === 0 && addingAddress ? (
            <Card title="Add New Address">
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <Field label="Full name" name="name" value={address.name} onChange={setField} />
                <Field
                  label="Mobile number"
                  name="mobile"
                  value={address.mobile}
                  onChange={setField}
                  inputMode="numeric"
                  maxLength={10}
                />
                <Field
                  label="Pincode"
                  name="pincode"
                  value={address.pincode}
                  onChange={setField}
                  inputMode="numeric"
                  maxLength={6}
                />
                <Field label="Town / City" name="city" value={address.city} onChange={setField} />
                <Field
                  label="Flat, house no., building"
                  name="house"
                  value={address.house}
                  onChange={setField}
                  className="sm:col-span-2"
                />
                <Field
                  label="Area, street, village"
                  name="area"
                  value={address.area}
                  onChange={setField}
                  className="sm:col-span-2"
                />
                <Field label="Landmark (optional)" name="landmark" value={address.landmark} onChange={setField} />
                <Field label="State" name="state" value={address.state} onChange={setField} />
              </div>

              <fieldset className="mt-4">
                <legend className="mb-2 text-[12px] text-neutral-600">Address type</legend>
                <div className="flex gap-2.5">
                  {["home", "work"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setAddressType(t)}
                      className="rounded-full border px-4 py-1.5 text-[13px] capitalize transition-colors"
                      style={
                        addressType === t
                          ? { borderColor: MAROON, backgroundColor: "#FDF0F2", color: MAROON }
                          : { borderColor: "#DDD3CA", color: "#6B6B6B" }
                      }
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </fieldset>
            </Card>
          ) : null}

          {/* ---------------------------------------------------- 2. payment */}
          {step === 1 ? (
            <Card title="Payment Method">
              <div className="space-y-3">
                {PAYMENT_METHODS.map((m) => (
                  <div
                    key={m.id}
                    className="rounded-lg border p-3.5 transition-colors sm:flex sm:items-center sm:gap-4"
                    style={{ borderColor: "#E5DDD5" }}
                  >
                    <div className="flex min-w-0 flex-1 items-start gap-3">
                      <svg
                        viewBox="0 0 24 24"
                        className="mt-0.5 h-5 w-5 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ color: MAROON }}
                        aria-hidden="true"
                      >
                        {PAY_ICON[m.icon]}
                      </svg>
                      <div className="min-w-0">
                        <p className="text-[14px] font-medium text-neutral-800">{m.label}</p>
                        <p className="mt-0.5 text-[12px] leading-snug text-neutral-500">
                          {m.note}
                        </p>
                      </div>
                    </div>

                    {/* The button is the choice — picking a method and
                        continuing are one action, not two. */}
                    <button
                      type="button"
                      onClick={() => {
                        setMethod(m.id);
                        setStep(2);
                      }}
                      className="mt-3 w-full shrink-0 rounded-md px-6 py-2.5 text-[14px] font-medium text-white transition-opacity hover:opacity-90 sm:mt-0 sm:w-auto"
                      style={{ backgroundColor: MAROON }}
                    >
                      {m.action}
                    </button>
                  </div>
                ))}
              </div>

              <p className="mt-4 flex items-start gap-2 rounded-md bg-[#FDF8F3] p-3 text-[12px] leading-relaxed text-neutral-600">
                <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0" fill="none" stroke={MAROON} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3.5 19 6v6c0 4.2-2.9 7.5-7 8.5-4.1-1-7-4.3-7-8.5V6l7-2.5Z" />
                  <path d="M9.2 12.2 11.4 14.4 15.7 10" />
                </svg>
                Your card details never reach our servers. Payments are handled by
                Razorpay, an RBI-authorised payment gateway.
              </p>
            </Card>
          ) : null}

          {/* ---------------------------------------------------- 3. confirm */}
          {step === 2 ? (
            <>
              <Card title="Review Your Order">
                <ul className="divide-y divide-neutral-100">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-3 py-3 first:pt-0 last:pb-0">
                      <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded bg-neutral-100">
                        {item.image ? (
                          typeof item.image === "string" && item.image.startsWith("http") ? (
                            <img src={item.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
                          ) : (
                            <Image src={item.image} alt="" fill sizes="64px" className="object-cover" />
                          )
                        ) : (
                          <span className="block h-full w-full bg-gradient-to-br from-[#EDE3D3] to-[#D8C6A8]" />
                        )}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block text-[14px] leading-snug text-neutral-900">
                          {item.title}
                        </span>
                        <span className="mt-0.5 block text-[12px] text-neutral-500">
                          Qty {item.quantity}
                          {item.size ? ` • Ring Size: ${item.size}` : ""}
                          {item.ringName ? ` • Name: ${item.ringName}` : ""}
                        </span>
                      </span>

                      <span className="shrink-0 text-[14px] font-semibold text-neutral-900">
                        {rupees(item.price * item.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card title="Delivering To">
                <p className="text-[14px] leading-relaxed text-neutral-700">
                  <span className="font-medium text-neutral-900">{selectedAddress?.name}</span>
                  <br />
                  {selectedAddress?.house}, {selectedAddress?.area}
                  {selectedAddress?.landmark ? `, ${selectedAddress.landmark}` : ""}
                  <br />
                  {selectedAddress?.city}, {selectedAddress?.state} — {selectedAddress?.pincode}
                  <br />
                  <span className="text-neutral-500">Mobile: {selectedAddress?.mobile}</span>
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setAddingAddress(false);
                    setStep(0);
                  }}
                  className="mt-3 text-[13px] underline underline-offset-2"
                  style={{ color: MAROON, textDecorationColor: GOLD }}
                >
                  Change address
                </button>
              </Card>

              <Card title="Paying With">
                <p className="text-[14px] text-neutral-700">
                  {PAYMENT_METHODS.find((m) => m.id === method)?.label}
                </p>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="mt-3 text-[13px] underline underline-offset-2"
                  style={{ color: MAROON, textDecorationColor: GOLD }}
                >
                  Change payment method
                </button>
              </Card>
            </>
          ) : null}

          {/* ------------------------------------------------------- footer */}
          <div className="flex items-center justify-between gap-3">
            {step === 0 && addingAddress ? (
              <button
                type="button"
                onClick={() => setAddingAddress(false)}
                className="flex items-center gap-1.5 text-[14px] text-neutral-600 transition-colors hover:text-neutral-900"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 5l-7 7 7 7" />
                </svg>
                Cancel
              </button>
            ) : step > 0 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="flex items-center gap-1.5 text-[14px] text-neutral-600 transition-colors hover:text-neutral-900"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 5l-7 7 7 7" />
                </svg>
                Back
              </button>
            ) : (
              <Link
                href="/cart"
                className="flex items-center gap-1.5 text-[14px] text-neutral-600 transition-colors hover:text-neutral-900"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 5l-7 7 7 7" />
                </svg>
                Back to cart
              </Link>
            )}

            {/* On the form it saves; on the list it moves to payment. */}
            {step === 0 && addingAddress ? (
              <button
                type="button"
                disabled={!addressReady}
                onClick={saveAddress}
                className="rounded-md px-7 py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed"
                style={{ backgroundColor: addressReady ? MAROON : "#CFA9B0" }}
              >
                Save address
              </button>
            ) : step === 0 ? (
              <button
                type="button"
                disabled={!selectedAddress}
                onClick={() => setStep(1)}
                className="rounded-md px-7 py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed"
                style={{ backgroundColor: selectedAddress ? MAROON : "#CFA9B0" }}
              >
                Deliver to this address
              </button>
            ) : null}
            {/* No button on the payment step — each method card carries its own
                action, so a second one here would be a duplicate. */}
          </div>
        </div>

        {/* ------------------------------------------------------- summary */}
        <div className="lg:sticky lg:top-4 lg:self-start">
          <div className="rounded-lg border border-[#EFDCD4] bg-white p-4">
            <h2
              className="font-[family-name:var(--font-heading)] text-[20px] leading-none"
              style={{ color: MAROON }}
            >
              Order Summary
            </h2>

            <div className="mt-4 space-y-2.5 border-b border-neutral-200 pb-4 text-[13px]">
              <div className="flex justify-between gap-4">
                <span className="text-neutral-600">Items ({itemCount})</span>
                <span className="text-neutral-800">{rupees(itemsTotal)}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-neutral-600">Delivery</span>
                <span className="text-neutral-800">{rupees(DELIVERY)}</span>
              </div>
              {freeDelivery ? (
                <div className="flex justify-between gap-4">
                  <span style={{ color: GREEN }}>FREE Delivery</span>
                  <span style={{ color: GREEN }}>−{rupees(DELIVERY)}</span>
                </div>
              ) : null}
            </div>

            <div className="mt-4 flex items-baseline justify-between gap-4">
              <span
                className="font-[family-name:var(--font-heading)] text-[17px]"
                style={{ color: MAROON }}
              >
                Order Total
              </span>
              <span className="text-[20px] font-semibold text-neutral-900">
                {rupees(orderTotal)}
              </span>
            </div>

            {!freeDelivery ? (
              <p className="mt-1.5 text-[12px]" style={{ color: GREEN }}>
                Add {rupees(FREE_DELIVERY_ABOVE - itemsTotal)} more for free delivery.
              </p>
            ) : null}

            {/* Only on the last step, like the reference — you cannot place an
                order before you have said where it goes. */}
            {step === 2 ? (
              <>
                <button
                  type="button"
                  onClick={() => setPlaced(true)}
                  className="mt-4 w-full rounded-md py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: MAROON }}
                >
                  Place Your Order
                </button>
                <p className="mt-2.5 text-center text-[11px] leading-relaxed text-neutral-500">
                  By placing your order, you agree to Sabaa&apos;s{" "}
                  <Link href="/policy#privacy" className="underline underline-offset-2" style={{ color: MAROON }}>
                    privacy notice
                  </Link>{" "}
                  and{" "}
                  <Link href="/policy#terms" className="underline underline-offset-2" style={{ color: MAROON }}>
                    conditions of use
                  </Link>
                  .
                </p>
              </>
            ) : (
              <p className="mt-4 flex items-center justify-center gap-1.5 text-[12px] text-neutral-500">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3.5 19 6v6c0 4.2-2.9 7.5-7 8.5-4.1-1-7-4.3-7-8.5V6l7-2.5Z" />
                  <path d="M9.2 12.2 11.4 14.4 15.7 10" />
                </svg>
                100% Secure Checkout
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
