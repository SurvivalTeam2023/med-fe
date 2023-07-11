import { getPlaylistByUserIdAPI } from "api/playlist";
import { useQuery } from "react-query";
import { useRef, useState } from "react";
import {
  PaginationProps,
  Space,
  Table,
  Button,
  Layout,
  theme,
  InputRef,
  Input,
  Avatar,
  Modal,
} from "antd";
import { Playlist, PlaylistsData } from "core/interface/models/playlist";
import moment from "moment";
import { Footer, Header } from "antd/es/layout/layout";
import { useNavigate } from "react-router";
import { FilterConfirmProps } from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons";
import type { ColumnType } from "antd/es/table";
import { toast, ToastContainer } from "react-toastify";
import { UserOutlined } from "@ant-design/icons";
import AudioManagePage from "pages/AudioPage/AudioManagePage";
import { useDispatch } from "react-redux";
import { audioActions } from "store/slice/audio.slice";
import { store } from "store";
import { playlistActions } from "store/slice";
function PlayListMusicPage() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const fetchPlaylist = async (page: number, name: string, status: string) => {
    const res = await getPlaylistByUserIdAPI(page, name, status);
    const data = res.data;
    return data;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const dispatch = useDispatch();

  const { data, isSuccess, isError, error } = useQuery<PlaylistsData, Error>(
    ["playlist", page],
    () => fetchPlaylist(page, name, status)
  );

  const onChange: PaginationProps["onChange"] = (current) => {
    setPage(current);
  };

  data?.items.map((playlist) => {
    let date = moment(new Date(playlist.createdAt));
    playlist.createdAt = date.calendar();
    return playlist.createdAt;
  });
  type DataIndex = keyof Playlist;

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setName(selectedKeys[0]);
    setPage(1);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setName("");
    setPage(1);
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<Playlist> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  return (
    <Layout
      style={{
        padding: 8,
        background: "#eee",
      }}
    >
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
            justifyContent: "space-between",
          }}
        >
          <span>Manage Playlist</span>
          <div>
            <Avatar shape="square" size="small" icon={<UserOutlined />} />
          </div>
        </div>
        <Modal
          open={isModalOpen}
          onOk={handleOk}
          footer={null}
          onCancel={handleCancel}
          centered={true}
          width={"65%"}
          style={{ border: "1px solid black" }}
          bodyStyle={{ padding: "8px" }}
        >
          <AudioManagePage />
        </Modal>

        <Table
          style={{ margin: "8px 0" }}
          className="playlist-table"
          dataSource={data?.items}
          scroll={{ y: 240 }}
          bordered
          rowKey={(record) => record.id}
          pagination={{
            total: data?.meta.totalItems,
            current: page,
            onChange: onChange,
            position: ["bottomCenter"],
          }}
          columns={[
            {
              title: "Name",
              dataIndex: "name",
              key: "name",
              width: "20%",
              ...getColumnSearchProps("name"),
            },
            {
              title: "Description",
              dataIndex: "description",
              key: "description",
              render: (text) => <a>{text}</a>,
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
                <Space size="middle">
                  <Button
                    type="primary"
                    onClick={() => {
                      navigate(`/playlist/${record.id}`, {
                        state: record.id,
                      });
                    }}
                  >
                    Detail
                  </Button>
                  <Button
                    type="primary"
                    key="audio"
                    onClick={() => {
                      const id: any = record.id;
                      const currentPage: any = page;
                      dispatch(playlistActions.setPlaylistId(id));
                      dispatch(
                        playlistActions.setPlaylistCurrentPage(currentPage)
                      );
                      showModal();
                    }}
                  >
                    Audios
                  </Button>
                </Space>
              ),
              width: "20%",
            },
          ]}
        />
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </div>
    </Layout>
  );
}
export default PlayListMusicPage;
