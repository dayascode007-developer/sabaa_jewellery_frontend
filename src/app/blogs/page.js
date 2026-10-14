import SiteHeader from "@/components/layout/SiteHeader";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import Breadcrumb from "@/components/common/Breadcrumb";
import Blogs from "@/components/pages/Blogs";
import { loaderDelay } from "@/lib/loaderDelay";

export const metadata = {
  title: "Blogs — Sabaa Jewel Arts",
  description:
    "Jewellery tips, spiritual articles, gift guides and festival guides from the Sabaa workshop in Cuddalore.",
};

// The shell is rendered here rather than in app/layout.js because the home page
// still renders its own. Hoisting them all into the root layout is the tidier
// fix once you want it.
export default async function BlogsPage() {
  // No-op unless NEXT_PUBLIC_LOADER_DELAY is set; see lib/loaderDelay.
  await loaderDelay();

  return (
    <div className="min-h-screen w-full bg-white pb-16 lg:pb-0">
      <SiteHeader />

      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blogs" }]} />

      <Blogs />

      <Footer />
      <BottomNav />
    </div>
  );
}
