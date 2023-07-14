import { Descriptions, Image, Layout, Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { getPLaylistDetailAPI } from "api/playlist";
import { getTrackDetailAPI } from "api/playlistTracks";
import { Playlist } from "core/interface/models/playlist";
import { Track } from "core/interface/models/track";
import moment from "moment";
import { useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { store } from "store";

function PlaylistDetailPage() {
  const location = useLocation();
  const playlistId: any = store.getState().playlist.id;
  const [collapsed, setCollapsed] = useState(false);
  const fetchPlaylistInfo = async () => {
    const res = await getPLaylistDetailAPI(playlistId);
    const data = res.data;
    console.log(data);
    return data;
  };
  const navigate = useNavigate();

  const onClick: MenuProps["onClick"] = (e) => {
    navigate(`/${e.key}`);
  };
  const { isLoading, isError, error, data } = useQuery<Playlist, Error>(
    ["playlist"],
    async () => fetchPlaylistInfo()
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <Layout>
      <div style={{ padding: 8, background: "#fff" }}>
        <div
          style={{
            padding: "12px 8px",
            background: "#EEEEEE",
            display: "flex",
            alignItems: "center",
            paddingLeft: 4,
            fontSize: 16,
            fontWeight: "500",
            justifyContent: "center",
          }}
        >
          Playlist info
        </div>
        <div style={{ padding: 8, background: "#eee" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: 8,
              background: "#fff",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "0px 52px",
              }}
            >
              <Image
                width={200}
                src={`${data?.imageUrl}`}
                style={{ borderRadius: "100px" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Descriptions layout="horizontal">
                <Descriptions.Item label="Name">{data?.name}</Descriptions.Item>
                <Descriptions.Item label="Description">
                  {data?.description}
                </Descriptions.Item>
                <Descriptions.Item label="playlistType">
                  {data?.playlistType}
                </Descriptions.Item>
                <Descriptions.Item label="createdAt">
                  {moment(data?.createdAt).format("DD-MM-YYYY")}
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  {data?.status}
                </Descriptions.Item>
              </Descriptions>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default PlaylistDetailPage;
