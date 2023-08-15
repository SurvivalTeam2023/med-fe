import { useMutation } from "@tanstack/react-query";
import { createUserAPI, updateUserAPI } from "../Axios/Apis/user/user";

export const useCreateUser = () =>
  useMutation({
    mutationFn: createUserAPI,
  });

export const useUpdateUser = () => {
  const updateUser = async ({ selectedLeadId, payload }) => {
    const result = await updateUserAPI(selectedLeadId, payload);
    return result;
  };
  return useMutation(updateUser);
};
