"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import SiteHeader from "@/components/layout/SiteHeader";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import Breadcrumb from "@/components/common/Breadcrumb";
import ProductDetail from "@/components/products/ProductDetail";
import { ProductDetailShimmer } from "@/components/shimmer-loader/Shimmer-loader";
import { fetchProductById } from "@/store/api/categoriesApi";

// Derive isCustomisable from subcategories (ID 14 = Name Engrave Ring)
const deriveIsCustomisable = (product) => {
  return product?.subcategories?.some((sub) => sub.id === 14) || false;
};

// Transform API product data to match ProductCard/Detail format
const transformApiProduct = (apiProduct, categoryName = "") => ({
  id: apiProduct.id,
  title: apiProduct.title,
  description: apiProduct.description,
  category: categoryName.toLowerCase().replace(/\s+/g, "-") || "",
  category_id: apiProduct.category_id,
  subcategories: apiProduct.subcategories || [],

  // Price: convert to number if string
  price: parseFloat(apiProduct.sale_price) || 0,
  mrp: parseFloat(apiProduct.regular_price) || 0,

  // Image
  image: apiProduct.main_image || null,
  gallery: [
    apiProduct.main_image,
    ...(apiProduct.sub_images?.map((img) => img.image_url) || []),
  ].filter(Boolean),

  // Code/SKU
  code: apiProduct.sku || "",

  // Additional fields
  sizes:
    apiProduct.ring_sizes?.map((rs) => rs.size?.toString() || rs.toString()) ||
    [],
  hasRingSize: (apiProduct.ring_sizes?.length || 0) > 0,
  limit_purchases: apiProduct.limit_purchases || false,
  maxQty: apiProduct.limit_purchases ? 10 : 99,
  rating: 4,
  bestseller: true,
  sections: [],

  // Engraving/customization data
  fonts: apiProduct.fonts || [],
  colors: apiProduct.colors || [],
  symbols: apiProduct.symbols || [],
  symbol_direction: apiProduct.symbol_direction || [],

  // Product details sections for accordion
  product_details: apiProduct.product_details || [],
  cleaning_polishing: apiProduct.cleaning_polishing || [],
  usage_color_guarantee: apiProduct.usage_color_guarantee || [],
  return_exchange_policy: apiProduct.return_exchange_policy || [],
  address_contact: apiProduct.address_contact || [],

  // Build sections array for Accordion component
  sections: [
    {
      id: "product-details",
      title: "Product Details",
      body: apiProduct.product_details?.map((pd) => pd.content).join("\n") || "",
    },
    {
      id: "cleaning-polishing",
      title: "Cleaning & Polishing",
      body: apiProduct.cleaning_polishing?.map((cp) => cp.content).join("\n") || "",
    },
    {
      id: "usage-color-guarantee",
      title: "Usage & Color Gaurantee",
      body: apiProduct.usage_color_guarantee?.map((ucg) => ucg.content).join("\n") || "",
    },
    {
      id: "return-exchange-policy",
      title: "Return & Exchange Policy",
      body: apiProduct.return_exchange_policy?.map((rep) => rep.content).join("\n") || "",
    },
    {
      id: "address-contact",
      title: "Our Address & Contact",
      body: apiProduct.address_contact?.map((ac) => ac.content).join("\n") || "",
    },
  ].filter((section) => section.body.trim() !== ""),

  // Category/subcategory info (will be set from API data)
  categoryId: null,
  categoryName: categoryName,
  subcategoryId: null,
  subcategoryName: "",
});

export default function ProductPage() {
  const params = useParams();
  const productId = params?.id;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showShimmer, setShowShimmer] = useState(false);

  // Get all products from Redux store
  const productsState = useSelector((state) => state?.products || {});

  // Only show shimmer if loading takes more than 500ms (debounced)
  useEffect(() => {
    if (!loading) {
      setShowShimmer(false);
      return;
    }

    const timer = setTimeout(() => setShowShimmer(true), 500);
    return () => clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    if (!productId) return;

    const loadProduct = async () => {
      setLoading(true);
      try {
        // Search for product across all stored category combinations
        const numId = parseInt(productId);
        const allStoredProducts = Object.values(
          productsState.byCategory || {}
        ).flat();
        const foundProduct = allStoredProducts.find((p) => p.id === numId);

        // Use cached product only if it has required fields
        if (foundProduct && foundProduct.limit_purchases !== undefined) {
          // Add isCustomisable derived from subcategories
          setProduct({
            ...foundProduct,
            isCustomisable: deriveIsCustomisable(foundProduct),
            categoryLabel: foundProduct.categoryName,
          });
          setLoading(false);
          return;
        }

        // If not found in Redux, fetch from API
        const apiProduct = await fetchProductById(numId);
        const transformed = transformApiProduct(
          apiProduct,
          apiProduct.category_name || ""
        );

        setProduct({
          ...transformed,
          isCustomisable: deriveIsCustomisable(transformed),
          categoryLabel: apiProduct.category_name || "",
          categoryId: apiProduct.category_id,
          categoryName: apiProduct.category_name || "",
        });
      } catch (error) {
        console.error("Failed to load product:", error);
        // Leave product as null to show error state
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId, productsState]);

  if (showShimmer || loading) {
    return (
      <div className="min-h-screen w-full bg-white pb-16 lg:pb-0">
        <SiteHeader />
        <ProductDetailShimmer />
        <Footer />
        <BottomNav />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen w-full bg-white pb-16 lg:pb-0">
        <SiteHeader />
        <main>
          <div className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6 text-center">
            <h1 className="text-2xl font-semibold text-neutral-700">
              Product not found
            </h1>
            <p className="mt-2 text-neutral-500">
              The product you're looking for doesn't exist.
            </p>
          </div>
        </main>
        <Footer />
        <BottomNav />
      </div>
    );
  }

  // Generate correct category href: "all-{main}" for main category, "{sub}" for subcategory
  const categoryHref = (() => {
    if (!product.categoryName) return "/";

    // If we have subcategoryName and it's different from categoryName, use subcategory
    if (product.subcategoryName && product.subcategoryName !== product.categoryName) {
      return `/category/${product.subcategoryName.toLowerCase().replace(/\s+/g, "-")}`;
    }

    // Default to main category
    return `/category/all-${product.categoryName.toLowerCase().replace(/\s+/g, "-")}`;
  })();

  return (
    <div className="min-h-screen w-full bg-white pb-16 lg:pb-0">
      <SiteHeader />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          {
            label: product.categoryLabel,
            href: categoryHref,
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
