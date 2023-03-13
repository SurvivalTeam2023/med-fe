import { useQuery } from "react-query"
import { useState } from "react";
import { PaginationProps, Table, Button, Layout, Menu, theme, MenuProps, Modal, Form, Input, InputNumber, Dropdown } from 'antd';
import { Footer, Header } from "antd/es/layout/layout";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Plan } from "core/interface/models/plan";
import { getPlanAPI } from "api/plan";
import { useAppThunkDispatch } from "core/store";
import { createPlanThunk } from "core/store/thunk/plan";
import moment from "moment";
function PlanPage() {
    const {
        token: { colorBgContainer },
    } = theme.useToken()
    const [page, setPage] = useState(1)
    const [open, setOpen] = useState(false);
    const dispatch = useAppThunkDispatch();
    const [form] = Form.useForm()
    const [collapsed, setCollapsed] = useState(false);
    const fetchPlans = async () => {
        const res = await getPlanAPI()
        const data = res.data
        return data
    }

    const onClick: MenuProps['onClick'] = (e) => {
        navigate(`/${e.key}`)
    };
    const navigate = useNavigate();

    const { Sider } = Layout;
    const handleMenuClick: MenuProps['onClick'] = (e) => {

    };

    const items: MenuProps['items'] = [
        {
            label: 'Turn off',
            key: '1',
        },
        {
            label: 'See detail',
            key: '2',
        },


    ];

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };
    const {
        isSuccess,
        isError,
        error,
        data,
    } = useQuery<Plan[], Error>(['plan', page], () => fetchPlans())

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

    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };
    const onFinish = async (values: any) => {
        await toast.promise(
            dispatch(createPlanThunk({ name: values['name'], desc: values['desc'], usageTime: values['usageTime'], cost: values['cost'] })),
            {
                pending: {
                    render() {
                        return "Loading...";
                    },
                },
                success: {
                    render() {
                        return "Create successfully";
                    },
                },
                error: {
                    render({ data }) {
                        return `${data}`;
                    },

                },

            }
        )
        setTimeout(() => {
            setOpen(false);
        }, 1000);
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    data?.map(plan => {
        let date = moment(new Date(plan.createdAt));
        plan.createdAt = date.calendar()
        return plan.createdAt
    })
    return (
        <>
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
                        <Button type="primary" shape="round" style={{ width: '8%', height: '50%', float: 'right', fontSize: '50%', marginTop: '1%', }} onClick={showModal} >
                            Create Plan
                        </Button>
                    </Header>
                    <Table className="table"
                        dataSource={data}
                        style={{ padding: '1%' }}
                        bordered
                        pagination={{ total: data?.length, current: page, onChange: onChange, position: ["bottomCenter"] }}
                        columns={[
                            { title: 'ID', dataIndex: 'id', key: 'id', width: '15%' },
                            { title: 'Name', dataIndex: 'name', key: 'name', width: '15%' },
                            { title: 'Description', dataIndex: 'desc', key: 'desc', width: '15%' },
                            { title: 'Status', dataIndex: 'status', key: 'status', width: '15%' },
                            { title: 'Created Date', dataIndex: 'createdAt', key: 'createdAt', width: '15%' },
                            {
                                title: 'Action', key: 'action', render: () => (
                                    <Dropdown menu={menuProps}>
                                        <a>
                                            ...
                                        </a>
                                    </Dropdown>
                                ), width: '15%',
                            },
                        ]}
                    />
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
                </Layout>
            </Layout >
            <Modal
                title="Create new plan"
                open={open}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" htmlType="submit" form="planForm">
                        Submit
                    </Button>
                ]}
            >
                <div style={{ display: 'flex', height: '100%', marginTop: '5%' }}>
                    <Form form={form}
                        id="planForm"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        labelAlign="left"
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input plan name !' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="desc"
                            rules={[{ required: true, message: 'Please input plan description!' }]}
                        >
                            <Input.TextArea />
                        </Form.Item>

                        <Form.Item
                            label="Price"
                            name="cost"
                            rules={[{ required: true, message: 'Please input price!' }]}
                        >
                            <InputNumber prefix="$" />
                        </Form.Item>

                        <Form.Item
                            label="Months" name="usageTime" rules={[{ required: true, message: 'Please input number of month' }]}>
                            <InputNumber min={1} max={12} />
                        </Form.Item>
                    </Form >
                </div >
            </Modal>
            <ToastContainer autoClose={1000} limit={1} />
        </>

    );
}
export default PlanPage;
