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

    const toLink = (node) => ({
      label: node.name,
      href: `/category/${toSlug(node.name)}`,
    });

    // Three levels: category -> sub_main_categories -> subcategories.
    //
    // A sub-main that has children becomes a group — one row in the menu that
    // opens its children beside it. A sub-main with none is a plain link.
    // Emitted in API order, so the admin panel decides the order of the menu.
    //
    // This replaces the old guesswork: the previous payload put every child
    // flat on the category and the menu split them by POSITION — first three
    // on the left, everything after under a hardcoded "GOD SYMBOL RINGS" — so
    // anything added later was mis-filed. The grouping is real data now.
    const subMains = apiCategory.sub_main_categories || [];
    const legacySubs = apiCategory.subcategories || [];
    const columns = [];

    if (subMains.length > 0) {
      subMains.forEach((subMain) => {
        const children = subMain.subcategories || [];
        columns.push(
          children.length > 0
            ? { heading: subMain.name, items: children.map(toLink) }
            : { items: [toLink(subMain)] }
        );
      });
    } else if (legacySubs.length > 0) {
      // Older payloads, where the children hung straight off the category.
      columns.push({ items: legacySubs.map(toLink) });
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

/**
 * Products for one branch of the three-level tree.
 *
 *   main only              every product in the category
 *   main + submain         one sub-main
 *   main + submain + sub   one third-level subcategory
 *
 * The parameter is `submain`, not `sub` — this used to send the sub-main's id
 * as `sub`, which is the third level's parameter.
 */
export const fetchProductsByCategory = async (
  mainCategoryId,
  subMainCategoryId,
  subCategoryId
) => {
  const params = new URLSearchParams({ main: mainCategoryId });
  if (subMainCategoryId) params.set("submain", subMainCategoryId);
  if (subCategoryId) params.set("sub", subCategoryId);

  const response = await fetch(
    `${API_URL}/api/products/categories-with-products?${params}`
  );
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
