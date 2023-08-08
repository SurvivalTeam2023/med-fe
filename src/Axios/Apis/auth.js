import { CallAPI } from "../AxiosBase";

export const loginApi = (payload) => {
  const { username, password } = payload;
  const url = "/auth/login/token";
  console.log("payload", payload);
  return CallAPI.post(url, {
    username,
    password,
  });
};

export const registerUserApi = (payload) => {
  const url = "/user/user";
  const { username, email, password, repassword } = payload;
  return CallAPI.post(url, { username, email, password, repassword });
};
export const getRefreshTokenApi = (refreshToken) => {
  const url = "/update-token";
  return CallAPI.post(url, {
    refresh_token: refreshToken,
  });
};
