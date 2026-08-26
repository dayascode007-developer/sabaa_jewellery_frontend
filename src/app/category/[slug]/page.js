import SiteHeader from "@/components/layout/SiteHeader";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import ProductCard from "@/components/products/ProductCard";
import Breadcrumb from "@/components/common/Breadcrumb";
import { getCategoryLabel, getProductsBySlug } from "@/constants/productData";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return { title: `${getCategoryLabel(slug)} — Sabaa Jewel Arts` };
}

// The shell is rendered here rather than in app/layout.js because the home page
// still renders its own. Hoisting both into the root layout is the tidier fix
// once you want it.
export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const label = getCategoryLabel(slug);
  const products = getProductsBySlug(slug);

  return (
    <div className="min-h-screen w-full bg-white pb-16 lg:pb-0">
      <SiteHeader />

      <Breadcrumb items={[{ label: "Home", href: "/" }, { label }]} />

      <main className="bg-[#FDF0F2]">
        <div className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6">
          <h1 className="font-[family-name:var(--font-heading)] text-[26px] leading-tight text-neutral-900 sm:text-[32px] lg:text-[40px]">
            {label}{" "}
            <span className="text-[15px] font-normal text-neutral-500 sm:text-[17px]">
              ({products.length} results)
            </span>
          </h1>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
