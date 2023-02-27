import { Descriptions, Image } from "antd";
import { getTrackDetailAPI } from "api/playlistTracks";
import { Track } from "core/interface/models/track";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";

function AudioDetail() {
    const location = useLocation();
    const audioid = location.state
    const fetchAudioInfo = async () => {
        const res = await getTrackDetailAPI(audioid)
        const data = res.data
        return data
    }
    const {
        isLoading,
        isError,
        error,
        data,
    } = useQuery<Track, Error>(['track'], async () => fetchAudioInfo())
    console.log(data);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error?.message}</div>;
    }

    return (
        <Descriptions title="Audio Info" layout="vertical" bordered>
            <Descriptions.Item label="Name">{data?.name}</Descriptions.Item>
            <Descriptions.Item label="Length">{data?.length}</Descriptions.Item>
            <Descriptions.Item label="Image"><Image
            width={200}
            src={data?.imageUrl}/> 
            </Descriptions.Item>
            <Descriptions.Item label="Artist">{data?.artist.artist_name}</Descriptions.Item>
            <Descriptions.Item label="File">{data?.file.url}</Descriptions.Item>
        </Descriptions >
    );

}
export default AudioDetail;
