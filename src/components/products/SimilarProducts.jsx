"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/products/ProductCard";

const MAROON = "#7B1E2B";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const transformProduct = (apiProduct) => {
  return {
    ...apiProduct,
    price: parseFloat(apiProduct.sale_price) || 0,
    mrp: parseFloat(apiProduct.regular_price) || 0,
    image: apiProduct.main_image || null,
  };
};

export default function SimilarProducts({ product }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        setLoading(true);

        const categoryId = product.category_id;
        const subMainCategoryId = product.sub_main_category_id;
        const subCategoryId = product.subcategories?.[0]?.id;

        if (!categoryId) {
          setProducts([]);
          return;
        }

        let url = `${API_URL}/api/products/categories-with-products?main=${categoryId}`;
        if (subMainCategoryId) {
          url += `&submain=${subMainCategoryId}`;
        } else if (subCategoryId) {
          url += `&sub=${subCategoryId}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch similar products");
        }

        const data = await response.json();
        // Extract products from nested subcategories structure
        const category = data.data?.[0];
        const allProducts = category?.subcategories?.flatMap((sub) => sub.products || []) || [];

        const filtered = allProducts
          .filter((p) => p.id !== product.id)
          .map(transformProduct);

        setProducts(filtered);
      } catch (error) {
        console.error("Failed to fetch similar products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (product?.id) {
      fetchSimilarProducts();
    }
  }, [product?.id, product?.category_id, product?.sub_main_category_id, product?.subcategories]);

  if (loading) {
    return (
      <div className="mt-12 pt-8 border-t border-neutral-200">
        <h2
          className="text-[20px] font-medium md:text-[24px]"
          style={{ color: MAROON }}
        >
          Similar Products
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 md:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square w-full rounded-lg bg-neutral-200" />
              <div className="mt-3 h-4 w-3/4 rounded bg-neutral-200" />
              <div className="mt-2 h-4 w-1/2 rounded bg-neutral-200" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!products.length) return null;

  return (
    <div className="mt-12 pt-8 border-t border-neutral-200">
      <h2
        className="text-[20px] font-medium md:text-[24px]"
        style={{ color: MAROON }}
      >
        Similar Products
      </h2>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 md:grid-cols-4">
        {products.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </div>
  );
}
