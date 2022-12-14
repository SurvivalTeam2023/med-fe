import { createSelector } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { ROLE_ARTIST } from "core/constant";
import { UserDecode } from "core/interface/redux";
import { RootState } from "..";

export const selectUserStore = (state: RootState) => state.user;

export const selectUserInfo = createSelector(selectUserStore, (userStore) => {
  const access_token = userStore.token?.access_token;

  if (!access_token) return null;

  const userInfo = jwt_decode<UserDecode>(access_token);
  return userInfo;
});

export const selectUserRole = createSelector(selectUserInfo, (info) => {
  if (!info) return null;
  return info.roles;
});

export const selectUserRoleNames = createSelector(selectUserRole, (roles) => {
  if (!roles) return [];
  if (roles.length === 0) return [ROLE_ARTIST];
  return roles.map((r) => r.name);
});
// TODO: check expiration of token in future
export const selectIsAuthenticated = createSelector(
  selectUserStore,
  (userStore) => {
    const access_token = userStore.token?.access_token;
    console.log("access_token");
    if (!access_token) return null;
    return access_token;
  }
);
