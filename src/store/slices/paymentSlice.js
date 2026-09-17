import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createRazorpayOrderApi, verifyPaymentApi } from "../api/razorpayApi";
import { createOrderApi } from "../api/ordersApi";

export const createRazorpayOrder = createAsyncThunk(
  "payment/createRazorpayOrder",
  async (amount, { rejectWithValue }) => {
    try {
      const data = await createRazorpayOrderApi(amount);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const verifyPayment = createAsyncThunk(
  "payment/verifyPayment",
  async ({ razorpayOrderId, razorpayPaymentId, razorpaySignature }, { rejectWithValue }) => {
    try {
      const data = await verifyPaymentApi(razorpayOrderId, razorpayPaymentId, razorpaySignature);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createOrder = createAsyncThunk(
  "payment/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const data = await createOrderApi(orderData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  razorpayOrder: null,
  paymentVerified: false,
  order: null,
  loading: false,
  error: null,
  razorpayLoading: false,
  razorpayError: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    clearPaymentError: (state) => {
      state.error = null;
      state.razorpayError = null;
    },
    clearPayment: (state) => {
      state.razorpayOrder = null;
      state.paymentVerified = false;
      state.order = null;
      state.error = null;
      state.razorpayError = null;
    },
    clearOrderConfirmation: (state) => {
      state.order = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Razorpay Order
      .addCase(createRazorpayOrder.pending, (state) => {
        state.razorpayLoading = true;
        state.razorpayError = null;
      })
      .addCase(createRazorpayOrder.fulfilled, (state, action) => {
        state.razorpayLoading = false;
        state.razorpayOrder = action.payload;
      })
      .addCase(createRazorpayOrder.rejected, (state, action) => {
        state.razorpayLoading = false;
        state.razorpayError = action.payload;
      })

      // Verify Payment
      .addCase(verifyPayment.pending, (state) => {
        console.log("🔄 Payment verification pending...");
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        console.log("✅ Payment verification fulfilled:", action.payload);
        state.loading = false;
        state.paymentVerified = action.payload.verified;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        console.error("❌ Payment verification rejected:", action.payload);
        state.loading = false;
        state.error = action.payload;
        state.paymentVerified = false;
      })

      // Create Order
      .addCase(createOrder.pending, (state) => {
        console.log("🔄 Order creation pending...");
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        console.log("✅ Order created successfully:", action.payload);
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        console.error("❌ Order creation rejected:", action.payload);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPaymentError, clearPayment, clearOrderConfirmation } = paymentSlice.actions;

export const selectRazorpayOrder = (state) => state.payment.razorpayOrder;
export const selectPaymentVerified = (state) => state.payment.paymentVerified;
export const selectOrder = (state) => state.payment.order;
export const selectPaymentLoading = (state) => state.payment.loading;
export const selectPaymentError = (state) => state.payment.error;
export const selectRazorpayLoading = (state) => state.payment.razorpayLoading;
export const selectRazorpayError = (state) => state.payment.razorpayError;

export default paymentSlice.reducer;
