import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  role: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token, role } = action.payload;
      state.user = user;
      state.token = token;
      state.role = role;
      state.isAuthenticated = true;
      localStorage.setItem('auth', JSON.stringify({ user, token, role }));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
      localStorage.removeItem('auth');
    },
    initializeAuth: (state) => {
      const savedAuth = localStorage.getItem('auth');
      if (savedAuth) {
        const { user, token, role } = JSON.parse(savedAuth);
        state.user = user;
        state.token = token;
        state.role = role;
        state.isAuthenticated = true;
      }
    },
  },
});

export const { setCredentials, logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;