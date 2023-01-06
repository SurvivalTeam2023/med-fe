import { CallAPI } from "core/api";
import { ApiResponse } from "core/interface/api";
import { TokenResponse } from "core/interface/redux";

export const getTokenApi = (
  username: string,
  password: string
): ApiResponse<TokenResponse> => {
  const url = "/auth/token";
  return CallAPI.post(url, {
    username,
    password,
  });
};

export const registerUserApi = (data: any): ApiResponse<any> => {
  const url = "/user/user";
  return CallAPI.post(url, data);
};
export const getRefreshTokenApi = (
  refreshToken: string
): ApiResponse<TokenResponse> => {
  const url = "/update-token";
  return CallAPI.post(url, {
    refresh_token: refreshToken,
  });
};
