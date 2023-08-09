// useTotalNewUser.js
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { getTotalAudio } from '../../../Axios/Apis/audio/audio';

export function useTotalAudio() {
    const [totalAudio, setTotalAudio] = useState(0);

    const fetchTotalAudio = async () => {
        const res = await getTotalAudio();
        const data = res.data;
        return data;
    };

    const { isLoading, isSuccess, isError, data: totalAudios, error } = useQuery({
        queryKey: ['totalAudio'],
        queryFn: fetchTotalAudio,
        onSuccess: (data) => {
            setTotalAudio(data);
        }
    });

    return { totalAudio, isLoading, isSuccess, isError, error };
}
