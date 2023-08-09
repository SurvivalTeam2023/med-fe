import { CallAPI } from "../../AxiosBase";

export const getUserListApi = (payload) => {
  const url = "/user/userList";
  return CallAPI.post(url);
};
export const getUserDataByUsernameApi = (username) => {
  const queryUrl = `/user/${username}`;
  return CallAPI.get(queryUrl);
};

export const getUserProfileByUserIdApi = (userId) => {
  const queryUrl = `/user/getProfile/${userId}`;
  return CallAPI.get(queryUrl);
};
