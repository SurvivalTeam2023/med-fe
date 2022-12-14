import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clearAuthKeyFromLocalStorage, getAuthKeyFromLocalStorage } from "util/";
import { UserState } from "../../interface/redux";

const initialState: UserState = {
  isTriedLogin: false,
  user: null,
  token: getAuthKeyFromLocalStorage(),
};

const reducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetState: () => ({ ...initialState }),
    setIsTriedLogin: (
      state,
      { payload }: PayloadAction<UserState["isTriedLogin"]>
    ) => {
      state.isTriedLogin = payload;
    },
    setUser: (state, { payload }: PayloadAction<UserState["user"]>) => {
      state.user = payload;
    },
    setToken: (state, { payload }: PayloadAction<UserState["token"]>) => {
      state.token = payload;
    },
    removeToken: (state, { payload }: PayloadAction<UserState["token"]>) => {
      clearAuthKeyFromLocalStorage();
      state.token = null;
    },
  },
});
export const userActions = {
  ...reducer.actions,
};

export const userReducer = reducer.reducer;
