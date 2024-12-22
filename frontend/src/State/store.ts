import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../modules/auth/authSlice";
import incomeReducer from "./incomSlice";
import { apiSlice } from "../modules/api/apiSlice";
import ExpenseReducer from "../State/ExpenseSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    income: incomeReducer,
    expense: ExpenseReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
