import { useMutation } from "@tanstack/react-query";
import { createUserAPI } from "../Axios/Apis/user/user";

export const useCreateUser = () =>
  useMutation({
    mutationFn: createUserAPI,
  });
