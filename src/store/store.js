import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import wishlistReducer from "./slices/wishlistSlice";
import authReducer from "./slices/authSlice";
import unboxingReducer from "./slices/unboxingSlice";
import blogsReducer from "./slices/blogsSlice";
import bannerReducer from "./slices/bannerSlice";

// A new store is created per request so server-rendered pages never share state
// between users. Register additional slice reducers here as you add them.
export const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      cart: cartReducer,
      wishlist: wishlistReducer,
      unboxing: unboxingReducer,
      blogs: blogsReducer,
      banners: bannerReducer,
    },
  });
