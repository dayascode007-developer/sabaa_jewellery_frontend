const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("authToken");
};

export const createOrderApi = async (orderData) => {
  const token = getToken();

  if (!token) {
    throw new Error("Authentication required. Please login first.");
  }

  const response = await fetch(`${API_URL}/api/customer/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create order");
  }

  const data = await response.json();
  return data.data;
};

export const getOrderApi = async (orderId) => {
  const token = getToken();

  if (!token) {
    throw new Error("Authentication required. Please login first.");
  }

  const response = await fetch(`${API_URL}/api/customer/orders/${orderId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch order");
  }

  const data = await response.json();
  return data.data;
};

export const getOrdersApi = async (limit = 10, offset = 0, search = "") => {
  const token = getToken();

  if (!token) {
    throw new Error("Authentication required. Please login first.");
  }

  let url = `${API_URL}/api/customer/orders?limit=${limit}&offset=${offset}`;
  if (search && search.trim()) {
    url += `&search=${encodeURIComponent(search)}`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch orders");
  }

  const data = await response.json();
  // Return both data and pagination metadata
  return {
    data: data.data,
    pagination: data.pagination,
  };
};

export const getOrderItemsApi = async (orderId) => {
  const token = getToken();

  if (!token) {
    throw new Error("Authentication required. Please login first.");
  }

  const response = await fetch(
    `${API_URL}/api/customer/orders/${orderId}/items`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch order items");
  }

  const data = await response.json();
  return data.data;
};

export const getOrderTrackingApi = async (orderId) => {
  const token = getToken();

  if (!token) {
    throw new Error("Authentication required. Please login first.");
  }

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

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch order tracking");
  }

  const data = await response.json();
  return data.data;
};
