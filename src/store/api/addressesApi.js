const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("authToken");
};

export const fetchAddressesApi = async () => {
  const token = getToken();

  if (!token) {
    throw new Error("Authentication required. Please login first.");
  }

  const response = await fetch(`${API_URL}/api/customer/addresses`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch addresses");
  }

  return data.data;
};

export const createAddressApi = async (addressData) => {
  const token = getToken();

  if (!token) {
    throw new Error("Authentication required. Please login first.");
  }

  const response = await fetch(`${API_URL}/api/customer/addresses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(addressData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create address");
  }

  return data.data;
};

export const updateAddressApi = async (addressId, addressData) => {
  const token = getToken();

  if (!token) {
    throw new Error("Authentication required. Please login first.");
  }

  const response = await fetch(`${API_URL}/api/customer/addresses/${addressId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(addressData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update address");
  }

  return data.data;
};

export const deleteAddressApi = async (addressId) => {
  const token = getToken();

  if (!token) {
    throw new Error("Authentication required. Please login first.");
  }

  const response = await fetch(`${API_URL}/api/customer/addresses/${addressId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete address");
  }

  return data.data;
};

export const setDefaultAddressApi = async (addressId) => {
  const token = getToken();

  if (!token) {
    throw new Error("Authentication required. Please login first.");
  }

  const response = await fetch(`${API_URL}/api/customer/addresses/${addressId}/default`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to set default address");
  }

  return data.data;
};
