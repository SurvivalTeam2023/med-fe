import { useQuery } from "react-query";
import { useState } from "react";
import {
  Table,
  Button,
  Layout,
  Menu,
  theme,
  MenuProps,
  Space,
  Avatar,
} from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Footer, Header } from "antd/es/layout/layout";
import { getUsersAPI } from "api/user";
import { User } from "core/interface/models";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AntDesignOutlined } from "@ant-design/icons";
function UserPage() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  const fetchUsers = async () => {
    const res = await getUsersAPI();
    const data = res.data;
    return data;
  };
  const navigate = useNavigate();

  const onClick: MenuProps["onClick"] = (e) => {
    navigate(`/${e.key}`);
  };
  const { Sider } = Layout;

  const { isSuccess, isError, error, data } = useQuery<User[], Error>(
    ["users"],
    async () => fetchUsers()
  );

  if (isSuccess) {
    toast.success("Success");
    toast.clearWaitingQueue();
  }

  if (isError) {
    toast.error(error?.message);
    toast.clearWaitingQueue();
  }

  return (
    <Layout style={{ padding: 8, background: "#eee" }}>
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
          <span>Manage User</span>
          <div>
            <Avatar shape="square" size="small" icon={<UserOutlined />} />
          </div>
        </div>

        <Table
          style={{ margin: "8px 0" }}
          className="playlist-table"
          dataSource={data}
          bordered
          scroll={{ y: 240 }}
          pagination={{ defaultPageSize: 5, position: ["bottomCenter"] }}
          columns={[
            {
              title: "Username",
              dataIndex: "username",
              key: "username",
              render: (text) => <a>{text}</a>,
              width: "20%",
            },
            {
              title: "First Name ",
              dataIndex: "firstName",
              key: "firstName",
              render: (text) => <a>{text}</a>,
              width: "20%",
            },
            {
              title: "Last Name",
              dataIndex: "lastName",
              key: "lastName",
              render: (text) => <a>{text}</a>,
              width: "20%",
            },
            {
              title: "email",
              dataIndex: "email",
              key: "email",
              render: (text) => <a>{text}</a>,
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
                      navigate(`/user/${record.username}`, {
                        state: record.username,
                      });
                    }}
                  >
                    Detail
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      navigate(`/user/edit/${record.username}`, {
                        state: record.username,
                      });
                    }}
                  >
                    Edit
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
export default UserPage;
