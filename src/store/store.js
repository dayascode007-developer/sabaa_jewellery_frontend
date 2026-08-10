import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";

// A new store is created per request so server-rendered pages never share state
// between users. Register additional slice reducers here as you add them.
export const makeStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
    },
  });
