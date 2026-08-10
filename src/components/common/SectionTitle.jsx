export default function SectionTitle({ title, subtitle }) {
  return (
    <div className="text-center">
      <h2 className="font-[family-name:var(--font-heading)] text-[40px] leading-tight text-neutral-800">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-1 font-[family-name:var(--font-heading)] text-[24px] leading-tight tracking-[0.06em] text-neutral-600 uppercase">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
