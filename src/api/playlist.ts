import { CallAPI } from "core/api"
import { ApiResponse } from "core/interface/api"
import { PlaylistsData } from "core/interface/models/playlist";

export const getPlaylistByUserIdAPI = (
    page: number,
    limit?: number
): ApiResponse<PlaylistsData> => {
    const url = `/playlist?page=${page}&limit=${limit}`;
    return CallAPI.get(url)
}
