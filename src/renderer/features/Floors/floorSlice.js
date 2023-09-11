import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import FloorService from './floorService';

// create state intial

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};
// Register Floors
export const registerFloor = createAsyncThunk(
  'floor/registerFloor',
  async (floor, thunkAPI) => {
    try {
      return await FloorService.RegisterFloor(floor);
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
export const getFloors = createAsyncThunk(
  'floor/getFloors',
  async (_, thunkAPI) => {
    try {
      return await FloorService.GetFloors();
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

export const FloorSlice = createSlice({
  name: 'floor',
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
      // to register Floor
      .addCase(registerFloor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerFloor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(registerFloor.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});
export const { reset } = FloorSlice.actions;
export default FloorSlice.reducer;
