const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://192.168.29.163:5000";

const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("authToken");
};

export const submitReviewApi = async (orderId, productId, customerName, rating, reviewTitle, reviewText, userImgFile = null) => {
  const token = getToken();
  if (!token) throw new Error("Authentication required");

  const formData = new FormData();
  formData.append("orderId", orderId);

  // MULTI-PRODUCT SUPPORT: Send productIds as comma-separated string for easier parsing
  if (Array.isArray(productId)) {
    formData.append("productIds", productId.join(","));
  } else {
    formData.append("productId", productId);
  }

  formData.append("customerName", customerName);
  formData.append("rating", rating);
  formData.append("reviewTitle", reviewTitle);
  formData.append("reviewText", reviewText);

  if (userImgFile) {
    formData.append("review-user-img", userImgFile);
  }

  console.log("📤 Submitting review with:", { orderId, productId, customerName });

  const response = await fetch(`${API_URL}/api/customer/reviews/submit`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to submit review");
  }

  return data.data;
};

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
