import { getTokenApi } from "api/auth";
import { saveAuthKeyIntoLocalStorage } from "util/";
import { AppThunk } from "..";
import { userActions } from "../slice";

import { TokenDecode } from "core/interface/api";
import jwt_decode from "jwt-decode";

export const getCurrentUserThunk =
  (): AppThunk<void> => (dispatch, getState) => {
    if (getState().user.token || localStorage.getItem("auth_storage")) {
      const data: TokenDecode = jwt_decode(getState().user.token?.access_token + "");
      dispatch(
        userActions.setUser({
          uuid: data?.sid,
          name: data?.name,
          id: data?.sid,
          createdAt: new Date().toString(),
          updatedAt: new Date().toString(),
          isDeleted: false,
        })
      );
    } else {
      dispatch(userActions.setIsTriedLogin(false));
    }
  };

export const thunkLogin =
  (username: string, password: string): AppThunk<Promise<void>> =>
  async (dispatch: any) => {
    dispatch(userActions.loginStart());
    try {
      const token = await getTokenApi(username, password);
      saveAuthKeyIntoLocalStorage(token.data);
      dispatch(userActions.setToken(token.data));
      return token;
    } catch (error: any) {
      console.log("error", error.message);
      dispatch(userActions.loginFailed(error.message));
      return error;
    }
  };

// export const thunkRegisiter =
//   (username: string, password: string, repassword: string, email: string): AppThunk<void> =>
//   (dispatch: any, getState) => {
//     getTokenApi(username, password).then((token) => {
//       dispatch(userActions.setToken(token.data));
//       saveAuthKeyIntoLocalStorage(token.data);
//     });
//   };
