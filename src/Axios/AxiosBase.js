import axios from "axios";
import { baseUrl } from "../config/env.config";
import { AUTH_KEY, LOCAL_STORAGE_KEY } from "../constants/app";

export const CallAPI = axios.create({
  baseURL: baseUrl,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export const CallDeleteAPI = axios.create({
  baseURL: baseUrl,
  withCredentials: false,
});

export const CallAPIMulti = axios.create({
  baseURL: baseUrl,
  withCredentials: false,
  headers: {
    "Content-type":
      "multipart/form-data; boundary=<calculated when request is sent>",
    "Access-Control-Allow-Origin": "*",
  },
});

CallAPI.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers[AUTH_KEY.HEADER_AUTHORIZATION] = `Bearer ${token}`;
  }
  return req;
});

CallAPI.interceptors.response.use(async (res) => {
  return res;
});

CallAPIMulti.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers[AUTH_KEY.HEADER_AUTHORIZATION] = `Bearer ${token}`;
  }
  return req;
});

CallAPIMulti.interceptors.response.use(async (res) => {
  return res;
});

CallDeleteAPI.interceptors.request.use((req) => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN);
  if (token) {
    req.headers[AUTH_KEY.HEADER_AUTHORIZATION] = `Bearer ${token}`;
  }
  return req;
});

CallDeleteAPI.interceptors.response.use(async (res) => {
  return res;
});
