import Header from "@/components/layout/Header";
import CategoryNav from "@/components/layout/CategoryNav";
import SectionTitle from "@/components/common/SectionTitle";
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

// Header and CategoryNav are rendered here rather than in app/layout.js so this
// pass touches no shared files. Hoist them into the root layout once the other
// routes exist.
export default function Home() {
  return (
    <div className="min-h-screen w-full bg-white">
      <Header />
      <CategoryNav />

      <main>
        <div className="pt-6 pb-5">
          <SectionTitle
            title="Customize Your Perfect Masterpiece"
            subtitle="Shop by Categories"
          />
        </div>

        <ShopByCategories />
        <HeroBanner />
        <Collections />
        <PromoBanner />
        <CustomerLove />
        <CustomerUnboxing />
        <Card3DSlider />
        <CustomerVoices />
        <TrustBar />
        <NewArrivals />
        <StylingCustomizations />
        <SabaaAssurance />
        <MemoriesInMetal />
      </main>

      <Footer />
    </div>
  );
}
