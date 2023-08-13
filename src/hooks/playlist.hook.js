import { useMutation } from "@tanstack/react-query";
import {
  createPlaylistAPI,
  updatePlaylistAPI,
} from "../Axios/Apis/playlist/playlist";

export const useCreatePlaylist = () =>
  useMutation({
    mutationFn: createPlaylistAPI,
  });

export const useUpdatePlaylist = () => {
  const updatePlaylist = async ({ selectedPlaylistId, payload }) => {
    const result = await updatePlaylistAPI(selectedPlaylistId, payload);
    return result;
  };
  return useMutation(updatePlaylist);
};
