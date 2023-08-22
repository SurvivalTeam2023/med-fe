import { useMutation } from "@tanstack/react-query";
import { createPlanAPI, updatePlanAPI } from "../Axios/Apis/plan/plan";

export const useCreatePlan = () =>
  useMutation({
    mutationFn: createPlanAPI,
  });

export const useUpdatePlan = () => {
  const updatePlan = async ({ selectedPlanId, payload }) => {
    const result = await updatePlanAPI(selectedPlanId, payload);
    return result;
  };
  return useMutation(updatePlan);
};
