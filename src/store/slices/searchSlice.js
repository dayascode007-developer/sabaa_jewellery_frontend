import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchProductsApi, getTrendingProductsApi } from "../api/searchApi";

export const searchProducts = createAsyncThunk(
  "search/searchProducts",
  async (query, { rejectWithValue }) => {
    try {
      if (!query.trim()) {
        return [];
      }
      const data = await searchProductsApi(query);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getTrendingProducts = createAsyncThunk(
  "search/getTrendingProducts",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getTrendingProductsApi();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  searchQuery: "",
  searchResults: [],
  trendingProducts: [],
  loading: false,
  trendingLoading: false,
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearSearch: (state) => {
      state.searchQuery = "";
      state.searchResults = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.searchResults = [];
      })
      .addCase(getTrendingProducts.pending, (state) => {
        state.trendingLoading = true;
      })
      .addCase(getTrendingProducts.fulfilled, (state, action) => {
        state.trendingLoading = false;
        state.trendingProducts = action.payload;
      })
      .addCase(getTrendingProducts.rejected, (state) => {
        state.trendingLoading = false;
        state.trendingProducts = [];
      });
  },
});

export const { setSearchQuery, clearSearch } = searchSlice.actions;

export const selectSearchQuery = (state) => state.search.searchQuery;
export const selectSearchResults = (state) => state.search.searchResults;
export const selectTrendingProducts = (state) => state.search.trendingProducts;
export const selectSearchLoading = (state) => state.search.loading;
export const selectTrendingLoading = (state) => state.search.trendingLoading;

export default searchSlice.reducer;
