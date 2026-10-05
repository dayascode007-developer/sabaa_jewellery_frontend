"use client";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import {
  selectSearchQuery,
  selectSearchResults,
  selectTrendingProducts,
  selectSearchLoading,
  selectTrendingLoading,
  getTrendingProducts,
} from "@/store/slices/searchSlice";
import { fetchCategories } from "@/store/slices/categoriesSlice";
import { useRouter } from "next/navigation";

const MAROON = "#7B1E2B";

const toSlug = (name) =>
  name.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "").replace(/--+/g, "-");

const getCategoryNames = (categoriesData) => {
  if (!categoriesData || !Array.isArray(categoriesData)) return [];
  return categoriesData
    .slice(0, 6)
    .map((cat) => cat.name)
    .filter(Boolean);
};

function SearchDropdown({ isOpen, onCategoryClick }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchResults = useSelector(selectSearchResults);
  const trendingProducts = useSelector(selectTrendingProducts);
  const searchLoading = useSelector(selectSearchLoading);
  const trendingLoading = useSelector(selectTrendingLoading);
  const actualQuery = useSelector(selectSearchQuery);
  const categoriesData = useSelector((state) => state.categories.raw);

  const categoryNames = getCategoryNames(categoriesData);

  // Filter categories at all levels (main, sub_main, and 3level) that match the search query
  const matchingCategories = useMemo(() => {
    if (!actualQuery.trim() || !categoriesData || !Array.isArray(categoriesData)) {
      return [];
    }

    const query = actualQuery.toLowerCase();
    const allMatches = [];

    categoriesData.forEach((mainCat) => {
      // Match main category
      if (mainCat.name.toLowerCase().includes(query)) {
        allMatches.push({
          id: mainCat.id,
          name: mainCat.name,
          level: "main",
        });
      }

      // Match sub_main categories
      if (mainCat.sub_main_categories && Array.isArray(mainCat.sub_main_categories)) {
        mainCat.sub_main_categories.forEach((subMain) => {
          if (subMain.name.toLowerCase().includes(query)) {
            allMatches.push({
              id: subMain.id,
              name: subMain.name,
              level: "sub_main",
            });
          }

          // Match 3level (sub) categories
          if (subMain.subcategories && Array.isArray(subMain.subcategories)) {
            subMain.subcategories.forEach((sub) => {
              if (sub.name.toLowerCase().includes(query)) {
                allMatches.push({
                  id: sub.id,
                  name: sub.name,
                  level: "3level",
                });
              }
            });
          }
        });
      }
    });

    return allMatches.slice(0, 8);
  }, [actualQuery, categoriesData]);

  // Get all matching product titles from nested structure
  const matchingProductTitles = useMemo(() => {
    if (!actualQuery.trim() || !categoriesData || !Array.isArray(categoriesData)) {
      return [];
    }

    const query = actualQuery.toLowerCase();
    const allProducts = [];

    try {
      categoriesData.forEach((category) => {
        if (category.subcategories && Array.isArray(category.subcategories)) {
          category.subcategories.forEach((subcategory) => {
            if (subcategory.products && Array.isArray(subcategory.products)) {
              subcategory.products.forEach((product) => {
                if (
                  (product.title && product.title.toLowerCase().includes(query)) ||
                  (subcategory.name && subcategory.name.toLowerCase().includes(query))
                ) {
                  allProducts.push({
                    id: product.id,
                    title: product.title,
                    main_image: product.main_image,
                    sale_price: product.sale_price,
                    regular_price: product.regular_price,
                  });
                }
              });
            }
          });
        }
      });
    } catch (error) {
      console.error("Error filtering products:", error);
    }

    return allProducts.slice(0, 8);
  }, [actualQuery, categoriesData]);

  // Debug logging
  useEffect(() => {
    if (actualQuery) {
      console.log("🔍 Search Query:", actualQuery);
      console.log("📁 Categories loaded:", categoriesData?.length || 0);
      console.log("🎁 Search Results from API:", searchResults.length);
      console.log("📦 Matching Product Titles:", matchingProductTitles.length);
      console.log("✅ Matching Categories:", matchingCategories.length);
    }
  }, [actualQuery, categoriesData, searchResults, matchingProductTitles, matchingCategories]);

  useEffect(() => {
    // Load categories if not already loaded
    if (!categoriesData || (Array.isArray(categoriesData) && categoriesData.length === 0)) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categoriesData]);

  useEffect(() => {
    if (isOpen && trendingProducts.length === 0 && !actualQuery) {
      dispatch(getTrendingProducts());
    }
  }, [isOpen, dispatch, trendingProducts.length, actualQuery]);

  if (!isOpen) return null;

  const handleCategoryClick = (categoryName) => {
    const slug = toSlug(categoryName);
    router.push(`/category/${slug}`);
    // Call the callback from parent (Header) to clear input
    if (onCategoryClick) {
      onCategoryClick();
    }
  };

  const handleProductClick = (productId) => {
    router.push(`/product/${productId}`);
  };

  return (
    <div
      // Why the panel needed two clicks with a mouse but one tap on a phone:
      // pressing an item blurred the search input, Header's blur handler then
      // scheduled this panel to unmount 200ms later, and the item moved out
      // from under the pointer before mouseup — so the first click never
      // became a click event. Keeping focus on the input stops the timer ever
      // starting, so one click is enough. A tap beats the 200ms, which is why
      // small screens were unaffected.
      onMouseDown={(e) => e.preventDefault()}
      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-neutral-200 max-h-[600px] overflow-y-auto z-50"
    >
      {/* Category Suggestion */}
      {actualQuery && matchingCategories.length > 0 && (
        <div className="border-b border-neutral-200">
          <div className="p-4">
            <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">
              Category Suggestion
            </h3>
            <div className="flex flex-wrap gap-2">
              {matchingCategories.map((cat, idx) => (
                <button
                  key={`${cat.id}-${idx}`}
                  onClick={() => handleCategoryClick(cat.name)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-300 text-sm text-neutral-700 hover:border-[#7B1E2B] hover:text-[#7B1E2B] transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M7 7h10M7 12h7" />
                  </svg>
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Suggested Products - Show API search results first, fallback to local categories */}
      {actualQuery && (searchResults.length > 0 || matchingProductTitles.length > 0) && (
        <div className="border-b border-neutral-200">
          <div className="p-4">
            <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">
              Suggested
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {(searchResults.length > 0 ? searchResults : matchingProductTitles).slice(0, 8).map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="flex flex-col items-center gap-2 p-2 rounded hover:bg-neutral-50 transition-colors text-center"
                >
                  <div className="w-full aspect-square rounded bg-neutral-100 flex items-center justify-center overflow-hidden">
                    {product.main_image ? (
                      <Image
                        src={product.main_image}
                        alt={product.title}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                        unoptimized
                      />
                    ) : (
                      <span className="text-neutral-400 text-xs">No image</span>
                    )}
                  </div>
                  <div className="w-full min-w-0">
                    <p className="text-xs text-neutral-900 line-clamp-2 leading-tight">
                      {product.title}
                    </p>
                    {product.sale_price && (
                      <p className="text-xs text-neutral-600 font-medium mt-0.5">
                        ₹{product.sale_price}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
            {(matchingProductTitles.length > 8 || searchResults.length > 8) && (
              <button
                onClick={() =>
                  router.push(
                    `/category/all-jewellery?search=${encodeURIComponent(actualQuery)}`
                  )
                }
                className="mt-3 w-full py-2 text-sm font-medium text-center transition-colors"
                style={{ color: MAROON }}
              >
                View all results
              </button>
            )}
          </div>
        </div>
      )}

      {/* Trending Products */}
      {!actualQuery && !trendingLoading && trendingProducts.length > 0 && (
        <div className="p-4">
          <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">
            Trending Products
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {trendingProducts.slice(0, 6).map((product) => (
              <button
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                className="flex flex-col items-center gap-2 hover:opacity-70 transition-opacity"
              >
                <div className="w-20 h-20 rounded-lg bg-neutral-100 overflow-hidden flex items-center justify-center">
                  {product.main_image ? (
                    <Image
                      src={product.main_image}
                      alt={product.title}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                      unoptimized
                    />
                  ) : (
                    <span className="text-neutral-400 text-xs">No image</span>
                  )}
                </div>
                <p className="text-xs text-neutral-700 text-center line-clamp-2 w-20">
                  {product.title}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {actualQuery &&
       matchingProductTitles.length === 0 &&
       searchResults.length === 0 &&
       matchingCategories.length === 0 &&
       !searchLoading && (
        <div className="p-8 text-center">
          <p className="text-neutral-600 text-sm">No results found for "{actualQuery}"</p>
          <p className="text-neutral-400 text-xs mt-2">Try a different search term</p>
        </div>
      )}

      {/* Loading */}
      {(searchLoading || trendingLoading) && (
        <div className="p-8 text-center">
          <div className="inline-block">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-full border-2 border-gray-200"></div>
              <div
                className="absolute inset-0 rounded-full border-2 border-transparent"
                style={{
                  borderTopColor: MAROON,
                  animation: "spin 1s linear infinite",
                }}
              ></div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default SearchDropdown;
