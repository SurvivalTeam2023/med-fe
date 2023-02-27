import { CallAPI } from "core/api"
import { ApiResponse } from "core/interface/api"
import { TracksData } from "core/interface/models/track";

export const getTrackByPlaylistIdAPI = (
    playlistId: number,
    page: number,
    limit: number,
): ApiResponse<TracksData> => {
    const url = `/audio?status=ACTIVE&page=${page}&limit=${limit}&playlistId=${playlistId}`;
    return CallAPI.get(url)
}
