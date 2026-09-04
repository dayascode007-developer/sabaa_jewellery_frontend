import { notFound } from "next/navigation";
import SiteHeader from "@/components/layout/SiteHeader";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import Breadcrumb from "@/components/common/Breadcrumb";
import ProductDetail from "@/components/products/ProductDetail";
import { getProductById } from "@/constants/productData";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = getProductById(id);
  return { title: product ? `${product.title} — Sabaa Jewel Arts` : "Product — Sabaa Jewel Arts" };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  return (
    <div className="min-h-screen w-full bg-white pb-16 lg:pb-0">
      <SiteHeader />

      {/* The category sits between Home and the product, so a visitor can step
          back to the shelf they came from instead of only to the home page.
          It is read from the product itself, so every category gets it. */}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          {
            label: product.categoryLabel,
            href: `/category/${product.category}`,
          },
          { label: product.title },
        ]}
      />

      <main>
        <div className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6">
          <ProductDetail product={product} />
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
