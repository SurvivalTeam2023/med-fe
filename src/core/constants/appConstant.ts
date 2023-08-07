export const TOKEN_KEY: string = "token";
export const HOME = "/";
export const LOGIN = "login";
export const AUTH = "/auth";
export const REGISTER = "signup";
export const AUTH_LOGIN = "/auth/login";
export const DASHBOARD = "/dashboard";
export const PROJECT = "/projects";
export const RESOURCE = "/resources";
export const TIME_SHEET = "/time-sheet";
export const NOT_FOUND_PAGE = "/404-not-found";
export const OAUTH_REDIRECT = "/oauth-redirect";
export const ASSIGN = "/assign";
export const ADMIN = "/admin";
export const PLAYLIST = "/playlist";
export const USER = "/user";
export const USERNAME = "user/:username";
export const AUDIOS = "/audio";
export const AUDIOID = "/audio/:audioid";
export const PLAN = "/plan";
export const EDITUSER = "/user/edit/:username";
export const ACCOUNT_DETAIL = "/userdetail";
export const SUBSCRIPTION = "/subscription";

export const config = {
  SERVER_URL: process.env.REACT_APP_SERVER_URL || "http://localhost:8081/api",
  CLIENT_ID:
    process.env.CLIENT_ID ||
    "AfdKKH46rASiapwQ8JMQ8LA7SSdPyCff7-1lsTDPNELBp3Ee1PiQgMgHJI7JP3A7oP_AlXIyfhw3rtNj",
};
export const USER_KEY_STORAGE = "@MedApp:user";
export const TOKEN_KEY_STORAGE = "@MedApp:token";