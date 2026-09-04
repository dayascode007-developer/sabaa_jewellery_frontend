import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBlogsApi, fetchBlogByIdApi } from "@/store/api/blogsApi";

export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (params = {}, { rejectWithValue }) => {
    try {
      const { limit = 10, offset = 0 } = params;
      const data = await fetchBlogsApi({ limit, offset });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchBlogById = createAsyncThunk(
  "blogs/fetchBlogById",
  async (id, { rejectWithValue }) => {
    try {
      const data = await fetchBlogByIdApi(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  blogs: [],
  currentBlog: null,
  loading: false,
  error: null,
  pagination: {
    total: 0,
    limit: 10,
    offset: 0,
    hasMore: false,
  },
};

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    clearCurrentBlog: (state) => {
      state.currentBlog = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBlogById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBlog = action.payload;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentBlog } = blogsSlice.actions;
export default blogsSlice.reducer;
