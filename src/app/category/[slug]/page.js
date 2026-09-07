"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

// "All Jewellery" is not one of the API's categories — it is the whole shop, so
// it comes from the flat /api/products list rather than from a category id.
const ALL_SLUG = "all-jewellery";
// Ten on first paint, then ten more each time the visitor reaches the bottom.
const PAGE_SIZE = 10;

// Dynamically build slug-to-ID mapping from API categories
const buildCategoryMap = (categories) => {
  const map = {};
  categories.forEach((category) => {
    const slug = category.name.toLowerCase().replace(/\s+/g, "-");

    // Add main category with all subcategories
    map[`all-${slug}`] = { mainId: category.id, subId: null };

    // Add each subcategory
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
  // Test switch — forces the shimmer on screen so it can be checked without
  // having to throttle the network. Remove the button when you are done with it.
  const [testShimmer, setTestShimmer] = useState(false);
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

  const loadMore = useCallback(() => {
    dispatch(fetchAllProducts({ limit: PAGE_SIZE, offset: allProducts.length }));
  }, [dispatch, allProducts.length]);

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

  // A later page keeps the grid on screen while it fetches, so the full-page
  // shimmer would wipe out what the visitor is already reading. Only the first
  // load replaces the grid; later pages append shimmer cards to the end of it.
  const isFirstLoad =
    testShimmer || ((loading || showShimmer) && displayProducts.length === 0);
  const isLoadingMore = (loading || testShimmer) && displayProducts.length > 0;

  // Infinite scroll. A sentinel sits below the last row; when it scrolls into
  // view the next page is requested. rootMargin starts the fetch 300px early so
  // the cards are usually there by the time the visitor reaches them.
  const sentinelRef = useRef(null);
  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !isAll || !hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: "300px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [isAll, hasMore, loading, loadMore]);

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

          {/* Test switch for the shimmer. Delete this block when you no longer
              need to look at the loading state on demand. */}
          {isAll ? (
            <button
              type="button"
              onClick={() => setTestShimmer((v) => !v)}
              className="mt-3 rounded-full border px-4 py-1.5 text-[12px] transition-colors hover:bg-white"
              style={{ borderColor: MAROON, color: MAROON }}
            >
              {testShimmer ? "Stop shimmer test" : "Test shimmer"}
            </button>
          ) : null}

          {isFirstLoad ? (
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              <ProductCardShimmer count={PAGE_SIZE} />
            </div>
          ) : displayProducts.length > 0 ? (
            <>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {displayProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}

                {/* The next page's cards, shimmering in place at the end of the
                    same grid so the row keeps its shape while they load. */}
                {isLoadingMore ? <ProductCardShimmer count={4} /> : null}
              </div>

              {/* Scrolling this into view fetches the next ten. */}
              {hasMore ? <div ref={sentinelRef} aria-hidden="true" className="h-px w-full" /> : null}

              {!hasMore && isAll && allProducts.length > PAGE_SIZE ? (
                <p className="mt-8 text-center text-[13px] text-neutral-500">
                  You have seen all {allTotal} pieces.
                </p>
              ) : null}
            </>
          ) : (
            <div className="mt-12 flex flex-col items-center justify-center py-12 text-center">
              <svg
                viewBox="0 0 24 24"
                className="h-16 w-16 text-neutral-300 mb-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M9 12h6m-6 4h6M7 20h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z" />
              </svg>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-neutral-700">Coming Soon</h2>
              <p className="mt-2 text-neutral-500">This category will be available shortly</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
