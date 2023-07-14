import { getUserDataByUsernameApi, getUserProfileByUserIdApi, updateUserApi } from "api/user";
import { useMutation, useQuery } from "react-query";



export const useGetUserDataByUsername = (username: string) => {
    const { ...rest } = useQuery({
        queryKey: ["getUsername", username],
        queryFn: async () => {
            return await getUserDataByUsernameApi(username);
        },
        enabled: !!username,
    });
    if (!username) return;
    return { ...rest };
};

export const useGetUserProfile = (userId: string) => {
    const { ...rest } = useQuery({
        queryKey: ["getUserProfile", userId],
        queryFn: async () => {
            return await getUserProfileByUserIdApi(userId);
        },
        enabled: !!userId,
    });
    if (!userId) return;
    return { ...rest };
};

export const useUpdateUserApi = () =>
    useMutation({
        mutationFn: updateUserApi,
    });