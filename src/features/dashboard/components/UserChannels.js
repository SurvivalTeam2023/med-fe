import { useQuery } from "@tanstack/react-query";
import { getTop10Listened } from "../../../Axios/Apis/audio/audio";
import TitleCard from "../../../components/Cards/TitleCard"



function UserChannels() {
    const fetchTop10 = async () => {
        const res = await getTop10Listened()
        const data = res.data;
        return data;
    };

    const { isLoading, data, isError, isSuccess, error } = useQuery({
        queryKey: ['top10'],
        queryFn: fetchTop10,

    });
    if (isLoading) {
        // Return loading indicator or message
        return <div>Loading...</div>;
    }
    if (isError) {
        console.log(error.message);
    }
    return (
        <TitleCard title={"Top 10 Listened Song"}>
            {/** Table Data */}
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th className="normal-case">Song</th>
                            <th className="normal-case">Artist</th>
                            <th className="normal-case">Number of Listened</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((u, k) => {
                                return (
                                    <tr key={k}>
                                        <th>{k + 1}</th>
                                        <td>{u.audio_name}</td>
                                        <td>{u.artist_artist_name}</td>
                                        <td>{u.sumCount}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </TitleCard>
    )
}

export default UserChannels