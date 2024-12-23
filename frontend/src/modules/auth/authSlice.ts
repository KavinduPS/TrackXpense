import { createSlice } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    updateUserDetails: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, updateUserDetails, clearUser } = authSlice.actions;
export default authSlice.reducer;
