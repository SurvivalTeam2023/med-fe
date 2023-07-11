import { CallAPI } from "core/axiosCore";
import { ApiResponse } from "core/interface/api";
import { TracksData, Track } from "core/interface/models/track";

export const getTrackByPlaylistIdAPI = (
  playlistId: number,
  page: number,
): ApiResponse<TracksData> => {
  const url = `/audio?status=ACTIVE&playlistId=${playlistId}&page=${page}`;
  return CallAPI.get(url);
};

export const getTrackDetailAPI = (audioid: string): ApiResponse<Track> => {
  const url = `/audio/${audioid} `;
  return CallAPI.get(url);
};
