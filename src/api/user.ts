import { CallAPI } from "core/api";
import { ApiResponse } from "core/interface/api";
import { User, UserData } from "core/interface/models";

export const getUsersAPI = (
    token: string | undefined
): ApiResponse<User[]> => {
    const url = `/user/userList `;
    return CallAPI.get(url,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
}

export const getUserDetailAPI = (
    token: string | undefined,
    username: string
): ApiResponse<UserData> => {
    const url = `/user/${username} `;
    console.log(url
        );

    return CallAPI.get(url,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
}