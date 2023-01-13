import { createSlice, PayloadAction } from "@reduxjs/toolkit";
<<<<<<< Updated upstream
import { getAuthKeyFromLocalStorage } from "util/";
=======
import {
  clearAuthKeyFromLocalStorage,
  getAuthKeyFromLocalStorage,
} from "util/";
>>>>>>> Stashed changes
import { UserState } from "../../interface/redux";

const initialState: UserState = {
  isTriedLogin: false,
  user: null,
  token: getAuthKeyFromLocalStorage(),
  error: null,
};

const reducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetState: () => ({ ...initialState }),
    setIsTriedLogin: (state, { payload }: PayloadAction<UserState["isTriedLogin"]>) => {
      state.isTriedLogin = payload;
    },
    setUser: (state, { payload }: PayloadAction<UserState["user"]>) => {
      state.user = payload;
    },
    setToken: (state, { payload }: PayloadAction<UserState["token"]>) => {
      state.token = payload;
    },
<<<<<<< Updated upstream
=======
    removeToken: (state, { payload }: PayloadAction<UserState["token"]>) => {
      clearAuthKeyFromLocalStorage();
      state.token = null;
    },
    loginStart: (state) => {
      state.isTriedLogin = true;
    },
    loginSuccess: (state, { payload }: PayloadAction<UserState["user"]>) => {
      state.isTriedLogin = false;
      state.user = payload;
    },
    loginFailed: (state, action) => {
      state.isTriedLogin = false;
      state.error = action.payload;
    },
>>>>>>> Stashed changes
  },
});
export const userActions = {
  ...reducer.actions,
};

export const userReducer = reducer.reducer;
