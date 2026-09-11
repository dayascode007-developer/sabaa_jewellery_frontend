const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("authToken");
};

export const validateCouponApi = async (code, cartTotal) => {
  const token = getToken();

  if (!token) {
    throw new Error("Authentication required. Please login first.");
  }

  const response = await fetch(`${API_URL}/api/customer/coupons/validate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      code: code.toUpperCase().trim(),
      cartTotal,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to validate coupon");
  }

  const data = await response.json();
  return data;
};

export const applyCouponApi = async (couponId, discountAmount, orderId) => {
  const token = getToken();

  if (!token) {
    throw new Error("Authentication required. Please login first.");
  }

  const response = await fetch(`${API_URL}/api/customer/coupons/apply`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      couponId,
      discountAmount,
      orderId,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to apply coupon");
  }

  const data = await response.json();
  return data;
};

export const getCouponUsageHistoryApi = async () => {
  const token = getToken();

  if (!token) {
    throw new Error("Authentication required. Please login first.");
  }

  const response = await fetch(`${API_URL}/api/customer/coupons/usage-history`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch coupon history");
  }

  const data = await response.json();
  return data;
};
