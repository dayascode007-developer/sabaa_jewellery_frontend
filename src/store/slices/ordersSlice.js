import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOrdersApi } from "../api/ordersApi";

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async ({ limit = 10, offset = 0, search = "" } = {}, { rejectWithValue }) => {
    try {
      const data = await getOrdersApi(limit, offset, search);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  list: [],
  pagination: {
    total: 0,
    limit: 10,
    offset: 0,
    count: 0,
    hasMore: false,
  },
  loading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearOrderError: (state) => {
      state.error = null;
    },
    resetOrders: (state) => {
      state.list = [];
      state.pagination = initialState.pagination;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        // API returns { data, pagination } structure
        if (action.payload && action.payload.data) {
          state.list = action.payload.data;
          if (action.payload.pagination) {
            state.pagination = action.payload.pagination;
          }
        } else if (Array.isArray(action.payload)) {
          state.list = action.payload;
        }
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderError, resetOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
