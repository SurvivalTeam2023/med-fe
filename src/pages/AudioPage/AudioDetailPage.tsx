import { Descriptions, Image, Layout, Menu, MenuProps } from "antd";
import { getTrackDetailAPI } from "api/playlistTracks";
import { Track } from "core/interface/models/track";
import moment from "moment";
import { useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { store } from "store";

function AudioDetailPage() {
  const audioId: any = store.getState().audio.audioId;
  const fetchAudioInfo = async () => {
    const res = await getTrackDetailAPI(audioId);
    const data = res.data;
    console.log(data);
    return data;
  };
  const navigate = useNavigate();

  const { isLoading, isError, error, data } = useQuery<Track, Error>(
    ["track"],
    async () => fetchAudioInfo()
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
          Audio info
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
              <Descriptions layout="vertical">
                <Descriptions.Item label="Audio name">
                  {data?.name}
                </Descriptions.Item>
                <Descriptions.Item label="Artist">
                  {data?.artist.artist_name}
                </Descriptions.Item>
                <Descriptions.Item label="Length">
                  {data?.length}
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
export default AudioDetailPage;
