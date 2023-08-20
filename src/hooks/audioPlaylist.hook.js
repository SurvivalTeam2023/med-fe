import { useMutation } from "@tanstack/react-query";
import { addAudioToPlaylistAPI } from "../Axios/Apis/audioPlaylist/audioPlaylist";

export const useAddAudioToPlaylist = () =>
  useMutation({
    mutationFn: addAudioToPlaylistAPI,
    onSuccess: (data) => {
      console.log("success", data);
    },
  });
