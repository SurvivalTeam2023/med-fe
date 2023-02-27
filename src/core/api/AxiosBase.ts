import { EnhancedStore } from "@reduxjs/toolkit";
import axios from "axios";
import { getRefreshTokenApi } from "api/auth";
import { KEYS } from "core/constant";
import { RootState, Store } from "core/store";
import { userActions } from "core/store/slice";
import { getAuthKeyFromLocalStorage, saveAuthKeyIntoLocalStorage } from "util/";
import { config } from "../constant/config";

let store: Store;

export const CallAPI = axios.create({
  baseURL: config.SERVER_URL,
  withCredentials: false,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export const injectStore = (_store: EnhancedStore<RootState>) => {
  store = _store;
};

CallAPI.interceptors.request.use((req) => {
  const token = getAuthKeyFromLocalStorage();
  console.log(token)
  if (token && req.headers)
    req.headers[KEYS.HEADER_AUTHORIZATION] = `Bearer ${token.access_token}`;

  return req;
});

CallAPI.interceptors.response.use(async (res) => {
  const { status } = res;
  if (status === 401) {
    const response = await getRefreshTokenApi(
      store.getState().user.token?.refresh_token || ""
    );

    if (response?.status === 401) {
      //TODO: logout user
      return res;
    }

    if (response) {
      saveAuthKeyIntoLocalStorage(response.data);
      store.dispatch(userActions.setToken(response.data));
    }
  }
  return res;
});
