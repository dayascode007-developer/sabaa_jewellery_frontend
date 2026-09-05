const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/**
 * The flat product list — every piece in the shop, paginated.
 *
 * GET /api/products?limit=&offset=
 *
 * Returns { products, total, limit, offset }. `pagination.total` arrives as a
 * string ("5"), so it is converted here rather than in every caller.
 */
export const fetchAllProductsApi = async ({ limit = 20, offset = 0 } = {}) => {
  const response = await fetch(
    `${API_URL}/api/products?limit=${limit}&offset=${offset}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch products");
  }

  return {
    products: data.data ?? [],
    total: Number(data.pagination?.total ?? 0),
    limit: Number(data.pagination?.limit ?? limit),
    offset: Number(data.pagination?.offset ?? offset),
  };
};
