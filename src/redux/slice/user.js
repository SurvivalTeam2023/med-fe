import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAuthKeyFromLocalStorage } from "util/";

const initialState = {
  isTriedLogin: false,
  user: null,
  token: getAuthKeyFromLocalStorage(),
  error: null,
  username: null,
};

const reducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetState: () => ({ ...initialState }),
    setIsTriedLogin: (state, { payload }) => {
      state.isTriedLogin = payload;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setUsername: (state, { payload }) => {
      state.username = payload;
    },
    setToken: (state, { payload }) => {
      state.token = payload;
    },
    removeToken: (state, { payload }) => {
      clearAuthKeyFromLocalStorage();
      state.token = null;
    },
    loginStart: (state) => {
      state.isTriedLogin = true;
    },
    loginSuccess: (state, { payload }) => {
      state.isTriedLogin = false;
      state.user = payload;
    },
    loginFailed: (state, action) => {
      state.isTriedLogin = false;
      state.error = action.payload;
    },
  },
});
export const userActions = {
  ...reducer.actions,
};
export const userReducer = reducer.reducer;
