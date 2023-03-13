import { Descriptions, Image, Layout, Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { getTrackDetailAPI } from "api/playlistTracks";
import { Track } from "core/interface/models/track";
import { useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";

function AudioDetail() {
    const location = useLocation();
    const audioid = location.state
    const [collapsed, setCollapsed] = useState(false);
    const fetchAudioInfo = async () => {
        const res = await getTrackDetailAPI(audioid)
        const data = res.data
        return data
    }
    const navigate = useNavigate();

    const onClick: MenuProps['onClick'] = (e) => {
        navigate(`/${e.key}`)
    };
    const {
        isLoading,
        isError,
        error,
        data,
    } = useQuery<Track, Error>(['track'], async () => fetchAudioInfo())

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error?.message}</div>;
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="logo" style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }}>Med App</div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={['playlist']}
                    items={[
                        {
                            key: 'user',
                            label: 'User',
                            onClick: onClick
                        },
                        {
                            key: 'playlist',
                            label: 'Playlist',
                            onClick: onClick

                        },
                        {
                            key: 'plan',
                            label: 'Plan',
                            onClick: onClick

                        },
                    ]}
                />
            </Sider>
            <Descriptions title="Audio Info" layout="vertical" bordered>
                <Descriptions.Item label="Name">{data?.name}</Descriptions.Item>
                <Descriptions.Item label="Length">{data?.length}</Descriptions.Item>
                <Descriptions.Item label="Image"><Image
                    width={200}
                    src={data?.imageUrl} />
                </Descriptions.Item>
                <Descriptions.Item label="Artist">{data?.artist.artist_name}</Descriptions.Item>
                <Descriptions.Item label="File">{data?.file.url}</Descriptions.Item>
            </Descriptions >
        </Layout >
    );

}
export default AudioDetail;
