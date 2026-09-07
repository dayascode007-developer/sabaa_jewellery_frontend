"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { MdDeleteOutline, MdFavoriteBorder } from "react-icons/md";
import { useRouter } from "next/navigation";
import { WishlistCardShimmer } from "@/components/shimmer-loader/Shimmer-loader";
import {
  selectWishlistItems,
  removeFromWishlist,
  fetchWishlist,
} from "@/store/slices/wishlistSlice";
import { addItem } from "@/store/slices/cartSlice";

const MAROON = "#430121";
const CONTAINER_CLASS = "mx-auto max-w-[1400px] px-4 sm:px-6";

const rupees = (n) => {
  if (!n) return "₹0.00";
  return "₹" + Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export default function Wishlist() {
  const dispatch = useDispatch();
  const router = useRouter();
  const wishlistItems = useSelector(selectWishlistItems);
  const loading = useSelector((state) => state.wishlist.loading);

  // Fetch full wishlist data on component mount
  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleRemoveFromWishlist = (item) => {
    const productId = item.product_id || item.id;
    dispatch(removeFromWishlist(productId));
  };

  const handleMoveToCart = (item) => {
    const productId = item.product_id || item.id;
    dispatch(
      addItem({
        id: productId,
        title: item.title,
        price: item.sale_price,
        image: item.main_image,
        code: item.code,
        quantity: 1,
      })
    );
    dispatch(removeFromWishlist(productId));
  };

  const getStockStatus = (item) => {
    const quantity = parseInt(item.quantity || 0);
    if (quantity === 0) return { inStock: false, label: "Out of Stock" };
    if (quantity <= 2) return { inStock: true, label: `Only ${quantity} left in stock` };
    return { inStock: true, label: null };
  };

  if (loading) {
    return (
      <div className={`${CONTAINER_CLASS} py-6 md:py-8 pb-24 lg:pb-8`}>
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Wishlist</h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          <WishlistCardShimmer count={6} />
        </div>
      </div>
    );
  }

  return (
    <div className={`${CONTAINER_CLASS} py-6 md:py-8 pb-24 lg:pb-8`}>
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          My Wishlist
        </h1>
        <p className="text-sm md:text-base text-gray-600 mt-2">
          <span className="inline-flex items-center justify-center text-white font-semibold h-6 w-6 md:h-7 md:w-7 rounded-full text-xs md:text-sm" style={{ backgroundColor: MAROON }}>
            {wishlistItems.length}
          </span>
          {" "}{wishlistItems.length === 1 ? "item" : "items"} in your wishlist
        </p>
      </div>

      {/* Wishlist Items */}
      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {wishlistItems.map((item) => {
            const stockStatus = getStockStatus(item);
            return (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Product Image Container - Rectangular on mobile (80%), square on sm+ (100%) */}
                <div className="relative w-full overflow-hidden bg-neutral-100 pb-[80%] sm:pb-[100%] group cursor-pointer"
                  onClick={() => router.push(`/product/${item.product_id}`)}
                >
                  {item.main_image ? (
                    <img
                      src={item.main_image}
                      alt={item.title}
                      className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-[#EDE3D3] via-[#E3D5BE] to-[#D8C6A8] flex items-center justify-center">
                      <span className="text-[10px] text-[#8A6E45] text-center px-2">{item.title}</span>
                    </div>
                  )}

                  {/* Stock Badge */}
                  {!stockStatus.inStock ? (
                    <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-red-500 text-white px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-semibold">
                      {stockStatus.label}
                    </div>
                  ) : stockStatus.label ? (
                    <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-red-500 text-white px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-semibold">
                      {stockStatus.label}
                    </div>
                  ) : null}

                  {/* Remove Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFromWishlist(item);
                    }}
                    className="absolute top-2 right-2 bg-white hover:bg-gray-100 rounded-full p-1.5 md:p-2 md:top-3 md:right-3 shadow-md transition-colors z-10"
                    title="Remove from wishlist"
                  >
                    <MdDeleteOutline size={16} className="text-gray-700 md:w-5 md:h-5" />
                  </button>
                </div>

                {/* Product Details - ProductCard mobile spacing */}
                <div className="flex flex-1 flex-col px-2 py-1.5 sm:px-4 sm:pt-3.5 sm:pb-4">
                  {/* Category */}
                  {item.category_name && (
                    <p className="text-[8px] tracking-[0.08em] text-gray-500 uppercase leading-tight sm:text-[10px] sm:tracking-[0.12em]">
                      {item.category_name}
                    </p>
                  )}

                  {/* Product Name */}
                  <h3
                    className="font-[family-name:var(--font-heading)] mt-0.5 line-clamp-2 min-h-[1.6em] text-[12px] leading-tight text-gray-900 transition-colors cursor-pointer hover:text-[#7B1E2B] sm:mt-1.5 sm:min-h-[2.6em] sm:text-[15px] sm:leading-snug"
                    onClick={() => router.push(`/product/${item.product_id}`)}
                  >
                    {item.title}
                  </h3>

                  {/* Price with Discount - All inline */}
                  {item.sale_price && (
                    <p className="mt-1 flex flex-wrap items-baseline gap-x-1.5 gap-y-0 sm:mt-2 sm:gap-x-2 sm:gap-y-0.5">
                      <span className="text-[17px] font-semibold text-gray-900">
                        {rupees(item.sale_price)}
                      </span>
                      {item.regular_price && Number(item.regular_price) > Number(item.sale_price) && (
                        <span className="text-[13px] text-gray-400 line-through">
                          {rupees(item.regular_price)}
                        </span>
                      )}
                      {/* Discount Badge - Same line as prices */}
                      {item.discount_percentage && (
                        <span
                          className="text-[10px] sm:text-[12px] font-bold inline-flex items-center gap-0.5"
                          style={{
                            backgroundImage: "linear-gradient(90deg, #DD9836, #FFB347, #DD9836)",
                            backgroundSize: "200% 100%",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            animation: "shimmer 3s ease-in-out infinite"
                          }}
                        >
                          <span style={{ fontSize: "1em", lineHeight: "1", background: "none", WebkitTextFillColor: "#DD9836" }}>%</span>
                          {item.discount_percentage} off
                        </span>
                      )}
                    </p>
                  )}

                  {/* Move to Cart Button */}
                  <button
                    onClick={() => handleMoveToCart(item)}
                    disabled={!stockStatus.inStock}
                    style={{
                      backgroundColor: stockStatus.inStock ? MAROON : "#ccc",
                    }}
                    className="mt-2 sm:mt-3 w-full py-1 sm:py-2.5 text-[10px] sm:text-[12px] text-white font-semibold rounded transition-all hover:opacity-90 disabled:cursor-not-allowed"
                  >
                    {stockStatus.inStock ? "Move to Cart" : "Not Available"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-12 md:py-16">
          <MdFavoriteBorder size={64} className="text-gray-300 mb-4" />
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-sm md:text-base text-gray-600 text-center mb-6 md:mb-8">
            Add items to your wishlist to save them for later
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-6 md:px-8 py-2.5 md:py-3 text-white font-semibold rounded-3xl transition-all hover:opacity-90"
            style={{ backgroundColor: MAROON }}
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
}
