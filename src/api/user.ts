import { CallAPI, CallAPIMulti } from "core/axiosCore";
import { ApiResponse } from "core/interface/api";
import { Register, User, UserData } from "core/interface/models";

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

export const getUserDetailAPI = (username: string | null): ApiResponse<UserData> => {
  const url = `/user/${username}`;
  return CallAPI.get(url);
};
export const updateUserApi = (payload: Register): ApiResponse<Register> => {
  const url = "/user";
  const { firstName,
    lastName,
    email,
    city,
    address,
    dob,
    avatar } = payload;
  return CallAPIMulti.put(url, {
    firstName,
    lastName,
    email,
    city,
    address,
    dob,
    avatar
  })
};

export const editUserStatusAPI = (
  status: any,
  username: string
): ApiResponse<User> => {
  const url = `/user/${username}`;
  return CallAPI.patch(url, status);
};
