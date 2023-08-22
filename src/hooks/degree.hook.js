import { useMutation } from "@tanstack/react-query";
import { createDegreeAPI, updateDegreeAPI } from "../Axios/Apis/degree/degree";

export const useCreateDegree = () =>
  useMutation({
    mutationFn: createDegreeAPI,
  });

export const useUpdateDegree = () => {
  const updateDegree = async ({ selectedDegreeId, payload }) => {
    const result = await updateDegreeAPI(selectedDegreeId, payload);
    return result;
  };
  return useMutation(updateDegree);
};
