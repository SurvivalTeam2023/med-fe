export type GenreData = Genre[];

export interface Genre {
  id: number;
  createdAt: string;
  lastUpdatedAt: string;
  name: string;
  desc: string;
  image: string;
  status: string;
  emotion: string;
  audioGenre: AudioGenre[];
}

export interface AudioGenre {
  id: number;
  audio: Audio;
}

export interface Audio {
  id: number;
  createdAt: string;
  lastUpdatedAt: string;
  name: string;
  imageUrl: string;
  status: string;
  length: string;
  liked: number;
}

export interface Meta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}
