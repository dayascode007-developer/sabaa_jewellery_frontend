import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getWishlistApi,
  addToWishlistApi,
  removeFromWishlistApi,
} from "@/store/api/wishlistApi";

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const items = await getWishlistApi();
      return items;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      const item = await addToWishlistApi(productId);

      if (!item) {
        return {
          product_id: productId,
          id: productId,
        };
      }

      return {
        ...item,
        product_id: item.product_id || productId,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      await removeFromWishlistApi(productId);
      return productId;
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

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // Toggle rather than add, so the heart on a card is a single control.
    toggleItem: (state, action) => {
      const incoming = action.payload;
      const index = state.items.findIndex((item) => item.product_id === incoming.id);
      if (index >= 0) {
        state.items.splice(index, 1);
        return;
      }
      state.items.push({
        product_id: incoming.id,
        title: incoming.title,
        price: incoming.price,
      });
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.product_id !== action.payload);
    },
    clearWishlist: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    // Fetch Wishlist
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Add to Wishlist
    builder
      .addCase(addToWishlist.pending, (state) => {
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        const productId = action.payload?.product_id || action.payload?.id;
        const exists = state.items.some(
          (item) => item?.product_id === productId || item?.id === productId
        );
        if (!exists && productId) {
          state.items.push(action.payload);
        }
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.error = action.payload;
      });

    // Remove from Wishlist
    builder
      .addCase(removeFromWishlist.pending, (state) => {
        state.error = null;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item?.product_id !== action.payload && item?.id !== action.payload
        );
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { toggleItem, removeItem, clearWishlist } = wishlistSlice.actions;

export const selectWishlistItems = (state) => state.wishlist.items || [];
export const selectWishlistCount = (state) => (state.wishlist.items || []).length;
export const selectIsWishlisted = (id) => (state) =>
  (state.wishlist.items || []).some((item) => item?.product_id === id || item?.id === id);

export default wishlistSlice.reducer;
