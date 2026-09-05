import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductsByCategory } from "@/api/categoriesApi";

export const fetchProductsByMainAndSubCategory = createAsyncThunk(
  "products/fetchByCategory",
  async ({ mainCategoryId, subCategoryId }, { rejectWithValue }) => {
    try {
      const data = await fetchProductsByCategory(mainCategoryId, subCategoryId);
      // Transform API format to match ProductCard interface
      const products = data.flatMap((category) =>
        (category.products || []).map((product) => ({
          id: product.id,
          title: product.title,
          description: product.description,
          category: category.category_name?.toLowerCase().replace(/\s+/g, "-") || "",
          category_id: product.category_id,
          subcategories: product.subcategories || [],

          // Price: convert string to number
          price: parseFloat(product.sale_price) || 0,
          mrp: parseFloat(product.regular_price) || 0,

          // Image
          image: product.main_image || null,
          gallery: [
            product.main_image,
            ...(product.sub_images?.map(img => img.image_url) || [])
          ].filter(Boolean),

          // Code/SKU
          code: product.sku || "",

          // Additional fields
          sizes: product.ring_sizes?.map(rs => rs.size.toString()) || [],
          hasRingSize: (product.ring_sizes?.length || 0) > 0,
          maxQty: product.limit_purchases ? 10 : 99,
          rating: 4,
          bestseller: true,
          sections: [],

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

          // Category/subcategory info
          categoryId: category.category_id,
          categoryName: category.category_name,
          subcategoryId: category.id,
          subcategoryName: category.name,
        }))
      );
      return { mainCategoryId, subCategoryId, products };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  byCategory: {}, // keyed by "mainId-subId"
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
        const key = `${action.payload.mainCategoryId}-${action.payload.subCategoryId}`;
        state.byCategory[key] = action.payload.products;
      })
      .addCase(fetchProductsByMainAndSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectProductsByCategory = (state, mainId, subId) =>
  state?.products?.byCategory?.[`${mainId}-${subId}`] || [];
export const selectProductsLoading = (state) => state?.products?.loading || false;

export default productsSlice.reducer;
