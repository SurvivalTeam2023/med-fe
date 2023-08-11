// useTotalActiveUsers.js
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTotalActiveUser } from '../../../Axios/Apis/user/user';

export function useTotalActiveUsers() {
    const [totalActiveUsers, setTotalActiveUsers] = useState(0);

    const fetchTotalActiveUser = async () => {
        const res = await getTotalActiveUser()
        const data = res.data;
        return data;
    };

    const { isLoading: isLoadingTotal, data: activeUsers, isError: isErrorTotal } = useQuery({
        queryKey: ['total'],
        queryFn: fetchTotalActiveUser,
        onSuccess: (data) => {
            setTotalActiveUsers(data);
        }
    });

    return { totalActiveUsers, isLoadingTotal, isErrorTotal };
}
