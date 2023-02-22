import { Playlist } from "../models/playlist";

export interface PlaylistState {
  playlist: Playlist | null;
  error: string | null
}

