import { Base } from "./base";

export interface Genre extends Base {
  id: string;
  createdAt: string;
  lastUpdatedAt: string;
  name: string;
  desc: string;
  image: string;
  status: string;
  emotion: string;
}

export interface GenreData {
  items: Genre[];
  meta: Meta;
}

export interface Meta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}
