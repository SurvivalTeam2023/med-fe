import { Base } from "./base";
import { User } from "./user";

export interface Audio extends Base {
    artist: string
    id: string;
    length: string;
    lastUpdatedAt: string
    name: string;
    desc: string;
    status: string;
    currentPage: string;
    user: User;
}
export interface AudiosData {
    items: Audio[];
    meta: meta;
}

export interface meta {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
}
