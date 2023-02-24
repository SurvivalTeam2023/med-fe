import { CallAPI } from "core/api";
import { ApiResponse } from "core/interface/api";
import { UsersData } from "core/interface/models";

export const getUsersAPI = (
    token: string
): ApiResponse<UsersData[]> => {
    const url = `/user/userList `;
    return CallAPI.get(url,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
}