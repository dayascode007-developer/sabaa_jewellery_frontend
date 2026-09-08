import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCartApi, addToCartApi, removeFromCartApi, updateCartQuantityApi, clearCartApi } from "@/store/api/cartApi";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const items = await getCartApi();
      return items;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (cartItem, { rejectWithValue }) => {
    try {
      const response = await addToCartApi(cartItem);
      console.log("✅ addToCart response:", response);
      return response.data || cartItem;
    } catch (error) {
      console.error("❌ addToCart error:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, { rejectWithValue }) => {
    try {
      await removeFromCartApi(productId);
      return productId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await updateCartQuantityApi(productId, quantity);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      await clearCartApi();
      return [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Local add for instant UI feedback (deprecated - use async thunk)
    addItem: (state, action) => {
      const incoming = action.payload;
      const existing = state.items.find((item) => item.id === incoming.id);
      if (existing) {
        existing.quantity += incoming.quantity ?? 1;
        return;
      }
      state.items.push({ ...incoming, quantity: incoming.quantity ?? 1 });
    },
    setQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.id !== id);
        return;
      }
      const existing = state.items.find((item) => item.id === id);
      if (existing) existing.quantity = quantity;
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCartLocal: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    // Fetch Cart
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload;
        state.items = Array.isArray(payload) ? payload : (payload?.items || []);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.items = [];
      });

    // Add to Cart
    builder
      .addCase(addToCart.pending, (state) => {
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const productId = action.payload?.product_id || action.payload?.id;
        const exists = state.items.some(
          (item) => item?.product_id === productId || item?.id === productId
        );
        if (!exists && productId) {
          state.items.push(action.payload);
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.payload;
      });

    // Remove from Cart
    builder
      .addCase(removeFromCart.pending, (state) => {
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item?.product_id !== action.payload && item?.id !== action.payload
        );
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.error = action.payload;
      });

    // Update Quantity
    builder
      .addCase(updateCartQuantity.pending, (state) => {
        state.error = null;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        const item = state.items.find(
          (i) => i?.product_id === action.payload?.product_id || i?.id === action.payload?.id
        );
        if (item) {
          item.quantity = action.payload.quantity;
        }
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.error = action.payload;
      });

    // Clear Cart
    builder
      .addCase(clearCart.pending, (state) => {
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { addItem, setQuantity, removeItem, clearCartLocal } = cartSlice.actions;

export const selectCartItems = (state) => {
  const items = state.cart.items;
  return Array.isArray(items) ? items : [];
};

export const selectCartCount = (state) => {
  const items = state.cart.items;
  if (!Array.isArray(items)) return 0;
  return items.reduce((total, item) => total + (item?.quantity || 0), 0);
};

export const selectCartSubtotal = (state) => {
  const items = state.cart.items;
  if (!Array.isArray(items)) return 0;
  return items.reduce((total, item) => total + ((item?.price || 0) * (item?.quantity || 0)), 0);
};

export default cartSlice.reducer;
