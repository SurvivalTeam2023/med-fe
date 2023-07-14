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
  Form,
  Input,
  InputNumber,
  Dropdown,
  Avatar,
} from "antd";
import { Footer, Header } from "antd/es/layout/layout";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Plan } from "core/interface/models/plan";
import { getPlanAPI } from "api/plan";
import { useAppThunkDispatch } from "store";
import { createPlanThunk } from "store/thunk/plan";
import moment from "moment";
import { UserOutlined } from "@ant-design/icons";

function PlanPage() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const dispatch = useAppThunkDispatch();
  const [form] = Form.useForm();
  const [collapsed, setCollapsed] = useState(false);
  const fetchPlans = async () => {
    const res = await getPlanAPI();
    const data = res.data;
    return data;
  };

  const onClick: MenuProps["onClick"] = (e) => {
    navigate(`/${e.key}`);
  };
  const navigate = useNavigate();

  const { Sider } = Layout;
  const handleMenuClick: MenuProps["onClick"] = (e) => {};

  const items: MenuProps["items"] = [
    {
      label: "Turn off",
      key: "1",
    },
    {
      label: "See detail",
      key: "2",
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  const { isSuccess, isError, error, data } = useQuery<Plan[], Error>(
    ["plan", page],
    () => fetchPlans()
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

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const onFinish = async (values: any) => {
    await toast.promise(
      dispatch(
        createPlanThunk({
          name: values["name"],
          desc: values["desc"],
          usageTime: values["usageTime"],
          cost: values["cost"],
        })
      ),
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
    );
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  };

  data?.map((plan) => {
    let date = moment(new Date(plan.createdAt));
    plan.createdAt = date.calendar();
    return plan.createdAt;
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
          <span>Manage Plan</span>
          <div>
            <Avatar shape="square" size="small" icon={<UserOutlined />} />
          </div>
        </div>
        <Table
          className="table"
          dataSource={data}
          style={{ padding: "8px 0" }}
          bordered
          scroll={{ y: 240 }}
          pagination={{
            total: data?.length,
            current: page,
            onChange: onChange,
            position: ["bottomCenter"],
          }}
          columns={[
            { title: "ID", dataIndex: "id", key: "id", width: "15%" },
            { title: "Name", dataIndex: "name", key: "name", width: "15%" },
            {
              title: "Description",
              dataIndex: "desc",
              key: "desc",
              width: "15%",
            },
            {
              title: "Status",
              dataIndex: "status",
              key: "status",
              width: "15%",
            },
            {
              title: "Created Date",
              dataIndex: "createdAt",
              key: "createdAt",
              width: "15%",
            },
            {
              title: "Action",
              key: "action",
              render: () => (
                <Dropdown menu={menuProps}>
                  <a>...</a>
                </Dropdown>
              ),
              width: "15%",
            },
          ]}
        />
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
        <Modal
          title="Create new plan"
          open={open}
          onCancel={handleCancel}
          footer={[
            <Button key="cancel" onClick={() => setOpen(false)}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              form="planForm"
            >
              Submit
            </Button>,
          ]}
        >
          <div style={{ display: "flex", height: "100%", marginTop: "5%" }}>
            <Form
              form={form}
              id="planForm"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
              labelAlign="left"
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  { required: true, message: "Please input plan name !" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Description"
                name="desc"
                rules={[
                  {
                    required: true,
                    message: "Please input plan description!",
                  },
                ]}
              >
                <Input.TextArea />
              </Form.Item>

              <Form.Item
                label="Price"
                name="cost"
                rules={[{ required: true, message: "Please input price!" }]}
              >
                <InputNumber prefix="$" />
              </Form.Item>

              <Form.Item
                label="Months"
                name="usageTime"
                rules={[
                  { required: true, message: "Please input number of month" },
                ]}
              >
                <InputNumber min={1} max={12} />
              </Form.Item>
            </Form>
          </div>
        </Modal>
        <ToastContainer autoClose={1000} limit={1} />
      </div>
    </Layout>
  );
}
export default PlanPage;
