import { useQuery } from "react-query";
import { useState } from "react";
import {
  PaginationProps,
  Table,
  Button,
  Layout,
  Menu,
  theme,
  MenuProps,
  Modal,
} from "antd";
import moment from "moment";
import { Footer, Header } from "antd/es/layout/layout";
import { getTrackByPlaylistIdAPI } from "api/playlistTracks";
import { TracksData } from "core/interface/models/track";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { store } from "store";
import { useDispatch } from "react-redux";
import { audioActions } from "store/slice/audio.slice";
import AudioDetailPage from "./AudioDetailPage";
function AudioManagePage() {
  const [modalAudioDetail, setModalAudioDetail] = useState(false);
  const [modalUpdateAudio, setModalUpdateAudio] = useState(false);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const playlistId: any = store.getState().playlist.id;

  const fetchAudios = async (page: number, playlistId: number) => {
    const res = await getTrackByPlaylistIdAPI(playlistId, page);
    const data = res.data;
    console.log(data);
    return data;
  };
  const onClick: MenuProps["onClick"] = (e) => {
    navigate(`/${e.key}`);
  };
  const navigate = useNavigate();

  const { Sider } = Layout;

  const { isSuccess, isError, error, data } = useQuery<TracksData, Error>(
    ["track", page],
    () => fetchAudios(page, playlistId)
  );
  console.log(playlistId);
  console.log(page);

  if (isSuccess) {
    toast.success("Success");
    toast.clearWaitingQueue();
  }

  if (isError) {
    toast.error(error?.message);
    toast.clearWaitingQueue();
  }
  const onChange: PaginationProps["onChange"] = (current) => {
    setPage(current);
  };
  data?.items.map((track) => {
    let date = moment(new Date(track.createdAt));
    track.createdAt = date.calendar();
  });

  return (
    <div>
      <Modal
        centered
        bodyStyle={{ width: "70", padding: "12px" }}
        open={modalAudioDetail}
        width={"60%"}
        onOk={() => setModalAudioDetail(false)}
        onCancel={() => setModalAudioDetail(false)}
        key={modalAudioDetail ? "visible" : "hidden"}
      >
        <AudioDetailPage />
      </Modal>
      <Layout style={{ padding: 8, background: "#eee" }}>
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
            Mange Audio
          </div>
          <Table
            className="audio-table"
            dataSource={data?.items}
            bordered
            style={{ padding: "8px, 0px" }}
            pagination={{
              total: data?.meta.totalItems,
              current: page,
              onChange: onChange,
              position: ["bottomCenter"],
            }}
            columns={[
              { title: "Name", dataIndex: "name", key: "name", width: "20%" },
              {
                title: "File",
                dataIndex: ["file", "url"],
                key: "file",
                width: "20%",
              },
              {
                title: "Status",
                dataIndex: "status",
                key: "status",
                width: "20%",
              },
              {
                title: "Created Date",
                dataIndex: "createdAt",
                key: "createdAt",
                width: "20%",
              },
              {
                title: "Action",
                key: "action",
                render: (text, record, index) => (
                  <Button
                    type="primary"
                    onClick={() => {
                      const id: any = record.id;
                      dispatch(audioActions.setAudioId(id));
                      setModalAudioDetail(true);
                    }}
                  >
                    Detail
                  </Button>
                ),
                width: "20%",
              },
            ]}
          />
        </div>
      </Layout>
    </div>
  );
}
export default AudioManagePage;
