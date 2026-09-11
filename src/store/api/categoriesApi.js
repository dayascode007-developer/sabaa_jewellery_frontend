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

// Build navbar items from API categories, merging with static NAV_ITEMS for icons/features
export const mergeWithNavItems = (apiCategories, staticNavItems) => {
  // Keep "All Jewellery" (first item) and "More" (last item) static
  const allJewellery = staticNavItems.find((item) => item.id === "all");
  const more = staticNavItems.find((item) => item.id === "more");

  const toLink = (node) => ({
    label: node.name,
    href: `/category/${toSlug(node.name)}`,
  });

  // Build dynamic items from API categories
  const dynamicItems = apiCategories.map((apiCategory) => {
    // Find static nav item for this category (for icons, images, features)
    const staticItem = staticNavItems.find(
      (item) => item.label.toLowerCase() === apiCategory.name.toLowerCase()
    );

    // Three levels: category -> sub_main_categories -> subcategories.
    //
    // A sub-main that has children becomes a group — one row in the menu that
    // opens its children beside it. A sub-main with none is a plain link.
    // Emitted in API order, so the admin panel decides the order of the menu.
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

    // Build nav item from API, merge in static properties (icons, images, etc)
    return {
      id: apiCategory.name.toLowerCase().replace(/\s+/g, "-"),
      label: apiCategory.name,
      href: `/category/${toSlug(apiCategory.name)}`,
      icon: staticItem?.icon,
      ...(columns.length > 0 && staticItem?.menu && {
        menu: {
          ...staticItem.menu,
          columns,
        },
      }),
    };
  });

  // Combine: All Jewellery + Dynamic API categories + More
  return [
    ...(allJewellery ? [allJewellery] : []),
    ...dynamicItems,
    ...(more ? [more] : []),
  ];
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
