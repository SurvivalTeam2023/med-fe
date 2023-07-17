import { EnhancedStore } from "@reduxjs/toolkit";
import axios from "axios";
import { getRefreshTokenApi } from "api/auth";
import { KEYS } from "core/constants";
import { RootState, Store } from "store";
import { userActions } from "store/slice";
import { getAuthKeyFromLocalStorage, saveAuthKeyIntoLocalStorage } from "util/";
import { config } from "core/constants";

let store: Store;

export const CallAPI = axios.create({
  baseURL: config.SERVER_URL,
  withCredentials: false,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
export const CallAPIMulti = axios.create({
  baseURL: config.SERVER_URL,
  withCredentials: false,
  headers: {
    "Content-type":
      "multipart/form-data; boundary=<calculated when request is sent>",
    "Access-Control-Allow-Origin": "*",
  },
});

export const injectStore = (_store: EnhancedStore<RootState>) => {
  store = _store;
};

CallAPI.interceptors.request.use((req) => {
  const token = getAuthKeyFromLocalStorage();
  if (token && req.headers)
    req.headers[KEYS.HEADER_AUTHORIZATION] = `Bearer ${token}`;
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
CallAPIMulti.interceptors.request.use((req) => {
  console.log('okala', req)
  const token = getAuthKeyFromLocalStorage();
  if (token && req.headers)
    req.headers[KEYS.HEADER_AUTHORIZATION] = `Bearer ${token}`;

  return req;
});

CallAPIMulti.interceptors.response.use(async (res) => {
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
