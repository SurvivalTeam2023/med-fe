import { useMutation } from "@tanstack/react-query";
import { createGenreAPI } from "../Axios/Apis/genre/genre";

export const useCreateGenre = () =>
  useMutation({
    mutationFn: createGenreAPI,
  });
