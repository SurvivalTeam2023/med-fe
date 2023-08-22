import { useMutation } from "@tanstack/react-query";

import {
  createOptionAPI,
  updateOptionAPI,
} from "../Axios/Apis/options/options";

export const useCreateOption = () =>
  useMutation({
    mutationFn: createOptionAPI,
  });

export const useUpdateOption = () => {
  const updateOption = async ({ selectedOptionId, payload }) => {
    const result = await updateOptionAPI(selectedOptionId, payload);
    return result;
  };
  return useMutation(updateOption);
};
