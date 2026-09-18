const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://192.168.29.163:5000";

export const fetchProductReviewsApi = async (productId, limit = 10, offset = 0) => {
  const response = await fetch(
    `${API_URL}/api/customer/reviews/product/${productId}?limit=${limit}&offset=${offset}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch reviews");
  }

  return data.data;
};
