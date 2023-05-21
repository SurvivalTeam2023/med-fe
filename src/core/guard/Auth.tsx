import { AUTH_LOGIN, NOT_FOUND_PAGE } from "core/constants";
import { Role } from "core/interface/role";
import { useAppSelector } from "store";
import { selectIsAuthenticated, selectUserRoleNames } from "store/selector";
import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface AuthWrapperProps {
  acceptRoles: Role[];
}

const AuthGuard: FC<AuthWrapperProps> = ({ acceptRoles }) => {
  const userRoles = useAppSelector(selectUserRoleNames);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  console.log("auth", isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={AUTH_LOGIN} replace />;
  }

  if (acceptRoles.findIndex((item) => userRoles?.includes(item)) === -1) {
    return <Navigate to={NOT_FOUND_PAGE} replace />;
  }
  return <Outlet />;
};

export default AuthGuard;
