import SiteHeader from "@/components/layout/SiteHeader";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import Breadcrumb from "@/components/common/Breadcrumb";
import Disclaimer from "@/components/pages/Disclaimer";

export const metadata = {
  title: "Disclaimer — Sabaa Jewel Arts",
  description:
    "Legal disclaimer for Sabaa Jewel Arts. Please read our disclaimer regarding product information, liability limitations, and website usage.",
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen w-full bg-white pb-16 lg:pb-0">
      <SiteHeader />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Disclaimer" },
        ]}
      />

      <Disclaimer />

      <Footer />
      <BottomNav />
    </div>
  );
}
