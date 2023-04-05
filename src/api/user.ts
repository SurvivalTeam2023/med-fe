import { CallAPI } from "core/api";
import { ApiResponse } from "core/interface/api";
import { User, UserData } from "core/interface/models";

export const getUsersAPI = (
): ApiResponse<User[]> => {
    const url = `/user/userList`;
    return CallAPI.get(url)
}

export const getUserDetailAPI = (
    username: string
): ApiResponse<UserData> => {
    const url = `/user/${username}`;
    return CallAPI.get(url)
}

export const editUserStatusAPI = (
    status: any,
    username: string
    ): ApiResponse<User> => {
    const url = `/user/${username}`;
    return CallAPI.patch(url, status)
}