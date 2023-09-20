import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import customerReducer from '../features/customers/customerSlice';
import floorReducer from 'renderer/features/Floors/floorSlice';
export const store = configureStore(
  {
    reducer: {
      auth: authReducer,
      customer: customerReducer,
      floor: floorReducer,
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
