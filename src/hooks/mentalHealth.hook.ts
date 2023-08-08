import { createMentalHealthAPI } from "api/mentalHealth";
import { useMutation } from "react-query";

export const useCreateMentalHealth = () =>
  useMutation({
    mutationFn: createMentalHealthAPI,
  });
