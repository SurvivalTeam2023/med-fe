import { createSlice } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_KEY } from "../../constants/app";

const initialState = {
  isTriedLogin: false,
  user: null,
  token: null,
  error: null,
  username: null,
};
const handleRemoveAllDataLocalStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY.TOKEN);
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
      // clearAuthKeyFromLocalStorage();
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
    logout: (state, action) => {
      handleRemoveAllDataLocalStorage();
    },
  },
});

export const userActions = {
  ...reducer.actions,
};
export const userReducer = reducer.reducer;
