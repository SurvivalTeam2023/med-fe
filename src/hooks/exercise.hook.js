import { useMutation } from "@tanstack/react-query";
import {
  createExerciseAPI,
  updateExerciseAPI,
} from "../Axios/Apis/exercise/exercise";

export const useCreateExercise = () =>
  useMutation({
    mutationFn: createExerciseAPI,
  });

export const useUpdateExercise = () => {
  const updateExercise = async ({ id, payload }) => {
    const result = await updateExerciseAPI(id, payload);
    return result;
  };
  return useMutation(updateExercise);
};
