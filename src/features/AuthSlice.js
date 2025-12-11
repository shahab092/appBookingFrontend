import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user || null;
      state.token = action.payload.token || null;
      state.refreshToken = action.payload.refreshToken || null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
