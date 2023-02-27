
import { useQuery } from "react-query"
import { useState } from "react";
import { PaginationProps, Table, Button, Layout, Menu, theme } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import moment from "moment";
import { Footer, Header } from "antd/es/layout/layout";
import { getTrackByPlaylistIdAPI } from "api/playlistTracks";
import { TracksData } from "core/interface/models/track";
import { useLocation, useNavigate } from "react-router-dom";
function AudioPage() {
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const [page, setPage] = useState(1)
  const location = useLocation()
  const id = location.state
  const [collapsed, setCollapsed] = useState(false);
  const fetchAudios = async (page: number, playlistId: number) => {
    const res = await getTrackByPlaylistIdAPI(playlistId, page, 5)
    const data = res.data
    return data
  }

  const navigate = useNavigate();
  
  const { Sider } = Layout;

  const {
    isLoading,
    isError,
    error,
    data,
  } = useQuery<TracksData, Error>(['track', page], () => fetchAudios(page, id))
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }
  const onChange: PaginationProps['onChange'] = (current) => {
    setPage(current);
  }
  data?.items.map(track => {
    let date = moment(new Date(track.createdAt));
    track.createdAt = date.calendar()
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
        <Header style={{ padding: 0, background: colorBgContainer, textAlign: 'center', fontSize: '2em' }}> Manage Audio</Header>
        <Table className="audio-table"
          dataSource={data?.items}
          bordered
          scroll={{ y: 240 }}
          pagination={{ defaultPageSize: data?.meta.itemsPerPage, total: data?.meta.totalItems, current: page, onChange: onChange, position: ["bottomCenter"] }}
          columns={[
            { title: 'Name', dataIndex: 'name', key: 'name', width: '20%' },
            { title: 'File', dataIndex: 'file.url', key: 'file', width: '20%' },
            { title: 'Status', dataIndex: 'status', key: 'status', width: '20%' },
            { title: 'Created Date', dataIndex: 'createdAt', key: 'createdAt', width: '20%' },
            {
              title: 'Action', key: 'action', render: (text, record, index) => (
                <Button type="primary" onClick={() => {
                  navigate(`/audio/${record.id}`, { state: record.id})
              }}>
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
export default AudioPage;
