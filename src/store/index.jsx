import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { usersApi } from './api/usersApi';
import { productsApi } from './api/productsApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(productsApi.middleware),
});

export default store;