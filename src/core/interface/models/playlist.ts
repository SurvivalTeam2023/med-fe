import { Base } from "./base";
import { User } from "./user";

export interface Playlist extends Base {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  playlistType: string;
  lastUpdatedAt: string;
  status: string;
  currentPage: string;
  user: User;
}
export interface PlaylistsData {
  items: Playlist[];
  meta: meta;
}

export interface meta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}
