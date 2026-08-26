export default function SectionTitle({ title, subtitle }) {
  return (
    <div className="text-center">
      <h2
        className="font-[family-name:var(--font-heading)] text-[26px] leading-tight sm:text-[32px] lg:text-[40px]"
        style={{ color: "#7B1E2B" }}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-1 font-[family-name:var(--font-heading)] text-[15px] leading-tight tracking-[0.06em] text-neutral-600 uppercase sm:text-[19px] lg:text-[24px]">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
