import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { submitReviewApi, fetchProductReviewsApi } from "../api/reviewsApi";

export const submitReview = createAsyncThunk(
  "reviews/submitReview",
  async ({ orderId, productId, rating, reviewTitle, reviewText }, { rejectWithValue }) => {
    try {
      const result = await submitReviewApi(orderId, productId, rating, reviewTitle, reviewText);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductReviews = createAsyncThunk(
  "reviews/fetchProductReviews",
  async ({ productId, limit = 10, offset = 0 }, { rejectWithValue }) => {
    try {
      const result = await fetchProductReviewsApi(productId, limit, offset);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isModalOpen: false,
  selectedProduct: null,
  selectedOrderId: null,
  submitting: false,
  error: null,
  success: false,
  reviews: [],
  pagination: { limit: 10, offset: 0, total: 0 },
  ratingStats: { average_rating: 0, total_reviews: 0 },
  loading: false,
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    openReviewModal: (state, action) => {
      state.isModalOpen = true;
      state.selectedProduct = action.payload.product;
      state.selectedOrderId = action.payload.orderId;
      state.error = null;
      state.success = false;
    },
    closeReviewModal: (state) => {
      state.isModalOpen = false;
      state.selectedProduct = null;
      state.selectedOrderId = null;
      state.error = null;
      state.success = false;
      state.submitting = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Submit Review
      .addCase(submitReview.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitReview.fulfilled, (state) => {
        state.submitting = false;
        state.success = true;
      })
      .addCase(submitReview.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
      })

      // Fetch Product Reviews
      .addCase(fetchProductReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.reviews || [];
        state.pagination = action.payload.pagination || {};
        state.ratingStats = action.payload.ratingStats || {};
      })
      .addCase(fetchProductReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { openReviewModal, closeReviewModal, clearError } = reviewsSlice.actions;

export const selectIsModalOpen = (state) => state.reviews?.isModalOpen || false;
export const selectSelectedProduct = (state) => state.reviews?.selectedProduct || null;
export const selectSelectedOrderId = (state) => state.reviews?.selectedOrderId || null;
export const selectReviewSubmitting = (state) => state.reviews?.submitting || false;
export const selectReviewError = (state) => state.reviews?.error || null;
export const selectProductReviews = (state) => state.reviews?.reviews || [];
export const selectReviewsLoading = (state) => state.reviews?.loading || false;
export const selectReviewsPagination = (state) => state.reviews?.pagination || { limit: 10, offset: 0, total: 0 };
export const selectRatingStats = (state) => state.reviews?.ratingStats || { average_rating: 0, total_reviews: 0 };

export default reviewsSlice.reducer;
