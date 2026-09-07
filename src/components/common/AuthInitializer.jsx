"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeAuth } from "@/store/slices/authSlice";
import { fetchWishlist } from "@/store/slices/wishlistSlice";

export default function AuthInitializer({ children }) {
  const dispatch = useDispatch();
  const initialized = useSelector((state) => state.auth.initialized);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    // Initialize auth on app load (validate stored token)
    if (!initialized) {
      dispatch(initializeAuth());
    }
  }, [dispatch, initialized]);

  // Fetch wishlist when user is authenticated
  useEffect(() => {
    if (token && initialized) {
      dispatch(fetchWishlist());
    }
  }, [token, initialized, dispatch]);

  return children;
}
