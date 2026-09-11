import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import wishlistReducer from "./slices/wishlistSlice";
import authReducer from "./slices/authSlice";
import unboxingReducer from "./slices/unboxingSlice";
import blogsReducer from "./slices/blogsSlice";
import bannerReducer from "./slices/bannerSlice";
import categoriesReducer from "./slices/categoriesSlice";
import productsReducer from "./slices/productsSlice";
import couponReducer from "./slices/couponSlice";
import settingsReducer from "./slices/settingsSlice";
import addressesReducer from "./slices/addressesSlice";

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
      categories: categoriesReducer,
      products: productsReducer,
      coupon: couponReducer,
      settings: settingsReducer,
      addresses: addressesReducer,
    },
  });
