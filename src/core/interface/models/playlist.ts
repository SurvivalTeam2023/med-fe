import { Base } from "./base";
import { User } from "./user";

export interface Playlist extends Base {
  name: string,
  desc: string,
  status: string,
  user: User,
}
export interface PlaylistsData {
  items: Playlist[],
  meta: meta
}

export interface meta {
  totalItems: number,
  itemCount: number,
  itemsPerPage: number,
  totalPages: number,
  currentPage: number
}