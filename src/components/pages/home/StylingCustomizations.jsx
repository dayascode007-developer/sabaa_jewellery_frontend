const MAROON = "#7B1E2B";

export default function StylingCustomizations() {
  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 py-8 text-center sm:px-6">
      <h2 className="font-[family-name:var(--font-heading)] text-[28px] leading-tight text-neutral-800 sm:text-[32px]">
        Styling 101 With{" "}
        <span style={{ color: MAROON }}>Customizations</span>
      </h2>
      <p className="mt-1 font-[family-name:var(--font-heading)] text-[15px] text-neutral-500">
        Trendsetting jewellery suited for every occasion
      </p>
    </section>
  );
}
