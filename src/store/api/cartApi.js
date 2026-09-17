const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("authToken");
};

// Transform snake_case fields from DB to camelCase for frontend
const transformCartItem = (item) => ({
  ...item,
  size: item.ring_size || item.size,
  ringName: item.ring_name || item.ringName,
  fontId: item.font_id || item.fontId,
  symbolId: item.symbol_id || item.symbolId,
  symbolSide: item.symbol_side || item.symbolSide,
});

export const addToCartApi = async (cartItem) => {
  const token = getToken();

  if (!token) throw new Error("Authentication required");

  // If there's a photo file, send FormData; otherwise send JSON
  const hasPhoto = cartItem.customerPhoto instanceof File;

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  let body;
  if (hasPhoto) {
    // FormData - don't set Content-Type header; browser will set it with boundary
    const formData = new FormData();
    formData.append("id", cartItem.id);
    formData.append("title", cartItem.title);
    formData.append("price", cartItem.price);
    formData.append("image", cartItem.image);
    formData.append("sku", cartItem.sku);
    formData.append("quantity", cartItem.quantity);
    if (cartItem.size) formData.append("size", cartItem.size);
    if (cartItem.ringName) formData.append("ringName", cartItem.ringName);
    if (cartItem.fontId) formData.append("fontId", cartItem.fontId);
    if (cartItem.symbolId) formData.append("symbolId", cartItem.symbolId);
    if (cartItem.symbolSide) formData.append("symbolSide", cartItem.symbolSide);
    if (cartItem.colorId) formData.append("colorId", cartItem.colorId);
    formData.append("customer_photo", cartItem.customerPhoto);
    body = formData;
  } else {
    // JSON
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(cartItem);
  }

  const response = await fetch(`${API_URL}/api/customer/cart`, {
    method: "POST",
    headers,
    body,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to add to cart");
  }

  return data;
};

export const getCartApi = async () => {
  const token = getToken();
  if (!token) return [];

  const response = await fetch(`${API_URL}/api/customer/cart`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  console.log("📦 GET Cart API Response:", data);

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch cart");
  }

  const items = (data.data?.items || []).map(transformCartItem);
  console.log(`✅ Cart fetched: ${items.length} items`, items);
  return items;
};

export const updateCartQuantityApi = async (productId, quantity) => {
  const token = getToken();
  if (!token) throw new Error("Authentication required");

  const response = await fetch(`${API_URL}/api/customer/cart/${productId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ quantity }),
  });

  const data = await response.json();

  console.log(`📊 Update Quantity Response:`, data);

  if (!response.ok) {
    throw new Error(data.message || "Failed to update quantity");
  }

  const item = data.data ? transformCartItem(data.data) : null;
  console.log(`✅ Quantity updated successfully`);
  return item;
};

export const removeFromCartApi = async (productId) => {
  const token = getToken();
  if (!token) throw new Error("Authentication required");

  console.log(`🗑️ Removing product ${productId} from cart`);

  const response = await fetch(`${API_URL}/api/customer/cart/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    console.error(`❌ Failed to remove from cart:`, data.message);
    throw new Error(data.message || "Failed to remove from cart");
  }

  console.log(`✅ Item removed successfully`);
  return data;
};

export const clearCartApi = async () => {
  const token = getToken();
  if (!token) throw new Error("Authentication required");

  console.log(`🧹 Clearing entire cart`);

  const response = await fetch(`${API_URL}/api/customer/cart`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    console.error(`❌ Failed to clear cart:`, data.message);
    throw new Error(data.message || "Failed to clear cart");
  }

  console.log(`✅ Cart cleared successfully`);
  return data;
};
