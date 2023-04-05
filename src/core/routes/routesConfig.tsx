import { AUTH_LOGIN, LOGIN, NOT_FOUND_PAGE } from "core/constant";
import { ADMIN, AUDIOS, AUDIOID, AUTH, DASHBOARD, PLAYLIST, REGISTER, USER, USERNAME, PLAN, EDITUSER } from "core/constant/routes";
import UnAuthGuard from "core/guard/UnAuth";
import EmptyLayout from "core/layout/EmptyLayout";
import NotFoundPage from "pages/NotFound/NotFoundPage";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
// import { ROLE_ADMIN, ROLE_ARTIST, ROLE_SUBCRIBER } from "core/constant/role";
import HomePage from "pages/HomePage";
import LoginPage from "pages/LoginPage/LoginPage";
import RegisterPage from "pages/RegisterPage/RegisterPage";
import UserDetail from "pages/UserPage/UserDetail";
import AudioPage from "pages/AudioPage/audioPage";
import PlaylistPage from "pages/PlaylistPage/playlistPage";
import AudioDetail from "pages/AudioPage/audioDetail";
import UserPage from "pages/UserPage/userPage";
import PlanPage from "pages/PlanPage/PlanPage";
import EditUser from "pages/UserPage/editUser";


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
  { path: DASHBOARD, component: <HomePage /> },
  { path: PLAYLIST, component: <PlaylistPage /> },
  {
    path: USER,
    component: <UserPage />
  },
  { path: USERNAME, component: <UserDetail /> },
  { path: AUDIOS, component: <AudioPage /> },
  { path: EDITUSER, component: <EditUser/>},
  { path: AUDIOID, component: <AudioDetail /> },
  {
    path: PLAN, component: <PlanPage />,
  },
  { path: NOT_FOUND_PAGE, component: <NotFoundPage /> },
  {
    path: "*",
    component: <Navigate to={NOT_FOUND_PAGE} replace={true} />,
  },
  { path: DASHBOARD, component: <HomePage /> },
  {
    path: DASHBOARD,
    component: <Navigate to={DASHBOARD} replace={true} />,
  },
];
