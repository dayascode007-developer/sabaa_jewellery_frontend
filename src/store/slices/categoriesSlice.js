import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCategoriesFromAPI,
  fetchProductsByCategory,
  mergeWithNavItems,
} from "@/store/api/categoriesApi";
import { NAV_ITEMS } from "@/constants/homeData";

export const fetchCategories = createAsyncThunk(
  "categories/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const rawData = await fetchCategoriesFromAPI();
      const navItems = mergeWithNavItems(rawData, NAV_ITEMS);
      return { raw: rawData, navItems };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductsByMainCategory = createAsyncThunk(
  "categories/fetchProducts",
  async ({ mainId, subId }, { rejectWithValue }) => {
    try {
      const data = await fetchProductsByCategory(mainId, subId);
      return { mainId, subId, products: data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  raw: [],
  navItems: [],
  products: {},
  loading: false,
  productsLoading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.raw = action.payload.raw;
        state.navItems = action.payload.navItems;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductsByMainCategory.pending, (state) => {
        state.productsLoading = true;
      })
      .addCase(fetchProductsByMainCategory.fulfilled, (state, action) => {
        state.productsLoading = false;
        const key = `${action.payload.mainId}-${action.payload.subId}`;
        state.products[key] = action.payload.products;
      })
      .addCase(fetchProductsByMainCategory.rejected, (state, action) => {
        state.productsLoading = false;
        state.error = action.payload;
      });
  },
});

export const selectNavItems = (state) => state.categories.navItems;
export const selectRawCategories = (state) => state.categories.raw;
export const selectCategoriesLoading = (state) => state.categories.loading;
export const selectProductsByCategory = (state, mainId, subId) =>
  state.categories.products[`${mainId}-${subId}`] || [];
export const selectSubcategoriesById = (state, categoryId) => {
  const category = state.categories.raw.find((c) => c.id === categoryId);
  return category?.subcategories || [];
};

export default categoriesSlice.reducer;
