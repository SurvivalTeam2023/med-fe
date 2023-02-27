import { CallAPI } from "core/api"
import { ApiResponse } from "core/interface/api"
import { PlaylistsData } from "core/interface/models/playlist";

export const getPlaylistByUserIdAPI = (
    page: number,
    name?: string,
    status?: string,
    limit?: number
): ApiResponse<PlaylistsData> => {
    let queryParam = ``
    if (name)
        queryParam = queryParam + `&name=${name}`
    if (status)
        queryParam = queryParam + `&status=${status}`
    const url = `/playlist?page=${page}&limit=${limit}` + queryParam;
    console.log(url);
    return CallAPI.get(url)
}
