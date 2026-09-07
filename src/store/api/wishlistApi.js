const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("authToken");
};

export const getWishlistApi = async () => {
  const token = getToken();
  if (!token) return { data: [] };

  const response = await fetch(`${API_URL}/api/customer/wishlist`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch wishlist");
  }

  return data.data || [];
};

export const addToWishlistApi = async (productId) => {
  const token = getToken();
  if (!token) throw new Error("Authentication required");

  const response = await fetch(`${API_URL}/api/customer/wishlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to add to wishlist");
  }

  return data.data;
};

export const removeFromWishlistApi = async (productId) => {
  const token = getToken();
  if (!token) throw new Error("Authentication required");

  const response = await fetch(`${API_URL}/api/customer/wishlist/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to remove from wishlist");
  }

  return data.data;
};
