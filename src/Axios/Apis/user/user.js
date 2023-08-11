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

export const getTotalActiveUser = () => {
  const url = "/user?status=ACTIVE"
  return CallAPI.get(url)
}

export const getNewUser = (month) => {
  const url = `/user?month=${month}`
  return CallAPI.get(url)
}

export const getTotalSubscribeUser = () => {
  const url = `/subscriptions/user/count`
  return CallAPI.get(url)
}

export const getUserLog = () => {
  const url = "/userLog"
  return CallAPI.get(url)
}

export const getUserByAge = () => {
  const url = "/age"
  return CallAPI.get(url)
}