"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeAuth } from "@/store/slices/authSlice";

export default function AuthInitializer({ children }) {
  const dispatch = useDispatch();
  const initialized = useSelector((state) => state.auth.initialized);

  useEffect(() => {
    // Initialize auth on app load (validate stored token)
    if (!initialized) {
      dispatch(initializeAuth());
    }
  }, [dispatch, initialized]);

  return children;
}
