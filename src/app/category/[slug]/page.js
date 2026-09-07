"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SiteHeader from "@/components/layout/SiteHeader";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import ProductCard from "@/components/products/ProductCard";
import Breadcrumb from "@/components/common/Breadcrumb";
import { getCategoryLabel } from "@/constants/productData";
import { fetchCategories, selectRawCategories } from "@/store/slices/categoriesSlice";
import {
  fetchProductsByMainAndSubCategory,
  selectProductsByCategory,
  selectProductsLoading,
  fetchAllProducts,
  selectAllProducts,
  selectAllProductsTotal,
  selectAllProductsLoading,
} from "@/store/slices/productsSlice";
import { ProductCardShimmer } from "@/components/shimmer-loader/Shimmer-loader";

const MAROON = "#7B1E2B";
const ALL_SLUG = "all-jewellery";
const PAGE_SIZE = 12;

const buildCategoryMap = (categories) => {
  const map = {};
  categories.forEach((category) => {
    const slug = category.name.toLowerCase().replace(/\s+/g, "-");
    map[`all-${slug}`] = { mainId: category.id, subId: null };
    (category.subcategories || []).forEach((sub) => {
      const subSlug = sub.name.toLowerCase().replace(/\s+/g, "-");
      map[subSlug] = { mainId: category.id, subId: sub.id };
    });
  });
  return map;
};

export default function CategoryPage({ params: paramsPromise }) {
  const [slug, setSlug] = useState("");
  const [showShimmer, setShowShimmer] = useState(false);
  const dispatch = useDispatch();
  const rawCategories = useSelector(selectRawCategories);

  const isAll = slug === ALL_SLUG;
  const allProducts = useSelector(selectAllProducts);
  const allTotal = useSelector(selectAllProductsTotal);
  const allLoading = useSelector(selectAllProductsLoading);

  const products = useSelector((state) => {
    if (!slug || !rawCategories?.length) return [];
    const categoryMap = buildCategoryMap(rawCategories);
    const categoryInfo = categoryMap[slug];
    if (!categoryInfo || !state?.products) return [];
    return selectProductsByCategory(state, categoryInfo.mainId, categoryInfo.subId) || [];
  });
  const categoryLoading = useSelector((state) => selectProductsLoading(state)) || false;
  const loading = isAll ? allLoading : categoryLoading;

  // Only show shimmer if loading takes more than 500ms (debounced)
  useEffect(() => {
    if (!loading) {
      setShowShimmer(false);
      return;
    }

    const timer = setTimeout(() => setShowShimmer(true), 500);
    return () => clearTimeout(timer);
  }, [loading]);

  // Fetch categories on mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Unwrap params (Next.js 15 returns promise)
  useEffect(() => {
    Promise.resolve(paramsPromise).then((p) => {
      if (p?.slug) setSlug(p.slug);
    });
  }, [paramsPromise]);

  // All Jewellery does not wait for /api/categories — it has no category id to
  // look up, so its first page can be requested as soon as the slug is known.
  useEffect(() => {
    if (slug !== ALL_SLUG) return;
    dispatch(fetchAllProducts({ limit: PAGE_SIZE, offset: 0 }));
  }, [slug, dispatch]);

  const loadMore = () =>
    dispatch(fetchAllProducts({ limit: PAGE_SIZE, offset: allProducts.length }));

  // Fetch products when slug changes
  useEffect(() => {
    if (!slug || slug === ALL_SLUG || !rawCategories?.length) return;
    const categoryMap = buildCategoryMap(rawCategories);
    const categoryInfo = categoryMap[slug];
    if (!categoryInfo) return;

    dispatch(fetchProductsByMainAndSubCategory({
      mainCategoryId: categoryInfo.mainId,
      subCategoryId: categoryInfo.subId,
    }));
  }, [slug, rawCategories, dispatch]);

  // Get category name from API categories or fallback to label
  const categoryLabel = (() => {
    if (isAll) return "All Jewellery";
    if (!slug || !rawCategories?.length) return getCategoryLabel(slug);
    const categoryMap = buildCategoryMap(rawCategories);
    const categoryInfo = categoryMap[slug];
    if (!categoryInfo) return getCategoryLabel(slug);

    // Find the actual category name from rawCategories
    const category = rawCategories.find((c) => c.id === categoryInfo.mainId);
    if (categoryInfo.subId) {
      const subCategory = category?.subcategories?.find((s) => s.id === categoryInfo.subId);
      return subCategory?.name || getCategoryLabel(slug);
    }
    return category?.name || getCategoryLabel(slug);
  })();

  // Only show API products, no static fallback
  const displayProducts = isAll ? allProducts : products;
  // The count in the heading is the whole catalogue, not just the pages loaded
  // so far — "(5 results)" while 20 are on screen would be wrong.
  const resultCount = isAll ? allTotal || allProducts.length : products.length;
  const hasMore = isAll && allProducts.length < allTotal;

  // A "Load More" page keeps the grid on screen while it fetches, so the full
  // shimmer would wipe out what the visitor is already reading.
  const isFirstLoad = (loading || showShimmer) && displayProducts.length === 0;

  return (
    <div className="min-h-screen w-full bg-white pb-16 lg:pb-0">
      <SiteHeader />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: categoryLabel }]} />

      <main className="bg-[#FDF0F2]">
        <div className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6">
          <h1 className="font-[family-name:var(--font-heading)] text-[26px] leading-tight text-neutral-900 sm:text-[32px] lg:text-[40px]">
            {categoryLabel}{" "}
            <span className="text-[15px] font-normal text-neutral-500 sm:text-[17px]">
              ({resultCount} results)
            </span>
          </h1>

          {isFirstLoad ? (
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              <ProductCardShimmer count={8} />
            </div>
          ) : displayProducts.length > 0 ? (
            <>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {displayProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {hasMore ? (
                <div className="mt-8 flex justify-center">
                  <button
                    type="button"
                    onClick={loadMore}
                    disabled={loading}
                    className="rounded-full px-7 py-3 text-[14px] font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                    style={{ backgroundColor: MAROON }}
                  >
                    {loading
                      ? "Loading…"
                      : `Load More (${allTotal - allProducts.length} more)`}
                  </button>
                </div>
              ) : null}
            </>
          ) : (
            <div className="mt-6 text-center py-12 text-gray-500">
              No products found in this category.
            </div>
          )}
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
