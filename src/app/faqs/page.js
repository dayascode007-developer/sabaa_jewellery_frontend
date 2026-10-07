import SiteHeader from "@/components/layout/SiteHeader";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import FaqAccordion from "@/components/pages/about/FaqAccordion";
import { SUPPORT_EMAIL, SUPPORT_WHATSAPP } from "@/constants/aboutData";

const MAROON = "#7B1E2B";

export const metadata = {
  title: "Help & FAQs — Sabaa Jewel Arts",
  description:
    "Answers about Panchaloga metal, customised engraving, ring sizing, delivery times, care and returns.",
};

export default function FaqsPage() {
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
              Help &amp; FAQs
            </p>
            <h1
              className="mt-1 font-[family-name:var(--font-heading)] text-[26px] leading-tight sm:text-[32px] lg:text-[38px]"
              style={{ color: MAROON }}
            >
              Frequently Asked Questions
            </h1>
            <p className="mx-auto mt-2 max-w-[560px] text-[15px] leading-relaxed text-neutral-600">
              Panchaloga, customised engraving, sizing, delivery and care — the
              questions customers ask us most.
            </p>
          </header>

          {/* The same accordion the About page uses, so one FAQ list serves
              both and the two can never drift apart. */}
          <div className="mt-8">
            <FaqAccordion />
          </div>

          <section className="mt-10 rounded-xl border border-[#EFE2DA] bg-white p-5 text-center sm:p-6">
            <h2 className="text-[16px] font-semibold" style={{ color: MAROON }}>
              Still have a question?
            </h2>
            <p className="mt-1.5 text-[14px] leading-relaxed text-neutral-600">
              Message us before you order — especially about sizing or engraving,
              which cannot always be changed once production has started.
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
