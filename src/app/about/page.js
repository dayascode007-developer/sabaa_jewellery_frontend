import SiteHeader from "@/components/layout/SiteHeader";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import Breadcrumb from "@/components/common/Breadcrumb";
import About from "@/components/pages/About";

export const metadata = {
  title: "About Us — Sabaa Jewel Arts",
  description:
    "Sabaa Jewel Arts has been making customized Panchalogam and silver jewellery in Cuddalore since 1980 — engraved with names, faces, fingerprints and voice waveforms.",
};

// The shell is rendered here rather than in app/layout.js because the home page
// still renders its own. Hoisting them all into the root layout is the tidier
// fix once you want it.
export default function AboutPage() {
  return (
    <div className="min-h-screen w-full bg-white pb-16 lg:pb-0">
      <SiteHeader />

      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About Us" }]} />

      <About />

      <Footer />
      <BottomNav />
    </div>
  );
}
