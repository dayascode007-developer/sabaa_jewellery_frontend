import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSettingsApi } from "../api/settingsApi";

export const fetchSettings = createAsyncThunk(
  "settings/fetchSettings",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchSettingsApi();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  shipping: {
    deliveryCharge: 200,
    freeDeliveryAbove: 999,
  },
  loading: false,
  error: null,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.shipping = action.payload.shipping || state.shipping;
        state.error = null;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectShippingConfig = (state) => state.settings.shipping;
export const selectSettingsLoading = (state) => state.settings.loading;

export default settingsSlice.reducer;
