import SiteHeader from "@/components/layout/SiteHeader";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import { CARE_INTRO, CARE_SECTIONS, CARE_NOTE } from "@/constants/careData";
import { SUPPORT_EMAIL, SUPPORT_WHATSAPP } from "@/constants/aboutData";

const MAROON = "#7B1E2B";
const GOLD = "#C9A227";

export const metadata = {
  title: "Jewel Polish & Care — Sabaa Jewel Arts",
  description:
    "How to care for Panchaloga rings, Impon chains and engraved pieces — tarnish, repolishing with vibhuti powder, and everyday habits.",
};

export default function JewelCarePage() {
  return (
    <>
      <SiteHeader />

      <main className="w-full bg-gradient-to-b from-[#FDF1EC] via-[#FDF8F5] to-white">
        <div className="mx-auto w-full max-w-[900px] px-4 py-10 sm:px-6">
          <header className="text-center">
            <p
              className="text-[11px] font-medium tracking-[0.18em] uppercase"
              style={{ color: MAROON }}
            >
              Jewel Polish &amp; Care
            </p>
            <h1
              className="mt-1 font-[family-name:var(--font-heading)] text-[26px] leading-tight sm:text-[32px] lg:text-[38px]"
              style={{ color: MAROON }}
            >
              Caring for Your Panchalogam
            </h1>
            <p className="mx-auto mt-3 max-w-[620px] text-[15px] leading-relaxed text-neutral-600">
              {CARE_INTRO}
            </p>
          </header>

          <div className="mt-9 space-y-5">
            {CARE_SECTIONS.map((section) => (
              <section
                key={section.id}
                className="rounded-xl border border-[#EFE2DA] bg-white p-5 sm:p-6"
              >
                <h2
                  className="text-[17px] font-semibold sm:text-[18px]"
                  style={{ color: MAROON }}
                >
                  {section.heading}
                </h2>
                <p className="mt-1.5 text-[14px] leading-relaxed text-neutral-600">
                  {section.intro}
                </p>
                <ul className="mt-3 space-y-2">
                  {section.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-2.5 text-[14px] leading-relaxed text-neutral-700"
                    >
                      {/* A small diamond rather than a bullet, matching the
                          rules used elsewhere on the site. */}
                      <span
                        aria-hidden="true"
                        className="mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45"
                        style={{ backgroundColor: GOLD }}
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          {/* Set apart deliberately: customers who assume Panchalogam is gold
              treat it like gold, and then ask why it darkened. */}
          <p className="mt-6 rounded-xl border border-[#EFE2DA] bg-[#FDF8F5] p-5 text-[14px] leading-relaxed text-neutral-700">
            {CARE_NOTE}
          </p>

          <section className="mt-6 rounded-xl border border-[#EFE2DA] bg-white p-5 text-center sm:p-6">
            <h2 className="text-[16px] font-semibold" style={{ color: MAROON }}>
              Not sure about your piece?
            </h2>
            <p className="mt-1.5 text-[14px] leading-relaxed text-neutral-600">
              Send us a photo and we will tell you what it needs — and whether it
              needs anything at all.
            </p>
            <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={`https://wa.me/91${SUPPORT_WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-medium text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#25D366" }}
              >
                WhatsApp {SUPPORT_WHATSAPP}
              </a>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="inline-flex items-center gap-2 rounded-full border-2 px-5 py-2.5 text-[14px] font-medium transition-opacity hover:opacity-70"
                style={{ borderColor: MAROON, color: MAROON }}
              >
                {SUPPORT_EMAIL}
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </>
  );
}
