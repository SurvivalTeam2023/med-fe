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
} from "antd";
import moment from "moment";
import { Footer, Header } from "antd/es/layout/layout";
import { getTrackByPlaylistIdAPI } from "api/playlistTracks";
import { TracksData } from "core/interface/models/track";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
function AudioManagePage() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [page, setPage] = useState(1);
  const location = useLocation();
  const id = location.state;
  const [collapsed, setCollapsed] = useState(false);
  const fetchAudios = async (page: number, playlistId: number) => {
    const res = await getTrackByPlaylistIdAPI(playlistId, page);
    const data = res.data;
    return data;
  };
  const onClick: MenuProps["onClick"] = (e) => {
    navigate(`/${e.key}`);
  };
  const navigate = useNavigate();

  const { Sider } = Layout;

  const { isSuccess, isError, error, data } = useQuery<TracksData, Error>(
    ["track", page],
    () => fetchAudios(page, id)
  );

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
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          className="logo"
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
          }}
        >
          Med App
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={["playlist"]}
          items={[
            {
              key: "user",
              label: "User",
              onClick: onClick,
            },
            {
              key: "playlist",
              label: "Playlist",
              onClick: onClick,
            },
            {
              key: "plan",
              label: "Plan",
              onClick: onClick,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            textAlign: "center",
            fontSize: "2em",
          }}
        >
          {" "}
          Manage Audio
        </Header>
        <Table
          className="audio-table"
          dataSource={data?.items}
          bordered
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
                    navigate(`/audio/${record.id}`, { state: record.id });
                  }}
                >
                  Detail
                </Button>
              ),
              width: "20%",
            },
          ]}
        />
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
export default AudioManagePage;
