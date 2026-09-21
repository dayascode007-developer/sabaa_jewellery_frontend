import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getOrderTrackingApi,
  getTrackingByPurchaseIdApi,
} from "../api/trackingApi";

export const fetchOrderTracking = createAsyncThunk(
  "tracking/fetchOrderTracking",
  async (orderId, { rejectWithValue }) => {
    try {
      const tracking = await getOrderTrackingApi(orderId);
      return tracking;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTrackingByPurchaseId = createAsyncThunk(
  "tracking/fetchTrackingByPurchaseId",
  async (purchaseId, { rejectWithValue }) => {
    try {
      const tracking = await getTrackingByPurchaseIdApi(purchaseId);
      return tracking;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  tracking: null,
  loading: false,
  error: null,
  lastFetch: null,
};

const trackingSlice = createSlice({
  name: "tracking",
  initialState,
  reducers: {
    clearTracking: (state) => {
      state.tracking = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch order tracking
    builder
      .addCase(fetchOrderTracking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderTracking.fulfilled, (state, action) => {
        state.loading = false;
        state.tracking = action.payload;
        state.lastFetch = new Date().toISOString();
      })
      .addCase(fetchOrderTracking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch tracking by purchase ID
    builder
      .addCase(fetchTrackingByPurchaseId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrackingByPurchaseId.fulfilled, (state, action) => {
        state.loading = false;
        state.tracking = action.payload;
        state.lastFetch = new Date().toISOString();
      })
      .addCase(fetchTrackingByPurchaseId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearTracking } = trackingSlice.actions;

// Selectors
export const selectTracking = (state) => state.tracking?.tracking;
export const selectTrackingLoading = (state) => state.tracking?.loading;
export const selectTrackingError = (state) => state.tracking?.error;
export const selectLastFetch = (state) => state.tracking?.lastFetch;

export default trackingSlice.reducer;
