import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types/auth.types";

interface AuthState {
  user: User | null;
  isAuthenticated: Boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
