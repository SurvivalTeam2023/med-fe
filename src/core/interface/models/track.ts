import { Base } from "./base";
import { Playlist } from "./playlist";
import { Artist } from "./artist";
import { File } from "./file"
export interface Track extends Base {
    name: string,
    imageUrl: string,
    status: string,
    length: string,
    playlist: Playlist,
    file: File, 
    artist: Artist,
  }
  export interface TracksData {
    items: Track[],
    meta: meta
  }
  export interface meta {
    totalItems: number,
    itemCount: number,
    itemsPerPage: number,
    totalPages: number,
    currentPage: number
  }
