const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const fetchSettingsApi = async () => {
  const response = await fetch(`${API_URL}/api/settings/shipping`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch settings");
  }

  return data.data;
};

// Fetch dynamic shipping rates from Shiprocket based on destination pincode
export const fetchShippingRatesApi = async (toPincode, weight = 0.5, paymentMethod = "cod") => {
  if (!toPincode) {
    throw new Error("Destination pincode is required");
  }

  const params = new URLSearchParams({
    toPincode,
    weight,
    paymentMethod,
  });

  const response = await fetch(`${API_URL}/api/settings/shipping-rates?${params}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch shipping rates");
  }

  return data.data;
};

// Validate pincode against Shiprocket serviceability
export const validatePincodeApi = async (pincode) => {
  if (!pincode) {
    return { valid: false, message: "Pincode is required" };
  }

  const params = new URLSearchParams({ pincode });

  const response = await fetch(`${API_URL}/api/settings/validate-pincode?${params}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};
