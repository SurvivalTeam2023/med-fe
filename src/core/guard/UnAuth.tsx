import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "components/Loading";
import { DASHBOARD, TIME_SHEET } from "core/constant";
import { ROLE_ADMIN, ROLE_ARTIST, ROLE_SUBCRIBER } from "core/constant/role";

import { useAppSelector } from "../store";
import {
  selectIsAuthenticated,
  selectUserRoleNames,
  selectUserStore,
} from "../store/selector";

const UnAuthGuard: FC = () => {
  const { isTriedLogin } = useAppSelector(selectUserStore);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const userRoles = useAppSelector(selectUserRoleNames);

  if (!isTriedLogin) return <Loading />;

  if (isAuthenticated) {
    // if (userRoles?.includes(ROLE_ADMIN) || userRoles?.includes()) {
    //   return <Navigate to={DASHBOARD} replace />;
    // }

    return <Navigate to={TIME_SHEET} replace />;
  }

  return <Outlet />;
};

export default UnAuthGuard;
