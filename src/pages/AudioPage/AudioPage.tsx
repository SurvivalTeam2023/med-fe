import { getPlaylistByUserIdAPI } from "api/playlist";
import { useQuery } from "react-query";
import { useEffect, useRef, useState } from "react";
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
  Form,
  Select,
} from "antd";

import {
  Playlist,
  PlaylistsData,
  newPlaylist,
} from "core/interface/models/playlist";
import moment from "moment";
import { useNavigate } from "react-router";
import type { ColumnType } from "antd/es/table";
import { toast, ToastContainer } from "react-toastify";
import AudioManagePage from "pages/AudioPage/AudioManagePage";
import { useDispatch } from "react-redux";
import { audioActions } from "store/slice/audio.slice";
import { store } from "store";
import { playlistActions } from "store/slice";
import { FilterConfirmProps } from "antd/es/table/interface";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Footer } from "antd/es/layout/layout";
import { useCreatePlaylistAPI } from "hooks/playlist.hook";
import { getAudioAPi } from "api/audio";
import { Audio, AudiosData } from "core/interface/models/audio";
import { getGenreAPI } from "api/genre";
import { GenreData } from "core/interface/models/genre";

function AudioPage() {
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [createAudioModal, setCreateAudioModal] = useState(false);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [form] = Form.useForm();
  const { mutate } = useCreatePlaylistAPI();
  const { Option } = Select;
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const formData = new FormData();

  const onFileChange = (file: any) => {
    setSelectedFile(file);
  };

  const handleGenreChange = (value: number) => {
    setSelectedGenreId(value);
  };

  const fetchAudio = async (page: number) => {
    const res = await getAudioAPi(page);
    const data = res.data;
    return data;
  };

  const fetchGenre = async (page: number) => {
    const res = await getGenreAPI(page);
    const dataGenre = res.data;
    return dataGenre;
  };

  const [modalAudioListByPlaylistId, setModalAudioListByPlaylistId] =
    useState(false);
  const [modalPlaylistDetail, setModalPLaylistDetail] = useState(false);

  const dispatch = useDispatch();
  const handleCreatePlaylistClick = () => {
    // Trigger the form submission manually
    form.submit();
  };
  const handleCreateAudio = (
    name: string,
    imageUrl: string,
    description: string,
    isPublic: string = "PUBLIC"
  ) => {
    mutate(
      {
        name: name,
        imageUrl: imageUrl,
        description: description,
        isPublic: isPublic,
      },
      {
        onSuccess: (data) => {
          console.log("Create Success");
          alert("Success");
          toast.success("Success", {
            // Toggles the success state of the toast notification.
            closeButton: true,
          });
        },
        onError: (error) => {
          console.log("Create Failed r bro", error);
        },
      }
    );
  };
  const onFinish = (values: newPlaylist) => {
    // Perform any necessary actions with the form values here
    console.log("values received", values);
    const { name, imageUrl, description } = values;
    if (values) {
      handleCreateAudio(name, imageUrl, description);
    } else {
      console.log("Can not get input values");
    }
  };

  const { data, isSuccess, isError, error } = useQuery<AudiosData, Error>(
    ["audio", page],
    () => fetchAudio(page)
  );

  const {
    data: dataGenre,
    isLoading,
    error: errorGenre,
  } = useQuery<GenreData, Error>(["genre", page], () => fetchGenre(page));

  const onChange: PaginationProps["onChange"] = (current: any) => {
    setPage(current);
  };

  data?.items.map((audio) => {
    let date = moment(new Date(audio.createdAt));
    audio.createdAt = date.format("YYYY-MM-DD");
    return audio.createdAt;
  });
  type DataIndex = keyof Audio;

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

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<Audio> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
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
    <div>
      <Modal
        centered
        footer={false}
        bodyStyle={{ width: "100%", height: "50%", padding: "12px" }}
        open={modalAudioListByPlaylistId}
        width={"75%"}
        onOk={() => setModalAudioListByPlaylistId(false)}
        onCancel={() => setModalAudioListByPlaylistId(false)}
        key={modalAudioListByPlaylistId ? "visible" : "hidden"}
      >
        <AudioManagePage />
      </Modal>
      <Modal
        centered
        footer={false}
        bodyStyle={{ width: "100%", padding: "12px" }}
        open={modalPlaylistDetail}
        width={"75%"}
        onOk={() => setModalPLaylistDetail(false)}
        onCancel={() => setModalPLaylistDetail(false)}
        key={modalPlaylistDetail ? "visible" : "hidden"}
      ></Modal>
      <Modal
        title="Create audio"
        centered
        footer={true}
        bodyStyle={{ width: "100%", padding: "12px" }}
        open={createAudioModal}
        width={"75%"}
        onOk={() => setCreateAudioModal(false)}
        onCancel={() => setCreateAudioModal(false)}
        key={createAudioModal ? "visible" : "hidden"}
      >
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
            ></div>
            <div>
              <Form
                layout="vertical"
                name="basic"
                labelAlign="left"
                wrapperCol={{ span: 20 }}
                style={{ paddingTop: "20px" }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div>
                    <Form.Item
                      label="Name"
                      name="name"
                      style={{ marginBottom: "8px" }}
                    >
                      <Input style={{ width: "100%" }} placeholder="Name" />
                    </Form.Item>
                    <Form.Item
                      label="imageUrl"
                      name="imageUrl"
                      style={{ marginBottom: "8px" }}
                    >
                      <Input
                        style={{ width: "100%" }}
                        placeholder="Image Url"
                      />
                    </Form.Item>
                    <Form.Item
                      label="description"
                      name="description"
                      style={{ marginBottom: "8px" }}
                    >
                      <Input
                        style={{ width: "100%" }}
                        placeholder="Description"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Avatar"
                      name="avatar"
                      style={{ marginBottom: "1px" }}
                    >
                      <div>
                        <input
                          type="file"
                          onChange={(e: any) => {
                            const selectedFile = e.target.files?.[0];

                            if (selectedFile) {
                              const formData = new FormData(); // Create a new FormData instance
                              formData.append(
                                "myFile",
                                selectedFile,
                                selectedFile.name
                              ); // Append the selected file to the formData

                              console.log(formData); // Log the formData object
                              onFileChange(selectedFile); // Pass the selected file to the onFileChange handler

                              console.log("selected file", selectedFile); // Log the selected file
                            }
                            onFileChange(formData);

                            console.log("selected file", selectedFile);
                          }}
                        />
                      </div>
                    </Form.Item>
                    <Form.Item
                      label="Genre"
                      name="Genre"
                      style={{ marginBottom: "8px" }}
                    >
                      <Select
                        style={{ width: "100%" }}
                        placeholder="Select a Genre"
                        onChange={handleGenreChange} // Handle the onChange event
                        value={selectedGenreId} // Set the selected value from state
                      >
                        {dataGenre?.map((genre) => (
                          <Option key={genre.id} value={genre.id}>
                            {genre.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                </div>

                <Form.Item wrapperCol={{ offset: 10 }}>
                  <div>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{
                        width: "20%",
                        background:
                          "linear-gradient(to bottom, rgba(255, 124, 0, 1), rgba(10, 10, 89, 1))",
                        color: "white",
                        borderRadius: 16,
                      }}
                      onClick={() => {
                        handleCreatePlaylistClick();
                      }}
                    >
                      Save
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </Modal>
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
            <span>Manage Audio</span>
            <div>
              <Button
                onClick={() => {
                  setCreateAudioModal(true);
                }}
              >
                Create
              </Button>
            </div>
          </div>

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
                title: "Length",
                dataIndex: "length",
                key: "length",
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
                width: "30%",
              },
              {
                title: "Action",
                key: "action",
                render: (text, record, index) => (
                  <Space size="middle">
                    <Button
                      type="primary"
                      onClick={() => {
                        const id: any = record.id;
                        dispatch(playlistActions.setPlaylistId(id));
                        setModalPLaylistDetail(true);
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
                        setModalAudioListByPlaylistId(true);
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
    </div>
  );
}
export default AudioPage;
