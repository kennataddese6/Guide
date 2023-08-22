import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// create state intial
const user = sessionStorage.getItem(JSON.parse('user'));
const initialState = {
  isError: false,
  isSuccess: false,
  isSuccessgetFloorReceptionists: false,
  isLoading: false,
  message: '',
};

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
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
// To login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
// Get Floor Receptionist
export const getFloorReceptionists = createAsyncThunk(
  'auth/getFloorRecpetionist',
  async (_, thunkAPI) => {
    try {
      return await authService.getFloorReceptionists();
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
// update latest message
export const updateLatestMessage = createAsyncThunk(
  'auth/updateLatestMessage',
  async (latestMessage, thunkAPI) => {
    try {
      return await authService.updateLatestMessage(latestMessage);
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

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isSuccessgetFloorReceptionists = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // to register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // to login user
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      // to update latest messages
      .addCase(updateLatestMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateLatestMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateLatestMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // to Get Floor Receptionists
      .addCase(getFloorReceptionists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFloorReceptionists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessgetFloorReceptionists = true;
        state.message = action.payload;
      })
      .addCase(getFloorReceptionists.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;
