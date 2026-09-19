import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  signupApi,
  resendOtpApi,
  verifyOtpApi,
  loginApi,
  resendLoginOtpApi,
  verifyLoginOtpApi,
  googleSendOtpApi,
  googleResendOtpApi,
  googleVerifyOtpApi,
  logoutApi,
} from "@/store/api/authApi";
import { editProfileApi } from "@/store/api/dashboardApi";

export const signup = createAsyncThunk(
  "auth/signup",
  async (payload, { rejectWithValue }) => {
    try {
      return await signupApi(payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async (payload, { rejectWithValue }) => {
    try {
      return await resendOtpApi(payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (payload, { rejectWithValue }) => {
    try {
      return await verifyOtpApi(payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      return await loginApi(payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const resendLoginOtp = createAsyncThunk(
  "auth/resendLoginOtp",
  async (payload, { rejectWithValue }) => {
    try {
      return await resendLoginOtpApi(payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const verifyLoginOtp = createAsyncThunk(
  "auth/verifyLoginOtp",
  async (payload, { rejectWithValue }) => {
    try {
      return await verifyLoginOtpApi(payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const googleSendOtp = createAsyncThunk(
  "auth/googleSendOtp",
  async (payload, { rejectWithValue }) => {
    try {
      return await googleSendOtpApi(payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const googleResendOtp = createAsyncThunk(
  "auth/googleResendOtp",
  async (payload, { rejectWithValue }) => {
    try {
      return await googleResendOtpApi(payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const googleVerifyOtp = createAsyncThunk(
  "auth/googleVerifyOtp",
  async (payload, { rejectWithValue }) => {
    try {
      return await googleVerifyOtpApi(payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (token, { rejectWithValue }) => {
    try {
      return await logoutApi(token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editProfile = createAsyncThunk(
  "auth/editProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      return await editProfileApi(profileData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const initializeAuth = createAsyncThunk(
  "auth/initialize",
  async (_, { rejectWithValue }) => {
    try {
      const token = getStoredToken();

      if (!token) {
        return null;
      }

      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/customer/profile`;

      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        saveToken(null);
        throw new Error(`Token validation failed - status ${response.status}`);
      }

      const data = await response.json();
      return { token, customer: data.data || data };
    } catch (error) {
      saveToken(null);
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  customer: null,
  token: null,
  identifier: null,
  expiresAt: null,
  loading: false,
  error: null,
  otpSent: false,
  initialized: false,
};

// Save only token to localStorage (secure)
const saveToken = (token) => {
  if (typeof window === "undefined") return;
  try {
    if (token) {
      localStorage.setItem("authToken", token);
    } else {
      localStorage.removeItem("authToken");
    }
  } catch (error) {
    // Silently fail token save
  }
};

// Get token from localStorage
const getStoredToken = () => {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem("authToken");
  } catch (error) {
    return null;
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearAuth: (state) => {
      state.customer = null;
      state.token = null;
      state.identifier = null;
      state.otpSent = false;
      state.expiresAt = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Signup
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.identifier = action.payload.mobile;
        state.expiresAt = action.payload.expiresAt;
        state.otpSent = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Resend OTP
    builder
      .addCase(resendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.expiresAt = action.payload.expiresAt;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Verify OTP (Signup)
    builder
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        // Ensure customer data is present
        state.customer = action.payload.customer || { id: "temp" };
        state.otpSent = false;
        if (typeof window !== "undefined") {
          localStorage.removeItem("customerId");
        }
        saveToken(action.payload.token);
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.identifier = action.payload.emailOrPhone;
        state.expiresAt = action.payload.expiresAt;
        state.otpSent = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Resend Login OTP
    builder
      .addCase(resendLoginOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendLoginOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.expiresAt = action.payload.expiresAt;
      })
      .addCase(resendLoginOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Verify Login OTP
    builder
      .addCase(verifyLoginOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyLoginOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        // Ensure customer data is present (fallback to empty object to trigger header rerender)
        state.customer = action.payload.customer || { id: "temp" };
        state.otpSent = false;
        if (typeof window !== "undefined") {
          localStorage.removeItem("customerId");
        }
        saveToken(action.payload.token);
      })
      .addCase(verifyLoginOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Google Send OTP
    builder
      .addCase(googleSendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleSendOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(googleSendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Google Resend OTP
    builder
      .addCase(googleResendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleResendOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(googleResendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Google Verify OTP
    builder
      .addCase(googleVerifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleVerifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        // Ensure customer data is present
        state.customer = action.payload.customer || { id: "temp" };
        if (typeof window !== "undefined") {
          localStorage.removeItem("customerId");
        }
        saveToken(action.payload.token);
      })
      .addCase(googleVerifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Initialize Auth (validate token & fetch profile)
    builder
      .addCase(initializeAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.initialized = true;
        if (action.payload) {
          state.token = action.payload.token;
          state.customer = action.payload.customer;
        }
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.loading = false;
        state.initialized = true;
        state.token = null;
        state.customer = null;
      });

    // Logout
    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.customer = null;
        state.token = null;
        state.identifier = null;
        state.otpSent = false;
        state.error = null;
        state.initialized = false;
        saveToken(null);
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
        // Clear auth even if logout fails
        state.customer = null;
        state.token = null;
        state.error = null;
        state.initialized = false;
        saveToken(null);
      });

    // Edit Profile
    builder
      .addCase(editProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload;
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Update clearAuth to also clear localStorage
authSlice.caseReducers.clearAuth = (state) => {
  state.customer = null;
  state.token = null;
  state.identifier = null;
  state.otpSent = false;
  state.expiresAt = null;
  state.error = null;
  saveToken(null);
};

export const { clearError, clearAuth } = authSlice.actions;
export { initializeAuth, editProfile };
export default authSlice.reducer;
