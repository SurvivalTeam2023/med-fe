import { Base } from "./base";

export interface User extends Base {
  name: string;
  uuid: string;
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

