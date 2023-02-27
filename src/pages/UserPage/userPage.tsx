import { useQuery } from "react-query"
import { useState } from "react";
import { Table, Button, Layout, Menu, theme, MenuProps } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Footer, Header } from "antd/es/layout/layout";
import { getUsersAPI } from "api/user";
import { User } from "core/interface/models";
import { useLocation, useNavigate } from "react-router-dom";

function UserPage() {
    const {
        token: { colorBgContainer },
    } = theme.useToken()
    const [collapsed, setCollapsed] = useState(false);
    const fetchUsers = async () => {
        const res = await getUsersAPI()
        const data = res.data
        return data
    }
    const navigate = useNavigate();

    const onClick: MenuProps['onClick'] = (e) => {
        navigate(`/${e.key}`)
    };
    const { Sider } = Layout;

    const {
        isLoading,
        isError,
        error,
        data,
    } = useQuery<User[], Error>(['users'], async () => fetchUsers())

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
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: 'user',
                            icon: <UserOutlined />,
                            label: 'User',
                            onClick: onClick
                        },
                        {
                            key: 'playlist',
                            icon: <VideoCameraOutlined />,
                            label: 'Playlist',
                            onClick: onClick
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
                <Header style={{ padding: 0, background: colorBgContainer, textAlign: 'center', fontSize: '2em' }}> Manage User</Header>
                <Table className="playlist-table"
                    dataSource={data}
                    bordered
                    scroll={{ y: 240 }}
                    pagination={{ defaultPageSize: 5, position: ["bottomCenter"] }}
                    columns={[
                        { title: 'Username', dataIndex: 'username', key: 'username', render: (text) => <a>{text}</a>, width: '20%' },
                        { title: 'First Name ', dataIndex: 'firstName', key: 'firstName', render: (text) => <a>{text}</a>, width: '20%' },
                        { title: 'Last Name', dataIndex: 'lastName', key: 'lastName', render: (text) => <a>{text}</a>, width: '20%' },
                        { title: 'email', dataIndex: 'email', key: 'email', render: (text) => <a>{text}</a>, width: '20%' },
                        {
                            title: 'Action', key: 'action', render: (text, record, index) => (
                                <Button type="primary" onClick={() => {
                                    navigate(`/user/${record.username}`, { state: record.username })
                                }}>
                                    Detail
                                </Button>
                            ), width: '20%',
                        },
                    ]}
                />
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
            </Layout>
        </Layout >
    );
}
export default UserPage;
