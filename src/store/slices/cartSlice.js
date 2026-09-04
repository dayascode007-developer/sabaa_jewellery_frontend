import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const incoming = action.payload;
      const existing = state.items.find((item) => item.id === incoming.id);
      if (existing) {
        existing.quantity += incoming.quantity ?? 1;
        return;
      }
      state.items.push({ ...incoming, quantity: incoming.quantity ?? 1 });
    },
    // The cart page's - / + stepper. Dropping to zero removes the line rather
    // than leaving one nobody is buying.
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
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, setQuantity, removeItem, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartSubtotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

export default cartSlice.reducer;
