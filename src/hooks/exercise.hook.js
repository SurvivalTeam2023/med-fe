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
  const updateExercise = async ({ selectedExerciseId, payload }) => {
    const result = await updateExerciseAPI(selectedExerciseId, payload);
    return result;
  };
  return useMutation(updateExercise);
};
