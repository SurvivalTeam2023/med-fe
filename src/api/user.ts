import { CallAPI } from "core/axiosCore";
import { ApiResponse } from "core/interface/api";
import { User, UserData } from "core/interface/models";

export const getUsersAPI = (): ApiResponse<User[]> => {
  const url = `/user/userList`;
  return CallAPI.get(url);
};
export const getUserDataByUsernameApi = (username: string) => {
  const queryUrl = `/user/${username}`;
  return CallAPI.get(queryUrl);
};

export const getUserProfileByUserIdApi = (userId: string) => {
  const queryUrl = `/user/getProfile/${userId}`;
  return CallAPI.get(queryUrl);
};

export const getUserDetailAPI = (username: string): ApiResponse<UserData> => {
  const url = `/user/${username}`;
  return CallAPI.get(url);
};

export const editUserStatusAPI = (
  status: any,
  username: string
): ApiResponse<User> => {
  const url = `/user/${username}`;
  return CallAPI.patch(url, status);
};
