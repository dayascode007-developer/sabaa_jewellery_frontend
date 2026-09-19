"use client";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeAuth } from "@/store/slices/authSlice";
import { fetchCart, clearCartLocal } from "@/store/slices/cartSlice";
import { fetchWishlist } from "@/store/slices/wishlistSlice";
import { fetchSettings } from "@/store/slices/settingsSlice";
import { fetchAddresses, clearAddresses } from "@/store/slices/addressesSlice";

export default function AuthInitializer({ children }) {
  const dispatch = useDispatch();
  const initialized = useSelector((state) => state.auth.initialized);
  const token = useSelector((state) => state.auth.token);
  const customer = useSelector((state) => state.auth.customer);
  const initializingRef = useRef(false);
  const cartFetchedRef = useRef(false);
  const settingsFetchedRef = useRef(false);

  useEffect(() => {
    if (!settingsFetchedRef.current) {
      settingsFetchedRef.current = true;
      dispatch(fetchSettings()).catch(() => {
        // Settings fetch failed silently
      });
    }
  }, [dispatch]);

  useEffect(() => {
    // Initialize auth on app load (validate stored token)
    if (!initialized && !initializingRef.current) {
      initializingRef.current = true;
      dispatch(initializeAuth()).finally(() => {
        initializingRef.current = false;
      });
    }

    // If token exists but no customer, fetch customer profile
    if (token && (!customer || customer.id === "temp") && !initializingRef.current) {
      initializingRef.current = true;
      dispatch(initializeAuth()).then(() => {
        initializingRef.current = false;
      }).catch(() => {
        initializingRef.current = false;
      });
    }
  }, [token, customer, initialized, dispatch]);

  // ✅ SYNC CART AFTER LOGIN - Fetch user's cart immediately after authentication
  useEffect(() => {
    if (token && customer && customer.id !== "temp" && !cartFetchedRef.current) {
      cartFetchedRef.current = true;
      dispatch(fetchCart());
    }
  }, [token, customer, dispatch]);

  // ✅ CLEAR CART ON LOGOUT - Prevent showing previous user's cart
  useEffect(() => {
    if (!token || !customer || customer.id === "temp") {
      // User logged out or auth not ready
      if (cartFetchedRef.current) {
        dispatch(clearCartLocal());
        cartFetchedRef.current = false;
      }
      dispatch(clearAddresses());
    }
  }, [token, customer, dispatch]);

  // Fetch wishlist and addresses when user is authenticated
  useEffect(() => {
    if (token && customer && customer.id !== "temp") {
      dispatch(fetchWishlist());
      dispatch(fetchAddresses());
    }
  }, [token, customer, dispatch]);

  return children;
}
