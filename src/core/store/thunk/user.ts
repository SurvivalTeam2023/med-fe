<<<<<<< Updated upstream
import { AppThunk } from "..";
import { userActions } from "../slice";

export const getCurrentUserThunk = (): AppThunk<Promise<void>> => (dispatch, getState) =>
  new Promise((resolve, reject) => {
    // TODO: get current user and dispatch action to update user into redux store here
    setTimeout(() => {
      if (getState().user.token) {
        //call api to get user info
        dispatch(
          userActions.setUser({
            uuid: "1",
            name: "test",
            id: 1,
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
=======
import { getTokenApi } from "api/auth";
import { saveAuthKeyIntoLocalStorage } from "util/";
import { AppThunk } from "core/store";
import { userActions } from "../slice";
import jwt_decode from "jwt-decode";
import { ApiResponse, TokenDecode } from "core/interface/api";
import { ThunkAction } from "@reduxjs/toolkit";
import {  UserState } from "core/interface/redux";

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
  (username: string, password: string): ThunkAction<void,UserState, null, any> =>
  async (dispatch: any, getState: any) => {
    dispatch(userActions.loginStart());
    try {
      const token = await getTokenApi(username, password);
      dispatch(userActions.setToken(token.data));
      saveAuthKeyIntoLocalStorage(token.data);
    } catch (error: any) {
      dispatch(userActions.loginFailed(error.message));
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
>>>>>>> Stashed changes
