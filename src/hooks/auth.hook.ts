import { getTokenApi } from "api/auth";
import { useMutation } from "react-query";
import { LoginPayload } from "core/interface/models/auth";
export const useLoginApi = () =>
    useMutation({
        mutationFn: getTokenApi,
    });