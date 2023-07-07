import { getTokenApi, registerUserApi } from "api/auth";
import { useMutation } from "react-query";
export const useLoginApi = () =>
    useMutation({
        mutationFn: getTokenApi,
    });
export const useRegisterUserApi = () =>
    useMutation({
        mutationFn: registerUserApi,
    });