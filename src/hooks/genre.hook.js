import { useMutation } from "@tanstack/react-query";
import { createGenreAPI, updateGenreAPI } from "../Axios/Apis/genre/genre";

export const useCreateGenre = () =>
  useMutation({
    mutationFn: createGenreAPI,
  });

export const useUpdateGenre = () => {
  const updateUser = async ({ selectedGenreId, payload }) => {
    const result = await updateGenreAPI(selectedGenreId, payload);
    return result;
  };
  return useMutation(updateUser);
};
