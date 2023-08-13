import { useMutation } from "@tanstack/react-query";
import { createPlaylistAPI } from "../Axios/Apis/playlist/playlist";

export const useCreatePlaylist = () =>
  useMutation({
    mutationFn: createPlaylistAPI,
  });
