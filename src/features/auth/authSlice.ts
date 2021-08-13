import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "typeData/user";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface AuthState {
  isLoggedin: boolean;
  logging?: boolean;
  currentUser?: User;
}
const initialState: AuthState = {
  isLoggedin: false,
  logging: false,
  currentUser: undefined,
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.logging = true;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isLoggedin = true;
      state.logging = false;
      state.currentUser = action.payload;
    },

    loginFail: (state, action: PayloadAction<string>) => {
      state.logging = false;
    },

    logout: (state) => {
      state.isLoggedin = false;
      state.currentUser = undefined;
    },
  },
});

//action
export const { login, loginSuccess, loginFail, logout } = authSlice.actions;
//selector
export const authSelector = (state: any) => state.auth;
//reducer
const authReducer = authSlice.reducer;
export default authReducer;
