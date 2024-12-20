import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../modules/auth/authSlice";
import useReducer from "../modules/users/usersSlice";
import incomeReducer from "./incomSlice";
import { apiSlice } from "../modules/api/apiSlice";
import ExpenseReduser from "../State/ExpenseSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: useReducer,
    income: incomeReducer,
    expense: ExpenseReduser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
