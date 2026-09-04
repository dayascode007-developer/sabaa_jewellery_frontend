"use client";

import { useState } from "react";
import { MdDeleteOutline, MdFavoriteBorder } from "react-icons/md";
import ShimmerLoader from "@/components/shimmer-loader/Shimmer-loader";

const MAROON = "#430121";
const CONTAINER_CLASS = "mx-auto max-w-[1400px] px-4 sm:px-6";

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Gilded Wave Gold Drop Earrings",
      price: 93281,
      image: "https://via.placeholder.com/300x300?text=Gold+Earrings",
      stock: 1,
      inStock: true,
    },
    {
      id: 2,
      name: "Diamond Sterling Silver Ring",
      price: 45000,
      image: "https://via.placeholder.com/300x300?text=Silver+Ring",
      stock: 5,
      inStock: true,
    },
    {
      id: 3,
      name: "Emerald Pendant Necklace",
      price: 67500,
      image: "https://via.placeholder.com/300x300?text=Pendant",
      stock: 0,
      inStock: false,
    },
    {
      id: 4,
      name: "Pearl Stud Earrings",
      price: 28900,
      image: "https://via.placeholder.com/300x300?text=Pearl+Studs",
      stock: 3,
      inStock: true,
    },
  ]);

  const [loading] = useState(false);

  const handleRemoveFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  const handleMoveToCart = (id) => {
    // TODO: Implement move to cart logic
    console.log("Move to cart:", id);
  };

  if (loading) {
    return (
      <div className={`${CONTAINER_CLASS} py-6 md:py-8`}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <ShimmerLoader key={i} width="w-full" height="h-80" count={1} />
          ))}
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
          {wishlistItems.length} items in your wishlist
        </p>
      </div>

      {/* Wishlist Items */}
      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 md:gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Product Image Container */}
              <div className="relative bg-gray-100 aspect-[5/5] md:aspect-[4/3] overflow-hidden group">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Stock Badge */}
                {!item.inStock ? (
                  <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-red-500 text-white px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-semibold">
                    Out of Stock
                  </div>
                ) : item.stock <= 2 ? (
                  <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-red-500 text-white px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-semibold">
                    Only {item.stock} left in stock
                  </div>
                ) : null}

                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveFromWishlist(item.id)}
                  className="absolute top-3 right-3 bg-white hover:bg-gray-100 rounded-full p-2 md:p-2.5 shadow-md transition-colors"
                  title="Remove from wishlist"
                >
                  <MdDeleteOutline size={20} className="text-gray-700" />
                </button>

                {/* Favorite Heart Icon */}
                <div className="absolute bottom-3 right-3 bg-white rounded-full p-2 md:p-2.5 shadow-md">
                  <MdFavoriteBorder size={18} className="text-red-500" />
                </div>
              </div>

              {/* Product Details */}
              <div className="p-1.5 md:p-4">
                {/* Product Name */}
                <h3 className="text-xs md:text-base font-semibold text-gray-900 line-clamp-2 mb-0.5 md:mb-2">
                  {item.name}
                </h3>

                {/* Price */}
                <p className="text-sm md:text-xl font-bold mb-1.5 md:mb-4">
                  <span style={{ color: MAROON }}>₹</span>
                  <span className="text-gray-900">
                    {item.price.toLocaleString()}
                  </span>
                </p>

                {/* Move to Cart Button */}
                <button
                  onClick={() => handleMoveToCart(item.id)}
                  disabled={!item.inStock}
                  style={{
                    backgroundColor: item.inStock ? MAROON : "#ccc",
                  }}
                  className="w-full py-1 md:py-2.5 text-xs md:text-sm text-white font-semibold rounded-lg transition-all hover:opacity-90 disabled:cursor-not-allowed"
                >
                  {item.inStock ? "Move to Cart" : "Not Available"}
                </button>
              </div>
            </div>
          ))}
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
          <a
            href="/category"
            className="px-6 md:px-8 py-2.5 md:py-3 text-white font-semibold rounded-3xl transition-all hover:opacity-90"
            style={{ backgroundColor: MAROON }}
          >
            Continue Shopping
          </a>
        </div>
      )}
    </div>
  );
}
