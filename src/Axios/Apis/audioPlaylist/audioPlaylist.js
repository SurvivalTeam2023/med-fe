import { CallAPI } from "../../AxiosBase";

export const addAudioToPlaylistAPI = (payload) => {
  const { playlistId, audioId } = payload;
  const url = "/audioPlaylist";
  return CallAPI.post(url, { playlistId, audioId });
};
