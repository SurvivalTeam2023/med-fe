import { Base } from "./base";

export interface Artist extends Base {
    username: string,
    bio: string,
    artist_name: string,
    dob: string,
  }