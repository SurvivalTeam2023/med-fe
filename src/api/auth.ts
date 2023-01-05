import { CallAPI } from "core/api";
import { ApiResponse } from "core/interface/api";
import { TokenResponse } from "core/interface/redux";

export const getTokenApi = (
  username: string,
  password: string
): ApiResponse<TokenResponse> => {
  const url = "/auth/getToken";
  return CallAPI.post(
    url,
    {
      username,
      password,
    },
    // {
    //   headers: {
    //     "Content-Type":
    //       "application/x-www-form-urlencoded, multipart/form-data",
    //   },
    // }
  );
};

export const getRefreshTokenApi = (
  refreshToken: string
): ApiResponse<TokenResponse> => {
  const url = "/update-token";
  return CallAPI.post(url, {
    refresh_token: refreshToken,
  });
};
