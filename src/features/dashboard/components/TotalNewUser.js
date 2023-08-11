// useTotalNewUser.js
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { getNewUser } from '../../../Axios/Apis/user/user';

export function useTotalNewUser() {
    const [totalNewUser, setTotalNewUser] = useState(0);

    const fetchTotalNewUser = async () => {
        const month = moment().month()+1;
        const res = await getNewUser(month);
        const data = res.data;
        return data;
    };

    const { isLoading, isSuccess, isError, data: newUserActiveUsers, error } = useQuery({
        queryKey: ['newUser'],
        queryFn: fetchTotalNewUser,
        onSuccess: (data) => {
            setTotalNewUser(data);
        }
    });

    return { totalNewUser, isLoading, isSuccess, isError, error };
}
