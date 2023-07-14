import { Playlist } from "../models/playlist";

export interface PlaylistState {
  playlist: Playlist | null;
  id: Playlist | null;
  currentPage: Playlist | null;
  error: string | null;
}
