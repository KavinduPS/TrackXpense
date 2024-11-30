import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./userSlice";
import incomeReducer from "./incomSlice";

const store = configureStore({
  reducer: {
    user: useReducer,
    income: incomeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
