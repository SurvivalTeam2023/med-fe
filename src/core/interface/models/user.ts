import { Base } from "./base";

export interface User extends Base {
  name: string;
  uuid: string;
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  city?: string;
  address?: string;
  dob?: string;
  status?: string;
}

export interface UserDetail {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
}
export interface DecodedToken {
  preferred_username: string;
  sub: string
  resource_access: {
    [key: string]: {
      roles: string[];
    };
  };
}

export interface Register {
  firstName: string
  lastName: string
  email: string
  city: string
  address: string
  dob: string
  avatar: File
}

export type ILogin = {
  username: string;
  password: string;
};


export interface UserData {
  user_db: User;
}
