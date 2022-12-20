import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { NOT_FOUND_PAGE, AUTH_LOGIN, LOGIN } from "core/constant";
import NotFoundPage from "pages/NotFound/NotFoundPage";
import { AUTH, REGISTER } from "core/constant/routes";
import EmptyLayout from "core/layout/EmptyLayout";
import UnAuthGuard from "core/guard/UnAuth";
// import { ROLE_ADMIN, ROLE_ARTIST, ROLE_SUBCRIBER } from "core/constant/role";
import LoginPage from "pages/LoginPage/LoginPage";
import RegisterPage from "pages/RegisterPage/RegisterPage";
import LoginPage1 from "pages/LoginPage/LoginPage1";

export interface SingleRoute {
  path?: string;
  component?: ReactNode;
  guard?: ReactNode;
  children?: SingleRoute[];
}

// In routes, that should have component when path is not null
export const ROUTES: SingleRoute[] = [
  { path: "/", component: <Navigate to={AUTH_LOGIN} replace={true} /> },
  {
    path: AUTH,
    component: <EmptyLayout />,
    guard: <UnAuthGuard />,
    children: [
      { path: "", component: <Navigate to={NOT_FOUND_PAGE} replace={true} /> },
      {
        path: LOGIN,
        component: <LoginPage />,
      },
      {
        path: REGISTER,
        component: <RegisterPage />,
      },
    ],
  },
  // {
  //   path: DASHBOARD,
  //   component: <Layout />,
  //   guard: <AuthGuard acceptRoles={[ROLE_SUBCRIBER, ROLE_ADMIN]} />,
  //   children: [{ path: "", component: <Dashboard /> }],
  // },
  { path: NOT_FOUND_PAGE, component: <NotFoundPage /> },
  {
    path: "*",
    component: <Navigate to={NOT_FOUND_PAGE} replace={true} />,
  },
];
