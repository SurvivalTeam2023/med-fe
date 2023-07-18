import { CallAPI } from "core/axiosCore";
import { ApiResponse } from "core/interface/api";
import {
  Playlist,
  PlaylistsData,
  newPlaylist,
} from "core/interface/models/playlist";

export const getPlaylistByUserIdAPI = (
  page: number,
  name?: string,
  status?: string
): ApiResponse<PlaylistsData> => {
  let queryParam = ``;
  if (name) queryParam = queryParam + `&name=${name}`;
  if (status) queryParam = queryParam + `&status=${status}`;
  const url = `/playlist?page=${page}` + queryParam;
  return CallAPI.get(url);
};

export const getPLaylistDetailAPI = (
  playlistId: string
): ApiResponse<Playlist> => {
  const url = `/playlist/${playlistId} `;
  return CallAPI.get(url);
};

export const createPlaylistAPI = (
  payload: newPlaylist
): ApiResponse<newPlaylist> => {
  const { name, imageUrl, isPublic, description } = payload;
  const url = "/playlist";
  return CallAPI.post(url, {
    name,
    imageUrl,
    isPublic,
    description,
  });
};
