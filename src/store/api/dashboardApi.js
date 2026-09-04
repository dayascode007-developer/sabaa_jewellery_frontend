const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const editProfileApi = async (profileData) => {
  const token = localStorage.getItem("authToken");

  const response = await fetch(`${API_URL}/api/customer/profile/edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update profile");
  }

  return data.data;
};
