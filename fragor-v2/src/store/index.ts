import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {auth: authState}
export type AppDispatch = typeof store.dispatch;
