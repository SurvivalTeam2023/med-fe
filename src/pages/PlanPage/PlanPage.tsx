import { useQuery } from "react-query"
import { useState } from "react";
import { PaginationProps, Table, Button, Layout, Menu, theme, MenuProps } from 'antd';
import { Footer, Header } from "antd/es/layout/layout";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Plan } from "core/interface/models/plan";
import { getPlanAPI } from "api/plan";
function PlanPage() {
    const {
        token: { colorBgContainer },
    } = theme.useToken()
    const [page, setPage] = useState(1)
    const [collapsed, setCollapsed] = useState(false);
    const fetchSubscriptions = async () => {
        const res = await getPlanAPI()
        const data = res.data
        return data
    }

    const onClick: MenuProps['onClick'] = (e) => {
        navigate(`/${e.key}`)
    };
    const navigate = useNavigate();

    const { Sider } = Layout;

    const {
        isSuccess,
        isError,
        error,
        data,
    } = useQuery<Plan[], Error>(['subscription', page], () => fetchSubscriptions())

    if (isSuccess) {
        toast.success("Success")
        toast.clearWaitingQueue()
    }

    if (isError) {
        toast.error(error?.message)
        toast.clearWaitingQueue()
    }
    const onChange: PaginationProps['onChange'] = (current) => {
        setPage(current);
    }
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="logo" style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }}>Med App</div>
                <Menu
                    theme="dark"
                    mode="inline"
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
            <Layout style={{ marginTop: '1%' }}>
                <Header style={{ background: colorBgContainer, fontSize: '2em', marginTop: '1%', height: '9%', marginLeft: '1%', marginRight: '1%', paddingLeft: '1%', }}>
                    <div style={{ width: '30%', display: 'flex', float: 'left', marginTop: '0.5%' }}>Manage Plan</div>
                    <Button type="primary" shape="round" style={{ width: '8%', height: '50%', float: 'right', fontSize: '50%', marginTop: '1%', }}>
                        Create Plan
                    </Button>
                </Header>
                <Table className="table"
                    dataSource={data}
                    style={{ padding: '1%' }}
                    bordered
                    pagination={{ total: data?.length, current: page, onChange: onChange, position: ["bottomCenter"] }}
                    columns={[
                        { title: 'ID', dataIndex: 'id', key: 'id', width: '20%' },
                        { title: 'Name', dataIndex: 'name', key: 'name', width: '20%' },
                        { title: 'Description', dataIndex: 'desc', key: 'desc', width: '20%' },
                        { title: 'Created Date', dataIndex: 'createdAt', key: 'createdAt', width: '20%' },
                        {
                            title: 'Action', key: 'action', render: (text, record, index) => (
                                <Button type="primary" onClick={() => {
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
export default PlanPage;
