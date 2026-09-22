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
const ALL_SLUG = "all-jewellery";
// Ten on first paint, then ten more each time the visitor reaches the bottom.
// (Was 12 on the incoming branch — 10 is what the infinite scroll was asked for.)
const PAGE_SIZE = 10;

// Must match the slugs the nav builds — see toSlug in categoriesApi.js.
const toSlug = (name) =>
  name.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "").replace(/--+/g, "-");

/**
 * Every slug the site can link to, from the three-level API:
 *
 *   category            -> all-rings          { mainId }
 *   sub_main_category   -> photo-ring         { mainId, subId }
 *   subcategory (3rd)   -> laser-photo-ring   { mainId, subId, thirdId }
 *
 * All three are filtered by the API itself — ?main=&submain=&sub= — so the ids
 * are simply passed through. `label` travels with the entry so the heading does
 * not have to look the name up again.
 */
const buildCategoryMap = (categories) => {
  const map = {};
  categories.forEach((category) => {
    const catSlug = toSlug(category.name);
    const hasSubMain = (category.sub_main_categories || []).length > 0;
    const hasLegacySubs = (category.subcategories || []).length > 0;

    // For flat categories (no sub_main or legacy subcategories), map both slug variants
    if (!hasSubMain && !hasLegacySubs) {
      map[catSlug] = {
        mainId: category.id,
        subId: null,
        label: category.name,
      };
    }

    // Always create the "all-" variant for consistency
    map[`all-${catSlug}`] = {
      mainId: category.id,
      subId: null,
      label: category.name,
    };

    (category.sub_main_categories || []).forEach((subMain) => {
      map[toSlug(subMain.name)] = {
        mainId: category.id,
        subId: subMain.id,
        label: subMain.name,
      };

      (subMain.subcategories || []).forEach((child) => {
        map[toSlug(child.name)] = {
          mainId: category.id,
          subId: subMain.id,
          thirdId: child.id,
          label: child.name,
        };
      });
    });

    // Older payloads, where the children hung straight off the category.
    (category.subcategories || []).forEach((sub) => {
      map[toSlug(sub.name)] = {
        mainId: category.id,
        subId: sub.id,
        label: sub.name,
      };
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

    // The API filters all three levels itself — ?main=&submain=&sub= — so
    // there is nothing to narrow here.
    return (
      selectProductsByCategory(
        state,
        categoryInfo.mainId,
        categoryInfo.subId,
        categoryInfo.thirdId
      ) || []
    );
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

    dispatch(
      fetchProductsByMainAndSubCategory({
        mainCategoryId: categoryInfo.mainId,
        subMainCategoryId: categoryInfo.subId,
        subCategoryId: categoryInfo.thirdId,
      })
    );
  }, [slug, rawCategories, dispatch]);

  // The map already carries the right name for whichever level this slug is —
  // category, sub-main or third — so there is nothing to look up again.
  const categoryLabel = (() => {
    if (isAll) return "All Jewellery";
    if (!slug || !rawCategories?.length) return getCategoryLabel(slug);
    const entry = buildCategoryMap(rawCategories)[slug];
    if (!entry) return getCategoryLabel(slug);
    return entry.subId ? entry.label : `All ${entry.label}`;
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
