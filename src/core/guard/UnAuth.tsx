import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "components/Loading";
import { AUTH_LOGIN, DASHBOARD, NOT_FOUND_PAGE, TIME_SHEET } from "core/constant";
import { ROLE_ADMIN, ROLE_ARTIST, ROLE_SUBCRIBER } from "core/constant/role";

import { useAppSelector } from "../store";
import {
  selectIsAuthenticated,
  selectUserRoleNames,
  selectUserStore,
} from "../store/selector";
import { Role } from "core/interface/role";

interface AuthWrapperProps {
  acceptRoles?: Role[];
}
const AuthGuard: FC<AuthWrapperProps> = ({ acceptRoles }) => {
  debugger
  const userRoles = useAppSelector(selectUserRoleNames);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const { isTriedLogin } = useAppSelector(selectUserStore);
  if (!isTriedLogin) return <Loading />;

  if (!isAuthenticated) {
    return <Navigate to={AUTH_LOGIN} replace />;
  }
  if (acceptRoles?.findIndex((item) => userRoles?.includes(item)) === -1) {
    return <Navigate to={NOT_FOUND_PAGE} replace />;
  }
  return <Outlet />;
};
export default AuthGuard;
