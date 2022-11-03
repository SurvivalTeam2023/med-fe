import { ROLE_ADMIN, ROLE_ARTIST, ROLE_SUBCRIBER } from "core/constant/role";

export type Role =
  | typeof ROLE_ADMIN
  | typeof ROLE_ARTIST
  | typeof ROLE_SUBCRIBER;
