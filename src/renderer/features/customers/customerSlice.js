import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import CustomerService from './customerService';

// create state intial
const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Register Customer
export const registerCustomer = createAsyncThunk(
  'customer/registerCustomer',
  async (user, thunkAPI) => {
    try {
      console.log('here is the meeage in Customer slice', user);
      return await CustomerService.RegisterCustomer(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const CustomerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // to register Customer
      .addCase(registerCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(registerCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});
export const { reset } = CustomerSlice.actions;
export default CustomerSlice.reducer;
