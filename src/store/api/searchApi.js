const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const searchProductsApi = async (query, limit = 12) => {
  try {
    const response = await fetch(
      `${API_URL}/api/products?search=${encodeURIComponent(query)}&limit=${limit}&offset=0`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Search failed");
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Search API error:", error);
    throw error;
  }
};

export const getTrendingProductsApi = async (limit = 6) => {
  try {
    const response = await fetch(
      `${API_URL}/api/products?limit=${limit}&offset=0`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch trending products");
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Trending products API error:", error);
    throw error;
  }
};
