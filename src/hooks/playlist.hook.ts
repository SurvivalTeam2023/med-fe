import { createPlaylistAPI } from "api/playlist";
import { useMutation } from "react-query";

export const useCreatePlaylistAPI = () =>
  useMutation({
    mutationFn: createPlaylistAPI,
  });
