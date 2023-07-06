import { getUserDataByUsernameApi, getUserProfileByUserIdApi } from "api/user";
import { useQuery } from "react-query";

export const useGetUserDataByUsername = (username: string) => {
    if (!username) return;
    const { ...rest } = useQuery({
        queryKey: ["getUsername", username],
        queryFn: async () => {
            return await getUserDataByUsernameApi(username);
        },
        enabled: !!username,
    });
    return { ...rest };
};

export const useGetUserProfile = (userId: string) => {
    if (!userId) return;
    const { ...rest } = useQuery({
        queryKey: ["getUserProfile", userId],
        queryFn: async () => {
            return await getUserProfileByUserIdApi(userId);
        },
        enabled: !!userId,
    });
    return { ...rest };
};