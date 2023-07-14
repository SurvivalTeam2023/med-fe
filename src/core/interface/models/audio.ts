import { Base } from "./base";
import { User } from "./user";

export interface Audio extends Base {
    id: string;
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
