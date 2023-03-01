import { CallAPI } from "core/api"
import { ApiResponse } from "core/interface/api"
import { PlaylistsData } from "core/interface/models/playlist";

export const getPlaylistByUserIdAPI = (
    page: number,
    name?: string,
    status?: string,
): ApiResponse<PlaylistsData> => {
    let queryParam = ``
    if (name)
        queryParam = queryParam + `&name=${name}`
    if (status)
        queryParam = queryParam + `&status=${status}`
    const url = `/playlist?page=${page}` + queryParam;
    return CallAPI.get(url)
}
