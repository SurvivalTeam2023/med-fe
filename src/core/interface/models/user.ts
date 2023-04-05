import { Base } from "./base";

export interface User extends Base {
  name: string;
  uuid: string;
  email?: string;
  username?: string
  firstName?: string
  lastName?: string
  gender?: string
  city?: string
  address?: string
  dob?: string
  status?: string
}

export type ILogin = {
  username: string;
  password: string;
};

export type IRegister = {
  username: string;
  password: string;
  repassword: string;
  email: string;
};
export interface UserData {
  user_db: User
}