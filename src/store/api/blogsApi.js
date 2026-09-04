const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const fetchBlogsApi = async ({ limit = 10, offset = 0 } = {}) => {
  const response = await fetch(`${API_URL}/api/blogs?limit=${limit}&offset=${offset}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch blogs");
  }

  return data.data;
};

export const fetchBlogByIdApi = async (id) => {
  const response = await fetch(`${API_URL}/api/blogs/${id}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch blog");
  }

  return data.data;
};
