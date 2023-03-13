import { getPlaylistByUserIdAPI } from "api/playlist"
import { useQuery } from "react-query"
import { useRef, useState } from "react";
import { PaginationProps, Space, Table, Button, Layout, Menu, theme, MenuProps, InputRef, Input } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Playlist, PlaylistsData } from "core/interface/models/playlist";
import moment from "moment";
import { Footer, Header } from "antd/es/layout/layout";
import { useNavigate } from "react-router";
import { FilterConfirmProps } from "antd/es/table/interface";
import { SearchOutlined } from '@ant-design/icons';
import type { ColumnType } from 'antd/es/table';
import { toast, ToastContainer } from "react-toastify";
;

function PlaylistPage() {
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const navigate = useNavigate();
  const [page, setPage] = useState(1)
  const [name, setName] = useState('')
  const [status, setStatus] = useState('')
  const [collapsed, setCollapsed] = useState(false);
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const fetchPlaylist = async (page: number, name: string, status: string) => {
    const res = await getPlaylistByUserIdAPI(page, name, status)
    const data = res.data
    return data
  }
  const { Sider } = Layout;
  const onClick: MenuProps['onClick'] = (e) => {
    navigate(`/${e.key}`)
  };
  const {
    data,
    isSuccess,
    isError,
    error
  } = useQuery<PlaylistsData, Error>(['playlist', page], () =>
    fetchPlaylist(page, name, status),
  )
  if (isSuccess) {
    toast.success("Success")
    toast.clearWaitingQueue()
  }

  if (isError) {
    toast.error(error?.message)
  }
  const onChange: PaginationProps['onChange'] = (current) => {
    setPage(current);
  }

  data?.items.map(playlist => {
    let date = moment(new Date(playlist.createdAt));
    playlist.createdAt = date.calendar()
    return playlist.createdAt
  })
  type DataIndex = keyof Playlist;

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setName(selectedKeys[0]);
    setPage(1)
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setName('');
    setPage(1)
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<Playlist> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
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
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
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
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="logo" style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }}>Med App</div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
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
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer, textAlign: 'center', fontSize: '2em' }}> Manage Playlist</Header>
          <Table className="playlist-table"
            dataSource={data?.items}
            bordered
            pagination={{ total: data?.meta.totalItems, current: page, onChange: onChange, position: ["bottomCenter"] }}

            pagination={{ defaultPageSize: data?.meta.itemCount, total: data?.meta.totalItems, current: page, onChange: onChange, position: ["bottomCenter"] }}
            columns={[
              { title: 'Name', dataIndex: 'name', key: 'name', width: '20%', ...getColumnSearchProps('name') },
              { title: 'Description', dataIndex: 'description', key: 'description', render: (text) => <a>{text}</a>, width: '20%' },
              {
                title: 'Status', dataIndex: 'status', key: 'status', width: '20%',
              },
              { title: 'Created Date', dataIndex: 'createdAt', key: 'createdAt', width: '20%' },
              {
                title: 'Action', key: 'action', render: (text, record, index) => (
                  <Space size="middle">
                    <Button type="primary" onClick={() => {
                      navigate(`/playlist/${record.id}`, { state: record.id })
                    }}>
                      Detail
                    </Button>
                    <Button type="primary" key="audio" onClick={() => {
                      navigate(`/audio`, { state: record.id })
                    }}>
                      Audios
                    </Button>
                  </Space>

                ), width: '20%',
              },
            ]}
          />
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout>
      </Layout>
      <ToastContainer autoClose={1000} limit={1} />
    </>
  );
}
export default PlaylistPage;
