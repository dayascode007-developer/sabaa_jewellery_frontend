import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { validateCouponApi, applyCouponApi, getCouponUsageHistoryApi } from "../api/couponApi";

export const validateCoupon = createAsyncThunk(
  "coupon/validate",
  async ({ code, cartTotal }, { rejectWithValue }) => {
    try {
      const data = await validateCouponApi(code, cartTotal);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const applyCoupon = createAsyncThunk(
  "coupon/apply",
  async ({ couponId, discountAmount, orderId }, { rejectWithValue }) => {
    try {
      const data = await applyCouponApi(couponId, discountAmount, orderId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getCouponUsageHistory = createAsyncThunk(
  "coupon/getUsageHistory",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getCouponUsageHistoryApi();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  applied: null,
  loading: false,
  error: null,
  usageHistory: [],
  historyLoading: false,
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    clearCoupon: (state) => {
      state.applied = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Validate coupon
      .addCase(validateCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(validateCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.applied = {
          couponId: action.payload.couponId,
          code: action.payload.code,
          description: action.payload.description,
          discountType: action.payload.discountType,
          discountValue: action.payload.discountValue,
          discountAmount: action.payload.discountAmount,
          finalTotal: action.payload.finalTotal,
          minPurchase: action.payload.minPurchase,
        };
        state.error = null;
      })
      .addCase(validateCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.applied = null;
      })

      // Apply coupon
      .addCase(applyCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(applyCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get usage history
      .addCase(getCouponUsageHistory.pending, (state) => {
        state.historyLoading = true;
      })
      .addCase(getCouponUsageHistory.fulfilled, (state, action) => {
        state.historyLoading = false;
        state.usageHistory = action.payload.usages || [];
      })
      .addCase(getCouponUsageHistory.rejected, (state) => {
        state.historyLoading = false;
      });
  },
});

export const { clearCoupon } = couponSlice.actions;

export const selectAppliedCoupon = (state) => state.coupon.applied;
export const selectCouponLoading = (state) => state.coupon.loading;
export const selectCouponError = (state) => state.coupon.error;
export const selectCouponUsageHistory = (state) => state.coupon.usageHistory;
export const selectHistoryLoading = (state) => state.coupon.historyLoading;

export default couponSlice.reducer;
