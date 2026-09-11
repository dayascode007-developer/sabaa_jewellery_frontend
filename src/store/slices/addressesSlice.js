import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAddressesApi,
  createAddressApi,
  updateAddressApi,
  deleteAddressApi,
  setDefaultAddressApi,
} from "../api/addressesApi";

export const fetchAddresses = createAsyncThunk(
  "addresses/fetchAddresses",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchAddressesApi();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createAddress = createAsyncThunk(
  "addresses/createAddress",
  async (addressData, { rejectWithValue }) => {
    try {
      const data = await createAddressApi(addressData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateAddress = createAsyncThunk(
  "addresses/updateAddress",
  async ({ addressId, addressData }, { rejectWithValue }) => {
    try {
      const data = await updateAddressApi(addressId, addressData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "addresses/deleteAddress",
  async (addressId, { rejectWithValue }) => {
    try {
      await deleteAddressApi(addressId);
      return addressId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const setDefaultAddress = createAsyncThunk(
  "addresses/setDefaultAddress",
  async (addressId, { rejectWithValue }) => {
    try {
      const data = await setDefaultAddressApi(addressId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  list: [],
  loading: false,
  error: null,
  selectedAddressId: null,
};

const addressesSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {
    selectAddress: (state, action) => {
      state.selectedAddressId = action.payload;
    },
    clearAddresses: (state) => {
      state.list = [];
      state.selectedAddressId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch addresses
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        // Auto-select default if available
        const defaultAddr = action.payload.find((a) => a.is_default);
        if (defaultAddr) {
          state.selectedAddressId = defaultAddr.id;
        }
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create address
      .addCase(createAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
        state.selectedAddressId = action.payload.id;
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update address
      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex((a) => a.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete address
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((a) => a.id !== action.payload);
        if (state.selectedAddressId === action.payload) {
          state.selectedAddressId = state.list.length > 0 ? state.list[0].id : null;
        }
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Set default address
      .addCase(setDefaultAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setDefaultAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.map((a) => ({
          ...a,
          is_default: a.id === action.payload.id,
        }));
        state.selectedAddressId = action.payload.id;
      })
      .addCase(setDefaultAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { selectAddress, clearAddresses } = addressesSlice.actions;

export const selectAddressesList = (state) => state.addresses.list;
export const selectSelectedAddressId = (state) => state.addresses.selectedAddressId;
export const selectSelectedAddress = (state) => {
  const id = state.addresses.selectedAddressId;
  return state.addresses.list.find((a) => a.id === id);
};
export const selectAddressesLoading = (state) => state.addresses.loading;
export const selectAddressesError = (state) => state.addresses.error;

export default addressesSlice.reducer;
