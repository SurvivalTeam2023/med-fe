import { getPlaylistByUserIdAPI } from "api/playlist"
import { useQuery } from "react-query"
import { createElement, useState } from "react";
import { PaginationProps, Space, Table, Button, Layout, Menu, theme } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { PlaylistsData } from "core/interface/models/playlist";
import moment from "moment";
import { Footer, Header } from "antd/es/layout/layout";
function PlaylistPage() {
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const [page, setPage] = useState(1)
  const [collapsed, setCollapsed] = useState(false);
  const fetchPlaylist = async (page: number) => {
    const res = await getPlaylistByUserIdAPI(page, 3)
    const data = res.data
    return data
  }
  const { Sider } = Layout;

  const {
    isLoading,
    isError,
    error,
    data,
  } = useQuery<PlaylistsData, Error>(['playlist', page], () => fetchPlaylist(page), { keepPreviousData: true })
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }
  const onChange: PaginationProps['onChange'] = (current) => {
    setPage(current);
  }
  data?.items.map(playlist => {
    let date = moment(new Date(playlist.createdAt));
    playlist.createdAt = date.calendar()
  })

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }}>Med App</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'User',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'Playlist',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'Something',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, textAlign: 'center', fontSize: '2em' }}> Manage Playlist</Header>
        <Table className="playlist-table"
          dataSource={data?.items}
          bordered
          scroll={{ y: 240 }}
          pagination={{ defaultPageSize: data?.meta.itemsPerPage, total: data?.meta.totalItems, current: page, onChange: onChange, position: ["bottomCenter"] }}
          columns={[
            { title: 'Name', dataIndex: 'name', key: 'name', render: (text) => <a>{text}</a>, width: '20%' },
            { title: 'Description', dataIndex: 'description', key: 'description', render: (text) => <a>{text}</a>, width: '20%' },
            { title: 'Status', dataIndex: 'status', key: 'status', render: (text) => <a>{text}</a>, width: '20%' },
            { title: 'Created Date', dataIndex: 'createdAt', key: 'createdAt', render: (text) => <a>{text}</a>, width: '20%' },
            {
              title: 'Action', key: 'action', render: (_,) => (
                <Button type="primary">
                  Detail
                </Button>
              ), width: '20%',
            },
          ]}
        />
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}
export default PlaylistPage;
