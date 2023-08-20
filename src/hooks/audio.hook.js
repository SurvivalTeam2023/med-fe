import { useMutation } from "@tanstack/react-query";
import { createAudioAPI } from "../Axios/Apis/audio/audio";

export const useCreateAudio = () =>
  useMutation({
    mutationFn: createAudioAPI,
  });
