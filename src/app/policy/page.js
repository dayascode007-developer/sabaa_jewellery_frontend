import SiteHeader from "@/components/layout/SiteHeader";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import Breadcrumb from "@/components/common/Breadcrumb";
import Policy from "@/components/pages/Policy";

export const metadata = {
  title: "Policies — Sabaa Jewel Arts",
  description:
    "Shipping, returns, cancellation, warranty, privacy, terms and cookies for Sabaa Jewel Arts — customized Panchalogam and silver jewellery since 1980.",
};

// The shell is rendered here rather than in app/layout.js because the home page
// still renders its own. Hoisting them all into the root layout is the tidier
// fix once you want it.
export default function PolicyPage() {
  return (
    <div className="min-h-screen w-full bg-white pb-16 lg:pb-0">
      <SiteHeader />

      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Policy" }]} />

      <Policy />

      <Footer />
      <BottomNav />
    </div>
  );
}
