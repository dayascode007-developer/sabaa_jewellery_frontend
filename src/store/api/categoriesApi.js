const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Generate slug from name: "Name Engrave Ring" → "name-engrave-ring"
const toSlug = (name) =>
  name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/&/g, "")
    .replace(/--+/g, "-");

export const fetchCategoriesFromAPI = async () => {
  const response = await fetch(`${API_URL}/api/categories`);
  if (!response.ok) throw new Error("Failed to fetch categories");
  const { data } = await response.json();
  return data || [];
};

// Merge API categories with existing NAV_ITEMS structure (keeps icons, features, promos)
export const mergeWithNavItems = (apiCategories, staticNavItems) => {
  return staticNavItems.map((navItem) => {
    // Find matching API category by name
    const apiCategory = apiCategories.find(
      (cat) => cat.name.toLowerCase() === navItem.label.toLowerCase()
    );

    if (!apiCategory || !navItem.menu) {
      return navItem; // Return unchanged if no API match
    }

    // Update only the menu items/links from API, keep everything else
    const subcategories = apiCategory.subcategories || [];
    const columns = [];

    if (subcategories.length > 0) {
      // First column: first 3 items
      columns.push({
        items: subcategories.slice(0, 3).map((sub) => ({
          label: sub.name,
          href: `/category/${toSlug(sub.name)}`,
        })),
      });

      // Second column: remaining items with heading (if any)
      if (subcategories.length > 3) {
        columns.push({
          heading: navItem.menu.columns[1]?.heading || "GOD SYMBOL RINGS",
          items: subcategories.slice(3).map((sub) => ({
            label: sub.name,
            href: `/category/${toSlug(sub.name)}`,
          })),
        });
      }
    }

    return {
      ...navItem,
      menu:
        columns.length > 0
          ? {
              ...navItem.menu,
              columns,
            }
          : navItem.menu,
    };
  });
};

export const fetchProductsByCategory = async (
  mainCategoryId,
  subCategoryId
) => {
  const url = subCategoryId
    ? `${API_URL}/api/products/categories-with-products?main=${mainCategoryId}&sub=${subCategoryId}`
    : `${API_URL}/api/products/categories-with-products?main=${mainCategoryId}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch products");
  const { data } = await response.json();
  return data || [];
};

export const fetchProductById = async (productId) => {
  const response = await fetch(`${API_URL}/api/products/${productId}`);
  if (!response.ok) throw new Error("Product not found");
  const { data } = await response.json();
  return data;
};
