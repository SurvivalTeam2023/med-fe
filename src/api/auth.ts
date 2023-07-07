import { CallAPI } from "core/axiosCore";
import { ApiResponse } from "core/interface/api";
import { TokenResponse } from "core/interface/redux";
import { AuthPayload } from "core/interface/models/auth";
export const getTokenApi = (payload: any) => {
  const { username, password } = payload
  const url = "/auth/token";
  return CallAPI.post(url, {
    username,
    password,
  });
};

// export const loginApi = () => {
//   c
// }

export const registerUserApi = (payload: AuthPayload): ApiResponse<AuthPayload> => {
  const url = "/user/user";
  const { username, email, password, repassword } = payload;
  return CallAPI.post(url, { username, email, password, repassword });
};
export const getRefreshTokenApi = (
  refreshToken: string
): ApiResponse<TokenResponse> => {
  const url = "/update-token";
  return CallAPI.post(url, {
    refresh_token: refreshToken,
  });
};
