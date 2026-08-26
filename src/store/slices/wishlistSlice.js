import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // Toggle rather than add, so the heart on a card is a single control.
    toggleItem: (state, action) => {
      const incoming = action.payload;
      const index = state.items.findIndex((item) => item.id === incoming.id);
      if (index >= 0) {
        state.items.splice(index, 1);
        return;
      }
      state.items.push(incoming);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const { toggleItem, removeItem, clearWishlist } = wishlistSlice.actions;

export const selectWishlistItems = (state) => state.wishlist.items;
export const selectWishlistCount = (state) => state.wishlist.items.length;
export const selectIsWishlisted = (id) => (state) =>
  state.wishlist.items.some((item) => item.id === id);

export default wishlistSlice.reducer;
