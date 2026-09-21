const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://192.168.29.163:5000";

const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("authToken");
};

// Get tracking by order ID (authenticated)
export const getOrderTrackingApi = async (orderId) => {
  const token = getToken();
  if (!token) throw new Error("Authentication required");

  const response = await fetch(
    `${API_URL}/api/customer/orders/${orderId}/tracking`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch tracking");
  }

  return data.data;
};

// Get tracking by purchase ID (public - no auth needed)
export const getTrackingByPurchaseIdApi = async (purchaseId) => {
  const response = await fetch(
    `${API_URL}/api/shipment/track/public/${purchaseId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch tracking");
  }

  return data.data;
};
