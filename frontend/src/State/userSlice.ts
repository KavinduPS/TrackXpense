import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  email: string;
  password: string;
}

const initialState: UserState = {
  name: "",
  email: "",
  password: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<Omit<UserState, "password">>) {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
  },
});

export const { setUser, setPassword } = userSlice.actions;
export default userSlice.reducer;
