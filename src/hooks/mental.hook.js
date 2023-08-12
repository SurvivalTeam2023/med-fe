import { useMutation } from "@tanstack/react-query";
import {
  createMentalHealthAPI,
  updateMentalHealthAPI,
} from "../Axios/Apis/mentalHealth/mentalHealth";

export const useCreateMentalHealthApi = () =>
  useMutation({
    mutationFn: createMentalHealthAPI,
  });

export const useUpdateMentalHealthApi = (mentalId) =>
  useMutation({
    mutationFn: updateMentalHealthAPI(mentalId),
  });
