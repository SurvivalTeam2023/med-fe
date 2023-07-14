import { Base } from "./base";
import { Playlist } from "./playlist";
import { Artist } from "./artist";
export interface Track extends Base {
  id: string;
  name: string;
  imageUrl: string;
  status: string;
  length: string;
  playlist: Playlist;
  file: FileUpload;
  createdAt: string;
  artist: Artist;
}
export interface FileUpload extends File {
  url: string;
}
export interface TracksData {
  items: Track[];
  meta: Meta;
}
export interface Meta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}
