import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/AuthSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: import.meta.env.DEV === true,
});