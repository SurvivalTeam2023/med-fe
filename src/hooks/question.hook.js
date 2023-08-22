import { useMutation } from "@tanstack/react-query";
import {
  createQuestionAPI,
  updateQuestionAPI,
} from "../Axios/Apis/question/question";

export const useCreateQuestion = () =>
  useMutation({
    mutationFn: createQuestionAPI,
  });

export const useUpdateQuestion = () => {
  const updateQuestion = async ({ selectedQuestionId, payload }) => {
    const result = await updateQuestionAPI(selectedQuestionId, payload);
    return result;
  };
  return useMutation(updateQuestion);
};
