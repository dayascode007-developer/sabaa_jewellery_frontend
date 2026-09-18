import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductReviewsApi } from "../api/productReviewsApi";

export const fetchProductReviews = createAsyncThunk(
  "productReviews/fetchProductReviews",
  async ({ productId, limit = 10, offset = 0 }, { rejectWithValue }) => {
    try {
      const result = await fetchProductReviewsApi(productId, limit, offset);
      return { productId, ...result };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  reviews: {},
  loading: false,
  error: null,
};

const productReviewsSlice = createSlice({
  name: "productReviews",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductReviews.fulfilled, (state, action) => {
        state.loading = false;
        const { productId, reviews, pagination, ratingStats } = action.payload;
        state.reviews[productId] = {
          reviews,
          pagination,
          ratingStats,
        };
      })
      .addCase(fetchProductReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = productReviewsSlice.actions;

// Selectors
export const selectProductReviews = (state, productId) =>
  state.productReviews.reviews[productId]?.reviews || [];
export const selectProductRatingStats = (state, productId) =>
  state.productReviews.reviews[productId]?.ratingStats || {
    average_rating: 0,
    total_reviews: 0,
  };
export const selectProductPagination = (state, productId) =>
  state.productReviews.reviews[productId]?.pagination || {
    limit: 10,
    offset: 0,
    total: 0,
  };
export const selectReviewsLoading = (state) => state.productReviews.loading;
export const selectReviewsError = (state) => state.productReviews.error;

export default productReviewsSlice.reducer;
