import { lazy } from "react";
const Dashboard = lazy(() => import("../pages/protected/Dashboard"));
const Welcome = lazy(() => import("../pages/protected/Welcome"));
const Page404 = lazy(() => import("../pages/protected/404"));
const Blank = lazy(() => import("../pages/protected/Blank"));
const Charts = lazy(() => import("../pages/protected/Charts"));
const Leads = lazy(() => import("../pages/protected/Leads"));
const Audio = lazy(() => import("../pages/protected/Audio"));
const Genre = lazy(() => import("../pages/protected/Genre"));

const Playlist = lazy(() => import("../pages/protected/Playlist"));

const Integration = lazy(() => import("../pages/protected/Integration"));
const Calendar = lazy(() => import("../pages/protected/Calendar"));
const MentalHealth = lazy(() => import("../pages/protected/MentalHealth"));
const Question = lazy(() => import("../pages/protected/Question"));
const Team = lazy(() => import("../pages/protected/Team"));
const Transactions = lazy(() => import("../pages/protected/Transactions"));
const Bills = lazy(() => import("../pages/protected/Bills"));
const ProfileSettings = lazy(() =>
  import("../pages/protected/ProfileSettings")
);
const Plan = lazy(() => import("../pages/protected/Plan"));
const Degree = lazy(() => import("../pages/protected/Degree"));
const Options = lazy(() => import("../pages/protected/Options"));
const Exercises = lazy(() => import("../pages/protected/Exercises"));
const DetailExercises = lazy(() => import("../pages/protected/ExerciseDetail"));
const GettingStarted = lazy(() => import("../pages/GettingStarted"));
const DocFeatures = lazy(() => import("../pages/DocFeatures"));
const DocComponents = lazy(() => import("../pages/DocComponents"));

const routes = [
  {
    path: "/dashboard",
    component: Dashboard,
  },
  {
    path: "/welcome",
    component: Welcome,
  },
  {
    path: "/users",
    component: Leads,
  },
  {
    path: "/audio",
    component: Audio,
  },
  {
    path: "/playlist",
    component: Playlist,
  },
  {
    path: "/genre",
    component: Genre,
  },

  {
    path: "/mentalHealth",
    component: MentalHealth,
  },
  {
    path: "/question",
    component: Question,
  },
  {
    path: "/settings-team",
    component: Team,
  },
  {
    path: "/calendar",
    component: Calendar,
  },
  {
    path: "/transactions",
    component: Transactions,
  },
  {
    path: "/settings-profile",
    component: ProfileSettings,
  },
  {
    path: "/settings-billing",
    component: Bills,
  },
  {
    path: "/getting-started",
    component: GettingStarted,
  },
  {
    path: "/features",
    component: DocFeatures,
  },
  {
    path: "/components",
    component: DocComponents,
  },
  {
    path: "/integration",
    component: Integration,
  },
  {
    path: "/charts",
    component: Charts,
  },
  {
    path: "/404",
    component: Page404,
  },
  {
    path: "/blank",
    component: Blank,
  },
  {
    path: "/plan",
    component: Plan,
  },
  {
    path: "/degree",
    component: Degree,
  },
  {
    path: "/option",
    component: Options,
  },
  {
    path: "/exercise",
    component: Exercises,
  },
  {
    path: "/exercise/:id",
    component: DetailExercises,
  },
];

export default routes;
