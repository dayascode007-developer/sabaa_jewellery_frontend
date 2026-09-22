import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductsByCategory } from "@/store/api/categoriesApi";
import { fetchAllProductsApi } from "@/store/api/productsApi";

/**
 * One API product -> the shape ProductCard and ProductDetail expect.
 *
 * Shared by both thunks below. It used to live inline inside the by-category
 * thunk; with a second source of products the two mappings would have drifted,
 * and a card would then behave differently depending on which page you arrived
 * from.
 *
 * The `category` wrapper is optional — the flat /api/products list has no
 * wrapping category object, so the product's own fields are used instead.
 */
export const mapApiProduct = (product, category = null) => ({
  id: product.id,
  title: product.title,
  description: product.description,
  category:
    (category?.category_name || product.category_name || "")
      .toLowerCase()
      .replace(/\s+/g, "-") || "",
  category_id: product.category_id,
  subcategories: product.subcategories || [],

  // Prices arrive as strings ("1500.00").
  price: parseFloat(product.sale_price) || 0,
  mrp: parseFloat(product.regular_price) || 0,

  // Image
  image: product.main_image || null,
  gallery: [
    product.main_image,
    ...(product.sub_images?.map((img) => img.image_url) || []),
  ].filter(Boolean),

  // Code/SKU
  code: product.sku || "",

  // Additional fields
  sizes: product.ring_sizes?.map((rs) => rs.size.toString()) || [],
  hasRingSize: (product.ring_sizes?.length || 0) > 0,
  maxQty: product.limit_purchases ? 10 : 99,
  rating: 4,
  bestseller: true,

  // Engraving/customization data
  fonts: product.fonts || [],
  colors: product.colors || [],
  symbols: product.symbols || [],
  symbol_direction: product.symbol_direction || [],

  // Product details sections
  product_details: product.product_details || [],
  cleaning_polishing: product.cleaning_polishing || [],
  usage_color_guarantee: product.usage_color_guarantee || [],
  return_exchange_policy: product.return_exchange_policy || [],
  address_contact: product.address_contact || [],

  // Build sections array for Accordion component
  sections: [
    {
      id: "product-details",
      title: "Product Details",
      body: product.product_details?.map((pd) => pd.content).join("\n") || "",
    },
    {
      id: "cleaning-polishing",
      title: "Cleaning & Polishing",
      body: product.cleaning_polishing?.map((cp) => cp.content).join("\n") || "",
    },
    {
      id: "usage-color-guarantee",
      title: "Usage & Color Gaurantee",
      body: product.usage_color_guarantee?.map((ucg) => ucg.content).join("\n") || "",
    },
    {
      id: "return-exchange-policy",
      title: "Return & Exchange Policy",
      body: product.return_exchange_policy?.map((rep) => rep.content).join("\n") || "",
    },
    {
      id: "address-contact",
      title: "Our Address & Contact",
      body: product.address_contact?.map((ac) => ac.content).join("\n") || "",
    },
  ].filter((section) => section.body.trim() !== ""),

  // Category/subcategory info
  categoryId: category?.category_id ?? product.category_id,
  categoryName: category?.category_name ?? product.category_name ?? "",
  subcategoryId: category?.id ?? product.subcategories?.[0]?.id,
  subcategoryName: category?.name ?? product.subcategories?.[0]?.name ?? "",
});

export const fetchProductsByMainAndSubCategory = createAsyncThunk(
  "products/fetchByCategory",
  async (
    { mainCategoryId, subMainCategoryId, subCategoryId },
    { rejectWithValue }
  ) => {
    try {
      const data = await fetchProductsByCategory(
        mainCategoryId,
        subMainCategoryId,
        subCategoryId
      );
      const products = data.flatMap((category) => {
        // Extract products from nested subcategories structure
        const subcats = category.subcategories || [];
        return subcats.flatMap((subcat) =>
          (subcat.products || []).map((product) => mapApiProduct(product, category))
        );
      });
      return { mainCategoryId, subMainCategoryId, subCategoryId, products };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * The whole catalogue, for the "All Jewellery" page. Paginated: an offset above
 * zero appends to what is already loaded rather than replacing it, so "Load
 * More" grows the grid instead of swapping it.
 */
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async ({ limit = 20, offset = 0 } = {}, { rejectWithValue }) => {
    try {
      const { products, total } = await fetchAllProductsApi({ limit, offset });
      return { products: products.map((p) => mapApiProduct(p)), total, offset };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  byCategory: {}, // keyed by "mainId-subId"
  // The flat catalogue behind /category/all-jewellery.
  all: { items: [], total: 0, loading: false, error: null },
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByMainAndSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByMainAndSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        // Keyed by all three levels — a sub-main and one of its children are
        // different result sets and must not share a cache slot.
        const { mainCategoryId, subMainCategoryId, subCategoryId } = action.payload;
        const key = `${mainCategoryId}-${subMainCategoryId ?? ""}-${subCategoryId ?? ""}`;
        state.byCategory[key] = action.payload.products;
      })
      .addCase(fetchProductsByMainAndSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchAllProducts.pending, (state) => {
        state.all.loading = true;
        state.all.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        const { products, total, offset } = action.payload;
        state.all.loading = false;
        state.all.total = total;
        // offset 0 is a fresh load; anything else is a further page of the same
        // list, appended. Ids are de-duplicated so a repeated dispatch — React
        // Strict Mode runs effects twice in development — cannot print the same
        // product twice.
        const merged = offset === 0 ? products : [...state.all.items, ...products];
        const seen = new Set();
        state.all.items = merged.filter((p) => {
          if (seen.has(p.id)) return false;
          seen.add(p.id);
          return true;
        });
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.all.loading = false;
        state.all.error = action.payload;
      });
  },
});

export const selectProductsByCategory = (state, mainId, subMainId, subId) =>
  state?.products?.byCategory?.[
    `${mainId}-${subMainId ?? ""}-${subId ?? ""}`
  ] || [];
export const selectProductsLoading = (state) =>
  state?.products?.loading || false;

export const selectAllProducts = (state) => state?.products?.all?.items || [];
export const selectAllProductsTotal = (state) => state?.products?.all?.total || 0;
export const selectAllProductsLoading = (state) =>
  state?.products?.all?.loading || false;

export default productsSlice.reducer;
