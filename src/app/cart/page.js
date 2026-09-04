import SiteHeader from "@/components/layout/SiteHeader";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import Breadcrumb from "@/components/common/Breadcrumb";
import Cart from "@/components/pages/Cart";

export const metadata = {
  title: "My Cart — Sabaa Jewel Arts",
};

// The shell is rendered here rather than in app/layout.js because the home page
// still renders its own.
export default function CartPage() {
  return (
    <div className="min-h-screen w-full bg-white pb-16 lg:pb-0">
      <SiteHeader />

      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "My Cart" }]} />

      <Cart />

      <Footer />
      <BottomNav />
    </div>
  );
}
