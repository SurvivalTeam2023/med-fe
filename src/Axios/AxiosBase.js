import axios from "axios";
import { baseUrl } from "../config/env.config";

let store;

export const CallAPI = axios.create({
  baseURL: baseUrl,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

CallAPI.interceptors.request.use((req) => {
  console.debug("req", req);
  return req;
});

CallAPI.interceptors.response.use(async (res) => {
  return res;
});
