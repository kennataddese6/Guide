import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import CustomerService from './customerService';

// create state intial
const initialState = {
  isError: false,
  isErrorGetCusomers: false,
  isLoadingGetCustomers: false,
  isLoadingSentCustomers: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  SentCustomers: '',
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
  'customer/getFloorCustomers',
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
// get Customers
export const getSentCustomers = createAsyncThunk(
  'customer/getSentCustomers',
  async (_, thunkAPI) => {
    try {
      const SentCusomters = await CustomerService.getSentCustomers();
      console.log('this are the sent customers', SentCusomters);
      return SentCusomters;
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
export const getWaitingCustomers = createAsyncThunk(
  'customer/getWaitingCustomers',
  async (_, thunkAPI) => {
    try {
      const WaitingCusomters = await CustomerService.getWaitingCustomers();
      console.log('this are the waiting customers', WaitingCusomters);
      return WaitingCusomters;
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
// update Customer
export const updateCustomer = createAsyncThunk(
  'customer/updateCustomer',
  async (customer, thunkAPI) => {
    try {
      return await CustomerService.updateCustomer(customer);
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
      // to update Customer
      .addCase(updateCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateCustomer.rejected, (state, action) => {
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
      // to get sent CUsotmer
      .addCase(getSentCustomers.pending, (state) => {
        state.isLoadingSentCustomers = true;
      })
      .addCase(getSentCustomers.fulfilled, (state, action) => {
        state.isLoadingSentCustomers = false;
        //state.isSuccess = true;
        state.SentCustomers = action.payload;
      })
      .addCase(getSentCustomers.rejected, (state, action) => {
        state.isLoadingSentCustomers = false;
        state.isErrorGetCusomers = true;
        //state.message = action.payload;
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
