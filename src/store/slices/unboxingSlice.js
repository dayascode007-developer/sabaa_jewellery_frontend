import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const fetchUnboxingVideos = createAsyncThunk(
  "unboxing/fetchVideos",
  async (params = {}, { rejectWithValue }) => {
    try {
      const { limit = 50, offset = 0 } = params;
      const response = await fetch(
        `${BASE_URL}/api/unboxing?limit=${limit}&offset=${offset}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch unboxing videos");
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  videos: [],
  loading: false,
  error: null,
};

const unboxingSlice = createSlice({
  name: "unboxing",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUnboxingVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUnboxingVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
      })
      .addCase(fetchUnboxingVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default unboxingSlice.reducer;
