import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { getTokenApi } from "api/auth";
import axios from "axios";
import { config } from "core/constant";
import { saveAuthKeyIntoLocalStorage } from "util/";
import { AppThunk, RootState } from "..";
import { userActions } from "../slice";
import jwt_decode from "jwt-decode";
import { TokenDecode } from "core/interface/api";

export const getCurrentUserThunk =
  (): AppThunk<Promise<void>> => (dispatch, getState) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (getState().user.token) {
          const data: TokenDecode = jwt_decode(
            getState().user.token?.access_token + ""
          );
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
          resolve();
        } else {
          reject(new Error("Token not found"));
        }
      }, 300);
    });

export const thunkLogin =
  (
    username: string,
    password: string
  ): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch: any, getState) => {
    getTokenApi(username, password).then((token) => {
      dispatch(userActions.setToken(token.data));
      saveAuthKeyIntoLocalStorage(token.data);
    });
  };

// await axios.post(
//   `${config.SERVER_URL.toString()}auth/getToken`,
//   {
//     username,
//     password,
//   }
// );
