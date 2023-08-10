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

export const createUserAPI = (payload) => {
  const url = "/user/user";
  const {
    username,
    email,
    password,
    repassword,
    firstName,
    lastName,
    gender,
    city,
    address,
    dob,
  } = payload;
  return CallAPI.post(url, {
    username,
    email,
    password,
    repassword,
    firstName,
    lastName,
    gender,
    city,
    address,
    dob,
  });
};
