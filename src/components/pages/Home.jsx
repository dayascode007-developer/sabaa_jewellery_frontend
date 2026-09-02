import SiteHeader from "@/components/layout/SiteHeader";
import ShopByCategories from "@/components/pages/home/ShopByCategories";
import HeroBanner from "@/components/pages/home/HeroBanner";
import Collections from "@/components/pages/home/Collections";
import PromoBanner from "@/components/pages/home/PromoBanner";
import CustomerLove from "@/components/pages/home/CustomerLove";
import CustomerUnboxing from "@/components/pages/home/CustomerUnboxing";
import Card3DSlider from "@/components/pages/home/Card3DSlider";
import CustomerVoices from "@/components/pages/home/CustomerVoices";
import TrustBar from "@/components/pages/home/TrustBar";
import NewArrivals from "@/components/pages/home/NewArrivals";
import StylingCustomizations from "@/components/pages/home/StylingCustomizations";
import SabaaAssurance from "@/components/pages/home/SabaaAssurance";
import MemoriesInMetal from "@/components/pages/home/MemoriesInMetal";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import FloatingWidgets from "@/components/common/FloatingWidgets";

// Header and CategoryNav are rendered here rather than in app/layout.js so this
// pass touches no shared files. Hoist them into the root layout once the other
// routes exist.
export default function Home() {
  return (
    // pb-16 clears the fixed bottom bar on phones so the footer is not hidden
    // behind it; from lg up the bar is gone and the padding with it.
    <div className="min-h-screen w-full bg-white pb-16 lg:pb-0">
      <SiteHeader />

      <main>
        {/* The "Customize Your Perfect Masterpiece / Shop by Categories"
            heading used to sit here. Removed — the category row now opens the
            page directly. */}
        <div className="pt-6" />

        <ShopByCategories />
        <HeroBanner />
        <Collections />
        <Card3DSlider />
        <CustomerLove />
        <CustomerUnboxing />
        <PromoBanner />
        <CustomerVoices />
        <TrustBar />
        <NewArrivals />
        <StylingCustomizations />
        <SabaaAssurance />
        <MemoriesInMetal />
      </main>

      <Footer />
      <BottomNav />
      <FloatingWidgets />
    </div>
  );
}
