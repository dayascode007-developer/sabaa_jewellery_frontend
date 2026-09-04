const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const fetchBannersFromAPI = async () => {
  try {
    const response = await fetch(`${API_URL}/api/banners`);
    if (!response.ok) {
      throw new Error("Failed to fetch banners");
    }
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching banners:", error);
    return [];
  }
};
