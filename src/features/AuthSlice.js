import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user || null;
      state.token = action.payload.token || null;
      state.refreshToken = action.payload.refreshToken || null;

      if (state.user) localStorage.setItem('user', JSON.stringify(state.user));
      if (state.token) localStorage.setItem('token', state.token);
      if (state.refreshToken) localStorage.setItem('refreshToken', state.refreshToken);
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;

      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
