import { createAudioAPi } from "api/audio";
import { useMutation } from "react-query";

export const useCreateAudio = () =>
  useMutation({
    mutationFn: createAudioAPi,
  });
