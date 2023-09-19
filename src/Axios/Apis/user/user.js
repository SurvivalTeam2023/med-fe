import { CallAPI, CallAPIMulti, CallDeleteAPI } from "../../AxiosBase";

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

export const getTotalActiveUser = () => {
  const url = "/user?status=ACTIVE";
  return CallAPI.get(url);
};

export const getNewUser = (month) => {
  const url = `/user?month=${month}`;
  return CallAPI.get(url);
};

export const getTotalSubscribeUser = () => {
  const url = `/subscriptions/user/count`;
  return CallAPI.get(url);
};

export const getUserLog = () => {
  const url = "/userLog";
  return CallAPI.get(url);
};

export const getUserByAge = () => {
  const url = "/age";
  return CallAPI.get(url);
};

export const updateUserAPI = (selectedLeadId, payload) => {
  const url = `/user/${selectedLeadId}`;
  const { firstName, lastName, email, city, address, dob } = payload;
  return CallAPIMulti.put(url, {
    firstName,
    lastName,
    email,
    city,
    address,
    dob,
  });
};

export const deleteUserAPI = (selectedUserId) => {
  const url = `/user/${selectedUserId}`;
  return CallDeleteAPI.delete(url);
};
