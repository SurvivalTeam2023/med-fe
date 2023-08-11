import axios from "axios";
import { baseUrl } from "../config/env.config";
import { store } from "../app/store";
import { AUTH_KEY } from "../constants/app";
import { useSelector } from "react-redux";

export const CallAPI = axios.create({
  baseURL: baseUrl,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
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
  console.log("request_url:", `${req.baseURL}${req.url}`);
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
  console.log("request_url:", `${req.baseURL}${req.url}`);
  return req;
});

CallAPIMulti.interceptors.response.use(async (res) => {
  return res;
});
