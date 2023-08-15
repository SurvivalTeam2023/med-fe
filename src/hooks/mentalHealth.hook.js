import { useMutation } from "@tanstack/react-query";
import {
  createMentalHealthAPI,
  updateMentalHealthAPI,
} from "../Axios/Apis/mentalHealth/mentalHealth";

export const useCreateMentalHealth = () =>
  useMutation({
    mutationFn: createMentalHealthAPI,
  });

export const useUpdateMentalHealth = () => {
  const updateMental = async ({ selectedMentalId, payload }) => {
    const result = await updateMentalHealthAPI(selectedMentalId, payload);
    return result;
  };
  return useMutation(updateMental);
};
