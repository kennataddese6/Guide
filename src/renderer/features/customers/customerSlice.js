import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import CustomerService from './customerService';

// create state intial
const initialState = {
  isError: false,
  isErrorGetCusomers: false,
  isLoadingGetCustomers: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Register Customer
export const registerCustomer = createAsyncThunk(
  'customer/registerCustomer',
  async (customer, thunkAPI) => {
    try {
      return await CustomerService.RegisterCustomer(customer);
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
// get Customers
export const getCustomers = createAsyncThunk(
  'customer/getCustomera',
  async (_, thunkAPI) => {
    try {
      return await CustomerService.getCustomers();
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
// get Floor Customers
export const getFloorCustomers = createAsyncThunk(
  'customer/getCustomera',
  async (floorNumber, thunkAPI) => {
    try {
      return await CustomerService.getFloorCustomers(floorNumber);
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
      state.isErrorGetCusomers = false;
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
        state.message = action.payload;
      })
      .addCase(registerCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      // to get Customer
      .addCase(getCustomers.pending, (state) => {
        state.isLoadingGetCustomers = true;
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.isLoadingGetCustomers = false;
        //state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.isLoadingGetCustomers = false;
        state.isErrorGetCusomers = true;
        state.message = action.payload;
      })
      // to get Customers by floor
      .addCase(getFloorCustomers.pending, (state) => {
        state.isLoadingGetCustomers = true;
      })
      .addCase(getFloorCustomers.fulfilled, (state, action) => {
        state.isLoadingGetCustomers = false;
        //state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(getFloorCustomers.rejected, (state, action) => {
        state.isLoadingGetCustomers = false;
        state.isErrorGetCusomers = true;
        state.message = action.payload;
      });
  },
});
export const { reset } = CustomerSlice.actions;
export default CustomerSlice.reducer;
