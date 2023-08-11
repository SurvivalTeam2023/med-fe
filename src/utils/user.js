// import { USER_KEY_STORAGE } from "core/constants";
import jwtDecode from "jwt-decode";

// export const removeTokenFromStorage = () => {
//   AsyncStorage.removeItem(USER_KEY_STORAGE);
// };

export const parseTokenToUserId = (token) => {
  let token_decoded = jwtDecode(token);
  return token_decoded["sub"];
};

export const parseTokenToRole = (token) => {
  let token_decoded = jwtDecode(token);
  const resource_access = token_decoded["resource_access"];
  const med_app = resource_access["med-app"];
  const roles = med_app["roles"];
  const current_role = roles.find((item) => item === "admin");
  return current_role;
};

export const parseTokenToUsername = (token) => {
  let token_decoded = jwtDecode(token);
  return token_decoded["preferred_username"];
};
