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
